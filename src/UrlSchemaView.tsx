import * as React from "react";
import { IUrlSchema, schemaToString } from "./urlSchema";
import { Badge, Flex, Table, Text } from "@mantine/core";
import { CopyButton } from "./CopyButton";
import { HostSelector } from "./HostSelector";
import { DeleteButton } from "./DeleteButton";
import { SelectWithMemory } from "./SelectWithMemory";

function useUrlSchemaProp(
  schema: IUrlSchema,
  setSchema: React.Dispatch<React.SetStateAction<IUrlSchema>>,
  prop: keyof IUrlSchema,
  placeholder: string,
  required: boolean
) {
  const setValue = (val: string) =>
    setSchema((x) => ({ ...x, [prop]: val || (required ? placeholder : "") }));

  const getValue = () => {
    return {
      input: schema[prop] === placeholder ? "" : (schema[prop] as string),
      raw: schema[prop] as string,
    };
  };

  return { setValue, getValue };
}

export const UrlSchemaView: React.FC<{
  schema: IUrlSchema;
  index: number;
  onDelete: () => void;
}> = ({ schema: initialSchema, index, onDelete }) => {
  const [schema, setSchema] = React.useState(initialSchema);
  // const setProp = (prop: keyof IUrlSchema) => (val: string) =>
  //   setSchema((x) => ({ ...x, [prop]: val }));
  const host = useUrlSchemaProp(schema, setSchema, "host", "{HOST}", true);
  const postSpecificSegment = useUrlSchemaProp(
    schema,
    setSchema,
    "postSpecificSegment",
    "{POST_SPECIFIC_SEGMENT}",
    true
  );
  const language = useUrlSchemaProp(
    schema,
    setSchema,
    "language",
    "{LANGUAGE}",
    false
  );

  return (
    <>
      <Table
        withTableBorder
        withColumnBorders
        styles={{ td: { verticalAlign: "top" } }}
      >
        <Table.Tbody>
          <Table.Tr>
            <Table.Td colSpan={3}>
              <Flex justify="space-between" align="center">
                <div>
                  <Badge circle variant="light" color="blue">
                    {index}
                  </Badge>
                  &nbsp; https://
                  <Text display={"inline"} c="orange">
                    {host.getValue().raw.replace("https://", "")}
                  </Text>
                  /
                  <Text display={"inline"} c="lime">
                    {postSpecificSegment.getValue().raw}
                  </Text>
                  /
                  {language.getValue().raw && (
                    <>
                      <Text display={"inline"} c="cyan">
                        {language.getValue().raw}
                      </Text>
                      /
                    </>
                  )}
                </div>
                <Flex gap={5}>
                  <CopyButton strToCopy={schemaToString(schema)} />
                  <DeleteButton onDelete={onDelete} />
                </Flex>
              </Flex>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th w={0}>
              <Text c="orange" size="sm" fw={700}>
                Host
              </Text>
            </Table.Th>
            <Table.Th>
              <Text c="lime" size="sm" fw={700}>
                Post Specific Segment
              </Text>
            </Table.Th>
            <Table.Th>
              <Text c="cyan" size="sm" fw={700}>
                Language
              </Text>
            </Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <HostSelector
                host={host.getValue().input}
                onChange={host.setValue}
              />
            </Table.Td>
            <Table.Td>
              <SelectWithMemory
                value={postSpecificSegment.getValue().input}
                onChange={postSpecificSegment.setValue}
                memoryKey="postSpecificSegment"
                placeholder="{POST_SPECIFIC_SEGMENT}"
              />
            </Table.Td>
            <Table.Td w={140}>
              <SelectWithMemory
                defaultOptions={["en", "fr", "es"]}
                value={language.getValue().input}
                onChange={language.setValue}
                memoryKey="language"
                placeholder="{LANGUAGE}"
              />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </>
  );
};

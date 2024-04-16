import * as React from "react";
import { IUrlSchema, schemaToString } from "./urlSchema";
import { Group, Mark, Popover, Text } from "@mantine/core";
import { CopyButton } from "./CopyButton";
import { HostSelector } from "./HostSelector";
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

export const UrlSchemaView: React.FC<{ schema: IUrlSchema; index: number }> = ({
  schema: initialSchema,
  index,
}) => {
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
    true
  );

  return (
    <Group justify="center">
      {index}.
      <Text size="lg">
        https://
        <Popover
          position="bottom"
          middlewares={{ flip: true, shift: true, inline: true }}
          withArrow
          shadow="md"
        >
          <Popover.Target>
            <Mark style={{ cursor: "pointer" }} color="orange">
              {host.getValue().raw.replace("https://", "")}
            </Mark>
          </Popover.Target>
          <Popover.Dropdown>
            <HostSelector
              host={host.getValue().input}
              onChange={host.setValue}
            />
          </Popover.Dropdown>
        </Popover>
        /
        <Popover
          position="bottom"
          middlewares={{ flip: true, shift: true, inline: true }}
          withArrow
          shadow="md"
          width={"target"}
        >
          <Popover.Target>
            <Mark style={{ cursor: "pointer" }} color="lime">
              {postSpecificSegment.getValue().raw}
            </Mark>
          </Popover.Target>
          <Popover.Dropdown>
            <SelectWithMemory
              value={postSpecificSegment.getValue().input}
              onChange={postSpecificSegment.setValue}
              memoryKey="postSpecificSegment"
              placeholder="{POST_SPECIFIC_SEGMENT}"
            />
          </Popover.Dropdown>
        </Popover>
        /
        <Popover
          position="bottom"
          middlewares={{ flip: true, shift: true, inline: true }}
          withArrow
          shadow="md"
          width={150}
        >
          <Popover.Target>
            <Mark style={{ cursor: "pointer" }} color="cyan">
              {language.getValue().raw}
            </Mark>
          </Popover.Target>
          <Popover.Dropdown>
            <SelectWithMemory
              value={language.getValue().input}
              onChange={language.setValue}
              memoryKey="language"
              placeholder="{LANGUAGE}"
            />
          </Popover.Dropdown>
        </Popover>
        /
      </Text>
      <CopyButton strToCopy={schemaToString(schema)} />
    </Group>
  );
};

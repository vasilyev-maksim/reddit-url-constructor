import * as React from "react";
import { IUrlSchema } from "./urlSchema";
import { Stack } from "@mantine/core";
import { UrlSchemaView } from "./UrlSchemaView";

export const UrlSchemaViewList: React.FC<{
  list: IUrlSchema[];
  onDelete: (schema: IUrlSchema) => void;
}> = ({ list, onDelete }) => {
  return (
    <Stack>
      {list.map((schema, i) => (
        <UrlSchemaView
          key={schema.id}
          schema={schema}
          index={list.length - i}
          onDelete={() => onDelete(schema)}
        />
      ))}
    </Stack>
  );
};

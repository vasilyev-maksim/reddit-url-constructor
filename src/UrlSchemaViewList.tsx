import * as React from "react";
import { IUrlSchema } from "./urlSchema";
import { Stack } from "@mantine/core";
import { UrlSchemaView } from "./UrlSchemaView";

export const UrlSchemaViewList: React.FC<{ list: IUrlSchema[] }> = ({
  list,
}) => {
  return (
    <Stack>
      {list.map((schema, i) => (
        <UrlSchemaView key={i} schema={schema} index={i + 1} />
      ))}
    </Stack>
  );
};

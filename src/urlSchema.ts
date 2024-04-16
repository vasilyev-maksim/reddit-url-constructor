import { v4 as uuid } from "uuid";

export interface IUrlSchema {
  host: string;
  postSpecificSegment: string;
  language: string;
  queryParams: URLSearchParams;
  id: string;
}

// const DEFAULT_LANG = "en";
const PATHNAME_REGEXP = /(.+?)(\/(\w\w))?$/;

export function getUrlSchema(str: string): IUrlSchema {
  const url = new URL(str);
  const host = url.origin;

  const match = trimSlash(url.pathname).match(PATHNAME_REGEXP);
  if (!match || match.length < 2) {
    throw new Error("Invalid URL");
  }
  const postSpecificSegment = match[1];
  const language = match[3];

  const queryParams = url.searchParams;

  return {
    host,
    postSpecificSegment,
    language,
    queryParams,
    id: uuid(),
  };
}

export function schemaToString(schema: IUrlSchema) {
  return (
    schema.host +
    "/" +
    schema.postSpecificSegment +
    "/" +
    (schema.language ? schema.language + "/" : "") +
    (schema.queryParams.values.length ? "?" + schema.queryParams : "")
  );
}

function trimSlash(str: string) {
  return str.replace(/^\/+|\/+$/g, "");
}

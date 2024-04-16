import "@mantine/core/styles.css";
import {
  Container,
  MantineProvider,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { theme } from "./theme";
import { useState } from "react";
import { IUrlSchema, getUrlSchema } from "./urlSchema";
import { UrlSchemaViewList } from "./UrlSchemaViewList";
// import { Sandbox } from "./Sandbox";
// import { Sandbox } from "./Sandbox";

const TEST_URL =
  "https://reddit-service-shreddit.14326.shreddit.staging.snoo.dev/r/teachinginjapan/comments/1bnbryh/how_to_politely_tell_me_eikawa_manager_to_give_me/";

export default function App() {
  const [error, setError] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [schemaList, setSchemaList] = useState<IUrlSchema[]>([
    getUrlSchema(TEST_URL),
  ]);
  const onSubmit = () => {
    try {
      const redditUrl = getUrlSchema(urlInput);
      setSchemaList((x) => [...x, redditUrl]);
      setError("");
      setUrlInput("");
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((e as any).message);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.currentTarget.value);
    setError("");
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Container>
        <Space h="xl" />

        <header>
          <Title order={1}>Reddit URL Constructor 🧰</Title>
        </header>
        <Space h="lg" />
        <TextInput
          autoFocus
          error={error}
          value={urlInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit();
            }
          }}
          onChange={onChange}
          size="lg"
          placeholder="Reddit post URL"
        />
      </Container>
      <Space h="xl" />
      <Container fluid>
        <UrlSchemaViewList list={schemaList} />
      </Container>

      {/* <Sandbox /> */}
    </MantineProvider>
  );
}

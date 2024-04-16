import { CheckIcon, Radio, Stack } from "@mantine/core";
import { TemplateRadioInput } from "./TemplateRadioInput";

const REDDIT_PROD = "https://www.reddit.com";
const SHREDDIT = "https://sh.reddit.com";
const STAGING =
  "https://reddit-service-shreddit.{PR_ID}.shreddit.staging.snoo.dev";
const SNOODEV = "https://reddit-service-shreddit.{ACC_NAME}.snoo.dev/";
// const STAGING = {
//   generate: (prNumber: string) =>
//     `https://reddit-service-shreddit.${prNumber}.shreddit.staging.snoo.dev`,
//   parse: (str: string) => {
//     return str.match(
//       /https:\/\/reddit-service-shreddit\.(.*?)\.shreddit\.staging\.snoo\.dev/
//     )?.[1];
//   },
// };
// const SNOODEV = {
//   generate: (accountName: string) =>
//     `https://reddit-service-shreddit.${accountName}.shreddit.staging.snoo.dev`,
//   parse: (str: string) =>
//     str.match(
//       `https://reddit-service-shreddit.(.*?).shreddit.staging.snoo.dev`
//     )?.[1],
// };

export function HostSelector(props: {
  onChange: (host: string) => void;
  host: string;
}) {
  return (
    <Stack>
      <Radio
        description="Reddit prod"
        icon={CheckIcon}
        checked={props.host === REDDIT_PROD}
        onChange={() => props.onChange(REDDIT_PROD)}
        label={"www.reddit.com"}
      />
      <Radio
        description="Shreddit"
        icon={CheckIcon}
        checked={props.host === SHREDDIT}
        onChange={() => props.onChange(SHREDDIT)}
        label={"sh.reddit.com"}
      />
      <TemplateRadioInput
        onChange={props.onChange}
        initialVal={props.host}
        placeholder="PR ID (or paste link)"
        description="Staging (specific to each PR)"
        template={STAGING}
      />
      <TemplateRadioInput
        onChange={props.onChange}
        initialVal={props.host}
        placeholder="ACC NAME (or paste link)"
        description="Snoodev (your local dev env)"
        template={SNOODEV}
      />
      {/* <Radio
        description="Snoodev"
        icon={CheckIcon}
        checked={selected === "Snoodev"}
        onChange={() => setSelected("Snoodev")}
        label={
          <>
            reddit-service-shreddit.
            <SelectCreatableDemo />
            .snoo.dev
          </>
        }
      /> */}
    </Stack>
  );
}

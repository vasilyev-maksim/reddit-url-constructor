import {
  CopyButton as MantineCopyButton,
  Tooltip,
  ActionIcon,
  rem,
} from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

export function CopyButton(props: { strToCopy: string }) {
  return (
    <MantineCopyButton value={props.strToCopy} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
          <ActionIcon
            color={copied ? "teal" : "gray"}
            variant="subtle"
            onClick={copy}
          >
            {copied ? (
              <IconCheck style={{ width: rem(20) }} />
            ) : (
              <IconCopy style={{ width: rem(20) }} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </MantineCopyButton>
  );
}

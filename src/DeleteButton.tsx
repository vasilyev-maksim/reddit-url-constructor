import { Tooltip, ActionIcon, rem } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

export function DeleteButton(props: { onDelete: () => void }) {
  return (
    <Tooltip label={"Delete"} withArrow position="top">
      <ActionIcon color={"gray"} variant="subtle" onClick={props.onDelete}>
        <IconTrash style={{ width: rem(20) }} />
      </ActionIcon>
    </Tooltip>
  );
}

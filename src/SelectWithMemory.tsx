import {
  useCombobox,
  Combobox,
  InputBase,
  Group,
  rem,
  Button,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useMemory } from "./memoryStore";

export function SelectWithMemory(props: {
  placeholder: string;
  inputWidth?: number | string;
  value: string;
  onChange: (val: string) => void;
  memoryKey: string;
  inline?: boolean;
  autoFocus?: boolean;
  defaultOptions?: string[];
  renderItem?: (val: string) => React.ReactNode;
}) {
  const memoryStore = useMemory(props.memoryKey, props.defaultOptions);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const memorizedOptions = memoryStore.items || [];
  const [search, setSearch] = useState(props.value || "");

  const exactOptionMatch = memorizedOptions.some((item) => item === search);
  const filteredOptions = memorizedOptions.filter((x) => x !== search);
  // uncomment this if you need search functionality:
  //  exactOptionMatch
  //   ? memorizedOptions
  //   : memorizedOptions.filter((item) =>
  //       item.toLowerCase().includes(search.toLowerCase().trim())
  //     );

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      <Group
        justify="space-between"
        styles={{
          root: {
            flexWrap: "nowrap",
          },
        }}
      >
        <span
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {(props.renderItem ?? ((x) => x))(item)}
        </span>
        <Button
          size="compact-xs"
          variant="light"
          color="gray"
          styles={{
            root: {
              marginRight: -4,
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            memoryStore.deleteItem(item);
          }}
        >
          <IconTrash style={{ width: rem(10) }} />
        </Button>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox
      // width={"100%"}
      size={props.inline ? "xs" : undefined}
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        if (val === "$create") {
          memoryStore.saveItem(search);
          props.onChange(search);
        } else {
          props.onChange(val);
          setSearch(val);
        }

        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          autoFocus={props.autoFocus}
          size={props.inline ? "xs" : undefined}
          styles={{
            root: {
              display: props.inline ? "inline-block" : "block",
              width: props.inputWidth,
            },
          }}
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
            props.onChange(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(props.value || "");
          }}
          placeholder={props.placeholder}
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      {options.length > 0 && (
        <Combobox.Dropdown>
          <Combobox.Options>
            {options}
            {!exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option
                styles={{
                  option: {
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  },
                }}
                value="$create"
              >
                Save "{search}"
              </Combobox.Option>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      )}
    </Combobox>
  );
}

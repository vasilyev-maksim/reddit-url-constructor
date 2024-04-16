// import {
//   Button,
//   CheckIcon,
//   Combobox,
//   Divider,
//   Input,
//   InputBase,
//   Menu,
//   Paper,
//   Popover,
//   Radio,
//   Table,
//   Text,
//   useCombobox,
// } from "@mantine/core";
// import { useState } from "react";
// import { RadioDemo } from "./HostSelector";

// // const hostOptions: MenuItem[] = [
// //   { label: "Reddit", value: "Reddit" },
// //   { label: "Shreddit", value: "Shreddit" },
// //   {
// //     label: "Snoodev",
// //     draftValue: "reddit-service-shreddit.{YOUR_ACCOUNT}.snoo.dev",
// //     bodyRender: () => null,
// //     isSelected: (x) => x.endsWith(".snoo.dev"),
// //   },
// //   { label: "Staging", value: "Staging" },
// // ];

// export function Sandbox() {
//   // const [selected, setSelected] = useState("");
//   return (
//     <>
//       <PopoverDemo>
//         {/* <VerticalMenu
//           selected={selected}
//           onSelect={setSelected}
//           items={hostOptions}
//         />
//         <Divider />
//         <Stack> */}
//         {/* {hostOptions.map((x) => (
//             <Radio
//               icon={CheckIcon}
//               checked={selected === x.value}
//               onChange={() => setSelected(x.value)}
//               label={x.label}
//             />
//           ))} */}
//         {/* </Stack>
//         <Divider />
//         <RadioTableSemo />

//         <Divider /> */}

//         <RadioDemo />
//       </PopoverDemo>
//     </>
//   );
// }

// export function RadioTableSemo() {
//   const [selected, setSelected] = useState("");

//   return (
//     <Table withRowBorders={false}>
//       <Table.Tr key={"Reddit"}>
//         <Table.Td>
//           <Radio
//             icon={CheckIcon}
//             checked={selected === "Reddit"}
//             onChange={() => setSelected("Reddit")}
//             label={"www.reddit.com"}
//           />
//         </Table.Td>
//         <Table.Td></Table.Td>
//       </Table.Tr>
//       <Table.Tr key={"Shreddit"}>
//         <Table.Td>
//           <Radio
//             icon={CheckIcon}
//             checked={selected === "Shreddit"}
//             onChange={() => setSelected("Shreddit")}
//             label={"sh.reddit.com"}
//           />
//         </Table.Td>
//         <Table.Td></Table.Td>
//       </Table.Tr>
//       <Table.Tr key={"Staging"}>
//         <Table.Td>
//           <Radio
//             icon={CheckIcon}
//             checked={selected === "Staging"}
//             onChange={() => setSelected("Staging")}
//             label={"Staging"}
//           />
//         </Table.Td>
//         <Table.Td>
//           <Input />
//         </Table.Td>
//       </Table.Tr>
//       <Table.Tr key={"Snoodev"}>
//         <Table.Td>
//           <Radio
//             icon={CheckIcon}
//             checked={selected === "Snoodev"}
//             onChange={() => setSelected("Snoodev")}
//             label={"Snoodev"}
//           />
//         </Table.Td>
//         <Table.Td>
//           <Input />
//         </Table.Td>
//       </Table.Tr>
//     </Table>
//   );
// }

// export function VerticalMenu(props: {
//   items: MenuItem[];
//   selected: string;
//   onSelect: (val: string) => void;
// }) {
//   return props.items.map((x) => {
//     const compound = isCompound(x);
//     const selected = compound
//       ? x.isSelected(props.selected)
//       : props.selected === x.value;
//     return (
//       <Button
//         fullWidth
//         leftSection={selected ? <CheckIcon size={14} /> : null}
//         variant="subtle"
//         color="gray"
//         onClick={() =>
//           compound ? props.onSelect(x.draftValue) : props.onSelect(x.value)
//         }
//         styles={{
//           label: {
//             fontWeight: "normal",
//           },
//           inner: {
//             justifyContent: "flex-start",
//           },
//         }}
//       >
//         {compound ? (
//           <div>
//             {x.label}
//             <Divider />
//             {x.bodyRender(props.onSelect, selected)}
//           </div>
//         ) : (
//           x.label
//         )}
//       </Button>
//     );
//   });
// }

// export function PaperDemo() {
//   return (
//     <Paper shadow="md" p="xl">
//       <Text>Paper is the most basic ui component</Text>
//       <Text>
//         Use it to create cards, dropdowns, modals and other components that
//         require background with shadow
//       </Text>
//     </Paper>
//   );
// }

// export function MenuDemo() {
//   return (
//     <div style={{ position: "relative" }}>
//       <Menu shadow="md" width={200} opened={true} withinPortal={false}>
//         <Menu.Dropdown>
//           <Menu.Item>Settings</Menu.Item>
//           <Menu.Item>Messages</Menu.Item>
//           <Menu.Item>Gallery</Menu.Item>
//           <Menu.Item
//             rightSection={
//               <Text size="xs" c="dimmed">
//                 ⌘K
//               </Text>
//             }
//           >
//             Search
//           </Menu.Item>

//           <Menu.Divider />

//           <Menu.Label>Danger zone</Menu.Label>
//           <Menu.Item>Transfer my data</Menu.Item>
//           <Menu.Item color="red">Delete my account</Menu.Item>
//         </Menu.Dropdown>
//       </Menu>
//     </div>
//   );
// }

// export function PopoverDemo(props: { children: React.ReactNode }) {
//   return (
//     <Popover position="bottom" withArrow shadow="md">
//       <Popover.Target>
//         <Button>Toggle popover</Button>
//       </Popover.Target>
//       <Popover.Dropdown>{props.children}</Popover.Dropdown>
//     </Popover>
//   );
// }

const groceries = ["v-maksim-vasilyev", "rogan-murley"];
export function SelectCreatableDemo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [data, setData] = useState(groceries);
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase().trim())
      );

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      size="xs"
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        if (val === "$create") {
          setData((current) => [...current, search]);
          setValue(search);
        } else {
          setValue(val);
          setSearch(val);
        }

        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          size="xs"
          styles={{
            root: {
              display: "inline-block",
            },
          }}
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || "");
          }}
          placeholder="PR number (or link)"
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options}
          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">
              + Save "{search}" for later
            </Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

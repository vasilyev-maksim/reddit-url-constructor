import { CheckIcon, Radio } from "@mantine/core";
import { useMemo, useState } from "react";
import { SelectWithMemory } from "./SelectWithMemory";

function escapeRegex(str: string) {
  return str.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
}

function generateTemplateCodec(template: string) {
  const [left, key, right] = template.match(/({[^}]+})|[^{]+/g) || ["", "", ""];

  return {
    generate: (val: string) => `${left}${val || key}${right}`,
    parse: (str: string | undefined) => {
      return str?.match(`${escapeRegex(left)}(.*?)${escapeRegex(right)}`)?.[1];
    },
    check: (str: string | undefined) => {
      return str?.startsWith(left) && str.endsWith(right);
    },
    key,
    left,
    right,
  };
}

export function TemplateRadioInput(props: {
  onChange: (host: string) => void;
  initialVal: string | undefined;
  placeholder: string;
  description: string;
  template: string;
}) {
  const { parse, generate, check, key, left, right } = useMemo(() => {
    return generateTemplateCodec(props.template);
  }, [props.template]);
  const [val, setVal] = useState(parse(props.initialVal) || "");

  return (
    <Radio
      description={props.description}
      icon={CheckIcon}
      checked={check(props.initialVal)}
      onChange={(event) => {
        if (event.currentTarget.value == "on") {
          props.onChange(generate(val));
        }
      }}
      label={
        <>
          {left}
          <SelectWithMemory
            inline
            memoryKey={key}
            inputWidth={185}
            placeholder={props.placeholder}
            value={val == key ? "" : val ?? ""}
            onChange={(val: string) => {
              setVal(val);
              props.onChange(generate(val || key));
            }}
          />
          {right}
        </>
      }
    />
  );
}

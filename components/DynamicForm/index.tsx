import { Field } from "@/components/dashboard/nodes/customNodeTypes";
import * as Form from "@radix-ui/react-form";
import cx from "classnames";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, ChevronUpIcon } from "lucide-react";

type DynamicFormProps = {
  fields: Field[];
  onChange: (fieldName: string, newValue: any) => void;
};

export function DynamicForm({ fields, onChange }: DynamicFormProps) {
  return (
    <Form.Root className="flex flex-col gap-5">
      {fields?.map((field) => (
        <Field
          key={field.name}
          field={field}
          onChange={(newValue) => onChange(field.name, newValue)}
        />
      ))}
    </Form.Root>
  );
}

function Field({
  field,
  onChange,
}: {
  field: Field;
  onChange: (newValue: any) => void;
}) {
  if (field.type === "text" || field.type === "number") {
    return (
      <Form.Field name={field.name} className="flex flex-col gap-1">
        <Form.Label className="text-md font-semibold">{field.name}</Form.Label>
        <Form.Control
          asChild
          className={cx(
            "box-border",
            "focus:border-amber-700 focus:ring-0 ",
            "rounded border-neutral-500 bg-transparent text-white",
            "hover:border-amber-800",
          )}
        >
          <input
            type={field.type}
            value={field.value as string}
            onChange={(ev) => onChange(ev.target.value)}
          />
        </Form.Control>
      </Form.Field>
    );
  }

  if (field.type === "textarea") {
    return (
      <Form.Field name={field.name} className="flex flex-col gap-1">
        <Form.Label className="text-md font-semibold">{field.name}</Form.Label>
        <Form.Control
          asChild
          className={cx(
            "box-border",
            "focus:border-amber-700 focus:ring-0 ",
            "rounded border-neutral-500 bg-transparent text-white",
            "hover:border-amber-800",
          )}
        >
          <textarea
            value={field.value as string}
            onChange={(ev) => onChange(ev.target.value)}
          />
        </Form.Control>
      </Form.Field>
    );
  }

  if (field.type === "select") {
    return (
      <Form.Field name={field.name} className="flex flex-col gap-1">
        <Form.Label className="text-md font-semibold">{field.name}</Form.Label>
        <Form.Control
          asChild
          onChange={(ev) => onChange(ev.target.value)}
          className={cx(
            "box-border",
            "focus:border-amber-700 focus:ring-0 ",
            "rounded border-neutral-500 bg-transparent text-white",
            "hover:border-amber-800",
          )}
        >
          {/*<Select.Root>*/}
          {/*  <Select.Trigger>*/}
          {/*    <Select.Value placeholder={field.value ?? "Choose a value"} />*/}
          {/*    <Select.Icon>*/}
          {/*      <ChevronDown />*/}
          {/*    </Select.Icon>*/}
          {/*  </Select.Trigger>*/}
          {/*  <Select.Portal>*/}
          {/*    <Select.Content>*/}
          {/*      <Select.ScrollUpButton>*/}
          {/*        <ChevronUpIcon />*/}
          {/*      </Select.ScrollUpButton>*/}
          {/*      <Select.Viewport>*/}
          {/*        {field?.selectOptions?.map((option) => (*/}
          {/*          <Select.Item*/}
          {/*            value={option.value as string}*/}
          {/*            key={option.key}*/}
          {/*          >*/}
          {/*            {option.key}*/}
          {/*          </Select.Item>*/}
          {/*        ))}*/}
          {/*      </Select.Viewport>*/}
          {/*    </Select.Content>*/}
          {/*  </Select.Portal>*/}
          {/*</Select.Root>*/}
          <select>
            {field?.selectOptions?.map((option) => (
              <option
                selected={option.key === field.value}
                key={option.key}
                value={option?.value as string}
              >
                {option.key}
              </option>
            ))}
          </select>
        </Form.Control>
      </Form.Field>
    );
  }

  return (
    <Form.Field name={field.name}>
      <Form.Label>{field.name}</Form.Label>
      <Form.Control asChild>
        <input type="number" onChange={(ev) => onChange(ev.target.value)} />
      </Form.Control>
    </Form.Field>
  );
}

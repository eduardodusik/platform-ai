import { Field } from "@/components/project/nodes/customNodeTypes";
import * as Form from "@radix-ui/react-form";
import cx from "classnames";

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
        <Form.Label className="text-md font-semibold">{field.label}</Form.Label>
        <Form.Control
          asChild
          placeholder={field?.placeholder}
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
        <Form.Label className="text-md font-semibold">{field.label}</Form.Label>
        <Form.Control
          asChild
          placeholder={field?.placeholder}
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
        <Form.Label className="text-md font-semibold">{field.label}</Form.Label>
        <Form.Control
          asChild
          onChange={(ev) => onChange(ev.target.value)}
          defaultValue={field.value as string}
          placeholder={field?.placeholder}
          className={cx(
            "box-border",
            "focus:border-amber-700 focus:ring-0 ",
            "rounded border-neutral-500 bg-transparent text-white",
            "hover:border-amber-800",
          )}
        >
          <select>
            {field?.selectOptions?.map((option) => (
              <option key={option.key} value={option?.value as string}>
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

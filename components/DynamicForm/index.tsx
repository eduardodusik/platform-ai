import { Field } from "@/components/dashboard/nodes/customNodeTypes";
import * as Form from "@radix-ui/react-form";

type DynamicFormProps = {
  fields: Field[];
  onChange: (fieldName: string, newValue: any) => void;
};

export function DynamicForm({ fields, onChange }: DynamicFormProps) {
  return (
    <Form.Root>
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
  if (field.type === "text") {
    return (
      <Form.Field name={field.name}>
        <Form.Label>{field.name}</Form.Label>
        <Form.Control asChild>
          <input type="text" onChange={(ev) => onChange(ev.target.value)} />
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

import { Field } from "@/components/project/nodes/customNodeTypes";
import * as Form from "@radix-ui/react-form";
import cx from "classnames";
import * as Select from "@radix-ui/react-select";
import { BiChevronDown } from "react-icons/all";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useRFState } from "../../store/FlowStore";
import { useVariableStore } from "@/components/NewVariableDialog";
import { useMemo } from "react";
import { Node } from "reactflow";
import { StartData } from "@/components/project/nodes/start/start.type";

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
  console.log({ field });
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
            defaultValue={field.value as string}
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
            defaultValue={field.value as string}
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

  if (field.type === "set-env") {
    return <SetVariable field={field} onChange={onChange} />;
  }

  if (field.type === "use-env") {
    return <UseVariable field={field} onChange={onChange} />
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



type SetVariableProps = {
  field: Field;
  onChange: (newValue: any) => void;
};

function UseVariable({field, onChange}: SetVariableProps) {
  const { variables, nodes } = useRFState((store) => ({
    variables: store.variables,
    nodes: store.nodes,
  }));

  const parameters = useMemo(() => {
    const nodeStart = nodes.find(node => node.type ===  "START");
    if (nodeStart) {
      return [...(nodeStart as unknown as Node<StartData>).data.parameters.map(item => ({key: item.name})), ...variables];
    }
  }, [nodes, variables]);


  return (
    <Form.Field name={field.name} className="flex flex-col gap-1">
      <Form.Label className="text-md font-semibold">{field.label}</Form.Label>
      <Form.Control
        asChild
        defaultValue={field?.value as string}
        placeholder={field?.placeholder}
      >
        <Select.Root
          defaultValue={field?.value as string}
          onValueChange={(value) => {
            onChange(value);
          }}
        >
          <Select.Trigger asChild aria-label="Food">
            <button
              className={cx(
                "border-1 inline-flex w-full justify-between rounded border p-2",
                "rounded border-neutral-500 bg-transparent text-white",
                "rdx-hover:border-amber-800",
              )}
            >
              <div className="flex gap-2">
                <div className="rounded bg-neutral-700 p-px px-1">Use variable</div>
                <Select.Value />
              </div>
              <Select.Icon className="ml-2">
                <BiChevronDown />
              </Select.Icon>
            </button>
          </Select.Trigger>
          <Select.Content
            side="bottom"
            position="popper"
            className="mt-1 !min-w-[var(--radix-select-trigger-width)] rounded-lg bg-white shadow-lg dark:bg-neutral-700"
          >
            <ScrollArea.Root className="ScrollAreaRoot w-full">
              <Select.Viewport asChild className="p-4">
                <ScrollArea.Viewport className="ScrollAreaViewport">
                  {parameters?.map((variable, i) => (
                    <Select.Item
                      key={variable.key}
                      value={variable.key}
                      className={cx(
                        "relative flex items-center rounded-md p-2 text-sm font-medium text-gray-700 focus:bg-neutral-400 dark:text-gray-300 dark:focus:bg-neutral-500",
                        "cursor-pointer rdx-disabled:cursor-not-allowed rdx-disabled:opacity-50",
                        "select-none focus:outline-none",
                      )}
                    >
                      <Select.ItemText>{variable.key}</Select.ItemText>
                    </Select.Item>
                  ))}
                </ScrollArea.Viewport>
              </Select.Viewport>
              <ScrollArea.Scrollbar
                orientation="vertical"
                className="ScrollAreaScrollbar"
              >
                <ScrollArea.Thumb className="ScrollAreaThumb" />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner className="ScrollAreaCorner" />
            </ScrollArea.Root>
          </Select.Content>
        </Select.Root>
      </Form.Control>
    </Form.Field>
  )
}

function SetVariable({ field, onChange }: SetVariableProps) {
  const { variables } = useRFState((store) => ({
    variables: store.variables,
  }));

  const onOpenDialog = useVariableStore(state => state.onOpen)

  return (
    <Form.Field name={field.name} className="flex flex-col gap-1">
      <Form.Label className="text-md font-semibold">{field.label}</Form.Label>
      <Form.Control
        asChild
        defaultValue={field?.value as string}
        placeholder={field?.placeholder}
      >
        <Select.Root
          defaultValue={field?.value as string}
          onValueChange={(value) => {
            onChange(value);
          }}
        >
          <Select.Trigger asChild aria-label="Food">
            <button
              className={cx(
                "border-1 inline-flex w-full justify-between rounded border p-2",
                "rounded border-neutral-500 bg-transparent text-white",
                "rdx-hover:border-amber-800",
              )}
            >
              <div className="flex gap-2">
                <div className="rounded bg-neutral-700 p-px px-1">Apply to</div>
                <Select.Value />
              </div>
              <Select.Icon className="ml-2">
                <BiChevronDown />
              </Select.Icon>
            </button>
          </Select.Trigger>
          <Select.Content
            side="bottom"
            position="popper"
            className="mt-1 !min-w-[var(--radix-select-trigger-width)] rounded-lg bg-white shadow-lg dark:bg-neutral-700"
          >
            <ScrollArea.Root className="ScrollAreaRoot w-full">
              <Select.Viewport asChild className="p-4">
                <ScrollArea.Viewport className="ScrollAreaViewport">
                  {variables?.map((variable, i) => (
                    <Select.Item
                      key={variable.key}
                      value={variable.key}
                      className={cx(
                        "relative flex items-center rounded-md p-2 text-sm font-medium text-gray-700 focus:bg-neutral-400 dark:text-gray-300 dark:focus:bg-neutral-500",
                        "cursor-pointer rdx-disabled:cursor-not-allowed rdx-disabled:opacity-50",
                        "select-none focus:outline-none",
                      )}
                    >
                      <Select.ItemText>{variable.key}</Select.ItemText>
                    </Select.Item>
                  ))}
                </ScrollArea.Viewport>
              </Select.Viewport>
              <ScrollArea.Scrollbar
                orientation="vertical"
                className="ScrollAreaScrollbar"
              >
                <ScrollArea.Thumb className="ScrollAreaThumb" />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner className="ScrollAreaCorner" />
            </ScrollArea.Root>
            <Select.Group
              onClick={onOpenDialog}
              className={cx(
                "flex cursor-pointer items-center justify-center border-t border-neutral-600 p-4 align-middle",
                "hover:bg-neutral-600",
              )}
            >
              <Select.Separator className="h-[1px] bg-neutral-600" />
              <div className="cursor-pointer">Create new variable</div>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Form.Control>
    </Form.Field>
  );
}
//
// <Select.Separator className="h-[1px] bg-neutral-600" />
// <Select.Group>
//   <div onClick={console.log}>oi</div>
// </Select.Group>

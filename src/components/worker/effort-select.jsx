import {
  Portal,
  Select,
  createListCollection,
  Field,
  Spinner,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { useAsync } from "react-use";
import { useMemo } from "react";

export const EffortSelect = ({ control, errors, contentRef }) => {
  const state = useAsync(async () => {
    const response = await fetch("/api/efforts");
    const data = await response.json();
    return data;
  }, []);

  const collection = useMemo(() => {
    return createListCollection({
      items: state.value ?? [],
      itemToString: (effort) => effort.title,
      itemToValue: (effort) => effort.id,
    });
  }, [state.value]);

  return (
    <Field.Root invalid={!!errors.effort}>
      <Field.Label>Arbeitseinsatz</Field.Label>
      <Controller
        control={control}
        name="effortId"
        render={({ field }) => (
          <Select.Root
            name={field.title}
            value={field.value}
            onValueChange={({ value }) => field.onChange(value)}
            onInteractOutside={() => field.onBlur()}
            collection={collection}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Arbeitseinsatz aufwählen..." />
              </Select.Trigger>
              <Select.IndicatorGroup>
                {state.loading && (
                  <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />
                )}
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal container={contentRef}>
              <Select.Positioner>
                <Select.Content>
                  {collection.items.map((effort) => (
                    <Select.Item item={effort} key={effort.id}>
                      {effort.title}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      />
      <Field.ErrorText>{errors.effort?.message}</Field.ErrorText>
    </Field.Root>
  );
};

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});

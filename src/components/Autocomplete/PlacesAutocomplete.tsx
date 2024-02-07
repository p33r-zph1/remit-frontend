import { useCallback } from 'react';
import { Combobox } from '@headlessui/react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

type Props<T extends FieldValues> = UseControllerProps<T> & {
  onSelect: (position: LatLng) => void;
};

export default function PlacesAutocomplete<T extends FieldValues>({
  onSelect,
  ...controllerProps
}: Props<T>) {
  const {
    field: { onChange, value, disabled, ...otherFields },
    formState: { isSubmitting },
  } = useController(controllerProps);

  const {
    ready,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 500,
  });

  const handleSelect = useCallback(
    (description: string) => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then(results => {
        const { lat, lng } = getLatLng(results[0]!);

        onChange(description);
        onSelect({ lat, lng });
      });
    },
    [clearSuggestions, onChange, onSelect, setValue]
  );

  return (
    <Combobox
      value={value}
      onChange={handleSelect}
      disabled={!ready || disabled || isSubmitting}
    >
      <Combobox.Input
        {...otherFields}
        onChange={e => setValue(e.target.value)}
        placeholder="Start by typing a place or establishment"
        className="w-full rounded-lg border border-slate-200 p-2 text-sm font-semibold outline-primary placeholder:text-xs placeholder:font-semibold disabled:text-gray-400 disabled:hover:cursor-not-allowed"
      />

      <Combobox.Options>
        {status === 'OK' &&
          data.map(
            ({
              place_id,
              description,
              structured_formatting: { main_text, secondary_text },
            }) => (
              <Combobox.Option
                className="cursor-pointer select-none text-sm  hover:text-primary md:text-base"
                key={place_id}
                value={description}
              >
                {main_text}{' '}
                <small className="text-xs font-semibold md:text-sm">
                  {secondary_text}
                </small>
              </Combobox.Option>
            )
          )}
      </Combobox.Options>
    </Combobox>
  );
}

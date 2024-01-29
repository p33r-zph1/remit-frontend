import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { Combobox } from '@headlessui/react';
import { useCallback } from 'react';

type Props = {
  onSelect: (position: google.maps.LatLngLiteral) => void;
};

export default function PlacesAutocomplete({ onSelect }: Props) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleSelect = useCallback(
    (description: string) => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then(results => {
        const { lat, lng } = getLatLng(results[0]!);
        onSelect({ lat, lng });
      });
    },
    [clearSuggestions, onSelect, setValue]
  );

  return (
    <Combobox disabled={!ready} value={value} onChange={handleSelect}>
      <Combobox.Input
        placeholder="Stary by typing a place or establishment"
        onChange={e => setValue(e.target.value)}
        className="w-full rounded-lg border-slate-200 py-2 text-sm font-semibold placeholder:text-xs placeholder:font-semibold"
      />

      <Combobox.Options>
        {status === 'OK' &&
          data.map(
            ({
              place_id,
              description,
              structured_formatting: { main_text, secondary_text },
            }) => (
              <Combobox.Option key={place_id} value={description}>
                <strong>{main_text}</strong> <small>{secondary_text}</small>
              </Combobox.Option>
            )
          )}
      </Combobox.Options>
    </Combobox>
  );
}

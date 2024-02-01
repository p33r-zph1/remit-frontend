import {
  type FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

export default function RecipientInput<T extends FieldValues>(
  props: UseControllerProps<T>
) {
  const {
    field: { ref, onChange, ...otherFields },
    formState: { errors, isSubmitting },
  } = useController(props);

  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text text-base text-zinc-400">Recipient</span>

        {errors[props.name] && (
          <span className="label-text text-xs font-bold  text-error">
            {errors[props.name]?.message?.toString()}
          </span>
        )}
      </div>

      <NumericFormat
        inputMode="numeric"
        autoComplete="off"
        placeholder="Enter recipient number"
        className="input input-ghost rounded-lg border-0 p-0 text-2xl font-bold placeholder:text-lg placeholder:opacity-50 focus:outline-none disabled:bg-white"
        disabled={isSubmitting}
        {...otherFields}
        getInputRef={ref}
        onValueChange={values => onChange(values.value)}
      />
    </label>
  );
}

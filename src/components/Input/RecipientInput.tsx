import { NumericFormat } from 'react-number-format';

export default function RecipientInput() {
  return (
    <label className="flex flex-col">
      <span className="label-text text-base text-sleep-100">Recipient</span>
      <NumericFormat
        inputMode="numeric"
        placeholder="Enter recipient number"
        className="input input-ghost border-0 p-0 text-2xl font-bold placeholder:text-lg placeholder:opacity-50 focus:outline-none"
      />
    </label>
  );
}

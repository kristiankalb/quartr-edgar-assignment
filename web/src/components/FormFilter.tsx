import { useState } from 'react';

export const FormFilter = ({
  form,
  setForm,
}: {
  form: string | undefined;
  setForm: (form: string | undefined) => void;
}) => {
  const [inputValue, setInputValue] = useState(form ?? '');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setForm(inputValue || undefined);
      }}
    >
      <div className="flex items-center gap-2">
        <label htmlFor="form-input">Form</label>
        <input
          type="text"
          id="form-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="rounded border border-gray-300 px-2 py-1"
        />
        <button
          type="submit"
          className="rounded border border-gray-300 px-2 py-1"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

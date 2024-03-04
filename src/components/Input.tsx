import { ChangeEvent } from 'react';

type BasicInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  validate: (value: string) => void;
  errorMessage?: string;
}

const BasicInput = ({ value, onChange, validate, errorMessage }: BasicInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e); // Call the onChange prop function with the event
    validate(e.target.value); // Validate the input value
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        // Optionally, you can add styles or className to style the input
      />
      {/* Display an error message if the validation fails */}
      {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
    </div>
  );
}

export default BasicInput;

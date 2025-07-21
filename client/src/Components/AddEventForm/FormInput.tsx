import React from "react";

interface FormInputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      className="input input-bordered w-full"
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default FormInput;

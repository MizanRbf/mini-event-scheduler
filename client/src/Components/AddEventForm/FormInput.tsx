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
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      className="input input-bordered shadow border-gray-200 focus:outline-0 w-full"
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default FormInput;

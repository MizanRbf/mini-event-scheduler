import React from "react";

interface FormTextareaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <textarea
      name={name}
      value={value}
      className="textarea textarea-bordered w-full"
      onChange={onChange}
      placeholder={placeholder}
    ></textarea>
  );
};

export default FormTextarea;

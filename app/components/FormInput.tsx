import React from "react";

interface FormInputProps {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options?: { value: string; label: string }[];
  radioName?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  type = "text",
  required = false,
  options,
  radioName,
}) => {
  // --- Standard Input / Select ---
  const renderInput = () => {
    if (options) {
      // Select Dropdown
      return (
        <select
          className="h-10 bg-black/10 text-white border border-gray-700 p-2 rounded-lg focus:ring-red-500 focus:border-red-500 focus:outline-none transition-colors appearance-none"
          required={required}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-[#0D0D0D] text-white"
            >
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    // Default Text/Number Input
    return (
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-10 bg-black/10 text-white placeholder-gray-600 border border-gray-700 p-3 rounded-lg focus:ring-red-500 focus:border-red-500 focus:outline-none transition-colors"
      />
    );
  };

  // --- Checkbox / Radio Inputs ---
  const renderRadioOrCheckbox = () => {
    if (radioName) {
      return (
        <div className="flex gap-4 items-center mt-2">
          <label className="flex items-center gap-2 text-white">
            <input
              type="radio"
              name={radioName}
              value="yes"
              className="form-radio text-red-600 h-4 w-4 bg-gray-700 border-gray-600"
              defaultChecked
            />
            Yes
          </label>
          <label className="flex items-center gap-2 text-white">
            <input
              type="radio"
              name={radioName}
              value="no"
              className="form-radio text-red-600 h-4 w-4 bg-gray-700 border-gray-600"
            />
            No
          </label>
        </div>
      );
    }
    // Return standard input if no specific complex type is requested
    return renderInput();
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-200 text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {radioName ? renderRadioOrCheckbox() : renderInput()}
    </div>
  );
};

export default FormInput;

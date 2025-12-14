import React from "react";

interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options?: { value: string; label: string }[];
  radioName?: string;
}
export const MultipeChoosableInput = ({
  label,
  placeholder,
  type = "text",
  required = false,
  options,
  radioName,
  // Removed isMultiSelect prop
}) => {
  // --- Standard Input / Select ---
  const renderInput = () => {
    if (options) {
      // Select Dropdown (Single Select)
      return (
        <select
          // Removed: multiple={isMultiSelect}
          // Custom styling for single select (h-10)
          className={`
            h-10 
            bg-black/10 text-gray-700 border border-gray-700 p-2 
            rounded-lg focus:ring-red-500 focus:border-red-500 focus:outline-none 
            transition-colors
            appearance-none /* Ensure it renders as a dropdown with arrow */
          `}
          required={required}
        >
          {/* Placeholder is always visible */}
          <option value="" disabled hidden>
            {placeholder}
          </option>

          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              // Standard background color for options in dark mode
              className="bg-[#0D0D0D] text-gray-700"
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
        className="h-10 bg-black/10 text-gray-700 placeholder-gray-600 border border-gray-700 p-3 rounded-lg focus:ring-red-500 focus:border-red-500 focus:outline-none transition-colors"
      />
    );
  };

  // --- Checkbox / Radio Inputs ---
  const renderRadioOrCheckbox = () => {
    if (radioName) {
      return (
        <div className="flex gap-4 items-center mt-2">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              name={radioName}
              value="yes"
              className="form-radio text-red-600 h-4 w-4 bg-gray-700 border-gray-600"
              defaultChecked
            />
            Yes
          </label>
          <label className="flex items-center gap-2 text-gray-700">
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
    // Return standard input/select if no specific complex type is requested
    return renderInput();
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-800 text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {radioName ? renderRadioOrCheckbox() : renderInput()}
    </div>
  );
};

interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options?: { value: string; label: string }[];
  radioName?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  disabled,
  type = "text",
  required = false,
  maxLength,
  value,
  onChange,
  options,
  radioName,
}) => {
  // --- Select ---
  if (options) {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-gray-800 text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        <select
          value={value ?? ""}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="h-10 bg-white/30 text-gray-700 border border-gray-400 p-2 rounded-lg focus:ring-red-500 focus:border-red-500 focus:outline-none"
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // --- Radio ---
  if (radioName) {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-gray-800 text-sm font-medium">{label}</label>

        <div className="flex gap-4">
          {["yes", "no"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-black">
              <input
                type="radio"
                name={radioName}
                value={opt}
                checked={value === opt}
                onChange={onChange}
              />
              {opt.toUpperCase()}
            </label>
          ))}
        </div>
      </div>
    );
  }

  // --- Text Input ---
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-800 text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        value={value ?? ""}
        onChange={onChange}
        className="h-10 bg-white/40 text-gray-700 placeholder-gray-400 border border-gray-400 p-3 rounded-lg focus:ring-red-300 focus:border-red-300"
      />
    </div>
  );
};

export default FormInput;

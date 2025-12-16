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
  disabled,
  value,
  onChange,
  options,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options?: { value: string; label: string }[];
}) => {
  const renderInput = () => {
    if (options) {
      return (
        <select
          value={value ?? ""}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="
            h-10 bg-black/10 text-gray-700 border border-gray-700 p-2
            rounded-lg focus:ring-red-500 focus:border-red-500
            appearance-none
          "
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
      );
    }

    return (
      <input
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        className="h-10 bg-black/10 text-gray-700 border border-gray-700 p-3 rounded-lg"
      />
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-800 text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {renderInput()}
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

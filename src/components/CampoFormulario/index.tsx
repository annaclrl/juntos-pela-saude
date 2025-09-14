

type CampoFormProps = {
  label: string;
  type?: React.HTMLInputTypeAttribute; 
  id: string;
  name?: string;
  placeholder?: string;
  multiline?: boolean;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  className?: string;
  error?: string;
  disabled?: boolean;
  title?: string;
};

const CampoFormulario = ({
  label,
  type = "text",
  id,
  name,
  placeholder,
  multiline = false,
  value,
  onChange,
  required = false,
  className = "",
  error,
  disabled = false,
}: CampoFormProps) => {
  return (
    <div className={`campo ${className}`}>
      <label htmlFor={id}>{label}</label>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required}
          aria-label={label}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required}
          aria-label={label}
          disabled={disabled}
        />
      )}

      {error && <span className="erro">{error}</span>}
    </div>
  );
};

export default CampoFormulario;

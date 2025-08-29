import './CampoFormulario.css'

type CampoFormProps = {
  label: string;
  type?: string;
  id: string;
  name?: string;
  placeholder?: string;
  multiline?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string; 
};

const CampoFormulario = ({
  label,
  type = 'text',
  id,
  name,
  placeholder,
  multiline = false,
  value,
  onChange,
  required = false,
  className = ''
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
        />
      )}
    </div>
  );
};

export default CampoFormulario;

import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";

const FormField = ({ 
  type = "input", 
  name, 
  value, 
  onChange, 
  label, 
  placeholder,
  error,
  helperText,
  required = false,
  ...props 
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(name, e.target.value);
    }
  };

  const commonProps = {
    name,
    value,
    onChange: handleChange,
    label: required ? `${label} *` : label,
    placeholder,
    error,
    helperText,
    ...props
  };

  if (type === "textarea") {
    return <Textarea {...commonProps} />;
  }

  return <Input type={type} {...commonProps} />;
};

export default FormField;
type Options = {
  label: string;
  value: string;
};

type Propstype = {
  label?: string;
  name?: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Options[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
const Select = (props: Propstype) => {
  const { label, name, defaultValue, disabled, options } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className="bg-gray-200 p-3 rounded-sm w-full "
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

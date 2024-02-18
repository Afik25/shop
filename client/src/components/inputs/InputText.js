const InputText = (props) => {
  return (
    <div className="input-div">
      <input
        type={props.type}
        name={props.name}
        className="input-form"
        autoComplete="none"
        placeholder=" "
      />
      <label htmlFor={props.name} className="label-form">
        {props.placeholder}
      </label>
      <label htmlFor={props.name} className="label-icon">
        {props.icon}
      </label>
    </div>
  );
};
export default InputText;

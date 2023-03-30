const FormrowSelect = (props) => {
  console.log(props.lista);
  return (
    <div className="form-row">
      <label htmlFor={props.name} className="form-label">
        {props.labelText || props.name}
      </label>
      <select
        name={props.name}
        value={props.value}
        // selected={props.value}
        onChange={props.handleChange}
        className="form-select"
      >
        <option disabled hidden value="">
          --Zgjedh--
        </option>
        {props.lista.map((itemValue) => {
          return (
            <option
              key={itemValue.id || itemValue}
              value={itemValue.id || itemValue}
              data-celesi={itemValue.id || itemValue}
            >
              {itemValue.emertimi || itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormrowSelect;

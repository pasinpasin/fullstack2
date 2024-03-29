const FormCheckBox = (props) => {
  const checkList = [
    "Admin",
    "Pedagog",
    "ShefDep",
    "Dekan",
    "Kurrikula",
  ];
  console.log(props.arr)
  console.log( props.arr.includes('pedagog'))

  return (
    <div className="form-row">
      <label htmlFor={props.name} className="form-label">
        {props.labelText || props.name}
      </label>

      {checkList.map((itemValue, index) => {
        return (
          <div key={index}>
            <input
              value={itemValue}
              type="checkbox"
              key={index}
              id={index}
              onChange={props.handleChange}
              checked={ props.arr.includes(itemValue)}
              
            />
            {itemValue}
            
          </div>
        );
      })}
    </div>
  );
};

export default FormCheckBox;

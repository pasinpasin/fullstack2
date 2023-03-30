const Alert2 = (props) => {
  console.log(props.alertType)
  return (
    <div className={`alert alert-${props.alertType}`}>{props.alertText}</div>
  );
};

export default Alert2;

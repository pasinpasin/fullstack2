const Alert = ({ variant, children }) => {
  //console.log(alertText);
  return <div className={`alert alert-${variant}`}>{children}</div>;
};

Alert.defaultProps = {
  variant: "info",
};

export default Alert;

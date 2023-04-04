import { useState } from "react";
const Alert = ({ variant, children }) => {
  const [isShow, setIsShow] = useState(true);
  const handleClose = (e) => {
    e.preventDefault();
    setIsShow(false);
  };
  //console.log(alertText);
  return (
    <div className={isShow ? `alert alert-${variant}` : "hide"}>
      <span className="closebtn" onClick={handleClose}>
        &times;
      </span>
      {children}
    </div>
  );
};

Alert.defaultProps = {
  variant: "info",
};

export default Alert;

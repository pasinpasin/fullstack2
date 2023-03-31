import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import image from "../assets/images/logo_universiteti_i_shkodres_luigj_gurakuqi.png";

const WelcomePage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",

        height: "500px",
        width: "500px",
        backgroundposition: "center",
      }}
    >
      Miresevini
    </div>
  );
};

export default WelcomePage;

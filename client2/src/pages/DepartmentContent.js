import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Wrapper from "../assets/wrappers/TabsWrapper";

import { useParams } from "react-router-dom";

import Programet from "./Programet";
import Pedagoget from "./Pedagoget";

const DepartamentContent = () => {
  //const [values, setValues] = useState(initialState);
  //const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("tab1");
  //  Functions to handle Tab Switching
  const handleTab1 = () => {
    // update the state to programet
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to pedagoget
    setActiveTab("tab2");
  };

  return (
    <Wrapper>
      <div className="Tabs">
        <ul className="nav">
          <li
            className={activeTab === "tab1" ? "active" : ""}
            onClick={handleTab1}
          >
            Programet
          </li>
          <li
            className={activeTab === "tab2" ? "active" : ""}
            onClick={handleTab2}
          >
            Pedagoget
          </li>
        </ul>

        <div className="outlet">
          {activeTab === "tab1" ? <Programet /> : <Pedagoget />}
        </div>
      </div>
    </Wrapper>
  );
};

export default DepartamentContent;

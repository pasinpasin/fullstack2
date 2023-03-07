import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Wrapper from "../assets/wrappers/TabsWrapper";
import Alert from "../components/Alert";
import { Tabs, Tab, Content } from "../components/TabsComp";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ShtoForm from "../components/ShtoForm";
import ModifikoForm from "../components/ModifikoForm";
import axios from "axios";
import Tabela from "../components/Tabela";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import Semestri from "./Semestri";
import { useParams } from "react-router-dom";

import useHttpClient from "../hooks/useHttpClient";

const Planpermbajtja = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { id } = useParams();
  const [planet, setPlanet] = useState();

  const setFilter = (plani, sem) => {
    return plani.filter(
      (planpermbajtja) => planpermbajtja.viti === sem
    );
  };
  const getData = async () => {
    try {
      const response = await sendRequest(
        `plani/${id}/planpermbajtja`,
        "GET",
        {}
      );
      console.log(response.data.result.items);
      setPlanet(response.data.result.items);
      //console.log(setFilter(planet, "Semestri 1"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  let url = "/departamenti/id/programi";

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
  const handleTab3 = () => {
    // update the state to pedagoget
    setActiveTab("tab3");
  };
  const handleTab4 = () => {
    // update the state to pedagoget
    setActiveTab("tab4");
  };
  const handleTab5 = () => {
    // update the state to pedagoget
    setActiveTab("tab5");
  };
 

  return (
    <Wrapper>
      {isLoading || planet == null ? (
        <Loading center />
      ) : (
        <div className="Tabs">
          {error.alertType !== "" ?? (
            <Alert alertType={error.alertType} alertText={error.alertText} />
          )}
          <ul className="nav">
            <li
              className={activeTab === "tab1" ? "active" : ""}
              onClick={handleTab1}
            >
              Vit 1
            </li>
            <li
              className={activeTab === "tab2" ? "active" : ""}
              onClick={handleTab2}
            >
              Viti 2
            </li>
            <li
              className={activeTab === "tab3" ? "active" : ""}
              onClick={handleTab3}
            >
              Viti 3
            </li>
            <li
              className={activeTab === "tab4" ? "active" : ""}
              onClick={handleTab4}
            >
              Viti 4
            </li>
            <li
              className={activeTab === "tab5" ? "active" : ""}
              onClick={handleTab5}
            >
              Viti 5
            </li>
          </ul>

          <div className="outlet">
            {activeTab === "tab1" ? (
              <Semestri sem={setFilter(planet, 1)} />
            ) : activeTab === "tab2" ? (
              <Semestri sem={setFilter(planet, 2)} />
            ) : activeTab === "tab3" ? (
              <Semestri sem={setFilter(planet, 3)} />
              ): activeTab === "tab4" ? (
                <Semestri sem={setFilter(planet, 4)} />
                ):  (
                  <Semestri sem={setFilter(planet, 5)} />)
            }
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Planpermbajtja;

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Tabela";
import Loading from "./Loading";
import Alert from "./Alert";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Semestri from "./Semestri";
import { useParams } from "react-router-dom";
const Listoplanpermbajtja = ({
  planpermbajtja,
  handleEdit,
  handleDelete,
  setIsAdding,
}) => {
  const dispatch = useDispatch();
  const planiState = useSelector((state) => state.planiState);
  const { id } = useParams();
  const [planet, setPlanet] = useState();
  const [zgjedhje, setZgjedhje] = useState();
  const setFilter = (plani, sem) => {
    return plani.filter(
      (planpermbajtja) =>
        (planpermbajtja.viti || planpermbajtja.lenda.viti) === sem
    );
  };

  let url = "/plani/id/planpermbajtja";

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
      <div className="Tabs">
        <ul className="nav" key="nav">
          <li
            key="tab1"
            className={activeTab === "tab1" ? "active" : ""}
            onClick={handleTab1}
          >
            Viti 1
          </li>
          <li
            key="tab2"
            className={activeTab === "tab2" ? "active" : ""}
            onClick={handleTab2}
          >
            Viti 2
          </li>
          <li
            key="tab3"
            className={activeTab === "tab3" ? "active" : ""}
            onClick={handleTab3}
          >
            Viti 3
          </li>
          <li
            key="tab4"
            className={activeTab === "tab4" ? "active" : ""}
            onClick={handleTab4}
          >
            Viti 4
          </li>
          <li
            key="tab5"
            className={activeTab === "tab5" ? "active" : ""}
            onClick={handleTab5}
          >
            Viti 5
          </li>
        </ul>

        <div className="outlet">
          {activeTab === "tab1" ? (
            <Semestri
              sem={setFilter(planet, 1)}
              zgjedhje={setFilter(zgjedhje, 1)}
              viti={1}
              planiid={id}
            />
          ) : activeTab === "tab2" ? (
            <Semestri
              sem={setFilter(planet, 2)}
              zgjedhje={setFilter(zgjedhje, 2)}
              viti={2}
              planiid={id}
            />
          ) : activeTab === "tab3" ? (
            <Semestri
              sem={setFilter(planet, 3)}
              zgjedhje={setFilter(zgjedhje, 3)}
              viti={3}
              planiid={id}
            />
          ) : activeTab === "tab4" ? (
            <Semestri
              sem={setFilter(planet, 4)}
              zgjedhje={setFilter(zgjedhje, 4)}
              viti={4}
              planiid={id}
            />
          ) : (
            <Semestri
              sem={setFilter(planet, 5)}
              zgjedhje={setFilter(zgjedhje, 5)}
              viti={5}
              planiid={id}
            />
          )}
        </div>
      </div>
    </Wrapper>
  );
};
export default Listoplanpermbajtja;

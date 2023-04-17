
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Wrapper from "../assets/wrappers/TabsWrapper";

import Semestri from "../components/Semestri";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPlanpermbajtje } from "../features/planpermbajtjaSlice";
import { getLendemezgjedhje } from "../features/lendeMeZgjedhjeSlice";
import EditableTable from "../components/EditableTable";

const Planpermbajtja = () => {

  const dispatch = useDispatch();
  const planpermbajtjaState = useSelector((state) => state.planpermbajtjaState);
  const lendemezgjedhjeState = useSelector((state) => state.lendemezgjedhjeState);
  const { planpermbajtja } = planpermbajtjaState;
  const { lendemezgjedhje } = lendemezgjedhjeState;
  const { id } = useParams();

  const setFilter = (plani, sem) => {
    return plani.filter(
      (planpermbajtja) =>
        (planpermbajtja.viti || planpermbajtja.lenda.viti) === sem
    );
  };
  const totalet = (myarray) => {
    let newobj = myarray.reduce(
      function (previousValue, currentValue) {
        return {
          totkredite:
            currentValue.tipiveprimtarise !== "m"
              ? previousValue.totkredite + currentValue.kredite
              : previousValue.totkredite,
          totngarkesasem1:
            currentValue.tipiveprimtarise !== "m"
              ? previousValue.totngarkesasem1 +
                currentValue.leksionesem1 +
                currentValue.seminaresem1 +
                currentValue.praktikasem1 +
                currentValue.laboratoresem1
              : previousValue.totngarkesasem1,
          totngarkesasem2:
            currentValue.tipiveprimtarise !== "m"
              ? previousValue.totngarkesasem2 +
                currentValue.leksionesem2 +
                currentValue.seminaresem2 +
                currentValue.praktikasem2 +
                currentValue.laboratoresem2
              : previousValue.totngarkesasem2,
        };
      },
      { totkredite: 0, totngarkesasem1: 0, totngarkesasem2: 0 }
    );

    return newobj;
  };


  useEffect(() => {
    console.log("efekt planpermb")
    dispatch(getPlanpermbajtje(id));
    dispatch(getLendemezgjedhje(id));
  }, [dispatch,id]);

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
      {planpermbajtjaState.getPlanpermbajtjeStatus === "pending" || lendemezgjedhjeState.getLendemezgjedhjeStatus==="pending" ? (
        <Loading center />
      ) : (
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
                sem={setFilter(planpermbajtja, 1)}
                zgjedhje={setFilter(lendemezgjedhje, 1)}
                viti={1}
                planiid={id}
                
                getdata={planpermbajtja}
              />
            ) : activeTab === "tab2" ? (
              <Semestri
                sem={setFilter(planpermbajtja, 2)}
                zgjedhje={setFilter(lendemezgjedhje, 2)}
                
                viti={2}
                planiid={id}
                getdata={lendemezgjedhje}
              />
            ) : activeTab === "tab3" ? (
              <Semestri
                sem={setFilter(planpermbajtja, 3)}
                zgjedhje={setFilter(lendemezgjedhje, 3)}
                viti={3}
                planiid={id}
                
                getdata={planpermbajtja}
              />
            ) : activeTab === "tab4" ? (
              <Semestri
                sem={setFilter(planpermbajtja, 4)}
                zgjedhje={setFilter(lendemezgjedhje, 4)}
                viti={4}
                planiid={id}
                
                getdata={planpermbajtja}
              />
            ) : (
              <Semestri
                sem={setFilter(planpermbajtja, 5)}
                zgjedhje={setFilter(lendemezgjedhje, 5)}
                viti={5}
                planiid={id}
                
                getdata={planpermbajtja}
              />
            )}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Planpermbajtja;

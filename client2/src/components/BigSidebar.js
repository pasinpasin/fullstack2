import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useDispatch, useSelector } from "react-redux";
import NavLinks from "./NavLinks";

function BigSidebar() {
  const {showSidebar} = useSelector((state) => state.view);
  
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
}

export default BigSidebar;

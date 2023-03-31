import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { toggleSidebar } from "../actions/viewActions";
function SmallSidebar() {
  const showSidebar = useSelector((state) => state.view);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={dispatch(toggleSidebar)}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={dispatch(toggleSidebar)} />
        </div>
      </div>
    </Wrapper>
  );
}

export default SmallSidebar;

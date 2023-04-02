import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Logo from "./Logo";
import { useState } from "react";
import { toggleSidebar } from "../actions/viewActions";
import { logout } from "../actions/userActions";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();
  
  const userlogin = useSelector((state) => state.loginUser); //marre nga store.js 

  const { loading, user, authTokens, error } = userlogin;
  const useToggleClick = () => {
   // const dispatch = useDispatch();
    
    return () => dispatch(toggleSidebar());
  };
  const myClick = useToggleClick()
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
         // onClick={() =>dispatch(toggleSidebar())}
         onClick={myClick}
          
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.email}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={logoutHandler}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;

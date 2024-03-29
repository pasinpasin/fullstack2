import React, {
  useReducer,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import reducer from "./reducer";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { validate } from "../utils/validator";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  GET_FAKULTETE_SUCCESS,
  GET_FAKULTETE_BEGIN,
  GET_FAKULTETE_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_ERROR,
  SHTO_FAKULTET_BEGIN,
  SHTO_FAKULTET_SUCCESS,
  SHTO_FAKULTET_ERROR,
  GET_PEDAGOG_BEGIN,
  GET_PEDAGOG_SUCCESS,
  GET_PEDAGOG_ERROR,
  VALIDO_INPUT,
  TOUCH_INPUT,
  GET_CURRENT_USER_AUTH,
  TOKEN_REFRESH,
} from "./Actions";

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  //user: user ? JSON.parse(user) : null,
  user: sessionStorage.getItem("authTokens")
    ? jwt_decode(sessionStorage.getItem("authTokens"))
    : null,
  authTokens: sessionStorage.getItem("authTokens")
    ? JSON.parse(sessionStorage.getItem("authTokens"))
    : null,
  userfakultet: null,
  userdepartament: null,
  userrole: null,

  showSidebar: true,
  fakultetet: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("app context");
  const baseURL = "http://127.0.0.1:8000";

  //axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
  const authFetch = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${state.authTokens?.access}` },

    //validateStatus: false,
  });
  const activeHttpRequests = useRef([]);

  const options = {
    // buttom sections

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    // top section
  };

  /* authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      //console.log(error.response.data.message);
      if (error.response.status === 401) {
        logoutUser();
      }
      let errormsg = error.response.data.message;
      if (errormsg.includes("expired")) {
        logoutUser();
      }

      return Promise.reject(error);
    }
  ); */

  /*  authFetch.interceptors.request.use(async (req) => {
    let user = jwt_decode(state.authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/token/refresh/`, {
      refresh: state.authTokens.refresh,
    });

    sessionStorage.setItem("authTokens", JSON.stringify(response.data));
    const authTokens = response.data;
    user = jwt_decode(response.data.access);

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: { user, authTokens },
    });

    //setAuthTokens(response.data);
    //setUser(jwt_decode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  }); */

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 30000);
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const loginUser = useCallback(async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    await delay(1000);
    try {
      //console.log(currentUser);
      const response = await axios.post(
        //"/api/v1/users/signin",
        "http://127.0.0.1:8000/token/",

        currentUser,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        const { data } = response;
        const authTokens = data;

        const user = jwt_decode(data.access);
        sessionStorage.setItem("authTokens", JSON.stringify(data));
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: { user, authTokens },
        });
        // navigate("/");
      } else if (response.status === 401) {
        dispatch({
          type: LOGIN_USER_ERROR,
          payload: { msg: "Kredenciale te gabuara" },
        });
      }
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        dispatch({
          type: LOGIN_USER_ERROR,
          payload: { msg: "Serveri nuk pergjigjet" },
        });
      } else if (error.response?.status === 400) {
        dispatch({
          type: LOGIN_USER_ERROR,
          payload: { msg: "Mungon username ose password" },
        });
      } else if (error.response?.status === 401) {
        dispatch({
          type: LOGIN_USER_ERROR,
          payload: { msg: "Nuk jeni te autorizuar" },
        });
      } else {
        dispatch({
          type: LOGIN_USER_ERROR,
          payload: { msg: "Login failed" },
        });
      }
    }

    clearAlert();
  }, []);

  const sendRequest = useCallback(async (url, method, body = {}, tipi) => {
    // setIsLoading(true);
    // console.log(tipi);
    /* const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl); */
    dispatch({ type: `${tipi}_BEGIN` });

    try {
      const response = await authFetch({
        method: method,
        //url: authFetch,
        url: `${baseURL}/${url}`,
        data: body,
      });
      //const data = response.data;
      console.log(response);
      //const responseData = response.data;

      // console.log(response.data.data )
      //const fakultetet = response.data.fakultetet;
      //console.log({ responseData });
      dispatch({
        type: `${tipi}_SUCCESS`,
        payload: { response },
        // payload: { fakultetet }
      });
      /* 
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        ); */
      clearAlert();
      return response;
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        console.log(error.response);
        dispatch({
          type: `${tipi}_ERROR`,
          payload: {
            msg:
              error.response.data.error.details.detail ||
              error.response.data.error.details,
          },
        });
      } else {
        console.log(error);
        dispatch({
          type: `${tipi}_ERROR`,
          payload: { msg: "gabim ne server" },
        });
      }
      clearAlert();
    }
  });

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = async () => {
    //await axios.get("/api/v1/auth/getCurrentUser/logout");

    sessionStorage.removeItem("authTokens");

    dispatch({ type: LOGOUT_USER });
  };

  const useAxios = () => {
    const axiosInstance = axios.create({
      baseURL,
      headers: { Authorization: `Bearer ${state.authTokens?.access}` },
    });

    axiosInstance.interceptors.request.use(async (req) => {
      const user = jwt_decode(state.authTokens.access);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) return req;

      const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: state.authTokens.refresh,
      });

      sessionStorage.setItem("authTokens", JSON.stringify(response.data));

      //const authTokens = response.data;
      //const user = jwt_decode(response.data.access);
      dispatch({
        type: TOKEN_REFRESH,
        payload: {
          user: jwt_decode(response.data.access),
          authTokens: response.data,
        },
      });

      //setAuthTokens(response.data);
      //setUser(jwt_decode(response.data.access));

      req.headers.Authorization = `Bearer ${response.data.access}`;
      return req;
    });

    return axiosInstance;
  };

  const ListoFakultetet = async () => {
    //console.log(axios.defaults.headers);
    dispatch({ type: GET_FAKULTETE_BEGIN });
    try {
      const { user } = state.user;
      console.log(user);
      // const { data } = await authFetch.get("/api/v1/fakulteti", user, {
      const { data } = await authFetch.get("/fakulteti", {
        // headers: "Cache-Control: no-cache, no-store",
      });
      const fakultetet = data.data.fakultetet;
      //console.log(fakultetet);

      //console.log({ data });
      dispatch({ type: GET_FAKULTETE_SUCCESS, payload: { fakultetet } });
    } catch (error) {
      dispatch({
        type: GET_FAKULTETE_ERROR,
        payload: { msg: error.response.data.message },
      });
      console.log(error.response.data.message);
    }
    clearAlert();
  };

  const getCurrentUser = useCallback(async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });

    const authT = JSON.parse(sessionStorage.getItem("authTokens"));

    try {
      if (authT) {
        //console.log(dayjs.unix(jwt_decode(authT.access).exp));
        //console.log(dayjs());
        //console.log();
        const isExpired =
          dayjs.unix(jwt_decode(authT.access).exp).diff(dayjs()) < 1;
        console.log(isExpired);
        if (isExpired) {
          console.log(authT);
          console.log(authT.access);
          let response = await axios.post(
            "http://127.0.0.1:8000/token/refresh/",

            {
              refresh: authT.refresh,
            }
          );

          //console.log(response);
          if (response.status === 200) {
            const authTokens = response.data;

            const user = jwt_decode(response.data.access);
            sessionStorage.setItem("authTokens", JSON.stringify(response.data));
            dispatch({
              type: GET_CURRENT_USER_SUCCESS,
              payload: { user, authTokens },
            });
          } else {
            dispatch({
              type: GET_CURRENT_USER_AUTH,
            });
            logoutUser();
          }
        } else {
          dispatch({
            type: GET_CURRENT_USER_SUCCESS,
            payload: {
              user: jwt_decode(sessionStorage.getItem("authTokens")),
              authTokens: JSON.parse(sessionStorage.getItem("authTokens")),
            },
          });
        }
      } else {
        dispatch({
          type: GET_CURRENT_USER_AUTH,
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        logoutUser();
      } else {
        console.log(error);
        dispatch({
          type: GET_CURRENT_USER_ERROR,
          payload: { msg: "gabim ne server" },
        });
      }
      clearAlert();
    }
  });

  useEffect(() => {
    console.log("getcurretuser");
    getCurrentUser();

    /*  let fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      getCurrentUser();
    }, fourMinutes);
    return () => clearInterval(interval); */
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        loginUser,
        dispatch,
        toggleSidebar,
        logoutUser,
        ListoFakultetet,
        sendRequest,
        getCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };

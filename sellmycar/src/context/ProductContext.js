import React, { Children, createContext, useContext, useEffect, useReducer, useState } from 'react'
import axios from "axios";
import reducer from "../reducer/ProductReducer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContext = createContext();
const API = "http://localhost:4500";

const initialState = {
  isLoading: false,
  isError: false,
  product: [],
  isloggedIn: false,
  roll: ""
}

const ProductContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  const RegisterFun = async (values) => {
    // console.log("register values", values);
    const { data } = await axios.post(`${API}/auth/register`, values);
    console.log("register data", data);
    if (data.status) {
      dispatch({ type: "SET_LOGIN_USER", payload: data.user });
      toast.success(data.message, toastOptions)
      return true
    } else {
      // console.log("else")
      toast.error(data.message, toastOptions);
      dispatch({ type: "SET_ERROR" });
      return false
      // console.log("data", data);
    }
  }

  const LogIn = async (values) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const { data } = await axios.post(`${API}/auth/login`, values);
      console.log("login data", data)
      if (data.status) {
        localStorage.setItem("attryb", JSON.stringify({ id: data.user._id, roll: data.user.roll }))
        dispatch({ type: "SET_LOGIN_USER", payload: data.user });
        return true
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR" });
      return false
    }
  }

  const LogoutFun = () => {
    dispatch({ type: "SET_LOGOUT" });
    localStorage.removeItem("attryb");
    return true
  }

  const isLoggedFun = (values) => {
    if (values) {
      dispatch({ type: "SET_LOGIN_USER", payload: values });
      return true;
    } else {
      return false;
    }
  }

  return (
    <AppContext.Provider value={{ ...state, RegisterFun, LogIn, LogoutFun, isLoggedFun }}>
      {children}
    </AppContext.Provider>
  )
}

// custome hooks
const useProductContext = () => {
  return useContext(AppContext);
}

export { ProductContext, AppContext, useProductContext }
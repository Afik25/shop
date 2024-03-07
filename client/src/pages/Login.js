import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import ControlLanguage from "../components/languages/ControlLanguage";
import { BsEyeSlash, BsEye } from "../middlewares/icons";
//
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaLogin, wait } from "../utils/utils";
//
import { login } from "../services/authentication";
import useAuth from "../hooks/context/hooks/useAuth";
//
const Login = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [onRequest, setOnRequest] = useState({ show: false, onSucces: false });
  const [countries, setCountries] = useState();
  const [msg, setMsg] = useState("");

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchemaLogin),
  });

  const onSubmit = async (data) => {
    setIsSending(true);
    await wait(1000);
    //
    login(data)
      .then((result) => {
        let response = result;
        if (result?.data?.isLogged) {
          setIsSending(false);
          setMsg(result?.data?.message);
          setOnRequest({ show: true, onSucces: true });
        }
        const accessToken = response?.data?.accessToken;
        const sys_role = response?.data?.sys_role;
        const to = "/" + sys_role;
        const timer = setTimeout(() => {
          setOnRequest({ show: false, onSucces: false });
          setAuth({ sys_role, accessToken });
          navigate(to, { replace: true });
        }, 2000);
        return () => clearTimeout(timer);
      })
      .catch((error) => {
        setIsSending(false);
        setOnRequest({ show: true, onSucces: false });
        if (!error?.response) {
          setMsg("No server response");
        } else {
          setMsg(error?.response?.data?.message);
        }
        const timer = setTimeout(() => {
          setOnRequest({ show: false, onSucces: false });
        }, 2000);
        return () => clearTimeout(timer);
      });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shop - Sign In</title>
        <meta
          name="description"
          content="Enregister votre organisation afin de beneficier des avantages."
        />
        <meta
          name="keywords"
          content="Se connecter, Login, Connexion, Sign In, Shop, Vente, Sell, Sales, Buy"
        />
      </Helmet>
      <div className="sign-in-up">
        <div className="head">
          <Link to="/" className="link logo">
            <img src={process.env.PUBLIC_URL + "/logo.png"} />
          </Link>
          <ControlLanguage />
        </div>
        <div className="container">
          <div className="left">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <h2 className="title t-1">Sing In</h2>
              <p className="title t-3">
                Get connected and start manage your activities with Shop
              </p>
              {onRequest.show && (
                <div
                  className={
                    onRequest.onSucces
                      ? "msg-box onSuccess fade-in"
                      : "msg-box onFailed fade-in"
                  }
                >
                  {msg}
                </div>
              )}
              <div className="form-components">
                <div className="input-div">
                  <input
                    type="text"
                    className="input-form"
                    autoComplete="none"
                    placeholder=" "
                    {...register("username")}
                  />
                  <label htmlFor="username" className="label-form">
                    Username ou E-mail ou Telephone
                  </label>
                  {errors.username && (
                    <span className="fade-in">{errors.username.message}</span>
                  )}
                </div>
                <div className="input-div">
                  <input
                    type={showPwd ? "text" : "password"}
                    className="input-form"
                    autoComplete="none"
                    placeholder=" "
                    {...register("password")}
                  />
                  <label htmlFor="password" className="label-form">
                    Password
                  </label>
                  <label htmlFor="password" className="label-icon">
                    {showPwd ? (
                      <BsEye
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPwd(!showPwd)}
                      />
                    ) : (
                      <BsEyeSlash
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPwd(!showPwd)}
                      />
                    )}
                  </label>
                  {errors.password && (
                    <span className="fade-in">{errors.password.message}</span>
                  )}
                </div>
              </div>
              <div className="input-div display-flex justify-content-flex-end">
                <Link to="" className="link">
                  Forgot password ?
                </Link>
              </div>
              <button
                type="submit"
                className={isSending ? "width button" : "width button normal"}
              >
                {isSending ? "Connexion..." : "Sign In"}
              </button>
              <div className="get_sign-in">
                <span>You don't have account ?</span>
                <Link to="/register" className="btn-sign-in link">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
          <div className="right">
            <h1 className="title t-1">Shop</h1>
            <h3 className="title t-2">
              Let us help you to grow up your business!
            </h3>
            <p className="title t-3">
              The log in process allowing you to manage in the quick and easy way all about your ressources.
            </p>
          </div>
        </div>
        <div className="foot">
          <span>
            All rights reserved Afik Foundation &copy; 2023 - Shop Platform.
          </span>
        </div>
      </div>
    </HelmetProvider>
  );
};
export default Login;

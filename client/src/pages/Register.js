import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import ControlLanguage from "../components/languages/ControlLanguage";
import { BsEyeSlash, BsEye } from "../middlewares/icons";
//
import axios from "../middlewares/http-common";
import { COUNTRIES } from "../routes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaRegister, wait } from "../utils/utils";
import { registerOrganization } from "../services/register";

const Register = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [onRequest, setOnRequest] = useState({ show: false, onSucces: false });
  const [countries, setCountries] = useState();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const getCountries = async () => {
      const response = await axios.get(COUNTRIES, {
        signal: signal,
      });
      setCountries(response?.data?.countries);
    };
    getCountries();

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchemaRegister),
    defaultValues: { gcu: false },
  });

  const onSubmit = async (data) => {
    setIsSending(true);
    await wait(1000);
    registerOrganization(data)
      .then((result) => {
        if (result?.data?.status === 1) {
          setIsSending(false);
          setMsg(result?.data?.message);
          setOnRequest({ show: true, onSucces: true });
          reset();
        }
        const timer = setTimeout(() => {
          setOnRequest({ show: false, onSucces: false });
          navigate("/login");
        }, 3000);
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
        }, 3000);
        return () => clearTimeout(timer);
      });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shop - Sign Up</title>
        <meta
          name="description"
          content="Enregister votre organisation afin de beneficier des avantages."
        />
        <meta name="keywords" content="Shop, Vente, Sell, Sales, Buy" />
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
              <h2 className="title t-1">Sing Up</h2>
              <p className="title t-3">Create account to start using Shop</p>
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
                    {...register("organization")}
                  />
                  <label htmlFor="organization" className="label-form">
                    Organization's Name
                  </label>
                  {errors.organization && (
                    <span className="fade-in">
                      {errors.organization.message}
                    </span>
                  )}
                </div>
                <div className="input-div">
                  <select className="input-form" {...register("country")}>
                    <option value=" " style={{ color: "grey" }}>
                      Organization's Country (Select country)
                    </option>
                    {countries?.length ? (
                      countries.map((country) => {
                        return (
                          <option
                            key={country.name.official}
                            value={country.name.official}
                          >
                            {country.name.official}
                          </option>
                        );
                      })
                    ) : (
                      <option value="" disabled>
                        No Information
                      </option>
                    )}
                  </select>
                  {errors.country && (
                    <span className="fade-in">{errors.country.message}</span>
                  )}
                </div>
                <div className="input-div fragment-48">
                  <input
                    type="text"
                    className="input-form"
                    autoComplete="none"
                    placeholder=" "
                    {...register("prename")}
                  />
                  <label htmlFor="prename" className="label-form">
                    Prename
                  </label>
                  {errors.prename && (
                    <span className="fade-in">{errors.prename.message}</span>
                  )}
                </div>
                <div className="input-div fragment-48">
                  <input
                    type="text"
                    className="input-form"
                    autoComplete="none"
                    placeholder=" "
                    {...register("name")}
                  />
                  <label htmlFor="name" className="label-form">
                    Name
                  </label>
                  {errors.name && (
                    <span className="fade-in">{errors.name.message}</span>
                  )}
                </div>
                <div className="input-div">
                  <input
                    type="text"
                    className="input-form"
                    autoComplete="none"
                    placeholder=" "
                    {...register("username")}
                  />
                  <label htmlFor="username" className="label-form">
                    Username
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
                <div className="input-div">
                  <input
                    type={showPwd ? "text" : "password"}
                    className="input-form"
                    autoComplete="none"
                    placeholder=" "
                    {...register("confirm_password")}
                  />
                  <label htmlFor="confirm_password" className="label-form">
                    Confirm Password
                  </label>
                  <label htmlFor="confirm_password" className="label-icon">
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
                  {errors.confirm_password && (
                    <span className="fade-in">
                      {errors.confirm_password.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="privacy">
                <div className="input-div display-flex justify-content-flex-start align-items-center">
                  <input type="checkbox" name="gcu" {...register("gcu")} />
                  <label htmlFor="gcu" style={{ fontSize: "0.9rem" }}>
                    Agree
                    <Link
                      to=""
                      style={{ textDecoration: "none", marginLeft: "0.5rem" }}
                    >
                      Term
                    </Link>
                    <Link
                      to=""
                      style={{ textDecoration: "none", marginLeft: "0.3rem" }}
                    >
                      Privacy
                    </Link>
                  </label>
                </div>
                {errors.gcu && (
                  <span
                    className="fade-in"
                    style={{ color: "red", fontSize: "0.9em" }}
                  >
                    {errors.gcu.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className={isSending ? "button" : "button normal"}
              >
                {isSending ? "Process on going..." : "Sign Up"}
              </button>
              <div className="get_sign-in">
                <span>Do you have account already ?</span>
                <Link to="/login" className="btn-sign-in link">
                  Sign in
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
              The registration process is quick qnd easy, taking no more then 10
              minutes to complete.
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
export default Register;

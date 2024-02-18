import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "../routes/NavLink";
import {
  MdOutlineArrowForwardIos,
  MdOutlineDashboard,
  HiOutlineDocumentDuplicate,
  IoCubeOutline,
  IoSettingsOutline,
  IoNotificationsOutline,
  IoHelp,
  FiUsers,
  FiUser,
  FiLogOut,
  BiEnvelope,
  BiChevronDown,
  BiChevronUp,
  BsFillCameraFill,
} from "../middlewares/icons";
import useAxiosPrivate from "../state/context/hooks/useAxiosPrivate";
import useLogout from "../state/context/hooks/useLogout";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getEntities,
  getOrganizations,
  getPayments,
  getRoles,
  getSubscriptions,
} from "../services/configuration";
import {
  isEmpty,
  wait,
  validationCompleteInscriptionStepOne,
  validationCompleteInscriptionStepTwo,
  validationCompleteInscriptionStepThree,
} from "../utils/utils";
import { completeRegister, completeActivation } from "../services/register";

const Administration = () => {
  const axiosPrivate = useAxiosPrivate();
  const [option, setOption] = useState(false);
  const [activeOption, setActiveOption] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  // logout
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  //
  const dispatch = useDispatch();
  const connectedUser = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );

  const countries = useSelector(
    (state) => state.setInitConf.initCountry.countriesData
  );
  const organizations = useSelector(
    (state) => state.setInitConf.initOrganizations.organizationsData
  );
  const entities = useSelector(
    (state) => state.setInitConf.initEntities.entitiesData
  );
  const roles = useSelector((state) => state.setInitConf.initRoles.rolesData);
  const payments = useSelector(
    (state) => state.setInitConf.initPayments.paymentsData
  );
  const subscriptions = useSelector(
    (state) => state.setInitConf.initSubscriptions.subscriptionsData
  );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch({
      type: "setUp/initUtils",
      payload: { organization_id: connectedUser.userInfo?.organization_id, entity_id: connectedUser.userInfo?.entity_id, user_id: connectedUser.userInfo?.user_id },
    });

    getCountries(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUp/initCountry",
        payload: result,
      });
    });
    getOrganizations(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUp/getOrganizations",
        payload: result,
      });
    });
    getEntities(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUp/getEntities",
        payload: result,
      });
    });
    getRoles(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUp/getRoles",
        payload: result,
      });
    });
    getPayments(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUp/getPayments",
        payload: result,
      });
    });
    getSubscriptions(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUp/getSubscriptions",
        payload: result,
      });
    });

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  let validations = {
    0: validationCompleteInscriptionStepOne,
    1: validationCompleteInscriptionStepTwo,
    2: validationCompleteInscriptionStepThree,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validations[activeOption]),
    defaultValues: {
      entity_id: connectedUser.userInfo?.entity_id,
      id: connectedUser.userInfo?.user_id,
      is_completed: true,
      prename: connectedUser.userInfo?.prename,
      name: connectedUser.userInfo?.name,
      gender: connectedUser.userInfo?.gender,
      telephone: connectedUser.userInfo?.telephone,
      mail: connectedUser.userInfo?.mail ?? "",
      birth: connectedUser.userInfo?.birth,
      birth_location: connectedUser.userInfo?.birth_location,
    },
  });

  const handleFile = (e) => {
    if (e.target.files && e.target.files.length !== 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    // const userPhoto = document.getElementById("thumbnails1");
    // const orgLogo = document.getElementById("thumbnails2");
    //
    // data traitment for submitting
    await wait(1000);
    //
    // const formData = new FormData();
    // //
    // formData.append("entity_id", data.entity_id);
    // formData.append("id", data.id);
    // formData.append("name", data.name);
    // formData.append("prename", data.prename);
    // formData.append("gender", data.gender);
    // formData.append("telephone", data.telephone);
    // formData.append("mail", data.mail);
    // formData.append("birth", data.birth);
    // formData.append("birth_location", data.birth_location);
    // formData.append("is_completed", data.is_completed);
    // formData.append("thumbnails1", userPhoto?.files?.item(0));
    // formData.append("orga_name", data.orga_name);
    // formData.append("type", data.type);
    // formData.append("country", data.country);
    // formData.append("orga_phone", data.orga_phone);
    // formData.append("thumbnails2", orgLogo?.files?.item(0));
    // formData.append("address", data.address);
    // formData.append("description", data.description);
    // formData.append("dates", new Date());
    // formData.append("location", "N/A");
    // formData.append("latitude", "N/A");
    // formData.append("longitude", "N/A");
    // formData.append("device", "PC");
    // formData.append("ip_address", "127.0.0.1");
    // formData.append("operating_system", "Linux");
    // formData.append("navigator", "Chrome");
    //
    if (activeOption === 0) {
      setActiveOption(1);
      //   setSelectedFile();
    } else if (activeOption === 1) {
      setIsSubmitting(!isSubmitting);
      completeRegister(axiosPrivate, data)
        .then((result) => {
          let response = result;
          if (response?.data?.status === 1) {
            setIsSubmitting(false);
            swal({
              title: "Registration completion",
              text: `${response?.data?.message}. Code : ${response?.data?.code}`,
              icon: "success",
              button: "Ok",
            }).then((res) => {
              swal("A confirmation code have been sent by SMS.");
            });
            setActiveOption(2);
            // setSelectedFile();
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          if (!error?.response) {
            swal({
              title: "Oups!",
              text: "No server response!",
              icon: "warning",
              buttons: true,
            });
          } else {
            swal({
              title: "Operation failed!",
              text: error?.response?.data?.message,
              icon: "warning",
              buttons: true,
            });
          }
        });
    } else {
      setIsSubmitting(!isSubmitting);
      completeActivation(axiosPrivate, data)
        .then((result) => {
          let response = result;
          if (response?.data?.status === 1) {
            setIsSubmitting(false);
            swal({
              title: "Registration completion",
              text: response?.data?.message,
              icon: "success",
              button: "Ok",
            }).then((res) => {
              swal(
                "Le système va vous deconnecter automatiquement afin de prendre en charge les informations à jour. Puis Connectez-vous à nouveau !"
              );
              signOut();
            });
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          if (!error?.response) {
            swal({
              title: "Oups!",
              text: "No server response!",
              icon: "warning",
              buttons: true,
            });
          } else {
            swal({
              title: "Operation failed!",
              text: error?.response?.data?.message,
              icon: "warning",
              buttons: true,
            });
          }
        });
    }
  };

  let fragments = {
    0: (
      <>
        <p className="title t-2">Complete your personal informations.</p>
        <div className="first-step containers">
          <div className="input-div" style={{ textAlign: "center" }}>
            <p className="title t-3">Picture for your profile(Optional).</p>
            <div className="input-image">
              <img
                src={
                  !selectedFile
                    ? process.env.PUBLIC_URL + "/user.png"
                    : URL.createObjectURL(selectedFile)
                }
                alt="prof-pic"
                className="image"
              />
              <div className="input-upload">
                <input
                  type="file"
                  id="thumbnails1"
                  className="input-file"
                  autoComplete="none"
                  placeholder=" "
                  onChange={handleFile}
                  //   {...register("thumbnails1")}
                  accept="image/*"
                />
                <label htmlFor="thumbnails1" className="input-file-label">
                  <BsFillCameraFill />
                </label>
              </div>
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
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
          </div>
          <div className="container-48">
            <div className="input-div">
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
          </div>
          <div className="container-48">
            <div className="input-div">
              <select className="input-form" {...register("gender")}>
                <option value="" style={{ color: "grey" }}>
                  Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
              {errors.gender && (
                <span className="fade-in">{errors.gender.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("telephone")}
              />
              <label htmlFor="telephone" className="label-form">
                Telephone
              </label>
              {errors.telephone && (
                <span className="fade-in">{errors.telephone.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("mail")}
              />
              <label htmlFor="mail" className="label-form">
                Mail
              </label>
              {errors.mail && (
                <span className="fade-in">{errors.mail.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="date"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("birth")}
              />
              <label htmlFor="birth" className="label-form">
                Date de Naissance
              </label>
              {errors.birth && (
                <span className="fade-in">{errors.birth.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("birth_location")}
              />
              <label htmlFor="birth_location" className="label-form">
                Lieu de Naissance
              </label>
              {errors.birth_location && (
                <span className="fade-in">{errors.birth_location.message}</span>
              )}
            </div>
          </div>
        </div>
      </>
    ),
    1: (
      <>
        <p className="title t-2">
          Complete informations about your Orgnaization(Enterprise)
        </p>
        <div className="first-step containers">
          <div className="input-div" style={{ textAlign: "center" }}>
            <p className="title t-3">
              The logo of your organization(Optional).
            </p>
            <div className="input-image">
              {!selectedFile ? (
                <h2 className="title t-2">LOGO</h2>
              ) : (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="logo-pic"
                  className="image"
                />
              )}
              <div className="input-upload">
                <input
                  type="file"
                  id="thumbnails2"
                  name="thumbnails2"
                  className="input-file"
                  autoComplete="none"
                  placeholder=" "
                  onChange={handleFile}
                  //   {...register("thumbnails2")}
                  accept="image/*"
                />
                <label htmlFor="thumbnails2" className="input-file-label">
                  <BsFillCameraFill />
                </label>
              </div>
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("orga_name")}
              />
              <label htmlFor="orga_name" className="label-form">
                Orgnaization's name
              </label>
              {errors.orga_name && (
                <span className="fade-in">{errors.orga_name.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <select className="input-form" {...register("type")}>
                <option value="" style={{ color: "grey" }}>
                  Organization's type
                </option>
                <option value="ASBL">ASBL</option>
                <option value="SARL">SARL</option>
                <option value="Establishment">Establishment</option>
                <option value="Other">Other</option>
              </select>
              {errors.type && (
                <span className="fade-in">{errors.type.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <select className="input-form" {...register("country")}>
                <option value="" style={{ color: "grey" }}>
                  Organization's Country
                </option>
                {isEmpty(countries?.data?.countries) ? (
                  <option value="" disabled>
                    No Information
                  </option>
                ) : (
                  countries?.data?.countries.map((country) => {
                    return (
                      <option
                        key={country.name.official}
                        value={country.name.official}
                      >
                        {country.name.official}
                      </option>
                    );
                  })
                )}
              </select>
              {errors.country && (
                <span className="fade-in">{errors.country.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("orga_phone")}
              />
              <label htmlFor="orga_phone" className="label-form">
                Organization's Telephone
              </label>
              {errors.orga_phone && (
                <span className="fade-in">{errors.orga_phone.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <textarea
                type="text"
                className="input-textarea"
                autoComplete="none"
                placeholder=" "
                {...register("address")}
              ></textarea>
              <label htmlFor="address" className="label-form">
                Organization's Address
              </label>
              {errors.address && (
                <span className="fade-in">{errors.address.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <textarea
                type="text"
                className="input-textarea"
                autoComplete="none"
                placeholder=" "
                {...register("description")}
              ></textarea>
              <label htmlFor="mail" className="label-form">
                Organization's Description
              </label>
              {errors.description && (
                <span className="fade-in">{errors.description.message}</span>
              )}
            </div>
          </div>
        </div>
      </>
    ),
    2: (
      <>
        <p className="title t-2">
          Un code de confirmation permettant l'activation de votre compte a été
          envoyé par SMS via le numéro de téléphone que vous avez renseigné.
        </p>
        <div className="width">
          <div className="input-div">
            <input
              type="text"
              className="input-form"
              autoComplete="none"
              placeholder=" "
              {...register("confirmation_code")}
            />
            <label htmlFor="username" className="label-form">
              Confirmation code
            </label>
            {errors.confirmation_code && (
              <span className="fade-in">
                {errors.confirmation_code.message}
              </span>
            )}
          </div>
        </div>
      </>
    ),
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shop - Administration</title>
        <meta name="description" content="Grow Up your business with SHOP." />
        <meta name="keywords" content="admin, user" />
      </Helmet>
      <div className="user">
        <div className="left">
          <div className="header">
            {isEmpty(entities?.data.entities) ? (
              <h2 className="title t-2">LOGO</h2>
            ) : (
              entities?.data.entities.map((ent) => {
                if (ent.id === connectedUser.userInfo?.entity_id) {
                  let newOrg = organizations?.data.organizations.filter(
                    (org) => org.id === ent.organization_id
                  );
                  return (
                    <>
                      {!newOrg[0].thumbnails ? (
                        <h2 className="title t-2">
                          {newOrg[0].name.toUpperCase()}
                        </h2>
                      ) : (
                        <img src={process.env.PUBLIC_URL + "/logo.png"} alt="orga-logo"/>
                      )}
                      <h2 className="title t-3">{ent.type.toLowerCase()}</h2>
                    </>
                  );
                }
              })
            )}
          </div>
          <div className="body">
            <div className="navigation">
              <NavLink
                activeClassName="active-option"
                inactiveClassName="inactive-option"
                className="link-option"
                to="/admin"
                exact={true}
              >
                <MdOutlineDashboard className="option-icon" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                activeClassName="active-option"
                inactiveClassName="inactive-option"
                className="link-option"
                to="/admin/sales"
              >
                <IoCubeOutline className="option-icon" />
                <span>Sales</span>
              </NavLink>
              <NavLink
                activeClassName="active-option"
                inactiveClassName="inactive-option"
                className="link-option"
                to="/admin/hr"
              >
                <FiUsers className="option-icon" />
                <span>Human Ressources</span>
              </NavLink>
              <NavLink
                activeClassName="active-option"
                inactiveClassName="inactive-option"
                className="link-option"
                to="/admin/configuration"
              >
                <IoSettingsOutline className="option-icon" />
                <span>Configuration</span>
              </NavLink>
            </div>
          </div>
          <div className="footer">
            <img src={process.env.PUBLIC_URL + "/logo.png"} alt="footer-pic"/>
            <p className="title t-3">V.1.1.0</p>
          </div>
        </div>
        <div className="right">
          <div className="header">
            <div className="options display-flex">
              <div className="option">
                <IoNotificationsOutline className="icon-element" />
                <span></span>
              </div>
              <div className="option">
                <BiEnvelope className="icon-element" />
                <span></span>
              </div>
              <div className="profile">
                <div
                  className="profile-item display-flex align-items-center"
                  onClick={() => setOption(!option)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="option">
                    <img
                      src={
                        !connectedUser?.userInfo?.thumbnails
                          ? process.env.PUBLIC_URL + "/user.png"
                          : `http://localhost:5500/${connectedUser?.userInfo?.thumbnails}`
                      }
                      alt="user-profile"
                    />
                  </div>
                  <div>
                    <h3 className="title t-2">
                      {connectedUser?.userInfo?.prename +
                        " " +
                        connectedUser?.userInfo?.name}
                    </h3>
                    <p className="t-3">{connectedUser?.userInfo?.role}</p>
                  </div>
                  {option ? (
                    <BiChevronUp className="icon" />
                  ) : (
                    <BiChevronDown className="icon" />
                  )}
                </div>
                <div
                  className={option ? "profile-item display" : "profile-item"}
                >
                  <Link to="" className="nav-link">
                    <FiUser className="icon" />
                    <span>Profile</span>
                  </Link>
                  <Link to="" className="nav-link">
                    <IoHelp className="icon" />
                    <span>Help</span>
                  </Link>
                  <div className="nav-link" onClick={signOut}>
                    <FiLogOut className="icon" />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="body">
            <Outlet />
          </div>
        </div>
      </div>
      <Modal
        contentLabel="Nouvel Utilisateur"
        isOpen={connectedUser.userInfo?.is_completed ? false : true}
        shouldCloseOnOverlayClick={false}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.75)", zIndex: 5 },
          content: {
            color: "inherit",
            width: "70%",
            height: "90%",
            margin: "auto",
            padding: 0,
          },
        }}
      >
        <div className="modal">
          <div className="modal-head display-flex justify-content-space-between align-items-center">
            <h3 className="title t-1">Complete your Registration</h3>
          </div>
          <div className="modal-body">
            <div className="config-head">
              <div
                className={
                  activeOption === 0 ? "config-tab active-tab" : "config-tab"
                }
              >
                <span>Personal Informations</span>
              </div>
              <div className="config-tab">
                <MdOutlineArrowForwardIos />
              </div>
              <div
                className={
                  activeOption === 1 ? "config-tab active-tab" : "config-tab"
                }
              >
                <span>Orgnaization's Informations</span>
              </div>
              <div className="config-tab">
                <MdOutlineArrowForwardIos />
              </div>
              <div
                className={
                  activeOption === 2 ? "config-tab active-tab" : "config-tab"
                }
              >
                <span>Account activation</span>
              </div>
            </div>
            <div className="config-body">
              <form className="width" onSubmit={handleSubmit(onSubmit)}>
                {fragments[activeOption]}
                <div className="width">
                  {activeOption !== 2 ? (
                    <div className="col-l-6 col-s-11 m-auto">
                      {isSubmitting ? (
                        <div className="loader"></div>
                      ) : (
                        <button type="submit" className="button normal">
                          Valider
                        </button>
                      )}
                    </div>
                  ) : isSubmitting ? (
                    <div className="loader"></div>
                  ) : (
                    <div className="col-l-7 col-s-11 m-auto">
                      <button type="submit" className="button validate">
                        Confirmer & Activer
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </HelmetProvider>
  );
};

export default Administration;

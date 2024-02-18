import React, { useEffect, useState } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "../../../middlewares/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationExtension, wait, isEmpty } from "../../../utils/utils";
import { getEntities } from "../../../services/configuration";
import {
  createEntity,
  updateEntity,
  enabledEntity,
} from "../../../services/organization";
import useAxiosPrivate from "../../../state/context/hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import moment from "moment";

const Entity = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isUpdated, setIsUpdated] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [onRequest, setOnRequest] = useState({ show: false, onSucces: false });
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const utilsData = useSelector(
    (state) => state.setInitConf.initUtils.utilsData
  );
  const entities = useSelector(
    (state) => state.setInitConf.initEntities.entitiesData
  );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    getEntities(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUp/getEntities",
        payload: result,
      });
    });

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
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationExtension),
    defaultValues: {
      organization_id: utilsData?.organization_id,
      entity_id: "",
      type: "",
      telephone: "",
      address: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSending(true);
    await wait(1000);
    if (isUpdated) {
      updateEntity(axiosPrivate, data)
        .then((result) => {
          let isMounted = true;
          const controller = new AbortController();
          const signal = controller.signal;
          //
          if (result?.data?.status === 1) {
            setIsSending(false);
            setMsg(result?.data?.message);
            setOnRequest({ show: true, onSucces: true });
            getEntities(axiosPrivate, signal).then((result) => {
              dispatch({
                type: "setUp/getEntities",
                payload: result,
              });
            });
            reset();
            setIsUpdated(false);
          }
          const timer = setTimeout(() => {
            setOnRequest({ show: false, onSucces: false });
          }, 3000);
          return () => {
            isMounted = false;
            isMounted && controller.abort();
            clearTimeout(timer);
          };
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
    } else {
      createEntity(axiosPrivate, data)
        .then((result) => {
          let isMounted = true;
          const controller = new AbortController();
          const signal = controller.signal;
          //
          if (result?.data?.status === 1) {
            setIsSending(false);
            setMsg(result?.data?.message);
            setOnRequest({ show: true, onSucces: true });
            getEntities(axiosPrivate, signal).then((result) => {
              dispatch({
                type: "setUp/getEntities",
                payload: result,
              });
            });
            reset();
          }
          const timer = setTimeout(() => {
            setOnRequest({ show: false, onSucces: false });
          }, 3000);
          return () => {
            isMounted = false;
            isMounted && controller.abort();
            clearTimeout(timer);
          };
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
    }
  };

  const onEnable = async (data) => {
    setIsSending(true);
    await wait(1000);
    enabledEntity(axiosPrivate, data)
      .then((result) => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;
        //
        if (result?.data?.status === 1) {
          setIsSending(false);
          setMsg(result?.data?.message);
          swal({
            title: "Action Completiom",
            text: result?.data?.message,
            icon: "success",
            button: "Ok",
          });
          getEntities(axiosPrivate, signal).then((result) => {
            dispatch({
              type: "setUp/getEntities",
              payload: result,
            });
          });
        }
        return () => {
          isMounted = false;
          isMounted && controller.abort();
        };
      })
      .catch((error) => {
        if (!error?.response) {
          setMsg("No server response");
        } else {
          setMsg(error?.response?.data?.message);
        }
      });
  };

  const getUpdateValues = (obj) => {
    setValue("entity_id", obj.id);
    setValue("type", obj.type, {
      shouldValidate: true,
    });
    setValue("telephone", obj.telephone, {
      shouldValidate: true,
    });
    setValue("address", obj.address, {
      shouldValidate: true,
    });
  };

  return (
    <div className="extensions">
      <div className="container">
        <div className="left">
          <h2 className="title t-2">Add new extension</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {onRequest.show && (
              <div
                className={
                  onRequest.onSucces ? "msg-box onSuccess" : "msg-box onFailed"
                }
              >
                {msg}
              </div>
            )}
            <div className="input-div">
              <select className="input-form" {...register("type")}>
                <option value="" style={{ color: "grey" }}>
                  Extention type
                </option>
                <option value="main">Main</option>
                <option value="simple">Simple</option>
              </select>
              {errors.type && (
                <span className="fade-in">{errors.type.message}</span>
              )}
            </div>
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("telephone")}
              />
              <label htmlFor="telephone" className="label-form">
                Extension's Telephone
              </label>
              {errors.telephone && (
                <span className="fade-in">{errors.telephone.message}</span>
              )}
            </div>
            <div className="input-div">
              <textarea
                type="text"
                className="input-textarea"
                autoComplete="none"
                placeholder=" "
                rows={5}
                {...register("address")}
              ></textarea>
              <label htmlFor="ext_address" className="label-form">
                Extension's Address
              </label>
              {errors.address && (
                <span className="fade-in">{errors.address.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="button validate"
              disabled={isSending}
            >
              Add
            </button>
          </form>
        </div>
        <div className="right">
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Date of Creation</th>
                  <th>Type</th>
                  <th>Telephone</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isEmpty(entities?.data?.entities) ? (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        color: "lightslategray",
                        fontSize: "1em",
                      }}
                    >
                      {entities?.data?.message}
                    </td>
                  </tr>
                ) : (
                  entities?.data?.entities.map((ent, i) => {
                    return (
                      ent.organization_id === utilsData?.organization_id && (
                        <tr key={i}>
                          <td className="tbody-col-1">{`${moment(
                            ent.updated_at
                          ).format("ll")} at ${moment(ent.updated_at).format(
                            "LT"
                          )}`}</td>
                          <td className="tbody-col-2">{ent.type}</td>
                          <td className="tbody-col-3">{ent.telephone}</td>
                          <td className="tbody-col-4">{ent.address}</td>
                          <td className="tbody-col-5">
                            <span
                              className={
                                ent.status === 1 ? "onSuccess" : "onFailed"
                              }
                            >
                              {ent.status === 1 ? "enabled" : "disabled"}
                            </span>
                          </td>
                          <td className="tbody-col-6">
                            <button
                              className="button"
                              onClick={() => {
                                getUpdateValues(ent);
                                setIsUpdated(true);
                              }}
                            >
                              Update
                            </button>
                            <button
                              className="button"
                              onClick={() =>
                                swal({
                                  title: "Action Confirmation",
                                  text: `Do you really want to ${
                                    ent.status === 1 ? "Disable" : "Enable"
                                  } this extension ?`,
                                  icon: "warning",
                                  buttons: {
                                    cancel: true,
                                    confirm: "Confirm",
                                  },
                                }).then((res) => {
                                  if (res) {
                                    onEnable({ stat: ent.status, id: ent.id });
                                  }
                                })
                              }
                            >
                              {ent.status === 1 ? "Disable" : "Enable"}
                            </button>
                          </td>
                        </tr>
                      )
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination display-flex justify-content-space-between align-items-center">
            <span>1-5 of 45</span>
            <div className="display-flex align-items-center">
              <div className="display-flex align-items-center">
                <span>Rows per page :</span>
                <select>
                  <option>5</option>
                  <option>10</option>
                </select>
              </div>
              <div className="display-flex align-items-center">
                <button className="button">
                  <MdOutlineArrowBackIos className="icon" />
                </button>
                <button className="button">
                  <MdOutlineArrowForwardIos className="icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entity;

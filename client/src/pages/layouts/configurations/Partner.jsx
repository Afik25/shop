import React, { useState, useEffect } from "react";
import {
  BsSearch,
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "../../../middlewares/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationPartner, wait, isEmpty } from "../../../utils/utils";
import {
  createPartner,
  updatePartner,
  enabledPartner,
} from "../../../services/partner";
import useAxiosPrivate from "../../../state/context/hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import moment from "moment";

const Provider = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isUpdated, setIsUpdated] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [onRequest, setOnRequest] = useState({ show: false, onSucces: false });
  const [msg, setMsg] = useState("");
  const [isDisplayed, setIsDisplayed] = useState({
    isNew: false,
    isContact: false,
  });

  const dispatch = useDispatch();
  const utilsData = useSelector(
    (state) => state.setInitConf.initUtils.utilsData
  );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

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
    resolver: yupResolver(validationPartner),
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
      updatePartner(axiosPrivate, data)
        .then((result) => {
          let isMounted = true;
          const controller = new AbortController();
          const signal = controller.signal;
          //
          if (result?.data?.status === 1) {
            setIsSending(false);
            setMsg(result?.data?.message);
            setOnRequest({ show: true, onSucces: true });

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
      createPartner(axiosPrivate, data)
        .then((result) => {
          let isMounted = true;
          const controller = new AbortController();
          const signal = controller.signal;
          //
          if (result?.data?.status === 1) {
            setIsSending(false);
            setMsg(result?.data?.message);
            setOnRequest({ show: true, onSucces: true });

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

  return (
    <div className="partners">
      <div className="front">
        <div className="head-top">
          <div className="ht-left">
            <h2 className="title t-2">Partners</h2>
            <p className="title t-3">
              Manage your Customers and Providers easily from here.
            </p>
          </div>
          <div className="ht-right">
            <div className="ht-filter">
              <span>View by :</span>
              <button className="button btn-activate">All</button>
              <button className="button">Customers</button>
              <button className="button">Providers</button>
            </div>
            <button className="button btn-print">Print List</button>
            <button
              className="button btn-new-partner"
              onClick={() => setIsDisplayed({ isNew: true })}
            >
              New partner
            </button>
          </div>
        </div>
        <form className="head-search">
          <div className="input-div">
            <input
              type="text"
              className="input-form"
              autoComplete="none"
              placeholder=" "
              // {...register("key")}
            />
            <label htmlFor="key" className="label-form">
              Research the partner by name, telephone, email ...
            </label>
            <label htmlFor="key" className="label-icon">
              <BsSearch style={{ cursor: "pointer" }} onClick={""} />
            </label>
            {/* {errors.username && (
                    <span className="fade-in">{errors.username.message}</span>
                  )} */}
          </div>
        </form>
        <div className="body">
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>##</th>
                  <th>Date of Creation</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Telephone</th>
                  <th>E-mail</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr key={"i"}>
                  <td className="tbody-col-1">
                    <input type="checkbox" />
                  </td>
                  <td className="tbody-col-2">
                    Col1
                    {/* {`${moment(ent.updated_at).format("ll")} at ${moment(
                      ent.updated_at
                    ).format("LT")}`} */}
                  </td>
                  <td className="tbody-col-3">Name</td>
                  <td className="tbody-col-4">Type</td>
                  <td className="tbody-col-5">Telephone</td>
                  <td className="tbody-col-6">E-mail</td>
                  <td className="tbody-col-7">Address</td>
                  <td className="tbody-col-8">Status</td>
                  <td className="tbody-col-9">
                    <button
                      className="button"
                      onClick={() => setIsDisplayed({ isContact: true })}
                    >
                      Contact
                    </button>
                    <button className="button">Update</button>
                    <button className="button">Supprimer</button>
                  </td>
                </tr>
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
      {isDisplayed.isNew && (
        <div className="back fade-in">
          <form className="form"  onSubmit={handleSubmit(onSubmit)}>
            <div className="form-head">
              <h2 className="title t-2">New partner</h2>
              <span
                className="close"
                onClick={() => setIsDisplayed({ isNew: false })}
              >
                &times;
              </span>
            </div>
            <div className="form-body">
              {onRequest.show && (
                <div
                  className={
                    onRequest.onSucces
                      ? "msg-box onSuccess"
                      : "msg-box onFailed"
                  }
                >
                  {msg}
                </div>
              )}
              <div className="input-div">
                <select
                  className="input-form"
                  {...register("partner_type")}
                >
                  <option value="" style={{ color: "grey" }}>
                    Partner's type
                  </option>
                  <option value="customer">Customer</option>
                  <option value="provider">Provider</option>
                </select>
                {errors.partner_type && (
                  <span className="fade-in">{errors.partner_type.message}</span>
                )}
              </div>
              <div className="input-div">
                <select
                  className="input-form"
                  {...register("partner_form")}
                >
                  <option value="" style={{ color: "grey" }}>
                    Partner's form
                  </option>
                  <option value="moral">Moral</option>
                  <option value="physical">Physical</option>
                </select>
                {errors.partner_form && (
                  <span className="fade-in">{errors.partner_form.message}</span>
                )}
              </div>
              <div className="input-div">
                <input
                  type="text"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("names")}
                />
                <label htmlFor="names" className="label-form">
                  Partner's name
                </label>
                {errors.names && (
                  <span className="fade-in">{errors.names.message}</span>
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
                  Partner's telephone
                </label>
                {errors.telephone && (
                  <span className="fade-in">{errors.telephone.message}</span>
                )}
              </div>
              <div className="input-div">
                <input
                  type="text"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("mail")}
                />
                <label htmlFor="mail" className="label-form">
                  Partner's email
                </label>
                {errors.mail && (
                  <span className="fade-in">{errors.mail.message}</span>
                )}
              </div>
              <div className="input-div">
                <input
                  type="text"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("address")}
                />
                <label htmlFor="address" className="label-form">
                  Partner's address
                </label>
                {errors.address && (
                  <span className="fade-in">{errors.address.message}</span>
                )}
              </div>
              <div className="input-div">
                <textarea
                  type="text"
                  className="input-textarea"
                  autoComplete="none"
                  placeholder=" "
                  rows={8}
                  {...register("description")}
                ></textarea>
                <label htmlFor="description" className="label-form">
                  Partner's Description
                </label>
                {errors.description && (
                  <span className="fade-in">{errors.description.message}</span>
                )}
              </div>
              <button type="submit" className="button">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
      {isDisplayed.isContact && (
        <div className="back fade-in">
          <form className="form">
            <div className="form-head">
              <h2 className="title t-2">Contacts partner</h2>
              <span
                className="close"
                onClick={() => setIsDisplayed({ isContact: false })}
              >
                &times;
              </span>
            </div>
            <div className="form-body">
              <div className="contacts">
                <button className="contact-item">amisifikirini@gmail.com <span>&times;</span></button>
                <button className="contact-item">afikirini@gaimsammi.org <span>&times;</span></button>
                <button className="contact-item">amisi.fikirini@aims-senegal.org <span>&times;</span></button>
                <button className="contact-item">amisifikirini@gmail.com <span>&times;</span></button>
                <button className="contact-item">afikirini@gaimsammi.org <span>&times;</span></button>
                <button className="contact-item">amisi.fikirini@aims-senegal.org <span>&times;</span></button>
                <button className="contact-item">amisifikirini@gmail.com <span>&times;</span></button>
                <button className="contact-item">afikirini@gaimsammi.org <span>&times;</span></button>
                <button className="contact-item">amisi.fikirini@aims-senegal.org <span>&times;</span></button>
              </div>
              <div className="input-div">
                <input
                  type="text"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  // {...register("message_object")}
                />
                <label htmlFor="message_object" className="label-form">
                  Message Object
                </label>
                {/* {errors.message_object && (
                  <span className="fade-in">{errors.message_object.message}</span>
                )} */}
              </div>
              <div className="input-div">
                <textarea
                  type="text"
                  className="input-textarea"
                  autoComplete="none"
                  placeholder=" "
                  rows={10}
                  // {...register("message_content")}
                ></textarea>
                <label htmlFor="message_content" className="label-form">
                  Partner's Description
                </label>
                {/* {errors.message_content && (
                  <span className="fade-in">{errors.message_content.message}</span>
                )} */}
              </div>
              <button type="submit" className="button">
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Provider;

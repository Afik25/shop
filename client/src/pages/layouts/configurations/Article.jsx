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

const Article = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isUpdated, setIsUpdated] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [onRequest, setOnRequest] = useState({ show: false, onSucces: false });
  const [tab, setTab] = useState(0);
  const [msg, setMsg] = useState("");
  const [isNew, setIsNew] = useState(false);

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
    <div className="articles">
      <div className="front">
        <div className="head-top">
          <div className="ht-left">
            <h2 className="title t-2">Articles</h2>
            <p className="title t-3">Manage the articles easily from here.</p>
          </div>
          <div className="ht-right">
            <div className="ht-filter">
              <span>View by :</span>
              <div>
                <select
                // {...register("partner_type")}
                >
                  <option value="" style={{ color: "grey" }}>
                    Category
                  </option>
                  <option value="all">all</option>
                  <option value="provider">Provider</option>
                </select>
                {/* {errors.partner_type && (
                  <span className="fade-in">{errors.partner_type.message}</span>
                )} */}
              </div>
            </div>
            <button className="button btn-print">
              Export to Excel (.xlsx)
            </button>
            <button className="button btn-print">
              Import from Excel (.xlsx)
            </button>
            <button className="button btn-print">Print List</button>
            <button
              className="button btn-new-partner"
              onClick={() => {
                setIsNew(true);
                setTab(0);
              }}
            >
              New article
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
                  <th>Code</th>
                  <th>Date of Creation</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Unitary Price</th>
                  <th>Compartment</th>
                  <th>Rack</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr key={"i"}>
                  <td className="tbody-col-1">Article Code</td>
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
      {isNew && (
        <div className="back fade-in">
          <div className="form-tabs">
            <div className="form-head">
              <h2 className="title t-2">New article management</h2>
              <span className="close" onClick={() => setIsNew(false)}>
                &times;
              </span>
            </div>
            <div className="tabs">
              <button
                className={tab === 0 ? "tab tab-active" : "tab"}
                onClick={() => setTab(0)}
              >
                New article
              </button>
              <button
                className={tab === 1 ? "tab tab-active" : "tab"}
                onClick={() => setTab(1)}
              >
                Category
              </button>
              <button
                className={tab === 2 ? "tab tab-active" : "tab"}
                onClick={() => setTab(2)}
              >
                Compartment
              </button>
              <button
                className={tab === 3 ? "tab tab-active" : "tab"}
                onClick={() => setTab(3)}
              >
                Rack
              </button>
            </div>
            <div className="form-body">
              {tab === 0 && (
                <>
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
                      <span className="fade-in">
                        {errors.partner_type.message}
                      </span>
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
                      <span className="fade-in">
                        {errors.partner_form.message}
                      </span>
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
                      <span className="fade-in">
                        {errors.telephone.message}
                      </span>
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
                      <span className="fade-in">
                        {errors.description.message}
                      </span>
                    )}
                  </div>
                  <button type="submit" className="button">
                    Save
                  </button>
                </>
              )}
              {tab === 1 && (
                <div className="container">
                  <div className="left">
                    <h2 className="title t-2">Add new Category</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                        <input
                          type="text"
                          className="input-form"
                          autoComplete="none"
                          placeholder=" "
                          {...register("category_title")}
                        />
                        <label htmlFor="category_title" className="label-form">
                          Category's title
                        </label>
                        {errors.category_title && (
                          <span className="fade-in">
                            {errors.category_title.message}
                          </span>
                        )}
                      </div>
                      <div className="input-div">
                        <textarea
                          type="text"
                          className="input-textarea"
                          autoComplete="none"
                          placeholder=" "
                          rows={5}
                          {...register("category_description")}
                        ></textarea>
                        <label
                          htmlFor="category_description"
                          className="label-form"
                        >
                          Category's description
                        </label>
                        {errors.category_description && (
                          <span className="fade-in">
                            {errors.category_description.message}
                          </span>
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
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={"i"}>
                            <td className="tbody-col-1">
                              col 1
                              {/* {`${moment(
                                    ent.updated_at
                                  ).format("ll")} at ${moment(
                                    ent.updated_at
                                  ).format("LT")}`} */}
                            </td>
                            <td className="tbody-col-2">col 2</td>
                            <td className="tbody-col-3">col 3</td>
                            <td className="tbody-col-4">
                              <span>enabled</span>
                            </td>
                            <td className="tbody-col-5">
                              <button className="button">Update</button>
                              <button className="button">Remove</button>
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
              )}
              {tab === 2 && (
                <div className="container">
                  <div className="left">
                    <h2 className="title t-2">Add new Compartment</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                        <select className="input-form" {...register("rack")}>
                          <option value="" style={{ color: "grey" }}>
                            Rack
                          </option>
                          <option value="default">default</option>
                          <option value="simple">Simple</option>
                        </select>
                        {errors.rack && (
                          <span className="fade-in">{errors.rack.message}</span>
                        )}
                      </div>
                      <div className="input-div">
                        <input
                          type="text"
                          className="input-form"
                          autoComplete="none"
                          placeholder=" "
                          {...register("compartment_title")}
                        />
                        <label
                          htmlFor="compartment_title"
                          className="label-form"
                        >
                          Compartment's title
                        </label>
                        {errors.compartment_title && (
                          <span className="fade-in">
                            {errors.compartment_title.message}
                          </span>
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
                          Compartment's Address
                        </label>
                        {errors.address && (
                          <span className="fade-in">
                            {errors.address.message}
                          </span>
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
                            <th>Title</th>
                            <th>Rack</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={"i"}>
                            <td className="tbody-col-1">
                              col 1
                              {/* {`${moment(
                                      ent.updated_at
                                    ).format("ll")} at ${moment(
                                      ent.updated_at
                                    ).format("LT")}`} */}
                            </td>
                            <td className="tbody-col-2">col 2</td>
                            <td className="tbody-col-3">col 3</td>
                            <td className="tbody-col-4">
                              <span>enabled</span>
                            </td>
                            <td className="tbody-col-5">
                              <button className="button">Update</button>
                              <button className="button">Remove</button>
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
              )}
              {tab === 3 && (
                <div className="container">
                  <div className="left">
                    <h2 className="title t-2">Add new Rack</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                        <input
                          type="text"
                          className="input-form"
                          autoComplete="none"
                          placeholder=" "
                          {...register("rack_title")}
                        />
                        <label htmlFor="rack_title" className="label-form">
                          Rack's title
                        </label>
                        {errors.rack_title && (
                          <span className="fade-in">
                            {errors.rack_title.message}
                          </span>
                        )}
                      </div>
                      <div className="input-div">
                        <textarea
                          type="text"
                          className="input-textarea"
                          autoComplete="none"
                          placeholder=" "
                          rows={8}
                          {...register("rack_description")}
                        ></textarea>
                        <label
                          htmlFor="rack_description"
                          className="label-form"
                        >
                          Rack's description
                        </label>
                        {errors.rack_description && (
                          <span className="fade-in">
                            {errors.rack_description.message}
                          </span>
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
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={"i"}>
                            <td className="tbody-col-1">
                              col 1
                              {/* {`${moment(
                                      ent.updated_at
                                    ).format("ll")} at ${moment(
                                      ent.updated_at
                                    ).format("LT")}`} */}
                            </td>
                            <td className="tbody-col-2">col 2</td>
                            <td className="tbody-col-3">col 3</td>
                            <td className="tbody-col-4">
                              <span>enabled</span>
                            </td>
                            <td className="tbody-col-5">
                              <button className="button">Update</button>
                              <button className="button">Remove</button>
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
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;

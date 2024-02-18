import React, { useState } from "react";
import { BiDollar, BsCheck2All } from "../../../middlewares/icons";

const Subscription = () => {
  const [isView, setIsView] = useState(false);
  return (
    <div className="subscription-plan">
      <div className="banner">
        <div className="banner-head">
          You have a current subscription <span>Basic Pack</span> that runs
          until <span>October 27, 2023 at 11:59 pm.</span> Expires in 10 days exactly.
        </div>
        <div className="banner-body">
          <div className="left">
            <p className="title t-2">Subscription history</p>
            <div className="content">
              <div className="item">
                <table>
                  <tr>
                    <td>Subscr. Plan</td>
                    <td>
                      <span>Combo Pack</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Amount</td>
                    <td>
                      <span>$25</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>
                      <span>Approved</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Date & time</td>
                    <td>
                      <span>fri 15 Sep, 11:56</span>
                    </td>
                  </tr>
                  <tr>
                    <td>ID reference</td>
                    <td>
                      <span>qwertyuiop12ASD</span>
                    </td>
                  </tr>
                </table>
              </div>
              <div className="item">
                <table>
                  <tr>
                    <td>Subscr. Plan</td>
                    <td>
                      <span>Combo Pack</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Amount</td>
                    <td>
                      <span>$25</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>
                      <span>Approved</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Date & time</td>
                    <td>
                      <span>fri 15 Sep, 11:56</span>
                    </td>
                  </tr>
                  <tr>
                    <td>ID reference</td>
                    <td>
                      <span>qwertyuiop12ASD</span>
                    </td>
                  </tr>
                </table>
              </div>
              <div className="item">
                <table>
                  <tr>
                    <td>Subscr. Plan</td>
                    <td>
                      <span>Combo Pack</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Amount</td>
                    <td>
                      <span>$25</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>
                      <span>Approved</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Date & time</td>
                    <td>
                      <span>fri 15 Sep, 11:56</span>
                    </td>
                  </tr>
                  <tr>
                    <td>ID reference</td>
                    <td>
                      <span>qwertyuiop12ASD</span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="right">
            <p className="title t-2">
              You needs a plan that's perfect for you.
            </p>
            <div className="content">
              <div className="item">
                <h2 className="title t-2">Basic</h2>
                <p className="title t-3">Perfect to get started</p>
                <div className="pricing">
                  <BiDollar className="icon" /> <h2 className="t-2">10</h2>
                  <span>per month</span>
                </div>
                <button className="btn" onClick={() => setIsView(true)}>
                  Get started
                </button>
                <p className="title t-3">Basic includes</p>
                <div className="details">
                  <p className="title t-3">
                    <BsCheck2All className="icon" />
                    <span>CMS integration</span>
                  </p>
                  <p className="title t-3">
                    <BsCheck2All className="icon" />
                    <span>CMS integration</span>
                  </p>
                  <p className="title t-3">
                    <BsCheck2All className="icon" />
                    <span>CMS integration</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="view fade-in"
        style={{ display: `${isView ? "flex" : "none"}` }}
      >
        <div className="container">
          <div className="v-head">
            <h2 className="title t-2">Subscription process</h2>
            <span className="close" onClick={() => setIsView(false)}>
              &times;
            </span>
          </div>
          <div className="v-body">
            <div className="item">
              <h2 className="title t-2">Basic</h2>
              <p className="title t-3">Perfect to get started</p>
              <div className="pricing">
                <BiDollar className="icon" /> <h2 className="t-2">10</h2>
                <span>per month</span>
              </div>
              <p className="title t-3">Basic includes</p>
              <div className="details">
                <p className="title t-3">
                  <BsCheck2All className="icon" />
                  <span>CMS integration</span>
                </p>
                <p className="title t-3">
                  <BsCheck2All className="icon" />
                  <span>CMS integration</span>
                </p>
                <p className="title t-3">
                  <BsCheck2All className="icon" />
                  <span>CMS integration</span>
                </p>
              </div>
            </div>
            <form>
              <p>
                Grab the reference's code of transaction in order to activate
                the subscribed plan.
              </p>
              <div className="input-div">
                <input
                  type="text"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  // {...register("reference_code")}
                />
                <label htmlFor="reference_code" className="label-form">
                  Transaction reference code
                </label>
                {/* {errors.reference_code && (
                    <span className="fade-in">{errors.reference_code.message}</span>
                  )} */}
              </div>
              <button
                type="submit"
                className="button normal"
              >
                Check & Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;

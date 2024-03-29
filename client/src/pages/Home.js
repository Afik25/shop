import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {
  BsFillLightningChargeFill,
  FaPlay,
  BsPeople,
  FiHome,
  GrDocumentStore,
  MdOutlinePointOfSale,
  HiOutlineClipboardDocumentList,
  FaNetworkWired,
} from "../middlewares/icons";

const Home = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Helmet>
        <title>Home - Shop</title>
        <meta
          name="description"
          content="Étudier avec le contenu éducatif de qualité basé sur le programme d'étude national relatif à chaque niveau."
        />
        <meta
          name="keywords"
          content="École, School, Masomo, Étudier, Éducation"
        />
      </Helmet>
      <div className="home">
        <Header />
        <div className="banner">
          <div className="left" data-aos="fade-right" data-aos-duration="1000">
            <div className="flash">
              <BsFillLightningChargeFill className="icon" />
              <span className="title t-3">
                The pioneer sales management platform
              </span>
            </div>
            <h2 className="title t-1">
              Make your management well organized, anytime, anywhere you are.
            </h2>

            <p className="title t-2">
              Shop is powerful and responsive multi-platform software that makes
              it easier for to manage organization(company), anytime, anywhere,
              with 24/7 support that is always there to help.
            </p>
            <div className="buttons">
              <Link
                to="/register"
                className="btn-join link"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="3000"
              >
                Get started
              </Link>
              <button
                className="button btn-demo"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="4000"
              >
                <FaPlay className="icon" />
                See how it works ?
              </button>
            </div>
          </div>
          <div className="right" data-aos="fade-left" data-aos-duration="2000">
            <img src={process.env.PUBLIC_URL + "/growth.png"} alt="growth" />
          </div>
        </div>
        <div className="partnership">
          <div className="flash">
            <BsFillLightningChargeFill className="icon" />
            <span className="title t-3">Our partners</span>
          </div>
          <h2 className="title t-1">
            Our service have been used more than 200+ corporate companies.
          </h2>
          <div className="container">
            <span className="partner">Afik Foundation</span>
            <span className="partner">SAÏDIYA</span>
            <span className="partner">AIMS Senegal</span>
            <span className="partner">Info One Plus</span>
            <span className="partner">Afya</span>
            <span className="partner">MASOMO</span>
            <span className="partner">Afik Foundation</span>
            <span className="partner">SAÏDIYA</span>
            <span className="partner">AIMS Senegal</span>
            <span className="partner">Info One Plus</span>
            <span className="partner">Afya</span>
            <span className="partner">MASOMO</span>
          </div>
        </div>
        <div className="feature">
          <div className="left">
            <img src={process.env.PUBLIC_URL + "/devices.png"} alt="devices" />
          </div>
          <div className="right">
            <div className="flash">
              <BsFillLightningChargeFill className="icon" />
              <span className="title t-3">Our feature</span>
            </div>
            <h2 className="title t-1">Management easily, anywhere, anytime.</h2>
            <p className="title t-3">
              Our services are used eas, and quickly because they are supported
              by a multi-platform and responsive system.
            </p>
            <div className="services">
              <h2 className="title t-2">Our services :</h2>
              <div className="container">
                <div className="item">
                  <BsPeople className="icon fade-out" />
                  <div className="feat fade-in">
                    <span>Personal Management</span>
                  </div>
                </div>
                <div className="item">
                  <FiHome className="icon fade-out" />
                  <div className="feat fade-in">
                    <span>Branch Management</span>
                  </div>
                </div>
                <div className="item">
                  <GrDocumentStore className="icon fade-out" />
                  <div className="feat fade-in">
                    <span>Stock & Logistics Management</span>
                  </div>
                </div>
                <div className="item">
                  <MdOutlinePointOfSale className="icon fade-out" />
                  <div className="feat fade-in">
                    <span>Sales Management</span>
                  </div>
                </div>
                <div className="item">
                  <HiOutlineClipboardDocumentList className="icon fade-out" />
                  <div className="feat fade-in">
                    <span>Inventory and Reports Management</span>
                  </div>
                </div>
                <div className="item">
                  <FaNetworkWired className="icon fade-out" />
                  <div className="feat fade-in">
                    <span>Customer and Provider Management</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;

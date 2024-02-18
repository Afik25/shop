import axios from "../middlewares/http-common";
import { REGISTER, COMPLETE, COMPLETE_ACTIVATION } from "../routes";

export function registerOrganization(data) {
  const _data = {
    organization: data.organization,
    country: data.country,
    prename: data.prename,
    name: data.name,
    username: data.username,
    password: data.password,
    sys_role: "admin",
  };
  return new Promise(async (resolve, reject) => {
    await axios
      .post(REGISTER, _data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function completeRegister(axiosPrivate, data) {
  const _data = {
    entity_id: data.entity_id,
    id: data.id,
    prename: data.prename,
    name: data.name,
    gender: data.gender,
    role: data.role,
    telephone: data.telephone,
    mail: data?.mail || "",
    birth: data.birth,
    birth_location: data.birth_location,
    is_completed: data.is_completed,
    thumbnails1: data.thumbnails1,
    // 
    orga_name: data.orga_name,
    type: data.type,
    country: data.country,
    orga_phone: data.orga_phone,
    thumbnails2: data.thumbnails2,
    address: data.address,
    description: data.description,
    //
    dates: new Date(),
    location: "N/A",
    latitude: "N/A",
    longitude: "N/A",
    device: "PC",
    ip_address: "127.0.0.1",
    operating_system: "Linux",
    navigator: "Chrome",
  };
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(COMPLETE, _data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function completeActivation(axiosPrivate, data) {
  const _data = {
    id: data.id,
    confirmation_code: data.confirmation_code,
    is_completed: data.is_completed,
    dates: new Date(),
  };
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(COMPLETE_ACTIVATION, _data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

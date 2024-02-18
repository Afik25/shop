import { ENTITIES } from "../routes";

export function createPartner(axiosPrivate, data) {
  const _data = {
    organization_id: data.organization_id,
    type: data.type,
    telephone: data.telephone,
    address: data.address,
  };
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(ENTITIES, _data, {
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

export function updatePartner(axiosPrivate, data) {
  const _data = {
    type: data.type,
    telephone: data.telephone,
    address: data.address,
  };
  const id = data.entity_id;
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .put(ENTITIES + "/" + id, _data, {
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

export function enabledPartner(axiosPrivate, data) {
  const stat = data.stat;
  const id = data.id;
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .delete(ENTITIES + "/" + stat + "/" + id, {
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

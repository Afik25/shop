import { createSlice } from "@reduxjs/toolkit";

export const configurationSlice = createSlice({
  name: "setUp",
  initialState: {
    initCountry: {},
    initConnectedUser: {},
    initUtils: {},
    initOrganizations: {},
    initEntities: {},
    initRoles: {},
    initPayments: {},
    initSubscriptions: {},
  },
  reducers: {
    initCountry: (state, action) => {
      state.initCountry = {
        countriesData: action.payload,
      };
    },
    initUtils: (state, action) => {
      state.initUtils = {
        utilsData: action.payload,
      };
    },
    initConnectedUser: (state, action) => {
      state.initConnectedUser = {
        connectedUserData: action.payload,
      };
    },
    getOrganizations: (state, action) => {
      state.initOrganizations = {
        organizationsData: action.payload,
      };
    },
    getEntities: (state, action) => {
      state.initEntities = {
        entitiesData: action.payload,
      };
    },
    getRoles: (state, action) => {
      state.initRoles = {
        rolesData: action.payload,
      };
    },
    getPayments: (state, action) => {
      state.initPayments = {
        paymentsData: action.payload,
      };
    },
    getSubscriptions: (state, action) => {
      state.initSubscriptions = {
        subscriptionsData: action.payload,
      };
    },
  },
});

import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";

export const localehistoryService = {
  localehistoryUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.localehistoryUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.localehistoryUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.localehistoryUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.localehistoryUrl}/api/users`);
    return res.data;
  },

  async createStreet(street) {
    const res = await axios.post(`${this.localehistoryUrl}/api/streets`, street);
    return res.data;
  },

  async deleteAllStreets() {
    const response = await axios.delete(`${this.localehistoryUrl}/api/streets`);
    return response.data;
  },

  async deleteStreet(id) {
    const response = await axios.delete(`${this.localehistoryUrl}/api/streets/${id}`);
    return response;
  },

  async getAllStreets() {
    const res = await axios.get(`${this.localehistoryUrl}/api/streets`);
    return res.data;
  },

  async getStreet(id) {
    const res = await axios.get(`${this.localehistoryUrl}/api/streets/${id}`);
    return res.data;
  },

  async getAllPlacemarks() {
    const res = await axios.get(`${this.localehistoryUrl}/api/placemarks`);
    return res.data;
  },

  async createPlacemark(id, placemark) {
    const res = await axios.post(`${this.localehistoryUrl}/api/streets/${id}/placemarks`, placemark);
    return res.data;
  },

  async deleteAllPlacemarks() {
    const res = await axios.delete(`${this.localehistoryUrl}/api/placemarks`);
    return res.data;
  },

  async getPlacemark(id) {
    const res = await axios.get(`${this.localehistoryUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async deletePlacemark(id) {
    const res = await axios.delete(`${this.localehistoryUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.localehistoryUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};
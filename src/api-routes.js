import { userApi } from "./api/user-api.js";
import { streetApi } from "./api/street-api.js";
import { placemarkApi } from "./api/placemark-api.js";

export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
  
    { method: "POST", path: "/api/streets", config: streetApi.create },
    { method: "DELETE", path: "/api/streets", config: streetApi.deleteAll },
    { method: "GET", path: "/api/streets", config: streetApi.find },
    { method: "GET", path: "/api/streets/{id}", config: streetApi.findOne },
    { method: "DELETE", path: "/api/streets/{id}", config: streetApi.deleteOne },
  
    { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
    { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },
    { method: "POST", path: "/api/streets/{id}/placemarks", config: placemarkApi.create },
    { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
    { method: "DELETE", path: "/api/placemarks/{id}", config: placemarkApi.deleteOne },
  ];
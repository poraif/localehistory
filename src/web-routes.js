import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { streetController } from "./controllers/street-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/admindashboard", config: accountsController.adminDashboard },
  { method: "GET", path: "/admindashboard/users/delete/{id}", config: accountsController.deleteUser },


  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addstreet", config: dashboardController.addStreet },
  { method: "GET", path: "/dashboard/deletestreet/{id}", config: dashboardController.deleteStreet },

  { method: "GET", path: "/street/{id}/placemark/{placemarkid}", config: placemarkController.index },
  { method: "GET", path: "/street/{id}/editplacemark/{placemarkid}", config: placemarkController.showUpdate },
  { method: "POST", path: "/placemark/{id}/updateplacemark/{placemarkid}", config: placemarkController.update },


  { method: "GET", path: "/street/{id}", config: streetController.index },
  { method: "POST", path: "/street/{id}/addplacemark", config: streetController.addPlacemark },
  { method: "GET", path: "/street/{id}/deleteplacemark/{placemarkid}", config: streetController.deletePlacemark },
  { method: "POST", path: "/street/{id}/uploadimage", config: streetController.uploadImage },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }
];
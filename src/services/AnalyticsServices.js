import requests from "./httpService";

const AnalyticsServices = {
  //  getAllCategory: async () => {
  //    return requests.get("/category");
  //  },

  getAll: async () => {
    return requests.get("/admin/analytics");
  },

};

export default AnalyticsServices;

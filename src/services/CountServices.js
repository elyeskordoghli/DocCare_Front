import requests from "./httpService";

const CountServices = {
 
  getAllCounts: async () => {
    return requests.get("/admin/statistics/");
  },
  getCountById: async (id) => {
    return requests.get(`/admin/statistics/statistic/${id}`);
  },
  addCount: async (body) => {
    return requests.post("/admin/statistics/store", body);
  },
  updateCount: async (id, body) => {
    return requests.post(`/admin/statistics/update/${id}`, body);
  },
  deleteCount: async (id) => {
    return requests.delete(`/admin/statistics/delete/${id}`);
  },


};

export default CountServices;

import requests from "./httpService";

const DetailsServices = {
 
  getAllDetails: async () => {
    return requests.get("/admin/settings/");
  },
  getDetailById: async (id) => {
    return requests.get(`/admin/settings/setting/${id}`);
  },
  addDetail: async (body) => {
    return requests.post("/admin/settings/store", body);
  },
  updateDetail: async (id, body) => {
    return requests.put(`/admin/settings/update/${id}`, body);
  },
  deleteDetail: async (id) => {
    return requests.delete(`/admin/settings/delete/${id}`);
  },


};

export default DetailsServices;

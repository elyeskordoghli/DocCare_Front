import requests from "./httpService";

const PrevilegeServices = {
  addPrevilege: async (body) => {
    return requests.post("/admin/store", body);
  },
  getAllPrevilege: async (body) => {
    return requests.get("/admin/previleges/", body);
  },
  getPrevilegeById: async (id, body) => {
    return requests.post(`/admin/previleges/previlege/${id}`, body);
  },
  getPrevilegeByAdmin: async (id, body) => {
    return requests.post(`/admin/previleges/previleges_by_admin/${id}`, body);
  },
  updatePrevilege: async (id, body) => {
    return requests.put(`/admin/${id}`, body);
  },

  updatePrevilegeStatus: async (id, body) => {
    return requests.put(`/admin/update-status/${id}`, body);
  },

  deletePrevilege: async (id) => {
    return requests.delete(`/admin/${id}`);
  },
};

export default PrevilegeServices;

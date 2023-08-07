import requests from "./httpService";
    const ServiceServices = {
      // getAllServices: async () => {
    
      //   return requests.get(
      //     `/admin/services`
      //   );
      // },
      // getAllStaff: async (body) => {
      //   return requests.get("/admin/admin_user/", body);
      // },
  getServiceById: async (id) => {
    return requests.get(`admin/services/service/${id}`);
  },
  addService: async (body) => {
    return requests.post("admin/services/store", body);
  },
  getAllServices: async (body) => {
    return requests.get("admin/services", body);
  },
  updateService: async (id, body) => {
    return requests.post(`/admin/services/update/${id}`, body);
  },
  // updateManyServices: async (body) => {
  //   return requests.patch("Services/update/many", body);
  // },
  // updateStatus: async (id, body) => {
  //   return requests.put(`/Services/status/${id}`, body);
  // },

  deleteService: async (id) => {
    return requests.delete(`/admin/services/delete/${id}`);
  },
  // deleteManyServices: async (body) => {
  //   return requests.patch("/Services/delete/many", body);
  // },
};

export default ServiceServices;

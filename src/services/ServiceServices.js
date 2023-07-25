import requests from "./httpService";
    const ServiceServices = {
      getAllServices: async ({id, title, subtitle, short_description, description,image,catalogue}) => {
      //  const searchCategory = category_id !== null ? category_id : "";
        const searchTitle = title !== null ? title : "";
        const searchSubTitle = subtitle !== null ? subtitle : "";
        const searchShortDescription = short_description !== null ? short_description : "";
        const searchDescription = description !== null ? description : "";
        return requests.get(
          `/admin/services`
        );
      },
  
  getServiceById: async (id) => {
    return requests.get(`admin/services/service/${id}`);
  },
  addService: async (body) => {
    return requests.post("admin/services/store", body);
  },
  // getAllServices: async (body) => {
  //   return requests.get("admin/Services", body);
  // },
  updateService: async (id, body) => {
    return requests.put(`/admin/services/update/${id}`, body);
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

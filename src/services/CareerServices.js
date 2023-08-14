import requests from "./httpService";
    const CareerServices = {

  getCareerById: async (id) => {
    return requests.get(`admin/careers/career/${id}`);
  },
  addCareer: async (body) => {
    return requests.post("admin/careers/store", body);
  },
  getAllCareers: async (body) => {
    return requests.get("/admin/careers/");
  },
  updateCareer: async (id, body) => {
    return requests.post(`/admin/careers/update/${id}`, body);
  },

  deleteCareer: async (id) => {
    return requests.delete(`/admin/careers/delete/${id}`);
  },
  // deleteManyServices: async (body) => {
  //   return requests.patch("/careers/delete/many", body);
  // },
  searchCareer: async (query) => {
    return requests.get(`/user/careers/search_career?q=${query}`);
  },
};

export default CareerServices;

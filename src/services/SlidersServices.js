import requests from "./httpService";

const SlidersServices = {
 
  getAllSliders: async () => {
    return requests.get("/admin/home_slider/");
  },
  getSliderById: async (id) => {
    return requests.get(`/admin/home_slider/home_slider/${id}`);
  },
  addSlider: async (body) => {
    return requests.post("admin/home_slider/store", body);
  },
  updateSlider: async (id, body) => {
    return requests.post(`/admin/home_slider/update/${id}`, body);
  },
  deleteSlider: async (id) => {
    return requests.delete(`/admin/home_slider/delete/${id}`);
  },


};

export default SlidersServices;

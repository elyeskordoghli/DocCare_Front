import requests from "./httpService";

const AdminServices = {
  registerAdmin: async (body) => {
    return requests.post("/admin/register", body);
  },

  loginAdmin: async (body) => {
    return requests.post(`/admin/admin/login`, body);
  },
  logoutAdmin: async (body) => {
    return requests.post(`/admin/admin/logout`, body);
  },
  forgetPassword: async (body) => {
    return requests.put("/admin/forget-password", body);
  },

  resetPassword: async (body) => {
    return requests.put("/admin/reset-password", body);
  },

  signUpWithProvider: async (body) => {
    return requests.post("/admin/signup", body);
  },

  addStaff: async (body) => {
    return requests.post("/admin/store", body);
  },
  getAllStaff: async (body) => {
    return requests.get("/admin/admin_user/", body);
  },
  getStaffById: async (id) => {
    return requests.get(`/admin/admin_user/admins/${id}`);
  },

  updateStaff: async (id, body) => {
    return requests.put(`/admin/admin_user/update/${id}`, body);
  },

  updateStaffStatus: async (id, body) => {
    return requests.put(`/admin/update-status/${id}`, body);
  },

  deleteStaff: async (id) => {
    return requests.delete(`/admin/admin_user/delete/${id}`);
  },
  searchAdmin: async (query) => {
    return requests.get(`/admin/admin_user/search_admin?q=${query}`);
  },
};

export default AdminServices;

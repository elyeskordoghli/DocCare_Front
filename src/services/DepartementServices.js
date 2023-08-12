import requests from "./httpService";

const DepartmentServices = {
  addDepartment: async (body) => {
    return requests.post("/admin/departments/store", body);
  },
  getAllDepartment: async (body) => {
    return requests.get("/admin/departments/", body);
  },
  getDepartmentById: async (id, body) => {
    return requests.get(`/admin/departments/department/${id}`, body);
  },
  getDepartmentByAdmin: async (id, body) => {
    return requests.post(`/admin/departments/departments_by_admin/${id}`, body);
  },
  updateDepartment: async (id, body) => {
    return requests.post(`/admin/departments/update/${id}`, body);
  },

  updateDepartmentStatus: async (id, body) => {
    return requests.put(`/admin/update-status/${id}`, body);
  },

  deleteDepartment: async (id) => {
    return requests.delete(`/admin/departments/delete/${id}`);
  },
  searchDepartment: async (query) => {
    return requests.get(`/admin/departments/search_department?q=${query}`);
  },
};

export default DepartmentServices;

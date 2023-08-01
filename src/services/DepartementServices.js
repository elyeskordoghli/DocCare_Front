import requests from "./httpService";

const DepartmentServices = {
  addDepartment: async (body) => {
    return requests.post("/admin/store", body);
  },
  getAllDepartment: async (body) => {
    return requests.get("/admin/departments/", body);
  },
  getDepartmentById: async (id, body) => {
    return requests.post(`/admin/departments/department/${id}`, body);
  },
  getDepartmentByAdmin: async (id, body) => {
    return requests.post(`/admin/Departments/departments_by_admin/${id}`, body);
  },
  updateDepartment: async (id, body) => {
    return requests.put(`/admin/${id}`, body);
  },

  updateDepartmentStatus: async (id, body) => {
    return requests.put(`/admin/update-status/${id}`, body);
  },

  deleteDepartment: async (id) => {
    return requests.delete(`/admin/${id}`);
  },
};

export default DepartmentServices;

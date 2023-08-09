import requests from "./httpService";

const CategoryServices = {
  //  getAllCategory: async () => {
  //    return requests.get("/category");
  //  },

  getAllCategories: async () => {
    return requests.get("/admin/categories");
  },

  getCategoryById: async (id) => {
    return requests.get(`/admin/categories/category/${id}`);
  },

  addCategory: async (body) => {
    return requests.post("/admin/categories/store", body);
  },

   addAllCategory: async (body) => {
     return requests.post("/category/add/all", body);
   },

  updateCategory: async (id, body) => {
    return requests.put(`/admin/categories/update/${id}`, body);
  },

   updateStatus: async (id, body) => {
     return requests.put(`/category/status/${id}`, body);
   },

  deleteCategory: async (id, body) => {
    return requests.delete(`/admin/categories/delete/${id}`);
  },

   updateManyCategory: async (body) => {
     return requests.patch("/category/update/many", body);
  },

   deleteManyCategory: async (body) => {
     return requests.patch("/category/delete/many", body);
   },

};

export default CategoryServices;

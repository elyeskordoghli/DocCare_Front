import requests from "./httpService";

const CategoryServices = {
  createDispo: async (body) => {
    return requests.post("Disponibilite/Create",body);
  },


  DeleteDispo: async (id) => {
    return requests.post(`Disponibilite/Delete/${id}`);
  },


  getAllCategories: async () => {
    return requests.get("/admin/categories/");
  },


  getAllDispo: async () => {
    return requests.get("Disponibilite/getAll");
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

  // deleteCategory: async (id) => {
  //   return requests.delete(`/admin/categories/delete/${id}`);
  // },

   updateManyCategory: async (body) => {
     return requests.patch("/category/update/many", body);
  },

   deleteManyCategory: async (body) => {
     return requests.patch("/category/delete/many", body);
   },
   
   searchCategory: async (query) => {
    return requests.get(`/admin/categories/search_category?q=${query}`);
  },

};

export default CategoryServices;

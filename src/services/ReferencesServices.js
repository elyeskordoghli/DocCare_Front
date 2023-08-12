import requests from "./httpService";

const ReferencesServices = {
 
  getAllReferences: async () => {
    return requests.get("/admin/references/");
  },
  getReferenceById: async (id) => {
    return requests.get(`admin/references/reference/${id}`);
  },
  addReference: async (body) => {
    return requests.post("admin/references/store", body);
  },
  updateReference: async (id, body) => {
    return requests.post(`/admin/references/update/${id}`, body);
  },
  deleteReference: async (id) => {
    return requests.delete(`/admin/references/delete/${id}`);
  },
  searchReference: async (query) => {
    return requests.get(`/admin/references/search_reference?q=${query}`);
  },

};

export default ReferencesServices;

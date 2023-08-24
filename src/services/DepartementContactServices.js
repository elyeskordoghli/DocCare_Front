import requests from "./httpService";

const DepartmentContactServices = {
  getAllContact: async (body) => {
    return requests.get("/admin/contacts/", body);
  },
  getContactById: async (id, body) => {
    return requests.get(`/admin/contacts/contact/${id}`, body);
  },
  deleteContact: async (id) => {
    return requests.delete(`/admin/contacts/delete/${id}`);
  },
  updateContact: async (id, body) => {
    return requests.put(`/admin/contacts/update/${id}`, body);
  },
  searchContact: async (query) => {
    return requests.get(`/admin/contacts/search_contact?q=${query}`);
  },
  getContactsByStatus: async (status) => {
    return requests.get(`/admin/contacts/get_contacts_by_status/${status}`);
  },
};

export default DepartmentContactServices;

import requests from "./httpService";

const QuoteServices = {
  getAllQuote: async (body) => {
    return requests.get("/admin/quotes/", body);
  },
  getQuoteById: async (id, body) => {
    return requests.get(`/admin/quotes/quote/${id}`, body);
  },
  deleteQuote: async (id) => {
    return requests.delete(`/admin/quotes/delete/${id}`);
  },
  updateQuote: async (id, body) => {
    return requests.put(`/admin/quotes/update/${id}`, body);
  },
  searchQuote: async (query, status) => {
    return requests.get(`/admin/quotes/search_quote?q=${query}&status=${status}`);
},

};

export default QuoteServices;

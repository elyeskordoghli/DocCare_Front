import requests from "./httpService";
    const HistoryServices = {

  getAllHistory: async (body) => {
    return requests.get("admin/history", body);
  },
 
};

export default HistoryServices;

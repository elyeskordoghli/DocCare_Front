import requests from "./httpService";
    const HistoryServices = {

  getAllHistory: async (body) => {
    return requests.get("admin/history", body);
  },
 

  getLastHistory : async(body) =>{
     return requests.get("admin/last_history",body);
  }
};


export default HistoryServices;

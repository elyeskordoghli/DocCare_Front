import requests from "./httpService";

const ReferencesServices = {
 
  getAllReferences: async () => {
    return requests.get("/user/references/data");
  },

};

export default ReferencesServices;

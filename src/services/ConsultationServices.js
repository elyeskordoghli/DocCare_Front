import requests from "./httpService";

const ConsultationServices = {
  getAllConsultations: async () => {
    return requests.get("/Consultation/getAll");
  },
  // getSubscriberById: async (id, body) => {
  //   return requests.get(`/admin/Subscribers/Subscriber/${id}`, body);
  // },
  CreateConsultations: async (query) => {
    return requests.post("/Consultation/Create");
},

UpdateConsultations: async (id, body) => {
    return requests.post(`/Consultation/EditConsultation/${id}`, body);
},

};

export default ConsultationServices;

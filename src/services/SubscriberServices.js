import requests from "./httpService";

const SubscriberServices = {
  getAllSubscribers: async () => {
    return requests.get("/admin/subscribers/");
  },
  // getSubscriberById: async (id, body) => {
  //   return requests.get(`/admin/Subscribers/Subscriber/${id}`, body);
  // },
  searchSubscriber: async (query) => {
    return requests.get(`/admin/subscribers/search_subscriber?q=${query}`);
},

};

export default SubscriberServices;

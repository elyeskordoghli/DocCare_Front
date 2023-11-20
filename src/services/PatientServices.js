import requests from "./httpService";
    const PatientServices = {




  
  getAllPatients: async (body) => {
      return requests.get(`Patient/GetAll`,body);
    },

      
  

//   getProjectByCategoryId: async (id) =>{
//     return requests.get(`admin/projects/projects_by_category/${id}`);
//   },
  
   Details: async (id) => {
     return requests.get(`Patient/getPatientById/${id}`);
   },
   addPatient: async (body) => {
     return requests.post("Patient/Create", body);
   },

   deletePatient: async (id) => {
    return requests.post(`Patient/DeletePatient/${id}`);
   },
//   // getAllProjects: async (body) => {
//   //   return requests.get("admin/projects", body);
//   // },
   updatePatient: async (id, body) => {
     return requests.post(`/Patient/EditPatient/${id}`, body);
   },
//   // updateManyProjects: async (body) => {
//   //   return requests.patch("Projects/update/many", body);
//   // },
//   // updateStatus: async (id, body) => {
//   //   return requests.put(`/Projects/status/${id}`, body);
//   // },

   

SearchPatient: async (query) => {
  return requests.get(`Patient/SearchPatient?q=${query}`);
},

DownloadDossierMedical: async (id) => {
  return requests.get(`Patient/DownloadDossierMedical/${id}`);
},
//   // deleteManyProjects: async (body) => {
//   //   return requests.patch("/Projects/delete/many", body);
//   // },

 
};

export default PatientServices;

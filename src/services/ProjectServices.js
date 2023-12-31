import requests from "./httpService";
    const ProjectServices = {
      getAllProjects: async (body) => {
        // const searchId = id !== null ? id : "";
        // const searchCategory = category_id !== null ? category_id : "";
        // const searchTitle = title !== null ? title : "";
        // const searchSubTitle = subtitle !== null ? subtitle : "";
        // const searchShortDescription = short_description !== null ? short_description : "";
        // const searchDescription = description !== null ? description : "";
        return requests.get(
          `/admin/projects`,body
        );
      },

      
  

  getProjectByCategoryId: async (id) =>{
    return requests.get(`admin/projects/projects_by_category/${id}`);
  },
  
  getProjectById: async (id) => {
    return requests.get(`admin/projects/project/${id}`);
  },
  addProject: async (body) => {
    return requests.post("admin/projects/store", body);
  },
  // getAllProjects: async (body) => {
  //   return requests.get("admin/projects", body);
  // },
  updateProject: async (id, body) => {
    return requests.post(`/admin/projects/update/${id}`, body);
  },
  // updateManyProjects: async (body) => {
  //   return requests.patch("Projects/update/many", body);
  // },
  // updateStatus: async (id, body) => {
  //   return requests.put(`/Projects/status/${id}`, body);
  // },

  deleteProject: async (id) => {
    return requests.delete(`/admin/projects/delete/${id}`);
  },

  search: async (query, id) => {
    return requests.post(`/admin/projects/search/${id}?q=${query}`);
  },
  // deleteManyProjects: async (body) => {
  //   return requests.patch("/Projects/delete/many", body);
  // },

 
};

export default ProjectServices;

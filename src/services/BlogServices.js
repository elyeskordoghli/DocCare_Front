import requests from "./httpService";
    const BlogServices = {
      // getAllServices: async () => {
    
      //   return requests.get(
      //     `/admin/blogs`
      //   );
      // },
      // getAllStaff: async (body) => {
      //   return requests.get("/admin/admin_user/", body);
      // },
  getBlogById: async (id) => {
    return requests.get(`admin/blogs/blog/${id}`);
  },
  addBlog: async (body) => {
    return requests.post("admin/blogs/store", body);
  },
  getAllBlogs: async (body) => {
    return requests.get("admin/blogs", body);
  },
  updateBlog: async (id, body) => {
    return requests.post(`/admin/blogs/update/${id}`, body);
  },
  // updateManyServices: async (body) => {
  //   return requests.patch("Services/update/many", body);
  // },
  // updateStatus: async (id, body) => {
  //   return requests.put(`/blogs/status/${id}`, body);
  // },

  deleteBlog: async (id) => {
    return requests.delete(`/admin/blogs/delete/${id}`);
  },
  // deleteManyServices: async (body) => {
  //   return requests.patch("/blogs/delete/many", body);
  // },
  searchBlog: async (query) => {
    return requests.get(`/admin/blogs/search_blog?q=${query}`);
  },
};

export default BlogServices;

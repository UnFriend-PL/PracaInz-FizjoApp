import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7023/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiService = {
  get: async (endpoint, params = {}, withAuth = false) => {
    try {
      const config = { params };
      if (withAuth) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers = { Authorization: `Bearer ${token}` };
        }
      }
      const response = await apiClient.get(endpoint, config);
      return response.data;
    } catch (error) {
      console.error("GET request error:", error);
      throw error;
    }
  },

  post: async (endpoint, data, withAuth = false) => {
    try {
      const config = {};
      if (withAuth) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers = { Authorization: `Bearer ${token}` };
        }
      }
      const response = await apiClient.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error("POST request error:", error);
      throw error;
    }
  },

  put: async (endpoint, data, withAuth = false) => {
    try {
      const config = {};
      if (withAuth) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers = { Authorization: `Bearer ${token}` };
        }
      }
      const response = await apiClient.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error("PUT request error:", error);
      throw error;
    }
  },

  delete: async (endpoint, withAuth = false) => {
    try {
      const config = {};
      if (withAuth) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers = { Authorization: `Bearer ${token}` };
        }
      }
      const response = await apiClient.delete(endpoint, config);
      return response.data;
    } catch (error) {
      console.error("DELETE request error:", error);
      throw error;
    }
  },
};

export default apiService;

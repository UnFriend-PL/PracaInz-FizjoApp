"use client";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7023/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

const cache = {};
const cacheExpiry = 5 * 60 * 1000; // Cache time - (5 min)

const apiService = {
  get: async (endpoint, params = {}, withAuth = false) => {
    const cacheKey = `${endpoint}?${new URLSearchParams(params).toString()}`;
    const cachedResponse = cache[cacheKey];

    if (cachedResponse && Date.now() - cachedResponse.timestamp < cacheExpiry) {
      return cachedResponse.data;
    }

    try {
      const config = { params };
      if (withAuth) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers = { Authorization: `Bearer ${token}` };
        }
      }
      const response = await apiClient.get(endpoint, config);

      cache[cacheKey] = {
        data: response.data,
        timestamp: Date.now(),
      };

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

      Object.keys(cache).forEach((key) => {
        if (key.startsWith(endpoint)) {
          delete cache[key];
        }
      });

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

      Object.keys(cache).forEach((key) => {
        if (key.startsWith(endpoint)) {
          delete cache[key];
        }
      });

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

      Object.keys(cache).forEach((key) => {
        if (key.startsWith(endpoint)) {
          delete cache[key];
        }
      });

      return response.data;
    } catch (error) {
      console.error("DELETE request error:", error);
      throw error;
    }
  },
};

export default apiService;

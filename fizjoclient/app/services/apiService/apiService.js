"use client";

const baseURL = "https://localhost:7023/api/v1";
const cache = {};
const cacheExpiry = 5 * 60 * 1000; // Cache time - (5 min)

const apiService = {
  get: async (endpoint, params = {}, withAuth = false, forceCache = false) => {
    const cacheKey = `${endpoint}?${new URLSearchParams(params).toString()}`;
    const cachedResponse = cache[cacheKey];

    if (
      !forceCache &&
      cachedResponse &&
      Date.now() - cachedResponse.timestamp < cacheExpiry
    ) {
      return cachedResponse.data;
    }

    try {
      const url = `${baseURL}${endpoint}${
        params ? `? ${new URLSearchParams(params).toString()}` : ""
      }`;
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (withAuth) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }

      const response = await fetch(url, config);
      const data = await response.json();
      cache[cacheKey] = {
        data,
        timestamp: Date.now(),
      };
      return data;
    } catch (error) {
      console.error("API GET request failed:", error);
      throw error;
    }
  },

  post: async (endpoint, data, withAuth = false) => {
    try {
      const url = `${baseURL}${endpoint}`;
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      if (withAuth) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }

      const response = await fetch(url, config);
      const responseData = await response.json();

      Object.keys(cache).forEach((key) => {
        if (key.startsWith(endpoint)) {
          delete cache[key];
        }
      });

      return responseData;
    } catch (error) {
      console.error("POST request error:", error);
      throw error;
    }
  },

  put: async (endpoint, data, withAuth = false) => {
    try {
      const url = `${baseURL}${endpoint}`;
      const config = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      if (withAuth) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }

      const response = await fetch(url, config);
      const responseData = await response.json();

      Object.keys(cache).forEach((key) => {
        if (key.startsWith(endpoint)) {
          delete cache[key];
        }
      });

      return responseData;
    } catch (error) {
      console.error("PUT request error:", error);
      throw error;
    }
  },

  delete: async (endpoint, withAuth = false) => {
    try {
      const url = `${baseURL}${endpoint}`;
      const config = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (withAuth) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }

      const response = await fetch(url, config);
      const responseData = await response.json();

      Object.keys(cache).forEach((key) => {
        if (key.startsWith(endpoint)) {
          delete cache[key];
        }
      });

      return responseData;
    } catch (error) {
      console.error("DELETE request error:", error);
      throw error;
    }
  },
};

export default apiService;

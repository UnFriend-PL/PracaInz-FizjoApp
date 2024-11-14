"use client";

const baseURL = "https://localhost:7023/api/v1";

const apiService = {
  get: async (endpoint, params = {}, withAuth = false) => {
    try {
      const url = `${baseURL}${endpoint}${
        params ? `?${new URLSearchParams(params).toString()}` : ""
      }`;
      const config = {
        method: "GET",
        headers: {},
      };
      if (withAuth) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }

      const response = await fetch(url, config);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! status: ${response.status}`, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      return data;
    } catch (error) {
      console.error("API GET request failed:", error);
      throw error;
    }
  },

  post: async (endpoint, data, withAuth = false) => {
    return await apiService._requestWithBody("POST", endpoint, data, withAuth);
  },

  put: async (endpoint, data, withAuth = false) => {
    return await apiService._requestWithBody("PUT", endpoint, data, withAuth);
  },

  delete: async (endpoint, data = null, withAuth = false) => {
    return await apiService._requestWithBody(
      "DELETE",
      endpoint,
      data,
      withAuth
    );
  },

  _requestWithBody: async (method, endpoint, data, withAuth = false) => {
    try {
      const url = `${baseURL}${endpoint}`;
      const config = {
        method: method,
        headers: {},
        body: null,
      };

      if (data) {
        if (data instanceof FormData) {
          config.body = data;
        } else {
          config.headers["Content-Type"] = "application/json";
          config.body = JSON.stringify(data);
        }
      }

      if (withAuth) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }

      const response = await fetch(url, config);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! status: ${response.status}`, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      let responseData;
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      return responseData;
    } catch (error) {
      console.error(`${method} request error:`, error);
      throw error;
    }
  },
};

export default apiService;

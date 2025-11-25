import axios from 'axios';
import { STORAGE_KEY } from 'src/components/settings';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const blobFetcher = (url) =>
  axios.get(url, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
    },
  }).then((res) => res.data);

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

// POST
export const poster = async (url, data = {}, config = {}) => {
  try {
    const res = await axiosInstance.post(url, data, config);
    return res.data;
  } catch (error) {
    console.error("❌ Failed to post:", error);
    throw error;
  }
};

// PUT
export const putter = async (url, data = {}, config = {}) => {
  try {
    const res = await axiosInstance.put(url, data, config);
    return res.data;
  } catch (error) {
    console.error("❌ Failed to put:", error);
    throw error;
  }
};

// DELETE
export const deleter = async (url, config = {}) => {
  try {
    const res = await axiosInstance.delete(url, config);
    return res.data;
  } catch (error) {
    console.error("❌ Failed to delete:", error);
    throw error;
  }
};

// PATCH (optional)
export const patcher = async (url, data = {}, config = {}) => {
  try {
    const res = await axiosInstance.patch(url, data, config);
    return res.data;
  } catch (error) {
    console.error("❌ Failed to patch:", error);
    throw error;
  }
};


// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: '/api/authdash/me',
    signIn: '/api/authdash/login',
    signUp: '/api/authdash/register',
  },
  admins: {
    etablissements: {
      all : '/api/etablissements'
    },
    categories: {
      all: '/api/categories'
    },
  },
  
};

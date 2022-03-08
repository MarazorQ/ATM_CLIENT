import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || " http://localhost:5000/";

export const client = {
  get: async (url: string) => {
    const instance = axios.create();

    return instance.get(url);
  },
  post: async (url: string, data: any) => {
    const instance = axios.create();

    return instance.post(url, data);
  },
  delete: async (url: string, data: any) => {
    const instance = axios.create();

    return instance.delete(url, data);
  },
  patch: async (url: string, data: any) => {
    const instance = axios.create();

    return instance.patch(url, data);
  },
};

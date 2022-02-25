import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "localhost:3000/api/";

export const client = {
  get: async (url: string) => {
    const instance = axios.create();

    return instance.get(url);
  },
  post: async (url: string, data: any) => {
    const instance = axios.create();

    return instance.post(url, data);
  },
  patch: async (url: string, data: any) => {
    const instance = axios.create();

    return instance.patch(url, data);
  },
};

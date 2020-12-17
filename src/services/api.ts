import { main } from '../config/main';

export const Api = {
  get: <T = unknown>(url: string): Promise<T> =>
    fetch(`${main.baseUrl}${url}`).then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    }),
};

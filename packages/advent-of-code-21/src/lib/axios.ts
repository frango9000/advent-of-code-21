import { Axios } from 'axios-observable';

export const axios: Axios = Axios.create({
  method: 'GET',
  baseURL: 'https://adventofcode.com/2021/day',
  headers: {
    cookie:
      'session=53616c7465645f5fe62b34f231994da651f661155f9a1623b9c55536d7742626f7fd6b38a56805d4b27a43f17fda4ff18356b87395bbc798b64609b393130fad',
  },
});

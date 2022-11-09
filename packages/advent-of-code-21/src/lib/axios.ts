import { Axios } from 'axios-observable';

export const axios: Axios = Axios.create({
  method: 'GET',
  baseURL: 'https://adventofcode.com/2021/day',
  headers: { cookie: `session=${process.env.AOC_SESSION}` },
});

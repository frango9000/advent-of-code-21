import { Axios } from 'axios-observable';
import { map, pipe } from 'rxjs';

export const api: Axios = Axios.create({
  method: 'GET',
  baseURL: 'https://adventofcode.com/2021/day',
  headers: { cookie: `session=${process.env.AOC_SESSION}` },
  timeout: 5000,
});

export const mapData = pipe(map(({ data }) => data));

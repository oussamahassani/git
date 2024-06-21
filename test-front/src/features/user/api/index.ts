import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";
import { LoginReq, LoginRes, RegisterReq, RegisterRes } from "../types";
import { promises } from "dns";

const api = makeApi(`${Env.API_BASE_URL}`);

export const login = (data: LoginReq): Promise<LoginRes> =>
  api.post(`/auth/login`, data);

export const register = (data: RegisterReq): Promise<RegisterRes> =>
  api.post(`/auth/register`, data);

export const getCurrent = (): Promise<RegisterRes> => api.get(`/api/current`);

export const registerAgent = (data: any): Promise<any> => api.post(`/agents`, data);
export const getAllAgent = (): Promise<any> => api.get('/agents')
export const deleteAgent = (id: any): Promise<any> => api.delete(`/agents/${id}`)
export default {
  login,
  register,
  getCurrent,
};

import {apiClient} from "./ApiClient";

export const login = (loginRequest) => {
    return apiClient.post('api/v1/auth/login', loginRequest);
  };
export const checkId = (accountId) => {
    return apiClient.get(`api/v1/auth/id-check/${accountId}`);
  };
export const checkEmail = (email) => {
    return apiClient.get(`api/v1/auth/email-check/${email}`);
  };
export const join = (usertDTO) => {
    return apiClient.post('api/v1/auth/join', usertDTO);
  };
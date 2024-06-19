import {apiClient} from "./ApiClient";

export const login = (loginRequest) => {
    return apiClient.post('api/v1/auth/login', loginRequest);
  };
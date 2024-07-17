import {apiClient} from "./ApiClient";

export const login = (loginRequest) => {
    return apiClient.post('api/v1/auth/login', loginRequest);
  };
  export const join = (usertDTO) => {
    return apiClient.post('api/v1/auth/join', usertDTO);
  };
  export const postAdress = (newAddressDTO) => {
      return apiClient.post('api/v1/address-info', newAddressDTO);
    };

  //
export const checkId = (accountId) => {
    return apiClient.get(`api/v1/auth/id-check/${accountId}`);
  };
export const checkEmail = (email) => {
    return apiClient.get(`api/v1/auth/email-check/${email}`);
  };
export const getUserData = (accountId) => {
    return apiClient.get(`api/v1/user-account/${accountId}`, userUpdate);
  };
export const getSuccessBidData = (accountId) => {
  return apiClient.get(`api/v1/address-info/${accountId}`);
  };
export const userUpdate = (accountId, userUpdate) => {
    return apiClient.put(`api/v1/user-account/${accountId}`, userUpdate);
  };
export const verify = (email, certificationToken) => {
    return apiClient.get(`api/v1/auth/verify?email=${email}&certificationToken=${certificationToken}`);
  };
export const getAdress = () => {
  return apiClient.get('api/v1/address-info');
};
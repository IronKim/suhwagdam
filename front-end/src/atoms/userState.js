import {atom, selector} from "recoil";
import {jwtDecode} from "jwt-decode";

export const userState = atom({
    key: 'userState',
    default: {
        accountId: '',
        nickname: '',
    }
});

export const userDataState = selector({
    key: 'userDataState',
    get: ({get}) => {
        const user = jwtDecode(localStorage.getItem('suhwagdamToken') || sessionStorage.getItem('suhwagdamToken'));
        return user;
    },
});
import {userDataState, userState} from "../atoms/userState";
import {useRecoilStateLoadable, useRecoilValue} from "recoil";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import sweet from 'sweetalert2';

const UserRoute = ({ children }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useRecoilStateLoadable(userDataState);

    useEffect(() => {
        console.log('UserRoute userData:', userData)


        if(userData.state === 'loading') {
            return(
                <div>로딩중...</div>
            )
        }

        if(!userData.contents.accountId) {
            sweet.fire({
                icon: 'error',
                title: '로그인이 필요한 서비스입니다.',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/login');
        }
    }, [userData.accountId]);

    return children;
};

export default UserRoute;


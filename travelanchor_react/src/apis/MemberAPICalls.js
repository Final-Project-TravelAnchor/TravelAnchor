import { GET_MEMBER, PUT_MEMBER, POST_LOGIN, POST_REGISTER } from '../modules/MemberModule';

export const callGetMemberAPI = ({ memberId }) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/member/v1/members/${memberId}`;

	return async (dispatch) => {

		const result = await fetch(requestURL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: '*/*',
				Authorization:
					'Bearer ' + window.localStorage.getItem('accessToken')
			}
		}).then((response) => response.json());

		console.log('[MemberAPICalls] callGetMemberAPI RESULT 회원정보 : ', result);

		if (result.status === 200) {
            dispatch({ type: GET_MEMBER, payload: result.data }); // data 저장
        } else {
            console.error('Error fetching member:', result.message);
        }
	};
};

export const callUpdateMemberAPI = ({ memberId, updatedData }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/member/v1/members/${memberId}`;

    return async (dispatch) => {
        try {
            const result = await fetch(requestURL, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
                body: updatedData, // FormData 전송
            }).then((response) => response.json());

            if (result.status === 200) {
                dispatch({ type: PUT_MEMBER, payload: result });
            } else {
                console.error('Error fetching member:', result.message);
            }
        } catch (error) {
            console.error('API 호출 중 오류:', error);
        }
    };
};

export const callLoginAPI = ({ form }) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/login`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: '*/*',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({
				memberId: form.memberId,
				memberPassword: form.memberPassword
			})
		}).then((response) => response.json());

		console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
		if (result.status === 200) {
			window.localStorage.setItem('accessToken', result.data.accessToken);
		} else if (result.status === 400) {
			alert(result.message); // 로그인 실패 시 메시지를 alert로 표시
		}
		dispatch({ type: POST_LOGIN, payload: result });
	};
};

export const callLogoutAPI = () => {
	return async (dispatch, getState) => {
		dispatch({ type: POST_LOGIN, payload: '' });
		console.log('[MemberAPICalls] callLogoutAPI RESULT : SUCCESS');
	};
};

export const callRegisterAPI = ({ form }) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/signup`;

	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: '*/*'
			},
			body: JSON.stringify({
				memberCode: null,
				authorityCode: 2,
				memberId: form.memberId,
				memberPassword: form.memberPassword,
				memberName: form.memberName,
				memberMobileNumber: form.memberMobileNumber,
				memberNickName: form.memberNickName,
				memberCreatedAt: new Date().toISOString(), // 현재 날짜 시간
				memberLevel: 1,
				memberCertification: form.memberCertification || 'N',
				profilePhoto: process.env.REACT_APP_DEFAULT_IMAGE || ''
			})
		}).then((response) => response.json());

		console.log('[MemberAPICalls] callRegisterAPI RESULT : ', result);

		if (result.status === 201) {
			dispatch({ type: POST_REGISTER, payload: result });
		}
	};
};

export const callFindIdAPI = ({ mobileNumber }) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/findid`;

	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: '*/*'
			},
			body: JSON.stringify({
				memberMobileNumber: mobileNumber
			})
		}).then((response) => response.json());

		console.log('[MemberAPICalls] callFindIdAPI RESULT : ', result);

		if (result.status === 200) {
			return result.data;
		} else {
			throw new Error(result.message);
		}
	};
};

export const callFindPwAPI = ({ mobileNumber }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/findpw`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            },
            body: JSON.stringify({
                memberMobileNumber: mobileNumber
            })
        }).then((response) => response.json());

        console.log('[MemberAPICalls] callFindPwAPI RESULT : ', result);

        if (result && result.status === 200) {
            return result.data; // 인증 코드를 반환
        } else {
            throw new Error(result.message || 'Unknown error occurred');
        }
    };
};

export const callResetPwAPI = ({ mobileNumber, verificationCode, newPassword }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/resetpw`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            },
            body: JSON.stringify({
                memberMobileNumber: mobileNumber,
                verificationCode: verificationCode,
                memberPassword: newPassword
            })
        }).then((response) => response.json());

        console.log('[MemberAPICalls] callResetPwAPI RESULT : ', result);

        if (result && result.status === 200) {
            return true; // 비밀번호 변경 성공
        } else {
            throw new Error(result.message || 'Unknown error occurred');
        }
    };
};
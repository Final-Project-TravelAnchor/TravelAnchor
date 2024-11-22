
import {
    GET_NOTICE,
    PUT_NOTICE,
    POST_CREATE_NOTICE,
} from "../modules/NoticeModule";


export const fetchGetData = async (requestURL) => {
    try {
        const response = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        });
        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Error fetching notice data:', error);
        throw error;
    }
};

export const fetchPutData = async (requestURL, updatedNotice) => {

    console.log('Fetching notice data url: ', requestURL);
    console.log('Fetching notice data' , updatedNotice);

    try {
        const response = await fetch(requestURL, {
            method: 'PUT',
            headers: {
				Accept: '*/*',
                'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + window.localStorage.getItem('accessToken')
			},
            body: JSON.stringify(updatedNotice)
        }).then((response) => response.json());

        console.log('[NoticeAPICalls] fetchPutNoticeData RESULT : ', response);

        return response;
    } catch (error) {
        console.error('Error fetching notice data:', error);
        throw error;
    }
};

export const fetchPostData = async (requestURL, createdNotice) => {

    console.log('Fetching notice url: ', requestURL);
    console.log('Fetching notice data' , createdNotice);

    try {
        const response = await fetch(requestURL, {
            method: 'POST',
            headers: {
				Accept: '*/*',
                'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + window.localStorage.getItem('accessToken')
			},
            body: JSON.stringify(createdNotice)
        }).then((response) => response.json());

        console.log('[NoticeAPICalls] fetchPostNoticeData RESULT : ', response);

        return response;
    } catch (error) {
        console.error('Error fetching notice data:', error);
        throw error;
    }
};

export const callNoticeListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice/v1/notices`;
    console.log("[NoticeAPICalls] callNoticeListAPI : ", requestURL);

    return async (dispatch, getState) => {

        try {

            const result = await fetchGetData(requestURL);

            if(result.status === 200) {
                console.log('[NoticeAPICalls] callNoticeListAPI Result : ', result);
                dispatch({ type: GET_NOTICE, payload: result.data });
            }
            
        } catch (error) {
            console.error('[NoticeAPICalls] callNoticeListAPI Error : ', error);
            // TODO: Error handling code here.
        }


    };
};

export const callUpdateNoticeAPI = (updatedNotice) => {
    console.log('[NoticeAPICalls] callUpdateNoticeAPI', updatedNotice);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice/v1/notices`;

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPutData(requestURL, updatedNotice);

            if(result.status === 200) {
                console.log('[NoticeAPICalls] callUpdateNoticeAPI Result : ', result);
                dispatch({ type: PUT_NOTICE, payload: result });
            }

        } catch (error) {
            console.error('[NoticeAPICalls] callUpdateNoticeAPI error : ', error);
        }
    };
};

export const callCreateNoticeAPI = (createdNotice) => {
    console.log('[NoticeAPICalls] callCreateNoticeAPI Start');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice/v1/notices`;

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPostData(requestURL, createdNotice);

            if(result.status === 200) {
                console.log('[NoticeAPICalls] callCreateNoticeAPI Result : ', result);
                dispatch({ type: POST_CREATE_NOTICE, payload: result });
            }

        } catch (error) {
            console.error('[NoticeAPICalls] callUpdatePopulationAPI error : ', error);
        }
    };
};
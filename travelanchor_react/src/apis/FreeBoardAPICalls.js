import { fetchGetData, fetchPutData, fetchPostData } from "./NoticeAPICalls";

import {
    GET_FREEBOARD,
    PUT_FREEBOARD,
    POST_CREATE_FREEBOARD,
    DEL_FREEBOARD,
} from "../modules/FreeBoardModule";

export const callFreeBoardListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/free-board/v1/free-board`;
    // console.log("[FreeBoardAPICalls] callFreeBoardListAPI : ", requestURL);

    return async (dispatch, getState) => {

        try {

            const result = await fetchGetData(requestURL);

            if(result.status === 200) {
                console.log('[FreeBoardAPICalls] callFreeBoardListAPI Result : ', result);
                dispatch({ type: GET_FREEBOARD, payload: result.data });
            }
            
        } catch (error) {
            console.error('[FreeBoardAPICalls] callNoticeListAPI Error : ', error);
            // TODO: Error handling code here.
        }


    };
};

export const callUpdateFreeBoardAPI = (updatedFreeBoard) => {
    console.log('[FreeBoardAPICalls] callUpdateFreeBoardAPI', updatedFreeBoard);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/free-board/v1/free-board`;

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPutData(requestURL, updatedFreeBoard);

            if(result.status === 200) {
                console.log('[FreeBoardAPICalls] callUpdateNoticeAPI Result : ', result);
                dispatch({ type: PUT_FREEBOARD, payload: result });
            }

        } catch (error) {
            console.error('[FreeBoardAPICalls] callUpdateNoticeAPI error : ', error);
        }
    };
};

export const callCreateFreeBoardAPI = (createdNotice) => {
    console.log('[FreeBoardAPICalls] callCreateNoticeAPI Start');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/free-board/v1/free-board`;

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPostData(requestURL, createdNotice);

            if(result.status === 200) {
                console.log('[FreeBoardAPICalls] callCreateNoticeAPI Result : ', result);
                dispatch({ type: POST_CREATE_FREEBOARD, payload: result });
            }

        } catch (error) {
            console.error('[FreeBoardAPICalls] callUpdatePopulationAPI error : ', error);
        }
    };
};

export const callDeleteFreeBoardAPI = (createdNotice) => {
    console.log('[FreeBoardAPICalls] callDeleteNoticeAPI Start');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/free-board/v1/free-board/del`;

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPostData(requestURL, createdNotice);

            if(result.status === 200) {
                console.log('[FreeBoardAPICalls] callDeleteNoticeAPI Result : ', result);
                dispatch({ type: DEL_FREEBOARD, payload: result });
            }

        } catch (error) {
            console.error('[FreeBoardAPICalls] callDeleteNoticeAPI error : ', error);
        }
    };
};
import { fetchGetData, fetchPutData, fetchPostData } from "./NoticeAPICalls";

import {
    GET_ACTIVITY,
    PUT_ACTIVITY,
    POST_CREATE_ACTIVITY,
    DEL_ACTIVITY,
} from "../modules/ActivityModule";

export const callActivityListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/free-board/v1/free-board`;
    // console.log("[ActivityAPICalls] callActivityListAPI : ", requestURL);

    return async (dispatch, getState) => {

        try {

            const result = await fetchGetData(requestURL);

            if(result.status === 200) {
                console.log('[ActivityAPICalls] callActivityListAPI Result : ', result);
                dispatch({ type: GET_ACTIVITY, payload: result.data });
            }
            
        } catch (error) {
            console.error('[ActivityAPICalls] callNoticeListAPI Error : ', error);
            // TODO: Error handling code here.
        }


    };
};

export const callUpdateActivityAPI = (updatedActivity) => {
    console.log('[ActivityAPICalls] callUpdateActivityAPI', updatedActivity);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/free-board/v1/free-board`;

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPutData(requestURL, updatedActivity);

            if(result.status === 200) {
                console.log('[ActivityAPICalls] callUpdateNoticeAPI Result : ', result);
                dispatch({ type: PUT_ACTIVITY, payload: result });
            }

        } catch (error) {
            console.error('[ActivityAPICalls] callUpdateNoticeAPI error : ', error);
        }
    };
};

export const callCreateActivityPlanAPI = (createdActivityPlan) => {
    console.log('[ActivityAPICalls] callCreateActivityPlanAPI', createdActivityPlan);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-plan/v1/travel-plan/act`;
    console.log("[ActivityAPICalls] callCreateActivityPlanAPI : ", requestURL);

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPostData(requestURL, createdActivityPlan);

            if(result.status === 200) {
                console.log('[ActivityAPICalls] callCreateActivityPlanAPI Result : ', result);
                dispatch({ type: POST_CREATE_ACTIVITY, payload: result });
            }

        } catch (error) {
            console.error('[ActivityAPICalls] callDeleteTravelPlanAPI error : ', error);
        }
    };
};

export const callDeleteActivityAPI = (createdNotice) => {
    console.log('[ActivityAPICalls] callDeleteNoticeAPI Start');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/free-board/v1/free-board/del`;

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPostData(requestURL, createdNotice);

            if(result.status === 200) {
                console.log('[ActivityAPICalls] callDeleteNoticeAPI Result : ', result);
                dispatch({ type: DEL_ACTIVITY, payload: result });
            }

        } catch (error) {
            console.error('[ActivityAPICalls] callDeleteNoticeAPI error : ', error);
        }
    };
};
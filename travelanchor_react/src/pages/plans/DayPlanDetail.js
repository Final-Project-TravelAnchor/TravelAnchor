import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react"; // useEffect 추가
import { callCreateDayPlanAPI } from "../../apis/TravelPlanAPICalls";
import { callCreateActivityPlanAPI } from "../../apis/ActivityAPICalls";

export default function DayPlanDetail() {

    const [inputForm, setInputForm] = useState({});
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const planDay = location.state || {};
    console.log("DayPlanDetail planDay : ", planDay);
    const form = useSelector(state => state.planReducer);

    console.log("DayPlanDetail form : ", form);
    // const dayMax = useSelector(state => state.travelDayReducer);
    
    const start = new Date(form.travelStartDate);
    const calculatedDate = new Date(start);
    calculatedDate.setDate(start.getDate() + (planDay.dayNumber - 1));

    const formattedDate = calculatedDate.toISOString().split("T")[0];

    // inputForm 초기화 로직 추가 (수정 필요 부분)
    // useEffect(() => {
    //     setInputForm({
    //         activityTitle: "",
    //         activityDetail: "",
    //     });
    // }, []);

    const onChangeHandler = (e) => {
        setInputForm({
            ...inputForm,
            [e.target.name]: e.target.value,
        });
    };

    // useEffect(() => {
    
    //     return () => {
    //         console.log("Cleanup on component unmount");
    //     };
    // }, []);

    const onClickHandler = async () => {
        try {
            const createdTravelDay = {
                dayCode: null,
                travelCode: planDay.travelCode,
                dayNumber: planDay.dayNumber,
                dayDate: planDay.dayDate,
                activityTitle: inputForm.activityTitle || "",
                activityDetail: inputForm.activityDetail || "",
            };
            
            console.log("DayPlanDetail: " , createdTravelDay);
    
            await dispatch(callCreateDayPlanAPI(createdTravelDay)); // 비동기 작업 실행
    
            navigator("/plans/AddByDayPlan");
        } catch (error) {
            console.error("Error in onClickHandler: ", error);
        }
    };

    return (
        <>
            <div>
                <h1>Day {planDay.dayNumber}</h1>
                <h2>{formattedDate}</h2>
            </div>
            <div>
                <input
                    placeholder="Day 제목을 입력하세요."
                    name="activityTitle"
                    onChange={onChangeHandler}
                    value={inputForm.activityTitle || ""} 
                />
                <input
                    placeholder="Day 계획을 입력하세요."
                    name="activityDetail"
                    onChange={onChangeHandler}
                    value={inputForm.activityDetail || ""}
                />
            </div>
            <div>
                <button onClick={onClickHandler}>
                    추가
                </button>
            </div>
        </>
    );
}
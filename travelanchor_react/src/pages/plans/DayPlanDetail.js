import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { callCreateDayPlanAPI } from "../../apis/TravelPlanAPICalls";

export default function DayPlanDetail() {

    const navigator = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation(); // useLocation을 호출해 객체를 반환받음
    const planDay = location.state || {};
    // console.log("DayPlanDetail : ", planDay);

    const selectedDate = useSelector((state) => state.planReducer);
    const startDate = selectedDate.startDate.split("T")[0];
    const endDate = selectedDate.endDate.split("T")[0];

    const start = new Date(startDate);
    const calculatedDate = new Date(start);
    calculatedDate.setDate(start.getDate() + (planDay.dayNumber - 1)); // dayNumber에 따라 날짜 증가

    // 날짜 포맷팅 (YYYY-MM-DD)
    const formattedDate = calculatedDate.toISOString().split("T")[0];

    // console.log("DayPlanDetail : " , selectedDate);

    const [ form, setForm ] = useState({
        activityTitle: "",
        activityDetail: "",
    });

    const onChangeHandler = (e) => {
        setForm({
			...form,
			[e.target.name]: e.target.value,
		});
        // console.log("onChangeHandler : ", e.target.value);
    };

    const onClickHandler = () => {
        // console.log("DayPlanDetail ClickHandler");
        
        const createdTravelDay = {
            travelCode: planDay.maxTravelCode,
            dayNumber: Number(planDay.dayNumber),
            dayDate: Number(planDay.dayNumber),
        };

        dispatch(callCreateDayPlanAPI(createdTravelDay));

        navigator("/plans/AddByDayPlan");

        // dispatch(callCreateActivityPlanAPI(createdTravelDay))
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
                    value={form.activityTitle}
                />
                <input
                    placeholder="Day 계획을 입력하세요."
                    name="activityDetail"
                    onChange={onChangeHandler}
                    value={form.activityDetail}
                />
            </div>
            <div>
                <button
                    onClick={onClickHandler}
                >추가</button>
            </div>
        </>
    );
}
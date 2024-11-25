import { useNavigate } from "react-router-dom";

export default function TravelPlanList(travelPlanDetail) {

    const travelPlan = travelPlanDetail.travelPlan;

	const navigate = useNavigate();

	const onClickTravelPlanHandler = (travelPlan) => {
		console.log("onClickTravelPlanHandler");
        navigate(`/plans/${travelPlan.travelCode}`, { replace: false, state: travelPlan });
	};

    // if (!travelPlan) {
    //     return <div>여행일정이 없습니다. 여행일정을 추가해주세요!</div>; // 데이터가 없는 경우 처리
    // }

    if (travelPlan?.travelIsdeleted !== "N") {
        return null; 
    }

	return (
		<div>
            <div 
                className="travel-plan-item"
                onClick={() => onClickTravelPlanHandler(travelPlan)}    
            >
                {/* <h5>{travelPlan.travelCode}</h5> */}
                <h2>{travelPlan.travelName}</h2>
                <h5>{travelPlan.travelStartDate} - {travelPlan.travelEndDate} at {travelPlan.travelDestination}</h5>
            </div>
        </div>
	)
}
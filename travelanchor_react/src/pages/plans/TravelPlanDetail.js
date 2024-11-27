import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { callUpdateTravelPlanAPI, callDeleteTravelPlanAPI, callTravelPlanDetailAPI } from "../../apis/TravelPlanAPICalls";

import { calExpenseTotalAmountBytravelCode } from "../../apis/ExpenseAPICalls";

export default function TravelPlanDetail() {

	const location = useLocation();
	const travelPlan = location.state;

	console.log("TravelPlanDetail travelPlan: " , travelPlan);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const travelPlanReducer = useSelector(state => state.travelPlanReducer)

	const expenseList = useSelector(state => state.expenseReducer);
	const expense = expenseList.data;
	console.log("TravelPlanReducer expense: " , expense[0].expenseTotalAmount);

	const onClickUpdateHandler = (travelPlan) => {
		navigate(`/plans/TravelPlanUpdate/${travelPlan.travelCode}`, { state: travelPlan, replace: false });
	};

	useEffect(() => {

		dispatch(calExpenseTotalAmountBytravelCode(travelPlan.travelCode));

	},[travelPlan]);

	 // 삭제
	const onClickDeleteHandler = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            const deleteTravelPlan = {
                ...travelPlan,
                travelIsdeleted: 'Y',
            };

            try {
                await dispatch(callDeleteTravelPlanAPI(deleteTravelPlan));
                alert("게시글이 삭제되었습니다.");
                navigate(`/plans/TravelPlan`);
            } catch (err) {
                console.error("Error deleting TravelPlan: ", err);
                alert("게시글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };


	useEffect(() => {
		console.log("[여행일정상세] useEffect 실행");
		dispatch(callTravelPlanDetailAPI(travelPlan.travelCode));
	}, []);

	const onClickBackHandler = () => {
        navigate(-1); // 이전 페이지로 이동
    };

	return (
		<div className="travel-plan-detail-container">
			<h1>여행일정 상세보기</h1>
				
			<div>
				<h1>제목: {travelPlan.travelName}</h1>
				<h2>여행출발: {travelPlan.travelStartDate}</h2>
				<h2>여행도착: {travelPlan.travelEndDate}</h2>
				<h2>여행기간: {travelPlan.travelTotalDate}</h2>
				<h2>여행지: {travelPlan.travelDestination}</h2>
			</div>

			<div>
				<button>
					{expense[0].expenseTotalAmount}원
				</button>
			</div>

			<div>
				<button className="notice-back-button" onClick={onClickBackHandler}>
                    뒤로가기
                </button>
				<button onClick={() => onClickUpdateHandler(travelPlan)}>
					수정하기
				</button>
				<button onClick={() => onClickDeleteHandler(travelPlan)}>
					삭제하기
				</button>
			</div>
		</div>
	);
}
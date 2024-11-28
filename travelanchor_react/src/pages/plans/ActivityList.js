// import ActivityCSS from "./ActivityList.module.css";
import { useNavigate } from "react-router-dom";

export default function ActivityList( activityDetail ) {

    // console.log("[ActivityList] activityDetail", activityDetail);

    const activity = activityDetail.population;

    const navigate = useNavigate();

    const onClickActivityHandler = (activity) => {
        console.log("onClickActivityHandler");
        navigate(`/plans/${activity.activityCode}`, { replace: false, state: activity });
    };

    return (
        <div 
            onClick={() => onClickActivityHandler(activity)}    
        >
            <h5>{activity.activityCode}</h5>
            <h5>{activity.dayCode}</h5>
            <h5>{activity.activityTitle}</h5>
            <h5>{activity.activityDetail}</h5>
        </div>
    );

}
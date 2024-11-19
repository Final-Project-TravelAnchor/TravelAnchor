import React, { useState } from "react";
import TravelMap from "../../apis/MapAPICalls";  // TravelMap을 default로 임포트

function Report() {
    const [mapVisible, setMapVisible] = useState(false);  // 지도 표시 여부를 관리하는 상태

    // 버튼 클릭 시 mapVisible 상태를 true로 설정하여 TravelMap을 렌더링합니다.
    const onClickTravelMap = () => {
        setMapVisible(true);  // 지도 표시
    };

    return (
        <div>
            <button onClick={onClickTravelMap}>
                지도 나옴
            </button>

            {/* mapVisible이 true일 때만 TravelMap 컴포넌트를 렌더링 */}
            {mapVisible && <TravelMap />}
        </div>
    );
}

export default Report;

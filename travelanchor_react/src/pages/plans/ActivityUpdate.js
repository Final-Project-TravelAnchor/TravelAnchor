import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { callUpdateActivityAPI } from "../../apis/ActivityAPICalls";
import { useDispatch } from "react-redux";

export default function ActivityUpdate() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const activity = location.state || {}; 
    const [form, setForm] = useState({}); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 

    useEffect(() => {
        if (activity) {
            setForm({
                activityTitle: activity.activityTitle || "",
                activityDetail: activity.activityDetail || "",
            });
        }
    }, [activity]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickSaveHandler = async () => {
        if (!form.activityTitle.trim() || !form.activityDetail.trim()) {
            alert("제목과 설명을 모두 입력해주세요.");
            return;
        }

        const updatedActivity = {
            ...activity,
            activityCode: activity.activityCode,
            activityDayCode: activity.dayCode,
            activityTitle: form.activityTitle,
            activityDetail: form.activityDetail,
        };

        try {
            setLoading(true); 
            setError(null); 
            console.log("updatedActivity : ", updatedActivity);

            await dispatch(callUpdateActivityAPI(updatedActivity));
            alert("게시글이 성공적으로 수정되었습니다.");
            navigate(`/activity`, { replace: true }); 
        } catch (err) {
            console.error("Error updating activity: ", err);
            setError("게시글 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setLoading(false); 
        }
    };

    const onClickCancelHandler = () => {
        if (window.confirm("수정을 취소하시겠습니까? 변경사항은 저장되지 않습니다.")) {
            navigate(`/activity/${activity.activityCode}`, { replace: true });
        }
    };

    return (
        <>
            <div>
                <h1>활동 수정</h1>
            </div>
            <div>
                {loading && <p>수정 중입니다... 잠시만 기다려주세요.</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <label>
                    제목:{" "}
                    <input
                        placeholder="제목"
                        name="activityTitle"
                        onChange={onChangeHandler}
                        value={form.activityTitle}
                    />
                </label>
                <br />
                <label>
                    설명:{" "}
                    <input
                        placeholder="설명"
                        name="activityDetail"
                        onChange={onChangeHandler}
                        value={form.activityDetail}
                    />
                </label>
                <br />
                <button onClick={onClickSaveHandler} disabled={loading}>
                    {loading ? "저장 중..." : "수정하기"}
                </button>
                <button onClick={onClickCancelHandler} disabled={loading}>
                    취소하기
                </button>
            </div>
        </>
    );
}
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { callUpdateTravelReportAPI } from "../../apis/TravelReportAPICalls";
import { useDispatch } from "react-redux";

export default function TravelReportModify() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const travelReport = location.state || {};
    const [form, setForm] = useState({
        reportTitle: "",
        reportContent: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (travelReport) {
            setForm({
                reportTitle: travelReport.reportTitle || "",
                reportContent: travelReport.reportContent || "",
            });
        }
    }, [travelReport]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickSaveHandler = async () => {
        if (!form.reportTitle.trim() || !form.reportContent.trim()) {
            alert("제목과 설명을 모두 입력해주세요.");
            return;
        }

        const updatedTravelReport = {
            ...travelReport,
            reportCode: travelReport.reportCode,
            memberCode: travelReport.memberCode,
            reportTitle: form.reportTitle, 
            reportContent: form.reportContent,
            reportDestination: travelReport.reportDestination,
            reportCreatedAt: travelReport.reportCreatedAt,
            reportIsdeleted: 'N',
        };

        try {
            setLoading(true);
            setError(null);
            console.log("updatedTravelReport : ", updatedTravelReport);

            await dispatch(callUpdateTravelReportAPI(updatedTravelReport));
            alert("게시글이 성공적으로 수정되었습니다.");
            console.log("이게 맞는지 보여주세묘 : " + travelReport.reportCode);
            navigate(`/travelReport/${travelReport.reportCode}`, { replace: true });
        } catch (err) {
            console.error("Error updating TravelReport: ", err);
            setError("게시글 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    const onClickCancelHandler = () => {
        if (window.confirm("수정을 취소하시겠습니까? 변경사항은 저장되지 않습니다.")) {
            navigate(-1);
        }
    };

    return (
        <>
            <div>
                <h1>~ 수정하기 ~</h1>
            </div>
            <div>
                {loading && <p>수정 중입니다... 잠시만 기다려주세요.</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <label>
                    제목:{" "}
                    <input
                        placeholder="제목"
                        name="reportTitle"
                        onChange={onChangeHandler}
                        value={form.reportTitle}
                    />
                </label>
                <br />
                <label>
                    내용:{" "}
                    <input
                        placeholder="설명"
                        name="reportContent"
                        onChange={onChangeHandler}
                        value={form.reportContent}
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

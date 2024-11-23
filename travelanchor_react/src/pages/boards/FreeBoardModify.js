import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { callUpdateFreeBoardAPI } from "../../apis/FreeBoardAPICalls";
import { useDispatch } from "react-redux";

export default function FreeBoardModify() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const freeboard = location.state || {}; 
    const [form, setForm] = useState({}); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 

    useEffect(() => {
        if (freeboard) {
            setForm({
                freeBoardTitle: freeboard.freeBoardTitle || "",
                freeBoardContent: freeboard.freeBoardContent || "",
            });
        }
    }, [freeboard]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickSaveHandler = async () => {
        if (!form.freeBoardTitle.trim() || !form.freeBoardContent.trim()) {
            alert("제목과 설명을 모두 입력해주세요.");
            return;
        }

        const updatedFreeBoard = {
            ...freeboard,
            freeBoardCode: freeboard.freeBoardCode,
            freeBoardCategoryCode: freeboard.freeBoardCategoryCode,
            freeBoardTitle: form.freeBoardTitle,
            freeBoardContent: form.freeBoardContent,
            freeBoardCreatedAt: freeboard.freeBoardCreatedAt,
            memberCode: freeboard.memberCode,
            freeBoardIsdeleted: 'N',
        };

        try {
            setLoading(true); 
            setError(null); 
            console.log("updatedFreeboard : ", updatedFreeBoard);

            await dispatch(callUpdateFreeBoardAPI(updatedFreeBoard));
            alert("게시글이 성공적으로 수정되었습니다.");
            navigate(`/freeboard`, { replace: true }); 
        } catch (err) {
            console.error("Error updating freeboard: ", err);
            setError("게시글 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setLoading(false); 
        }
    };

    const onClickCancelHandler = () => {
        if (window.confirm("수정을 취소하시겠습니까? 변경사항은 저장되지 않습니다.")) {
            navigate(`/freeboard/${freeboard.freeBoardCode}`, { replace: true });
        }
    };

    return (
        <>
            <div>
                <h1>FreeBoard Modify Page</h1>
            </div>
            <div>
                {loading && <p>수정 중입니다... 잠시만 기다려주세요.</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <label>
                    제목:{" "}
                    <input
                        placeholder="제목"
                        name="freeBoardTitle"
                        onChange={onChangeHandler}
                        value={form.freeBoardTitle}
                    />
                </label>
                <br />
                <label>
                    설명:{" "}
                    <input
                        placeholder="설명"
                        name="freeBoardContent"
                        onChange={onChangeHandler}
                        value={form.freeBoardContent}
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
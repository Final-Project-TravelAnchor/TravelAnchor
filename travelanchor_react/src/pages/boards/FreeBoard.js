import { callFreeBoardListAPI } from '../../apis/FreeBoardAPICalls';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { replace, useNavigate } from 'react-router-dom';
import FreeBoardList from './FreeBoardList';
import { isLogin } from '../../utils/tokenUtils';

export default function FreeBoard() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const freeboards = useSelector(state => state.freeboardReducer);
    const [ loading, setLoading ] = useState(true);

    // console.log(notices);

    useEffect(() => {
            setLoading(true);
            dispatch(callFreeBoardListAPI());
            setLoading(false);
        },
        []
    );

    // console.log("[Population] populations : ", populations);

    const onClickCreateFreeBoardHandler = () => {

        if(!isLogin()) {
			navigate("/login", { replace: false });
            return;
        }
        console.log("[FreeBoard] onClickCreateFreeBoardHandler");
        navigate("/freeboard/freeboardCreate");
    };

    if(loading) {
        return <div>Loading...</div>;
    } else {
    return (
        <>
            <div>
                <button onClick={onClickCreateFreeBoardHandler}>게시판 생성</button>
            </div>
            <div>
                {
                    freeboards.length > 0 && freeboards.map((freeboard) => (<FreeBoardList key={ freeboard.freeBoardCode } population={ freeboard } />)) 
                }
            </div>
        </>
    );
    }

}

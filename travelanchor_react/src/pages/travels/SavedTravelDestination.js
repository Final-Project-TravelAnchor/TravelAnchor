import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { callGetMemberAPI } from "../../apis/MemberAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
import { callGetSavedTravelDestinationsAPI } from '../../apis/FavoriteTravelDestinationCalls';

const SavedTravelDestination = () => {
    const { memberCode } = useParams();
    const dispatch = useDispatch();

    const savedDestinations = useSelector(state => state.savedDestinations);
    const isLoading = useSelector(state => state.isLoading);
    const error = useSelector(state => state.error);
    // const form = useSelector((state) => state.favoriteTravelDestination.form);

    useEffect(() => {
        if (memberCode) {
            dispatch(callGetSavedTravelDestinationsAPI({ memberCode }));
        }
    }, [dispatch, memberCode]);

    useEffect(() => {
            dispatch(callGetSavedTravelDestinationsAPI(memberCode));
    }, [dispatch]);

    // useEffect(() => {
	// 	let tokenSub = decodeJwt(window.localStorage.getItem("accessToken"));

	// 	dispatch(callGetMemberAPI({ memberId: tokenSub.sub }));
	// }, []);

    if (isLoading) return <p>저장된 위치를 불러오는 중입니다...</p>;
    if (error) return <p>오류 발생: {error}</p>;

    return (
        <div>
            <h1>내 저장된 위치</h1>
            {savedDestinations && savedDestinations.length > 0 ? (
                <div>
                    {savedDestinations.map((destination, index) => (
                        <div key={index}>
                            <h3>{destination.destinationName}</h3>
                            <img
                                src={destination.destinationPhoto || `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${destination.destinationDetails.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`} // 기본 이미지 URL
                                alt={destination.destinationName}
                                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} // 이미지 스타일 조정
                            />
                            <p>{destination.destinationAddress}</p>
                            <a href={destination.apiLink} target="_blank" rel="noopener noreferrer">
                                지도에서 보기
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <p>저장된 위치가 없습니다.</p>
            )}
        </div>
    );
};

export default SavedTravelDestination;
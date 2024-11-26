import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSavedTravelDestinationsAPI } from '../../apis/FavoriteTravelDestinationCalls';

const SavedTravelDestination = () => {
    // const { memberId } = useParams();
    const dispatch = useDispatch();

    const savedDestinations = useSelector(state => state.savedDestinations);
    const isLoading = useSelector(state => state.isLoading);
    const error = useSelector(state => state.error);

    // useEffect(() => {
    //     if (memberId) {
    //         dispatch(fetchSavedTravelDestinationsAPI({ memberId }));
    //     }
    // }, [dispatch, memberId]);

    useEffect(() => {
            dispatch(fetchSavedTravelDestinationsAPI({}));
    }, [dispatch]);

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
                                src={destination.destinationPhoto || "https://example.com/default-placeholder-image.jpg"} // 기본 이미지 URL
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

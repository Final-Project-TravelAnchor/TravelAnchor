import React, { useState, useEffect, useRef } from 'react';

const TravelMap = () => {
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [stopovers, setStopovers] = useState([]);
    const mapRef = useRef(null);
    const googleMap = useRef(null);
    const [departureLatLng, setDepartureLatLng] = useState(null);

    // 지도 초기화
    const initMap = () => {
        googleMap.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.5665, lng: 126.9780 },
        zoom: 10,
        });
    };

    // 경유지 추가
    const addStopover = () => {
        setStopovers([...stopovers, '']);
    };

    // 경유지 입력 핸들러
    const handleStopoverChange = (index, value) => {
        const updatedStopovers = [...stopovers];
        updatedStopovers[index] = value;
        setStopovers(updatedStopovers);
    };

    // 거리 계산
    const calculateDistance = () => {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address: departure }, (results, status) => {
        if (status === 'OK') {
            const startLatLng = results[0].geometry.location;
            setDepartureLatLng(startLatLng);

            new window.google.maps.Marker({
            position: startLatLng,
            map: googleMap.current,
            label: 'S',
            });

            processStopovers(geocoder, startLatLng).then(() => {
            geocoder.geocode({ address: arrival }, (arrivalResults, arrivalStatus) => {
                if (arrivalStatus === 'OK') {
                const endLatLng = arrivalResults[0].geometry.location;
                new window.google.maps.Marker({
                    position: endLatLng,
                    map: googleMap.current,
                    label: 'E',
                });
                drawLine(startLatLng, endLatLng);
                }
            });
            });
        }
        });
    };

    // 경유지 비동기 처리
    const processStopovers = async (geocoder, currentLatLng) => {
        for (const [index, stopover] of stopovers.entries()) {
        try {
            const stopoverLatLng = await new Promise((resolve, reject) => {
            geocoder.geocode({ address: stopover }, (results, status) => {
                if (status === 'OK') {
                const location = results[0].geometry.location;
                new window.google.maps.Marker({
                    position: location,
                    map: googleMap.current,
                    label: `${index + 1}`,
                });
                resolve(location);
                } else {
                reject(`Geocode failed: ${status}`);
                }
            });
            });
            drawLine(currentLatLng, stopoverLatLng);
            currentLatLng = stopoverLatLng;
        } catch (error) {
            console.error(error);
        }
        }
    };

    // 선 그리기
    const drawLine = (start, end) => {
        const polyline = new window.google.maps.Polyline({
        path: [start, end],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        });
        polyline.setMap(googleMap.current);
        googleMap.current.setCenter(start);
        googleMap.current.setZoom(10);
    };

    // Google Maps API 로드
    useEffect(() => {
        const loadGoogleMapsScript = () => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        window.initMap = initMap;
        document.head.appendChild(script);
        };
        loadGoogleMapsScript();
    }, []);

    return (
        <div>
        <h3>Google 지도 - 거리 계산</h3>
        <div style={{ marginBottom: '10px' }}>
            <input
            type="text"
            placeholder="출발지 입력"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            />
            <input
            type="text"
            placeholder="도착지 입력"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            />
            <button onClick={addStopover}>경유지 추가</button>
            <button onClick={calculateDistance}>거리 계산</button>
        </div>
        <div>
            {stopovers.map((stopover, index) => (
            <input
                key={index}
                type="text"
                placeholder={`경유지 ${index + 1} 입력`}
                value={stopover}
                onChange={(e) => handleStopoverChange(index, e.target.value)}
            />
            ))}
        </div>
        <div ref={mapRef} style={{ width: '100%', height: '600px', marginTop: '10px' }} />
        </div>
    );
};

export default TravelMap;

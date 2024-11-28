require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

// CORS 설정
app.use(
	cors({
		origin: "http://localhost:3000", // 프론트엔드 도메인
		methods: ["GET", "POST", "OPTIONS"],
		credentials: true,
	})
);

// Google Places API 호출 엔드포인트
app.get("/api/places", async (req, res) => {
	const { type, city } = req.query; // 프론트엔드에서 전달된 type, city
	const API_KEY = process.env.REACT_APP_GOOGLE_KEY; // .env 파일에 저장된 API 키

	if (!API_KEY) {
		return res.status(400).json({ error: "API Key is missing." });
	}

	try {
		const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${type}%20in%20${city}&language=ko&key=${API_KEY}`;
		console.log("Requesting Google API:", url);

		// 서버에서 Google API로 요청
		const response = await axios.get(url);

		// 응답 데이터를 클라이언트로 전달
		res.json(response.data);
	} catch (error) {
		if (error.response) {
			console.error("Google API error:", error.response.data);
			res.status(error.response.status).json({
				error: error.response.data,
			});
		} else {
			console.error("Google API error:", error.message);
			res.status(500).json({ error: error.message });
		}
	}
});

// 식당 details 호출
app.get("/api/places/details", async (req, res) => {
	const { place_id } = req.query; // place_id를 쿼리에서 가져옴
	const API_KEY = process.env.REACT_APP_GOOGLE_KEY;

	if (!API_KEY) {
		return res.status(400).json({ error: "API Key is missing." });
	}

	try {
		// URL 구성 시 place_id를 사용
		const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&language=ko&key=${API_KEY}`;
		console.log("Requesting Google API (Details):", url);

		const response = await axios.get(url);

		res.json(response.data.result);
	} catch (error) {
		if (error.response) {
			console.error("Google API error:", error.response.data);
			res.status(error.response.status).json({
				error: error.response.data,
			});
		} else {
			console.error("Google API error:", error.message);
			res.status(500).json({ error: error.message });
		}
	}
});

// 여행지 추천 google API 호출
app.get("/api/TravelDestinations", async (req, res) => {
	const { cities } = req.query;

	if (!cities) {
		return res.status(400).json({ error: "Cities parameter is required." });
	}

	const parsedCities = JSON.parse(cities);
	const API_KEY = process.env.REACT_APP_GOOGLE_KEY;

	if (!API_KEY) {
		return res.status(400).json({ error: "API Key is missing." });
	}

	try {
		const requests = parsedCities.map((city) => {
			const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(city)}&language=ko&key=${API_KEY}`;
			return axios.get(url);
		});

		const responses = await Promise.all(requests);

		const places = responses
			.map((response) => response.data.results)
			.flat();

		res.json(places);
	} catch (error) {
		if (error.response) {
			console.error("Google API error:", error.response.data);
			res.status(error.response.status).json({
				error: error.response.data,
			});
		} else {
			console.error("Google API error:", error.message);
			res.status(500).json({ error: error.message });
		}
	}
});

// 여행지 details 호출
app.get("/api/TravelDestinations/details", async (req, res) => {
    const { place_id, culturalLandmarks } = req.query;
    const API_KEY = process.env.REACT_APP_GOOGLE_KEY;

    if (!API_KEY) {
        return res.status(400).json({ error: "API Key is missing." });
    }

    if (!place_id) {
        return res.status(400).json({ error: "Place ID is missing." });
    }

    if (!culturalLandmarks) {
        return res.status(400).json({ error: "Cultural landmarks parameter is required." });
    }

    const parsedCulturalLandmarks = JSON.parse(culturalLandmarks);

    try {
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&language=ko&key=${API_KEY}`;
        console.log("Requesting Google API (Details):", detailsUrl);
        const detailsResponse = await axios.get(detailsUrl);
        const destinationDetails = detailsResponse.data.result;

        if (!destinationDetails || !destinationDetails.geometry?.location) {
            throw new Error("Location details are missing for the destination.");
        }

        // 주변 랜드마크 조회
        const landmarkRequests = parsedCulturalLandmarks.map((culturalLandmark) => {
            const landmarkUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(culturalLandmark)}&location=${destinationDetails.geometry.location.lat},${destinationDetails.geometry.location.lng}&radius=1500&language=ko&key=${API_KEY}`;
            console.log("Requesting Google API (Landmark):", landmarkUrl);
            return axios.get(landmarkUrl);
        });

        const landmarkResponses = await Promise.all(landmarkRequests);
        const culturalLandmark = landmarkResponses
            .map((response) => response.data.results)
            .flat();

        res.json({
            destinationDetails,
            culturalLandmark,
        });

    } catch (error) {
        if (error.response) {
            console.error("Google API error:", error.response.data);
            res.status(error.response.status).json({
                error: error.response.data,
            });
        } else {
            console.error("Server error:", error.message);
            res.status(500).json({ error: error.message });
        }
    }
});

// 랜드마크 디테일
app.get("/api/landmark/details", async (req, res) => {
	const { landmark_id } = req.query; // place_id를 쿼리에서 가져옴
	const API_KEY = process.env.REACT_APP_GOOGLE_KEY;

	if (!API_KEY) {
		return res.status(400).json({ error: "API Key is missing." });
	}

	try {
		// URL 구성 시 landmark_id 사용
		const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${landmark_id}&language=ko&key=${API_KEY}`;
		console.log("Requesting Google API (Details):", url);

		const response = await axios.get(url);

		res.json(response.data.result);
	} catch (error) {
		if (error.response) {
			console.error("Google API error:", error.response.data);
			res.status(error.response.status).json({
				error: error.response.data,
			});
		} else {
			console.error("Google API error:", error.message);
			res.status(500).json({ error: error.message });
		}
	}
});

// 서버 시작
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

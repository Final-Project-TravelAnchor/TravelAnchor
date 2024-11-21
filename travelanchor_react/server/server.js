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

// details 호출
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

// 서버 시작
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

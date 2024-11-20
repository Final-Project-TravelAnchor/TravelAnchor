// src/apis/ShareKakao.js

// 카카오 SDK를 동적으로 로드
const script = document.createElement('script');
script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.3/kakao.min.js";
script.integrity = "sha384-kLbo2SvoNtOFiniJ1EQ9o2iDA8i3xp+O6Cns+L5cd4RsOJfl+43z5pvieT2ayq3C";
script.crossOrigin = "anonymous";

script.onload = () => {
  // SDK 초기화
  window.Kakao.init('e64e2512bcf037328a16cd888b5e48bd'); // 실제 JavaScript 키 입력
    console.log('Kakao SDK initialized:', window.Kakao.isInitialized());

    // 공유 기능 설정
    setupKakaoShareButton();
    window.shareMessage = shareMessage; // 전역에 shareMessage 함수 할당
    };

    document.body.appendChild(script);

    // 카카오 공유 버튼 설정
    function setupKakaoShareButton() {
    const shareButton = document.createElement('a');
    shareButton.id = 'kakaotalk-sharing-btn';
    shareButton.href = 'javascript:window.shareMessage()'; // 전역 함수 호출

    const buttonImage = document.createElement('img');
    buttonImage.src = 'https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png';
    buttonImage.alt = '카카오톡 공유 보내기 버튼';

    shareButton.appendChild(buttonImage);
    document.body.appendChild(shareButton);
    }

    // 카카오 공유 메시지 함수
    function shareMessage() {
    window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
        title: '딸기 치즈 케익',
        description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
        imageUrl: 'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
        link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
        },
        },
        social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845,
        },
        buttons: [
        {
            title: '웹으로 보기',
            link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
            },
        },
        {
            title: '앱으로 보기',
            link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
            },
        },
        ],
    });
}

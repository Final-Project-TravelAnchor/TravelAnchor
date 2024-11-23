import jwtDecode from "jwt-decode";

export function decodeJwt(token) {

    if(token === null) return null;

    return jwtDecode(token);
};

export function findAuth() {
    const decodeToken = decodeJwt(window.localStorage.getItem("accessToken"));
    console.log("[auth] decodeToken : ", decodeToken);

    if(decodeToken === undefined || decodeToken === null || decodeToken.exp * 1000 < Date.now()) {
        console.log("로그인 필요");
        return null;
    }

    return decodeToken.auth[0];
}

export function isLogin() {
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log("[isLogin] token : ", token);
        
        if(token === undefined || token === null) {
            alert("로그인이 필요한 서비스입니다.");
            return false;
            // result = false;
            // navigate(`/login`);
        }

        if(token.exp * 1000 < Date.now()) {
            alert("세션이 만료됐습니다. 로그인 창으로 이동합니다.");
            return false;
            // result = false;
        }

        return true;
}

export function findSub() {
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    console.log("[findSub] token : ", token);

    if(token === undefined || token === null) {
        return false;
        // result = false;
        // navigate(`/login`);
    }

    if(token.exp * 1000 < Date.now()) {
        return false;
        // result = false;
    }

    return token.sub;
}

import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import styles from './GoogleLoginComponent.module.css';

function GoogleLoginComponent() {
    const onSuccess = (credentialResponse) => {
        console.log('Login Success:', credentialResponse);
        // 로그인 성공 시 처리할 로직
    };

    const onError = () => {
        console.log('Login Failed');
        // 로그인 실패 시 처리할 로직
    };

    return (
        <div className={styles.googleButtonWrapper}>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
            />
        </div>
    );
}

export default GoogleLoginComponent;
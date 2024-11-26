import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from './App';
import store from './Store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

root.render(
    <GoogleOAuthProvider clientId={clientId}>
    <Provider store={ store }>
        <App />
    </Provider>
    </GoogleOAuthProvider>
);

// index
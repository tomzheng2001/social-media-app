import {FacebookProvider, LoginButton} from "react-facebook"
const FacebookAuth = () => {
    const handleResponse = (data) => {
        console.log(data);
    }

    const handleError = (error) => {
        console.log(error);
    }
    return (
        <FacebookProvider appId="4505383672860875">
            <LoginButton
                scope="email"
                onCompleted={handleResponse}
                onError={handleError}
            >
                <span>Login via Facebook</span>
            </LoginButton>
        </FacebookProvider>
    );
}

export default FacebookAuth;
import { useEffect, useState } from "react";
import "../sass/main.scss";

const AuthorizeTwitter = () => {
    const [url, setUrl] = useState('');

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('jwt')).user;
        fetch('/get-token-request', {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json()).then((responseJson) => setUrl(responseJson.url));
    }, []);

    const handleClick = () => {
        const openedWindow = window.open(url);
    }

    return (
        <div className="authorize_bg">
            <button className="authorize" onClick={handleClick}>
                Authorize Twitter
            </button>
        </div>
        
    )
}

export default AuthorizeTwitter;
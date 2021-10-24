import { useEffect, useState } from "react";

const AuthorizeTwitter = () => {
    const [url, setUrl] = useState('');

    useEffect(() => {
        fetch('/get-token-request').then((response) => response.json()).then((responseJson) => setUrl(responseJson.url));
    }, []);

    const handleClick = () => {
        window.location = url;
    }

    return (
        <button onClick={handleClick}>
            Authorize Twitter
        </button>
    )
}

export default AuthorizeTwitter;
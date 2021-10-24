import { useEffect, useState } from "react";

const AuthorizeTwitter = () => {
    const [url, setUrl] = useState('');

    useEffect(() => {
        fetch('/get-token-request').then((response) => response.json()).then((responseJson) => setUrl(responseJson.url));
    }, []);

    const handleClick = () => {
        const openedWindow = window.open(url);
        setInterval(() => {
            if (!openedWindow.location.origin.includes('twitter'))
                openedWindow.close();
        }, 500)
    }

    return (
        <button onClick={handleClick}>
            Authorize Twitter
        </button>
    )
}

export default AuthorizeTwitter;
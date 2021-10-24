import { useEffect, useState } from "react";
import canvas from "./canvas.png"
import canvas1 from "./canvas1.png"
import canvas2 from "./canvas2.png"
import canvas3 from "./canvas3.png"

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const getColoredText = (val) => {
    let col = null;

    if (val > 0) {
        let red = 0
        let green = Math.round(255 * (val / 5))
        let blue = 0
        col = rgbToHex(red, green, blue)
    }
    else if (val === 0) {
        col = 'black'
    }
    else {
        let red = Math.round(255 * (-val / 5))
        let green = 0
        let blue = 0
        col = rgbToHex(red, green, blue)
    }
    let key = Math.random();
    return <p style={{ color: col }} key={key}>{val}</p>
}

function useFetch(url) {
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then(x => x.json()).then((res) => {
                console.log(res);
                setResponse(res)
                setLoading(false)
            })
            .catch(() => {
                setHasError(true)
                setLoading(false)
            })
    }, [url]);
    return [response, loading, hasError];
}

const VisualizeSentiment = () => {
    const [selfSentimentResponse, selfSentimentLoading, selfSentimentError] = useFetch('/self-sentiment');
    const [followingSentimentResponse, followingSentimentLoading, followingSentimentError] = useFetch('/following-sentiment');
    const [globalSentimentResponse, globalSentimentLoading, globalSentimentError] = useFetch('/global-sentiment');
    console.log(selfSentimentLoading);
    const SentimentBox = (props) => {
        let val = 0
        if (props.response) {
            val = getColoredText(props.response.sentimentSum / props.response.totalTweets)
        }
        return (
            <div style={{ width: "200px", height: "200px", flex: 1, margin: "10px", borderStyle: "solid", borderColor: "black", borderWidth: "2px" }}>
                <p style={{ textAlign: "center" }}>{props.name}</p>
                <p style={{ fontSize: "20px", textAlign: "center", position: "relative", margin: "0px", top: "50%" }}>{props.loading ? 'Loading' : props.error ? 'Error' : val}</p>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: "flex" }}>
                <SentimentBox response={selfSentimentResponse} loading={selfSentimentLoading} error={selfSentimentError} name="Self Sentiment"></SentimentBox>
                <SentimentBox response={followingSentimentResponse} loading={followingSentimentLoading} error={followingSentimentError} name="Following Sentiment"></SentimentBox>
                <SentimentBox response={globalSentimentResponse} loading={globalSentimentLoading} error={globalSentimentError} name="Global Sentiment"></SentimentBox>
            </div>
            <div>
                
                    <img src={canvas} width={600} height={300}></img>
                
                <img src={canvas1} width={600} height={300}></img>
                <img src={canvas2} width={600} height={300}></img>
            </div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <img src={canvas3} width={400} height={400}></img>
            </div>
        </div>
    )
}

export default VisualizeSentiment;
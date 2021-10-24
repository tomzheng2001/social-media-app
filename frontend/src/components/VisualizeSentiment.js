import { useEffect, useState } from "react";

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
        let green = 255 * (val / 5)
        let blue = 0
        col = rgbToHex(red, green, blue)
    }
    else if (val === 0) {
        col = 'black'
    }
    else {
        let red = 255 * (-val / 5)
        let green = 0
        let blue = 0
        col = rgbToHex(red, green, blue)
    }
    console.log(col);
    return <p style={{color: col}}>{val}</p>
}

const VisualizeSentiment = () => {
    const [recentSentiments, setRecentSentiments] = useState({});

    useEffect(() => {
        fetch('/self-sentiment').then(resp => resp.json()).then((v) => {
            setRecentSentiments({
                ...recentSentiments,
                selfSentiment: v
            })
        })
        fetch('/following-sentiment').then(resp => resp.json()).then((v) => {
            setRecentSentiments({
                ...recentSentiments,
                followingSentiment: v
            })
        })
        fetch('/global-sentiment').then(resp => resp.json()).then((v) => {
            setRecentSentiments({
                ...recentSentiments,
                globalSentiment: v
            })
        })
    }, []);

    const sentiments = Object.entries(recentSentiments).map((entry) => getColoredText(entry.value.sentimentSum / entry.value.totalTweets));
    return (
        <div>
            {sentiments}
        </div>
    )
}

export default VisualizeSentiment;
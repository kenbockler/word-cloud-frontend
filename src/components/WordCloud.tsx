import React from 'react';
import WordCloud, { MinMaxPair } from 'react-wordcloud';

interface WordCloudProps {
    wordCounts: { [word: string]: number };
}

const WordCloudComponent: React.FC<WordCloudProps> = ({ wordCounts }) => {
    const words = Object.entries(wordCounts).map(([text, value]) => ({
        text,
        value,
    }));

    const options = {
        rotations: 2,
        rotationAngles: [0, 90] as MinMaxPair,
        fontSizes: [12, 48] as MinMaxPair,
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <WordCloud words={words} options={options} />
        </div>
    );
};

export default WordCloudComponent;

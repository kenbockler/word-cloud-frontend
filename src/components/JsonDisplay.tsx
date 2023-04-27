import React, { useState } from 'react';
import './JsonDisplay.css';

interface JsonDisplayProps {
    data: object;
    title?: string;
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ data, title }) => {
    const [copyStatus, setCopyStatus] = useState('Copy');

    const handleCopyClick = () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        setCopyStatus('Copied!');
        setTimeout(() => {
            setCopyStatus('Copy');
        }, 3000);
    };

    return (
        <div className="json-display-container">
            {title && <h3>{title}</h3>}
            <pre className="json-display">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
            <button className="json-copy-button" onClick={handleCopyClick}>
                {copyStatus}
            </button>
        </div>
    );
};

export default JsonDisplay;

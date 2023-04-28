import React, { useState } from 'react';
import './TextInputUpload.css';

interface TextInputUploadProps {
    onTextSubmit: (text: string) => void;
}

const TextInputUpload: React.FC<TextInputUploadProps> = ({ onTextSubmit }) => {
    const [text, setText] = useState('');

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = () => {
        onTextSubmit(text);
    };

    return (
        <div>
            <h2>Upload Text</h2>
            <textarea
                className="textInput"
                placeholder="Paste your text here"
                value={text}
                onChange={handleTextChange}
            />
            <button
                className={`uploadButton ${!text ? 'disabledButton' : ''}`}
                onClick={handleSubmit}
                disabled={!text}
            >
                Upload
            </button>
        </div>
    );
};

export default TextInputUpload;

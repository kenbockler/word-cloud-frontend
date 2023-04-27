// IdInput.tsx
import React, { useState } from 'react';
import './IdInput.css';

interface IdInputProps {
    onIdSubmit: (id: string) => void;
}

const IdInput: React.FC<IdInputProps> = ({ onIdSubmit }) => {
    const [inputId, setInputId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputId(event.target.value);
    };

    const isValidId = (id: string): boolean => {
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return uuidRegex.test(id);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isValidId(inputId)) {
            setErrorMessage('');
            onIdSubmit(inputId);
        } else {
            setErrorMessage('Invalid ID format. Please enter a valid ID.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    return (
        <form className="id-input-container" onSubmit={handleSubmit}>
            <label className="id-input-label" htmlFor="id-input">Enter ID:</label>
            <input
                className="id-input-field"
                id="id-input"
                type="text"
                value={inputId}
                onChange={handleChange}
                onClick={(e) => e.currentTarget.select()}
                style={{ width: '300px' }}
            />
            <button className="id-input-submit" type="submit">
                Load
            </button>
            <br />
            {errorMessage && (
                <div className="error-message">{errorMessage}</div>
            )}
        </form>
    );
};

export default IdInput;

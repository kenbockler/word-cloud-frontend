import React, { useEffect, useState } from 'react';
import './fileupload.css';

interface FileUploadProps {
    id: string | null;
    setId: (id: string | null) => void;
    uploadStatus: string | null;
    setUploadStatus: (status: string | null) => void;
    setWordCounts: (wordCounts: { [word: string]: number } | null) => void;

}

const FileUpload: React.FC<FileUploadProps> = ({ id, setId, uploadStatus, setUploadStatus, setWordCounts }) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [progress, setProgress] = useState(-1);
    const [copyStatus, setCopyStatus] = useState('Copy');
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files.item(0);

            if (selectedFile) {
                if (selectedFile.size > 100 * 1024 * 1024) {
                    alert('File size must be less than 100 MB');
                } else {
                    setFile(selectedFile);
                    setFileName(selectedFile.name);
                    setProgress(-1); // Reset progress when a new file is selected
                    setUploadStatus(null); // Reset upload status when a new file is selected
                    setId(null); // Reset ID when a new file is selected
                    setWordCounts(null); // Reset word counts when a new file is selected
                }
            } else {
                setFileName(null);
            }
        }
    };

    const fetchStatusUpdates = async () => {
        if (id && (!uploadStatus || (uploadStatus !== 'COMPLETED' && uploadStatus !== 'FAILED'))) {
            try {
                const response = await fetch(`http://localhost:8080/api/textfiles/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setUploadStatus(data.status);
                }
            } catch (error) {
                console.error('Error fetching status updates:', error);
            }
        }
    };

    useEffect(() => {
        const intervalId = setInterval(fetchStatusUpdates, 1000);

        return () => {
            clearInterval(intervalId);
        };
    },  [id, uploadStatus]);

    const handleCopyClick = () => {
        if (id) {
            navigator.clipboard.writeText(id);
            setCopyStatus("Copied!");
            setTimeout(() => {
                setCopyStatus("Copy");
            }, 3000);
        }
    };

    const handleSubmit = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://localhost:8080/api/textfiles', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    setId(data.id);
                    setUploadStatus(data.status);
                    setProgress(33); // Set progress to 33% when status is PENDING
                } else {
                    setUploadStatus('Error uploading the file');
                }
            } catch (error) {
                setUploadStatus('Error uploading the file');
            }
        }
    };

    const getProgressPercentage = () => {
        switch (uploadStatus) {
            case 'PENDING':
                return 33;
            case 'PROCESSING':
                return 66;
            case 'COMPLETED':
                return 100;
            case 'FAILED':
                return 100;
            default:
                return progress;
        }
    };

    const progressBarColor = uploadStatus === 'FAILED' ? 'red' : '#4caf50';

    const getStatusClassName = () => {
        switch (uploadStatus) {
            case 'COMPLETED':
                return 'status-completed';
            case 'PENDING':
                return 'status-pending';
            case 'PROCESSING':
                return 'status-processing';
            case 'FAILED':
                return 'status-failed';
            default:
                return '';
        }
    };

    return (
        <div>
            <h2>Upload Text File</h2>
            <div className="buttonsContainer">
                <label className="fileInputLabel" htmlFor="fileInput">
                    Choose a file
                </label>
                <input
                    id="fileInput"
                    className="fileInput"
                    type="file"
                    onChange={handleFileChange}
                />
                {fileName && <span className="fileName">{fileName}</span>}
                <button
                    className={`uploadButton ${!file ? 'disabledButton' : ''}`}
                    onClick={handleSubmit}
                    disabled={!file}
                >
                    Upload
                </button>
            </div>


            {progress >= 0 && (
                <>
                    <div className="progressContainer">
                        <div className="progressBarContainer">
                            <div className="progressBar">
                                {uploadStatus && (
                                    <p className={`status-text ${getStatusClassName()}`}>Status: {uploadStatus}</p>
                                )}
                                <div
                                    className="progressBarFill"
                                    style={{
                                        width: `${getProgressPercentage()}%`,
                                        backgroundColor: progressBarColor,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}

            { id && uploadStatus === 'COMPLETED' && (
                <div className="id-container">
                    <p>ID:</p>
                    <div
                        className="id-box"
                        onClick={handleCopyClick}
                        title="Click to copy"
                    >
                        <span>{id}</span>
                        <span>
                {copyStatus === "Copied!" ? "🐝" : "📋"}
            </span>
                    </div>
                </div>
            )}
        </div>
    );




}

export default FileUpload;

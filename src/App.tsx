import { useEffect, useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import JsonDisplay from './components/JsonDisplay';
import WordCloudComponent from './components/WordCloud';
import IdInput from './components/IdInput';

function App() {
    const [id, setId] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [wordCounts, setWordCounts] = useState<{ [word: string]: number } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleIdSubmit = async (submittedId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/textfiles/${submittedId}`);

            if (response.ok) {
                const data = await response.json();
                setId(submittedId);
                setUploadStatus('COMPLETED');
                setWordCounts(data.wordCounts);
            } else if (response.status === 404) {
                setId(null);
                setUploadStatus(null);
                setWordCounts(null);
                alert('No record found with the provided ID.');
            } else {
                throw new Error('An error occurred while fetching the data.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while fetching the data.');
        } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
        const fetchWordCounts = async () => {
            if (id && uploadStatus === 'COMPLETED') {
                try {
                    const response = await fetch(`http://localhost:8080/api/textfiles/${id}/wordcounts`);
                    if (response.ok) {
                        const data = await response.json();
                        setWordCounts(data.wordCounts);
                    }
                } catch (error) {
                    console.error('Error fetching word counts:', error);
                }
            }
        };

        fetchWordCounts();
    }, [id, uploadStatus]);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Word Cloud App</h1>
                <div className="fileUploadContainer">
                    <FileUpload
                        id={id}
                        setId={setId}
                        uploadStatus={uploadStatus}
                        setUploadStatus={setUploadStatus}
                        setWordCounts={setWordCounts}
                    />
                </div>
                <div className="idInputContainer">
                    <IdInput
                        key={id || 'initial'}
                        onIdSubmit={handleIdSubmit}
                    />
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : wordCounts ? (
                    <>
                        <WordCloudComponent wordCounts={wordCounts} />
                        <JsonDisplay data={wordCounts} title="Word Counts" />
                    </>
                ) : null}
            </header>
        </div>
    );
}

export default App;
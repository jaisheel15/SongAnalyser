import React, { useState, useEffect, useRef } from 'react';


// ScoreCard Component
const ScoreCard = ({ title, value, unit, feedback, feedbackColor }) => (
    <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
        <p className="text-lg font-semibold text-gray-300">{title}</p>
        <p className="text-4xl font-bold text-white mt-2">
            {value}
            <span className="text-2xl text-gray-400">{unit}</span>
        </p>
        <p className={`text-sm mt-1 ${feedbackColor}`}>{feedback}</p>
    </div>
);

// PitchCurveChart Component
const PitchCurveChart = ({ data }) => {
    // This component is ready to receive real data to draw the chart.
    // For now, it shows a placeholder message if no data is provided.
    return (
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 h-80 flex items-center justify-center">
            {data ? (
                // In a real app, you would use a library like D3 or Recharts to render the SVG path from the data
                <p className="text-gray-500">Pitch curve rendering would happen here.</p>
            ) : (
                <p className="text-gray-500">Awaiting analysis data for pitch curve...</p>
            )}
        </div>
    );
};


// Results Component
const Results = ({ analysisData }) => {
    if (!analysisData) return null;

    const getFeedback = (score) => {
        if (score === null) return { text: 'Awaiting score...', color: 'text-gray-500' };
        if (score >= 90) return { text: 'Excellent Match', color: 'text-green-400' };
        if (score >= 75) return { text: 'Good Match', color: 'text-yellow-400' };
        return { text: 'Needs Improvement', color: 'text-red-400' };
    };

    const pitchFeedback = getFeedback(analysisData.pitch);
    const similarityFeedback = getFeedback(analysisData.similarity);

    return (
        <section className="py-16 px-6 bg-gray-900/50">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                     <h3 className="text-3xl font-bold text-white">Analysis Results</h3>
                     <p className="text-gray-400">Here's the breakdown of your performance.</p>
                </div>
               
                <div className="p-8 rounded-2xl shadow-2xl" style={{ background: 'rgba(31, 41, 55, 0.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-10">
                        <ScoreCard title="Pitch Score" value={analysisData.pitch ?? '--'} unit="/100" feedback={pitchFeedback.text} feedbackColor={pitchFeedback.color} />
                        <ScoreCard title="Similarity Score" value={analysisData.similarity ?? '--'} unit="%" feedback={similarityFeedback.text} feedbackColor={similarityFeedback.color} />
                        <ScoreCard title="DTW Score" value={analysisData.dtw?.toFixed(2) ?? '--'} unit="" feedback="Lower is better" feedbackColor="text-gray-400" />
                    </div>

                    <div>
                        <h4 className="text-xl font-semibold text-white mb-4 text-center">Comparative Pitch Curve</h4>
                        <PitchCurveChart data={analysisData.pitchCurve} />
                    </div>
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => (
    <footer className="bg-gray-900/50 border-t border-gray-800 mt-10">
        <div className="container mx-auto px-6 py-8 text-center text-gray-500 text-sm">
            &copy; 2024 VocalTune. All rights reserved.
        </div>
    </footer>
);


// --- Backend API Function Placeholders ---
// Replace the bodies of these functions with your actual backend API calls.

/**
 * Uploads files to your backend and starts the analysis process.
 * @param {File} originalFile - The original audio file.
 * @param {File} userFile - The user's sung audio file.
 * @returns {Promise<string>} A promise that resolves with a job ID or necessary identifier from your backend.
 */
const uploadFilesForAnalysis = async (originalFile, userFile) => {
    // ========================================================================
    // TODO: Implement your file upload logic here.
    // Example using FormData and fetch:
    //
    // const formData = new FormData();
    // formData.append('original', originalFile);
    // formData.append('user', userFile);
    //
    // const response = await fetch('YOUR_BACKEND_UPLOAD_ENDPOINT', {
    //     method: 'POST',
    //     body: formData,
    // });
    // const data = await response.json();
    // return data.jobId; // Or whatever your backend returns
    // ========================================================================
    
    console.log("Pretending to upload files...");
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    return "placeholder-job-id";
};

/**
 * Fetches the analysis results from your backend using a job ID.
 * @param {string} jobId - The ID of the analysis job to check.
 * @returns {Promise<object>} A promise that resolves with the analysis data.
 */
const fetchAnalysisResults = async (jobId) => {
    // ========================================================================
    // TODO: Implement your results fetching logic here.
    // You might need to poll this endpoint until the analysis is complete.
    //
    // const response = await fetch(`YOUR_BACKEND_RESULTS_ENDPOINT?jobId=${jobId}`);
    // const data = await response.json();
    // if (data.status === 'completed') {
    //     return data.results;
    // } else {
    //     // Handle 'processing' or 'failed' states
    // }
    // ========================================================================

    console.log(`Pretending to fetch results for job: ${jobId}`);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate analysis time

    // This function should return the data structure your frontend expects.
    // It is now empty and ready for your backend's response.
    return {
        pitch: null,
        similarity: null,
        dtw: null,
        pitchCurve: null 
    };
};


// Main App Component
export default function App() {
    const [originalFile, setOriginalFile] = useState(null);
    const [userFile, setUserFile] = useState(null);
    const [analysisData, setAnalysisData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const resultsRef = useRef(null);

    const handleAnalyze = async () => {
        if (!originalFile || !userFile) {
            alert('Please select both an original and a user audio file.');
            return;
        }
        setIsLoading(true);
        setAnalysisData(null); // Clear previous results

        try {
            // These functions are now empty and ready for your backend logic.
            const jobId = await uploadFilesForAnalysis(originalFile, userFile);
            const results = await fetchAnalysisResults(jobId);
            setAnalysisData(results);
        } catch (error) {
            console.error("Analysis process failed:", error);
            alert("An error occurred during analysis. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (analysisData && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [analysisData]);

    return (
        <div className="bg-gray-900 text-gray-300 font-sans">
            <Header />
            <main className="pt-24">
                <section className="text-center py-16 px-6">
                    <div className="container mx-auto">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                            How Well Did You <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Match the Pitch?</span>
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                            Upload the original song and your vocal performance to get a detailed similarity analysis.
                        </p>
                        
                        <div className="mt-10 max-w-4xl mx-auto p-6 rounded-2xl shadow-lg" style={{ background: 'rgba(31, 41, 55, 0.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <div className="grid md:grid-cols-2 gap-8 mb-6">
                                <FileUploader 
                                    title="1. Original Audio" 
                                    iconName="music" 
                                    onFileSelect={(e) => setOriginalFile(e.target.files[0])}
                                    selectedFileName={originalFile?.name}
                                />
                                <FileUploader 
                                    title="2. Your Vocal Track" 
                                    iconName="mic" 
                                    onFileSelect={(e) => setUserFile(e.target.files[0])}
                                    selectedFileName={userFile?.name}
                                />
                            </div>

                            <button 
                                onClick={handleAnalyze} 
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2 text-lg"
                                disabled={!originalFile || !userFile || isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Icon name="loader" className="w-6 h-6" isSpinning={true} />
                                        <span>Analyzing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Icon name="bar-chart-big" className="w-6 h-6" />
                                        <span>Analyze Similarities</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </section>
                
                <div ref={resultsRef}>
                    {analysisData && <Results analysisData={analysisData} />}
                </div>
            </main>
            <Footer />
        </div>
    );
}

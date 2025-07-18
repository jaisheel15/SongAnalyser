import { useNavigate } from "react-router-dom"; 
import { useState} from 'react';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import Icon from './components/Icon';
import axios from 'axios';

function App() {
  const navigate = useNavigate();
  const handleClick = ()=>{
      const formData = new FormData();
  if(originalFile && userFile){
    formData.append('reference', originalFile);
    formData.append('user', userFile);


    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data);
      // Navigate to results page with scores
      navigate('/analysis', { state: { scores: response.data } });
    })
    .catch(error => {
      console.error('Error uploading files:', error);
    });
  }
    else {
        alert('Please upload both files before analyzing.');
    }
}


 const [originalFile, setOriginalFile] = useState<File | null>(null);
 const [userFile, setUserFile] = useState<File | null>(null);

  return (
     <div className="bg-gray-900 text-gray-300 font-sans" style={{ minHeight: '100vh' }}>
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
                                    onFileSelect={(e) => setOriginalFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                                    selectedFileName={originalFile?.name || ''}
                                />
                                <FileUploader 
                                    title="2. Your Vocal Track" 
                                    iconName="mic" 
                                    onFileSelect={(e) => setUserFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                                    selectedFileName={userFile?.name || ''}
                                />
                            </div>

                            <button 
                                onClick={handleClick} 
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2 text-lg"
                            >
                                        <Icon name="bar-chart-big" className="w-6 h-6" />
                                        <span>Analyze Similarities</span>
                                    
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
  );
}

export default App;

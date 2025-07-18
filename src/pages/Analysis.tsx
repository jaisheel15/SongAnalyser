import { useLocation } from 'react-router-dom';
import ScoreCard from '../components/ScoreCard';
import { useState } from 'react';
import PitchCurveChart from '../components/PitchCurveChart';

function Analysis() {
  const location = useLocation();
  const scores = location.state?.scores;
  const pitch_score = scores?.pitch_score || 0;
  const similarity_score = scores?.similarity_score || 0;

  const reference_pitch = scores?.reference_pitch || [];
  const user_pitch = scores?.user_pitch || [];
  const times = scores?.times || [];  // fixed from time -> times

  const [analysisData] = useState({
    pitch: pitch_score,
    similarity: similarity_score,
  });

  const data = times.map((t: any, i: any) => ({
    time: t,
    reference: reference_pitch[i],
    user: user_pitch[i],
    difference: Math.abs(reference_pitch[i] - user_pitch[i])
  }));

  return (
    <div className='bg-gray-900 text-gray-300 font-sans' style={{ minHeight: '100vh' }}>
      <section className="py-16 px-6 bg-gray-900/50 ">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white">Analysis Results</h3>
            <p className="text-gray-400">Here's the breakdown of your performance.</p>
          </div>

          <div className="p-8 rounded-2xl shadow-2xl" style={{ background: 'rgba(31, 41, 55, 0.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center mb-10">
              <ScoreCard title="Pitch Score" value={analysisData.pitch ?? '--'} unit="/100"/>
              <ScoreCard title="Similarity Score" value={analysisData.similarity ?? '--'} unit="%" />
            </div>

            <div>
              <h4 className="text-xl font-semibold text-white mb-4 text-center">Comparative Pitch Curve</h4>
              {data.length > 0 ? (
                <PitchCurveChart data={data} />
              ) : (
                <p className="text-gray-500 text-center">No pitch data available to display.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Analysis;

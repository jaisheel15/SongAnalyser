// ScoreCard Component
const ScoreCard = ({ title, value, unit } : { title: string; value: number; unit: string; }) => (
    <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
        <p className="text-lg font-semibold text-gray-300">{title}</p>
        <p className="text-4xl font-bold text-white mt-2">
            {value}
            <span className="text-2xl text-gray-400">{unit}</span>
        </p>
    </div>
);

export default ScoreCard
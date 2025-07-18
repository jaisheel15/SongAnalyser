import Icon from './Icon';


type IconName = 'loader' | 'mic-vocal' | 'music' | 'mic' | 'bar-chart-big';

// FileUploader Component
const FileUploader = ({ title, iconName, onFileSelect, selectedFileName }: { title: string; iconName: IconName; onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void; selectedFileName: string }) => (
    <div>
        <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
        <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-8 transition-all duration-200 ease-in-out hover:border-blue-500 hover:bg-blue-900/20">
            <Icon name={iconName} className="w-12 h-12 text-gray-400 mb-2" />
            <span className="font-semibold text-blue-400">Choose File</span>
            <span className={`text-sm mt-1 ${selectedFileName ? 'text-gray-300' : 'text-gray-500'}`}>
                {selectedFileName || 'No file selected'}
            </span>
            <input type="file" accept="audio/*" className="hidden" onChange={onFileSelect} />
        </label>
    </div>
);

export default FileUploader;
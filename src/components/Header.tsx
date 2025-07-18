import Icon from "./Icon";


// Header Component
const Header = () => (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(17, 24, 39, 0.6)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <Icon name="mic-vocal" className="text-blue-400 w-6 h-6" />
                <h1 className="text-xl font-bold text-white">VocalTune</h1>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-transform transform hover:scale-105">
                Sign In
            </button>
        </div>
    </header>
);

export default Header;
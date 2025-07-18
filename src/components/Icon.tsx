import  { type JSX } from 'react';

// Reusable Icon Component for SVG icons
type IconName = 'loader' | 'mic-vocal' | 'music' | 'mic' | 'bar-chart-big';

interface IconProps {
    name: IconName;
    className: string;
    isSpinning?: boolean;
}

const Icon = ({ name, className, isSpinning = false }: IconProps) => {
    const icons: Record<IconName, JSX.Element> = {
        'loader': (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} ${isSpinning ? 'animate-spin' : ''}`}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        ),
        'mic-vocal': (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 12a4 4 0 0 1-8 0"/><path d="M12 16v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-2"/><path d="M12 16v2a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2v-2"/><path d="M8.5 10.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 3.5 3.5"/><path d="M12 7V4"/><path d="M12 21v-2"/></svg>
        ),
        'music': (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
        ),
        'mic': (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
        ),
        'bar-chart-big': (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 3v18h18"/><path d="M7 12v4h4v-4Z"/><path d="M15 8v8h4V8Z"/></svg>
        )
    };
    return icons[name] || null;
};


export default Icon
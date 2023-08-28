import React, { useRef } from 'react';

interface ProgressCircleRef {
  current: SVGSVGElement | null;
}

interface ProgressContentRef {
  current: HTMLElement | null;
}

const YourComponent: React.FC = () => {
  const progressCircle = useRef<ProgressCircleRef['current']>(null);
  const progressContent = useRef<ProgressContentRef['current']>(null);

  // Rest of your component logic...

  return (
    <div className="autoplay-progress" style={{ position: 'relative' }}>
      <svg viewBox="0 0 48 48" ref={progressCircle} className="w-12 h-12">
        <circle cx="24" cy="24" r="20" className="text-indigo-600 fill-current"></circle>
      </svg>
    </div>
  );
};

export default YourComponent;

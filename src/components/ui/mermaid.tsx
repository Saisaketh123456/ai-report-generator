import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
  className?: string;
}

// Initialize mermaid once
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'system-ui, -apple-system, sans-serif',
});

const Mermaid = ({ chart, className = '' }: MermaidProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current && chart) {
      const renderChart = async () => {
        try {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, chart);
          if (elementRef.current) {
            elementRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error('Mermaid rendering error:', error);
          if (elementRef.current) {
            elementRef.current.innerHTML = `
              <div class="p-4 border border-red-300 bg-red-50 rounded-lg">
                <p class="text-red-700">Error rendering diagram</p>
                <p class="text-sm text-red-600 mt-1">Please check your Mermaid syntax</p>
              </div>
            `;
          }
        }
      };

      renderChart();
    }
  }, [chart]);

  return (
    <div 
      ref={elementRef} 
      className={`mermaid-container ${className}`}
      style={{ textAlign: 'center' }}
    />
  );
};

export default Mermaid;
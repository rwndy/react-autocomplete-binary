import type { FC } from 'react';

interface PerformanceMetricsProps {
    comparisons: number;
    time: number;
    resultsCount: number;
    type: 'binary' | 'linear';
}

const PerformanceMetrics: FC<PerformanceMetricsProps> = ({
    comparisons,
    time,
    resultsCount,
    type,
}) => {
    const isFast = type === 'binary';

    return (
        <div className='performance-metrics'>
            <div className='metric'>
                <span className='metric-label'>Results</span>
                <span className='metric-value'>{resultsCount}</span>
            </div>
            <div className='metric'>
                <span className='metric-label'>Comparisons</span>
                <span className={`metric-value ${isFast ? 'fast' : 'slow'}`}>
                    {comparisons}
                </span>
            </div>
            <div className='metric'>
                <span className='metric-label'>Time</span>
                <span className={`metric-value ${isFast ? 'fast' : 'slow'}`}>
                  {time.toFixed(2)} μs
                </span>
            </div>
        </div>
    );
};

export default PerformanceMetrics;

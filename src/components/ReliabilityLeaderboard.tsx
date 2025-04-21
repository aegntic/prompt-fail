import React, { useState, useEffect } from 'react';

// Matches the structure from backend/src/services/reliabilityService.ts
type ReliabilityStatus = 'Operational' | 'Disrupted' | 'Degraded' | 'Unknown';

interface ProviderStatusData {
  name: string;
  status: ReliabilityStatus;
  lastChecked: string; // Keep as string from JSON
  sourceUrl?: string;
  details?: string;
}

// Helper function to get color based on status
const getStatusColor = (status: ReliabilityStatus): string => {
  switch (status) {
    case 'Operational':
      return '#4CAF50'; // Green
    case 'Degraded':
      return '#FFC107'; // Amber
    case 'Disrupted':
      return '#F44336'; // Red
    case 'Unknown':
    default:
      return '#9E9E9E'; // Grey
  }
};

const ReliabilityLeaderboard: React.FC = () => {
  const [statuses, setStatuses] = useState<ProviderStatusData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatuses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Assuming the backend runs on the same host/port during dev,
        // or configured via proxy in vite.config.ts for production builds.
        const response = await fetch('/api/reliability/status');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ProviderStatusData[] = await response.json();
        // Sort alphabetically by name as default
        data.sort((a, b) => a.name.localeCompare(b.name));
        setStatuses(data);
      } catch (err: any) {
        console.error("Failed to fetch reliability statuses:", err);
        setError(err.message || 'Failed to load data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatuses();
    // Optional: Add auto-refresh interval if needed
    // const intervalId = setInterval(fetchStatuses, 60 * 1000); // Refresh every minute
    // return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#ccc' }}>
      <h2 style={{ borderBottom: '1px solid #555', paddingBottom: '10px', marginBottom: '15px' }}>
        AI Provider Reliability Status
      </h2>
      {isLoading && <p>Loading status...</p>}
      {error && <p style={{ color: '#F44336' }}>Error: {error}</p>}
      {!isLoading && !error && (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {statuses.map((provider) => (
            <li key={provider.name} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#333', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `5px solid ${getStatusColor(provider.status)}` }}>
              <div>
                <span style={{ fontWeight: 'bold' }}>{provider.name}</span>
                {provider.details && <span style={{ fontSize: '0.8em', color: '#aaa', display: 'block', marginTop: '3px' }}>{provider.details}</span>}
              </div>
              <span style={{ fontWeight: 'bold', color: getStatusColor(provider.status) }}>
                {provider.status}
              </span>
            </li>
          ))}
        </ul>
      )}
       <p style={{ fontSize: '0.75em', color: '#888', marginTop: '15px' }}>
         Status reflects data fetched from provider status pages/APIs. Last checked times vary per provider. Cache active.
       </p>
    </div>
  );
};

export default ReliabilityLeaderboard;
// src/screens/MonitoringScreen.tsx
import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

interface MetricData {
  timestamp: number;
  latency: number;
  errors: number;
}

const MonitoringScreen: React.FC = () => {
  const [data, setData] = useState<MetricData[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await fetch('http://localhost:3000/metrics');

        // Extraer métricas simples de Prometheus (demo)
        const latency = Math.random() * 500;
        const errors = Math.floor(Math.random() * 3);
        setData((prev) => [...prev.slice(-20), { timestamp: Date.now(), latency, errors }]);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">📊 Monitoring Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg mb-2">Latency (ms)</h2>
          <LineChart width={400} height={200} data={data}>
            <Line type="monotone" dataKey="latency" stroke="#2563eb" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="timestamp" tick={false} />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg mb-2">Error Count</h2>
          <LineChart width={400} height={200} data={data}>
            <Line type="monotone" dataKey="errors" stroke="#dc2626" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="timestamp" tick={false} />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default MonitoringScreen;

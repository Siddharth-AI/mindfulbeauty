"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { useState } from 'react';

const trafficData = [
  { label: 'Site Traffic', value: 12, color: 'red', chart: 'bar' },
  { label: 'Site Traffic', value: 278, color: 'blue', chart: 'line' },
  { label: 'Site Traffic', value: 36, color: 'green', chart: 'bar' },
  { label: 'Site Traffic', value: 849, color: 'orange', chart: 'bar' },
];

const barData = [
  { name: 'January', Dataset1: 15, Dataset2: 9, Dataset3: 9 },
  { name: 'February', Dataset1: 7, Dataset2: 10, Dataset3: 9 },
  { name: 'March', Dataset1: 12, Dataset2: 13, Dataset3: 9 },
  { name: 'April', Dataset1: 17, Dataset2: 9, Dataset3: 16 },
];

const pieData = [
  { name: 'Red', value: 400 },
  { name: 'Green', value: 300 },
  { name: 'Yellow', value: 300 },
];

const pieColors = ['#f87171', '#4ade80', '#facc15'];

const dashbordPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white border-r p-6">
        <h2 className="text-2xl font-bold mb-6">Zeiss</h2>
        <nav className="space-y-2">
          {['Dashboard', 'Icons', 'Calendar', 'Charts', 'Admin UI', 'User Interface', 'Mail', 'Forms', 'Tables', 'Page', 'Extra Pages'].map((item, index) => (
            <div key={index} className="text-gray-700 hover:bg-gray-100 rounded p-2 cursor-pointer">
              {item}
              {item === 'Calendar' && <span className="ml-2 text-xs bg-red-500 text-white rounded-full px-2 py-0.5">New</span>}
              {item === 'Forms' && <span className="ml-2 text-xs bg-blue-500 text-white rounded-full px-2 py-0.5">7</span>}
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {trafficData.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <div className={`text-sm font-semibold text-${item.color}-600`}>{item.label}</div>
              <div className="h-12">
                {item.chart === 'line' ? (
                  <LineChart width={150} height={40} data={[{ value: item.value }]}> 
                    <Line type="monotone" dataKey="value" stroke={item.color} />
                  </LineChart>
                ) : (
                  <BarChart width={150} height={40} data={[{ value: item.value }]}> 
                    <Bar dataKey="value" fill={item.color} />
                  </BarChart>
                )}
              </div>
              <div className={`text-2xl font-bold text-${item.color}-600`}>{item.value}</div>
              <p className="text-xs text-gray-400">Some text here</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Dataset1" fill="#facc15" />
                <Bar dataKey="Dataset2" fill="#60a5fa" />
                <Bar dataKey="Dataset3" fill="#fca5a5" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Sales</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default dashbordPage;
"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { useState, useEffect } from 'react';
import { useGetEmployeesQuery } from '@/app/store/slice/employeeApiSlice';
import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import {
  selectActiveTab,
  selectIsLoading,
  selectError,
  setActiveTab,
  setLoading,
  setError
} from '@/app/store/slice/employeeSlice';

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

// हार्डकोडेड डेटा को हटा दें, क्योंकि अब हम API से डेटा लेंगे

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const activeEmployTab = useAppSelector(selectActiveTab);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  // API क्वेरी का उपयोग करें
  const { data, isLoading: apiLoading, error: apiError } = useGetEmployeesQuery({});

  // API लोडिंग और एरर स्टेट को स्टोर में सिंक करें
  useEffect(() => {
    dispatch(setLoading(apiLoading));
    if (apiError) {
      console.error('API Error:', apiError);
      dispatch(setError(typeof apiError === 'string' ? apiError : 'Failed to load employee data. Please try again.'));
    } else {
      dispatch(setError(null));
    }
  }, [apiLoading, apiError, dispatch]);

  // रोल के आधार पर डेटा प्राप्त करें
  const salonData = activeEmployTab === 'salon' && data ? (data as any).salonEmployees || [] : [];
  const freelancerData = activeEmployTab === 'freelancer' && data ? (data as any).freelancers || [] : [];

  // अभी के लिए प्रदर्शित करने के लिए डेटा
  const displayData = activeEmployTab === 'salon' ? salonData : freelancerData;

  // टैब बदलने के लिए हैंडलर
  const handleTabChange = (tab: 'salon' | 'freelancer') => {
    dispatch(setActiveTab(tab));
  };

  const [view, setView] = useState<'dashboard' | 'employ'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-800 border-r border-gray-700 p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">mindfulbeauty</h2>
        <nav className="space-y-3">
          <button
            className="bg-gray-700 hover:bg-blue-600 rounded p-2 w-full text-sm md:text-base"
            onClick={() => setView('dashboard')}
          >
            Dashboard
          </button>
          <button
            className="bg-gray-700 hover:bg-blue-600 rounded p-2 w-full text-sm md:text-base"
            onClick={() => setView('employ')}
          >
            Employ
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        {view === 'dashboard' ? (
          <>
            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {trafficData.map((item, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded shadow">
                  <div className={`text-sm font-semibold text-${item.color}-400`}>{item.label}</div>
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
                  <div className={`text-2xl font-bold text-${item.color}-400`}>{item.value}</div>
                  <p className="text-xs text-gray-400">Some text here</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-4">Activity</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Bar dataKey="Dataset1" fill="#facc15" />
                    <Bar dataKey="Dataset2" fill="#60a5fa" />
                    <Bar dataKey="Dataset3" fill="#fca5a5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800 p-4 rounded shadow">
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
          </>
        ) : (
          <>
            {/* Salon/Freelancer Tabs */}
            <div className="mb-6 flex flex-wrap gap-4">
              <button
                onClick={() => handleTabChange('salon')}
                className={`px-4 py-2 rounded ${activeEmployTab === 'salon' ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                Salon
              </button>
              <button
                onClick={() => handleTabChange('freelancer')}
                className={`px-4 py-2 rounded ${activeEmployTab === 'freelancer' ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                Freelancer
              </button>
            </div>

            {/* Loading and Error States */}
            {isLoading && (
              <div className="p-4 bg-gray-800 rounded shadow">
                <p className="text-blue-400">Loading data...</p>
              </div>
            )}
            {error && (
              <div className="p-4 bg-gray-800 rounded shadow border border-red-500">
                <p className="text-red-400">Error loading data: {error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Table View */}
            {/* Table View */}
            {!isLoading && !error && (
              <div className="bg-gray-800 rounded shadow overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="p-3 whitespace-nowrap">Name</th>
                      <th className="p-3 whitespace-nowrap">Email</th>
                      <th className="p-3 whitespace-nowrap">Mobile No</th>
                      <th className="p-3 whitespace-nowrap">Location</th>
                      <th className="p-3 whitespace-nowrap">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayData.map((item: {
                      id: string;
                      name: string;
                      email: string;
                      mobile_no: string;
                      location: string;
                      role: string;
                    }) => (
                      <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700">
                        <td className="p-3">{item.name}</td>
                        <td className="p-3">{item.email}</td>
                        <td className="p-3">{item.mobile_no}</td>
                        <td className="p-3">{item.location}</td>
                        <td className="p-3">{item.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;

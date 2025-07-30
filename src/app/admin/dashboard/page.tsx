"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { useState } from 'react';
import {
  Search, Bell, User, Settings, Menu, X, Home, Users, BarChart2,
  PieChart as PieChartIcon, Activity, DollarSign, TrendingUp, Package, Calendar,
  Sun, Moon, Edit, Trash2
} from 'lucide-react';
import { FaToggleOn, FaToggleOff } from "react-icons/fa";


// डैशबोर्ड डेटा
const trafficData = [
  { label: 'Total Customers', value: 4500, change: '+16%', color: '#3699FF', icon: <Users size={18} /> },
  { label: 'Total Revenue', value: '$18,300', change: '+23%', color: '#1BC5BD', icon: <DollarSign size={18} /> },
  { label: 'New Bookings', value: 520, change: '+12%', color: '#8950FC', icon: <Calendar size={18} /> },
  { label: 'Growth Rate', value: '27.4%', change: '+3.7%', color: '#F64E60', icon: <TrendingUp size={18} /> },
];

const barData = [
  { name: 'Jan', Revenue: 1500, Expenses: 900, Profit: 600 },
  { name: 'Feb', Revenue: 2000, Expenses: 1200, Profit: 800 },
  { name: 'Mar', Revenue: 1700, Expenses: 950, Profit: 750 },
  { name: 'Apr', Revenue: 2400, Expenses: 1300, Profit: 1100 },
  { name: 'May', Revenue: 2100, Expenses: 1100, Profit: 1000 },
  { name: 'Jun', Revenue: 2800, Expenses: 1400, Profit: 1400 },
];

const pieData = [
  { name: 'Hair Services', value: 45 },
  { name: 'Skin Care', value: 30 },
  { name: 'Makeup', value: 15 },
  { name: 'Nail Care', value: 10 },
];


const pieColors = ['#3699FF', '#1BC5BD', '#8950FC', '#F64E60'];

// हार्डकोडेड एम्प्लॉयी डेटा (सभी में status field add किया गया)
const salon = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    mobile_no: '9876543210',
    location: 'Mumbai',
    role: 'salon',
    status: 'active' as 'active' | 'inactive'
  },
  {
    id: '2',
    name: 'Priya Singh',
    email: 'priya@example.com',
    mobile_no: '9876543211',
    location: 'Delhi',
    role: 'salon',
    status: 'active' as 'active' | 'inactive'
  },
  {
    id: "abc123",
    name: "Amit",
    email: "amit@example.com",
    mobile_no: "1234567890",
    location: "Delhi",
    role: "salon",
    status: "active" as 'active' | 'inactive'
  }
];

const freelancers = [
  {
    id: '4',
    name: 'Neha Gupta',
    email: 'neha@example.com',
    mobile_no: '9876543213',
    location: 'Pune',
    role: 'freelancer',
    status: 'active' as 'active' | 'inactive'
  },
  {
    id: '5',
    name: 'Vikram Patel',
    email: 'vikram@example.com',
    mobile_no: '9876543214',
    location: 'Hyderabad',
    role: 'freelancer',
    status: 'inactive' as 'active' | 'inactive'
  }
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'salon' | 'freelancer'>('all');
  const [view, setView] = useState<'dashboard' | 'employ' | "user">('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [salonData, setsalonData] = useState([...salon, ...freelancers]);

  interface salon {
    id: string;
    name: string;
    email: string;
    mobile_no: string;
    location: string;
    role: string;
    status: 'active' | 'inactive';
  }

  const [salons, setsalons] = useState<salon[]>([]);

  // थीम स्विचिंग फंक्शन
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // रोल के आधार पर डेटा प्राप्त करें
  const displayData = activeTab === 'all'
    ? salonData
    : activeTab === 'salon'
      ? salonData.filter(emp => emp.role === 'salon')
      : salonData.filter(emp => emp.role === 'freelancer');

  // Status toggle function
  const handleStatusToggle = (id: string) => {
    setsalonData(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
          : item
      )
    );
  };

  const handleEdit = (id: string) => {
    console.log('Edit salon:', id);
    // Edit functionality यहाँ implement करें
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this salon?')) {
      setsalonData(prev => prev.filter(item => item.id !== id));
    }
  };


  const [statusPopoverId, setStatusPopoverId] = useState<string | null>(null);
  const [statusUpdateMap, setStatusUpdateMap] = useState<Record<string, { status: 'active' | 'inactive'; description: string }>>({});

  // const [statusPopoverId, setStatusPopoverId] = useState<string | null>(null);
  // const [statusUpdate, setStatusUpdate] = useState<{ status: 'active' | 'inactive'; description: string }>({
  //   status: 'active',
  //   description: ''
  // });

  // थीम के आधार पर क्लास निर्धारित करें
  const themeClasses = {
    body: darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800',
    header: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    sidebar: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    card: darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800',
    button: darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600',
    table: {
      header: darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-500',
      row: darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50',
      cell: darkMode ? 'text-gray-300' : 'text-gray-500'
    }
  };

  return (
    <div className={`min-h-screen ${themeClasses.body} flex flex-col transition-colors duration-200`}>
      {/* Header */}
      <header className={`${themeClasses.header} shadow-sm z-10 flex items-center justify-between p-4 lg:px-8 transition-colors duration-200`}>
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 text-gray-500 hover:text-gray-700 lg:hidden"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-xl font-semibold">Mindful Beauty</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-700 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
          </button>
          {/* थीम स्विचर बटन */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'} transition-colors duration-200`}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <span className="text-sm font-medium hidden md:inline">Admin</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 ${themeClasses.sidebar} border-r transition-all duration-300 ease-in-out overflow-y-auto`}>
          <div className="p-6">
            <h2 className="text-lg font-bold">Mindful Beauty</h2>
          </div>
          <nav className="px-4 pb-6 space-y-1">
            <button
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${view === 'dashboard' ? (darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600') : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')}`}
              onClick={() => setView('dashboard')}
            >
              <Home size={18} />
              <span className="font-medium">Dashboard</span>
            </button>
            <button
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${view === 'employ' ? (darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600') : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')}`}
              onClick={() => setView('employ')}
            >
              <Users size={18} />
              <span className="font-medium"> requeste</span>
            </button>
            <button className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setView('user')}>
              <BarChart2 size={18} />
              <span className="font-medium"> User </span>
            </button>
            <div className="pt-4 pb-2">
              <div className={`px-4 text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Reports</div>
            </div>

            <button className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              <PieChartIcon size={18} />
              <span className="font-medium">Analytics</span>
            </button>
            <div className="pt-4 pb-2">
              <div className={`px-4 text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Settings</div>
            </div>
            <button className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              <Settings size={18} />
              <span className="font-medium">General</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
          {view === 'dashboard' ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Dashboard Overview</h2>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Welcome back, here's what's happening with your business today.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {trafficData.map((item, index) => (
                  <div key={index} className={`${themeClasses.card} rounded-lg shadow-sm p-6 transition-all hover:shadow-md`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</p>
                        <h3 className="text-2xl font-bold mt-1" style={{ color: item.color }}>{item.value}</h3>
                      </div>
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${item.color}20` }}>
                        <div style={{ color: item.color }}>{item.icon}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center">
                      <span className="text-sm font-medium text-green-500">{item.change}</span>
                      <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>since last month</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className={`${themeClasses.card} rounded-lg shadow-sm p-6`}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Revenue Overview</h3>
                    <div className="flex space-x-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Revenue</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Profit</span>
                      </div>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f0f0f0'} vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                      <YAxis axisLine={false} tickLine={false} stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                      <Tooltip contentStyle={darkMode ? { backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem', color: '#F9FAFB' } : {}} />
                      <Bar dataKey="Revenue" fill="#3699FF" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Profit" fill="#1BC5BD" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className={`${themeClasses.card} rounded-lg shadow-sm p-6`}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Service Distribution</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name}: ${(percent ?? 0 * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={darkMode ? { backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem', color: '#F9FAFB' } : {}} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-700 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
                {/* <button className={`px-4 py-2 ${themeClasses.button} text-white rounded-lg transition-colors`}>
                  + Add New Staff
                </button> */}
              </div>

              {/* Salon/Freelancer Tabs */}
              <div className={`${themeClasses.card} rounded-lg shadow-sm mb-6`}>
                <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`px-6 py-3 text-sm font-medium ${activeTab === 'all' ? (darkMode ? 'border-b-2 border-blue-500 text-blue-400' : 'border-b-2 border-blue-500 text-blue-600') : (darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700')}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setActiveTab('salon')}
                      className={`px-6 py-3 text-sm font-medium ${activeTab === 'salon' ? (darkMode ? 'border-b-2 border-blue-500 text-blue-400' : 'border-b-2 border-blue-500 text-blue-600') : (darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700')}`}
                    >
                      Salon 
                    </button>
                    <button
                      onClick={() => setActiveTab('freelancer')}
                      className={`px-6 py-3 text-sm font-medium ${activeTab === 'freelancer' ? (darkMode ? 'border-b-2 border-blue-500 text-blue-400' : 'border-b-2 border-blue-500 text-blue-600') : (darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700')}`}
                    >
                      Freelancers
                    </button>
                  </div>
                </div>
              </div>

              {/* Table View */}
              <div className={`${themeClasses.card} rounded-lg shadow-sm overflow-hidden`}>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}">
                    <thead className={themeClasses.table.header}>
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Mobile No</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Location</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>

                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className={`${themeClasses.card} divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                      {displayData.length > 0 ? (
                        displayData.map((item: {
                          id: string;
                          name: string;
                          email: string;
                          mobile_no: string;
                          location: string;
                          role: string;
                        }) => (
                          <tr key={item.id} className={themeClasses.table.row}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                  {item.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-4">
                                  <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeClasses.table.cell}`}>{item.email}</td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeClasses.table.cell}`}>{item.mobile_no}</td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeClasses.table.cell}`}>{item.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.role === 'salon' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                                {item.role}
                              </span>
                            </td>
                            <td className="relative px-6 py-4 whitespace-nowrap">
                              {statusUpdateMap[item.id]?.status === 'active' ? (
                                <span className="text-green-600 text-sm font-semibold">Updated</span>
                              ) : (
                                <span className="text-red-500 text-sm font-semibold">Inactive</span>
                              )}

                              <button
                                onClick={() => setStatusPopoverId(item.id)}
                                className="ml-3 inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 relative"
                              >
                                
                                <span className="relative z-10 font-bold text-lg">+</span>
                              </button>

                              {statusPopoverId === item.id && (
                                <div className="absolute top-full mt-2 right-0 w-64 bg-white shadow-lg rounded-lg p-4 z-50 border border-gray-200">
                                  <label className="block text-xs text-gray-500 mb-1">Change Status:</label>
                                  <select
                                    value={statusUpdateMap[item.id]?.status || 'inactive'}
                                    onChange={(e) =>
                                      setStatusUpdateMap((prev) => ({
                                        ...prev,
                                        [item.id]: {
                                          ...prev[item.id],
                                          status: e.target.value as 'active' | 'inactive'
                                        }
                                      }))
                                    }
                                    className="w-full mb-2 border border-gray-300 rounded px-2 py-1 text-sm"
                                  >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                  </select>

                                  <label className="block text-xs text-gray-500 mb-1">Description:</label>
                                  <textarea
                                    value={statusUpdateMap[item.id]?.description || ''}
                                    onChange={(e) =>
                                      setStatusUpdateMap((prev) => ({
                                        ...prev,
                                        [item.id]: {
                                          ...prev[item.id],
                                          description: e.target.value
                                        }
                                      }))
                                    }
                                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                    rows={2}
                                    placeholder="Add a note..."
                                  />

                                  <div className="flex justify-end mt-3 gap-2">
                                    <button
                                      onClick={() => setStatusPopoverId(null)}
                                      className="px-3 py-1 rounded text-xs bg-gray-200 hover:bg-gray-300"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => {
                                        // You can also trigger handleStatusToggle(item.id) if needed
                                        setStatusPopoverId(null);
                                      }}
                                      className="px-3 py-1 rounded text-xs bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              )}
                            </td>



                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-3">
                              <button title="Edit" onClick={() => handleEdit(item.id)} className="text-blue-500 hover:text-blue-700">
                                ✏️
                              </button>
                              <button title="Delete" onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                                🗑️
                              </button>
                            </td>

                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className={`px-6 py-4 text-center text-sm ${themeClasses.table.cell}`}>
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
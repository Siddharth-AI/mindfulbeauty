/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Bell,
  User,
  Menu,
  X,
  Home,
  Users,
  BarChart2,
  DollarSign,
  TrendingUp,
  Calendar,
  Sun,
  Moon,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  History,
  FileText,
} from "lucide-react";
import RequireAuth from "@/app/components/RequireAuth";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { logout, loadUserFromToken } from "@/app/store/slice/authSlice";
import {
  fetchRequests,
  updateRequestStatus,
  fetchSingleRequest,
  setPage as setRequestPage,
  clearError as clearRequestError,
  setSearchQuery as setRequestSearchQuery,
  clearCurrentRequest,
} from "@/app/store/slice/registrationRequestSlice";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
  setPage as setUserPage,
  clearError as clearUserError,
  setSearchQuery as setUserSearchQuery,
  fetchSingleUser,
} from "@/app/store/slice/userSlice";
import { useRouter } from "next/navigation";
import { toastSuccess, toastError } from "@/app/components/common/toastService";
import Modal from "@/app/components/ui/Modal";
import SearchInput from "@/app/components/ui/SearchInput";
import StatusBadge from "@/app/components/ui/StatusBadge";
import UserStatusHistoryModal from "@/app/components/ui/UserStatusHistoryModal";
import CompleteHistoryModal from "@/app/components/ui/CompleteHistoryModal";

// Dashboard data
const trafficData = [
  {
    label: "Total Customers",
    value: 4500,
    change: "+16%",
    color: "#3699FF",
    icon: <Users size={18} />,
  },
  {
    label: "Total Revenue",
    value: "$18,300",
    change: "+23%",
    color: "#1BC5BD",
    icon: <DollarSign size={18} />,
  },
  {
    label: "New Bookings",
    value: 520,
    change: "+12%",
    color: "#8950FC",
    icon: <Calendar size={18} />,
  },
  {
    label: "Growth Rate",
    value: "27.4%",
    change: "+3.7%",
    color: "#F64E60",
    icon: <TrendingUp size={18} />,
  },
];

const barData = [
  { name: "Jan", Revenue: 1500, Expenses: 900, Profit: 600 },
  { name: "Feb", Revenue: 2000, Expenses: 1200, Profit: 800 },
  { name: "Mar", Revenue: 1700, Expenses: 950, Profit: 750 },
  { name: "Apr", Revenue: 2400, Expenses: 1300, Profit: 1100 },
  { name: "May", Revenue: 2100, Expenses: 1100, Profit: 1000 },
  { name: "Jun", Revenue: 2800, Expenses: 1400, Profit: 1400 },
];

const pieData = [
  { name: "Hair Services", value: 45 },
  { name: "Skin Care", value: 30 },
  { name: "Makeup", value: 15 },
  { name: "Nail Care", value: 10 },
];

const pieColors = ["#3699FF", "#1BC5BD", "#8950FC", "#F64E60"];

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Redux state
  const { user } = useAppSelector((state) => state.auth);
  const {
    requests,
    filteredRequests,
    currentRequest,
    loading: requestsLoading,
    error: requestsError,
    page: requestPage,
    pageSize: requestPageSize,
    statusLoading,
    searchQuery: requestSearchQuery,
  } = useAppSelector((state) => state.requests);

  const {
    users,
    filteredUsers,
    loading: usersLoading,
    error: usersError,
    page: userPage,
    pageSize: userPageSize,
    searchQuery: userSearchQuery,
  } = useAppSelector((state) => state.users);

  console.log(user, "user data in dashboard");

  // Local state
  const [activeTab, setActiveTab] = useState<"all" | "salon" | "freelancer">(
    "all"
  );
  const [view, setView] = useState<"dashboard" | "requests" | "users">(
    "dashboard"
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [statusPopoverId, setStatusPopoverId] = useState<string | null>(null);
  const [statusUpdateMap, setStatusUpdateMap] = useState<
    Record<string, { status: string; description: string }>
  >({});
  const [showUserForm, setShowUserForm] = useState(false);
  const [showRequestDetail, setShowRequestDetail] = useState(false);
  const [showStatusHistory, setShowStatusHistory] = useState(false);
  const [showCompleteHistory, setShowCompleteHistory] = useState(false);
  const [selectedUserForHistory, setSelectedUserForHistory] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedRequestForHistory, setSelectedRequestForHistory] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
    type: "salon" as "salon" | "freelancer",
    mobile_no: "",
    address: "",
    location: "",
  });

  // Load user from token on app start
  useEffect(() => {
    dispatch(loadUserFromToken());
  }, [dispatch]);

  // Load data on component mount
  useEffect(() => {
    if (view === "requests") {
      dispatch(fetchRequests());
    } else if (view === "users") {
      dispatch(fetchUsers());
    }
  }, [dispatch, view]);

  // Handle errors
  useEffect(() => {
    if (requestsError) {
      toastError(requestsError);
      dispatch(clearRequestError());
    }
    if (usersError) {
      toastError(usersError);
      dispatch(clearUserError());
    }
  }, [requestsError, usersError, dispatch]);

  // Theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toastSuccess("Logged out successfully!");
      router.push("/admin");
    } catch (error) {
      console.log("logout error", error);
      toastError("Logout failed");
    }
  };

  // Pagination helpers
  const getPaginatedData = (data: any[], page: number, pageSize: number) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (total: number, pageSize: number) => {
    return Math.ceil(total / pageSize);
  };

  // Filter data based on active tab
  const getFilteredRequests = () => {
    const baseData =
      filteredRequests.length > 0 || requestSearchQuery
        ? filteredRequests
        : requests;
    if (activeTab === "all") return baseData;
    return baseData.filter((req) => req.type === activeTab);
  };

  const getFilteredUsers = () => {
    const baseData =
      filteredUsers.length > 0 || userSearchQuery ? filteredUsers : users;
    if (activeTab === "all") return baseData;
    return baseData.filter((user) => user.type === activeTab);
  };

  // Status update handlers
  const handleStatusUpdate = async (id: string, type: "request" | "user") => {
    const updateData = statusUpdateMap[id];
    if (!updateData || !updateData.description.trim()) {
      toastError("Please provide a description");
      return;
    }

    try {
      if (type === "request") {
        await dispatch(
          updateRequestStatus({
            requestId: id,
            new_status: updateData.status,
            remark: updateData.description,
          })
        ).unwrap();
        toastSuccess("Request status updated successfully!");
        // If approved, show success message about user creation and request deletion
        if (updateData.status === "approved") {
          toastSuccess("User created and registration request completed!");
          // Refresh both requests and users
          dispatch(fetchRequests());
          dispatch(fetchUsers());
        }
      } else {
        await dispatch(
          updateUserStatus({
            userId: id,
            new_status: updateData.status,
            remark: updateData.description,
          })
        ).unwrap();
        toastSuccess("User status updated successfully!");
      }
      setStatusPopoverId(null);
      setStatusUpdateMap((prev) => {
        const newMap = { ...prev };
        delete newMap[id];
        return newMap;
      });
    } catch (error: any) {
      toastError(error.message || "Status update failed");
    }
  };

  // View request detail
  const handleViewRequest = async (requestId: string) => {
    try {
      await dispatch(fetchSingleRequest(requestId)).unwrap();
      setShowRequestDetail(true);
    } catch (error: any) {
      toastError(error.message || "Failed to fetch request details");
    }
  };

  // View user status history
  const handleViewUserHistory = (userId: string, userName: string) => {
    setSelectedUserForHistory({ id: userId, name: userName });
    setShowStatusHistory(true);
  };

  // View complete request history
  const handleViewCompleteHistory = (
    requestId: string,
    requestName: string
  ) => {
    setSelectedRequestForHistory({ id: requestId, name: requestName });
    setShowCompleteHistory(true);
  };

  // User form handlers
  const handleUserFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await dispatch(
          updateUser({
            userId: editingUser.id,
            userData: userFormData,
          })
        ).unwrap();
        await dispatch(fetchSingleUser(editingUser.id));
        toastSuccess("User updated successfully!");
      } else {
        console.log(userFormData, "checking userfrom data");
        await dispatch(createUser(userFormData)).unwrap();
        toastSuccess("User created successfully!");
      }
      setShowUserForm(false);
      setEditingUser(null);
      setUserFormData({
        name: "",
        email: "",
        password: "",
        type: "salon",
        mobile_no: "",
        address: "",
        location: "",
      });
    } catch (error: any) {
      toastError(error.message || "Operation failed");
    }
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setUserFormData({
      name: user.name,
      email: user.email,
      password: "",
      type: user.type,
      mobile_no: user.mobile_no,
      address: user.address || "",
      location: user.location || "",
    });
    setShowUserForm(true);
    dispatch(fetchSingleUser(user.id));
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        toastSuccess("User deleted successfully!");
      } catch (error: any) {
        toastError(error.message || "Delete failed");
      }
    }
  };

  // Theme classes
  const themeClasses = {
    body: darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800",
    header: darkMode
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-200",
    sidebar: darkMode
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-200",
    card: darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800",
    button: darkMode
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-blue-500 hover:bg-blue-600",
    table: {
      header: darkMode
        ? "bg-gray-700 text-gray-200"
        : "bg-gray-50 text-gray-500",
      row: darkMode
        ? "border-gray-700 hover:bg-gray-700"
        : "border-gray-200 hover:bg-gray-50",
      cell: darkMode ? "text-gray-300" : "text-gray-500",
    },
  };

  return (
    <RequireAuth>
      <div
        className={`min-h-screen ${themeClasses.body} flex flex-col transition-colors duration-200`}>
        {/* Header */}
        <header
          className={`${themeClasses.header} shadow-sm z-10 flex items-center justify-between p-4 lg:px-8 transition-colors duration-200`}>
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-4 text-gray-500 hover:text-gray-700 lg:hidden">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-3xl font-bold">Dashboard Panel</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                darkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-200 text-gray-700"
              } transition-colors duration-200`}
              aria-label="Toggle theme">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                <User size={18} />
              </div>
              <span className="text-sm font-medium hidden md:inline">
                {user?.name || "Admin"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors"
              title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside
            className={`${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 ${
              themeClasses.sidebar
            } border-r transition-all duration-300 ease-in-out overflow-y-auto`}>
            <div className="p-6">
              <h2 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Mindful Beauty
              </h2>
            </div>
            <nav className="px-4 pb-6 space-y-1">
              <button
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                  view === "dashboard"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setView("dashboard")}>
                <Home size={18} />
                <span className="font-medium">Dashboard</span>
              </button>
              <button
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                  view === "requests"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setView("requests")}>
                <Users size={18} />
                <span className="font-medium">Requests</span>
              </button>
              <button
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                  view === "users"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setView("users")}>
                <BarChart2 size={18} />
                <span className="font-medium">Users</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main
            className={`flex-1 overflow-hidden ${
              darkMode ? "bg-gray-900" : "bg-gray-50"
            } transition-colors duration-200`}>
            <div className="h-full overflow-y-auto p-6">
              {view === "dashboard" ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">Dashboard Overview</h2>
                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                      Welcome back, here&apos;s what&apos;s happening with your
                      business today.
                    </p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {trafficData.map((item, index) => (
                      <div
                        key={index}
                        className={`${themeClasses.card} rounded-xl shadow-sm p-6 transition-all hover:shadow-lg transform hover:-translate-y-1`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p
                              className={`text-sm font-medium ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}>
                              {item.label}
                            </p>
                            <h3
                              className="text-2xl font-bold mt-1"
                              style={{ color: item.color }}>
                              {item.value}
                            </h3>
                          </div>
                          <div
                            className="p-3 rounded-lg"
                            style={{ backgroundColor: `${item.color}20` }}>
                            <div style={{ color: item.color }}>{item.icon}</div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center">
                          <span className="text-sm font-medium text-green-500">
                            {item.change}
                          </span>
                          <span
                            className={`text-sm ml-2 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}>
                            since last month
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div
                      className={`${themeClasses.card} rounded-xl shadow-sm p-6`}>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold">
                          Revenue Overview
                        </h3>
                        <div className="flex space-x-2">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                            <span
                              className={`text-xs ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}>
                              Revenue
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                            <span
                              className={`text-xs ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}>
                              Profit
                            </span>
                          </div>
                        </div>
                      </div>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={darkMode ? "#374151" : "#f0f0f0"}
                            vertical={false}
                          />
                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            stroke={darkMode ? "#9CA3AF" : "#6B7280"}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            stroke={darkMode ? "#9CA3AF" : "#6B7280"}
                          />
                          <Tooltip
                            contentStyle={
                              darkMode
                                ? {
                                    backgroundColor: "#1F2937",
                                    border: "none",
                                    borderRadius: "0.5rem",
                                    color: "#F9FAFB",
                                  }
                                : {}
                            }
                          />
                          <Bar
                            dataKey="Revenue"
                            fill="#3699FF"
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar
                            dataKey="Profit"
                            fill="#1BC5BD"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div
                      className={`${themeClasses.card} rounded-xl shadow-sm p-6`}>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold">
                          Service Distribution
                        </h3>
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
                            label={({ name, percent }) =>
                              `${name}: ${((percent || 0) * 100).toFixed(0)}%`
                            }>
                            {pieData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={pieColors[index % pieColors.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={
                              darkMode
                                ? {
                                    backgroundColor: "#1F2937",
                                    border: "none",
                                    borderRadius: "0.5rem",
                                    color: "#F9FAFB",
                                  }
                                : {}
                            }
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <SearchInput
                      value={
                        view === "requests"
                          ? requestSearchQuery
                          : userSearchQuery
                      }
                      onChange={(value) => {
                        if (view === "requests") {
                          dispatch(setRequestSearchQuery(value));
                        } else {
                          dispatch(setUserSearchQuery(value));
                        }
                      }}
                      placeholder={`Search ${view}...`}
                      className="w-full sm:w-80"
                    />
                    {view === "users" && (
                      <button
                        onClick={() => setShowUserForm(true)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg transition-all hover:from-blue-600 hover:to-purple-700 flex items-center gap-2 shadow-lg">
                        <Plus size={18} />
                        Add New User
                      </button>
                    )}
                  </div>

                  {/* Tabs */}
                  <div
                    className={`${themeClasses.card} rounded-xl shadow-sm mb-6`}>
                    <div
                      className={`border-b ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      }`}>
                      <div className="flex">
                        <button
                          onClick={() => setActiveTab("all")}
                          className={`px-6 py-3 text-sm font-medium transition-colors ${
                            activeTab === "all"
                              ? "border-b-2 border-blue-500 text-blue-600"
                              : darkMode
                              ? "text-gray-400 hover:text-gray-300"
                              : "text-gray-500 hover:text-gray-700"
                          }`}>
                          All
                        </button>
                        <button
                          onClick={() => setActiveTab("salon")}
                          className={`px-6 py-3 text-sm font-medium transition-colors ${
                            activeTab === "salon"
                              ? "border-b-2 border-blue-500 text-blue-600"
                              : darkMode
                              ? "text-gray-400 hover:text-gray-300"
                              : "text-gray-500 hover:text-gray-700"
                          }`}>
                          Salon
                        </button>
                        <button
                          onClick={() => setActiveTab("freelancer")}
                          className={`px-6 py-3 text-sm font-medium transition-colors ${
                            activeTab === "freelancer"
                              ? "border-b-2 border-blue-500 text-blue-600"
                              : darkMode
                              ? "text-gray-400 hover:text-gray-300"
                              : "text-gray-500 hover:text-gray-700"
                          }`}>
                          Freelancers
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  <div
                    className={`${themeClasses.card} rounded-xl shadow-sm overflow-hidden`}>
                    {(view === "requests" && requestsLoading) ||
                    (view === "users" && usersLoading) ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                      </div>
                    ) : (
                      <>
                        <div className="h-screen">
                          <table
                            className={`min-w-full divide-y ${
                              darkMode ? "divide-gray-700" : "divide-gray-200"
                            }`}>
                            <thead className={themeClasses.table.header}>
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  Mobile No
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody
                              className={`${themeClasses.card} divide-y ${
                                darkMode ? "divide-gray-700" : "divide-gray-200"
                              }`}>
                              {(() => {
                                const data =
                                  view === "requests"
                                    ? getFilteredRequests()
                                    : getFilteredUsers();
                                const currentPage =
                                  view === "requests" ? requestPage : userPage;
                                const pageSize =
                                  view === "requests"
                                    ? requestPageSize
                                    : userPageSize;
                                const paginatedData = getPaginatedData(
                                  data,
                                  currentPage,
                                  pageSize
                                );

                                return paginatedData.length > 0 ? (
                                  paginatedData.map((item: any) => (
                                    <tr
                                      key={item.id}
                                      className={`${themeClasses.table.row} transition-colors`}>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                                            {item.name.charAt(0).toUpperCase()}
                                          </div>
                                          <div className="ml-4">
                                            <div
                                              className={`text-sm font-medium ${
                                                darkMode
                                                  ? "text-white"
                                                  : "text-gray-900"
                                              }`}>
                                              {item.name}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td
                                        className={`px-6 py-4 whitespace-nowrap text-sm ${themeClasses.table.cell}`}>
                                        {item.email}
                                      </td>
                                      <td
                                        className={`px-6 py-4 whitespace-nowrap text-sm ${themeClasses.table.cell}`}>
                                        {item.mobile_no || "N/A"}
                                      </td>
                                      <td
                                        className={`px-6 py-4 whitespace-nowrap text-sm ${themeClasses.table.cell}`}>
                                        {item.location || "N/A"}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            item.type === "salon"
                                              ? "bg-green-100 text-green-800"
                                              : "bg-purple-100 text-purple-800"
                                          }`}>
                                          {item.type}
                                        </span>
                                      </td>
                                      <td className="relative px-6 py-4 whitespace-nowrap">
                                        <StatusBadge
                                          status={
                                            view === "requests"
                                              ? item.status
                                              : item.status || "pending"
                                          }
                                          type={
                                            view === "requests"
                                              ? "request"
                                              : "user"
                                          }
                                        />

                                        <button
                                          onClick={() =>
                                            setStatusPopoverId(item.id)
                                          }
                                          className="ml-3 inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 relative transition-colors">
                                          <span className="relative z-10 font-bold text-lg">
                                            +
                                          </span>
                                        </button>

                                        {statusPopoverId === item.id && (
                                          <div className="absolute top-full mt-2 right-0 w-64 bg-white shadow-xl rounded-lg p-4 z-50 border border-gray-200">
                                            <label className="block text-xs text-gray-500 mb-1">
                                              Change Status:
                                            </label>
                                            <select
                                              value={
                                                statusUpdateMap[item.id]
                                                  ?.status ||
                                                (view === "requests"
                                                  ? "pending"
                                                  : "approved")
                                              }
                                              onChange={(e) =>
                                                setStatusUpdateMap((prev) => ({
                                                  ...prev,
                                                  [item.id]: {
                                                    ...prev[item.id],
                                                    status: e.target.value,
                                                  },
                                                }))
                                              }
                                              className="w-full mb-2 border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500">
                                              {view === "requests" ? (
                                                <>
                                                  <option value="pending">
                                                    Pending
                                                  </option>
                                                  <option value="approved">
                                                    Approved
                                                  </option>
                                                  <option value="rejected">
                                                    Rejected
                                                  </option>
                                                  <option value="follow-up">
                                                    Follow-up
                                                  </option>
                                                </>
                                              ) : (
                                                <>
                                                  <option value="pending">
                                                    Pending
                                                  </option>
                                                  <option value="approved">
                                                    Approved
                                                  </option>
                                                  <option value="active">
                                                    Active
                                                  </option>
                                                  <option value="inactive">
                                                    Inactive
                                                  </option>
                                                  <option value="suspended">
                                                    Suspended
                                                  </option>
                                                </>
                                              )}
                                            </select>

                                            <label className="block text-xs text-gray-500 mb-1">
                                              Description:
                                            </label>
                                            <textarea
                                              value={
                                                statusUpdateMap[item.id]
                                                  ?.description || ""
                                              }
                                              required
                                              onChange={(e) =>
                                                setStatusUpdateMap((prev) => ({
                                                  ...prev,
                                                  [item.id]: {
                                                    ...prev[item.id],
                                                    description: e.target.value,
                                                  },
                                                }))
                                              }
                                              className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                                              rows={2}
                                              placeholder="Add a note..."
                                            />

                                            <div className="flex justify-end mt-3 gap-2">
                                              <button
                                                onClick={() =>
                                                  setStatusPopoverId(null)
                                                }
                                                className="px-3 py-1 rounded text-xs bg-gray-200 hover:bg-gray-300 transition-colors">
                                                Cancel
                                              </button>
                                              <button
                                                onClick={() =>
                                                  handleStatusUpdate(
                                                    item.id,
                                                    view === "requests"
                                                      ? "request"
                                                      : "user"
                                                  )
                                                }
                                                disabled={statusLoading}
                                                className="px-3 py-1 rounded text-xs bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors">
                                                {statusLoading
                                                  ? "Updating..."
                                                  : "Update"}
                                              </button>
                                            </div>
                                          </div>
                                        )}
                                      </td>

                                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                          {view === "requests" && (
                                            <>
                                              <button
                                                title="View Details"
                                                onClick={() =>
                                                  handleViewRequest(item.id)
                                                }
                                                className="p-1 text-green-500 hover:text-green-700 hover:bg-green-50 rounded transition-colors">
                                                <Eye size={16} />
                                              </button>
                                              <button
                                                title="View Complete History"
                                                onClick={() =>
                                                  handleViewCompleteHistory(
                                                    item.id,
                                                    item.name
                                                  )
                                                }
                                                className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors">
                                                <FileText size={16} />
                                              </button>
                                            </>
                                          )}
                                          {view === "users" && (
                                            <>
                                              <button
                                                title="View Status History"
                                                onClick={() =>
                                                  handleViewUserHistory(
                                                    item.id,
                                                    item.name
                                                  )
                                                }
                                                className="p-1 text-purple-500 hover:text-purple-700 hover:bg-purple-50 rounded transition-colors">
                                                <History size={16} />
                                              </button>
                                              <button
                                                title="Edit"
                                                onClick={() =>
                                                  handleEditUser(item)
                                                }
                                                className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors">
                                                <Edit size={16} />
                                              </button>
                                              <button
                                                title="Delete"
                                                onClick={() =>
                                                  handleDeleteUser(item.id)
                                                }
                                                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors">
                                                <Trash2 size={16} />
                                              </button>
                                            </>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan={7}
                                      className={`px-6 py-8 text-center text-sm ${themeClasses.table.cell}`}>
                                      <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                          <Users
                                            size={24}
                                            className="text-gray-400"
                                          />
                                        </div>
                                        <p className="text-gray-500">
                                          No {view} found
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">
                                          {(
                                            view === "requests"
                                              ? requestSearchQuery
                                              : userSearchQuery
                                          )
                                            ? "Try adjusting your search"
                                            : `No ${view} available`}
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })()}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination */}
                        {(() => {
                          const data =
                            view === "requests"
                              ? getFilteredRequests()
                              : getFilteredUsers();
                          const currentPage =
                            view === "requests" ? requestPage : userPage;
                          const pageSize =
                            view === "requests"
                              ? requestPageSize
                              : userPageSize;
                          const totalPages = getTotalPages(
                            data.length,
                            pageSize
                          );

                          if (totalPages > 1) {
                            return (
                              <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                                <div className="flex-1 flex justify-between sm:hidden">
                                  <button
                                    onClick={() => {
                                      if (currentPage > 1) {
                                        if (view === "requests") {
                                          dispatch(
                                            setRequestPage(currentPage - 1)
                                          );
                                        } else {
                                          dispatch(
                                            setUserPage(currentPage - 1)
                                          );
                                        }
                                      }
                                    }}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors">
                                    Previous
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (currentPage < totalPages) {
                                        if (view === "requests") {
                                          dispatch(
                                            setRequestPage(currentPage + 1)
                                          );
                                        } else {
                                          dispatch(
                                            setUserPage(currentPage + 1)
                                          );
                                        }
                                      }
                                    }}
                                    disabled={currentPage === totalPages}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors">
                                    Next
                                  </button>
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                  <div>
                                    <p className="text-sm text-gray-700">
                                      Showing{" "}
                                      <span className="font-medium">
                                        {(currentPage - 1) * pageSize + 1}
                                      </span>{" "}
                                      to{" "}
                                      <span className="font-medium">
                                        {Math.min(
                                          currentPage * pageSize,
                                          data.length
                                        )}
                                      </span>{" "}
                                      of{" "}
                                      <span className="font-medium">
                                        {data.length}
                                      </span>{" "}
                                      results
                                    </p>
                                  </div>
                                  <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                      <button
                                        onClick={() => {
                                          if (currentPage > 1) {
                                            if (view === "requests") {
                                              dispatch(
                                                setRequestPage(currentPage - 1)
                                              );
                                            } else {
                                              dispatch(
                                                setUserPage(currentPage - 1)
                                              );
                                            }
                                          }
                                        }}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors">
                                        <ChevronLeft size={16} />
                                      </button>
                                      {Array.from(
                                        { length: Math.min(totalPages, 5) },
                                        (_, i) => {
                                          let page;
                                          if (totalPages <= 5) {
                                            page = i + 1;
                                          } else if (currentPage <= 3) {
                                            page = i + 1;
                                          } else if (
                                            currentPage >=
                                            totalPages - 2
                                          ) {
                                            page = totalPages - 4 + i;
                                          } else {
                                            page = currentPage - 2 + i;
                                          }

                                          return (
                                            <button
                                              key={page}
                                              onClick={() => {
                                                if (view === "requests") {
                                                  dispatch(
                                                    setRequestPage(page)
                                                  );
                                                } else {
                                                  dispatch(setUserPage(page));
                                                }
                                              }}
                                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                                                page === currentPage
                                                  ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                              }`}>
                                              {page}
                                            </button>
                                          );
                                        }
                                      )}
                                      <button
                                        onClick={() => {
                                          if (currentPage < totalPages) {
                                            if (view === "requests") {
                                              dispatch(
                                                setRequestPage(currentPage + 1)
                                              );
                                            } else {
                                              dispatch(
                                                setUserPage(currentPage + 1)
                                              );
                                            }
                                          }
                                        }}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors">
                                        <ChevronRight size={16} />
                                      </button>
                                    </nav>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </main>
        </div>

        {/* User Form Modal */}
        <Modal
          isOpen={showUserForm}
          onClose={() => {
            setShowUserForm(false);
            setEditingUser(null);
            setUserFormData({
              name: "",
              email: "",
              password: "",
              type: "salon",
              mobile_no: "",
              address: "",
              location: "",
            });
          }}
          title={editingUser ? "Edit User" : "Create New User"}
          size="md">
          <form onSubmit={handleUserFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  value={userFormData.name}
                  onChange={(e) =>
                    setUserFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={userFormData.email}
                  onChange={(e) =>
                    setUserFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={userFormData.mobile_no}
                  onChange={(e) =>
                    setUserFormData((prev) => ({
                      ...prev,
                      mobile_no: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={userFormData.password}
                    onChange={(e) =>
                      setUserFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={!editingUser}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type *</label>
                <select
                  value={userFormData.type}
                  onChange={(e) =>
                    setUserFormData((prev) => ({
                      ...prev,
                      type: e.target.value as "salon" | "freelancer",
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="salon">Salon</option>
                  <option value="freelancer">Freelancer</option>
                </select>
              </div>
              {/* <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={userFormData.status}
                  onChange={(e) =>
                    setUserFormData((prev) => ({
                      ...prev,
                      status: e.target.value as
                        | "pending"
                        | "approved"
                        | "active"
                        | "inactive"
                        | "suspended",
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div> */}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                value={userFormData.address}
                onChange={(e) =>
                  setUserFormData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={userFormData.location}
                onChange={(e) =>
                  setUserFormData((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowUserForm(false);
                  setEditingUser(null);
                  setUserFormData({
                    name: "",
                    email: "",
                    password: "",
                    type: "salon",
                    mobile_no: "",
                    address: "",
                    location: "",
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition-all">
                {editingUser ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </Modal>

        {/* Request Detail Modal */}
        <Modal
          isOpen={showRequestDetail}
          onClose={() => {
            setShowRequestDetail(false);
            dispatch(clearCurrentRequest());
          }}
          title="Request Details"
          size="lg">
          {currentRequest && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Full Name
                    </label>
                    <p className="text-lg font-semibold">
                      {currentRequest.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Email Address
                    </label>
                    <p className="text-gray-900">{currentRequest.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Mobile Number
                    </label>
                    <p className="text-gray-900">
                      {currentRequest.mobile_no || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Type
                    </label>
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        currentRequest.type === "salon"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                      }`}>
                      {currentRequest.type}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Location
                    </label>
                    <p className="text-gray-900">
                      {currentRequest.location || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Current Status
                    </label>
                    <StatusBadge
                      status={currentRequest.status}
                      type="request"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Remarks
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                  {currentRequest.remark || "No remarks provided"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Created Date
                  </label>
                  <p className="text-gray-900">
                    {new Date(currentRequest.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Request ID
                  </label>
                  <p className="text-gray-900 font-mono text-sm">
                    {currentRequest.id}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* User Status History Modal */}
        {selectedUserForHistory && (
          <UserStatusHistoryModal
            isOpen={showStatusHistory}
            onClose={() => {
              setShowStatusHistory(false);
              setSelectedUserForHistory(null);
            }}
            userId={selectedUserForHistory.id}
            userName={selectedUserForHistory.name}
          />
        )}

        {/* Complete Request History Modal */}
        {selectedRequestForHistory && (
          <CompleteHistoryModal
            isOpen={showCompleteHistory}
            onClose={() => {
              setShowCompleteHistory(false);
              setSelectedRequestForHistory(null);
            }}
            requestId={selectedRequestForHistory.id}
            requestName={selectedRequestForHistory.name}
          />
        )}
      </div>
    </RequireAuth>
  );
};

export default DashboardPage;

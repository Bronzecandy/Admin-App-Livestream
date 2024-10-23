/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { FiEye, FiHeart, FiUsers, FiVideo } from 'react-icons/fi';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Mock data generator with real days data
const generateMockData = (days = 30) => {
  const data = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.unshift({
      date: date.toLocaleDateString(),
      views: Math.floor(Math.random() * 1000) + 500,
      likes: Math.floor(Math.random() * 200) + 100,
      comments: Math.floor(Math.random() * 50) + 20,
      shares: Math.floor(Math.random() * 30) + 10,
      activeUsers: Math.floor(Math.random() * 300) + 200,
      newVideos: Math.floor(Math.random() * 20) + 5,
    });
  }
  return data;
};

// Mock user data
const mockUserData = [
  { id: 1, username: "Nguyễn Văn Sơn", loginCount: 45, onlineTime: "12h 30m", lastActive: "2024-03-15" },
  { id: 2, username: "Trần Ngọc Thành Nam", loginCount: 32, onlineTime: "8h 45m", lastActive: "2024-03-18" },
  { id: 3, username: "Đỗ Văn Minh Quân", loginCount: 28, onlineTime: "6h 20m", lastActive: "2024-05-20" },
  { id: 4, username: "Trần Chí Công", loginCount: 56, onlineTime: "15h 10m", lastActive: "2024-07-23" },
];

// Mock video data
const mockVideoData = [
  { id: 1, title: "Live Gaming Session", views: 1200, likes: 450, comments: 89, duration: "1:30:00" },
  { id: 2, title: "Cooking Tutorial", views: 850, likes: 320, comments: 45, duration: "45:00" },
  { id: 3, title: "Music Performance", views: 2300, likes: 890, comments: 156, duration: "1:00:00" },
  { id: 4, title: "Tech Review", views: 1500, likes: 560, comments: 92, duration: "25:00" },
];

// Stat Card Component
const StatCard = ({ icon: Icon, title, value, className }) => (
  <div className={`p-6 rounded-lg shadow-md bg-white ${className}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value.toLocaleString()}</h3>
      </div>
      <div className="p-3 rounded-full bg-blue-100">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>
);

const VideoReport = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [analyticsData, setAnalyticsData] = useState([]);
  const [activeTab, setActiveTab] = useState('views');
  
  useEffect(() => {
    // Simulate API call
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    setAnalyticsData(generateMockData(days));
  }, [timeRange]);

  const timeRangeButtons = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
  ];

  const tabs = [
    { value: 'views', label: 'Views & Engagement' },
    { value: 'users', label: 'User Activity' },
    { value: 'videos', label: 'Video Performance' },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Video Analytics Dashboard</h1>
        <div className="flex space-x-2">
          {timeRangeButtons.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setTimeRange(value)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeRange === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={FiEye}
          title="Total Views"
          value={analyticsData.reduce((sum, day) => sum + day.views, 0)}
        />
        <StatCard
          icon={FiHeart}
          title="Total Likes"
          value={analyticsData.reduce((sum, day) => sum + day.likes, 0)}
        />
        <StatCard
          icon={FiUsers}
          title="Active Users"
          value={analyticsData[analyticsData.length - 1]?.activeUsers || 0}
        />
        <StatCard
          icon={FiVideo}
          title="New Videos"
          value={analyticsData.reduce((sum, day) => sum + day.newVideos, 0)}
        />
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className={`py-2 px-4 border-b-2 transition-colors ${
                activeTab === value
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        {activeTab === 'views' && (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#3B82F6" name="Views" />
                <Line type="monotone" dataKey="likes" stroke="#10B981" name="Likes" />
                <Line type="monotone" dataKey="comments" stroke="#F59E0B" name="Comments" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-semibold text-gray-600">Username</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Login Count</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Online Time</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {mockUserData.map(user => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4">{user.username}</td>
                    <td className="p-4">{user.loginCount}</td>
                    <td className="p-4">{user.onlineTime}</td>
                    <td className="p-4">{user.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-semibold text-gray-600">Title</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Views</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Likes</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Comments</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Duration</th>
                </tr>
              </thead>
              <tbody>
                {mockVideoData.map(video => (
                  <tr key={video.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4">{video.title}</td>
                    <td className="p-4">{video.views}</td>
                    <td className="p-4">{video.likes}</td>
                    <td className="p-4">{video.comments}</td>
                    <td className="p-4">{video.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoReport;
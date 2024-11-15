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
  ResponsiveContainer,
} from 'recharts';
import StatCard from './StatCard';
import LoadingSpinner from './LoadingSpinner';
import NewUsersStats from './StatsNewUsers';
import StatsRevenue from './StatsRevenue';
import StatsVideos from './StatsVideos';
import StatsStream from './StatsStream';

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

const VideoReport = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [activeTab, setActiveTab] = useState('views');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setAnalyticsData(generateMockData(90));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (tab) => {
    setLoading(true);
    setActiveTab(tab);
    // Simulate loading data for new tab
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const tabs = [
    { value: 'views', label: 'Views & Engagement' },
    { value: 'revenue', label: 'Revenue' },
    { value: 'users', label: 'User Activity' },
    { value: 'videos', label: 'Video Performance' },
    { value: 'streams', label: 'Stream Performance' },
  ];

  const totalViews = analyticsData.reduce((sum, day) => sum + day.views, 0);
  const totalLikes = analyticsData.reduce((sum, day) => sum + day.likes, 0);
  const totalActiveUsers = analyticsData[analyticsData.length - 1]?.activeUsers || 0;
  const totalNewVideos = analyticsData.reduce((sum, day) => sum + day.newVideos, 0);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Video Analytics Dashboard</h1>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              icon={FiEye}
              title="Total Views"
              value={totalViews}
            />
            <StatCard
              icon={FiHeart}
              title="Total Likes"
              value={totalLikes}
            />
            <StatCard
              icon={FiUsers}
              title="Active Users"
              value={totalActiveUsers}
            />
            <StatCard
              icon={FiVideo}
              title="New Videos"
              value={totalNewVideos}
            />
          </div>

          {/* Tabs Navigation and Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex border-b border-gray-200 mb-6">
              {tabs.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => handleTabChange(value)}
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

            {activeTab === 'revenue' && (
              <div className="space-y-6">
                <StatsRevenue />
              </div>
            )}

            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <NewUsersStats />
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="overflow-x-auto">
                <StatsVideos />
              </div>
            )}

            {activeTab === 'streams' && (
              <div className="overflow-x-auto">
                <StatsStream />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoReport;
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
  Area,
  AreaChart
} from 'recharts';
import StatCard from './Statcard';
import LoadingSpinner from './LoadingSpinner';
import NewUsersStats from './NewUsersStats';

// Mock data generator with real days data
const generateMockData = (days = 30) => {
  const data = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const views = Math.floor(Math.random() * 1000) + 500;
    const adsRevenue = views * (Math.random() * 0.3 + 0.2); // $0.2-0.5 per view
    const subscriptionRevenue = views * (Math.random() * 0.4 + 0.3); // $0.3-0.7 per view
    const donationRevenue = views * (Math.random() * 0.2 + 0.1); // $0.1-0.3 per view

    data.unshift({
      date: date.toLocaleDateString(),
      views: Math.floor(Math.random() * 1000) + 500,
      likes: Math.floor(Math.random() * 200) + 100,
      comments: Math.floor(Math.random() * 50) + 20,
      shares: Math.floor(Math.random() * 30) + 10,
      activeUsers: Math.floor(Math.random() * 300) + 200,
      newVideos: Math.floor(Math.random() * 20) + 5,
      adsRevenue: parseFloat(adsRevenue.toFixed(2)),
      subscriptionRevenue: parseFloat(subscriptionRevenue.toFixed(2)),
      donationRevenue: parseFloat(donationRevenue.toFixed(2)),
      totalRevenue: parseFloat((adsRevenue + subscriptionRevenue + donationRevenue).toFixed(2)),
    });
  }
  return data;
};

// Mock video data
const mockVideoData = [
  { id: 1, title: "Live Gaming Session", views: 1200, likes: 450, comments: 89, duration: "1:30:00" },
  { id: 2, title: "Cooking Tutorial", views: 850, likes: 320, comments: 45, duration: "45:00" },
  { id: 3, title: "Music Performance", views: 2300, likes: 890, comments: 156, duration: "1:00:00" },
  { id: 4, title: "Tech Review", views: 1500, likes: 560, comments: 92, duration: "25:00" },
];

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

  const totalRevenue = analyticsData.reduce((sum, day) => sum + day.totalRevenue, 0);
  const totalAdsRevenue = analyticsData.reduce((sum, day) => sum + day.adsRevenue, 0);
  const totalSubscriptionRevenue = analyticsData.reduce((sum, day) => sum + day.subscriptionRevenue, 0);
  const totalDonationRevenue = analyticsData.reduce((sum, day) => sum + day.donationRevenue, 0);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Video Analytics Dashboard</h1>
      </div>

      {/* Main content with loading state */}
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-sm text-blue-600">Ads Revenue</h3>
                    <p className="text-xl font-bold">${totalAdsRevenue.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="text-sm text-green-600">Subscription Revenue</h3>
                    <p className="text-xl font-bold">${totalSubscriptionRevenue.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="text-sm text-purple-600">Donation Revenue</h3>
                    <p className="text-xl font-bold">${totalDonationRevenue.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm text-gray-600">Total Revenue</h3>
                    <p className="text-xl font-bold">${totalRevenue.toFixed(2)}</p>
                  </div>
                </div>

                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="adsRevenue" stackId="1" stroke="#3B82F6" fill="#3B82F6" name="Ads" />
                      <Area type="monotone" dataKey="subscriptionRevenue" stackId="1" stroke="#10B981" fill="#10B981" name="Subscriptions" />
                      <Area type="monotone" dataKey="donationRevenue" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" name="Donations" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <NewUsersStats />
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

            {activeTab === 'streams' && (
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
        </>
      )}
    </div>
  );
};

export default VideoReport;
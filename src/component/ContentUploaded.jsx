import React, { useState } from 'react';
import { FiVideo, FiImage, FiEdit2, FiTrash2, FiEye, FiDownload, FiFilter } from 'react-icons/fi';

export default function ContentUploaded() {
  const [contents, setContents] = useState([
    { id: 1, type: 'video', title: 'Epic Gaming Session', status: 'Processing', duration: '2:15:30', thumbnail: '/placeholder.svg?height=80&width=120', views: 1200, date: '2023-05-15' },
    { id: 2, type: 'image', title: 'Stream Highlight', status: 'Published', views: 3500, date: '2023-05-14' },
    { id: 3, type: 'video', title: 'Q&A with Fans', status: 'Ready', duration: '45:20', thumbnail: '/placeholder.svg?height=80&width=120', views: 800, date: '2023-05-13' },
    { id: 4, type: 'image', title: 'New Emote Reveal', status: 'Published', views: 5000, date: '2023-05-12' },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredContents = filter === 'all' ? contents : contents.filter(content => content.type === filter);

  const handleDelete = (id) => {
    setContents(contents.filter(content => content.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-200 text-yellow-800';
      case 'Ready': return 'bg-blue-200 text-blue-800';
      case 'Published': return 'bg-green-200 text-green-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Livestream Content Manager</h1>
      
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-4 py-2 rounded-md ${filter === 'video' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
          >
            <FiVideo className="inline mr-2" />
            Videos
          </button>
          <button
            onClick={() => setFilter('image')}
            className={`px-4 py-2 rounded-md ${filter === 'image' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
          >
            <FiImage className="inline mr-2" />
            Images
          </button>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          <FiFilter className="inline mr-2" />
          Advanced Filters
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContents.map((content) => (
              <tr key={content.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-20 w-32">
                      {content.type === 'video' ? (
                        <img className="h-20 w-32 object-cover" src={content.thumbnail} alt="" />
                      ) : (
                        <div className="h-20 w-32 bg-gray-200 flex items-center justify-center">
                          <FiImage className="text-gray-400 text-4xl" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{content.title}</div>
                      <div className="text-sm text-gray-500">
                        {content.type === 'video' && `Duration: ${content.duration}`}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(content.status)}`}>
                    {content.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {content.views.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {content.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    <FiEye className="inline" />
                  </button>
                  <button className="text-green-600 hover:text-green-900 mr-3">
                    <FiEdit2 className="inline" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 mr-3" onClick={() => handleDelete(content.id)}>
                    <FiTrash2 className="inline" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <FiDownload className="inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
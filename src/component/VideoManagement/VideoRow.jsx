import React from 'react';

const VideoRow = ({ video, onEdit, onDelete, onPlay }) => {
    function formatDate(date) {
        return new Date(date).toLocaleString();
    }

    return (
        <tr key={video._id} className="hover:bg-gray-50 transition-colors duration-300 border-b">
            <td className="px-6 py-4 text-gray-800 font-medium">
                {video.title.length > 30 ? `${video.title.substring(0, 30)}...` : video.title}
            </td>

            <td className="px-6 py-4 text-gray-700">{video.description}</td>
           
            <td className="px-6 py-4 text-gray-700"> <img crossOrigin="anonymous" src={video.thumbnailUrl} alt="" /></td>
            <td className="px-6 py-4 text-gray-700">
                {video.isUploaded ? (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}
            </td>
           
            <td className="px-6 py-4 text-gray-700">{video.numOfViews}</td>
            <td className="px-6 py-4 text-gray-700">
                <span className={`px-2 py-1 rounded-full text-sm ${video.enumMode === 'public' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {video.enumMode}
                </span>
            </td>
            <td className="px-6 py-4 text-gray-700">{video.dateCreated ? formatDate(video.dateCreated) : 'N/A'}</td>
            <td className="px-6 py-4 text-center">
                <button onClick={() => onPlay(video)} className="text-green-500 hover:text-green-700">
                    Watch
                </button>
            </td>
            <td className="px-6 py-4">
                <div className="flex justify-end space-x-2">
                    <button onClick={() => onEdit(video)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        Edit
                    </button>
                    <button onClick={() => onDelete(video._id)} className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default VideoRow;

import React from 'react';

const VideoRow = ({ video, onEdit, onDelete, onPlay }) => {
    return (
        <tr key={video.id} className="hover:bg-gray-50 transition-colors duration-300 rounded-lg shadow">
            <td className="border px-6 py-4 text-gray-800 font-medium">{video.title}</td>
            <td className="border px-6 py-4 text-gray-700">{video.description}</td>
            <td className="border px-6 py-4 text-gray-700">{video.duration}</td>
            <td className="border px-6 py-4 text-gray-700">{video.size}</td>
            <td className="border px-6 py-4 text-gray-700">{video.quality}</td>
            <td className="border px-6 py-4 text-gray-700">{new Date(video.upload_time).toLocaleString()}</td>
            <td className="border px-6 py-4 text-center">
                <button
                    onClick={() => onPlay(video)}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
                >
                    Xem
                </button>
            </td>
            <td className="border px-6 py-4 ">
                <div className='flex justify-center items-center  space-x-2'>
                    <button
                        onClick={() => onEdit(video)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
                    >
                        Sửa
                    </button>
                    <button
                        onClick={() => onDelete(video.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
                    >
                        Xóa
                    </button>
                </div>
            </td>

            
        </tr>


    );
};

export default VideoRow;

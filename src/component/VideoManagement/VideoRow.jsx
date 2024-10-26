import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { MdOndemandVideo } from 'react-icons/md';

const VideoRow = ({ video, onEdit, onDelete, onPlay }) => {
    function formatDuration(duration) {
        const hours = duration.match(/(\d+)H/)?.[1] || '00';
        const minutes = duration.match(/(\d+)M/)?.[1] || '00';
        const seconds = duration.match(/(\d+)S/)?.[1] || '00';

        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }

    return (
        <tr key={video.id} className="hover:bg-gray-50 transition-colors duration-300  border-b">
            <td className=" px-6 py-4 text-gray-800 font-medium">{video.title}</td>
            <td className=" px-6 py-4 text-gray-700">{video.description}</td>
            <td className=" px-6 py-4 text-gray-700">{formatDuration(video.duration)}</td>
            <td className=" px-6 py-4 text-gray-700">{video.size}</td>
            <td className=" px-6 py-4 text-gray-700">{video.quality}</td>
            <td className=" px-6 py-4 text-gray-700">{new Date(video.upload_time).toLocaleString()}</td>
            <td className=" px-6 py-4 text-center">
                <button
                    onClick={() => onPlay(video)}
                    className="text-green-500 hover:text-green-700"
                    >
                    watch
                </button>
            </td>
            <td className=" px-6 py-4 ">
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => onEdit(video)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(video.id)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                    >
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

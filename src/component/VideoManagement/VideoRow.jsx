import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { MdOndemandVideo } from 'react-icons/md';

const VideoRow = ({ video, onEdit, onDelete, onPlay }) => {
    return (
        <tr key={video.id} className="hover:bg-gray-50 transition-colors duration-300  shadow">
            <td className=" px-6 py-4 text-gray-800 font-medium">{video.title}</td>
            <td className=" px-6 py-4 text-gray-700">{video.description}</td>
            <td className=" px-6 py-4 text-gray-700">{video.duration}</td>
            <td className=" px-6 py-4 text-gray-700">{video.size}</td>
            <td className=" px-6 py-4 text-gray-700">{video.quality}</td>
            <td className=" px-6 py-4 text-gray-700">{new Date(video.upload_time).toLocaleString()}</td>
            <td className=" px-6 py-4 text-center">
                <button
                    onClick={() => onPlay(video)}
                    className="text-green-500 hover:text-green-700"
                    >
                    <MdOndemandVideo className='text-2xl' />
                </button>
            </td>
            <td className=" px-6 py-4 ">
                <div className='flex justify-center items-center  space-x-2'>
                    <button
                        onClick={() => onEdit(video)}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        <FaEdit className='text-2xl' />
                    </button>
                    <button
                        onClick={() => onDelete(video.id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        <FaTrashAlt className='text-2xl' />
                    </button>
                </div>
            </td>

            
        </tr>


    );
};

export default VideoRow;

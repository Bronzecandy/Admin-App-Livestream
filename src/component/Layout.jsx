import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaMusic, FaList, FaGift, FaUpload, FaComment, FaChartBar, FaBars, FaTimes } from 'react-icons/fa';
import { GoBell } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom';
const Layout = ({ children }) => {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const sidebarRef = useRef();

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setSidebarToggle(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='flex h-screen overflow-hidden'>
            {/* Side Bar */}
            <div ref={sidebarRef} className={`h-screen w-72 bg-[#1c2434] text-white lg:static absolute z-20 ${sidebarToggle ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-all duration-300`}>
                <div className="flex p-4 text-center text-2xl font-bold  justify-between items-center">
                    <p>Admin Dashboard</p>
                    <div className='text-gray-500 block border border-gray-500 lg:hidden p-2 rounded-lg' onClick={() => setSidebarToggle(false)}>
                        <FaTimes />
                    </div>
                </div>
                <div className="py-8 px-4">
                    <ul className="space-y-4">
                        <li className="hover:bg-gray-700 p-2 rounded">
                            <Link to="/" className="flex items-center space-x-3">
                                <FaUser />
                                <span>Quản lý người dùng</span>
                            </Link>
                        </li>
                        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
                            <Link to="/video-manage" className="flex items-center space-x-3">
                                <FaMusic />
                                <span>Quản lý Video/Âm nhạc</span>
                            </Link>
                        </li>

                        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
                            <FaList />
                            <span>Thể loại</span>
                        </li>
                        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
                            <Link to="/point-management" className='flex items-center space-x-3'>
                                <FaGift />
                                <span>Điểm thưởng</span>
                            </Link>
                        </li>
                        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
                            <Link to="/content-uploaded" className='flex items-center space-x-3'>
                                <FaUpload />
                                <span>Nội dung tải lên</span>
                            </Link>
                        </li>
                        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
                            <FaComment />
                            <span>Quản lý bình luận</span>
                        </li>
                        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
                            <Link to="/video-reports" className="flex items-center space-x-3">
                                <FaChartBar />
                                <span>Thống kê báo cáo</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden '>
                <div className="sticky top-0 z-999 w-full bg-white shadow px-8 lg:px-4 py-5 flex justify-between items-center">
                    {/* Search Bar */}
                    <div className="flex items-center space-x-4">
                        <div className='block lg:hidden rounded-sm border border-stroke p-2 shadow-sm dark:border-strokedark dark:bg-boxdark text-2xl rounded-xl' onClick={() => setSidebarToggle(true)}>
                            <FaBars />
                        </div>
                        <div className="flex items-center border border-[#64748b] rounded-3xl w-80 px-4 py-2 focus-within:border-[#3c50e0] ">
                            <input
                                type="text"
                                className="flex-grow outline-none"
                                placeholder="Tìm kiếm..."
                            />
                            <IoIosSearch className=" text-[#64748b] text-2xl hover:text-[#3c50e0]  cursor-pointer" />
                        </div>
                    </div>
                    {/* Notifications */}
                    <div className="flex items-center gap-8 h-full mr-4">
                        <div className="relative h-5/6  p-1.5 border border-[#e2e8f0] rounded-full bg-[#eff4fb] group">
                            <GoBell className="text-xl text-gray-600 h-full w-full group-hover:text-[#3c50e0]" />
                            <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-red-500 inline"
                            ><span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-300"></span>
                            </span>
                        </div>

                        <div className='flex gap-4 h-full'>
                            <div className='text-right'>
                                <p className='text-sm'>Name</p>
                                <p className='text-xs'>Role</p>
                            </div>
                            <div className='class="relative h-full  p-1.5 border border-[#e2e8f0] rounded-full bg-[#eff4fb] group"'>
                                <CiUser className="text-xl text-gray-600 h-full flex w-full" />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex-1 bg-[#f1f5f9] p-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;

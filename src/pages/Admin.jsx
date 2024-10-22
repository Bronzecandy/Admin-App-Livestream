import React from 'react'
import Layout from '../component/Layout'
import UserTable from '../component/UserTable'
import VideoManager from '../component/VideoManagement/VideoManager'
import { Routes, Route } from 'react-router-dom';

function Admin() {
    return (
        <>
            <Layout>
                <div className="bg-white p-6 rounded shadow">
                        <Routes>
                            <Route path="/" element={<UserTable/>} />
                            <Route path="/video-manage" element={<VideoManager />} />
                        </Routes>
                </div>
            </Layout>
        </>
    )
}

export default Admin
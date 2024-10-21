import React from 'react'
import Layout from '../component/Layout'
import VideoManager from '../component/VideoManagement/VideoManager'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Admin() {
    return (
        <>
            <Layout>
                <div className="bg-white p-6 rounded shadow">
                        <Routes>
                            <Route path="/" element={<h1>Trang Admin</h1>} />
                            <Route path="/video-manage" element={<VideoManager />} />
                        </Routes>
                </div>
            </Layout>
        </>
    )
}

export default Admin
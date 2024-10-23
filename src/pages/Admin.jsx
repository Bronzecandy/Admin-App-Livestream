import React from 'react'
import Layout from '../component/Layout'
import UserTable from '../component/UserTable'
import VideoManager from '../component/VideoManagement/VideoManager'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoReports from '../component/VideoReports/VideoReports';


function Admin() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<UserTable />} />
                    <Route path="/video-manage" element={<VideoManager />} />
                    <Route path="/video-reports" element={<VideoReports />} />
                </Routes>
            </Layout>
        </>
    )
}

export default Admin
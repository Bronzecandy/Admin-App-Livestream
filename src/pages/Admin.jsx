import React from 'react'
import Layout from '../component/Layout'
import UserTable from '../component/UserTable'
import VideoManager from '../component/VideoManagement/VideoManager'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoCategories from '../component/VideoCategories/VideoCategories';


function Admin() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<UserTable />} />
                    <Route path="/video-manage" element={<VideoManager />} />
                    <Route path="/video-categories" element={<VideoCategories />} />
                </Routes>
            </Layout>
        </>
    )
}

export default Admin
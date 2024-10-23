import React from 'react'
import Layout from '../component/Layout'
import UserTable from '../component/UserTable'
import CommentManagement from '../component/CommentManagement/CommentManagement'
import VideoManager from '../component/VideoManagement/VideoManager'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function Admin() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<UserTable />} />
                    <Route path="/video-manage" element={<VideoManager />} />
                    <Route path="/cmt-manage" element={<CommentManagement />} />
                </Routes>
            </Layout>
        </>
    )
}

export default Admin
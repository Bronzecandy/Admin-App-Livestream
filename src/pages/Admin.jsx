import React from 'react'
import Layout from '../component/Layout'
import UserTable from '../component/UserTable'
import CommentManagement from '../component/CommentManagement/CommentManagement'
import VideoManager from '../component/VideoManagement/VideoManager'
import PointManagement from '../component/PointManagement'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContentUploaded from './../component/ContentUploaded';
import VideoReports from '../component/VideoReports/VideoReports';


function Admin() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<UserTable />} />
                    <Route path="/video-manage" element={<VideoManager />} />
                    <Route path='/point-management' element={<PointManagement/>} />
                    <Route path='/content-uploaded' element={<ContentUploaded/>} />
                    <Route path="/video-reports" element={<VideoReports />} />
                    <Route path="/cmt-manage" element={<CommentManagement />} />
                </Routes>
            </Layout>
        </>
    )
}

export default Admin
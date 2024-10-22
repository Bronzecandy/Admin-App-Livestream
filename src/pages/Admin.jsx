import React from 'react'
import Layout from '../component/Layout'
import PointManagement from '../component/PointManagement'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContentUploaded from './../component/ContentUploaded';
function Admin() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path='/' element={<PointManagement/>} />
                    <Route path='/content-uploaded' element={<ContentUploaded/>} />
                </Routes>
            </Layout>
        </>
    )
}

export default Admin
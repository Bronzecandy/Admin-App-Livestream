import React from 'react'
import Layout from '../component/Layout'
import PointManagement from '../component/PointManagement'
import ContentUploaded from '../component/ContentUploaded'
import { Route, Routes } from 'react-router-dom';
function Admin() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path='/' element={<PointManagement/>} />
                </Routes>
            </Layout>
        </>
    )
}

export default Admin
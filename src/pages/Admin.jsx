import React from 'react'
import Layout from '../component/Layout'
import UserTable from '../component/UserTable'
import VideoManager from '../component/VideoManagement/VideoManager'


function Admin() {
    return (
        <>
            <Layout>
                <UserTable></UserTable>
            </Layout>
        </>
    )
}

export default Admin
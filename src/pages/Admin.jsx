import React from 'react'
import Layout from '../component/Layout'
import UserTable from '../component/UserTable'
function Admin() {
    return (
        <>
            <Layout>
                <div className="bg-white p-6 rounded shadow">
                    <UserTable/>
                </div>
            </Layout>
        </>
    )
}

export default Admin
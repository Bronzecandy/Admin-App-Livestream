import React from 'react'
import Layout from '../component/Layout'
import PointManagement from '../component/PointManagement'
import ContentUploaded from '../component/ContentUploaded'
function Admin() {
    return (
        <>
            <Layout>
                <div className="bg-white p-6 rounded shadow">
                    <p>Đây là khu vực nội dung chính của trang.</p>
                    <p>Bạn có thể thêm nhiều thông tin, bảng dữ liệu hoặc các thành phần tùy chỉnh ở đây.</p>
                    {/* Thêm nội dung mẫu để test scroll */}
                    <div className="mt-6 space-y-4">
                        {/* {[...Array(50)].map((_, i) => (
                            <p key={i}>Nội dung mẫu {i + 1}</p>
                        ))} */}
                        <PointManagement/>
                        <ContentUploaded/>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Admin
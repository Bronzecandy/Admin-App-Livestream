import React, { useState, useEffect } from 'react';

const AddVideoForm = ({ onAdd, onEdit, video }) => {
    const isEditing = !!video; // Kiểm tra xem có video để chỉnh sửa hay không
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        size: '',
        quality: '',
        upload_time: '',
        url: ''
    });

    // Nếu đang chỉnh sửa, populate form với dữ liệu video
    useEffect(() => {
        if (isEditing) {
            setFormData(video);
        }
    }, [isEditing, video]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            onEdit(formData); 
        } else {
            const newId = `video_${Math.random().toString(36).substring(2, 9)}`;
            onAdd({ ...formData, id: newId }); 
        }
        resetForm();
    };
    const formatDuration = (durationInSeconds) => {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            setFormData({ ...formData, url: videoURL });

            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            setFormData((prevData) => ({
                ...prevData,
                size: `${sizeInMB} MB`,
            }));

            const videoElement = document.createElement('video');
            videoElement.src = videoURL;

            videoElement.onloadedmetadata = () => {
                const durationInSeconds = Math.round(videoElement.duration);
                if (durationInSeconds > 0) {
                    const formattedDuration = formatDuration(durationInSeconds);
                    setFormData((prevData) => ({
                        ...prevData,
                        duration: formattedDuration, // Lưu thời gian dưới dạng hh:mm:ss
                        quality: file.type.split('/')[1].toUpperCase(),
                    }));
                } else {
                    console.error("Video không có thời gian.");
                    setFormData((prevData) => ({
                        ...prevData,
                        duration: "Không xác định",
                    }));
                }
            };

            videoElement.onerror = () => {
                console.error("Lỗi khi tải video.");
                setFormData((prevData) => ({
                    ...prevData,
                    duration: "Không xác định",
                }));
            };
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            duration: '',
            size: '',
            quality: '',
            upload_time: '',
            url: ''
        });
    };
    console.log(formData.upload_time);
    const formatDateForInput = (dateString) => {
        return dateString.slice(0, 16); // Lấy phần YYYY-MM-DDTHH:mm
    };
    
    return (
        <form className="mb-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <input
                    className="border p-2 rounded"
                    type="text"
                    placeholder="Tiêu đề"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
                <input
                    className="border p-2 rounded"
                    type="text"
                    placeholder="Mô tả"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                />
                <input
                    className="border p-2 rounded"
                    type="text"
                    placeholder="Thời gian"
                    value={formData.duration}
                    readOnly // Đặt là chỉ đọc
                    required
                />
                <input
                    className="border p-2 rounded"
                    type="text"
                    placeholder="Kích thước"
                    value={formData.size}
                    readOnly // Đặt là chỉ đọc
                    required
                />
                <input
                    className="border p-2 rounded"
                    type="text"
                    placeholder="Chất lượng"
                    value={formData.quality}
                    readOnly // Đặt là chỉ đọc
                    required
                />
                <input
                    className="border p-2 rounded"
                    type="datetime-local"
                    value={formatDateForInput(formData.upload_time)}
                    onChange={(e) => setFormData({ ...formData, upload_time: e.target.value })}
                    required
                />
                <input
                    className="border p-2 rounded"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white mt-4 px-6 py-2 rounded shadow hover:bg-blue-600"
            >
                {isEditing ? 'Cập nhật Video' : 'Thêm Video'} {/* Thay đổi nút dựa trên isEditing */}
            </button>
        </form>
    );
};

export default AddVideoForm;

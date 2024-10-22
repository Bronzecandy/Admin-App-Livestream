// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // Không hiển thị nếu không mở modal

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3 flex flex-col gap-4">
                <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-right">
                    &times; {/* Icon close */}
                </button>
                {children} {/* Nội dung của modal */}
            </div>
        </div>
    );
};

export default Modal;

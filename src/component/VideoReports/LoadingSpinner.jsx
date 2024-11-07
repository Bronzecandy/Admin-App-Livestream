/* eslint-disable react/prop-types */
import React from "react";

// Loading Spinner Component
const LoadingSpinner = ({ className }) => (
    <div className={`flex justify-center items-center ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-600"></div>
    </div>
);

export default LoadingSpinner;
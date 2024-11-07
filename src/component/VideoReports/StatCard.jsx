/* eslint-disable react/prop-types */
import React from "react";

// Stat Card Component
const StatCard = ({ icon: Icon, title, value, className }) => {
  let bgColor = 'bg-white';
  if (title === 'Today') {
    bgColor = 'bg-blue-100';
  } else if (title === 'This week') {
    bgColor = 'bg-green-100';
  } else if (title === 'This month') {
    bgColor = 'bg-yellow-100';
  }

  return (
    <div className={`p-6 rounded-lg shadow-md ${bgColor} ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold mt-1">
            {value.toLocaleString()}
          </h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-full ${bgColor}`}>
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;

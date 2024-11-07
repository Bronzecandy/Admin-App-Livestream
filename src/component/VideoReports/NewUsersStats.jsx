import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import StatCard from "./Statcard";
import LoadingSpinner from "./LoadingSpinner";

const NewUsersStats = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [newUsersData, setNewUsersData] = useState({
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        monthly: [],
    });

    const API_URL =
        "https://social-media-z5a2.onrender.com/api/statistics/users/new";
    const TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzFhMTRmNDZkMDUwODg0MjNlZWFiOTEiLCJpcCI6Ijo6MSIsImlhdCI6MTczMDQ2MDgxN30._dqyZS4blv-60Ii18LOfGNzkutur_fXJy80H1NKJyRE";

    useEffect(() => {
        const fetchNewUsersData = async () => {
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                        "Content-Type": "application/json",
                    },
                });
                setNewUsersData(response.data.newUsers);
            } catch (error) {
                console.error("Error fetching new users data:", error);
                setErrorMessage(
                    "Error fetching new users data. Please try again later."
                );
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchNewUsersData();
    }, []);

    const { today, thisWeek, thisMonth, monthly } = newUsersData;

    // Data format for column chart
    const formattedMonthlyData = Array.isArray(monthly)
        ? monthly.map((item) => ({
              monthYear: `${item._id.month}/${item._id.year}`,
              newUsersCount: item.newUsersCount,
          }))
        : [];

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Error:</strong>{" "}
                <span className="block sm:inline">{errorMessage}</span>
            </div>
        );
    }

    if (formattedMonthlyData.length === 0) {
        return (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
                No new users data available.
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Today" value={today} />
                <StatCard title="This week" value={thisWeek} />
                <StatCard title="This month" value={thisMonth} />
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Monthly New Users
                </h2>
                <div className="w-full h-80">
                    <ResponsiveContainer>
                        <BarChart
                            data={formattedMonthlyData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="monthYear" />
                            <YAxis />
                            <Tooltip className="bg-white shadow-md" />
                            <Bar dataKey="newUsersCount" fill="#4bc0c0" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default NewUsersStats;

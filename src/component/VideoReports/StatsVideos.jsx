import React, { useState, useEffect } from "react";
import StatCard from "./StatCard";
import LoadingSpinner from "./LoadingSpinner";
import VideoServices from "./VideoServices";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const StatsVideos = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [videoStats, setVideoStats] = useState({
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        total: 0,
        monthly: [],
    });

    useEffect(() => {
        const fetchVideosData = async () => {
            try {
                setLoading(true);
                const { videos } = await VideoServices.getVideoStats();
                setVideoStats(videos);
            } catch (error) {
                console.error("Error fetching video data:", error);
                setErrorMessage(
                    "Error fetching video data. Please try again later."
                );
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchVideosData();
    }, []);

    const { today, thisMonth, thisWeek, monthly, total } = videoStats;

    const formattedMonthlyData =
        Array.isArray(monthly) && monthly.length > 0
            ? monthly.map((item) => ({
                  monthYear: `${item._id.month}/${item._id.year}`,
                  videoCount: item.videoCount,
              }))
            : [{ monthYear: "No data", videoCount: 0 }];

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

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard title="Today Video" value={today} />
                <StatCard title="This week video" value={thisWeek} />
                <StatCard title="This month video" value={thisMonth} />
                <StatCard title="Total video" value={total} />
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Monthly Video Stats
                </h2>
                <div className="w-full h-80">
                    <ResponsiveContainer>
                        <LineChart data={formattedMonthlyData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip className="bg-white shadow-md" />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="videoCount"
                                stroke="#4bc0c0"
                                name="Total Video"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default StatsVideos;

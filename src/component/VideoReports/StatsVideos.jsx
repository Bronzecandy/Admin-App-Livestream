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

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchVideosData = async () => {
            try {
                setLoading(true);
                const { videos } = await VideoServices.getVideoStats(
                    selectedYear
                );
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
    }, [selectedYear]);

    const { today, thisMonth, thisWeek, monthly, total } = videoStats;

    const formattedMonthlyData = monthly
        .filter((item) => item._id.year === selectedYear)
        .map((item) => ({
            month: item._id.month,
            videoCount: item.videoCount,
        }));

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

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
                <div className="mb-4">
                    <label htmlFor="year-filter" className="mr-2">
                        Filter by year:
                    </label>
                    <select
                        id="year-filter"
                        value={selectedYear}
                        onChange={handleYearChange}
                        className="p-2 border rounded"
                    >
                        {Array.from(
                            { length: 5 },
                            (_, i) => new Date().getFullYear() - i
                        ).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {formattedMonthlyData.length > 0 ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            Monthly Video Stats
                        </h2>
                        <div className="w-full h-80">
                            <ResponsiveContainer>
                                <LineChart data={formattedMonthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis
                                        type="number"
                                        domain={["dataMin", "dataMax"]}
                                    />
                                    <Tooltip
                                        className="bg-white shadow-md"
                                        content={({ payload, label }) => (
                                            <div className="p-2">
                                                {payload &&
                                                payload.length > 0 &&
                                                typeof payload[0].value ===
                                                    "number" ? (
                                                    <p>
                                                        Total:{" "}
                                                        {payload[0].value}
                                                    </p>
                                                ) : (
                                                    <p>
                                                        No data available for{" "}
                                                        {label}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="videoCount"
                                        stroke="#3B82F6"
                                        name="Total Video"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ) : (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
                        No video data available.
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsVideos;
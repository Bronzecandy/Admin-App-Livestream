import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import StatCard from './Statcard';
import LoadingSpinner from './LoadingSpinner';
import VideoServices from './VideoServices';

const StatsRevenue = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [revenueData, setRevenueData] = useState({
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        monthly: [],
        total: 0,
    });
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                setLoading(true);
                const { revenue } = await VideoServices.getRevenueStats(selectedYear);
                setRevenueData(revenue);
            } catch (error) {
                console.error('Error fetching revenue data:', error);
                setErrorMessage('Error fetching revenue data. Please try again later.');
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchRevenueData();
    }, [selectedYear]);

    const { today, thisWeek, thisMonth, monthly, total } = revenueData;

    const formattedMonthlyData = monthly.filter(item => item.year === selectedYear).map((item) => ({
        month: item.month,
        totalAmount: item.totalAmount,
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
                <strong className="font-bold">Error:</strong>{' '}
                <span className="block sm:inline">{errorMessage}</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard title="Today Revenue" value={today.toFixed(2)} />
                <StatCard title="This Week Revenue" value={thisWeek.toFixed(2)} />
                <StatCard title="This Month Revenue" value={thisMonth.toFixed(2)} />
                <StatCard title="Total Revenue" value={total.toFixed(2)} />
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
                            (_, i) =>
                                new Date().getFullYear() - i
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
                            Monthly Revenue
                        </h2>
                        <div className="w-full h-80">
                            <ResponsiveContainer>
                                <LineChart data={formattedMonthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis type="number" domain={['dataMin', 'dataMax']} />
                                    <Tooltip
                                        className="bg-white shadow-md"
                                        content={({ payload, label }) => (
                                            <div className="p-2">
                                                {payload && payload.length > 0 && typeof payload[0].value === 'number' ? (
                                                    <p>Total: {payload[0].value}</p>
                                                ) : (
                                                    <p>No data available for {label}</p>
                                                )}
                                            </div>
                                        )}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="totalAmount"
                                        stroke="#3B82F6"
                                        name="Total"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ) : (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
                        No revenue data available.
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsRevenue;
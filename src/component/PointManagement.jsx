import React, { useState, useEffect } from 'react';
import { FaTwitch, FaStar, FaClock, FaSearch, FaPlay, FaStop, FaFastForward } from 'react-icons/fa';

export default function RewardPointManager() {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
    const interval = setInterval(() => {
      setCurrentTime(prevTime => {
        const newTime = new Date(prevTime.getTime() + 1000);
        // updatePoints(newTime);
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://social-media-z5a2.onrender.com/api/users?page=1&size=10');
      const data = await response.json();
      setAccounts(data.users);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAccounts = accounts.filter(account =>
    account.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /*************Từ phần này sẽ không hoạt động vì trái với nghiệp vụ***********************
  const updateAccountOnMockAPI = async (account) => {
    try {
      const response = await fetch(`https://6717fde3b910c6a6e02acc1a.mockapi.io/StreamerPoint/${account._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(account),
      });
      if (!response.ok) {
        throw new Error('Failed to update account on mockapi');
      }
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  const updatePoints = (currentTime) => {
    setAccounts(prevAccounts =>
      prevAccounts.map(account => {
        if (account.isLive && account.liveStartTime) {
          const liveDuration = (currentTime.getTime() - new Date(account.liveStartTime).getTime()) / (1000 * 60 * 60);
          const additionalPoints = Math.floor(liveDuration / 3) * 50;
          const updatedAccount = { ...account, point: account.initialPoints + additionalPoints };
          updateAccountOnMockAPI(updatedAccount);
          return updatedAccount;
        }
        return account;
      })
    );
  };

  const toggleLivestream = (account) => {
    const updatedAccount = {
      ...account,
      isLive: !account.isLive,
      liveStartTime: !account.isLive ? currentTime.toISOString() : null,
      initialPoints: !account.isLive ? account.point : account.initialPoints
    };
    setAccounts(prevAccounts =>
      prevAccounts.map(acc => acc._id === account._id ? updatedAccount : acc)
    );
    updateAccountOnMockAPI(updatedAccount);
  };

  const increaseTime = () => {
    setCurrentTime(prevTime => new Date(prevTime.getTime() + 3 * 60 * 60 * 1000));
  };

  const formatDuration = (startTime) => {
    if (!startTime) return '0h 0m';
    const duration = currentTime.getTime() - new Date(startTime).getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };
*************************************Kết thúc ở đây****************************/

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <h1 className="text-xl font-bold mb-8">Streamer Reward Points</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <div className="flex items-center w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search streamers..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {/* <button
          onClick={increaseTime}
          className="flex items-center justify-center w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          <FaFastForward className="mr-2" />
          Increase Time by 3 Hours
        </button> */}
      </div>
      <div className="text-right mb-4 text-sm text-gray-600">
        Current Time: {currentTime.toLocaleString()}
      </div>
      {isLoading ? (
        <div className="text-center text-xl font-semibold text-blue-600">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/4 py-2 px-4 border-b text-left">Streamer</th>
                <th className="w-1/4 py-2 px-4 border-b text-left">Points</th>
                <th className="w-1/4 py-2 px-4 border-b text-center">Live Duration</th>
                <th className="w-1/4 py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map(account => (
                <tr key={account._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-left justify-start">
                      <FaTwitch className={`mr-2 ${account.isLive ? 'text-red-500' : 'text-gray-400'}`} />
                      {account.fullName}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center justify-start">
                      <FaStar className="text-yellow-500 mr-2" />
                      {account.point !== undefined ? account.point : 'None'}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {/* {account.isLive && (
                      <div className="flex items-center justify-center">
                        <FaClock className="mr-2 text-green-500" />
                        {formatDuration(account.liveStartTime)}
                      </div>
                    )} */}
                    <p className='flex items-center justify-center'>None</p>
                  </td>
                  <td className="py-2 px-4 border-b flex justify-center">
                    {/* <button
                      onClick={() => toggleLivestream(account)}
                      className={`flex items-center justify-center w-full sm:w-auto px-4 py-2 rounded-md transition duration-300 ${
                        account.isLive
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {account.isLive ? <FaStop className="mr-2" /> : <FaPlay className="mr-2" />}
                      {account.isLive ? 'End Stream' : 'Start Stream'}
                    </button> */}
                    None
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
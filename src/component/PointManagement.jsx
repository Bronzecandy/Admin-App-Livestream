import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTwitch, FaStar, FaClock, FaSearch, FaPlay, FaStop, FaFastForward, FaTimes } from 'react-icons/fa';

const RewardPointManager = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAccounts();
    const interval = setInterval(() => {
      setCurrentTime(prevTime => {
        const newTime = new Date(prevTime.getTime() + 1000);
        updatePoints(newTime);
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://6717fde3b910c6a6e02acc1a.mockapi.io/StreamerPoint');
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePoints = (currentTime) => {
    setAccounts(prevAccounts =>
      prevAccounts.map(account => {
        if (account.isLive && account.liveStartTime) {
          const liveDuration = (currentTime.getTime() - new Date(account.liveStartTime).getTime()) / (1000 * 60 * 60);
          const additionalPoints = Math.floor(liveDuration / 3) * 50;
          return { ...account, points: account.initialPoints + additionalPoints };
        }
        return account;
      })
    );
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAccounts = accounts.filter(account =>
    account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAccount = (account) => {
    setSelectedAccount(account);
    setShowModal(true);
  };

  const startLivestream = () => {
    if (selectedAccount) {
      const updatedAccounts = accounts.map(account =>
        account.id === selectedAccount.id
          ? { ...account, isLive: true, liveStartTime: currentTime.toISOString(), initialPoints: account.points }
          : account
      );
      setAccounts(updatedAccounts);
      setSelectedAccount(null);
      setShowModal(false);
    }
  };

  const endLivestream = () => {
    if (selectedAccount) {
      const updatedAccounts = accounts.map(account =>
        account.id === selectedAccount.id
          ? { ...account, isLive: false, liveStartTime: null }
          : account
      );
      setAccounts(updatedAccounts);
      setSelectedAccount(null);
      setShowModal(false);
    }
  };

  const increaseTime = () => {
    setCurrentTime(prevTime => new Date(prevTime.getTime() + 3 * 60 * 60 * 1000)); // Increase by 3 hours
  };

  const formatDuration = (startTime) => {
    if (!startTime) return '0h 0m';
    const duration = currentTime.getTime() - new Date(startTime).getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white text-center mb-8 sm:mb-12 animate-pulse">
          Streamer Reward Points
        </h1>
        <div className="mb-8 flex items-center bg-white rounded-full overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="p-3 sm:p-4">
            <FaSearch className="text-gray-500 text-lg sm:text-xl" />
          </div>
          <input
            type="text"
            placeholder="Search streamers..."
            className="w-full p-3 sm:p-4 outline-none text-lg sm:text-xl"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="mt-8 sm:mt-12 text-center">
          <button
            onClick={increaseTime}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-violet-500 text-white text-lg sm:text-xl font-bold rounded-full hover:bg-violet-800 transition-colors transform hover:scale-105 shadow-lg"
          >
            <FaFastForward className="inline mr-2 sm:mr-3 text-xl sm:text-2xl" />
            Increase Time by 3 Hours
          </button>
        </div>
        <div className="my-4 sm:my-6 text-center text-violet-800 text-base sm:text-xl font-semibold">
          Current Time: {currentTime.toLocaleString()}
        </div>
        {isLoading ? (
          <div className="text-center text-white text-2xl sm:text-3xl">
            <div className="animate-spin inline-block w-6 h-6 sm:w-8 sm:h-8 border-4 border-white border-t-transparent rounded-full mr-2"></div>
            Loading...
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAccounts.map(account => (
              <div key={account.id} className="bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FaTwitch className={`text-3xl sm:text-4xl ${account.isLive ? 'text-red-500' : 'text-gray-400'}`} />
                      <span className="ml-3 text-xl sm:text-2xl font-semibold text-gray-800">{account.username}</span>
                    </div>
                    <div className="flex items-center bg-yellow-100 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                      <FaStar className="text-yellow-500 mr-2 text-lg sm:text-xl" />
                      <span className="text-2xl sm:text-3xl font-bold text-gray-800">{account.points}</span>
                    </div>
                  </div>
                  {account.isLive && (
                    <div className="mt-4 flex items-center text-sm sm:text-base text-gray-600 bg-green-100 p-2 sm:p-3 rounded-lg">
                      <FaClock className="mr-2 text-green-500 text-base sm:text-lg" />
                      <span>Live for: {formatDuration(account.liveStartTime)}</span>
                    </div>
                  )}
                  <button
                    onClick={() => handleSelectAccount(account)}
                    className={`mt-4 sm:mt-6 w-full px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold transition-colors ${
                      account.isLive
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {account.isLive ? 'End Livestream' : 'Start Livestream'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full animate-fadeInUp">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {selectedAccount.isLive ? 'End' : 'Start'} Livestream
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes className="text-xl sm:text-2xl" />
              </button>
            </div>
            <p className="text-lg sm:text-xl mb-6 text-gray-600">
              {selectedAccount.isLive
                ? `Are you sure you want to end ${selectedAccount.username}'s livestream?`
                : `Are you ready to start ${selectedAccount.username}'s livestream?`}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-300 text-gray-700 rounded-lg mr-4 hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={selectedAccount.isLive ? endLivestream : startLivestream}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white transition-colors ${
                  selectedAccount.isLive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {selectedAccount.isLive ? 'End Livestream' : 'Start Livestream'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardPointManager;
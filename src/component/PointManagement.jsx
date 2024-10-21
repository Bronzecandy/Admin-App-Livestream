'use client'

import React, { useState, useMemo } from 'react'
import { FaSearch, FaPlus, FaMinus, FaStar, FaCrown } from 'react-icons/fa'

export default function PlayfulPointsManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", points: 100, avatar: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Bob Smith", points: 75, avatar: "/placeholder.svg?height=80&width=80" },
    { id: 3, name: "Charlie Brown", points: 90, avatar: "/placeholder.svg?height=80&width=80" },
    { id: 4, name: "Diana Ross", points: 110, avatar: "/placeholder.svg?height=80&width=80" },
    { id: 5, name: "Edward Norton", points: 85, avatar: "/placeholder.svg?height=80&width=80" },
  ])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [users, searchTerm])

  const totalPoints = useMemo(() => {
    return users.reduce((sum, user) => sum + user.points, 0)
  }, [users])

  const updatePoints = (userId, increment) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, points: Math.max(0, user.points + increment) } : user
      )
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center text-white drop-shadow-lg">
          Points Playground
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <FaCrown className="text-yellow-400 text-4xl animate-bounce" />
            <span className="text-3xl font-semibold text-white">
              Total Stars: <span className="text-yellow-300">{totalPoints}</span>
            </span>
          </div>
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Find friends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 bg-white bg-opacity-50 text-purple-800 pl-10 pr-4 py-2 rounded-full border-2 border-purple-300 focus:outline-none focus:border-purple-500 placeholder-purple-400"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white bg-opacity-40 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full border-4 border-purple-400 shadow-md" />
                  <div>
                    <h2 className="text-2xl font-semibold text-purple-800">{user.name}</h2>
                    <p className="text-sm text-purple-600">Stargazer #{user.id}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-medium text-purple-800 flex items-center">
                      <FaStar className="text-yellow-400 mr-2" />
                      {user.points}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updatePoints(user.id, -1)}
                        className="p-2 rounded-full bg-red-400 text-white hover:bg-red-500 transition-colors duration-200 transform hover:scale-110"
                      >
                        <FaMinus className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => updatePoints(user.id, 1)}
                        className="p-2 rounded-full bg-green-400 text-white hover:bg-green-500 transition-colors duration-200 transform hover:scale-110"
                      >
                        <FaPlus className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-full rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${Math.min(100, (user.points / 200) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
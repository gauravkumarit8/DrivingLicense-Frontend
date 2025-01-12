'use client'

import { useEffect, useState } from 'react'
import { useRouter ,useParams} from 'next/navigation'
import Link from 'next/link'
import { Trash, User, Users, Settings, MapPin, Award, LogOut } from 'lucide-react'
import { deleteUser, getAdminById, getUsersWithAvailability, logoutAdmin } from '@/utils/adminApi/page'
import Footer from '@/components/Footer/Footer'

export default function AdminProfile() {
  const params = useParams();
  const id = params.id;
  const [admin, setAdmin] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const router = useRouter()

  const fetchData = async () => {
    setLoading(true)
    try {
      const adminResult = await getAdminById(id)
      const usersResult = await getUsersWithAvailability(adminResult.data.name, currentPage, pageSize)
      setAdmin(adminResult.data)
      if (usersResult.success && usersResult.data.users) {
        setUsers(usersResult.data.users)
        setCurrentPage(usersResult.data.currentPage)
        setTotalPages(usersResult.data.totalPages)
      } else {
        setErrorMessage(usersResult.data.message || 'No users found')
      }
    } catch (err) {
      console.error('Failed to fetch data:', err)
      setErrorMessage('An error occurred while fetching data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id, currentPage, pageSize])

  const handleLogout = async () => {
    try {
      await logoutAdmin()
      router.push('/')
    } catch (error) {
      console.error('Error occurred while logout ', error)
    }
  }

  const handleDeleteUser = async (adminName, userId) => {
    try {
      await deleteUser(adminName, userId)
      setUsers(users.filter((user) => user.id !== userId))
    } catch (err) {
      console.error('Failed to delete user:', err)
      alert('Failed to delete user. Please try again later.')
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Admin Profile Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm border border-gray-800 transform hover:scale-[1.01] transition-all duration-300 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Admin Profile
              </h2>
              <div className="mt-4 space-y-2">
                <p><span className="text-gray-400">Name:</span> {admin.name}</p>
                <p><span className="text-gray-400">Email:</span> {admin.email}</p>
                <p><span className="text-gray-400">Role:</span> {admin.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Address Section */}
          {!admin.address ? (
            <Link
              href={`/admin/address/${id}`}
              className="group flex items-center justify-center gap-2 w-full py-4 bg-blue-600/20 text-blue-400 rounded-xl hover:bg-blue-600/30 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <MapPin className="group-hover:animate-bounce" size={20} />
              Want to start the service? Provide your location
            </Link>
          ) : (
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Address Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400">Street</p>
                  <p>{admin.address.street}</p>
                </div>
                <div>
                  <p className="text-gray-400">City</p>
                  <p>{admin.address.city}</p>
                </div>
                <div>
                  <p className="text-gray-400">State</p>
                  <p>{admin.address.state}</p>
                </div>
                <div>
                  <p className="text-gray-400">Zip</p>
                  <p>{admin.address.zip}</p>
                </div>
                <div>
                  <p className="text-gray-400">Country</p>
                  <p>{admin.address.country}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Link
              href={`/admin/license/${id}`}
              className="flex items-center justify-center gap-2 p-3 bg-indigo-600/20 text-indigo-400 rounded-xl hover:bg-indigo-600/30 transition-all duration-300 transform hover:scale-[1.05]"
            >
              <Award size={18} />
              Trained Users
            </Link>
            <Link
              href={`/admin/update/${id}`}
              className="flex items-center justify-center gap-2 p-3 bg-purple-600/20 text-purple-400 rounded-xl hover:bg-purple-600/30 transition-all duration-300 transform hover:scale-[1.05]"
            >
              <Settings size={18} />
              Update Profile
            </Link>
            <Link
              href={`/admin/instructors/${id}`}
              className="flex items-center justify-center gap-2 p-3 bg-pink-600/20 text-pink-400 rounded-xl hover:bg-pink-600/30 transition-all duration-300 transform hover:scale-[1.05]"
            >
              <User size={18} />
              Instructors
            </Link>
            <Link
              href={`/admin/users/${id}`}
              className="flex items-center justify-center gap-2 p-3 bg-cyan-600/20 text-cyan-400 rounded-xl hover:bg-cyan-600/30 transition-all duration-300 transform hover:scale-[1.05]"
            >
              <Users size={18} />
              Users
            </Link>
          </div>
        </div>

        {/* Users Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Registered Users
          </h2>
          {errorMessage ? (
            <div className="text-red-400 bg-red-900/20 p-4 rounded-xl">{errorMessage}</div>
          ) : (
            users.map((user, userIndex) => (
              <div 
                key={user.id} 
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 relative transform hover:scale-[1.01] transition-all duration-300 border border-gray-800"
              >
                <button
                  onClick={() => handleDeleteUser(admin.name, user.id)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash className="h-5 w-5" />
                </button>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">
                    {userIndex + 1}. {user.userName}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
                    <p><span className="text-gray-400">Email:</span> {user.email}</p>
                    <p><span className="text-gray-400">Aadhaar:</span> {user.aadhaarNumber}</p>
                    <p><span className="text-gray-400">Status:</span> {user.status}</p>
                  </div>
                </div>

                {user.availability && user.availability.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-purple-400">Availability Schedule</h4>
                    {user.availability.map((availability, availIndex) => {
                      const instructorForDay = user.assignedInstructors.find(
                        (instructor) => instructor.day === availability.day
                      );

                      return (
                        <div 
                          key={availIndex} 
                          className="bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
                            <p><span className="text-gray-400">Day:</span> {availability.day}</p>
                            <p><span className="text-gray-400">Time:</span> {availability.startTime} - {availability.endTime}</p>
                            <p><span className="text-gray-400">Session:</span> {new Date(availability.sessionDate).toLocaleDateString()}</p>
                          </div>

                          {instructorForDay ? (
                            <div className="mt-4">
                              <h5 className="font-medium mb-2 text-blue-400">Assigned Instructor:</h5>
                              <p className="text-gray-300 mb-3">{instructorForDay.instructorName}</p>
                              <Link
                                href={`/admin/assignInstructor/reAssignInstructor/${admin.id}/${user.id}?day=${availability.day}`}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600/20 text-yellow-400 rounded-lg hover:bg-yellow-600/30 transition-all duration-300 transform hover:scale-[1.02]"
                              >
                                Update Instructor
                              </Link>
                            </div>
                          ) : (
                            <Link
                              href={`/admin/assignInstructor/AssignInstructor/${admin.id}/${user.id}?day=${availability.day}`}
                              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-all duration-300 transform hover:scale-[1.02]"
                            >
                              Assign Instructor
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))
          )}

          {/* Pagination Controls */}
          {!errorMessage && (
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg disabled:opacity-50 transition-all duration-300 hover:bg-blue-600/30"
              >
                Previous
              </button>
              <span className="text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg disabled:opacity-50 transition-all duration-300 hover:bg-blue-600/30"
              >
                Next
              </button>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-gray-800 text-white rounded-lg px-2 py-1 transition-all duration-300 hover:bg-gray-700"
              >
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
              </select>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}


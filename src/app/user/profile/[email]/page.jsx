'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { 
  getAdminByIdInUser, 
  getUserByEmail, 
  getUserTotalTime, 
  logoutUser, 
  postUserLogTime 
} from '@/utils/userApi/page'
import { 
  deleteSession, 
  getSessionByUser 
} from '@/utils/sessionApi/drivingSessionApi'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Profile() {
  const params = useParams()
  const email = params.email
  const [userData, setUserData] = useState(null)
  const [userSessions, setUserSessions] = useState([])
  const [totalTime, setTotalTime] = useState(0)
  const [admin, setAdmin] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken')
        const result = await getUserByEmail(email)
        const dataUser = result.data
        setUserData(dataUser)
        const adminName = await getAdminByIdInUser(dataUser.adminId)
        setAdmin(adminName.data)
        const sessionResult = await getSessionByUser(dataUser.userId)
        if (sessionResult.success) {
          setUserSessions(sessionResult.data)
        } else {
          console.error('Failed to fetch sessions:', sessionResult.message)
        }
        const totalTimeResult = await getUserTotalTime(adminName.data.name, dataUser.userId)
        setTotalTime(totalTimeResult.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [email])

  const submitLogTime = async (e) => {
    e.preventDefault()
    const time = 1
    const currentDate = new Date().toISOString().split('T')[0]

    try {
      const response = await postUserLogTime(admin.name, userData.userId, time, currentDate)
      if (response.success) {
        const result = await getUserTotalTime(admin.name, userData.userId)
        setTotalTime(result.data)
      } else {
        setError(response.message)
      }
    } catch (error) {
      setError('Error updating total time: ' + error.message)
    }
  }

  const handleDeleteSession = async (e, userId) => {
    e.preventDefault()
    try {
      await deleteSession(userId)
      console.log('Session deleted successfully')
      // Refresh sessions after deletion
      const sessionResult = await getSessionByUser(userData.userId)
      if (sessionResult.success) {
        setUserSessions(sessionResult.data)
      }
    } catch (error) {
      console.error('Error Deleting Sessions', error)
    }
  }

  const handleLogout = async () => {
    try {
      await logoutUser()
      router.push('/')
    } catch (error) {
      console.error('Error occurred while logout ', error)
    }
  }

  if (!userData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  const chartData = {
    labels: ['Training Completed', 'Remaining Training Hours'],
    datasets: [
      {
        data: [totalTime, 20 - totalTime],
        backgroundColor: ['#3B82F6', '#FBBF24'],
        hoverBackgroundColor: ['#2563EB', '#F59E0B'],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 bg-white rounded-lg">
            <h2 className="text-red-500">{error}</h2>
            <button 
              onClick={() => setError(null)}
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <header className="fixed top-0 left-0 right-0 flex flex-col items-center justify-between w-full px-4 py-2 bg-blue-600 sm:flex-row sm:h-16">
        <h1 className="text-xl font-bold text-white sm:text-2xl">RoadRover</h1>
        <div className="flex items-center mt-2 space-x-4 text-white sm:mt-0">
          <span className="text-sm sm:text-base">{userData.email}</span>
          <button 
            className="px-3 py-1 text-sm font-bold bg-red-500 rounded hover:bg-red-600 sm:px-4 sm:py-2" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
      <main className="container px-4 pt-24 mx-auto sm:pt-20 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="p-4 bg-white rounded-lg shadow-md sm:p-6">
            <h2 className="mb-4 text-xl font-bold sm:text-2xl">User Details</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Aadhaar Number:</strong> {userData.aadhaarNumber || 'Not Provided'}</p>
              <p><strong>Role:</strong> {userData.role}</p>
              <p><strong>Status:</strong> {userData.status}</p>
              <p><strong>Total Training Time:</strong> {totalTime} hours</p>
              <div className="mt-4">
                <h3 className="mb-2 text-lg font-semibold">Is training done?</h3>
                <button
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 sm:text-base"
                  onClick={submitLogTime}
                >
                  Done
                </button>
              </div>
              <div className="mt-4">
                <h3 className="mb-2 text-lg font-semibold">Assigned Instructors:</h3>
                <ul className="pl-5 space-y-1 list-disc">
                  {userData.assignedInstructors && userData.assignedInstructors.length > 0 ? (
                    userData.assignedInstructors.map((instructor) => (
                      <li key={instructor.instructorId}>
                        {instructor.instructorName} (Day: {instructor.day})
                      </li>
                    ))
                  ) : (
                    <li>No Instructor Assigned</li>
                  )}
                </ul>
              </div>
              <div className="flex flex-col mt-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Link href={`/user/update/${userData.adminName}/${userData.userId}`}>
                  <button className="w-full px-4 py-2 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600 sm:text-base">
                    Update Details
                  </button>
                </Link>
                {userData.isLicenseProvided===true && (
                    <Link href={`/license/user/${userData.userId}`}>
                  <button className="w-full px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600 sm:text-base">
                    Get License Details
                  </button>
                </Link>
                )}
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md sm:p-6">
            <h2 className="mb-4 text-xl font-bold sm:text-2xl">Training Status</h2>
            <div className="w-full h-64 mx-auto sm:w-80 sm:h-80">
              <Pie data={chartData} />
            </div>
            {userSessions.length === 0 && (
              <div className="mt-6 text-center">
                <Link href={`/user/session/${userData.userId}`}>
                  <button className="px-6 py-3 text-sm font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 sm:text-base">
                    Book Your Sessions
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        {userSessions.length > 0 && (
          <div className="p-4 mt-6 bg-white rounded-lg shadow-md sm:p-6">
            <h2 className="mb-4 text-xl font-bold sm:text-2xl">Session Details</h2>
            <div className="space-y-4">
              {userSessions.map((session) => (
                <div key={session.userId} className="p-3 border rounded-lg sm:p-4">
                  {session.instructor && (
                    <>
                      <p><strong>Instructor Name:</strong> {session.instructor?.name || 'Not Assigned'}</p>
                      <p><strong>Instructor Email:</strong> {session.instructor?.email || 'Not Assigned'}</p>
                    </>
                  )}
                  <p><strong>Session Date:</strong> {session.sessionDate}</p>
                  <p><strong>Schedule Date:</strong> {session.scheduleDate}</p>
                  <h3 className="mt-2 text-lg font-semibold">Availability:</h3>
                  <ul className="pl-5 mt-2 space-y-1 list-disc">
                    {session.availability.map((avail) => (
                      <li key={avail.sessionDate}>
                        <strong>{avail.day}</strong> {/*({avail.sessionDate}) */}
                        Start Time: {avail.startTime}, 
                         {/* End Time: {avail.startTime}  */}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2"><strong>Status:</strong> {session.status}</p>
                  <div className="flex flex-col mt-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <button
                      className="w-full px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 sm:text-base"
                      onClick={(e) => handleDeleteSession(e, session.userId)}
                    >
                      Delete Sessions
                    </button>
                    <button className="w-full px-4 py-2 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600 sm:text-base">
                      Update Sessions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}


import { use, useEffect, useState } from 'react'
import { useAssignments } from '../context/AssignmentContext'
import SideNav from '@/components/navigation/SideNav'
import { useEngineers } from '@/context/EngineerContext'
import { useAuth } from '@/context/AuthContext'

const ManagerDashboard = () => {
  const { user } = useAuth()
  const { assignments, loading: assignmentLoading } = useAssignments()
  const {engineers} = useEngineers()

  const now = new Date()
  const getCurrentAllocation = (engineerId) => {
    return assignments
      .filter(a => a.engineerId._id === engineerId)
      .filter(a => new Date(a.startDate) <= now && new Date(a.endDate) >= now)
      .reduce((sum, a) => sum + a.allocationPercentage, 0)
  }

  if (assignmentLoading) return <div className="p-6">Loading...</div>

  return (
    <div className="grid-container">
     <SideNav />
     <main className="p-6 mt-4">
      <h1 className="text-2xl font-bold mb-8">Welcome, {user.user.name}</h1>
      <h2 className="text-lg font-semibold mb-4">Team Overview</h2>

      <div className="overflow-x-auto border border-gray-300 rounded-lg">
  <table className="w-full text-sm text-left border-collapse">
    <thead className="bg-gray-100 text-gray-600">
      <tr>
        <th className="px-4 py-3 border-r">Engineer</th>
        <th className="px-4 py-3 border-r">Skills</th>
        <th className="px-4 py-3 border-r">Department</th>
        <th className="px-4 py-3 border-r">Capacity</th>
        <th className="px-4 py-3">Status</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-100">
      {engineers.map((eng) => {
        const allocated = getCurrentAllocation(eng._id)
        const progress = Math.min((allocated / eng.maxCapacity) * 100, 100)
        let status = 'Optimal'
        if (allocated >= eng.maxCapacity) status = 'Overloaded'
        else if (allocated <= eng.maxCapacity * 0.4) status = 'Underutilized'

        const statusColor =
          status === 'Overloaded'
            ? 'text-red-600'
            : status === 'Underutilized'
            ? 'text-yellow-600'
            : 'text-green-600'

        return (
          <tr key={eng._id} className="hover:bg-gray-50">
            <td className="px-4 py-3 border-r font-medium">{eng.name}</td>
            <td className="px-4 py-3 border-r">{eng.skills.join(', ')}</td>
            <td className="px-4 py-3 border-r">{eng.department}</td>
            <td className="px-4 py-3 border-r">
              <div className="flex items-center gap-2">
                <div className="w-32 h-1 bg-gray-200 rounded-full">
                  <div
                    className="h-1 bg-black rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span>{allocated}%</span>
              </div>
            </td>
            <td className={`px-4 py-3 font-semibold ${statusColor}`}>{status}</td>
          </tr>
        )
      })}
    </tbody>
  </table>
</div>

     </main>
    </div>
  )
}

export default ManagerDashboard

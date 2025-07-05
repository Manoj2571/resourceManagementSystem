import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useAssignments } from "@/context/AssignmentContext";
import { formatDate } from "@/utils/resourceUtils";
import SideNav from "@/components/navigation/SideNav";

const EngineerDashboard = () => {
  const { user } = useAuth();
  const { assignments, loading } = useAssignments();

  if (!user) return <div className="p-4">User not authenticated</div>;

  const engineerId = user._id;
  const engineerAssignments = assignments.filter(
    (a) => a.engineerId?._id === engineerId
  );

  const now = new Date();
  const currentAssignments = engineerAssignments.filter(
    (a) => new Date(a.startDate) <= now && new Date(a.endDate) >= now
  );
  const upcomingAssignments = engineerAssignments.filter(
    (a) => new Date(a.startDate) > now
  );

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="grid-container">
    <SideNav />
    <main className="p-6 mt-4">
      <h1 className="text-2xl font-bold mb-8">Welcome, {user.name}</h1>

      {/* --- Current Assignments --- */}
      <section className="mb-8 ">
        <h2 className="text-lg font-semibold mb-4">Current Assignments</h2>
        {currentAssignments.length === 0 ? (
          <p className="text-sm text-gray-500 px-2">No current assignments found.</p>
        ) : (
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Project</th>
                  <th className="px-4 py-3 text-left font-medium">Role</th>
                  <th className="px-4 py-3 text-left font-medium">Start Date</th>
                  <th className="px-4 py-3 text-left font-medium">End Date</th>
                  <th className="px-4 py-3 text-left font-medium">Allocation %</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {currentAssignments.map((a, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-3 whitespace-nowrap">{a.projectId.name}</td>
                    <td className="px-4 py-3">{a.role}</td>
                    <td className="px-4 py-3">{formatDate(a.startDate)}</td>
                    <td className="px-4 py-3">{formatDate(a.endDate)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1 bg-gray-200 rounded-full">
                          <div
                            className="h-1 bg-black rounded-full"
                            style={{ width: `${a.allocationPercentage}%` }}
                          ></div>
                        </div>
                        <span>{a.allocationPercentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* --- Upcoming Assignments --- */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Upcoming Assignments</h2>
        {upcomingAssignments.length === 0 ? (
          <p className="text-sm text-gray-500 px-2">No upcoming assignments found.</p>
        ) : (
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Project</th>
                  <th className="px-4 py-3 text-left font-medium">Role</th>
                  <th className="px-4 py-3 text-left font-medium">Start Date</th>
                  <th className="px-4 py-3 text-left font-medium">End Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {upcomingAssignments.map((a, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-3 whitespace-nowrap">{a.projectId.name}</td>
                    <td className="px-4 py-3 text-blue-600">{a.role}</td>
                    <td className="px-4 py-3">{formatDate(a.startDate)}</td>
                    <td className="px-4 py-3">{formatDate(a.endDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
    </div>
  );
};

export default EngineerDashboard;

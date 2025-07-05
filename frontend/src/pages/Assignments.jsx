import React from "react";
import { useAssignments } from "@/context/AssignmentContext";
import AssignmentCard from "@/components/assignment/AssignmentCard";
import SideNav from "@/components/navigation/SideNav";

export default function Assignments() {
  const { assignments, loading } = useAssignments();
  const now = new Date();


  if (loading)
    return (
      <div className="grid-container">
        <SideNav />
        <main className="p-6 mt-4 text-center">Loading assignments...</main>
      </div>
    );

  return (
    <div className="grid-container">
      <SideNav />
      <main className="p-6 mt-4">
        <h1 className="text-2xl font-bold mb-6">Assignments</h1>

        <section className="mb-8">
          {assignments.length === 0 ? (
            <p className="text-gray-500">No current assignments.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {assignments.map((a) => (
                <AssignmentCard key={a._id} assignment={a} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEngineers } from "@/context/EngineerContext";
import { useAssignments } from "@/context/AssignmentContext";

export default function TeamUtilizationChart() {
  const { engineers } = useEngineers();
  const { assignments } = useAssignments();

  const data = engineers.map((engineer) => {
    const engineerAssignments = assignments.filter(
      (a) => a.engineerId?._id === engineer._id
    );

    const totalAllocated = engineerAssignments.reduce(
      (sum, a) => sum + a.allocationPercentage,
      0
    );

    const available = Math.max(engineer.maxCapacity - totalAllocated, 0);

    return {
      name: engineer.name,
      Allocated: totalAllocated,
      Available: available,
    };
  });

  return (
    <div className="w-full h-[400px] bg-white rounded-md p-4 ">
      <h2 className="text-lg font-semibold mb-4">Team Utilization</h2>
      <ResponsiveContainer width="100%" height="100%" className="border rounded-md p-2">
        <BarChart data={data} layout="vertical" margin={{ left: 40, right: 20 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Allocated" fill="#6366f1" />
          <Bar dataKey="Available" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

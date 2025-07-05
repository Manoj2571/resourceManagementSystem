// Returns both total allocated and available capacity for the given engineer
export function getCapacityStats(engineer, assignments) {
  const now = new Date();

  // Filter only active assignments for this engineer
  const activeAssignments = assignments.filter(
    (a) =>
      a.engineerId._id === engineer._id &&
      new Date(a.startDate) <= now &&
      new Date(a.endDate) >= now
  );

  // Total allocated percentage
  const totalAllocated = activeAssignments.reduce(
    (sum, a) => sum + a.allocationPercentage,
    0
  );

  // Available capacity = maxCapacity - totalAllocated
  const availableCapacity = engineer.maxCapacity - totalAllocated;

  return {
    totalAllocated,
    availableCapacity,
  };
}



export function findSuitableEngineers(engineers, project) {
  if (!engineers || !project) return [];

  return engineers.filter((engineer) =>
    project.requiredSkills.some((skill) => engineer.skills.includes(skill))
  );
}

export const formatDate = (dateStr) => new Date(dateStr).toISOString().slice(0, 10);

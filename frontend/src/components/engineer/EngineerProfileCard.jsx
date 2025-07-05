import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getCapacityStats } from "@/utils/resourceUtils";

export default function EngineerProfileCard({ engineer, assignments }) {

  const isFullTime = engineer.maxCapacity === 100;
  const { totalAllocated, availableCapacity } = getCapacityStats(engineer, assignments);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{engineer.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Skills */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Skills</p>
          <div className="flex flex-wrap gap-2">
            {engineer.skills.map((skill, idx) => (
              <Badge key={idx} variant="outline">{skill}</Badge>
            ))}
          </div>
        </div>

        {/* Seniority & Employment */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Seniority</p>
            <p className="text-sm capitalize">{engineer.seniority}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Employment Type</p>
            <p className="text-sm">{isFullTime ? "Full-time (100%)" : "Part-time (50%)"}</p>
          </div>
        </div>

        {/* Current Capacity */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Current Status</p>
          <Progress value={totalAllocated >= 100 ? 100 : totalAllocated } />
          <div className="flex justify-between text-sm mt-1">
            <span className="">{totalAllocated}% occupied</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "../ui/progress";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function AssignmentCard({ assignment }) {
  const {
    projectId,
    engineerId,
    role,
    allocationPercentage,
    startDate,
    endDate,
  } = assignment;

  const formattedStart = format(new Date(startDate), "yyyy-MM-dd");
  const formattedEnd = format(new Date(endDate), "yyyy-MM-dd");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{projectId.name}</CardTitle>
        <Progress value={allocationPercentage}>{allocationPercentage}%</Progress>
        <span>{allocationPercentage}% allocated</span>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          
           <div>
            <p className="text-muted-foreground">Engineer</p>
            <p>{engineerId.name}</p>
           </div>
           <div>
            <p className="text-muted-foreground">Role</p>
            <p>{role}</p>
           </div>
           <div>
            <p className="text-muted-foreground">Start Date</p>
            <p>{formattedStart}</p>
           </div>
           <div>
            <p className="text-muted-foreground">End Date</p>
            <p>{formattedEnd}</p>
           </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Status:{" "}
          <span className="capitalize">
            {new Date(startDate) <= new Date() &&
            new Date(endDate) >= new Date()
              ? "Active"
              : new Date(startDate) > new Date()
              ? "Upcoming"
              : "Ended"}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}

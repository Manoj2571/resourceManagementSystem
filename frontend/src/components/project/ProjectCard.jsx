import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { format } from "date-fns"
import { Badge } from "../ui/badge"
import { useAuth } from "@/context/AuthContext"
import AssignProjectDialog from "../assignment/AssignProjectDialog"

export default function ProjectCard({ project }) {
  const {user} = useAuth()  
  const {
    name,
    description,
    startDate,
    endDate,
    requiredSkills = [],
    teamSize,
    status,
  } = project

  const statusColors = {
    planning: "bg-yellow-100 text-yellow-700",
    active: "bg-green-100 text-green-700",
    completed: "bg-gray-100 text-gray-700",
  }

  const formattedStart = startDate ? format(new Date(startDate), "yyyy-MM-dd") : "-"
  const formattedEnd = endDate ? format(new Date(endDate), "yyyy-MM-dd") : "-"

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">{name}</CardTitle>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Start Date</p>
            <p>{formattedStart}</p>
          </div>
          <div>
            <p className="text-muted-foreground">End Date</p>
            <p>{formattedEnd}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Team Size</p>
            <p>{teamSize}</p>
          </div>
        </div>

        <div>
          <p className="text-muted-foreground text-sm mb-1">Required Skills</p>
          <div className="flex flex-wrap gap-2">
            {requiredSkills.map((skill, i) => (
              <Badge key={i} variant="outline">{skill}</Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center flex-wrap gap-2 text-sm text-muted-foreground">
  <div>
    Project Status: <span className="ml-1 font-medium capitalize">{status}</span>
  </div>

  {user?.role === "manager" && (
  <AssignProjectDialog project={project} />
)}
</CardFooter>
    </Card>
  )
}

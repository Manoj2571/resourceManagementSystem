import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useProjects } from "@/context/ProjectContext";
import { useAuth } from "@/context/AuthContext";

export default function AddProjectDialog() {
  const { user } = useAuth();
  const { createProject } = useProjects();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await createProject({
      ...data,
      teamSize: Number(data.teamSize),
      requiredSkills: data.requiredSkills.split(",").map((skill) => skill.trim()),
      managerId: user._id
    });
    reset();
    setOpen(false);
  };

  // Only managers can see this button
  if (user?.role !== "manager") return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-auto mb-4">
          + Add Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-purple-700 text-center">Create New Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Project Name</label>
            <Input id="name" placeholder="e.g. CRM System" {...register("name")} required />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1 font-medium text-gray-700">Description</label>
            <Textarea id="description" placeholder="Short project summary" {...register("description")} required />
          </div>

          <div>
            <label htmlFor="requiredSkills" className="block mb-1 font-medium text-gray-700">Required Skills</label>
            <Input
              id="requiredSkills"
              placeholder="e.g. React, Node.js"
              {...register("requiredSkills")}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block mb-1 font-medium text-gray-700">Start Date</label>
              <Input type="date" id="startDate" {...register("startDate")} required />
            </div>

            <div>
              <label htmlFor="endDate" className="block mb-1 font-medium text-gray-700">End Date</label>
              <Input type="date" id="endDate" {...register("endDate")} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="teamSize" className="block mb-1 font-medium text-gray-700">Team Size</label>
              <Input type="number" min={1} id="teamSize" {...register("teamSize")} required />
            </div>

            <div>
              <label htmlFor="status" className="block mb-1 font-medium text-gray-700">Status</label>
              <select
                id="status"
                {...register("status")}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <Button type="submit" className="w-full">Create Project</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

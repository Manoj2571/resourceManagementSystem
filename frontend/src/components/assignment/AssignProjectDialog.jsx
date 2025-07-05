import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useAssignments } from "@/context/AssignmentContext";
import { useEngineers } from "@/context/EngineerContext";
import { useState } from "react";

export default function AssignProjectDialog({ project }) {
  const { createAssignment } = useAssignments();
  const { engineers } = useEngineers();
  const [selectedEngineer, setSelectedEngineer] = useState("");
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    await createAssignment({
      ...data,
      projectId: project._id,
    });
    reset();
    setSelectedEngineer("");
    setOpen(false);
  };

 

  // 🔍 Filter engineers with at least one matching skill
  const suitableEngineers = engineers.filter((engineer) =>
    project.requiredSkills.some((skill) =>
      engineer.skills.includes(skill)
    )
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="default">
          Assign Engineers
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-purple-700 text-center">
            Assign Engineer
          </DialogTitle>
          <p className="text-sm text-gray-500 text-center mb-4">
            Fill in the assignment details
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Engineer (matching skills)
            </label>
            <Select
              value={selectedEngineer}
              onValueChange={(value) => {
                setSelectedEngineer(value);
                setValue("engineerId", value);
              }}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an engineer" />
              </SelectTrigger>
              <SelectContent>
                {suitableEngineers.map((eng) => (
                  <SelectItem key={eng._id} value={eng._id}>
                    {eng.name} ({eng.skills.join(", ")})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <input
            type="hidden"
            {...register("engineerId", { required: true })}
          />

          <div>
            <label htmlFor="role" className="block mb-1 font-medium text-gray-700">
              Role
            </label>
            <Input
              id="role"
              placeholder="e.g. Backend Developer"
              {...register("role")}
              required
            />
          </div>

          <div>
            <label
              htmlFor="allocationPercentage"
              className="block mb-1 font-medium text-gray-700"
            >
              Allocation %
            </label>
            <Input
              id="allocationPercentage"
              type="number"
              min={1}
              max={100}
              {...register("allocationPercentage")}
              required
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block mb-1 font-medium text-gray-700">
              Start Date
            </label>
            <Input type="date" id="startDate" {...register("startDate")}  required />
          </div>

          <div>
            <label htmlFor="endDate" className="block mb-1 font-medium text-gray-700">
              End Date
            </label>
            <Input type="date" id="endDate" {...register("endDate")} required />
          </div>

          <Button type="submit" className="w-full">
            Assign
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

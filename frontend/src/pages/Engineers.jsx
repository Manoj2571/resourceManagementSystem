// pages/Engineers.jsx
import React from "react";
import { useEngineers } from "@/context/EngineerContext";
import { useAssignments } from "@/context/AssignmentContext";
import EngineerProfileCard from "@/components/engineer/EngineerProfileCard";
import SideNav from "@/components/navigation/SideNav";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Engineers() {
  const [selectedSkill, setSelectedSkill] = useState("all")  
  const { engineers, loading } = useEngineers();
  const { assignments } = useAssignments();

// Consolidate skills for dropdown
const allSkills = Array.from(
  new Set(engineers.flatMap(e => e.skills))
);

// Filtering
const filtered = engineers.filter(engineer =>
  selectedSkill === "all" || engineer.skills.includes(selectedSkill)
);

  return (
    <div className="grid-container">
      <SideNav />
      <main className="p-6 mt-4">
        <h1 className="text-2xl font-bold mb-6">Engineers</h1>
        
        <div className="w-64 mb-6">
            <Select onValueChange={setSelectedSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {allSkills.map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>


        {loading ? (
          <p>Loading...</p>
        ) : engineers.length === 0 ? (
          <p className="text-muted-foreground">No engineers found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filtered.map((eng) => (
              <EngineerProfileCard key={eng._id} engineer={eng} assignments={assignments}/>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

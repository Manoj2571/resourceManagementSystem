import React from "react";
import { useProjects } from "@/context/ProjectContext";
import SideNav from "@/components/navigation/SideNav";
import ProjectCard from "@/components/project/ProjectCard";
import { useAuth } from "@/context/AuthContext";
import AddProjectDialog from "@/components/project/AddProjectDialog";

const Projects = () => {
  const { projects, loading } = useProjects();
  const {user} = useAuth()

  if (loading) return <div className="p-6">Loading projects...</div>;

  if (!projects || projects.length === 0)
    return (
      <div className="p-6">
        <SideNav />
        <main className="mt-4 p-6">
          <h1 className="text-2xl font-bold mb-5">Projects</h1>
          <p className="text-gray-500">No projects found.</p>
        </main>
      </div>
    );

  return (
    <>
    <div className="grid-container">
      <SideNav />
      <main className="p-6 mt-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold mb-5">Projects</h1>
          <AddProjectDialog />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </main>
    </div>
    </>
  );
};

export default Projects;

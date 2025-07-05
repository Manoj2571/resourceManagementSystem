import { Home, Folder, Users, BarChart, ClipboardList, LogOut} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { icon: <Home size={18} />, label: "Dashboard", to: "/dashboard" },
  { icon: <Folder size={18} />, label: "Projects", to: "/projects" },
  { icon: <Users size={18} />, label: "Engineers", to: "/engineers" },
  { icon: <ClipboardList size={18} />, label: "Assignments", to: "/assignments" },
  { icon: <BarChart size={18} />, label: "Reports", to: "/reports" },
];

const SideNav = () => {
  const {logout} = useAuth()
  return (
    <aside className="w-64 h-screen bg-white border-r p-4 pt-9 sidebar1">
      <div className="flex items-center mb-8">
        <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
          RMS
        </div>
        <span className="ml-3 font-semibold text-lg">Resource Manager</span>
      </div>
      <ul className="space-y-2">
        {navItems.map((item, idx) => (
          <li key={idx}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 ${
                  isActive ? "bg-gray-100 font-semibold" : ""
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="border-t pt-4 mt-4">
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full flex items-center justify-start space-x-2 text-red-600"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
};

export default SideNav;

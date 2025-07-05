import TeamUtilizationChart from "@/components/charts/TeamUtilizationChart";
import SideNav from "@/components/navigation/SideNav";

export function Reports() {


   return (
    <div className="grid-container">
      <SideNav />
      <main className="p-6 mt-4">
        <TeamUtilizationChart />
      </main>
    </div>
  );
}

import LocationHistorySummary from "../features/dashboard/LocationHistorySummary";
import DashboardStats from "../features/dashboard/DashboardStats";

import PageLayout from "../ui/PageLayout";
import Header from "../ui/Header";

function Dashboard() {
  return (
    <PageLayout>
      <Header>Dashboard</Header>
      <DashboardStats />
      <LocationHistorySummary />
    </PageLayout>
  );
}

export default Dashboard;

import LocationHistorySummary from "../features/dashboard/LocationHistorySummary";
import Stats from "../features/dashboard/Stats";

import PageLayout from "../ui/layouts/PageLayout";
import Header from "../ui/components/Header";

function Dashboard() {
  return (
    <PageLayout>
      <Header>Dashboard</Header>
      <Stats />
      <LocationHistorySummary />
    </PageLayout>
  );
}

export default Dashboard;

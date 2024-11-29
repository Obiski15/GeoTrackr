import LocationHistory from "./LocationHistory";

import DashboardLayout from "../../ui/layouts/DashboardLayout";

function LocationHistorySummary() {
  return (
    <DashboardLayout title="timeline">
      <LocationHistory summary={true} />
    </DashboardLayout>
  );
}

export default LocationHistorySummary;

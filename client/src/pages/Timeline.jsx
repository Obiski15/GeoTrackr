import LocationHistory from "../features/dashboard/LocationHistory";

import SearchInput from "../features/dashboard/SearchInput";
import PageLayout from "../ui/layouts/PageLayout";
import Header from "../ui/components/Header";

function Timeline() {
  return (
    <PageLayout>
      <Header>Timeline</Header>
      <SearchInput />
      <LocationHistory />
    </PageLayout>
  );
}

export default Timeline;

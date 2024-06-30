import LocationHistory from "../features/dashboard/LocationHistory";

import SearchInput from "../ui/SearchInput";
import PageLayout from "../ui/PageLayout";
import Header from "../ui/Header";

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

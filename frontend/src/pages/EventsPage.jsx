import Layout from "../components/common/Layout";
import EventList from "../components/Event/EventList";
import { mockEvenements } from "../data/mockData";

export default function EventsPage() {
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-primaryDark mb-6">
          Événements
        </h1>
        <EventList events={mockEvenements} />
      </div>
    </Layout>
  );
}

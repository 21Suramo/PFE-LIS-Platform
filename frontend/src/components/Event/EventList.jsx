import EventCard from "./EventCard";

export default function EventList({ items, onOpenDetails }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((event) => (
        <EventCard key={event._id}  event={event} onOpenDetails={onOpenDetails} />
      ))}
    </div>
  );
}

import NewsCard from "./NewsCard";

export default function NewsList({ items, onOpenDetails }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
  ">
      {items.map((item) => (
        <NewsCard key={item.id} item={item} onOpenDetails={onOpenDetails} />
      ))}
    </div>
  );
}

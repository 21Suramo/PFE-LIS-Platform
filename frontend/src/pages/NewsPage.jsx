import Layout from "../components/common/Layout";
import NewsList from "../components/News/NewsList";
import { mockActualites } from "../data/mockData";

export default function NewsPage() {
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-primaryDark mb-6">
          Actualités
        </h1>
        <NewsList items={mockActualites} />
      </div>
    </Layout>
  );
}

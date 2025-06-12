import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/common/Layout";
import FullPageSpinner from "./components/common/FullPageSpinner";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<FullPageSpinner />}>
          <div className="flex flex-col min-h-screen bg-base dark:bg-base-dark">
            <AppRoutes />
          </div>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/default";
import { pages } from "./pages/all_pages";

function App() {
  return (
    <DefaultLayout>
      <Routes>
        {Object.entries(pages).map(([path, Component]) => (
          <Route key={path} path={path} element={Component} />
        ))}
      </Routes>
    </DefaultLayout>
  );
}

export default App;

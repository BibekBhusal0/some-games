import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/default";
import { pages } from "./pages/all_pages";
import { GameProvider } from "./games/provider";

function App() {
  return (
    <DefaultLayout>
      <GameProvider>
        <Routes>
          {Object.entries(pages).map(([path, Component]) => (
            <Route key={path} path={path} element={Component} />
          ))}
        </Routes>
      </GameProvider>
    </DefaultLayout>
  );
}

export default App;

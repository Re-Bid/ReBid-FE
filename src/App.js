import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./page/Home";
import Bid from "./page/Bid";
import Sell from "./page/Sell";
import ItemDetail from "./page/ItemDetail";
import Mypage from "./page/Mypage";
import Auth from "./page/admin/Auth";
import AdminPage from "./page/admin/AdminPage";
import ItemList from "./page/ItemList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bid",
        element: <Bid />,
      },
      {
        path: "/sell",
        element: <Sell />,
      },
      { path: "/detail/:id", element: <ItemDetail /> },
      { path: "/mypage", element: <Mypage /> },
      { path: "/itemlists/:category", element: <ItemList /> },
    ],
  },
  {
    path: "/admin/auth",
    element: <Auth />,
  },
  { path: "admin/page", element: <AdminPage /> },
]);
function App() {
  return (
    <div className="flex flex-col items-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

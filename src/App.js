import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./page/Home";
import Bid from "./page/Bid";
import Sell from "./page/Sell";
import ItemDetail from "./page/ItemDetail";
import Mypage from "./page/Mypage";
import Auth from "./page/admin/Auth";
import AdminList from "./page/admin/AdminList";
import ItemList from "./page/ItemList";
import Login from "./page/auth/login";
import Term from "./page/auth/term";
import LikeLists from "./page/LikeLists";
import AdminDetail from "./page/admin/AdminDetail";
import Test from "./test";

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

      { path: "/likelists", element: <LikeLists /> },
    ],
  },
  {
    path: "/admin",
    element: <Auth />,
  },
  { path: "/admin/list", element: <AdminList /> },
  { path: "/admin/list/:id", element: <AdminDetail /> },
  { path: "/login", element: <Login /> },
  { path: "/login/term", element: <Term /> },
  { path: "/test", element: <Test /> },
]);
function App() {
  return (
    <div className="flex flex-col items-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

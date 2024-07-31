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
import AdminLayout from "./AdminLayout";
import Test from "./test";
import ItemDetailSell from "./page/ItemDetailSell";
import Loading from "./page/Loading";
import MaterialBoard from "./page/board/MaterialBoard";
import MaterialBoardDetail from "./page/board/MaterialBoardDetail";
import SignUp from "./components/auth/SignUp";
import MaterialBoardUpload from "./page/board/MaterialBoardUpload";
import Notfound from "./page/Notfound";
import All from "./page/All";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <All />,
      },
      {
        path: "/about",
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
      { path: "/detail/:id/sell", element: <ItemDetailSell /> },
      { path: "/mypage", element: <Mypage /> },
      { path: "/itemlists/:category", element: <ItemList /> },
      { path: "/likelists", element: <LikeLists /> },
      { path: "/login", element: <Login /> },
      { path: "/login/term", element: <Term /> },
      { path: "/materialBoard", element: <MaterialBoard /> },
      { path: "/materialBoard/:id", element: <MaterialBoardDetail /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/materialBoard/upload", element: <MaterialBoardUpload /> },
    ],
  },
  { path: "/test", element: <Test /> },
  {
    path: "/admin",

    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Auth />,
      },
      { path: "list", element: <AdminList /> },
      { path: "list/:id", element: <AdminDetail /> },
    ],
  },
  { path: "/loading", element: <Loading /> },
  { path: "/*", element: <Notfound /> },
]);
function App() {
  return (
    <div className="flex flex-col items-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

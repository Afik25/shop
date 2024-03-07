import MainLayout from "../MainLayout";
import PersistLogin from "../hooks/context/hooks/PersistLogin";
import RequireAuth from "../hooks/context/hooks/RequireAuth";
//
// pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Administration from "../pages/Administration";
//
// Layouts
import Dashboard from "../pages/layouts/Dashboard";
import Sale from "../pages/layouts/Sale";
import HumanRessourse from "../pages/layouts/HumanRessourse";
import Configuration from "../pages/layouts/Configuration";
//
import Article from "../pages/layouts/configurations/Article";
import Module from "../pages/layouts/configurations/Module";

//
// Control
import NotFound from "../pages/404";
import Unauthorized from "../pages/Unauthorized";

const ROLES = {
  root: "root",
  admin: "admin",
  user: "user",
};

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      {
        element: <PersistLogin />,
        children: [
          {
            element: <RequireAuth allowedRoles={[ROLES.admin, ROLES.user]} />,
            children: [
              {
                path: "/admin",
                element: <Administration />,
                children: [
                  { path: "/admin", element: <Dashboard /> },
                  { path: "sales", element: <Sale /> },
                  { path: "hr", element: <HumanRessourse /> },
                  {
                    path: "configuration",
                    element: <Configuration />,
                    children: [
                      { index: true, element: <Article /> },
                      { path: "modules", element: <Module /> },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { path: "*", element: <NotFound /> },
      { path: "/unauthorized", element: <Unauthorized /> },
    ],
  },
];

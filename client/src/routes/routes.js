import MainLayout from "../MainLayout";
import PersistLogin from "../state/context/hooks/PersistLogin";
import RequireAuth from "../state/context/hooks/RequireAuth";
//
// pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Administration from "../pages/Administration";
//
// Layouts
import Configuration from "../pages/layouts/Configuration";
import Dashboard from "../pages/layouts/Dashboard";
import Sale from "../pages/layouts/Sale";
import HumanRessourse from "../pages/layouts/HumanRessourse";
// 
import Article from "../pages/layouts/configurations/Article";
import Partner from "../pages/layouts/configurations/Partner";
import Entity from "../pages/layouts/configurations/Entity";
import Subscription from "../pages/layouts/configurations/Subscription";

//
// Control
import NotFound from "../pages/404";
import Unauthorized from "../pages/Unauthorized";

const ROLES = {
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
                      { path: "product", element: <Article /> },
                      { path: "partner", element: <Partner /> },
                      { path: "extension", element: <Entity /> },
                      { index: true, element: <Subscription /> },
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

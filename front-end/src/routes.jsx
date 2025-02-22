import React from "react";

// Lazy load your components
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard.jsx"));
const RealTimeMonitoring = React.lazy(
  () => import("./views/realTimeMonitoring/RealTimeMonitoring.jsx")
);
const DeveloperMode = React.lazy(
  () => import("./views/developerMode/DeveloperMode.jsx")
);

// Define your routes here
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/Dashboard", name: "Dashboard", element: Dashboard },
  {
    path: "/RealTimeMonitoring",
    name: "Real-Time Monitoring",
    element: RealTimeMonitoring,
  },
  { path: "/DeveloperMode", name: "Developer Mode", element: DeveloperMode },
];

export default routes;

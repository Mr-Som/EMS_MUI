import React from "react";

// Lazy load your components
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard.jsx"));
const RealTimeMonitoring = React.lazy(
  () => import("./views/realTimeMonitoring/RealTimeMonitoring.jsx")
);
const DeveloperMode = React.lazy(
  () => import("./views/developerMode/DeveloperMode.jsx")
);

const UserManagement = React.lazy(
  () => import("./views/configurations/UserManagement.jsx")
);

const GatewayManagement = React.lazy(
  () => import("./views/configurations/GatewayManagement/index.jsx")
);

const AddGateway = React.lazy(
  () => import("./views/configurations/GatewayManagement/Add.jsx")
);

const EditGateway = React.lazy(
  () => import("./views/configurations/GatewayManagement/Edit.jsx")
);

const MeterManagement = React.lazy(
  () => import("./views/configurations/MeterManagement/index.jsx")
);

const AddMeter = React.lazy(
  () => import("./views/configurations/MeterManagement/Add.jsx")
);

const EditMeter = React.lazy(
  () => import("./views/configurations/MeterManagement/Edit.jsx")
);

const EnergyAnalysis = React.lazy(() => import("./component/Error.jsx"));

const GraphicalView = React.lazy(() => import("./component/Error.jsx"));

const Battery = React.lazy(() => import("./component/Error.jsx"));

const SolarSystem = React.lazy(() => import("./component/Error.jsx"));

const Reports = React.lazy(() => import("./component/Error.jsx"));

const PerpaidManagement = React.lazy(() => import("./component/Error.jsx"));

const CarbonAnalysis = React.lazy(() => import("./component/Error.jsx"));

const Alarm = React.lazy(() => import("./component/Error.jsx"));

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
  { path: "/UserManagement", name: "User Management", element: UserManagement },
  {
    path: "/GatewayManagement",
    name: "Gateway Management",
    element: GatewayManagement,
  },
  {
    path: "/gatewayManagement/Add",
    name: "Add Gateway",
    element: AddGateway,
  },
  {
    path: "/gatewayManagement/Edit",
    name: "Edit Gateway",
    element: EditGateway,
  },
  {
    path: "/MeterManagement",
    name: "Meter Management",
    element: MeterManagement,
  },
  { path: "/meterManagement/Add", name: "Add Meter", element: AddMeter },
  { path: "/meterManagement/Edit", name: "Edit Meter", element: EditMeter },

  { path: "/energyAnalysis", name: "Energy Analysis", element: EnergyAnalysis },
  { path: "/graphicalView", name: "Graphical View", element: GraphicalView },
  { path: "/battery", name: "Battery Management", element: Battery },
  { path: "/solarSystem", name: "Solar System", element: SolarSystem },
  { path: "/reports", name: "Reports", element: Reports },
  {
    path: "/perpaidManagement",
    name: "Perpaid Management",
    element: PerpaidManagement,
  },
  { path: "/carbonAnalysis", name: "Carbon Analysis", element: CarbonAnalysis },
  { path: "/alarm", name: "Alarm", element: Alarm },
];

export default routes;

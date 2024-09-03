import { Car, Route, User } from "lucide-react";

export const sidebarLinks = [
  {
    route: "/vehicle-registration",
    label: "Vehicle Registration",
    icon: <Car className="w-6 h-6" />,
  },
  {
    route: "/route-path-registration",
    label: "Route Path Registration",
    icon: <Route className="w-6 h-6" />,
  },
  {
    route: "/driver-registration",
    label: "Driver Registration",
    icon: <User className="w-6 h-6" />,
  },
];

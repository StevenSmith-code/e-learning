import { Cog, Compass, Layout, List, ShoppingCart } from "lucide-react";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
    activeIcon: Layout,
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
    activeIcon: Compass,
  },
  {
    icon: ShoppingCart,
    label: "Cart",
    href: "/cart",
    activeIcon: ShoppingCart,
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
    activeIcon: List,
  },
  {
    icon: Cog,
    label: "Settings",
    href: "/teacher/settings",
    activeIcon: Cog,
  },
];

const SidebarRoutes = () => {
  const { pathname } = useLocation();

  const isTeacher = pathname?.includes("/teacher");

  const routes = isTeacher ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
          activeIcon={route.activeIcon}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;

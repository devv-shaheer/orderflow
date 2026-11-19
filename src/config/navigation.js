import {
  IconLayoutDashboard,
  IconClipboardList,
  IconUsers,
  IconPackage,
  IconWallet,
  IconBuildingWarehouse,
  IconChartBar,
  IconSettings,
} from "@tabler/icons-react";

export const navGroups = [
  {
    label: null,
    items: [
      { label: "Overview", href: "/overview", icon: IconLayoutDashboard },
    ],
  },
  {
    label: "Sales",
    items: [
      { label: "Orders", href: "/orders", icon: IconClipboardList },
      { label: "Customers", href: "/customers", icon: IconUsers },
      { label: "Products & Services", href: "/products", icon: IconPackage },
    ],
  },
  {
    label: "Business",
    items: [
      { label: "Payments", href: "/payments", icon: IconWallet },
      { label: "Inventory", href: "/inventory", icon: IconBuildingWarehouse },
      { label: "Analytics", href: "/analytics", icon: IconChartBar },
    ],
  },
];

export const footerItems = [
  { label: "Settings", href: "/settings", icon: IconSettings },
];

export const allNavItems = [
  ...navGroups.flatMap((group) => group.items),
  ...footerItems,
];

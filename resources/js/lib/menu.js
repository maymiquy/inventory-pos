import { ChartNoAxesCombined, LayoutGrid, Package, TrendingDown, TrendingUp, UserCog, Users, Warehouse } from "lucide-react";

const getMenu = (pathname) => {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    label: 'Dashboard',
                    href: '/dashboard',
                    active: pathname === ('/dashboard'),
                    icon: LayoutGrid,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "Master Data",
            menus: [
                {
                    label: 'Products',
                    href: '/products',
                    active: pathname.includes('/products'),
                    icon: Package,
                    submenus: []
                },
                {
                    label: 'Customers',
                    href: '/customers',
                    active: pathname.includes('/customers'),
                    icon: Users,
                    submenus: []
                },
                {
                    label: 'Suppliers',
                    href: '/suppliers',
                    active: pathname.includes('/suppliers'),
                    icon: Warehouse,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "Point Of Sales",
            menus: [
                {
                    label: 'Incomes',
                    href: '/incomes',
                    active: pathname.includes('/incomes'),
                    icon: TrendingUp,
                    submenus: []
                },
                {
                    label: 'Expenses',
                    href: '/expenses',
                    active: pathname.includes('/expenses'),
                    icon: TrendingDown,
                    submenus: []
                },
                {
                    label: 'Reports',
                    href: '/reports',
                    active: pathname.includes('/reports'),
                    icon: ChartNoAxesCombined,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "Settings",
            menus: [
                {
                    label: 'Profile',
                    href: '/profile',
                    active: pathname.includes('/profile'),
                    icon: UserCog,
                    submenus: []
                }
            ]
        }
    ]
}

export default getMenu;

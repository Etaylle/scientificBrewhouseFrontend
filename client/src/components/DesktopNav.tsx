import { useLanguage } from "@/components/language-provider";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function DesktopNav() {
    const { t } = useLanguage();

    const navItems = [
        { href: "#about", label: t("nav.about") },
        { href: "#gallery", label: t("nav.gallery") },
        { href: "#dashboard", label: t("nav.dashboard") },
        { href: "#currentBeer", label: t("nav.currentBeer") },
        { href: "#blog", label: t("nav.blog") },
    ];

    return (
        <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex gap-4">
                {navItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                        <NavigationMenuLink
                            href={item.href}
                            className="text-foreground dark:text-foreground bg-muted dark:bg-muted hover:bg-accent hover:text-white dark:hover:bg-accent px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                        >
                            {item.label}
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

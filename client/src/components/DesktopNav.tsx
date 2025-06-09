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
        <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                {navItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                        <NavigationMenuLink
                            href={item.href}
                            className={navigationMenuTriggerStyle()}
                        >
                            {item.label}
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

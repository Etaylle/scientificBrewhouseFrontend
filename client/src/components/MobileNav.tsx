import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";

export function MobileNav() {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);

    const handleClick = (id: string) => {
        setOpen(false);
        if (id.startsWith("/")) 
            {
        window.location.href = id;
        return;
    }

        setTimeout(() => {
            const target = document.querySelector(id);
            if (target) {

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                    });
                });
            }
        }, 200);
    };


    const navItems = [
        { href: "/", label: t("nav.home") },
        { href: "#about", label: t("nav.about") },
        { href: "#gallery", label: t("nav.gallery") },
        { href: "#dashboard", label: t("nav.dashboard") },
        { href: "#currentBeer", label: t("nav.currentBeer") },
        { href: "#blog", label: t("nav.blog") },
        { href: "/historical", label: t("nav.historical") },

    ];

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="default" size="icon" className="mobile:hidden">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </Button>
            </SheetTrigger>

            <SheetContent
                side="top"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-6 justify-items-center"
            >
                {navItems.map((item) => (
                    <button
                        key={item.href}
                        onClick={() => handleClick(item.href)}
                        className="w-full max-w-xs text-center text-lg font-medium text-foreground dark:text-foreground bg-muted/50 dark:bg-muted/40 hover:bg-muted dark:hover:bg-muted px-4 py-3 rounded-lg transition-colors"
                    >
                        {item.label}
                    </button>
                ))}
            </SheetContent>
        </Sheet>
    );
}

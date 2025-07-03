import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function LanguageToggle({ language, setLanguage }) {
    return (
        <div className="relative flex bg-muted dark:bg-muted rounded-md w-20">
            <motion.div
                layout
                transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                className={`absolute top-0 bottom-0 w-1/2 rounded-md bg-primary ${language === "de" ? 'left-0' : 'right-0'}`}
            />

            {/* Sprach-Buttons */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setLanguage("de")}
                className={`flex-1 z-10 text-sm px-0 ${language === "de" ? 'text-white' : 'text-foreground'}`}
            >
                DE
            </Button>
            <Button
                variant="ghost"
                size="default"
                onClick={() => setLanguage("en")}
                className={`flex-1 z-10 text-sm px-0 ${language === "en" ? 'text-white' : 'text-foreground'}`}
            >
                EN
            </Button>
        </div>
    );
}

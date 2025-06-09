import { useLanguage } from "@/components/language-provider";

export function AboutSection() {
    const { t } = useLanguage();

    return (
        <section id="about" className="container mx-auto px-4 py-12 space-y-6">
            <h2 className="text-3xl font-bold text-foreground mb-4">
                {t("about.title") ?? "Über die Campus-Brauerei"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
                {t("about.text") ?? "In unserer modernen Brauerei am FH Campus Wien vereinen wir traditionelles Handwerk mit innovativer Forschung. Studierende und Lehrende entwickeln gemeinsam neue Biersorten und optimieren Brauprozesse durch den Einsatz von IoT und Sensorik-Technologien."}
            </p>
        </section>
    );
}

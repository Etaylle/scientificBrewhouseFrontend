import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: {
      de: "Brauprojekt",
      en: "Brewing Project",
    },
    title: {
      de: "Wiener Lager",
      en: "Vienna Lager",
    },
    shortText: {
      de: "Unser erstes Wiener Lager, gebraut mit feinem Aromahopfen.",
      en: "Our first Vienna Lager, brewed with fine aroma hops.",
    },
    fullText: {
      de: "Das Wiener Lager ist ein traditionsreiches Bier, das seinen Ursprung im 19. Jahrhundert in Wien hat. Es zeichnet sich durch seine bernsteinfarbene Farbe, seinen vollmundigen Geschmack und eine angenehme Hopfennote aus. An der Hochschule Campus Wien verbinden wir traditionelles Brauhandwerk mit moderner Sensorikforschung, um die Qualität und das Aroma des Wiener Lagers stetig weiterzuentwickeln. Kommen Sie vorbei und erleben Sie Wiener Braukunst hautnah!",
      en: "Vienna Lager is a traditional beer that originated in Vienna in the 19th century. It is characterized by its amber color, full-bodied taste, and pleasant hop notes. At the Campus Vienna University of Applied Sciences, we combine traditional brewing craftsmanship with modern sensor research to continuously enhance the quality and aroma of Vienna Lager. Visit us and experience Viennese brewing art first-hand!",
    },
    image: "/src/components/img/wiener-lager.jpg",
  },
  {
    id: 2,
    category: {
      de: "Universitätsforschung",
      en: "University Research",
    },
    title: {
      de: "Universitätsforschung",
      en: "University Research",
    },
    shortText: {
      de: "Innovative Forschung rund ums Bier, Gärung und neue Brauverfahren.",
      en: "Innovative research on beer, fermentation, and new brewing methods.",
    },
    fullText: {
      de: "An der Hochschule Campus Wien betreiben wir umfassende Forschung im Bereich der Bierherstellung. Unser Fokus liegt auf der Optimierung von Gärungsprozessen, der Entwicklung neuer Hopfenextrakte und der Anwendung modernster Sensoriktechnologien. Studierende und Forschende arbeiten Hand in Hand, um die Grenzen des traditionellen Brauhandwerks zu erweitern und innovative Geschmackserlebnisse zu schaffen.",
      en: "At the Campus Vienna University of Applied Sciences, we conduct extensive research in the field of beer production. Our focus is on optimizing fermentation processes, developing new hop extracts, and applying the latest sensor technologies. Students and researchers collaborate to push the boundaries of traditional brewing and create innovative taste experiences.",
    },
    image: "/src/components/img/hero.jpg", // oder dein anderes Forschungsbild
  },
];

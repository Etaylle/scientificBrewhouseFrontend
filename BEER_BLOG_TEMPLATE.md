# 🍺 Anleitung: Neues fertiges Bier zum Blog hinzufügen

## 📝 Schritt-für-Schritt Anleitung

### 1. Bilder vorbereiten
- Platziere deine Bier-Bilder in: `client/public/images/`
- Empfohlenes Format: JPG oder PNG
- Empfohlene Größe: mindestens 1200x800px
- Benenne sie sinnvoll, z.B.: `pale-ale-2025.jpg`

### 2. Blog-Eintrag erstellen

Öffne die Datei: `client/src/components/blogPosts/blogPosts.ts`

Füge einen neuen Eintrag nach diesem Muster hinzu:

```typescript
{
  id: "3", // ⚠️ WICHTIG: Eindeutige ID! Zähle hoch (1, 2, 3, ...)
  slug: "mein-bier-name", // URL-freundlich: klein, keine Leerzeichen, nur Buchstaben und -
  
  title: {
    en: "My Beer Name in English",
    de: "Mein Biername auf Deutsch",
  },
  
  excerpt: {
    en: "Short description in English (2-3 sentences)",
    de: "Kurze Beschreibung auf Deutsch (2-3 Sätze)",
  },
  
  content: {
    en: `
# My Beer Name

## Story
Tell your beer's story here in English...

## Brewing Process
Describe the brewing process...

## Tasting Notes
What does it taste like?
    `,
    de: `
# Mein Biername

## Geschichte
Erzähle die Geschichte deines Bieres auf Deutsch...

## Brauprozess
Beschreibe den Brauprozess...

## Verkostungsnotizen
Wie schmeckt es?
    `,
  },
  
  author: "Braumeister Name",
  date: "2025-11-09", // Format: YYYY-MM-DD
  readTime: "5 min",
  
  category: "Fertige Biere", // ⭐ Für gebraute Biere diese Kategorie verwenden!
  // Andere Optionen: "Geschichte", "Biersorten", "Forschung & Entwicklung", "Veranstaltungen", "Neuigkeiten"
  
  tags: ["IPA", "Hopfig", "Amerikanisch"], // Stichworte für Suche
  
  featured: true, // true = erscheint auf Dashboard, false = nur im Blog
  
  images: [
    "/images/mein-bier-hauptbild.jpg", // Erstes Bild = Titelbild
    "/images/mein-bier-detail1.jpg",
    "/images/mein-bier-detail2.jpg",
  ],
  
  brewingData: {
    originalGravity: 1.052,  // Stammwürze (z.B. 12.8°P = 1.052)
    finalGravity: 1.012,      // Restextrakt
    abv: 5.2,                 // Alkoholgehalt in %
    ibu: 45,                  // Bitterkeit (International Bitterness Units)
    srm: 12,                  // Farbe (Standard Reference Method)
    efficiency: 75,           // Sudhausausbeute in %
  },
  
  // ⭐ NEU: Professionelles Bewertungssystem wie auf BeerTasting.com (OPTIONAL)
  // Nur für "Fertige Biere" Kategorie
  ratings: {
    overall: 4.5,             // Gesamtbewertung (0-5)
    count: 20,                // Anzahl Bewertungen
    categories: {
      appearance: 4.6,        // Aussehen: Farbe, Klarheit, Schaum (0-5)
      aroma: 4.7,             // Geruch: Hopfen, Malz, Fruchtnoten (0-5)
      taste: 4.5,             // Geschmack: Geschmacksprofil (0-5)
      mouthfeel: 4.4,         // Mundgefühl: Körper, Kohlensäure (0-5)
      overall: 4.5,           // Gesamteindruck (0-5)
    },
    distribution: {           // Verteilung der Sterne
      1: 0,                   // 0 Personen gaben 1 Stern
      2: 1,                   // 1 Person gab 2 Sterne
      3: 2,                   // 2 Personen gaben 3 Sterne
      4: 7,                   // 7 Personen gaben 4 Sterne
      5: 10                   // 10 Personen gaben 5 Sterne
    }
  },
},
```

### 3. Kategorien erklärt

- **Fertige Biere**: ⭐ NEUE KATEGORIE! Eure gebrauten Biere mit Bewertungssystem
- **Geschichte**: Historische Artikel über Bierkultur und Traditionen
- **Biersorten**: Informationen über verschiedene Bierstile
- **Forschung & Entwicklung**: Experimente, neue Techniken
- **Veranstaltungen**: Brauerevents, Workshops
- **Neuigkeiten**: Allgemeine News, Ankündigungen

### 4. Featured Beer (Dashboard-Anzeige)

Nur **EIN** Bier sollte `featured: true` haben!
- Dieses erscheint prominent auf dem Dashboard
- Alle anderen sollten `featured: false` haben

### 5. Brauwerte Guide

#### Stammwürze (Original Gravity)
- Leicht: 1.030-1.040 (7-10°P)
- Mittel: 1.040-1.055 (10-13.5°P)
- Stark: 1.055-1.075 (13.5-18°P)

#### Bitterkeit (IBU)
- Mild: 10-25 IBU
- Moderat: 25-45 IBU
- Hopfig: 45-70 IBU
- Sehr hopfig: 70+ IBU

#### Farbe (SRM/EBC)
- Hell: 2-6 SRM (4-12 EBC)
- Gold: 6-12 SRM (12-24 EBC)
- Amber: 12-20 SRM (24-40 EBC)
- Braun: 20-30 SRM (40-60 EBC)
- Schwarz: 30+ SRM (60+ EBC)

## 🎯 Schnell-Template

Kopiere das und fülle es aus:

```typescript
{
  id: "NEUE_ID",
  slug: "bier-name",
  title: { en: "Beer Name", de: "Biername" },
  excerpt: { 
    en: "Short English description", 
    de: "Kurze deutsche Beschreibung" 
  },
  content: { 
    en: `# Beer Name\n\nYour content here...`, 
    de: `# Biername\n\nDein Inhalt hier...` 
  },
  author: "Dein Name",
  date: "2025-11-09",
  readTime: "5 min",
  category: "Fertige Biere",
  tags: ["Tag1", "Tag2"],
  featured: false,
  images: ["/images/dein-bild.jpg"],
  brewingData: {
    originalGravity: 1.050,
    finalGravity: 1.012,
    abv: 5.0,
    ibu: 30,
    srm: 10,
    efficiency: 75,
  },
  // Optional: Nur für "Fertige Biere" - Professionelles Bewertungssystem
  ratings: {
    overall: 4.5,
    count: 10,
    categories: {
      appearance: 4.6,
      aroma: 4.7,
      taste: 4.5,
      mouthfeel: 4.4,
      overall: 4.5,
    },
    distribution: { 1: 0, 2: 0, 3: 1, 4: 4, 5: 5 }
  },
},
```

## ✅ Checkliste vor dem Speichern

- [ ] Eindeutige ID vergeben
- [ ] Slug ist URL-freundlich (klein, keine Leerzeichen)
- [ ] Beide Sprachen (EN + DE) ausgefüllt
- [ ] Bilder in `/client/public/images/` vorhanden
- [ ] Bildpfade korrekt (`/images/name.jpg`)
- [ ] Datum im Format YYYY-MM-DD
- [ ] Nur EIN Bier hat `featured: true`
- [ ] Brauwerte sind realistisch
- [ ] Komma am Ende des Eintrags nicht vergessen!

## 🚀 Nach dem Hinzufügen

1. Speichere `blogPosts.ts`
2. Die Seite aktualisiert sich automatisch
3. Prüfe:
   - Blog-Seite: `http://localhost:3000/#blog`
   - Einzelansicht: `http://localhost:3000/blog/dein-slug`
   - Dashboard (wenn featured): `http://localhost:3000/#dashboard`

## 💡 Tipps

### Bewertungssystem für "Fertige Biere"

Das neue professionelle Bewertungssystem (inspiriert von BeerTasting.com) zeigt:

- 🎯 **5 Bewertungskategorien:**
  - **Aussehen** (Appearance): Farbe, Klarheit, Schaum
  - **Geruch** (Aroma): Hopfen, Malz, Fruchtnoten
  - **Geschmack** (Taste): Geschmacksprofil
  - **Mundgefühl** (Mouthfeel): Körper, Kohlensäure
  - **Gesamt** (Overall): Gesamteindruck

- 📊 **Visualisierungen:**
  - Große Gesamtbewertungs-Card mit Gradient
  - Kategorie-Cards mit Icons und Farben
  - Progress Bars für jede Kategorie
  - Detaillierte Bewertungsverteilung

- ⭐ **Features:**
  - Sterne-Anzeige auf Blog-Übersicht
  - Detaillierte Aufschlüsselung auf Detailseite
  - Professional Design wie BeerTasting.com
  - Dark Mode Support

**Bewertungs-Skala:** 0.0 - 5.0 (je höher, desto besser)

**Hinweis**: Bewertungen sind aktuell statisch (müssen manuell eingegeben werden). Für ein echtes interaktives Bewertungssystem wäre ein Backend nötig.

### Markdown im Content
  - `# Überschrift 1`
  - `## Überschrift 2`
  - `**fett**`
  - `*kursiv*`
  - `- Liste`

### Gute Bilder
  - Professionelle Bierfotos
  - Gutes Licht
  - Schöner Hintergrund

### SEO-freundliche Slugs
  - ✅ `pale-ale-november-2025`
  - ❌ `Pale Ale November 2025!`

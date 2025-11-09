# Instagram Integration Anleitung

## Aktuelle Implementierung

Die Instagram-Card zeigt jetzt Bilder aus dem `instagramPosts` Array in `InstagramCard.tsx`.

## So fügen Sie echte Instagram-Bilder hinzu:

### Methode 1: Manuelle Bilder (Empfohlen - Einfach)

1. **Gehen Sie zu Ihrem Instagram-Profil:**
   - https://www.instagram.com/scientific_brewhouse/

2. **Wählen Sie 4 Posts aus:**
   - Rechtsklick auf ein Bild → "Bild speichern unter"
   - Speichern Sie die Bilder in `client/public/images/instagram/`
   - Benennen Sie sie z.B.: `post1.jpg`, `post2.jpg`, etc.

3. **Aktualisieren Sie den Code in `InstagramCard.tsx`:**

```typescript
const instagramPosts = [
  {
    id: "1",
    image: "/images/instagram/post1.jpg",
    url: "https://www.instagram.com/scientific_brewhouse/p/C8fUa8Xs5oc/", // Kopieren Sie die URL vom Instagram-Post
  },
  {
    id: "2",
    image: "/images/instagram/post2.jpg",
    url: "https://www.instagram.com/scientific_brewhouse/p/C6_6qy6st_G/",
  },
  {
    id: "3",
    image: "/images/instagram/post3.jpg",
    url: "https://www.instagram.com/scientific_brewhouse/p/C4a06dNNO3j/",

  },
  {
    id:"4",
    image: "/images/instagram/post4.jpg",
    url: "https://www.instagram.com/scientific_brewhouse/p/C4Y57FrsRCV/",
  }
  // ...
];
```

4. **Post-URL finden:**
   - Öffnen Sie einen Instagram-Post
   - Die URL sieht so aus: `https://www.instagram.com/p/CyXXXXXXXXX/`
   - Kopieren Sie diese komplette URL

### Methode 2: Instagram Basic Display API (Fortgeschritten)

**Voraussetzungen:**
- Facebook Developer Account
- Instagram Business oder Creator Account
- OAuth-Token-Management

**Setup-Schritte:**

1. **Facebook App erstellen:**
   - https://developers.facebook.com/apps/
   - "Create App" → "Business" → "Instagram Basic Display"

2. **Instagram Basic Display konfigurieren:**
   - Fügen Sie Ihre Redirect URI hinzu
   - Notieren Sie Client ID und Client Secret

3. **Access Token erhalten:**
   - User Authorization: `https://api.instagram.com/oauth/authorize?client_id={app-id}&redirect_uri={redirect-uri}&scope=user_profile,user_media&response_type=code`
   - Exchange Code for Token
   - Token läuft nach 60 Tagen ab!

4. **API Integration:**

```typescript
// Beispiel API-Aufruf
const INSTAGRAM_TOKEN = 'YOUR_ACCESS_TOKEN';
const INSTAGRAM_USER_ID = 'YOUR_USER_ID';

async function fetchInstagramPosts() {
  const response = await fetch(
    `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,permalink&access_token=${INSTAGRAM_TOKEN}`
  );
  const data = await response.json();
  return data.data.slice(0, 4); // Nehme die ersten 4 Posts
}
```

### Methode 3: Instagram Embed Widget (Automatisch)

**Verwenden Sie das offizielle Instagram Feed Widget:**

1. **Installieren Sie ein Instagram Feed Plugin:**
   ```bash
   npm install react-instagram-embed
   ```

2. **Oder verwenden Sie iframe Embed:**
   ```tsx
   <iframe
     src="https://www.instagram.com/scientific_brewhouse/embed"
     width="320"
     height="440"
     frameBorder="0"
     scrolling="no"
     allowTransparency
   />
   ```

## Empfehlung

Für Ihr Projekt empfehle ich **Methode 1** (Manuelle Bilder):

✅ **Vorteile:**
- Einfach zu implementieren
- Keine API-Limits
- Keine Tokens, die ablaufen
- Volle Kontrolle über die Bildauswahl
- Funktioniert immer

❌ **Nachteile:**
- Manuelles Update erforderlich
- Nicht automatisch aktualisiert

**Tipp:** Aktualisieren Sie die Bilder monatlich oder bei besonderen Events!

## Nächste Schritte

1. Laden Sie 4 Ihrer besten Instagram-Bilder herunter
2. Speichern Sie sie in `client/public/images/instagram/`
3. Aktualisieren Sie das `instagramPosts` Array in `InstagramCard.tsx`
4. Bauen und deployen Sie neu: `npm run build`
5. Push zu GitHub: `git push`
6. Vercel deployed automatisch!

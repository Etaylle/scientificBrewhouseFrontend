export type BlogPost = {
  id: string;
  slug: string;
  title: { en: string; de: string };
  excerpt: { en: string; de: string };
  content: { en: string; de: string };
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  images: string[];
  brewingData: {
    originalGravity: number;
    finalGravity: number;
    abv: number;
    ibu: number;
    srm: number;
    efficiency: number;
  };
};


export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "wiener-lager-revival",
    title: {
      en: "Wiener Lager - The Revival of a Beer Style",
      de: "Wiener Lager – Wiederauferstehung eines Bierstils",
    },
    excerpt: {
      en: "Discover the history and revival of Wiener Lager, a balanced amber beer pioneered by Anton Dreher, blending traditional techniques with modern craft brewing.",
      de: "Entdecke die Geschichte und Wiederbelebung des Wiener Lagers, eines ausgewogenen bernsteinfarbenen Bieres, das von Anton Dreher entwickelt wurde und traditionelle Techniken mit modernem Craft-Brauen verbindet.",
    },
    content: {
      en: `
# Wiener Lager - The Revival of a Beer Style

## Historical Background
In 1841, Anton Dreher, an Austrian brewing legend, crafted a beer in Schwechat that was lighter than the dark beers prevalent at the time. Known as “Klein-Schwechater Lagerbier,” its rich amber hue was considered pale by contemporary standards. This beer was a sensation, quickly elevating the Schwechat brewery to one of the largest in the Austrian Empire.

## What Made Wiener Lager Unique?
Dreher, having studied in Bavaria, adopted cold fermentation techniques using bottom-fermenting yeast, which resulted in less complex flavors and greater drinkability compared to top-fermented beers. He also pioneered “Vienna Malt,” which produced the beer’s signature amber color and lighter malt profile, making it widely appealing. However, the rise of even lighter Pilsner malt from Pilsen soon overshadowed Wiener Lager, and by around 1900, it had largely disappeared from Austria. Austrian immigrants preserved the style in Mexico, and it was later rediscovered by the American craft beer movement, eventually returning to its homeland.

## BJCP 2015 Style Guidelines
**Overall Impression:** A medium-strength amber lager with a soft, smooth malt character and moderate bitterness, finishing relatively dry. The malt flavor is clean, bready, and slightly toasty, derived from high-quality base malts and brewing processes rather than specialty malts or unmalted grains.

**Specifications:**
- **Original Gravity:** 11.9–13.6°P
- **Final Gravity:** 2.6–3.6°P
- **Alcohol:** 4.7–5.5% vol
- **Bitterness:** 18–30 IBU
- **Color:** 18–30 EBC

## Brewing Your Own Wiener Lager
New to brewing? Our **Wiener Lager Brewing Kit** is perfect for beginners! For those brewing 20–30 liters and aiming for an authentic Wiener Lager, try our **Edmund – Wiener Lager Brewing Package**. Happy brewing, and as always, *Gut Sud!*
      `,
      de: `
# Wiener Lager – Wiederauferstehung eines Bierstils

## Historischer Hintergrund
Im Jahr 1841 braute Anton Dreher, eine österreichische Brauerlegende, in Schwechat ein Bier, das heller war als die damals üblichen dunklen Biere. Das „Klein-Schwechater Lagerbier“ mit seinem satten Bernsteinfarbton galt damals bereits als hell. Dieses Bier war eine Sensation und machte die Schwechater Brauerei kurzfristig zu einer der größten im Kaiserreich.

## Was machte das Wiener Lager besonders?
Dreher, der in jungen Jahren Studienreisen unternahm, lernte in Bayern die Vorteile der kalten Gärführung kennen und kombinierte diese mit der damals fortschrittlichsten englischen Vermälzungstechnik. Die kalte Gärung mit untergäriger Hefe und lange, kalte Lagerzeiten führten im Vergleich zu obergärigen Bieren zu weniger komplexen Aromen und damit zu einer einfacheren Trinkbarkeit. Drehers Vermälzungstechnik begründete das „Wiener Malz“, das bernsteinfarbene Biere ermöglichte. Diese hellere Farbe und die reduzierte Malzaromatik im Vergleich zu dunklen Bieren förderten die Massentauglichkeit des Wiener Lagers und seine schnelle Verbreitung. Doch schon bald übertraf das noch hellere Pilsner Malz她在 Pilsen den Wiener Stil, und ab etwa 1900 wurde das Wiener Lager in Österreich nicht mehr gebraut. Österreichische Auswanderer bewahrten den Stil in Mexiko, bis die Craft-Beer-Bewegung in den USA ihn wiederentdeckte und er schließlich in seine Heimat zurückfand.

## BJCP 2015 Stilrichtlinien
**Gesamteindruck:** Ein mittelstarkes, bernsteinfarbenes Lager mit weicher, milder Malznote und mäßiger Bittere, jedoch relativ trockenem Abgang. Der Malzgeschmack ist reintönig, reichhaltig brotig und leicht toastig, abgeleitet von hochwertigen Basismalzen und dem Brauprozess, nicht von Spezialmalzen oder Rohfrucht.

**Spezifikation:**
- **Stammwürze:** 11,9–13,6°P
- **Restextrakt:** 2,6–3,6°P
- **Alkohol:** 4,7–5,5% vol
- **Bittere:** 18–30 IBU
- **Farbe:** 18–30 EBC

      `,
    },
    author: "https://mashcamp.shop/der-bierstil-wiener-lager/",
    date: "Unbekannt",
    readTime: "6 min",
    category: "Biersorten",
    tags: ["Wiener Lager", "Bierstil", "Traditionell"],
    featured: false,
    images: ["/images/wiener-lager.jpg"],
    brewingData: {
      originalGravity: 1.048,
      finalGravity: 1.012,
      abv: 5.0,
      ibu: 24,
      srm: 10,
      efficiency: 75,
    },
  },

  {
  id: "2",
  slug: "revolution-klein-schwechat",
  title: {
    en: "Revolution in Klein-Schwechat",
    de: "Revolution in Klein-Schwechat"
  },
  excerpt: {
    en: "How Anton Dreher revolutionized brewing around 1840 with the first pale Vienna Lager.",
    de: "Wie Anton Dreher um 1840 das Brauwesen mit dem ersten Wiener Lager revolutionierte."
  },
  content: {
    en: `
> This post is available only in German for historical and linguistic authenticity.

(English summary coming soon.)
    `,
    de: `
    
<p className="text-center text-gray-500 italic mt-2 pl-6">
  Anton Dreher Brauerei
</p>

## Um 1840 stellte Anton Dreher das heimische Brauwesen mit technologischen Innovationen und der Einführung des untergärigen Brauverfahrens auf den Kopf. Sein „Klein-Schwechater Lagerbier” war das erste helle Lagerbier in Europa - und findet bis heute Nachahmer. ##

Im Jahr 2016 wurde das 500. Jubiläumsjahr des „Reinheitsgebots“ feierlich begangen. Bayrische Brauereien priesen die Vorzüge des berühmten Gesetzes an, in München waren mehrere Ausstellungen über die Geschichte der Bayerischen Landesordnung von 1516 zu sehen, und Bierliebhaber\_innen in ganz Deutschland debattierten wieder einmal über die Relevanz dieser jahrhundertalten Schrift.

Zur gleichen Zeit wurde auch in Wien ein Jubiläum gefeiert: 175 Jahre Wiener Lager. Auch wenn dies weniger Aufsehen erregt hat, hatte man dennoch guten Grund, den Wiener Beitrag zum Kulturerbe des Bieres zu würdigen. Untergäriges Bier war zwar schon davor in Europa hergestellt worden. Doch erst 1841 sorgte Anton Dreher, Inhaber des Brauhauses zu Klein-Schwechat, für eine bedeutende Revolution in der Braugeschichte: Durch die Zusammenführung unterschiedlicher technischer Neuerungen, die er in Großbritannien und Bayern kennengelernt hatte, konnte er das erste Lagerbier herstellen, das ganzjährig gebraut werden konnte.

![Anton Dreher, 1863](/images/anton-dreher.jpg)

<p class="text-sm text-center text-gray-500 italic mt-2">
  Anton Dreher, 1863, Lithografie von Josef Kriehuber, Wien Museum
</p>



Der Vater von Anton Dreher, Franz Anton Dreher, war seit 1787 Besitzer des Brauhauses zu Klein-Schwechat. Als er 1820 starb, war Anton noch ein Kind. Die Mutter und weitere Verwandte mussten den anfangs unwilligen Anton davon überzeugen, dem Weg seines Vaters zu folgen und ins Brauwesen einzusteigen. Doch die Lehrzeit in der Simmeringer Brauerei wurde für Anton prägend. Denn zeitgleich mit ihm machte Gabriel II Sedlmayer, Sohn des berühmten Brauers Gabriel Sedlmayer von der Spaten Brauerei in München, auch in Simmering seine Lehre. Die zwei Braumeister-Söhne freundeten sich schnell an und begaben sich in den frühen 1830er Jahren auf Bildungsreise quer durch Europa, um ihre Kenntnisse im Brauwesen zu perfektionieren. Die letzte Station der Reise war Großbritannien, dessen Biere im frühen 19. Jahrhunderts herausragend waren.

Die britischen Produzenten waren ihrer Konkurrenz auf dem Kontinent in punkto Brauwissen und Technologie meilenweit voraus. Sie hatten sich neue Darrprozesse für Malz ausgedacht, bei denen indirekte Hitze verwendet wurde. Sie hatten auch neue Kühlsysteme entwickelt, um die Würze rascher abzukühlen — ein Verfahren, das einen enormen Beitrag zur Brauhygiene leistete. Die Briten wussten insbesondere um die Bedeutung der Temperaturkontrolle und benutzten Thermometer, um die einzelnen Schritte des Brauprozesses besser zu kontrollieren.

<img src="/images/bierwagen.jpg" alt="Anton Dreher" />

<p class="text-sm text-center text-gray-500 italic mt-2">
  Bierwagen bei der Karlskirche, kolorierter Kupferstich, um 1825, Wien Museum
</p>



Als Dreher wieder 1836 in Schwechat war, begann er, die neuartigen Geräte und Verfahren in der familieneigenen Brauerei, die seit dem Tod des Vaters einen schleichenden Niedergang erlebt hatte, einzuführen. Doch seine neuen Ideen stießen auf erheblichen Widerstand seitens der anderen Brauer. Die Ablehnung ging so weit, dass diese dem jungen „Wirrkopf“ sogar beim Brauerstammtisch auswichen.


<img src="/images/wilhelm-böhm.jpg" alt="Wilhelm Böhm" />

<p class="text-sm text-center text-gray-500 italic mt-2">
  Wilhelm Böhm: Bierhausgast, kolorierter Stahlstich, um 1855, Wien Museum
</p>


Das Brauwesen war noch immer stark von der Zunft kontrolliert und rückwärtsgewandt, und es gab keine Innovationen. Diese Situation war ambivalent. Auf der einen Seite hatten die obergärigen Biere aus Wien einen schlechten Ruf: ein trübes Gebräu, das Zeitgenossen als „recht miserabel” einstuften. Auf der anderen Seite schützte die Verteidigung des Status quo die bisherige Lebensgrundlage der Brauer – bis der junge Dreher mit seinem neuen Wissen alles zu kippen drohte. Bis zu diesem Zeitpunkt hatten die Wiener Brauer ihrem Gespür vertraut und waren Neuerungen wie dem Thermometer grundsätzlich skeptisch gegenüber gestanden. Man glaubte, vom Morgentau im Herbst darauf schließen zu können, ob das Bier im Keller schon reif war, oder fürchtete den diabolischen Einfluss von Gewittern, die das Bier verderben. Doch Dreher lehnte jede Form von Aberglauben ab. 1836 brachte er sein „Kaiserbier“ auf den Markt – ein süffiges obergäriges Bier, das hinsichtlich Qualität andere obergärige Biere in Wien übertraf. Die Gewinne aus dessen Verkauf investierte der selbstbewusste Jung-Brauer ins Unternehmen, 1839 führte er das untergärige Brauverfahren ein, das dem Dreher\`schen „Klein-Schwechater Lager“ den Weg ebnete. Das Bier wurde erstmals 1841 im Wirtshaus „Zur Kohlkreunze“ ausgeschenkt und war eine derartige Sensation, dass es ein unangekündigtes Straßenfest ausgelöst haben soll.

## Was ist eigentlich ein „Wiener Lager“? ##

Obwohl Dreher einen neuen Bierstil erzeugte, hatte er ihn im Grunde genommen nicht erfunden. Vielmehr verwendete er neueste internationale Gärungstechniken und Rezepturen, setzte die Temperaturkontrolle und als erster Brauer in Wien auch die Dampfmaschine ein. Warum dies einer Revolution glich? Weil bis zu diesem Zeitpunkt in vielen europäischen Ländern der Monat April das offizielle Ende der Brausaison war. Von Georgi (23. April) bis Michaeli (29. September) war das Bierbrauen aufgrund der wärmeren Temperaturen sogar in Bayern verboten gewesen, um eine akzeptables Niveau zu gewährleisten. Dreher machte die jahreszeitlichen Einschränkungen obsolet, indem er ein Verfahren entwickelte, das ganzjähriges Bierbrauen ermöglichte.


<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
  <div class="flex flex-col items-center">
    <img src="/images/bierdeckel.jpg" alt="Schwechater Lagerbier Bierdeckel" class="rounded-xl shadow-md" />
    <p class="text-sm text-center text-gray-500 italic mt-2">
      Bierdeckel, undatiert, Wien Museum
    </p>
  </div>
  <div class="flex flex-col items-center">
    <img src="/images/biermarke.jpg" alt="Biermarke 1890" class="rounded-xl shadow-md" />
    <p class="text-sm text-center text-gray-500 italic mt-2">
      Biermarke aus Messing, um 1890, Wien Museum
    </p>
  </div>
</div>

Das von Dreher in 1841 auf den Markt gebrachte malzbetonte Bier hatte eine bernstein-goldene Farbe und einen dezenten Duft von würzigem Hopfen. Verwendet wurde leicht gedarrtes Malz aus Mähren und Hopfen aus Saaz in Böhmen. Die Würze wurde schnell gekühlt, was die Hygiene und Stabilität des Bieres verbesserte – dies hatte Dreher in England gelernt. Sedlmayer in München hatte ihm vor Augen geführt, wie wichtig eine Temperatur-kontrollierte Untergärung ist - gefolgt von mehreren Wochen Lagerung im Keller.

## Der Niedergang und die Wiedergeburt des Wiener Lagers ##

Dreher wurde bekanntlich ein enorm erfolgreicher und reicher Mann. Sein Bierstil wurde lange Zeit auch international geschätzt. So brauten die Münchner ab dem Oktoberfest 1872 ein Märzen „nach Wiener Art“, das auf der „Wiesn“ auch in den folgenden Jahrzehnten ausgeschenkt wurde. Mit Erzherzog Maximilian I, der von 1864 bis 1867 als „Kaiser von Mexiko“ scheiterte, fand das Wiener Lager sogar seinen Weg nach Mexiko, wo heute noch „Negra Modelo“-Biere daran erinnern. Doch auch Bierstile kommen aus der Mode, und so verschwand das Wiener Lager mit der Zeit, ehe es ab den 1980er Jahren eine (meist unterschätzte) Rolle bei der nordamerikanischen „Craft Beer“ Bewegung spielte: „Boston Lager“, das berühmte Aushängeschild der Brauerei Samuel Adams, ist nichts anderes als ein Wiener Lager. In Österreich feierte das Wiener Lager erst vor rund zehn Jahren ein Comeback - und zwar auf Betreiben kleiner Brauereien wie Gusswerk, Loncium oder Brew Age. Kurz vor dem Jubiläum 2016 brachte dann Ottakringer ein Wiener Lager-Bier auf den Markt, und schließlich folgte auch Schwechater - jene Brauerei, von der aus das Wiener Lager einst seinen Siegeszug begonnen hatte.

### Quellen: ###

„Durst Notiz: Kleine aber erhabene Bier-Epopä”, in: Der Humorist, Wien, 17. Juni 1843

Alfred Paleczny: Die Wiener Brauherren: Das goldene Bierjahrhundert, Wien, 2014.

Josef Promintzer: Dreihundert Jahre Brauhaus Schwechat: Vergangenheit und Gegenwart der größten Brauerei Österreichs, Wien, 1932.

Conrad Seidl: Unser Bier: Reisen zu Österreichs Brauereien 1994/95, Wien, 1993.

Christoph Wagner, René Schaumüller, and Gerhard Trumler, 1000 Jahre Österreichisches Bier, Wien, 1996.

Anton Dreher auf Wien Geschichte Wiki.`
  },
  author: "Franz D. Hofer",
  date: "2020-06-29",
  readTime: "10 min",
  category: "Biersorten",
  tags: ["Wiener Lager", "Geschichte", "Anton Dreher", "Schwechat"],
  featured: true,
  images: ["/images/revolution-in-klein-schwechat.jpg"], 
   brewingData: {
      originalGravity: 1.048,
      finalGravity: 1.012,
      abv: 5.0,
      ibu: 24,
      srm: 10,
      efficiency: 75,
    },
}

];
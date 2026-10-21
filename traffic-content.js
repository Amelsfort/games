/* =====================================================================
   INHOUD VAN HET VERKEERSSPEL

   1. BORDEN      – alle borden met hun betekenis
   2. SITUATIES   – kruispunten met weggebruikers en de goede volgorde
   3. LEVELS      – de levels op de kaart, in volgorde

   Tekst tussen enkele aanhalingstekens '…', elke regel eindigt met een komma.
   Een apostrof in tekst schrijf je als \'  (bijv. 'auto\'s').
   ===================================================================== */


/* ---------------------------------------------------------------------
   1. BORDEN
   id:       de naam van de tekening (alleen bestaande tekeningen werken,
             zie de lijst onderaan dit bestand)
   familie:  verbod | gebod | waarschuwing | voorrang | informatie
   --------------------------------------------------------------------- */
const BORDEN = [
  // Verbodsborden (rood rondje: iets mag niet)
  { id: 'verboden-in-te-rijden', familie: 'verbod',       betekenis: 'Verboden in te rijden: je mag deze weg niet in.' },
  { id: 'gesloten',              familie: 'verbod',       betekenis: 'Gesloten voor alle voertuigen: niet met een fiets, brommer of auto.' },
  { id: 'verboden-fietsers',     familie: 'verbod',       betekenis: 'Verboden voor fietsers.' },
  { id: 'verboden-autos',        familie: 'verbod',       betekenis: 'Verboden voor auto\'s.' },
  { id: 'verboden-voetgangers',  familie: 'verbod',       betekenis: 'Verboden voor voetgangers.' },
  { id: 'max-30',                familie: 'verbod',       betekenis: 'Je mag hier niet harder dan 30 kilometer per uur.' },
  { id: 'parkeerverbod',         familie: 'verbod',       betekenis: 'Parkeerverbod: je mag hier niet parkeren.' },
  { id: 'stopverbod',            familie: 'verbod',       betekenis: 'Stopverbod: je mag hier niet stilstaan, ook niet even.' },

  // Gebodsborden (blauw rondje: iets moet)
  { id: 'fietspad',              familie: 'gebod',        betekenis: 'Fietspad: fietsers moeten hier rijden.' },
  { id: 'voetpad',               familie: 'gebod',        betekenis: 'Voetpad: hier mogen alleen voetgangers lopen.' },
  { id: 'rechtdoor',             familie: 'gebod',        betekenis: 'Je moet hier rechtdoor gaan.' },
  { id: 'rechtsaf',              familie: 'gebod',        betekenis: 'Je moet hier rechtsaf gaan.' },

  // Waarschuwingsborden (driehoek met rode rand: let op)
  { id: 'let-op-kruispunt',      familie: 'waarschuwing', betekenis: 'Let op: er komt een kruispunt.' },
  { id: 'let-op-kinderen',       familie: 'waarschuwing', betekenis: 'Let op: kinderen, bijvoorbeeld bij een school.' },
  { id: 'let-op-verkeerslichten',familie: 'waarschuwing', betekenis: 'Let op: er komen verkeerslichten.' },
  { id: 'let-op-zebrapad',       familie: 'waarschuwing', betekenis: 'Let op: er komt een zebrapad.' },
  { id: 'let-op-fietsers',       familie: 'waarschuwing', betekenis: 'Let op: fietsers steken over.' },

  // Voorrangsborden
  { id: 'haaientanden',          familie: 'voorrang',     betekenis: 'Voorrang verlenen: laat al het verkeer op de andere weg voorgaan.' },
  { id: 'stop',                  familie: 'voorrang',     betekenis: 'Stop: helemaal stoppen en al het verkeer op de andere weg voor laten gaan.' },
  { id: 'voorrangsweg',          familie: 'voorrang',     betekenis: 'Voorrangsweg: op de kruispunten heb jij voorrang.' },
  { id: 'einde-voorrangsweg',    familie: 'voorrang',     betekenis: 'Einde voorrangsweg: je hebt geen voorrang meer.' },
  { id: 'voorrangskruispunt',    familie: 'voorrang',     betekenis: 'Voorrangskruispunt: op het volgende kruispunt heb jij voorrang.' },

  // Informatieborden (blauw vierkant)
  { id: 'zebrapad',              familie: 'informatie',   betekenis: 'Hier is een zebrapad, een oversteekplaats voor voetgangers.' },
  { id: 'parkeren',              familie: 'informatie',   betekenis: 'Parkeerplaats: hier mag je parkeren.' },
  { id: 'doodlopend',            familie: 'informatie',   betekenis: 'Doodlopende weg: je kunt hier niet verder.' },
  { id: 'eenrichtingsweg',       familie: 'informatie',   betekenis: 'Eenrichtingsweg: het verkeer mag hier maar één kant op.' },
];

/* De bordenfamilies.
   naam:      de naam van de familie
   betekenis: wat de naam betekent (staat in de Bordenwijzer 📖, zonder vorm of kleur:
              die moet de speler zelf leren)
   vorm:      de vorm en kleur; staat alleen in de uitleg van het level 'Bordenfamilies'
   uitleg:    de hint die de speler ziet na een antwoord */
const FAMILIES = {
  verbod:       { naam: 'Verbodsbord',       betekenis: 'Iets mag níet.',                 vorm: 'Rood rondje',
                  uitleg: 'Een rood rondje betekent: dit mag niet.' },
  gebod:        { naam: 'Gebodsbord',        betekenis: 'Iets móet.',                     vorm: 'Blauw rondje',
                  uitleg: 'Een blauw rondje betekent: dit moet.' },
  waarschuwing: { naam: 'Waarschuwingsbord', betekenis: 'Let op! Er komt iets aan.',      vorm: 'Driehoek met rode rand',
                  uitleg: 'Een driehoek met een rode rand betekent: let op!' },
  voorrang:     { naam: 'Voorrangsbord',     betekenis: 'Wie mag er eerst?',              vorm: 'Elk een eigen vorm',
                  uitleg: 'Voorrangsborden vertellen wie er voor mag. Ze hebben een eigen vorm.' },
  informatie:   { naam: 'Informatiebord',    betekenis: 'Het bord vertelt je iets handigs.',  vorm: 'Blauw vierkant',
                  uitleg: 'Een blauw vierkant geeft informatie.' },
};


/* ---------------------------------------------------------------------
   2. SITUATIES
   De speler kijkt vanaf de kant 'zuid'. Dus:
     zuid = dichtbij,  noord = achteraan,  oost = rechts,  west = links

   zebrapad:  op welke wegen een zebrapad ligt, bijv. ['zuid']
   borden:    per weg: 'haaientanden', 'stop' of 'voorrangsweg'
   lichten:   per weg: 'rood' of 'groen'  (dan krijgen alle wegen een licht)
   weggebruikers:
     id:    een korte naam, gebruikt in 'volgorde'
     type:  auto | fiets | voetganger | ambulance
     van:   de weg waar hij vandaan komt
     naar:  rechtdoor | linksaf | rechtsaf
     kleur: (auto) rood, blauw, geel, groen, oranje, paars, wit
     bij:   (voetganger) bij het zebrapad op deze weg
   volgorde:  wie er eerst mag, dan tweede, enzovoort
   uitleg:    wat de speler ziet als ze het fout doet
   --------------------------------------------------------------------- */
const SITUATIES = {

  // --- zebrapad ---
  'zebra-1': {
    zebrapad: ['zuid'],
    weggebruikers: [
      { id: 'v', type: 'voetganger', bij: 'zuid' },
      { id: 'a', type: 'auto', kleur: 'rood', van: 'zuid', naar: 'rechtdoor' },
    ],
    volgorde: ['v', 'a'],
    uitleg: 'Een voetganger die bij het zebrapad wil oversteken, mag altijd eerst.',
  },
  'zebra-2': {
    zebrapad: ['zuid'],
    weggebruikers: [
      { id: 'v', type: 'voetganger', bij: 'zuid' },
      { id: 'a', type: 'auto', kleur: 'blauw', van: 'west', naar: 'rechtsaf' },
    ],
    volgorde: ['v', 'a'],
    uitleg: 'Ook als je afslaat, laat je de voetganger op het zebrapad eerst oversteken.',
  },
  'zebra-3': {
    zebrapad: ['oost'],
    weggebruikers: [
      { id: 'v', type: 'voetganger', bij: 'oost' },
      { id: 'f', type: 'fiets', van: 'oost', naar: 'rechtdoor' },
    ],
    volgorde: ['v', 'f'],
    uitleg: 'Fietsers moeten ook stoppen voor een voetganger bij het zebrapad.',
  },
  'zebra-4': {
    zebrapad: ['noord'],
    weggebruikers: [
      { id: 'v', type: 'voetganger', bij: 'noord' },
      { id: 'a', type: 'auto', kleur: 'geel', van: 'zuid', naar: 'rechtdoor' },
    ],
    volgorde: ['v', 'a'],
    uitleg: 'De auto rijdt over het zebrapad aan de overkant. Daar wacht een voetganger, dus die mag eerst.',
  },

  // --- rechts gaat voor (gelijkwaardig kruispunt, geen borden) ---
  'rechts-1': {
    weggebruikers: [
      { id: 'a', type: 'auto', kleur: 'rood', van: 'zuid', naar: 'rechtdoor' },
      { id: 'f', type: 'fiets', van: 'oost', naar: 'rechtdoor' },
    ],
    volgorde: ['f', 'a'],
    uitleg: 'De fietser komt van rechts voor de auto. Wie van rechts komt, mag eerst.',
  },
  'rechts-2': {
    weggebruikers: [
      { id: 'a', type: 'auto', kleur: 'blauw', van: 'zuid', naar: 'rechtdoor' },
      { id: 'b', type: 'auto', kleur: 'geel', van: 'west', naar: 'rechtdoor' },
    ],
    volgorde: ['a', 'b'],
    uitleg: 'Voor de gele auto komt de blauwe auto van rechts. Dus de blauwe auto mag eerst.',
  },
  'rechts-3': {
    weggebruikers: [
      { id: 'f', type: 'fiets', van: 'noord', naar: 'rechtdoor' },
      { id: 'a', type: 'auto', kleur: 'groen', van: 'oost', naar: 'rechtdoor' },
    ],
    volgorde: ['f', 'a'],
    uitleg: 'Voor de groene auto komt de fietser van rechts. Dus de fietser mag eerst.',
  },
  'rechts-4': {
    weggebruikers: [
      { id: 'a', type: 'auto', kleur: 'rood', van: 'zuid', naar: 'rechtdoor' },
      { id: 'f', type: 'fiets', van: 'oost', naar: 'rechtdoor' },
      { id: 'b', type: 'auto', kleur: 'groen', van: 'noord', naar: 'rechtdoor' },
    ],
    volgorde: ['b', 'f', 'a'],
    uitleg: 'De groene auto heeft niemand rechts van zich, dus die mag eerst. Daarna de fietser, en dan de rode auto.',
  },
  'rechts-5': {
    weggebruikers: [
      { id: 'a', type: 'auto', kleur: 'oranje', van: 'west', naar: 'rechtdoor' },
      { id: 'f', type: 'fiets', van: 'zuid', naar: 'rechtdoor' },
    ],
    volgorde: ['f', 'a'],
    uitleg: 'Voor de oranje auto komt de fietser van rechts. Dus de fietser mag eerst.',
  },
  'rechts-6': {
    weggebruikers: [
      { id: 'a', type: 'auto', kleur: 'paars', van: 'oost', naar: 'rechtdoor' },
      { id: 'f', type: 'fiets', van: 'zuid', naar: 'rechtdoor' },
      { id: 'b', type: 'auto', kleur: 'blauw', van: 'west', naar: 'rechtdoor' },
    ],
    volgorde: ['a', 'f', 'b'],
    uitleg: 'De paarse auto heeft niemand rechts van zich en mag eerst. Daarna de fietser, en als laatste de blauwe auto.',
  },

  // --- rechtdoor en afslaan ---
  'afslaan-1': {
    weggebruikers: [
      { id: 'a', type: 'auto', kleur: 'rood', van: 'zuid', naar: 'linksaf' },
      { id: 'b', type: 'auto', kleur: 'blauw', van: 'noord', naar: 'rechtdoor' },
    ],
    volgorde: ['b', 'a'],
    uitleg: 'Ze rijden op dezelfde weg. Wie rechtdoor gaat, mag eerst. Wie afslaat, wacht.',
  },
  'afslaan-2': {
    weggebruikers: [
      { id: 'f', type: 'fiets', van: 'zuid', naar: 'rechtdoor' },
      { id: 'a', type: 'auto', kleur: 'geel', van: 'zuid', naar: 'rechtsaf' },
    ],
    volgorde: ['f', 'a'],
    uitleg: 'De auto slaat af en de fietser gaat rechtdoor op dezelfde weg. Dan mag de fietser eerst.',
  },
  'afslaan-3': {
    weggebruikers: [
      { id: 'a', type: 'auto', kleur: 'groen', van: 'noord', naar: 'linksaf' },
      { id: 'f', type: 'fiets', van: 'zuid', naar: 'rechtdoor' },
    ],
    volgorde: ['f', 'a'],
    uitleg: 'De fietser gaat rechtdoor en de auto slaat af. Rechtdoor gaat voor afslaan.',
  },
  'afslaan-4': {
    weggebruikers: [
      { id: 'a', type: 'auto', kleur: 'oranje', van: 'oost', naar: 'linksaf' },
      { id: 'f', type: 'fiets', van: 'west', naar: 'rechtdoor' },
    ],
    volgorde: ['f', 'a'],
    uitleg: 'De fietser gaat rechtdoor en de auto slaat af. Rechtdoor gaat voor afslaan.',
  },

  // --- haaientanden, stop en voorrangsweg ---
  'haaien-1': {
    borden: { oost: 'haaientanden', west: 'haaientanden', noord: 'voorrangsweg', zuid: 'voorrangsweg' },
    weggebruikers: [
      { id: 'a', type: 'auto', kleur: 'rood', van: 'oost', naar: 'rechtdoor' },
      { id: 'f', type: 'fiets', van: 'zuid', naar: 'rechtdoor' },
    ],
    volgorde: ['f', 'a'],
    uitleg: 'Bij de auto staan haaientanden. Dan laat je iedereen op de andere weg voorgaan, ook als je van rechts komt.',
  },
  'haaien-2': {
    borden: { oost: 'haaientanden', west: 'haaientanden', noord: 'voorrangsweg', zuid: 'voorrangsweg' },
    weggebruikers: [
      { id: 'a', type: 'auto', kleur: 'blauw', van: 'west', naar: 'rechtdoor' },
      { id: 'b', type: 'auto', kleur: 'geel', van: 'noord', naar: 'rechtdoor' },
    ],
    volgorde: ['b', 'a'],
    uitleg: 'De blauwe auto staat bij haaientanden. De gele auto rijdt op de voorrangsweg en mag eerst.',
  },
  'haaien-3': {
    borden: { oost: 'stop', west: 'stop', noord: 'voorrangsweg', zuid: 'voorrangsweg' },
    weggebruikers: [
      { id: 'a', type: 'auto', kleur: 'groen', van: 'oost', naar: 'rechtdoor' },
      { id: 'f', type: 'fiets', van: 'noord', naar: 'rechtdoor' },
    ],
    volgorde: ['f', 'a'],
    uitleg: 'Bij een stopbord stop je helemaal en laat je iedereen op de andere weg voorgaan.',
  },
  'haaien-4': {
    borden: { noord: 'haaientanden', zuid: 'haaientanden', oost: 'voorrangsweg', west: 'voorrangsweg' },
    weggebruikers: [
      { id: 'f', type: 'fiets', van: 'noord', naar: 'rechtdoor' },
      { id: 'a', type: 'auto', kleur: 'oranje', van: 'oost', naar: 'rechtdoor' },
    ],
    volgorde: ['a', 'f'],
    uitleg: 'Bij de fietser staan haaientanden. De auto rijdt op de voorrangsweg en mag eerst.',
  },
  'haaien-5': {
    borden: { oost: 'haaientanden', west: 'haaientanden', noord: 'voorrangsweg', zuid: 'voorrangsweg' },
    weggebruikers: [
      { id: 'f', type: 'fiets', van: 'noord', naar: 'rechtdoor' },
      { id: 'a', type: 'auto', kleur: 'rood', van: 'zuid', naar: 'linksaf' },
      { id: 'b', type: 'auto', kleur: 'blauw', van: 'west', naar: 'rechtdoor' },
    ],
    volgorde: ['f', 'a', 'b'],
    uitleg: 'Op de voorrangsweg gaat de fietser rechtdoor en mag eerst, dan de rode auto die afslaat. De blauwe auto staat bij haaientanden en wacht tot het laatst.',
  },

  // --- verkeerslichten ---
  'licht-1': {
    lichten: { zuid: 'rood', noord: 'rood', oost: 'groen', west: 'groen' },
    weggebruikers: [
      { id: 'a', type: 'auto', kleur: 'rood', van: 'zuid', naar: 'rechtdoor' },
      { id: 'f', type: 'fiets', van: 'oost', naar: 'rechtdoor' },
    ],
    volgorde: ['f', 'a'],
    uitleg: 'De fietser heeft groen licht. De auto heeft rood en moet wachten.',
  },
  'licht-2': {
    lichten: { zuid: 'groen', noord: 'groen', oost: 'rood', west: 'rood' },
    weggebruikers: [
      { id: 'a', type: 'auto', kleur: 'blauw', van: 'zuid', naar: 'rechtdoor' },
      { id: 'b', type: 'auto', kleur: 'geel', van: 'oost', naar: 'rechtdoor' },
    ],
    volgorde: ['a', 'b'],
    uitleg: 'De blauwe auto heeft groen. Het verkeerslicht gaat voor de regel "rechts gaat voor".',
  },
  'licht-3': {
    lichten: { west: 'groen', oost: 'groen', noord: 'rood', zuid: 'rood' },
    weggebruikers: [
      { id: 'a', type: 'auto', kleur: 'groen', van: 'west', naar: 'rechtdoor' },
      { id: 'f', type: 'fiets', van: 'zuid', naar: 'rechtdoor' },
    ],
    volgorde: ['a', 'f'],
    uitleg: 'De auto heeft groen licht en mag eerst, ook al komt de fietser van rechts.',
  },
  'licht-4': {
    lichten: { zuid: 'groen', noord: 'groen', oost: 'rood', west: 'rood' },
    weggebruikers: [
      { id: 'a', type: 'auto', kleur: 'rood', van: 'zuid', naar: 'linksaf' },
      { id: 'b', type: 'auto', kleur: 'blauw', van: 'noord', naar: 'rechtdoor' },
      { id: 'f', type: 'fiets', van: 'oost', naar: 'rechtdoor' },
    ],
    volgorde: ['b', 'a', 'f'],
    uitleg: 'Beide auto\'s hebben groen: wie rechtdoor gaat mag eerst, dan wie afslaat. De fietser heeft rood en wacht.',
  },
  'licht-5': {
    borden: { zuid: 'haaientanden' },
    lichten: { zuid: 'groen', noord: 'groen', oost: 'rood', west: 'rood' },
    weggebruikers: [
      { id: 'a', type: 'auto', kleur: 'oranje', van: 'zuid', naar: 'rechtdoor' },
      { id: 'b', type: 'auto', kleur: 'paars', van: 'oost', naar: 'rechtdoor' },
    ],
    volgorde: ['a', 'b'],
    uitleg: 'Een verkeerslicht gaat voor een bord. De oranje auto heeft groen, dus die mag eerst.',
  },

  // --- ambulance ---
  'ambu-1': {
    weggebruikers: [
      { id: 'z', type: 'ambulance', van: 'west', naar: 'rechtdoor' },
      { id: 'a', type: 'auto', kleur: 'rood', van: 'zuid', naar: 'rechtdoor' },
    ],
    volgorde: ['z', 'a'],
    uitleg: 'Een ambulance met zwaailicht en sirene mag altijd eerst. Iedereen maakt ruimte.',
  },
  'ambu-2': {
    weggebruikers: [
      { id: 'z', type: 'ambulance', van: 'zuid', naar: 'linksaf' },
      { id: 'f', type: 'fiets', van: 'noord', naar: 'rechtdoor' },
    ],
    volgorde: ['z', 'f'],
    uitleg: 'Een ambulance met zwaailicht en sirene mag altijd eerst, ook als hij afslaat.',
  },
};


/* ---------------------------------------------------------------------
   3. LEVELS (in volgorde op de kaart)
   soort:  families  – bij welke familie hoort dit bord?
           borden    – wat betekent dit bord? (families: welke borden)
           kruispunt – wie mag eerst? (situaties: welke situaties)
           eindtoets – een mix van alles hiervoor
   aan:    false = dit level zit (nog) niet in het spel
   vragen: hoeveel vragen (bij borden en eindtoets)
   --------------------------------------------------------------------- */
const LEVELS = [
  { id: 'families', titel: 'Bordenfamilies', soort: 'families', vragen: 8,
    uitleg: 'Aan de vorm en kleur van een bord zie je wat voor bord het is.\nRood rondje: iets mag niet.\nBlauw rondje: iets moet.\nDriehoek met rode rand: let op!\nBlauw vierkant: informatie.\nVoorrangsborden hebben een eigen vorm, zoals het stopbord.' },

  { id: 'zebrapad', titel: 'Het zebrapad', soort: 'kruispunt',
    situaties: ['zebra-1', 'zebra-2', 'zebra-3', 'zebra-4'],
    uitleg: 'Een voetganger die bij het zebrapad wil oversteken, mag altijd eerst. Auto\'s én fietsers stoppen.\nTik de weggebruikers aan in de volgorde waarin ze mogen gaan.' },

  { id: 'verbodsborden', titel: 'Verbodsborden', soort: 'borden', families: ['verbod'], vragen: 8,
    uitleg: 'Verbodsborden zijn rond met een rode rand. Ze zeggen wat níet mag.' },

  { id: 'rechts', titel: 'Rechts gaat voor', soort: 'kruispunt',
    situaties: ['rechts-1', 'rechts-2', 'rechts-3', 'rechts-4', 'rechts-5', 'rechts-6'],
    uitleg: 'Op een kruispunt zonder borden, lichten of haaientanden mag wie van rechts komt eerst.\nKijk voor iedere weggebruiker: komt er iemand van zíjn rechterkant?' },

  { id: 'gebod-waarschuwing', titel: 'Moeten en opletten', soort: 'borden', families: ['gebod', 'waarschuwing'], vragen: 8,
    uitleg: 'Een blauw rond bord zegt wat je móet doen.\nEen driehoek met een rode rand waarschuwt: let op!' },

  { id: 'afslaan', titel: 'Rechtdoor en afslaan', soort: 'kruispunt',
    situaties: ['afslaan-1', 'afslaan-2', 'afslaan-3', 'afslaan-4'],
    uitleg: 'Rijden ze op dezelfde weg? Dan gaat rechtdoor voor afslaan.\nDe lijn op de weg laat zien waar iedereen heen wil.' },

  { id: 'voorrangsborden', titel: 'Voorrangsborden', soort: 'borden', families: ['voorrang', 'informatie'], vragen: 8,
    uitleg: 'Voorrangsborden vertellen wie er eerst mag.\nInformatieborden zijn blauw en vierkant.' },

  { id: 'haaientanden', titel: 'Haaientanden en stop', soort: 'kruispunt',
    situaties: ['haaien-1', 'haaien-2', 'haaien-3', 'haaien-4', 'haaien-5'],
    uitleg: 'Zie je haaientanden of een stopbord? Dan laat je al het verkeer op de andere weg voorgaan, van links én van rechts.' },

  { id: 'verkeerslichten', titel: 'Verkeerslichten', soort: 'kruispunt',
    situaties: ['licht-1', 'licht-2', 'licht-3', 'licht-4', 'licht-5'],
    uitleg: 'Een verkeerslicht gaat voor borden en voor "rechts gaat voor".\nGroen mag je gaan, bij rood wacht je.' },

  { id: 'ambulance', titel: 'De ambulance', soort: 'kruispunt', aan: false,
    situaties: ['ambu-1', 'ambu-2'],
    uitleg: 'Een ambulance, brandweer of politie met zwaailicht en sirene mag altijd eerst.' },

  { id: 'eindtoets', titel: 'Eindtoets', soort: 'eindtoets', vragen: 12,
    uitleg: 'Een mix van borden en kruispunten, net als de echte toets. Succes!' },
];

/* Tekeningen die het spel kent:
   verboden-in-te-rijden, gesloten, verboden-fietsers, verboden-autos, verboden-voetgangers,
   max-30, parkeerverbod, stopverbod, fietspad, voetpad, rechtdoor, rechtsaf,
   let-op-kruispunt, let-op-kinderen, let-op-verkeerslichten, let-op-zebrapad, let-op-fietsers,
   haaientanden, stop, voorrangsweg, einde-voorrangsweg, voorrangskruispunt,
   zebrapad, parkeren, doodlopend, eenrichtingsweg
*/

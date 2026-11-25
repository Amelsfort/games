/* =====================================================================
   WORD LISTS for wordgame.html

   - The words are grouped by subject. Every subject has a short key
     (no spaces), a title and one or more parts. On the start screen you
     pick the subject (◀ ▶) and then which parts to practise
     (Deel 1, Deel 2 or both).
   - One line per word: the word, its meaning and (may be empty) a tip,
     for example an example sentence or a memory aid. The tip is shown
     after the question is answered.
   - Text between single quotes '…' and every line ends with a comma.
   - Write an apostrophe in the text as \'  (e.g. 'zo\'n').
   - Optional: test: '2026-12-16' (year-month-day). The start screen then
     shows how many days are left until the test.
   - Open a subject with a link: wordgame.html?subject=sport
   - The subject key and the chosen parts are logged to the Google Sheet
     (field l, e.g. 'sport 1+2').
   ===================================================================== */

/* Which subject opens the very first time? (a link with ?subject=… wins;
   after that the game remembers the last choice) */
const DEFAULT_SUBJECT = 'underground';

const WORD_SUBJECTS = {

  sport: {
    title: 'Sport',
    parts: [
      [ // Deel 1 (was: woordenlijst les 2)
        { word: 'balanceren',            meaning: 'In evenwicht proberen te blijven.', tip: '' },
        { word: 'beoefenen',             meaning: 'Iets doen of uitvoeren. Als je een sport beoefent, doe je aan die sport.', tip: '' },
        { word: 'de conditie',           meaning: 'Je lichamelijke toestand, hoe fit en gezond je bent.', tip: '' },
        { word: 'de duursport',          meaning: 'Een sport die je lang achter elkaar doet, zoals lang rennen.', tip: '' },
        { word: 'fanatiek',              meaning: 'Heel enthousiast en fel, graag willen winnen.', tip: '' },
        { word: 'geblesseerd',           meaning: 'Gewond.', tip: '' },
        { word: 'de individuele sport',  meaning: 'Een sport die je in je eentje beoefent.', tip: '' },
        { word: 'de pass',               meaning: 'Een trap of worp, waarmee je de bal naar een teamspeler overspeelt.', tip: '' },
        { word: 'de prof',               meaning: 'Een professionele sporter. Je sport voor je beroep.', tip: '' },
        { word: 'de puck',               meaning: 'De platte schijf bij ijshockey.', tip: '' },
        { word: 'schakelen',             meaning: 'Van het ene naar het andere overgaan.', tip: '' },
        { word: 'sensationeel',          meaning: 'Iets wat sensationeel is, veroorzaakt grote opwinding.', tip: '' },
        { word: 'serveren',              meaning: 'Als eerste de bal in het spel brengen bij een sport met een net.', tip: '' },
        { word: 'sportief',              meaning: 'Dat ben je als je veel aan sport doet of als je goed tegen je verlies kunt.', tip: '' },
        { word: 'het startblok',         meaning: 'Een blok waar je tegenaan staat bij de start van een wedstrijd.', tip: '' },
        { word: 'de stick',              meaning: 'Een soort staaf waarmee je tegen een bal slaat.', tip: '' },
        { word: 'tackelen',              meaning: 'Iemand met opzet laten struikelen.', tip: '' },
        { word: 'de tactiek',            meaning: 'De manier waarop je iets aanpakt om iets te bereiken.', tip: '' },
        { word: 'de techniek',           meaning: 'De manier waarop je iets doet.', tip: '' },
        { word: 'de timing',             meaning: 'Iets op het goede moment doen.', tip: '' },
      ],
      [ // Deel 2 (was: woordenlijst les 5)
        { word: 'aanbevelen',            meaning: 'Aanprijzen. Zeggen dat iets of iemand goed is.', tip: '' },
        { word: 'de aanloop',            meaning: 'Een stukje rennen om vaart te maken voor een sprong.', tip: '' },
        { word: 'actief',                meaning: 'Actieve mensen doen veel en bewegen veel.', tip: '' },
        { word: 'afraden',               meaning: 'Het advies geven om het niet te doen.', tip: '' },
        { word: 'de angsthaas',          meaning: 'Iemand die snel bang is.', tip: '' },
        { word: 'de blessure',           meaning: 'Een kapotte of pijnlijke plaats aan je lichaam, vaak door het sporten.', tip: '' },
        { word: 'de hindernis',          meaning: 'Iets wat in de weg staat.', tip: '' },
        { word: 'incasseren',            meaning: 'Klappen krijgen of teleurgesteld worden en daarmee kunnen omgaan.', tip: '' },
        { word: 'inspannen',             meaning: 'Veel doen, je krachten gebruiken.', tip: '' },
        { word: 'de kick',               meaning: 'Een sterk gevoel van plezier en kracht.', tip: '' },
        { word: 'het lef',               meaning: 'De durf.', tip: '' },
        { word: 'ontspannen',            meaning: 'Tot rust komen.', tip: '' },
        { word: 'het parcours',          meaning: 'Een wedstrijdbaan. Een route die je moet afleggen bij een wedstrijd.', tip: '' },
        { word: 'passief',               meaning: 'Als je afwacht wat er gebeurt, ben je passief.', tip: '' },
        { word: 'de piste',              meaning: 'Een baan voor skiërs en wielrenners.', tip: '' },
        { word: 'recreatief',            meaning: 'Om te ontspannen, voor je plezier.', tip: '' },
        { word: 'roekeloos',             meaning: 'Als je dingen doet, zonder te bedenken wat het gevaar kan zijn.', tip: '' },
        { word: 'het tempo',             meaning: 'De snelheid waarmee je iets doet.', tip: '' },
        { word: 'de vrees',              meaning: 'De angst.', tip: '' },
        { word: 'de waaghals',           meaning: 'Iemand die veel durft en niet snel bang is.', tip: '' },
      ],
    ]
  },

  underground: {
    title: 'Ondergronds',
    test: '2026-12-16',   // date of the test (year-month-day): the start screen counts down to it
    parts: [
      [ // Deel 1 (woordenlijst les 1)
        { word: 'afdalen',               meaning: 'Naar beneden gaan.', tip: '' },
        { word: 'de begane grond',       meaning: 'De verdieping die precies gelijk ligt met de straat.', tip: '' },
        { word: 'de container',          meaning: 'Een grote bak om goederen of afval in te vervoeren.', tip: '' },
        { word: 'de dassenburcht',       meaning: 'Een hol van een das, een zoogdier met een zwart-witte streep.', tip: '' },
        { word: 'de delfstof',           meaning: 'Stof die uit de grond wordt gegraven om er iets van te maken.', tip: '' },
        { word: 'delven',                meaning: 'Uit de grond halen door het op te graven.', tip: '' },
        { word: 'de doorsnede',          meaning: 'Wat je aan de binnenkant ziet als je iets doormidden snijdt.', tip: '' },
        { word: 'het edelmetaal',        meaning: 'Een kostbaar metaal, zoals goud en zilver.', tip: '' },
        { word: 'het gangenstelsel',     meaning: 'Een aantal gangen dat met elkaar is verbonden.', tip: '' },
        { word: 'het grondwater',        meaning: 'Het water uit de bodem.', tip: '' },
        { word: 'de kruipruimte',        meaning: 'Een soort lage kelder onder een huis.', tip: '' },
        { word: 'de mijn',               meaning: 'Eén of meer gangen diep onder de grond waar steenkool of een andere delfstof wordt opgegraven.', tip: '' },
        { word: 'de mijnwerker',         meaning: 'Iemand die in een mijn werkt, diep onder de grond.', tip: '' },
        { word: 'onderaards',            meaning: 'Onder de grond.', tip: '' },
        { word: 'de ondergrondse',       meaning: 'De metro, een soort trein onder de grond.', tip: '' },
        { word: 'opgraven',              meaning: 'Uit de grond graven.', tip: '' },
        { word: 'de schacht',            meaning: 'Een gegraven gang die recht naar beneden de grond in gaat.', tip: '' },
        { word: 'het souterrain',        meaning: 'Een verdieping onder de grond.', tip: '' },
        { word: 'de steenkool',        meaning: 'Een zwarte stof die diep onder de grond zit. Steenkool wordt gebruikt als brandstof. Steenkool bestaat uit planten die heel lang in de grond op elkaar geperst hebben gelegen.', tip: '' },
        { word: 'de vluchtroute',        meaning: 'Een uitgang om te vluchten als er een ramp is.', tip: '' },
      ],
      [ // Deel 2 (woordenlijst les 5)
        { word: 'het afvalwater',        meaning: 'Gebruikt water dat niet meer nodig is.', tip: '' },
        { word: 'de afvoer',             meaning: 'Een buis of pijp waar het water door naar het riool stroomt.', tip: '' },
        { word: 'de archeoloog',         meaning: 'Iemand die gebouwen en voorwerpen van vroeger opgraaft en onderzoekt.', tip: '' },
        { word: 'de beerput',            meaning: 'Een put waarin de ontlasting van mensen en dieren bewaard wordt.', tip: '' },
        { word: 'de drek',               meaning: 'De viezigheid. Vroeger was dit het woord voor vieze, dunne poep.', tip: '' },
        { word: 'het fossiel',           meaning: 'Overblijfsel van een plant of een dier uit de oertijd.', tip: '' },
        { word: 'het gewelf',            meaning: 'Een gebogen plafond.', tip: '' },
        { word: 'grondig',               meaning: 'Heel precies.', tip: '' },
        { word: 'het hemelwater',        meaning: 'Water uit neerslag, zoals regen, hagel en sneeuw.', tip: '' },
        { word: 'lozen',                 meaning: 'Iets weg laten stromen in de rivier, in de zee of in het riool.', tip: '' },
        { word: 'muf',                   meaning: 'Niet fris ruiken.', tip: '' },
        { word: 'overlopen',             meaning: 'Zo vol zijn met water dat het eroverheen stroomt.', tip: '' },
        { word: 'overtollig',            meaning: 'Te veel.', tip: '' },
        { word: 'het riool',             meaning: 'Ondergrondse buizen waar water uit bijvoorbeeld wc\'s doorheen gaat.', tip: '' },
        { word: 'de smurrie',            meaning: 'Een vieze, kleverige stof.', tip: '' },
        { word: 'het straatniveau',      meaning: 'De hoogte van de straat.', tip: '' },
        { word: 'verontreinigd',         meaning: 'Vervuild, vies.', tip: '' },
        { word: 'versteend',             meaning: 'Steen geworden.', tip: '' },
        { word: 'het waterpeil',         meaning: 'De hoogte van het water.', tip: '' },
        { word: 'zuiveren',              meaning: 'Schoonmaken.', tip: '' },
      ],
    ]
  },

};

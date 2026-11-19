/* =====================================================================
   WORD LISTS for wordgame.html

   - Every list has a short key (no spaces), a title and its words.
   - One line per word: the word, its meaning and (may be empty) a tip,
     for example an example sentence or a memory aid.
   - Text between single quotes '…' and every line ends with a comma.
   - Write an apostrophe in the text as \'  (e.g. 'zo\'n').
   - Open a list with a link: wordgame.html?list=blok2
   - In the game, ◀ ▶ switch between the lists.
   - The list key is also logged to the Google Sheet (field l).
   ===================================================================== */

/* Which list opens by default? (a link with ?list=… wins) */
const DEFAULT_LIST = 'les2';

const WORD_LISTS = {

  les2: {
      title: 'Woordenlijst Sport',
      words: [
        { word: 'balanceren',           meaning: 'In evenwicht proberen te blijven.', tip: '' },
        { word: 'beoefenen',            meaning: 'Iets doen of uitvoeren. Als je een sport beoefent, doe je aan die sport.', tip: '' },
        { word: 'de conditie',          meaning: 'Je lichamelijke toestand, hoe fit en gezond je bent.', tip: '' },
        { word: 'de duursport',         meaning: 'Een sport die je lang achter elkaar doet, zoals lang rennen.', tip: '' },
        { word: 'fanatiek',             meaning: 'Heel enthousiast en fel, graag willen winnen.', tip: '' },
        { word: 'geblesseerd',          meaning: 'Gewond.', tip: '' },
        { word: 'de individuele sport', meaning: 'Een sport die je in je eentje beoefent.', tip: '' },
        { word: 'de pass',              meaning: 'Een trap of worp, waarmee je de bal naar een teamspeler overspeelt.', tip: '' },
        { word: 'de prof',              meaning: 'Een professionele sporter. Je sport voor je beroep.', tip: '' },
        { word: 'de puck',              meaning: 'De platte schijf bij ijshockey.', tip: '' },
        { word: 'schakelen',            meaning: 'Van het ene naar het andere overgaan.', tip: '' },
        { word: 'sensationeel',         meaning: 'Iets wat sensationeel is, veroorzaakt grote opwinding.', tip: '' },
        { word: 'serveren',             meaning: 'Als eerste de bal in het spel brengen bij een sport met een net.', tip: '' },
        { word: 'sportief',             meaning: 'Dat ben je als je veel aan sport doet of als je goed tegen je verlies kunt.', tip: '' },
        { word: 'het startblok',        meaning: 'Een blok waar je tegenaan staat bij de start van een wedstrijd.', tip: '' },
        { word: 'de stick',             meaning: 'Een soort staaf waarmee je tegen een bal slaat.', tip: '' },
        { word: 'tackelen',             meaning: 'Iemand met opzet laten struikelen.', tip: '' },
        { word: 'de tactiek',           meaning: 'De manier waarop je iets aanpakt om iets te bereiken.', tip: '' },
        { word: 'de techniek',          meaning: 'De manier waarop je iets doet.', tip: '' },
        { word: 'de timing',            meaning: 'Iets op het goede moment doen.', tip: '' },
        { word: 'aanbevelen',           meaning: 'Aanprijzen. Zeggen dat iets of iemand goed is.', tip: '' },
        { word: 'de aanloop',           meaning: 'Een stukje rennen om vaart te maken voor een sprong.', tip: '' },
        { word: 'actief',               meaning: 'Actieve mensen doen veel en bewegen veel.', tip: '' },
        { word: 'afraden',              meaning: 'Het advies geven om het niet te doen.', tip: '' },
        { word: 'de angsthaas',         meaning: 'Iemand die snel bang is.', tip: '' },
        { word: 'de blessure',          meaning: 'Een kapotte of pijnlijke plaats aan je lichaam, vaak door het sporten.', tip: '' },
        { word: 'de hindernis',         meaning: 'Iets wat in de weg staat.', tip: '' },
        { word: 'incasseren',           meaning: 'Klappen krijgen of teleurgesteld worden en daarmee kunnen omgaan.', tip: '' },
        { word: 'inspannen',            meaning: 'Veel doen, je krachten gebruiken.', tip: '' },
        { word: 'de kick',              meaning: 'Een sterk gevoel van plezier en kracht.', tip: '' },
        { word: 'het lef',              meaning: 'De durf.', tip: '' },
        { word: 'ontspannen',           meaning: 'Tot rust komen.', tip: '' },
        { word: 'het parcours',         meaning: 'Een wedstrijdbaan. Een route die je moet afleggen bij een wedstrijd.', tip: '' },
        { word: 'passief',              meaning: 'Als je afwacht wat er gebeurt, ben je passief.', tip: '' },
        { word: 'de piste',             meaning: 'Een baan voor skiërs en wielrenners.', tip: '' },
        { word: 'recreatief',           meaning: 'Om te ontspannen, voor je plezier.', tip: '' },
        { word: 'roekeloos',            meaning: 'Als je dingen doet, zonder te bedenken wat het gevaar kan zijn.', tip: '' },
        { word: 'het tempo',            meaning: 'De snelheid waarmee je iets doet.', tip: '' },
        { word: 'de vrees',             meaning: 'De angst.', tip: '' },
        { word: 'de waaghals',          meaning: 'Iemand die veel durft en niet snel bang is.', tip: '' },
      ]
    },
  };

/* =====================================================================
   WOORDENLIJSTEN voor wordgame.html

   - Elke lijst heeft een korte naam (zonder spaties), een titel en de woorden.
   - Eén regel per woord: het woord, de betekenis en (mag leeg) een tip,
     bijvoorbeeld een voorbeeldzin of ezelsbruggetje.
   - Tekst tussen enkele aanhalingstekens '…' en elke regel eindigt met een komma.
   - Een apostrof in de tekst schrijf je als \'  (bijv. 'zo\'n').
   - Een lijst openen via een link: wordgame.html?lijst=blok2
   - In het spel kun je met ◀ ▶ wisselen tussen de lijsten.
   ===================================================================== */

/* Welke lijst opent standaard? (een link met ?lijst=… gaat voor) */
const STANDAARD_LIJST = 'les2';

const WOORDENLIJSTEN = {

  les2: {
      titel: 'Woordenlijst les 2',
      woorden: [
        { woord: 'balanceren',           betekenis: 'In evenwicht proberen te blijven.', tip: '' },
        { woord: 'beoefenen',            betekenis: 'Iets doen of uitvoeren. Als je een sport beoefent, doe je aan die sport.', tip: '' },
        { woord: 'de conditie',          betekenis: 'Je lichamelijke toestand, hoe fit en gezond je bent.', tip: '' },
        { woord: 'de duursport',         betekenis: 'Een sport die je lang achter elkaar doet, zoals lang rennen.', tip: '' },
        { woord: 'fanatiek',             betekenis: 'Heel enthousiast en fel, graag willen winnen.', tip: '' },
        { woord: 'geblesseerd',          betekenis: 'Gewond.', tip: '' },
        { woord: 'de individuele sport', betekenis: 'Een sport die je in je eentje beoefent.', tip: '' },
        { woord: 'de pass',              betekenis: 'Een trap of worp, waarmee je de bal naar een teamspeler overspeelt.', tip: '' },
        { woord: 'de prof',              betekenis: 'Een professionele sporter. Je sport voor je beroep.', tip: '' },
        { woord: 'de puck',              betekenis: 'De platte schijf bij ijshockey.', tip: '' },
        { woord: 'schakelen',            betekenis: 'Van het ene naar het andere overgaan.', tip: '' },
        { woord: 'sensationeel',         betekenis: 'Iets wat sensationeel is, veroorzaakt grote opwinding.', tip: '' },
        { woord: 'serveren',             betekenis: 'Als eerste de bal in het spel brengen bij een sport met een net.', tip: '' },
        { woord: 'sportief',             betekenis: 'Dat ben je als je veel aan sport doet of als je goed tegen je verlies kunt.', tip: '' },
        { woord: 'het startblok',        betekenis: 'Een blok waar je tegenaan staat bij de start van een wedstrijd.', tip: '' },
        { woord: 'de stick',             betekenis: 'Een soort staaf waarmee je tegen een bal slaat.', tip: '' },
        { woord: 'tackelen',             betekenis: 'Iemand met opzet laten struikelen.', tip: '' },
        { woord: 'de tactiek',           betekenis: 'De manier waarop je iets aanpakt om iets te bereiken.', tip: '' },
        { woord: 'de techniek',          betekenis: 'De manier waarop je iets doet.', tip: '' },
        { woord: 'de timing',            betekenis: 'Iets op het goede moment doen.', tip: '' },
      ]
    },
};

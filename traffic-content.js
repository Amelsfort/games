/* =====================================================================
   CONTENT OF THE TRAFFIC GAME (Verkeersheld), matched to the test prep for
   groups 5-6, lessons 3 & 4 (right of way and going first).

   1. SIGNS        – every sign with its meaning
   2. SITUATIONS   – crossings with road users and the right order
   3. QUESTIONS    – questions with answers to choose from
   4. ROUTES       – stories: ride from crossing to crossing
   5. LEVELS       – the levels on the map, in order

   Code is English; everything the players read (meanings, questions,
   answers, explanations, titles, stories) is Dutch.
   Text goes between single quotes '…'; write an apostrophe as \' (e.g. 'auto\'s').
   Directions are as seen from the player's side: south = near, north = far,
   east = right, west = left.
   ===================================================================== */


/* ---------------------------------------------------------------------
   1. SIGNS
   id:       which drawing (only existing drawings work, see the list at the bottom)
   family:   prohibition | mandatory | warning | priority | information
   meaning:  what the player reads
   --------------------------------------------------------------------- */
const SIGNS = [
  // Priority signs (in this test)
  { id: 'priority-road',          family: 'priority',        meaning: 'Voorrangsweg: rijd je op deze weg, dan krijg je voorrang van bestuurders uit de zijwegen van links en rechts.' },
  { id: 'end-priority-road',      family: 'priority',        meaning: 'Einde voorrangsweg: vanaf hier heb je geen voorrang meer.' },
  { id: 'priority-crossing',      family: 'priority',        meaning: 'Voorrangskruispunt: op het volgende kruispunt krijg je voorrang van bestuurders uit de zijwegen van links en rechts.' },
  { id: 'priority-side-left',     family: 'priority',        meaning: 'Op de volgende kruising krijg je voorrang van bestuurders uit de zijweg van links.' },
  { id: 'priority-side-right',    family: 'priority',        meaning: 'Op de volgende kruising krijg je voorrang van bestuurders uit de zijweg van rechts.' },
  { id: 'yield',                  family: 'priority',        meaning: 'Voorrang verlenen: geef voorrang aan bestuurders van links en rechts. Bij dit bord staan altijd haaientanden op de weg.' },
  { id: 'stop',                   family: 'priority',        meaning: 'Stop: stop voor de stopstreep, ook als er niemand aankomt. Kijk links en rechts en geef voorrang.' },

  // Other signs (not in this test; their levels are switched off)
  { id: 'no-entry',               family: 'prohibition',     meaning: 'Verboden in te rijden: je mag deze weg niet in.' },
  { id: 'closed',                 family: 'prohibition',     meaning: 'Gesloten voor alle voertuigen: niet met een fiets, brommer of auto.' },
  { id: 'no-bikes',               family: 'prohibition',     meaning: 'Verboden voor fietsers.' },
  { id: 'no-cars',                family: 'prohibition',     meaning: 'Verboden voor auto\'s.' },
  { id: 'no-pedestrians',         family: 'prohibition',     meaning: 'Verboden voor voetgangers.' },
  { id: 'max-30',                 family: 'prohibition',     meaning: 'Je mag hier niet harder dan 30 kilometer per uur.' },
  { id: 'no-parking',             family: 'prohibition',     meaning: 'Parkeerverbod: je mag hier niet parkeren.' },
  { id: 'no-stopping',            family: 'prohibition',     meaning: 'Stopverbod: je mag hier niet stilstaan, ook niet even.' },
  { id: 'bike-path',              family: 'mandatory',       meaning: 'Fietspad: fietsers moeten hier rijden.' },
  { id: 'footpath',               family: 'mandatory',       meaning: 'Voetpad: hier mogen alleen voetgangers lopen.' },
  { id: 'ahead-only',             family: 'mandatory',       meaning: 'Je moet hier rechtdoor gaan.' },
  { id: 'turn-right',             family: 'mandatory',       meaning: 'Je moet hier rechtsaf gaan.' },
  { id: 'warn-crossing',          family: 'warning',         meaning: 'Let op: er komt een kruispunt.' },
  { id: 'warn-children',          family: 'warning',         meaning: 'Let op: kinderen, bijvoorbeeld bij een school.' },
  { id: 'warn-lights',            family: 'warning',         meaning: 'Let op: er komen verkeerslichten.' },
  { id: 'warn-zebra',             family: 'warning',         meaning: 'Let op: er komt een zebrapad.' },
  { id: 'warn-bikes',             family: 'warning',         meaning: 'Let op: fietsers steken over.' },
  { id: 'zebra',                  family: 'information',     meaning: 'Hier is een zebrapad, een oversteekplaats voor voetgangers.' },
  { id: 'parking',                family: 'information',     meaning: 'Parkeerplaats: hier mag je parkeren.' },
  { id: 'dead-end',               family: 'information',     meaning: 'Doodlopende weg: je kunt hier niet verder.' },
  { id: 'one-way',                family: 'information',     meaning: 'Eenrichtingsweg: het verkeer mag hier maar één kant op.' },
];

/* The sign families.
   name:     the family's name
   meaning:  what the name means (shown in the Bordenwijzer 📖)
   shape:    shape and colour; only in the explanation of the 'families' level
   hint:     what the player sees after an answer
   examples: (optional) up to 3 signs shown in the Bordenwijzer (default: the family's first three) */
const FAMILIES = {
  prohibition:  { name: 'Verbodsbord', meaning: 'Iets mag níet.', shape: 'Rood rondje',
                  hint: 'Een rood rondje betekent: dit mag niet.' },
  mandatory:    { name: 'Gebodsbord', meaning: 'Iets móet.', shape: 'Blauw rondje',
                  hint: 'Een blauw rondje betekent: dit moet.' },
  warning:      { name: 'Waarschuwingsbord', meaning: 'Let op! Er komt iets aan.', shape: 'Driehoek met rode rand',
                  hint: 'Een driehoek met een rode rand betekent: let op!' },
  priority:     { name: 'Voorrangsbord', meaning: 'Wie mag er eerst?', shape: 'Elk een eigen vorm',
                  hint: 'Voorrangsborden vertellen wie er voor mag. Ze hebben een eigen vorm.', examples: ['yield', 'stop', 'priority-road'] },
  information:  { name: 'Informatiebord', meaning: 'Het bord vertelt je iets handigs.', shape: 'Blauw vierkant',
                  hint: 'Een blauw vierkant geeft informatie.' },
};


/* ---------------------------------------------------------------------
   2. SITUATIONS
   zebras:     roads with a zebra crossing, e.g. ['south']
   signs:      a sign per road, e.g. { east: 'yield', north: 'priority-road' }
   lights:     per road: 'red' or 'green' (then every road gets a light)
   roadUsers:
     id:     a short name, used in 'order'
     type:   car | bike | pedestrian | ambulance | bus
     siren:  (ambulance) false: no blue lights and no siren, so it's an ordinary road user
   Make sure every two road users in a situation are in each other's way. Two who can pass
   each other at the same time (say both straight on, from opposite sides) have no right order
   between them, and a child who picks the other order would be told it's wrong.
     from:   the road it comes from
     turn:   straight | left | right
     color:  (car) red, blue, yellow, green, orange, purple, white
     at:     (pedestrian) crosses the road at this side
   order:        who goes first, then second, and so on
   explanation:  what the player sees after a mistake
   --------------------------------------------------------------------- */
const SITUATIONS = {

  // --- ordinary crossing: give way to traffic from the right ---
  'right-1': {
    roadUsers: [
      { id: 'a', type: 'car', color: 'red', from: 'south', turn: 'straight' },
      { id: 'f', type: 'bike', from: 'east', turn: 'straight' },
    ],
    order: ['f', 'a'],
    explanation: 'Een gewone kruising: geef voorrang aan bestuurders van rechts. De fietser komt van rechts voor de auto.',
  },
  'right-2': {
    roadUsers: [
      { id: 'a', type: 'car', color: 'blue', from: 'south', turn: 'straight' },
      { id: 'b', type: 'car', color: 'yellow', from: 'west', turn: 'straight' },
    ],
    order: ['a', 'b'],
    explanation: 'Voor de gele auto komt de blauwe auto van rechts. Dus de blauwe auto mag eerst.',
  },
  'right-3': {
    roadUsers: [
      { id: 'f', type: 'bike', from: 'north', turn: 'straight' },
      { id: 'a', type: 'car', color: 'green', from: 'east', turn: 'straight' },
    ],
    order: ['f', 'a'],
    explanation: 'Voor de groene auto komt de fietser van rechts. Een fietser is ook een bestuurder, dus de fietser mag eerst.',
  },
  'right-4': {
    roadUsers: [
      { id: 'a', type: 'car', color: 'red', from: 'south', turn: 'left' },
      { id: 'f', type: 'bike', from: 'east', turn: 'straight' },
      { id: 'b', type: 'car', color: 'green', from: 'north', turn: 'straight' },
    ],
    order: ['b', 'f', 'a'],
    explanation: 'De groene auto heeft niemand rechts van zich, dus die mag eerst. Daarna de fietser: die had de groene auto van rechts. De rode auto slaat linksaf en wacht op allebei.',
  },
  'right-5': {
    roadUsers: [
      { id: 'a', type: 'car', color: 'orange', from: 'west', turn: 'straight' },
      { id: 'f', type: 'bike', from: 'south', turn: 'straight' },
    ],
    order: ['f', 'a'],
    explanation: 'Voor de oranje auto komt de fietser van rechts. Dus de fietser mag eerst.',
  },
  'right-6': {
    roadUsers: [
      { id: 'a', type: 'car', color: 'purple', from: 'east', turn: 'straight' },
      { id: 'f', type: 'bike', from: 'south', turn: 'straight' },
      { id: 'b', type: 'car', color: 'blue', from: 'west', turn: 'left' },
    ],
    order: ['a', 'f', 'b'],
    explanation: 'De paarse auto heeft niemand rechts van zich en mag eerst. Daarna de fietser: die had de paarse auto van rechts. De blauwe auto slaat linksaf en gaat als laatste.',
  },

  // --- priority crossing: shark teeth, stop and priority road ---
  'yield-1': {
    signs: { east: 'yield', west: 'yield', north: 'priority-road', south: 'priority-road' },
    roadUsers: [
      { id: 'a', type: 'car', color: 'red', from: 'east', turn: 'straight' },
      { id: 'f', type: 'bike', from: 'south', turn: 'straight' },
    ],
    order: ['f', 'a'],
    explanation: 'Bij de auto staan haaientanden. Dan geef je voorrang aan bestuurders van links én rechts, ook als je zelf van rechts komt.',
  },
  'yield-2': {
    signs: { east: 'yield', west: 'yield', north: 'priority-road', south: 'priority-road' },
    roadUsers: [
      { id: 'a', type: 'car', color: 'blue', from: 'west', turn: 'straight' },
      { id: 'b', type: 'car', color: 'yellow', from: 'north', turn: 'straight' },
    ],
    order: ['b', 'a'],
    explanation: 'De gele auto rijdt op de voorrangsweg en krijgt voorrang. De blauwe auto staat bij haaientanden en wacht.',
  },
  'yield-3': {
    signs: { east: 'stop', west: 'stop', north: 'priority-road', south: 'priority-road' },
    roadUsers: [
      { id: 'a', type: 'car', color: 'green', from: 'east', turn: 'straight' },
      { id: 'f', type: 'bike', from: 'north', turn: 'straight' },
    ],
    order: ['f', 'a'],
    explanation: 'Bij een stopbord stop je voor de stopstreep, kijk je links en rechts en geef je voorrang aan iedereen op de andere weg.',
  },
  'yield-4': {
    signs: { north: 'yield', south: 'yield', east: 'priority-road', west: 'priority-road' },
    roadUsers: [
      { id: 'f', type: 'bike', from: 'north', turn: 'straight' },
      { id: 'a', type: 'car', color: 'orange', from: 'east', turn: 'straight' },
    ],
    order: ['a', 'f'],
    explanation: 'Bij de fietser staan haaientanden. De auto rijdt op de voorrangsweg en krijgt voorrang.',
  },
  'yield-5': {
    signs: { east: 'yield', west: 'yield', north: 'priority-road', south: 'priority-road' },
    roadUsers: [
      { id: 'f', type: 'bike', from: 'north', turn: 'straight' },
      { id: 'a', type: 'car', color: 'red', from: 'south', turn: 'left' },
      { id: 'b', type: 'car', color: 'blue', from: 'west', turn: 'straight' },
    ],
    order: ['f', 'a', 'b'],
    explanation: 'Op de voorrangsweg gaat de fietser rechtdoor en mag eerst, dan de rode auto die afslaat. De blauwe auto staat bij haaientanden en wacht tot het laatst.',
  },
  'yield-6': {
    signs: { south: 'priority-crossing', north: 'priority-crossing', east: 'yield', west: 'yield' },
    roadUsers: [
      { id: 'a', type: 'car', color: 'green', from: 'south', turn: 'straight' },
      { id: 'b', type: 'car', color: 'purple', from: 'east', turn: 'straight' },
    ],
    order: ['a', 'b'],
    explanation: 'De groene auto heeft het bord voorrangskruispunt en krijgt voorrang. De paarse auto komt van rechts, maar staat bij haaientanden.',
  },

  // --- going first: straight on and turning ---
  'turning-1': {
    roadUsers: [
      { id: 'a', type: 'car', color: 'red', from: 'south', turn: 'left' },
      { id: 'b', type: 'car', color: 'blue', from: 'north', turn: 'straight' },
    ],
    order: ['b', 'a'],
    explanation: 'Ze rijden op dezelfde weg, tegemoet. Wie rechtdoor gaat, gaat voor. Wie voor hem langs wil afslaan, wacht.',
  },
  'turning-2': {
    roadUsers: [
      { id: 'f', type: 'bike', from: 'south', turn: 'straight' },
      { id: 'a', type: 'car', color: 'yellow', from: 'south', turn: 'right' },
    ],
    order: ['f', 'a'],
    explanation: 'De fietser gaat rechtdoor op dezelfde weg en de auto wil voor hem langs afslaan. Dan gaat de fietser voor.',
  },
  'turning-3': {
    roadUsers: [
      { id: 'a', type: 'car', color: 'green', from: 'north', turn: 'left' },
      { id: 'f', type: 'bike', from: 'south', turn: 'straight' },
    ],
    order: ['f', 'a'],
    explanation: 'De fietser gaat rechtdoor en de auto wil voor hem langs afslaan. Rechtdoor gaat voor.',
  },
  'turning-4': {
    roadUsers: [
      { id: 'a', type: 'car', color: 'orange', from: 'east', turn: 'left' },
      { id: 'f', type: 'bike', from: 'west', turn: 'straight' },
    ],
    order: ['f', 'a'],
    explanation: 'De fietser gaat rechtdoor en de auto wil voor hem langs afslaan. Rechtdoor gaat voor.',
  },
  'turning-5': {
    roadUsers: [
      { id: 'b', type: 'car', color: 'blue', from: 'north', turn: 'left' },
      { id: 'a', type: 'car', color: 'red', from: 'south', turn: 'right' },
    ],
    order: ['a', 'b'],
    explanation: 'Ze slaan allebei dezelfde weg in. De rode auto neemt een kleine bocht, de blauwe auto een grote bocht. De kleine bocht gaat voor.',
  },
  'turning-6': {
    roadUsers: [
      { id: 'f', type: 'bike', from: 'east', turn: 'right' },
      { id: 'a', type: 'car', color: 'yellow', from: 'west', turn: 'left' },
    ],
    order: ['f', 'a'],
    explanation: 'Ze slaan allebei dezelfde weg in. De fietser neemt een kleine bocht en gaat voor de auto, die een grote bocht maakt.',
  },

  // --- pedestrians ---
  'zebra-1': {
    zebras: ['south'],
    roadUsers: [
      { id: 'v', type: 'pedestrian', at: 'south' },
      { id: 'a', type: 'car', color: 'red', from: 'south', turn: 'straight' },
    ],
    order: ['v', 'a'],
    explanation: 'Een voetganger die bij het zebrapad wil oversteken, laat je voorgaan.',
  },
  'zebra-2': {
    zebras: ['south'],
    roadUsers: [
      { id: 'v', type: 'pedestrian', at: 'south' },
      { id: 'a', type: 'car', color: 'blue', from: 'west', turn: 'right' },
    ],
    order: ['v', 'a'],
    explanation: 'Ook als je afslaat, laat je de voetganger bij het zebrapad eerst oversteken.',
  },
  'zebra-3': {
    zebras: ['east'],
    roadUsers: [
      { id: 'v', type: 'pedestrian', at: 'east' },
      { id: 'f', type: 'bike', from: 'east', turn: 'straight' },
    ],
    order: ['v', 'f'],
    explanation: 'Ook als je fietst, laat je een voetganger bij het zebrapad voorgaan.',
  },
  'zebra-4': {
    zebras: ['north'],
    roadUsers: [
      { id: 'v', type: 'pedestrian', at: 'north' },
      { id: 'a', type: 'car', color: 'yellow', from: 'south', turn: 'straight' },
    ],
    order: ['v', 'a'],
    explanation: 'De auto rijdt over het zebrapad aan de overkant. Daar wacht een voetganger, dus die gaat voor.',
  },
  'zebra-5': {
    roadUsers: [
      { id: 'v', type: 'pedestrian', at: 'north' },
      { id: 'f', type: 'bike', from: 'south', turn: 'straight' },
    ],
    order: ['f', 'v'],
    explanation: 'Hier is géén zebrapad. Een voetganger die de weg wil oversteken laat de fietser voorgaan.',
  },

  // --- ambulance ---
  'ambulance-1': {
    roadUsers: [
      { id: 'z', type: 'ambulance', from: 'west', turn: 'straight' },
      { id: 'a', type: 'car', color: 'red', from: 'south', turn: 'straight' },
    ],
    order: ['z', 'a'],
    explanation: 'Een voertuig met blauwe zwaailichten en een sirene laat je altijd voorgaan.',
  },
  'ambulance-2': {
    roadUsers: [
      { id: 'z', type: 'ambulance', from: 'south', turn: 'left' },
      { id: 'f', type: 'bike', from: 'north', turn: 'straight' },
    ],
    order: ['z', 'f'],
    explanation: 'Een ambulance met zwaailichten en sirene gaat altijd voor, ook als hij afslaat.',
  },
  'ambulance-3': {
    signs: { west: 'yield', east: 'yield', north: 'priority-road', south: 'priority-road' },
    roadUsers: [
      { id: 'z', type: 'ambulance', from: 'west', turn: 'straight' },
      { id: 'f', type: 'bike', from: 'south', turn: 'straight' },
    ],
    order: ['z', 'f'],
    explanation: 'Ook al staan er haaientanden bij de ambulance: met zwaailichten en sirene gaat hij voor.',
  },
  // without blue lights and siren an ambulance is an ordinary car: the normal rules apply
  'ambulance-4': {
    roadUsers: [
      { id: 'z', type: 'ambulance', siren: false, from: 'west', turn: 'straight' },
      { id: 'a', type: 'car', color: 'blue', from: 'south', turn: 'straight' },
    ],
    order: ['a', 'z'],
    explanation: 'De ambulance heeft geen zwaailichten en geen sirene aan. Dan is het een gewone auto. De blauwe auto komt van rechts en gaat voor.',
  },
  'ambulance-5': {
    signs: { west: 'yield', east: 'yield', north: 'priority-road', south: 'priority-road' },
    roadUsers: [
      { id: 'z', type: 'ambulance', siren: false, from: 'east', turn: 'straight' },
      { id: 'f', type: 'bike', from: 'south', turn: 'straight' },
    ],
    order: ['f', 'z'],
    explanation: 'Zonder zwaailichten en sirene moet de ambulance zich gewoon aan de haaientanden houden. De fietser gaat voor.',
  },
  'ambulance-6': {
    roadUsers: [
      { id: 'z', type: 'ambulance', siren: false, from: 'north', turn: 'left' },
      { id: 'f', type: 'bike', from: 'south', turn: 'straight' },
    ],
    order: ['f', 'z'],
    explanation: 'De ambulance heeft geen zwaailichten aan en wil voor de fietser langs afslaan. Rechtdoor gaat voor: eerst de fietser.',
  },
  // with blue lights and siren the ambulance goes first; after that the normal rules
  'ambulance-7': {
    roadUsers: [
      { id: 'z', type: 'ambulance', from: 'north', turn: 'straight' },
      { id: 'a', type: 'car', color: 'green', from: 'west', turn: 'left' },
      { id: 'f', type: 'bike', from: 'east', turn: 'straight' },
    ],
    order: ['z', 'f', 'a'],
    explanation: 'Eerst de ambulance met zwaailichten en sirene. Daarna gelden de gewone regels: de groene auto wil voor de fietser langs afslaan. Rechtdoor gaat voor, dus eerst de fietser.',
  },

  // --- traffic lights (not in this test) ---
  'lights-1': {
    lights: { south: 'red', north: 'red', east: 'green', west: 'green' },
    roadUsers: [
      { id: 'a', type: 'car', color: 'red', from: 'south', turn: 'straight' },
      { id: 'f', type: 'bike', from: 'east', turn: 'straight' },
    ],
    order: ['f', 'a'],
    explanation: 'De fietser heeft groen licht. De auto heeft rood en moet wachten.',
  },
  'lights-2': {
    lights: { south: 'green', north: 'green', east: 'red', west: 'red' },
    roadUsers: [
      { id: 'a', type: 'car', color: 'blue', from: 'south', turn: 'straight' },
      { id: 'b', type: 'car', color: 'yellow', from: 'east', turn: 'straight' },
    ],
    order: ['a', 'b'],
    explanation: 'De blauwe auto heeft groen. Het verkeerslicht gaat voor de regel "rechts gaat voor".',
  },
};


/* ---------------------------------------------------------------------
   3. QUESTIONS
   question:     the question
   sign:         (optional) a sign shown with the question
   answers:      2 to 4 answers (in a route: 2 or 3, there are only 3 roads to choose)
   correct:      which answer is right: 0 = the first, 1 = the second, …
   explanation:  what the player sees after answering
   With 2 answers the order stays in a quiz level; with more they're shuffled.
   show:         (optional, only on a route) who or what the question is about,
                 as seen coming from 'south' (it turns along with where you come from):
                   { type: 'car', color: 'blue', from: 'east', turn: 'left' }  – rides in and waits
                   { type: 'pedestrian', at: 'south' }   – wants to cross your road, just before the crossing
                   { type: 'bus', pose: 'busStop' }      – bus at the stop on your road, just before the crossing
                   { type: 'car', pose: 'driveway' }     – car coming out of a driveway onto your road (sign: 'parking' allowed)
                   { type: 'car', pose: 'reversing' }    – car reversing out of a driveway
                   { zebra: 'south' }                    – a zebra crossing on that road
                   { unpaved: 'east' }                   – that road is a sand track
                 Add  first: true  to whoever goes before you: once you've picked a road they go and
                 you wait. The others go after you.
                 Put whatever crosses your road on 'south' or in a pose: with 2 answers you turn
                 left or right, so whatever stands straight ahead ('north') you never meet.
                 Questions that say which way you go ('Je fietst rechtdoor…') don't fit a route.
   situation:    (optional) true for a question about a traffic situation ('Wie gaat voor?')
                 that has no 'show'. A question with 'show' is a situation question anyway.
                 To turn around at a closed road the player gets a knowledge question:
                 never a situation question, unless the stop names it as its returnQuestion.
   --------------------------------------------------------------------- */
const QUESTIONS = {

  // --- right of way or going first? ---
  'rule-1': {
    question: 'Voor wie gelden de voorrangsregels?',
    answers: ['Voor bestuurders onderling', 'Voor voetgangers', 'Voor iedereen, ook voetgangers'], correct: 0,
    explanation: 'Voorrangsregels gelden voor bestuurders onderling. Ook een fietser is een bestuurder.',
  },
  'rule-2': {
    question: 'Waar gelden de voorrangsregels?',
    answers: ['Alleen op kruisingen', 'Overal op de weg', 'Alleen bij een zebrapad'], correct: 0,
    explanation: 'Voorrangsregels gelden alleen op kruisingen, als je te maken krijgt met bestuurders die uit een zijweg komen.',
  },
  'rule-3': {
    question: 'Je loopt en wilt bij een kruising oversteken. Een auto komt uit een zijweg van rechts. Wie gaat eerst?', situation: true,
    answers: ['De auto', 'Ik, de voetganger'], correct: 0,
    explanation: 'Als voetganger gelden de voorrangsregels niet voor jou. Je laat bestuurders uit een zijweg van links of rechts voorgaan.',
  },
  'rule-4': {
    question: 'Ben je een bestuurder als je fietst?',
    answers: ['Ja', 'Nee'], correct: 0,
    explanation: 'Ja, een fietser is een bestuurder. De voorrangsregels gelden dus ook voor jou als je fietst.',
  },
  'rule-5': {
    question: 'Voor wie gelden de voorgaanregels?',
    answers: ['Voor bestuurders én voetgangers', 'Alleen voor auto\'s', 'Alleen voor voetgangers'], correct: 0,
    explanation: 'Voorgaanregels gelden voor bestuurders en voetgangers, dus ook voor jou als je loopt of fietst.',
  },
  'rule-6': {
    question: 'Wanneer gebruik je de voorgaanregels?',
    answers: ['Bij verkeer dat met jou op dezelfde weg is', 'Bij verkeer uit een zijweg', 'Alleen bij verkeerslichten'], correct: 0,
    explanation: 'Voorgaanregels gelden bij verkeer dat met jou op dezelfde weg is: verkeer dat jou tegemoet of achterop komt.',
  },
  'rule-7': {
    question: 'Wat is een gewone kruising?',
    answers: ['Een kruising zonder voorrangstekens of voorrangsborden', 'Een kruising met haaientanden', 'Een kruising met een stopbord'], correct: 0,
    explanation: 'Een gewone kruising heeft geen voorrangstekens en geen voorrangsborden. De wegen moeten wel verhard zijn.',
  },
  'rule-8': {
    question: 'Je fietst op een gewone kruising. Aan wie geef je voorrang?',
    answers: ['Aan bestuurders van rechts', 'Aan bestuurders van links', 'Aan niemand'], correct: 0,
    explanation: 'Op een gewone kruising geef je voorrang aan bestuurders van rechts. Van bestuurders van links krijg je voorrang.',
  },
  'rule-9': {
    question: 'Een zandweg komt uit op een asfaltweg. Is dat een gewone kruising?',
    answers: ['Nee', 'Ja'], correct: 0,
    explanation: 'Bij een gewone kruising moeten de weg en het fietspad verhard zijn, van steen of asfalt. Een zandweg is onverhard.',
  },
  'rule-10': {
    question: 'Hoe zie je dat je bij een voorrangskruising bent?',
    answers: ['Aan de voorrangstekens langs de weg en op het wegdek', 'Aan de verkeerslichten', 'Dat zie je niet'], correct: 0,
    explanation: 'Bij voorrangskruisingen staan voorrangsborden langs de weg en haaientanden op het wegdek.',
  },
  'rule-11': {
    question: 'Gelden voorrangsborden ook voor voetgangers?',
    answers: ['Nee', 'Ja'], correct: 0,
    explanation: 'Voorrangsborden gelden alleen voor bestuurders onderling.',
  },

  // --- signs in practice ---
  'sign-1': {
    question: 'Je fietst naar dit bord. Er komt niemand aan. Wat doe je?', sign: 'stop',
    answers: ['Toch stoppen voor de stopstreep', 'Gewoon doorfietsen'], correct: 0,
    explanation: 'Bij een stopbord stop je altijd voor de stopstreep, ook als er niemand aankomt. Dan kijk je links en rechts.',
  },
  'sign-2': {
    question: 'Wat ligt er altijd op de weg bij dit bord?', sign: 'yield',
    answers: ['Haaientanden', 'Een zebrapad', 'Een stopstreep'], correct: 0,
    explanation: 'Bij het bord "voorrang verlenen" staan altijd haaientanden op het wegdek.',
  },
  'sign-3': {
    question: 'Je fietst op een weg met dit bord. Een auto komt uit een zijweg van rechts. Wie gaat eerst?', sign: 'priority-road',
    show: [{ type: 'car', color: 'blue', from: 'east' }],
    answers: ['Ik', 'De auto'], correct: 0,
    explanation: 'Op de voorrangsweg krijg jij voorrang van bestuurders uit de zijwegen, van links en van rechts.',
  },
  'sign-4': {
    question: 'Jij hebt voorrang. Een auto van links remt niet af. Wat doe je?',
    show: [{ type: 'car', color: 'red', from: 'west', first: true }],
    answers: ['Goed kijken en zo nodig wachten', 'Doorfietsen, ik heb toch voorrang'], correct: 0,
    explanation: 'Ook al moet jij voorrang krijgen, kijk goed of de ander wel voor je stopt.',
  },

  // --- going first on a bike ---
  'goFirst-1': {
    question: 'Je fietst buiten de bebouwde kom. Een bus wil wegrijden bij de halte. Wie gaat voor?',
    show: [{ type: 'bus', color: 'yellow', pose: 'busStop' }],
    answers: ['Ik', 'De bus'], correct: 0,
    explanation: 'Buiten de bebouwde kom ga jij voor als een bus wegrijdt bij de halte.',
  },
  'goFirst-2': {
    question: 'Je fietst binnen de bebouwde kom. Een bus wil wegrijden bij de halte. Wie gaat voor?',
    show: [{ type: 'bus', color: 'yellow', pose: 'busStop', first: true }],
    answers: ['Ik', 'De bus'], correct: 1,
    explanation: 'Binnen de bebouwde kom laat je een bus die wegrijdt bij de halte voorgaan.',
  },
  'goFirst-3': {
    question: 'Je fietst. Een auto rijdt achteruit de weg op. Wie gaat voor?',
    show: [{ type: 'car', color: 'green', pose: 'reversing' }],
    answers: ['Ik', 'De auto'], correct: 0,
    explanation: 'Iemand die achteruitrijdt, laat jou voorgaan.',
  },
  'goFirst-4': {
    question: 'Je fietst. Een auto komt van een parkeerplaats. Wie gaat voor?',
    show: [{ type: 'car', color: 'blue', pose: 'driveway', sign: 'parking' }],
    answers: ['Ik', 'De auto'], correct: 0,
    explanation: 'Wie van een parkeerplaats komt, laat jou voorgaan.',
  },
  'goFirst-5': {
    question: 'Je fietst. Iemand komt uit een uitrit. Wie gaat voor?',
    show: [{ type: 'car', color: 'white', pose: 'driveway' }],
    answers: ['Ik', 'De ander'], correct: 0,
    explanation: 'Wie uit een uitrit komt, laat jou voorgaan.',
  },
  'goFirst-6': {
    question: 'Je fietst. Iemand komt van een erf. Wie gaat voor?',
    show: [{ type: 'car', color: 'orange', pose: 'driveway' }],
    answers: ['Ik', 'De ander'], correct: 0,
    explanation: 'Wie van een erf komt, laat jou voorgaan.',
  },
  'goFirst-7': {
    question: 'Je fietst. Iemand komt van een oprit. Wie gaat voor?',
    show: [{ type: 'car', color: 'purple', pose: 'driveway' }],
    answers: ['Ik', 'De ander'], correct: 0,
    explanation: 'Wie van een oprit komt, laat jou voorgaan.',
  },
  'goFirst-8': {
    question: 'Je fietst. Iemand komt uit een onverharde weg (een zandpad). Wie gaat voor?',
    show: [{ unpaved: 'east' }, { type: 'bike', from: 'east' }],
    answers: ['Ik', 'De ander'], correct: 0,
    explanation: 'Wie uit een onverharde weg komt, laat jou voorgaan.',
  },
  'goFirst-9': {
    question: 'Je fietst. Een voetganger wil de weg oversteken. Er is geen zebrapad en geen verkeerslicht. Wie gaat voor?',
    show: [{ type: 'pedestrian', at: 'south' }],
    answers: ['Ik', 'De voetganger'], correct: 0,
    explanation: 'Zonder zebrapad of verkeerslicht ga jij voor. Bij een zebrapad laat je de voetganger voorgaan.',
  },
  'goFirst-10': {
    question: 'Je fietst. Een voetganger wil bij het zebrapad oversteken. Wie gaat voor?', sign: 'zebra',
    show: [{ zebra: 'south' }, { type: 'pedestrian', at: 'south', first: true }],
    answers: ['Ik', 'De voetganger'], correct: 1,
    explanation: 'Een voetganger die bij het zebrapad wil oversteken, laat je voorgaan.',
  },
  'goFirst-11': {
    question: 'Je fietst. Een voetganger die slecht kan lopen, wil oversteken. Wie gaat voor?',
    show: [{ type: 'pedestrian', at: 'south', first: true }],
    answers: ['Ik', 'De voetganger'], correct: 1,
    explanation: 'Een voetganger die slecht kan lopen, laat je voorgaan.',
  },
  'goFirst-12': {
    question: 'Je fietst. Een voetganger die slecht ziet of blind is, wil oversteken. Wie gaat voor?',
    show: [{ type: 'pedestrian', at: 'south', first: true }],
    answers: ['Ik', 'De voetganger'], correct: 1,
    explanation: 'Een voetganger die slecht ziet of blind is, laat je voorgaan.',
  },
  'goFirst-13': {
    question: 'Je fietst. Er komt een ambulance met blauwe zwaailichten en een sirene. Wie gaat voor?',
    show: [{ type: 'ambulance', from: 'west', first: true }],
    answers: ['Ik', 'De ambulance'], correct: 1,
    explanation: 'Een voertuig met blauwe zwaailichten en een sirene laat je altijd voorgaan.',
  },
  'goFirst-14': {
    question: 'Je slaat rechtsaf, een kleine bocht. Een auto van de overkant slaat dezelfde weg in met een grote bocht. Wie gaat voor?', situation: true,
    show: [{ type: 'car', color: 'yellow', from: 'north', turn: 'left' }],
    answers: ['Ik', 'De auto'], correct: 0,
    explanation: 'Wie bij het afslaan een kleine bocht neemt, gaat voor op wie een grote bocht neemt naar dezelfde weg.',
  },
  'goFirst-15': {
    question: 'Je fietst rechtdoor op de rotonde. Een auto wil voor je langs afslaan. Wie gaat voor?', situation: true,
    answers: ['Ik', 'De auto'], correct: 0,
    explanation: 'Wie rechtdoor op de rotonde wil, gaat voor op verkeer dat voor je langs wil afslaan.',
  },
  'goFirst-16': {
    question: 'Je fietst rechtdoor. Een auto op dezelfde weg wil voor je langs afslaan. Wie gaat voor?', situation: true,
    show: [{ type: 'car', color: 'red', from: 'north', turn: 'left' }],
    answers: ['Ik', 'De auto'], correct: 0,
    explanation: 'Wie rechtdoor op dezelfde weg wil, gaat voor op verkeer dat voor je langs wil afslaan.',
  },
};


/* ---------------------------------------------------------------------
   4. ROUTES
   A route is a story: the player rides from crossing to crossing. At each
   crossing (a 'stop') they pick a road and just ride on: nobody says it was right.
   A wrong road ends at a closed road. To turn around they answer an extra
   question (the 'returnQuestion', or else a knowledge question from the quiz
   levels, see 'situation' at QUESTIONS). Wrong? One more question, then a traffic
   controller helps. Back at the crossing they answer its question again; the
   right answer is still on the same road. After 3 wrong roads at one crossing a
   traffic controller shows the way.
   At the end the prize is waiting.

   vehicle:   bike | car
   color:     the colour of your car or of your shirt on the bike: red, blue, yellow, green, orange, purple, white
              (empty = a red car; the shirt changes every ride)
   scenery:   (optional) the surroundings at the start: village | city | forest | polder
   prizes:    where you ride to; each ride picks one that suits the theme:
                name:    what the place is called in the story ('het zwembad'); {prize} in a story becomes this name
                emoji, text: what the player sees at the end
                place:   (optional) the place itself as the last scene: pool | iceRink | hauntedHouse | playground
                         (without place: a trophy on a crossing)
                themes:  (optional) only in these themes, e.g. ['winter']; without themes it always fits
   stops:     the crossings, in order. Each stop is one of these:
     { story: '…', questions: ['rule-4'] }                – a question from QUESTIONS
     { story: '…', questions: [{ question: '…', answers: [...], correct: 0, explanation: '…', sign: '…' }] }
                                                          – a question written right here
     { story: '…', situations: ['right-1'] }              – who goes first? One of the road users becomes
                                                            your bike or car (me: 'f' picks which one).
   With several questions or situations in the list, each ride picks one (never the
   same one twice in a ride). So the kids learn the rules, not the route.
   The story should fit every question in the list.

   scenery:         (optional) from this stop on other surroundings: village | city | forest | polder
                    (the next stops keep it until another one is given)
   returnQuestion:  (optional) the extra question when the player takes the wrong road here:
                    a key from QUESTIONS or { question, answers, correct, explanation }
   explanation:     (optional, with a situation) own explanation, if the situation's one names
                    a colour that doesn't fit: 'me' gets the colour of your bike or car
   A question has 2 or 3 answers (there are no more roads). Which answer is on which
   road differs every ride. The crossing turns along with the side you come from.
   --------------------------------------------------------------------- */
const ROUTES = {
  'fietstocht': {
    vehicle: 'bike', scenery: 'city',
    prizes: [
      { name: 'het zwembad', emoji: '🏊', text: 'Je bent bij het zwembad!', place: 'pool', themes: ['summer'] },
      { name: 'de schaatsbaan', emoji: '⛸️', text: 'Je bent bij de schaatsbaan!', place: 'iceRink', themes: ['winter'] },
      { name: 'het spookhuis', emoji: '👻', text: 'Je bent bij het spookhuis! Boe!', place: 'hauntedHouse', themes: ['halloween'] },
      { name: 'de speeltuin', emoji: '🛝', text: 'Je bent bij de speeltuin!', place: 'playground' },
    ],
    stops: [
      { story: 'Het is zaterdag en je fietst naar {prize}. Bij elke kruising kies je de weg met het goede antwoord.',
        questions: ['rule-4', 'rule-1', 'rule-5', 'rule-2', 'goFirst-2'] },
      { story: 'Op deze gewone kruising komt er nog iemand aan.',
        situations: ['right-1', 'right-3', 'right-5'] },
      { story: 'Je fietst door het dorp. Bij de volgende kruising staat een bord.', scenery: 'village',
        questions: ['sign-1', 'sign-2', 'sign-3',
          { sign: 'yield', question: 'Wat moet je doen bij dit bord?', answers: ['Voorrang geven aan links én rechts', 'Alleen voorrang geven aan rechts', 'Gewoon doorfietsen'], correct: 0, explanation: 'Bij haaientanden geef je voorrang aan bestuurders van links én van rechts.' }] },
      { story: 'Op deze kruising slaan jullie af. Wie gaat er voor?',
        situations: ['turning-3', 'turning-5', 'turning-6'] },
      { story: 'Je fietst de stad uit, het bos in. Wie gaat er voor?', scenery: 'forest',
        questions: ['goFirst-1', 'goFirst-3', 'goFirst-4', 'goFirst-5', 'goFirst-6', 'goFirst-7', 'goFirst-8'] },
      { story: 'Nu kom je bij een voorrangskruising.',
        situations: ['yield-1', 'yield-3', 'yield-5'] },
      { story: 'Je fietst door de polder. Je bent er bijna! Nog één kruising…', scenery: 'polder',
        questions: ['goFirst-9', 'goFirst-10', 'goFirst-11', 'goFirst-12', 'goFirst-13'] },
    ],
  },
};


/* ---------------------------------------------------------------------
   5. LEVELS (in order on the map)
   id:        stays the same: it's what the Google Sheet logs and what saved stars use
   kind:      quiz       – questions from QUESTIONS (questions: which ones)
              signs      – what does this sign mean? (families: which signs)
              crossing   – who goes first? (situations: which ones)
              route      – a story from ROUTES (route: which one)
              families   – which family does this sign belong to?
              finalTest  – a mix of all levels that are switched on
   enabled:   false = this level is not in the game (yet)
   count:     how many questions (empty = all)
   --------------------------------------------------------------------- */
const LEVELS = [
  { id: 'voorrang-voorgaan', title: 'Voorrang of voorgaan?', kind: 'quiz', questions: ['rule-1', 'rule-2', 'rule-3', 'rule-4', 'rule-5', 'rule-6', 'rule-11'],
    explanation: 'Voorrang: tussen bestuurders, op kruisingen, met verkeer uit een zijweg.\nVoorgaan: voor bestuurders én voetgangers, met verkeer op dezelfde weg (tegemoet of achterop).\nLet op: een fietser is ook een bestuurder!' },

  { id: 'rechts', title: 'Gewone kruising', kind: 'crossing', situations: ['right-1', 'right-2', 'right-3', 'right-4', 'right-5', 'right-6'],
    explanation: 'Een gewone kruising heeft geen voorrangsborden of voorrangstekens, en de wegen zijn verhard.\nGeef voorrang aan bestuurders van rechts. Van links krijg je voorrang.\nTik de weggebruikers aan in de volgorde waarin ze mogen gaan.' },

  { id: 'voorrangsborden', title: 'Voorrangsborden', kind: 'signs', families: ['priority'], count: 10,
    explanation: 'Voorrangsborden gelden alleen voor bestuurders onderling.\nRuit: voorrangsweg. Driehoek met de punt omlaag: voorrang verlenen (haaientanden). Achthoek: stop.\nDriehoek met een dikke streep: jij krijgt voorrang op de volgende kruising.' },

  { id: 'haaientanden', title: 'Voorrangskruising', kind: 'crossing', situations: ['yield-1', 'yield-2', 'yield-3', 'yield-4', 'yield-5', 'yield-6'],
    explanation: 'Bij een voorrangskruising staan voorrangsborden langs de weg en haaientanden op het wegdek.\nHaaientanden of een stopbord? Geef voorrang aan bestuurders van links én rechts.\nBij een stopbord stop je altijd voor de stopstreep.' },

  { id: 'afslaan', title: 'Rechtdoor en afslaan', kind: 'crossing', situations: ['turning-1', 'turning-2', 'turning-3', 'turning-4', 'turning-5', 'turning-6'],
    explanation: 'Dit zijn voorgaanregels, met verkeer op dezelfde weg.\nRechtdoor gaat voor op wie voor je langs wil afslaan.\nSlaan twee dezelfde weg in? Dan gaat de kleine bocht voor de grote bocht.' },

  { id: 'zebrapad', title: 'Voetgangers', kind: 'crossing', situations: ['zebra-1', 'zebra-2', 'zebra-3', 'zebra-4', 'zebra-5'],
    explanation: 'Wil een voetganger bij het zebrapad oversteken? Dan laat je hem voorgaan.\nIs er geen zebrapad of verkeerslicht? Dan ga jij als fietser voor.' },

  { id: 'ambulance', title: 'Zwaailicht en sirene', kind: 'crossing', situations: ['ambulance-1', 'ambulance-2', 'ambulance-3', 'ambulance-4', 'ambulance-5', 'ambulance-6', 'ambulance-7'],
    explanation: 'Een voertuig met blauwe zwaailichten én een sirene laat je altijd voorgaan, wat de borden ook zeggen. Kijk goed: staan de zwaailichten uit? Dan is het een gewone auto en gelden de gewone regels.' },

  { id: 'voorgaan', title: 'Wie gaat voor?', kind: 'quiz', count: 12, questions: ['goFirst-1', 'goFirst-2', 'goFirst-3', 'goFirst-4', 'goFirst-5', 'goFirst-6', 'goFirst-7', 'goFirst-8', 'goFirst-9', 'goFirst-10', 'goFirst-11', 'goFirst-12', 'goFirst-13', 'goFirst-14', 'goFirst-15', 'goFirst-16', 'sign-1', 'sign-4'],
    explanation: 'Je fietst. Je gaat voor bij: een bus buiten de bebouwde kom, iemand die achteruitrijdt, van een parkeerplaats, uitrit, erf of oprit komt, of uit een onverharde weg komt.\nJe laat voorgaan: een bus binnen de bebouwde kom, zwaailicht met sirene, en voetgangers bij het zebrapad, die slecht lopen of slecht zien.' },

  { id: 'fietstocht', title: 'Fietstocht', kind: 'route', route: 'fietstocht',
    explanation: 'Fiets naar een leuke plek! Bij elke kruising krijg je een vraag. Tik op de weg met het goede antwoord.\nOf je goed zat, merk je pas verderop. Loopt de weg dood? Dan beantwoord je een extra vraag om om te keren.\nOp sommige kruisingen moet je zeggen wie er eerst mag.' },

  { id: 'eindtoets', title: 'Eindtoets', kind: 'finalTest', count: 15,
    explanation: 'Een mix van borden, kruispunten en vragen, net als de echte toets. Succes!' },

  // ---- Not in this test (set enabled: true to use them) ----
  { id: 'families', title: 'Bordenfamilies', kind: 'families', count: 8, enabled: false,
    explanation: 'Aan de vorm en kleur van een bord zie je wat voor bord het is.' },
  { id: 'verbodsborden', title: 'Verbodsborden', kind: 'signs', families: ['prohibition'], count: 8, enabled: false,
    explanation: 'Verbodsborden zijn rond met een rode rand. Ze zeggen wat níet mag.' },
  { id: 'gebod-waarschuwing', title: 'Moeten en opletten', kind: 'signs', families: ['mandatory', 'warning'], count: 8, enabled: false,
    explanation: 'Een blauw rond bord zegt wat je móet doen. Een driehoek met een rode rand waarschuwt: let op!' },
  { id: 'verkeerslichten', title: 'Verkeerslichten', kind: 'crossing', enabled: false, situations: ['lights-1', 'lights-2'],
    explanation: 'Een verkeerslicht gaat voor borden en voor "rechts gaat voor".' },
];

/* Drawings the game knows:
   no-entry, closed, no-bikes, no-cars, no-pedestrians, max-30, no-parking, no-stopping, bike-path, 
   footpath, ahead-only, turn-right, warn-crossing, warn-children, warn-lights, warn-zebra, 
   warn-bikes, yield, stop, priority-road, end-priority-road, priority-crossing, 
   priority-side-left, priority-side-right, zebra, parking, dead-end, one-way
*/

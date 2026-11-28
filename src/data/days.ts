// The "days" section of the photographs page: a diary by place and date,
// edited from one memory card. Same shape as the series in photos.ts, plus
// when each chapter and each frame was taken. Files live in
// public/photos/days as p<id>-<size>.webp; <id> is the camera's frame number.
//
// Times are local to where the frame was taken. The X half frames carry the
// date only, the same date the camera printed into the corner of the picture.

import type { Series } from "./photos";

export const days: Series[] = [
  {
    slug: "seattle-2025",
    title: "seattle",
    when: "10.25",
    span: "17 – 26.10.2025",
    camera: "X100VI",
    hero: { id: "2403", w: 1800, h: 1200, t: "19.10.2025 · 21:22", alt: "A street lamp glowing through red autumn leaves at night" },
    rows: [
      [
        { id: "2083", w: 1800, h: 1200, t: "17.10.2025 · 18:44", alt: "A man at the door of a Chinese restaurant lit by neon" },
        { id: "2130", w: 1800, h: 1200, t: "17.10.2025 · 18:56", alt: "A coffee stall glowing green and yellow in a covered alley at night" },
      ],
      [
        { id: "2187", w: 1800, h: 1200, t: "17.10.2025 · 19:16", alt: "A man mid-stride on a crossing under street lamps at night" },
        { id: "2244", w: 1200, h: 1800, t: "17.10.2025 · 19:41", alt: "Silhouettes of a man with a backpack and a stroller against a lit window" },
      ],
      [
        { id: "2325", w: 1800, h: 1200, t: "19.10.2025 · 15:52", alt: "A red Fiat parked outside a dark office entrance" },
        { id: "2329", w: 1200, h: 1800, t: "19.10.2025 · 15:53", alt: "A lone walker on a pavement, lit from behind by low sun" },
      ],
      [
        { id: "2491", w: 1800, h: 1200, t: "20.10.2025 · 22:16", alt: "Fallen leaves on glowing steps at night" },
        { id: "2503", w: 1800, h: 1200, t: "20.10.2025 · 22:19", alt: "A lit parking garage entrance at night, one person standing outside" },
      ],
      [
        { id: "2620", w: 1200, h: 1800, t: "26.10.2025 · 17:32", alt: "A footpath covered in red leaves beside a chain-link fence" },
        { id: "2641", w: 1800, h: 1200, t: "26.10.2025 · 17:35", alt: "Two people walking down a wet road lined with red trees" },
      ],
      [
        { id: "2648", w: 1800, h: 1200, t: "26.10.2025 · 17:37", alt: "Birds crossing a grey sky beside a street lamp" },
        { id: "2671", w: 1800, h: 1200, t: "26.10.2025 · 17:41", alt: "One person sitting at a picnic table under a lakeside shelter at dusk" },
      ],
      [
        { id: "2722", w: 1200, h: 1800, t: "26.10.2025 · 17:55", alt: "A dock lamp and picnic tables against a clearing sunset over the lake" },
        { id: "2759", w: 1800, h: 1200, t: "26.10.2025 · 18:12", alt: "A wet road through a windscreen, tail lights reflected in the rain" },
      ],
    ],
  },
  {
    slug: "hong-kong",
    title: "hong kong",
    when: "11.25",
    span: "23 – 25.11.2025",
    camera: "X100VI",
    hero: { id: "2786", w: 1800, h: 1200, t: "23.11.2025 · 07:52", alt: "Ferries at a pier on Victoria Harbour in morning haze" },
    rows: [
      [
        { id: "2910", w: 1800, h: 1200, t: "23.11.2025 · 13:45", alt: "Looking out through the windscreen of a Hong Kong minibus" },
        { id: "2924", w: 1800, h: 1200, t: "23.11.2025 · 15:24", alt: "A man at the counter of a shop under a painted awning" },
      ],
      [
        { id: "2933", w: 1800, h: 1200, t: "23.11.2025 · 15:38", alt: "A red minibus close up, the driver behind its destination signs" },
        { id: "2968", w: 1800, h: 1200, t: "23.11.2025 · 16:41", alt: "The shadow of a pine cast on a wall in low afternoon light" },
      ],
      [
        { id: "3046", w: 1800, h: 1200, t: "24.11.2025 · 08:34", alt: "A wet market seen from above, one person pulling a cart past the stalls" },
        { id: "3061", w: 1800, h: 1200, t: "24.11.2025 · 09:55", alt: "A fruit stall under hanging lamps, oranges stacked in front" },
      ],
      [
        { id: "3075", w: 1800, h: 1200, t: "24.11.2025 · 10:05", alt: "A red taxi and passers-by framed by a doorway" },
        { id: "3098", w: 1800, h: 1200, t: "24.11.2025 · 10:13", alt: "A red taxi in motion, the street blurred behind it" },
      ],
      [
        { id: "3144", w: 1200, h: 1800, t: "24.11.2025 · 10:25", alt: "A double-decker tram seen from a footbridge" },
        { id: "3165", w: 1800, h: 1200, t: "24.11.2025 · 11:05", alt: "The city seen through the front windows of a tram's upper deck" },
        { id: "3229", w: 1200, h: 1800, t: "24.11.2025 · 14:35", alt: "People crossing a street into low sun between towers" },
      ],
      [
        { id: "3269", w: 1800, h: 1200, t: "24.11.2025 · 18:55", alt: "A cook's hands lifting noodles beside bowls of wonton soup" },
        { id: "3284", w: 1800, h: 1200, t: "24.11.2025 · 19:08", alt: "A bus passing in the dark, a pink screen glowing behind it" },
      ],
      [
        { id: "3495", w: 1800, h: 1200, t: "25.11.2025 · 10:41", alt: "A pale blue double-decker tram passing a block of flats" },
        { id: "3586", w: 1800, h: 1200, t: "25.11.2025 · 14:28", alt: "The white upper deck of a ferry with a life ring, blue water behind" },
      ],
      [
        { id: "3609", w: 1800, h: 1200, t: "25.11.2025 · 14:35", alt: "Glass towers seen through three ferry portholes" },
        { id: "3640", w: 1200, h: 1800, t: "25.11.2025 · 14:47", alt: "A lone walker on a walkway curving between white walls" },
      ],
    ],
  },
  {
    slug: "kyoto",
    title: "kyoto",
    when: "11.25",
    span: "26 – 29.11.2025",
    camera: "X100VI",
    hero: { id: "3704", w: 1800, h: 1200, t: "26.11.2025 · 15:11", alt: "A train seat by the window, rail yards and sky passing outside" },
    rows: [
      [
        { id: "3682", w: 1800, h: 1200, t: "26.11.2025 · 15:05", alt: "A river and an arched bridge under heavy cloud, seen from a train" },
        { id: "3720", w: 1800, h: 1200, t: "26.11.2025 · 15:21", alt: "A pylon and power lines against a bright sky, seen from a train" },
      ],
      [
        { id: "3733", w: 1800, h: 1200, t: "26.11.2025 · 15:28", alt: "A three-storey house in late sun, seen from a train" },
        { id: "3751", w: 1800, h: 1200, t: "26.11.2025 · 16:48", alt: "Cyclists passing a convenience store at a crossing" },
      ],
      [
        { id: "4259", w: 1200, h: 1800, t: "27.11.2025 · 09:43", alt: "The sun behind utility poles over a quiet crossing" },
        { id: "4514", w: 1800, h: 1200, t: "27.11.2025 · 11:30", alt: "A bicycle wheel resting on fallen maple leaves" },
      ],
      [
        { id: "4517", w: 1200, h: 1800, t: "27.11.2025 · 12:38", alt: "A man looking at his phone in the doorway of a train, the platform bright behind him" },
        { id: "4541", w: 1200, h: 1800, t: "27.11.2025 · 13:23", alt: "A white kei van parked under a pine beside a red maple" },
        { id: "4558", w: 1800, h: 1200, t: "27.11.2025 · 14:44", alt: "A long tatami room with windows onto autumn trees" },
      ],
      [
        { id: "4792", w: 1800, h: 1200, t: "27.11.2025 · 16:50", alt: "A shop front glowing at dusk on a wet street, a passer-by blurred in front" },
        { id: "4884", w: 1800, h: 1200, t: "27.11.2025 · 17:50", alt: "A tea bowl on a black tray on tatami" },
      ],
      [
        { id: "5403", w: 1800, h: 1200, t: "29.11.2025 · 09:24", alt: "A cyclist waiting at a junction under a flyover" },
        { id: "5573", w: 1800, h: 1200, t: "29.11.2025 · 15:00", alt: "People on a riverside path seen from the shade of a bridge" },
      ],
    ],
  },
  {
    slug: "kyoto-after-dark",
    title: "kyoto, after dark",
    when: "11.25",
    span: "26 – 28.11.2025",
    camera: "X100VI",
    heroY: 46,
    hero: { id: "5342", w: 1800, h: 1200, t: "28.11.2025 · 23:30", alt: "A convenience store lit across an empty crossing at night" },
    rows: [
      [
        { id: "3763", w: 1800, h: 1200, t: "26.11.2025 · 17:08", alt: "Pink dusk behind power lines and rooftops, a car's headlights below" },
        { id: "3765", w: 1200, h: 1800, t: "26.11.2025 · 17:11", alt: "A walker with a backpack on a lane at dusk" },
      ],
      [
        { id: "4126", w: 1800, h: 1200, t: "26.11.2025 · 21:33", alt: "A black taxi parked under the lights of a hotel entrance" },
      ],
      [
        { id: "4140", w: 1200, h: 1800, t: "26.11.2025 · 21:48", alt: "A worker moving crates outside a convenience store at night" },
        { id: "4159", w: 1800, h: 1200, t: "26.11.2025 · 21:52", alt: "A cook at work behind a lit kitchen window hung with paper lanterns" },
      ],
      [
        { id: "4174", w: 1800, h: 1200, t: "26.11.2025 · 21:58", alt: "A 24-hour laundromat seen through its window at night" },
        { id: "4208", w: 1800, h: 1200, t: "26.11.2025 · 22:15", alt: "Parked bicycles and their shadows under warm light" },
      ],
      [
        { id: "5245", w: 1200, h: 1800, t: "28.11.2025 · 17:39", alt: "A school-crossing sign on a pole beside a red maple at night" },
        { id: "5252", w: 1800, h: 1200, t: "28.11.2025 · 17:54", alt: "A green train waiting at an empty platform at night" },
      ],
      [
        { id: "5254", w: 1800, h: 1200, t: "28.11.2025 · 18:16", alt: "Passengers on a bench on a lit station platform at night" },
        { id: "5256", w: 1200, h: 1800, t: "28.11.2025 · 19:02", alt: "Lit maples along the track seen through a train's front window" },
        { id: "5269", w: 1200, h: 1800, t: "28.11.2025 · 19:11", alt: "A convex mirror on a pole reflecting a crowded platform among maples" },
      ],
      [
        { id: "5270", w: 1800, h: 1200, t: "28.11.2025 · 19:11", alt: "A small rural station lit at night beside the tracks" },
        { id: "5274", w: 1800, h: 1200, t: "28.11.2025 · 19:12", alt: "Two people on a bench in a wooden station waiting room" },
      ],
      [
        { id: "5339", w: 1800, h: 1200, t: "28.11.2025 · 23:28", alt: "Vending machines glowing beside a parked car" },
        { id: "5359", w: 1800, h: 1200, t: "28.11.2025 · 23:39", alt: "One lit window in a dark wall" },
      ],
    ],
  },
  {
    slug: "uji",
    title: "uji",
    when: "11.25",
    span: "28.11.2025",
    camera: "X100VI",
    hero: { id: "5209", w: 1800, h: 1200, t: "28.11.2025 · 17:06", alt: "Pink dusk over a car park, street lamps coming on" },
    rows: [
      [
        { id: "4942", w: 1200, h: 1800, t: "28.11.2025 · 10:12", alt: "A woman walking past a round concrete window in a station" },
        { id: "4944", w: 1800, h: 1200, t: "28.11.2025 · 10:13", alt: "A river town framed by a round concrete opening" },
        { id: "4947", w: 1200, h: 1800, t: "28.11.2025 · 10:13", alt: "A slit of sky through an oval opening in a concrete wall" },
      ],
      [
        { id: "4962", w: 1200, h: 1800, t: "28.11.2025 · 10:19", alt: "A quiet street under power lines, the sun behind thin cloud" },
        { id: "4964", w: 1800, h: 1200, t: "28.11.2025 · 10:19", alt: "Tree shadows on pale paving stones" },
      ],
      [
        { id: "4976", w: 1800, h: 1200, t: "28.11.2025 · 10:24", alt: "Yellow leaves hanging over a blue river" },
        { id: "4981", w: 1200, h: 1800, t: "28.11.2025 · 10:26", alt: "A bridge over a glittering river, a stone embankment in the foreground" },
      ],
      [
        { id: "4993", w: 1200, h: 1800, t: "28.11.2025 · 10:32", alt: "Three people on the steps of a red bridge, seen from below under a tree" },
        { id: "4999", w: 1200, h: 1800, t: "28.11.2025 · 10:38", alt: "A cobbled path to the river framed by a wooden gate and red maples" },
        { id: "5001", w: 1800, h: 1200, t: "28.11.2025 · 10:39", alt: "A cyclist in a red jacket riding down a path between red maples" },
      ],
      [
        { id: "5002", w: 1800, h: 1200, t: "28.11.2025 · 10:44", alt: "Fallen leaves on a stone bank, the river and a line of pines beyond" },
        { id: "5038", w: 1800, h: 1200, t: "28.11.2025 · 11:50", alt: "Three friends sitting on the grass under a pine by the river" },
      ],
      [
        { id: "5063", w: 1200, h: 1800, t: "28.11.2025 · 12:10", alt: "Two matcha lattes on a tray, a man looking out of the window beyond" },
        { id: "5078", w: 1200, h: 1800, t: "28.11.2025 · 12:30", alt: "A tea shop front with a pale ceramic jar by the door" },
        { id: "5089", w: 1800, h: 1200, t: "28.11.2025 · 13:39", alt: "Three cups of green tea on a wooden tray" },
      ],
      [
        { id: "5101", w: 1200, h: 1800, t: "28.11.2025 · 13:49", alt: "A brass tap over a basin in warm light" },
        { id: "5133", w: 1200, h: 1800, t: "28.11.2025 · 15:07", alt: "A cyclist riding into low sun down a narrow street" },
        { id: "5138", w: 1200, h: 1800, t: "28.11.2025 · 15:16", alt: "A doorway hung with a split curtain, seen from a dark room as someone hurries past" },
      ],
      [
        { id: "5155", w: 1800, h: 1200, t: "28.11.2025 · 16:32", alt: "A teapot, a tea caddy and three cups on a red table" },
        { id: "5162", w: 1800, h: 1200, t: "28.11.2025 · 16:46", alt: "A cyclist and a walker passing a vending machine outside a shop" },
      ],
      [
        { id: "5166", w: 1800, h: 1200, t: "28.11.2025 · 16:48", alt: "A traveller with a suitcase waiting at a crossing at dusk" },
        { id: "5170", w: 1200, h: 1800, t: "28.11.2025 · 16:50", alt: "A red treetop against a clear dusk sky with a faint moon" },
      ],
      [
        { id: "5178", w: 1200, h: 1800, t: "28.11.2025 · 16:58", alt: "A utility pole and a roofline at dusk with a faint moon" },
        { id: "5186", w: 1800, h: 1200, t: "28.11.2025 · 16:59", alt: "A scooter passing a house with a lit lattice window" },
      ],
      [
        { id: "5197", w: 1800, h: 1200, t: "28.11.2025 · 17:04", alt: "A river bending between hills at dusk, small figures on the gravel bank" },
        { id: "5203", w: 1800, h: 1200, t: "28.11.2025 · 17:05", alt: "An inn and a torii gate lit under a pink sky" },
      ],
      [
        { id: "5224", w: 1200, h: 1800, t: "28.11.2025 · 17:27", alt: "One person walking a lamp-lit street at night" },
      ],
    ],
  },
  {
    slug: "tokyo",
    title: "tokyo",
    when: "11.25",
    span: "29.11 – 01.12.2025",
    camera: "X100VI",
    heroY: 52,
    hero: { id: "5984", w: 1800, h: 1200, t: "01.12.2025 · 09:46", alt: "A worker beside a truck under yellow ginkgo trees" },
    rows: [
      [
        { id: "5598", w: 1800, h: 1200, t: "29.11.2025 · 17:49", alt: "One person on a station platform at night, seen from a train" },
        { id: "5607", w: 1800, h: 1200, t: "29.11.2025 · 17:52", alt: "A station kiosk blurred by a moving train" },
      ],
      [
        { id: "5631", w: 1200, h: 1800, t: "29.11.2025 · 23:09", alt: "A narrow alley with red walls and hanging shrine lanterns" },
        { id: "5680", w: 1800, h: 1200, t: "29.11.2025 · 23:27", alt: "Bicycles parked in a service passage under fluorescent light" },
      ],
      [
        { id: "5705", w: 1200, h: 1800, t: "29.11.2025 · 23:45", alt: "A pink building lit at night beyond dark walls" },
        { id: "5745", w: 1200, h: 1800, t: "30.11.2025 · 00:02", alt: "A fluorescent tube lighting a narrow alley" },
        { id: "5753", w: 1200, h: 1800, t: "30.11.2025 · 00:04", alt: "Air-conditioning units and ducts on a brick wall" },
      ],
      [
        { id: "5760", w: 1800, h: 1200, t: "30.11.2025 · 10:03", alt: "Patches of low sun on a lattice door and a stone wall" },
        { id: "5768", w: 1800, h: 1200, t: "30.11.2025 · 10:10", alt: "A man crossing a paved walk in low morning sun, long shadows" },
      ],
      [
        { id: "5939", w: 1200, h: 1800, t: "01.12.2025 · 09:37", alt: "A woman crouching to greet a small black dog on a park path" },
        { id: "5963", w: 1200, h: 1800, t: "01.12.2025 · 09:42", alt: "A cyclist passing a row of yellow ginkgo trees" },
        { id: "5986", w: 1800, h: 1200, t: "01.12.2025 · 09:46", alt: "An older woman pushing a cart over fallen ginkgo leaves" },
      ],
      [
        { id: "5993", w: 1800, h: 1200, t: "01.12.2025 · 09:47", alt: "The photographer's shadow on fallen ginkgo leaves at the foot of a tree" },
        { id: "6070", w: 1200, h: 1800, t: "01.12.2025 · 10:03", alt: "Two heads in silhouette under the sun between towers" },
      ],
      [
        { id: "6076", w: 1800, h: 1200, t: "01.12.2025 · 10:03", alt: "A woman with a tote bag going down subway stairs" },
        { id: "6126", w: 1200, h: 1800, t: "01.12.2025 · 13:42", alt: "A pylon and autumn trees through the window of a bus" },
      ],
    ],
  },
  {
    slug: "seattle-2026",
    title: "seattle",
    when: "08.26",
    span: "08.08 – 07.10.2026",
    camera: "X100VI",
    hero: { id: "8120", w: 1800, h: 1200, t: "09.08.2026 · 12:51", alt: "A friend standing at the stern of a ferry, the wake and the Seattle skyline behind" },
    rows: [
      [
        { id: "7860", w: 1800, h: 1200, t: "08.08.2026 · 11:54", alt: "A light-rail platform seen from above as a train pulls in" },
        { id: "7870", w: 1200, h: 1800, t: "08.08.2026 · 12:05", alt: "Red stairs beside a diamond-patterned glass wall" },
        { id: "7875", w: 1200, h: 1800, t: "08.08.2026 · 12:08", alt: "A figure in silhouette on a yellow escalator" },
      ],
      [
        { id: "7946", w: 1200, h: 1800, t: "08.08.2026 · 18:14", alt: "Hikers on a forest trail with the sun low through the trees" },
        { id: "7965", w: 1200, h: 1800, t: "08.08.2026 · 18:17", alt: "A hiker from behind, rim-lit by the sun through the trees" },
        { id: "7987", w: 1800, h: 1200, t: "08.08.2026 · 18:43", alt: "A hiker in silhouette looking over a valley at dusk" },
      ],
      [
        { id: "8009", w: 1800, h: 1200, t: "08.08.2026 · 18:48", alt: "Two long shadows on a rock ledge beside friends resting above a forested valley" },
        { id: "8033", w: 1200, h: 1800, t: "08.08.2026 · 19:12", alt: "A person sitting on a ledge above a blue lake" },
      ],
      [
        { id: "8130", w: 1800, h: 1200, t: "09.08.2026 · 12:52", alt: "Feet and railing shadows on a ferry deck" },
        { id: "8147", w: 1800, h: 1200, t: "09.08.2026 · 15:28", alt: "Hands holding a camera with a long lens" },
      ],
      [
        { id: "8160", w: 1200, h: 1800, t: "09.08.2026 · 15:55", alt: "Passengers going down a white stairwell on a ferry" },
        { id: "8162", w: 1800, h: 1200, t: "09.08.2026 · 16:06", alt: "A vaulted light-rail station seen from the mezzanine" },
        { id: "8164", w: 1200, h: 1800, t: "09.08.2026 · 16:10", alt: "A friend looking up at the vaulted ceiling of a station" },
      ],
      [
        { id: "8174", w: 1800, h: 1200, t: "09.08.2026 · 19:59", alt: "A friend watching the sun set over open hills" },
        { id: "8200", w: 1800, h: 1200, t: "09.08.2026 · 20:34", alt: "Pink clouds over wooded hills after sunset" },
      ],
      [
        { id: "8204", w: 1800, h: 1200, t: "07.10.2026 · 17:31", alt: "An airport concourse, travellers in silhouette against the windows" },
      ],
    ],
  },
  {
    slug: "philadelphia",
    title: "philadelphia",
    when: "10.26",
    span: "23.10.2026",
    camera: "X half",
    heroY: 50,
    hero: { id: "8313", w: 1350, h: 1800, t: "23.10.2026", alt: "A river and its path at dusk, towers beyond" },
    rows: [
      [
        { id: "8243", w: 1350, h: 1800, t: "23.10.2026", alt: "A flock of birds turning between white office towers" },
        { id: "8258", w: 1350, h: 1800, t: "23.10.2026", alt: "The Liberty Bell in silhouette with Independence Hall beyond the glass" },
        { id: "8271", w: 1350, h: 1800, t: "23.10.2026", alt: "A brick corner building in hard sunlight, the street in shadow" },
      ],
      [
        { id: "8281", w: 1350, h: 1800, t: "23.10.2026", alt: "A man in a red jacket at a café window" },
        { id: "8283", w: 1350, h: 1800, t: "23.10.2026", alt: "Yellow cellar doors and an air conditioner against a brick wall" },
        { id: "8300", w: 1350, h: 1800, t: "23.10.2026", alt: "A church steeple framed by dark leaves" },
      ],
      [
        { id: "8302", w: 1350, h: 1800, t: "23.10.2026", alt: "Two people climbing steps toward City Hall late in the day" },
        { id: "8309", w: 1350, h: 1800, t: "23.10.2026", alt: "A street at dusk with a glass tower in the distance" },
        { id: "8315", w: 1350, h: 1800, t: "23.10.2026", alt: "Walkers on a bridge at dusk, the moon over the skyline" },
      ],
    ],
  },
  {
    slug: "washington",
    title: "washington",
    when: "10.26",
    span: "25.10.2026",
    camera: "X half",
    heroY: 40,
    hero: { id: "8419", w: 1350, h: 1800, t: "25.10.2026", alt: "A Metro train leaving a platform under a departure board" },
    rows: [
      [
        { id: "8324", w: 1350, h: 1800, t: "25.10.2026", alt: "A figure in silhouette on a staircase beside tall windows" },
        { id: "8329", w: 1350, h: 1800, t: "25.10.2026", alt: "An iridescent ammonite fossil on a stand in a museum hall" },
        { id: "8360", w: 1350, h: 1800, t: "25.10.2026", alt: "Visitors in silhouette looking out toward the Reflecting Pool and the Washington Monument" },
      ],
      [
        { id: "8373", w: 1350, h: 1800, t: "25.10.2026", alt: "The long shadow of a tree across a lawn" },
        { id: "8390", w: 1350, h: 1800, t: "25.10.2026", alt: "Sun breaking through a tree beside the Capitol dome" },
        { id: "8402", w: 1350, h: 1800, t: "25.10.2026", alt: "The Washington Monument in silhouette above a crossing" },
      ],
      [
        { id: "8410", w: 1350, h: 1800, t: "25.10.2026", alt: "A man walking up the steps of a marble library entrance" },
        { id: "8415", w: 1350, h: 1800, t: "25.10.2026", alt: "A glass of white wine beside a menu in candlelight" },
        { id: "8421", w: 1350, h: 1800, t: "25.10.2026", alt: "An empty Metro car, light running along the ceiling" },
      ],
    ],
  },
];

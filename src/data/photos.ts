// The photographs page. Each series opens on one frame shown as a wide
// title card (`hero`), followed by rows of frames. A row is laid out so its
// frames share one height and together fill the column, so the order here is
// both the reading order and the layout.
//
// Files live in public/photos as p<id>-<size>.webp: 800 and 1800 px on the
// long edge, plus a 160 px tall thumbnail for the contact sheet. `w` and `h`
// are the pixel size of the 1800 file.
//
// The optional fields are used by the diary in days.ts, where a chapter is a
// place and a stretch of dates rather than a theme.

export type Photo = {
  id: string;
  w: number;
  h: number;
  alt: string;
  /** When the frame was taken, local time, as shown in the viewer. */
  t?: string;
};

export type Series = {
  slug: string;
  title: string;
  hero: Photo;
  rows: Photo[][];
  /** Month and year the chapter starts, "11.25". Stands in for the number. */
  when?: string;
  /** The dates the chapter covers, "26 – 29.11.2025". */
  span?: string;
  /** The camera the chapter was made with. */
  camera?: string;
  /** Where the title card's crop sits in the frame, top to bottom, in percent. */
  heroY?: number;
};

export const series: Series[] = [
  {
    slug: "komorebi",
    title: "komorebi",
    hero: { id: "005", w: 1800, h: 1440, alt: "Low sun under an orange maple, the ground covered in fallen leaves" },
    rows: [
      [
        { id: "008", w: 1350, h: 1800, alt: "Looking up through red and orange maple leaves into the sun" },
        { id: "012", w: 1350, h: 1800, alt: "Yellow ginkgo trees backlit beside a long temple wall" },
        { id: "011", w: 1350, h: 1800, alt: "Maple grove on a mossy slope in afternoon light" },
      ],
      [
        { id: "279", w: 1200, h: 1800, alt: "Sun breaking through a tall bamboo grove" },
        { id: "211", w: 1440, h: 1800, alt: "Sun flare across a single orange leaf" },
        { id: "208", w: 1350, h: 1800, alt: "Yellow flowers catching light in deep shade" },
        { id: "006", w: 1350, h: 1800, alt: "Fallen maple leaves on stone steps between boulders" },
      ],
    ],
  },
  {
    slug: "the-canvas-of-sea-and-sky",
    title: "the canvas of sea and sky",
    hero: { id: "333", w: 1800, h: 1013, alt: "An airliner on approach beneath a veiled sun" },
    rows: [
      [
        { id: "334", w: 1440, h: 1800, alt: "A red paraglider above coastal bluffs and a pale sea" },
        { id: "332", w: 1440, h: 1800, alt: "A paraglider alone in a clear blue sky" },
        { id: "210", w: 1440, h: 1800, alt: "A paraglider over a flowering green headland" },
      ],
      [
        { id: "335", w: 1800, h: 1013, alt: "Silhouettes on a bluff watching a paraglider at sunset" },
      ],
      [
        { id: "399", w: 1800, h: 1350, alt: "Sun setting behind a pier, surf sliding over wet sand" },
        { id: "337", w: 1440, h: 1800, alt: "Sandstone cliff dropping to a wide beach with tiny figures" },
      ],
      [
        { id: "396", w: 1800, h: 1440, alt: "Dusk over a beach town with one bright star" },
        { id: "452", w: 1002, h: 1253, alt: "Sandstone cliffs glowing above a long beach" },
      ],
      [
        { id: "035", w: 1800, h: 1152, alt: "Orange cloud above a line of dark evergreens" },
        { id: "404", w: 1350, h: 1800, alt: "A pier reaching into blue water below sandy bluffs" },
      ],
      [
        { id: "067", w: 1800, h: 1350, alt: "A band of pink cloud over a dark sea" },
        { id: "068", w: 1350, h: 1800, alt: "Dusk over a sea of clouds through an aeroplane window" },
      ],
      [
        { id: "440", w: 1800, h: 1440, alt: "A palm silhouetted against streaked pink cloud" },
        { id: "204", w: 1440, h: 1800, alt: "A lone peak rising above cloud at sunset" },
      ],
    ],
  },
  {
    slug: "zenith",
    title: "zenith",
    hero: { id: "321", w: 1800, h: 1013, alt: "Art deco towers converging overhead" },
    rows: [
      [
        { id: "259", w: 1350, h: 1800, alt: "A bird crossing between glass towers" },
        { id: "390", w: 1440, h: 1800, alt: "White blossoms on twisting branches against blue sky" },
        { id: "033", w: 1440, h: 1800, alt: "Ferris wheel gondolas against a pale blue sky" },
      ],
      [
        { id: "248", w: 1200, h: 1800, alt: "Sun flare off a glass tower above a white steel walkway" },
        { id: "255", w: 1350, h: 1800, alt: "Looking up past shop signs and power lines into a blue sky" },
        { id: "240", w: 1200, h: 1800, alt: "Palm fronds backlit against bright cloud" },
      ],
    ],
  },
  {
    slug: "aozora",
    title: "aozora",
    hero: { id: "078", w: 1800, h: 1193, alt: "Power lines and summer cumulus above a green hillside" },
    rows: [
      [
        { id: "227", w: 1350, h: 1800, alt: "Cumulus clouds stacked over a calm teal sea" },
        { id: "073", w: 806, h: 1440, alt: "A boat's wake under a hazy blue sky" },
        { id: "280", w: 1440, h: 1800, alt: "A wide summer sky over fields and a winding road" },
      ],
      [
        { id: "398", w: 1800, h: 1440, alt: "Bright surf under a high sun and scattered cloud" },
        { id: "441", w: 1440, h: 1800, alt: "Broken cloud layered across a blue sky" },
      ],
      [
        { id: "330", w: 1800, h: 1013, alt: "A gull perched on a white rooftop edge" },
      ],
      [
        { id: "070", w: 1350, h: 1800, alt: "A contrail catching the last light above cloud" },
        { id: "256", w: 1350, h: 1800, alt: "A long city street running toward cranes under a clear sky" },
        { id: "250", w: 1350, h: 1800, alt: "Pedestrians on a curved footbridge below Shinjuku towers" },
        { id: "391", w: 1440, h: 1800, alt: "A blossoming tree between two walls under a clear sky" },
      ],
    ],
  },
  {
    slug: "in-red",
    title: "in red",
    hero: { id: "065", w: 1800, h: 1200, alt: "Walkers inside a tunnel of orange torii gates" },
    rows: [
      [
        { id: "010", w: 1800, h: 1440, alt: "Three people resting on a rock beneath autumn maples" },
        { id: "013", w: 1350, h: 1800, alt: "Red maple canopy over a round red road sign beside a temple wall" },
      ],
      [
        { id: "001", w: 1800, h: 1225, alt: "Kyoto seen across red maples and a pagoda, mountains behind" },
        { id: "299", w: 1440, h: 1800, alt: "A traveller facing a red torii gate standing in shallow water" },
      ],
      [
        { id: "024", w: 1440, h: 1800, alt: "Red maple leaves floating on a dark reflective pond" },
        { id: "186", w: 1440, h: 1800, alt: "Red berries under a dusting of snow" },
        { id: "022", w: 1440, h: 1800, alt: "Red pagoda eaves at night with a crescent moon" },
      ],
      [
        { id: "064", w: 1800, h: 1440, alt: "Small red shrine at the edge of a green pond in mist" },
        { id: "158", w: 1440, h: 1800, alt: "A figure in a narrow alley lit by a red lamp" },
      ],
      [
        { id: "021", w: 1800, h: 1440, alt: "Lit maple garden framed by an open wooden gate" },
        { id: "244", w: 1200, h: 1800, alt: "Red traffic light flaring over a crosswalk at night" },
      ],
    ],
  },
  {
    slug: "structures",
    title: "structures",
    hero: { id: "200", w: 1800, h: 1013, alt: "A concrete bridge curving over surf toward a headland" },
    rows: [
      [
        { id: "344", w: 1350, h: 1800, alt: "Black and white: a spiral ceiling curling around a dark oculus" },
        { id: "346", w: 1350, h: 1800, alt: "Black and white: the same spiral from below, lit from within" },
        { id: "339", w: 1350, h: 1800, alt: "Black and white: square skylights in a curved ceiling" },
      ],
      [
        { id: "217", w: 1193, h: 1800, alt: "Concrete and teak towers at golden hour with a faint moon" },
        { id: "082", w: 1800, h: 1193, alt: "A row of concrete study towers in late sun" },
      ],
      [
        { id: "338", w: 1350, h: 1800, alt: "Glass atrium with stacked walkways and skylights" },
        { id: "340", w: 1350, h: 1800, alt: "Warm concrete stairwell cut by a blade of daylight" },
        { id: "348", w: 1350, h: 1800, alt: "A red bicycle parked beneath sweeping white concrete" },
      ],
      [
        { id: "379", w: 1800, h: 1200, alt: "Stepped concrete forms against a teal sky" },
        { id: "220", w: 1193, h: 1800, alt: "Concrete study towers against a blue evening sky" },
      ],
    ],
  },
  {
    slug: "casting-shadows",
    title: "casting shadows",
    hero: { id: "007", w: 1800, h: 1440, alt: "Black and white: branch shadows on a plaster wall under a tiled roof" },
    rows: [
      [
        { id: "221", w: 1800, h: 1350, alt: "An orange chair and its long shadow on concrete" },
        { id: "262", w: 1350, h: 1800, alt: "A bar of window light across the wall of a small restaurant" },
        { id: "263", w: 1200, h: 1800, alt: "A tea bowl on a windowsill beside a white curtain" },
      ],
      [
        { id: "383", w: 1440, h: 1800, alt: "Two shadows on a sunlit wall above dark stairs" },
        { id: "382", w: 1440, h: 1800, alt: "A hard diagonal shadow across a pink building" },
        { id: "446", w: 1350, h: 1800, alt: "A photographer's shadow on a wall beside pink flowers" },
      ],
      [
        { id: "075", w: 1800, h: 1440, alt: "Yellow evening light along a covered corridor" },
        { id: "265", w: 1800, h: 1200, alt: "Rumpled white bedding in soft window light" },
      ],
    ],
  },
  {
    slug: "small-figures",
    title: "small figures",
    hero: { id: "252", w: 1800, h: 1350, alt: "Silhouetted commuters crossing a bright station entrance" },
    rows: [
      [
        { id: "085", w: 1440, h: 1800, alt: "Red rock canyon opening onto a green valley under thin cloud" },
        { id: "091", w: 1440, h: 1800, alt: "Hikers wading through a narrow slot canyon" },
        { id: "090", w: 1440, h: 1800, alt: "Black and white: hikers dwarfed by sculpted canyon walls" },
      ],
      [
        { id: "084", w: 1205, h: 1800, alt: "Switchback trail below towering red cliffs" },
        { id: "258", w: 1306, h: 1800, alt: "Cyclist on a street lined with ginkgo trees between office towers" },
        { id: "260", w: 1350, h: 1800, alt: "A lone walker heading into low sun between towers" },
      ],
      [
        { id: "074", w: 1800, h: 1440, alt: "A busy crossing seen from above in golden light" },
        { id: "251", w: 1800, h: 1350, alt: "A cyclist and pedestrians at a crossing under towers" },
      ],
    ],
  },
  {
    slug: "nocturne",
    title: "nocturne",
    hero: { id: "201", w: 1800, h: 720, alt: "City streets glowing orange from high above at night" },
    rows: [
      [
        { id: "023", w: 1440, h: 1800, alt: "Lit pagoda above glowing maples with a blue searchlight beam" },
        { id: "017", w: 1440, h: 1800, alt: "Pagoda and temple hall at night under a blue beam" },
        { id: "016", w: 1440, h: 1800, alt: "Two white paper lanterns glowing against dark maples" },
      ],
      [
        { id: "245", w: 1800, h: 1200, alt: "Pedestrians passing a neon-lit karaoke front" },
        { id: "014", w: 1440, h: 1800, alt: "Person with a clear umbrella on a lantern-lit garden path under yellow maples" },
      ],
      [
        { id: "159", w: 1800, h: 1440, alt: "A figure walking into a glowing station concourse" },
        { id: "072", w: 1350, h: 1800, alt: "A full moon over a highway at blue hour" },
      ],
      [
        { id: "069", w: 1800, h: 1440, alt: "A dim room lit by two mushroom lamps" },
        { id: "401", w: 822, h: 1096, alt: "A crescent moon between pink clouds" },
      ],
      [
        { id: "247", w: 1800, h: 1200, alt: "Motion-blurred crowd and lights at a city crossing" },
        { id: "443", w: 1440, h: 1800, alt: "The moon above tree silhouettes at dusk" },
        { id: "448", w: 1350, h: 1800, alt: "A street lamp glowing green through tree branches at night" },
      ],
      [
        { id: "029", w: 1440, h: 1800, alt: "Teal and gold firework trails falling through the dark" },
        { id: "031", w: 1439, h: 1800, alt: "Orange firework burst inside pink smoke" },
        { id: "032", w: 1440, h: 1800, alt: "Two silhouettes watching a purple firework over city lights" },
        { id: "026", w: 1200, h: 1800, alt: "Silhouetted couple beneath a red firework over a lake" },
      ],
    ],
  },
];

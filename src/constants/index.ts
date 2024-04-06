// SELECTORS
export const GAMEFAQ_PLATFORM_LINK_SELECTOR = "#header_more_menu a";
export const CURRENT_LINKED_GROUP_SELECTOR = "#curlinkedgroup";
export const LINKED_GROUP_SELECTOR = "#grouplinks a #linkedgroup";
export const WEBLINKS_SELECTOR = "#weblinksdiv a";
export const TAGS_SELECTOR = "#tagslist li > a:first-child";
export const DELETE_TAGS_SELECTOR = "a[href*=delete_tag]";
export const COLLAGE_SELECTOR = "#collages a"; // Category = Theme, Best Of, Arranger
export const SERIES_SELECTOR = ".series_title a"; // Category = Series
export const GROUP_INFO = "#sidebar_group_info a"; // Category = Developer, Publisher, Designer, Composer, Engine, Feature, Franchise, Author
export const PACK_INFO = ".box.box_pack a"; // Category = Pack
export const COLLECTIONS_SELECTORS = [
  COLLAGE_SELECTOR,
  SERIES_SELECTOR,
  GROUP_INFO,
  PACK_INFO,
];

// LINKED GROUPS
export const PC_LINKED_GROUPS_TITLES: string[] = ["Windows", "Mac", "Linux"];

export const EXCLUDED_LINKED_GROUPS: string[] = [
  "Applications",
  "E-Books",
  "OST",
];

// COLLECTIONS

/** A list of collection ids you don't want to be copied to any linked group */
export const EXCLUDED_COLLECTION_IDS: string[] = [
  "28", // GGn Staff Picks
  "969", // GazelleGames Internals v2
  "45", // GazelleGames 'Exclusives'
  "1112", // Denuvo Removed
  "881", // Denuvo Cracked
  "1035", // Denuvo Uncracked
  "39", // Games For Windows: LIVE
  "1880", // DOSBox
  "4402", // Wine
];

/** A list of collection ids you don't want to be copied to any PC linked group (see PC_LINKED_GROUPS_TITLES) */
export const EXCLUDED_PC_COLLECTION_IDS: string[] = [];

/** A list of collection ids you don't want to be copied to any console linked group */
export const EXCLUDED_CONSOLE_COLLECTION_IDS: string[] = [
  "551", // Native Controller Support
];

// WEBLINKS
export const EXCLUDED_WEBLINKS: string[] = ["Amazon"];

// MAPPING
/**
 * A map which pairs the ids of weblink input fields with the field name we get from the API
 */
export const WEBLINKS_LABEL_URI_MAPPING = {
  gameswebsiteuri: "GamesWebsite",
  wikipediauri: "Wikipedia",
  giantbomburi: "Giantbomb",
  vndburi: "VGMdb",
  howlongtobeaturi: "HowLongToBeat",
  amazonuri: "Amazon",
  gamefaqsuri: "GameFAQs",
  mobygamesuri: "MobyGames",
  itunesuri: "iTunes",
  googleplayuri: "GooglePlay",
  steamuri: "Steam",
  goguri: "GOG",
  humbleuri: "HumbleBundle",
  itchuri: "Itch",
  pcwikiuri: "PCGamingWiki",
  epicgamesuri: "EpicGames",
  psnuri: "PSN",
  nintendouri: "Nintendo",
  nexusmodsuri: "NexusMods",
};

export const GAMEFAQ_PLATFORM_MAPPING = {
  Mac: "Macintosh",
  iOS: "iOS (iPhone/iPad)",
  "Apple Bandai Pippin": "Bandai Pippin",
  "Apple II": "Apple II",
  Android: "Android",
  DOS: "PC",
  Windows: "PC",
  Xbox: "Xbox",
  "Xbox 360": "Xbox 360",
  "Game Boy": "Game Boy",
  "Game Boy Advance": "Game Boy Advance",
  "Game Boy Color": "Game Boy Color",
  NES: "NES",
  "Nintendo 64": "Nintendo 64",
  "Nintendo 3DS": "3DS",
  "New Nintendo 3DS": "3DS",
  "Nintendo DS": "DS",
  "Nintendo GameCube": "GameCube",
  "Pokemon Mini": "Pokemon Mini",
  SNES: "Super Nintendo",
  Switch: "Nintendo Switch",
  "Virtual Boy": "Virtual Boy",
  Wii: "Wii",
  "Wii U": "Wii U",
  "PlayStation 1": "PlayStation",
  "PlayStation 2": "PlayStation 2",
  "PlayStation 3": "PlayStation 3",
  "PlayStation 4": "PlayStation 4",
  "PlayStation Portable": "PSP",
  "PlayStation Vita": "PlayStation Vita",
  Dreamcast: "Dreamcast",
  "Game Gear": null,
  "Master System": "Sega Master System",
  "Mega Drive": "Genesis",
  Pico: "Sega Pico",
  Saturn: "Saturn",
  "SG-1000": "SG-1000",
  "Atari 2600": "Atari 2600",
  "Atari 5200": "Atari 5200",
  "Atari 7800": "Atari 7800",
  "Atari Jaguar": "Jaguar",
  "Atari Lynx": "Lynx",
  "Atari ST": "Atari ST",
  "Amstrad CPC": "Amstrad CPC",
  "Bandai WonderSwan": "WonderSwan",
  "Bandai WonderSwan Color": "WonderSwan Color",
  "Commodore 64": "Commodore 64",
  "Commodore 128": null,
  "Commodore Amiga": "Amiga",
  "Amiga CD32": "Amiga CD32",
  "Commodore Plus-4": null,
  "Commodore VIC-20": "VIC-20",
  "NEC PC-98": "NEC PC98",
  "NEC PC-FX": null,
  "NEC SuperGrafx": null,
  "NEC TurboGrafx-16": "TurboGrafx-16",
  "ZX Spectrum": "Sinclair ZX81/Spectrum",
  MSX: "MSX",
  "MSX 2": "",
  "Game.com": "Game.com",
  Gizmondo: "Gizmondo",
  "V.Smile": null,
  CreatiVision: "CreatiVision",
  "Board Game": null,
  "Card Game": null,
  "Miniature Wargames": null,
  "Pen and Paper RPG": null,
  "3DO": "3D0",
  "Casio Loopy": "Casio Loopy",
  "Casio PV-1000": "Casio PV-1000",
  Colecovision: "Colecovision",
  "Emerson Arcadia 2001": "Arcadia 2001",
  "Entex Adventure Vision": "Adventurevision",
  "Epoch Super Casette Vision": null,
  "Fairchild Channel F": "Channel F",
  "Funtech Super Acan": null,
  "GamePark GP32": "GP32",
  "General Computer Vectrex": "Vectrex",
  "Interactive DVD": null,
  Linux: "Linux",
  "Hartung Game Master": null,
  "Magnavox-Phillips Odyssey": "Odyssey",
  "Mattel Intellivision": "Intellivision",
  "Memotech MTX": null,
  "Miles Gordon Sam Coupe": "",
  "Nokia N-Gage": "N-Gage",
  "Oculus Quest": "Oculus Quest",
  Ouya: "Ouya",
  "Philips Videopac+": null,
  "Philips CD-i": "CD-I",
  "Phone/PDA": "Mobile",
  "RCA Studio II": "RCA Studio II",
  "Sharp X1": "Sharp X1",
  "Sharp X68000": "Sharp X68000",
  "SNK Neo Geo": "SNK Neo Geo",
  "SNK Neo Geo Pocket": "SNK Neo Geo Pocket",
  "Taito Type X": null,
  "Tandy Color Computer": "Tandy Color Computer",
  "Tangerine Oric": "Oric 1/Atmos",
  "Thomson MO5": null,
  "Watara Supervision": "SuperVision",
  "Retro - Other": null,
};

// REGEXES
export const TEXT_INSIDE_PARANTHESIS_REGEX = /\(([^)]+)\)$/;

// MISC
export const GAMEFAQ_URL = "https://gamefaqs.gamespot.com";

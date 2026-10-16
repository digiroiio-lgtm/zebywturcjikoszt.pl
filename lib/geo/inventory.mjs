// Location universe from the UK geo-SEO brief, section 4, kept in the brief's own hierarchy so it can be reviewed line by line.
// Everything here is a CANDIDATE: no entry is a validated concentration of Polish residents, and every postal district is
// "brief-claimed, unverified" until it is checked against an authoritative crosswalk (ONSPD / NSPL).
// `region` and `authority` for English, Welsh and Northern Irish areas are analyst-assigned from standard ONS/ITL1 names and must be
// verified against the ONS lookup before publication. data/geo/uk/locations.json is generated from this file
// (node scripts/geo-build-data.mjs); do not edit the JSON by hand.

/** @typedef {{ name: string, districts?: string[], kind?: string, note?: string }} Area */
/** @typedef {{ group: string, country: string, region: string, authority: string, authorityKind?: string, cityGroup: string, areas: Area[], note?: string }} Block */

const n = (from, to, prefix) => Array.from({ length: to - from + 1 }, (_, i) => `${prefix}${from + i}`);

/** @type {Block[]} */
export const INVENTORY = [
  // A. GREATER LONDON
  { group: "A", country: "england", region: "Greater London", authority: "Ealing", cityGroup: "london", areas: [
    { name: "Ealing Broadway", districts: ["W5"] }, { name: "South Ealing", districts: ["W5"] }, { name: "Northfields", districts: ["W13"] },
    { name: "Acton", districts: ["W3"] }, { name: "Greenford", districts: ["UB6"] }, { name: "Perivale", districts: ["UB6"] }, { name: "Northolt", districts: ["UB5"] }
  ] },
  { group: "A", country: "england", region: "Greater London", authority: "Hammersmith & Fulham", cityGroup: "london", areas: [
    { name: "Hammersmith", districts: ["W6"] }, { name: "Ravenscourt Park", districts: ["W6"] },
    { name: "Polish Social and Cultural Association (POSK), 238–246 King Street, London W6 0RF", kind: "landmark", districts: ["W6"], note: "A Polish cultural landmark. Not a clinic, not a census area; carries no population metric." }
  ] },
  { group: "A", country: "england", region: "Greater London", authority: "Hounslow", cityGroup: "london", areas: [
    { name: "Hounslow Central", districts: ["TW3"] }, { name: "Hounslow West", districts: ["TW4"] }, { name: "Brentford", districts: ["TW8"] }
  ] },
  { group: "A", country: "england", region: "Greater London", authority: "Brent", cityGroup: "london", areas: [
    { name: "Wembley", districts: ["HA0", "HA9"] }, { name: "Willesden", districts: ["NW10"] }
  ] },
  { group: "A", country: "england", region: "Greater London", authority: "Barnet", cityGroup: "london", areas: [{ name: "Hendon", districts: ["NW4"] }] },
  { group: "A", country: "england", region: "Greater London", authority: "Haringey", cityGroup: "london", areas: [{ name: "Tottenham", districts: ["N17"] }] },
  { group: "A", country: "england", region: "Greater London", authority: "Croydon", cityGroup: "london", areas: [{ name: "Croydon Central", districts: ["CR0"] }] },
  { group: "A", country: "england", region: "Greater London", authority: "Merton", cityGroup: "london", areas: [{ name: "Mitcham", districts: ["CR4"] }] },
  { group: "A", country: "england", region: "Greater London", authority: "Hillingdon", cityGroup: "london", areas: [{ name: "Hayes", districts: ["UB3", "UB4"] }] },

  // B. SOUTH AND SOUTH-EAST ENGLAND
  { group: "B", country: "england", region: "South East", authority: "Southampton", cityGroup: "southampton", areas: [
    { name: "Shirley", districts: ["SO15"] }, { name: "Shirley Road", districts: ["SO15"], note: "A road rather than a statistical area." },
    { name: "St Mary's", districts: ["SO14"] }, { name: "Portswood", districts: ["SO17"] }, { name: "Southampton City Centre", districts: ["SO14"] }
  ] },
  { group: "B", country: "england", region: "South East", authority: "Slough", cityGroup: "slough", areas: [{ name: "Slough Central", districts: ["SL1"] }, { name: "Langley", districts: ["SL3"] }] },
  { group: "B", country: "england", region: "East of England", authority: "Luton", cityGroup: "luton", areas: [{ name: "Luton Central", districts: ["LU1"] }, { name: "Bury Park", districts: ["LU4"] }] },
  { group: "B", country: "england", region: "South West", authority: "Bournemouth, Christchurch and Poole", cityGroup: "bcp", areas: [
    { name: "Bournemouth Central", districts: ["BH1", "BH2"] }, { name: "Boscombe", districts: ["BH1", "BH5"] },
    { name: "Christchurch", districts: [], note: "To be researched separately where justified; the brief gives no postal district." },
    { name: "Poole", districts: [], note: "To be researched separately where justified; the brief gives no postal district." }
  ] },
  { group: "B", country: "england", region: "South West", authority: "Bristol", cityGroup: "bristol", areas: [
    { name: "Easton", districts: ["BS5"] }, { name: "Bedminster", districts: ["BS3"] }, { name: "Central Bristol", districts: ["BS1"] }
  ] },
  { group: "B", country: "england", region: "South West", authority: "Somerset", cityGroup: "somerset", authorityKind: "authority-candidate", areas: [] },
  { group: "B", country: "england", region: "South East", authority: "Buckinghamshire", cityGroup: "buckinghamshire", authorityKind: "authority-candidate", areas: [] },
  { group: "B", country: "england", region: "North West", authority: "Cheshire East", cityGroup: "cheshire-east", authorityKind: "authority-candidate", areas: [] },
  { group: "B", country: "england", region: "West Midlands", authority: "Sandwell", cityGroup: "sandwell", authorityKind: "authority-candidate", areas: [] },

  // C. MIDLANDS AND EAST ENGLAND
  { group: "C", country: "england", region: "East Midlands", authority: "West Northamptonshire", cityGroup: "northamptonshire", note: "Current unitary authority; respect it when mapping Northampton postal districts.", areas: [
    { name: "Northampton Town Centre", districts: ["NN1", "NN2"] }, { name: "Abington", districts: ["NN1"] }
  ] },
  { group: "C", country: "england", region: "East Midlands", authority: "North Northamptonshire", cityGroup: "northamptonshire", note: "Current unitary authority; respect it when mapping Corby, Wellingborough and Kettering.", areas: [
    { name: "Corby", districts: ["NN17"] }, { name: "Wellingborough", districts: ["NN8"] }, { name: "Kettering", districts: ["NN16"] }
  ] },
  { group: "C", country: "england", region: "East of England", authority: "Peterborough", cityGroup: "peterborough", areas: [
    { name: "Central Peterborough", districts: ["PE1"] }, { name: "Millfield", districts: ["PE1"] }, { name: "Eastfield", districts: ["PE1"] }, { name: "Fletton", districts: ["PE2"] }
  ] },
  { group: "C", country: "england", region: "East Midlands", authority: "Boston", cityGroup: "boston-lincolnshire", note: "Lincolnshire district; the brief groups it with 'Lincolnshire and Fenland'.", areas: [{ name: "Boston Town Centre", districts: ["PE21"] }] },
  { group: "C", country: "england", region: "East Midlands", authority: "South Holland", cityGroup: "boston-lincolnshire", note: "Lincolnshire district (analyst-assigned; verify).", areas: [{ name: "Spalding", districts: ["PE11"] }] },
  { group: "C", country: "england", region: "East of England", authority: "Fenland", cityGroup: "boston-lincolnshire", note: "Cambridgeshire district, not Lincolnshire (analyst-assigned; verify).", areas: [{ name: "Wisbech", districts: ["PE13"] }] },
  { group: "C", country: "england", region: "East Midlands", authority: "Nottingham", cityGroup: "nottingham", areas: [{ name: "Nottingham City Centre", districts: ["NG1"] }, { name: "Radford", districts: ["NG7"] }] },
  { group: "C", country: "england", region: "East Midlands", authority: "Leicester", cityGroup: "leicester", areas: [{ name: "Leicester City Centre", districts: ["LE1"] }, { name: "Highfields", districts: ["LE2"] }] },
  { group: "C", country: "england", region: "West Midlands", authority: "Coventry", cityGroup: "coventry", areas: [{ name: "Coventry City Centre", districts: ["CV1"] }] },
  { group: "C", country: "england", region: "West Midlands", authority: "Birmingham", cityGroup: "birmingham", areas: [{ name: "Central Birmingham", districts: n(1, 5, "B") }] },

  // D. YORKSHIRE AND NORTHERN ENGLAND
  { group: "D", country: "england", region: "Yorkshire and the Humber", authority: "Kingston upon Hull", cityGroup: "hull", areas: [{ name: "Hull City Centre", districts: ["HU1"] }, { name: "Newington", districts: ["HU3"] }] },
  { group: "D", country: "england", region: "Yorkshire and the Humber", authority: "Leeds", cityGroup: "leeds", areas: [{ name: "Leeds City Centre", districts: ["LS1"] }, { name: "Harehills", districts: ["LS8"] }] },
  { group: "D", country: "england", region: "Yorkshire and the Humber", authority: "Wakefield", cityGroup: "wakefield", areas: [{ name: "Wakefield City Centre", districts: ["WF1"] }] },
  { group: "D", country: "england", region: "Yorkshire and the Humber", authority: "Doncaster", cityGroup: "doncaster", areas: [{ name: "Doncaster City Centre", districts: ["DN1"] }] },
  { group: "D", country: "england", region: "North West", authority: "Manchester", cityGroup: "manchester", areas: [{ name: "Manchester City Centre", districts: ["M1"] }, { name: "Cheetham Hill", districts: ["M8"] }] },
  { group: "D", country: "england", region: "Yorkshire and the Humber", authority: "Bradford", cityGroup: "bradford", areas: [{ name: "Bradford City Centre", districts: ["BD1"] }] },
  { group: "D", country: "england", region: "Yorkshire and the Humber", authority: "Sheffield", cityGroup: "sheffield", areas: [{ name: "Sheffield City Centre", districts: ["S1"] }] },
  { group: "D", country: "england", region: "North West", authority: "Liverpool", cityGroup: "liverpool", areas: [{ name: "Liverpool City Centre", districts: ["L1"] }] },
  { group: "D", country: "england", region: "North East", authority: "Newcastle upon Tyne", cityGroup: "newcastle", areas: [{ name: "Newcastle City Centre", districts: ["NE1"] }] },

  // E. SCOTLAND (Aberdeen first: Scotland's Census 2022 reports Polish ethnic-identity concentrations in several areas)
  { group: "E", country: "scotland", region: "North East Scotland", authority: "Aberdeen City", cityGroup: "aberdeen", note: "The brief gives no postal districts for Aberdeen; none are invented.", areas: [
    "Tillydrone", "Seaton", "Old Aberdeen", "Northfield", "Mastrick North", "Torry", "Ferryhill", "Hilton", "Woodside", "Stockethill", "George Street", "Harbour",
    "Kincorth", "Nigg", "Cove", "Kingswells", "Sheddocksley", "Summerhill", "Dyce", "Bucksburn", "Danestone", "Midstocket", "Rosemount", "Bridge of Don"
  ].map((name) => ({ name, districts: [] })) },
  { group: "E", country: "scotland", region: "Lothian", authority: "City of Edinburgh", cityGroup: "edinburgh", note: "Obtain verified census geography before assigning any population share.", areas: [
    { name: "Edinburgh", districts: [] }, { name: "Leith", districts: [] }, { name: "Sighthill / Gorgie", districts: [] }
  ] },
  { group: "E", country: "scotland", region: "Greater Glasgow", authority: "Glasgow City", cityGroup: "glasgow", note: "Obtain verified census geography before assigning any population share.", areas: [{ name: "Glasgow", districts: [] }] },
  { group: "E", country: "scotland", region: "Tayside", authority: "Dundee City", cityGroup: "dundee", note: "Obtain verified census geography before assigning any population share.", areas: [{ name: "Dundee", districts: [] }] },
  { group: "E", country: "scotland", region: "Tayside", authority: "Perth and Kinross", cityGroup: "perth", note: "Obtain verified census geography before assigning any population share.", areas: [{ name: "Perth", districts: [] }] },
  { group: "E", country: "scotland", region: "Highlands and Islands", authority: "Highland", cityGroup: "inverness", note: "Obtain verified census geography before assigning any population share.", areas: [{ name: "Inverness", districts: [] }] },

  // F. WALES (keep the authority and ward boundaries when mapping postal districts)
  { group: "F", country: "wales", region: "North Wales", authority: "Wrexham", cityGroup: "wrexham", areas: [{ name: "Wrexham", districts: ["LL11", "LL13"] }] },
  { group: "F", country: "wales", region: "North Wales", authority: "Flintshire", cityGroup: "flintshire", areas: [{ name: "Flintshire", districts: [] }] },
  { group: "F", country: "wales", region: "South Wales", authority: "Merthyr Tydfil", cityGroup: "merthyr-tydfil", areas: [{ name: "Merthyr Tydfil", districts: [] }] },
  { group: "F", country: "wales", region: "South Wales", authority: "Newport", cityGroup: "newport", areas: [{ name: "Newport", districts: [] }] },
  { group: "F", country: "wales", region: "South Wales", authority: "Swansea", cityGroup: "swansea", areas: [{ name: "Swansea", districts: [] }] },
  { group: "F", country: "wales", region: "South Wales", authority: "Cardiff", cityGroup: "cardiff", areas: [{ name: "Cardiff", districts: [] }] },
  { group: "F", country: "wales", region: "West Wales", authority: "Carmarthenshire", cityGroup: "carmarthenshire", areas: [{ name: "Carmarthenshire", districts: [] }] },
  { group: "F", country: "wales", region: "West Wales", authority: "Ceredigion", cityGroup: "ceredigion", areas: [{ name: "Ceredigion", districts: [] }] },

  // G. NORTHERN IRELAND (verify that each BT district corresponds to its intended area before publishing)
  { group: "G", country: "northern-ireland", region: "Belfast", authority: "Belfast", cityGroup: "belfast", areas: [{ name: "Belfast", districts: n(1, 15, "BT") }] },
  { group: "G", country: "northern-ireland", region: "Armagh City, Banbridge and Craigavon", authority: "Armagh City, Banbridge and Craigavon", cityGroup: "craigavon", areas: [
    { name: "Craigavon", districts: n(62, 65, "BT") }, { name: "Portadown", districts: [] }
  ] },
  { group: "G", country: "northern-ireland", region: "Mid Ulster", authority: "Mid Ulster", cityGroup: "dungannon", areas: [{ name: "Dungannon", districts: ["BT70", "BT71"] }] },
  { group: "G", country: "northern-ireland", region: "Newry, Mourne and Down", authority: "Newry, Mourne and Down", cityGroup: "newry", areas: [{ name: "Newry", districts: ["BT34", "BT35"] }] },
  { group: "G", country: "northern-ireland", region: "Mid and East Antrim", authority: "Mid and East Antrim", cityGroup: "ballymena", areas: [{ name: "Ballymena", districts: ["BT42", "BT43"] }] },
  { group: "G", country: "northern-ireland", region: "Lisburn and Castlereagh", authority: "Lisburn and Castlereagh", cityGroup: "lisburn", areas: [{ name: "Lisburn", districts: ["BT27", "BT28"] }] },
  { group: "G", country: "northern-ireland", region: "Causeway Coast and Glens", authority: "Causeway Coast and Glens", cityGroup: "coleraine", areas: [{ name: "Coleraine", districts: ["BT51", "BT52"] }] }
];

/** Per-group counts of area records the brief lists (independently counted from the brief). verify-geo.mjs fails if the generated dataset drifts from them. */
export const BRIEF_AREA_COUNTS = {
  A: 7 + 3 + 3 + 2 + 1 + 1 + 1 + 1 + 1, // Ealing 7, H&F 3 (incl. POSK landmark), Hounslow 3, Brent 2, Barnet, Haringey, Croydon, Merton, Hillingdon
  B: 5 + 2 + 2 + 4 + 3, // Southampton 5, Slough 2, Luton 2, BCP 4 (Bournemouth Central, Boscombe, Christchurch, Poole), Bristol 3
  C: 2 + 3 + 4 + 1 + 1 + 1 + 2 + 2 + 1 + 1, // Northampton 2, Corby/Wellingborough/Kettering 3, Peterborough 4, Boston, Spalding, Wisbech, Nottingham 2, Leicester 2, Coventry, Birmingham
  D: 2 + 2 + 1 + 1 + 2 + 1 + 1 + 1 + 1, // Hull 2, Leeds 2, Wakefield, Doncaster, Manchester 2, Bradford, Sheffield, Liverpool, Newcastle
  E: 24 + 3 + 1 + 1 + 1 + 1, // Aberdeen 24, Edinburgh/Leith/Sighthill-Gorgie 3, Glasgow, Dundee, Perth, Inverness
  F: 8, // Wrexham, Flintshire, Merthyr Tydfil, Newport, Swansea, Cardiff, Carmarthenshire, Ceredigion
  G: 8 // Belfast, Craigavon, Portadown, Dungannon, Newry, Ballymena, Lisburn, Coleraine
};
/** Authority-level candidates the brief names without any neighbourhood. */
export const BRIEF_AUTHORITY_CANDIDATES = ["Somerset", "Buckinghamshire", "Cheshire East", "Sandwell"];

export const COUNTRIES = [
  { id: "england", name: "Anglia", nameEn: "England", slug: "anglia" },
  { id: "scotland", name: "Szkocja", nameEn: "Scotland", slug: "szkocja" },
  { id: "wales", name: "Walia", nameEn: "Wales", slug: "walia" },
  { id: "northern-ireland", name: "Irlandia Północna", nameEn: "Northern Ireland", slug: "irlandia-polnocna" }
];

export const slugify = (value) => value
  .normalize("NFKD").replace(/[̀-ͯ]/g, "")
  .toLowerCase().replace(/&/g, " and ").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

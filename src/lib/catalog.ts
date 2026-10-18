export type PlatformId = "netflix" | "prime" | "disney" | "hbo" | "apple" | "youtube";
export type Region = "hollywood" | "bollywood" | "south" | "anime";

export interface Title {
  id: string;
  title: string;
  year: number;
  released: string;
  type: "movie" | "series";
  region: Region;
  language: string;
  genres: string[];
  rating: number;
  popularity: number;
  platforms: PlatformId[];
  director: string;
  cast: string[];
  synopsis: string;
  hue: number;
}

export const PLATFORMS: Record<PlatformId, { name: string; url: string; color: string }> = {
  netflix: { name: "Netflix", url: "https://www.netflix.com", color: "var(--brand-netflix)" },
  prime: { name: "Prime Video", url: "https://www.primevideo.com", color: "var(--brand-prime)" },
  disney: { name: "Disney+", url: "https://www.disneyplus.com", color: "var(--brand-disney)" },
  hbo: { name: "HBO Max", url: "https://www.max.com", color: "var(--brand-hbo)" },
  apple: { name: "Apple TV+", url: "https://tv.apple.com", color: "var(--brand-apple)" },
  youtube: { name: "YouTube Movies", url: "https://www.youtube.com/movies", color: "var(--brand-youtube)" },
};

type Raw = [string, number, string, Title["type"], Region, string, string, number, number, PlatformId[], string, string, string];
// id-less compact rows: title, year, date, type, region, language, genres, rating, popularity, platforms, director, cast, synopsis
const RAW: Raw[] = [
  ["Dune: Part Two", 2024, "2024-03-01", "movie", "hollywood", "English", "Sci-Fi,Adventure", 8.5, 98, ["hbo", "prime", "apple"], "Denis Villeneuve", "Timothée Chalamet,Zendaya,Rebecca Ferguson,Austin Butler", "Paul Atreides unites with the Fremen while on a path of revenge against the conspirators who destroyed his family."],
  ["Oppenheimer", 2023, "2023-07-21", "movie", "hollywood", "English", "Drama,Thriller", 8.3, 95, ["prime", "apple"], "Christopher Nolan", "Cillian Murphy,Emily Blunt,Robert Downey Jr.,Matt Damon", "The story of J. Robert Oppenheimer and the creation of the atomic bomb."],
  ["Interstellar", 2014, "2014-11-07", "movie", "hollywood", "English", "Sci-Fi,Drama", 8.7, 92, ["prime", "apple"], "Christopher Nolan", "Matthew McConaughey,Anne Hathaway,Jessica Chastain", "A team of explorers travel through a wormhole in space to ensure humanity's survival."],
  ["Inception", 2010, "2010-07-16", "movie", "hollywood", "English", "Sci-Fi,Action", 8.8, 90, ["netflix", "hbo"], "Christopher Nolan", "Leonardo DiCaprio,Joseph Gordon-Levitt,Elliot Page", "A thief who steals secrets through dream-sharing is given a chance at redemption."],
  ["The Batman", 2022, "2022-03-04", "movie", "hollywood", "English", "Action,Thriller", 7.8, 88, ["hbo"], "Matt Reeves", "Robert Pattinson,Zoë Kravitz,Paul Dano", "Batman ventures into Gotham's underworld when a sadistic killer leaves behind cryptic clues."],
  ["Mad Max: Fury Road", 2015, "2015-05-15", "movie", "hollywood", "English", "Action,Adventure", 8.1, 80, ["hbo", "prime"], "George Miller", "Tom Hardy,Charlize Theron,Nicholas Hoult", "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler."],
  ["John Wick: Chapter 4", 2023, "2023-03-24", "movie", "hollywood", "English", "Action,Thriller", 7.7, 85, ["prime", "apple"], "Chad Stahelski", "Keanu Reeves,Donnie Yen,Bill Skarsgård", "John Wick uncovers a path to defeating the High Table."],
  ["Spider-Man: Across the Spider-Verse", 2023, "2023-06-02", "movie", "hollywood", "English", "Animation,Action,Sci-Fi", 8.6, 91, ["netflix", "apple"], "Joaquim Dos Santos", "Shameik Moore,Hailee Steinfeld,Oscar Isaac", "Miles Morales catapults across the Multiverse and encounters a team of Spider-People."],
  ["A Quiet Place", 2018, "2018-04-06", "movie", "hollywood", "English", "Horror,Thriller", 7.5, 74, ["prime"], "John Krasinski", "Emily Blunt,John Krasinski,Millicent Simmonds", "A family must live in silence to avoid creatures that hunt by sound."],
  ["Get Out", 2017, "2017-02-24", "movie", "hollywood", "English", "Horror,Thriller", 7.8, 70, ["netflix", "prime"], "Jordan Peele", "Daniel Kaluuya,Allison Williams,Catherine Keener", "A young man uncovers a disturbing secret when he meets his girlfriend's family."],
  ["Hereditary", 2018, "2018-06-08", "movie", "hollywood", "English", "Horror", 7.3, 66, ["prime", "apple"], "Ari Aster", "Toni Collette,Alex Wolff,Milly Shapiro", "A grieving family is haunted by tragic and disturbing occurrences."],
  ["La La Land", 2016, "2016-12-09", "movie", "hollywood", "English", "Romance,Drama", 8.0, 72, ["netflix", "prime"], "Damien Chazelle", "Ryan Gosling,Emma Stone,John Legend", "A jazz pianist and an aspiring actress fall in love in Los Angeles."],
  ["Past Lives", 2023, "2023-06-02", "movie", "hollywood", "English", "Romance,Drama", 7.9, 64, ["prime", "apple"], "Celine Song", "Greta Lee,Teo Yoo,John Magaro", "Two childhood friends are reunited decades later."],
  ["Avatar: The Way of Water", 2022, "2022-12-16", "movie", "hollywood", "English", "Sci-Fi,Adventure", 7.6, 86, ["disney"], "James Cameron", "Sam Worthington,Zoe Saldaña,Sigourney Weaver", "Jake Sully lives with his new family on Pandora until a familiar threat returns."],
  ["Deadpool & Wolverine", 2024, "2024-07-26", "movie", "hollywood", "English", "Action,Comedy", 7.7, 94, ["disney"], "Shawn Levy", "Ryan Reynolds,Hugh Jackman,Emma Corrin", "Deadpool teams up with a reluctant Wolverine to save his universe."],
  ["3 Idiots", 2009, "2009-12-25", "movie", "bollywood", "Hindi", "Comedy,Drama", 8.4, 82, ["netflix", "prime"], "Rajkumar Hirani", "Aamir Khan,R. Madhavan,Sharman Joshi,Kareena Kapoor", "Two friends search for their long-lost college buddy who inspired them to think differently."],
  ["Jawan", 2023, "2023-09-07", "movie", "bollywood", "Hindi", "Action,Thriller", 7.0, 89, ["netflix"], "Atlee", "Shah Rukh Khan,Nayanthara,Vijay Sethupathi", "A man is driven by a personal vendetta to rectify wrongs in society."],
  ["Dangal", 2016, "2016-12-23", "movie", "bollywood", "Hindi", "Drama,Sport", 8.3, 78, ["netflix"], "Nitesh Tiwari", "Aamir Khan,Fatima Sana Shaikh,Sanya Malhotra", "A former wrestler trains his daughters to become world-class wrestlers."],
  ["12th Fail", 2023, "2023-10-27", "movie", "bollywood", "Hindi", "Drama", 8.9, 76, ["disney"], "Vidhu Vinod Chopra", "Vikrant Massey,Medha Shankar", "The true story of an IPS officer who overcame extreme poverty."],
  ["Dilwale Dulhania Le Jayenge", 1995, "1995-10-20", "movie", "bollywood", "Hindi", "Romance,Drama", 8.0, 68, ["prime"], "Aditya Chopra", "Shah Rukh Khan,Kajol,Amrish Puri", "Two young people fall in love on a trip across Europe."],
  ["Stree 2", 2024, "2024-08-15", "movie", "bollywood", "Hindi", "Horror,Comedy", 7.1, 87, ["prime"], "Amar Kaushik", "Rajkummar Rao,Shraddha Kapoor,Pankaj Tripathi", "The town of Chanderi faces a new terrifying entity."],
  ["Tumbbad", 2018, "2018-10-12", "movie", "bollywood", "Hindi", "Horror,Fantasy", 8.2, 71, ["prime"], "Rahi Anil Barve", "Sohum Shah,Jyoti Malshe", "A man's greed leads him to a cursed treasure hidden in a village."],
  ["RRR", 2022, "2022-03-25", "movie", "south", "Telugu", "Action,Drama", 7.8, 93, ["netflix", "disney"], "S. S. Rajamouli", "N. T. Rama Rao Jr.,Ram Charan,Alia Bhatt", "Two revolutionaries fight against the British Raj in 1920s India."],
  ["Baahubali 2: The Conclusion", 2017, "2017-04-28", "movie", "south", "Telugu", "Action,Fantasy", 8.2, 84, ["netflix", "disney"], "S. S. Rajamouli", "Prabhas,Rana Daggubati,Anushka Shetty", "Shiva learns about his heritage and seeks to avenge his father."],
  ["KGF: Chapter 2", 2022, "2022-04-14", "movie", "south", "Kannada", "Action,Thriller", 8.2, 86, ["prime"], "Prashanth Neel", "Yash,Sanjay Dutt,Srinidhi Shetty", "Rocky's bloodied path to rule the Kolar Gold Fields continues."],
  ["Vikram", 2022, "2022-06-03", "movie", "south", "Tamil", "Action,Thriller", 8.3, 79, ["disney"], "Lokesh Kanagaraj", "Kamal Haasan,Vijay Sethupathi,Fahadh Faasil", "A special agent investigates a string of masked murders."],
  ["Kantara", 2022, "2022-09-30", "movie", "south", "Kannada", "Thriller,Fantasy", 8.2, 77, ["prime", "netflix"], "Rishab Shetty", "Rishab Shetty,Sapthami Gowda,Kishore", "A conflict between villagers and a forest officer awakens ancient spirits."],
  ["Pushpa 2: The Rule", 2024, "2024-12-05", "movie", "south", "Telugu", "Action,Drama", 7.3, 96, ["netflix"], "Sukumar", "Allu Arjun,Rashmika Mandanna,Fahadh Faasil", "Pushpa's red sandalwood empire expands as old rivalries resurface."],
  ["Premam", 2015, "2015-05-29", "movie", "south", "Malayalam", "Romance,Comedy", 8.3, 60, ["prime"], "Alphonse Puthren", "Nivin Pauly,Sai Pallavi,Madonna Sebastian", "A man's romantic journey through three stages of life."],
  ["Your Name", 2016, "2016-08-26", "movie", "anime", "Japanese", "Anime,Romance,Fantasy", 8.4, 83, ["prime", "apple"], "Makoto Shinkai", "Ryunosuke Kamiki,Mone Kamishiraishi", "Two strangers find themselves linked in a bizarre way."],
  ["Spirited Away", 2001, "2001-07-20", "movie", "anime", "Japanese", "Anime,Fantasy", 8.6, 81, ["hbo", "netflix"], "Hayao Miyazaki", "Rumi Hiiragi,Miyu Irino", "A girl wanders into a world ruled by gods, witches and spirits."],
  ["Attack on Titan", 2013, "2013-04-07", "series", "anime", "Japanese", "Anime,Action,Fantasy", 9.1, 90, ["netflix", "prime"], "Tetsurō Araki", "Yuki Kaji,Yui Ishikawa,Marina Inoue", "Humanity fights for survival against man-eating giants."],
  ["Jujutsu Kaisen", 2020, "2020-10-03", "series", "anime", "Japanese", "Anime,Action", 8.6, 89, ["netflix"], "Sunghoo Park", "Junya Enoki,Yuichi Nakamura,Asami Seto", "A boy swallows a cursed talisman and joins a school of sorcerers."],
  ["Demon Slayer", 2019, "2019-04-06", "series", "anime", "Japanese", "Anime,Action,Fantasy", 8.6, 88, ["netflix", "prime"], "Haruo Sotozaki", "Natsuki Hanae,Akari Kitō,Hiro Shimono", "A boy becomes a demon slayer after his family is slaughtered."],
  ["Stranger Things", 2016, "2016-07-15", "series", "hollywood", "English", "Sci-Fi,Horror", 8.7, 95, ["netflix"], "The Duffer Brothers", "Millie Bobby Brown,Finn Wolfhard,Winona Ryder", "A group of kids uncover supernatural mysteries in their small town."],
  ["The Last of Us", 2023, "2023-01-15", "series", "hollywood", "English", "Drama,Horror,Adventure", 8.7, 93, ["hbo"], "Craig Mazin", "Pedro Pascal,Bella Ramsey", "A smuggler escorts a teenage girl across a post-pandemic America."],
  ["Breaking Bad", 2008, "2008-01-20", "series", "hollywood", "English", "Drama,Thriller", 9.5, 90, ["netflix"], "Vince Gilligan", "Bryan Cranston,Aaron Paul,Anna Gunn", "A chemistry teacher turns to manufacturing meth to secure his family's future."],
  ["The Boys", 2019, "2019-07-26", "series", "hollywood", "English", "Action,Sci-Fi", 8.7, 91, ["prime"], "Eric Kripke", "Karl Urban,Jack Quaid,Antony Starr", "A group of vigilantes take on corrupt superheroes."],
  ["Severance", 2022, "2022-02-18", "series", "hollywood", "English", "Sci-Fi,Thriller", 8.7, 87, ["apple"], "Ben Stiller", "Adam Scott,Britt Lower,Patricia Arquette", "Office workers surgically divide their work and personal memories."],
  ["House of the Dragon", 2022, "2022-08-21", "series", "hollywood", "English", "Fantasy,Drama", 8.4, 89, ["hbo"], "Ryan Condal", "Paddy Considine,Emma D'Arcy,Matt Smith", "The Targaryen civil war, 200 years before Game of Thrones."],
  ["The Mandalorian", 2019, "2019-11-12", "series", "hollywood", "English", "Sci-Fi,Adventure", 8.6, 84, ["disney"], "Jon Favreau", "Pedro Pascal,Gina Carano,Carl Weathers", "A lone bounty hunter travels the outer reaches of the galaxy."],
  ["Bridgerton", 2020, "2020-12-25", "series", "hollywood", "English", "Romance,Drama", 7.3, 82, ["netflix"], "Chris Van Dusen", "Phoebe Dynevor,Jonathan Bailey,Nicola Coughlan", "The eight Bridgerton siblings look for love in Regency London."],
  ["Sacred Games", 2018, "2018-07-06", "series", "bollywood", "Hindi", "Thriller,Drama", 8.5, 78, ["netflix"], "Vikramaditya Motwane", "Saif Ali Khan,Nawazuddin Siddiqui,Radhika Apte", "A Mumbai cop receives a call from a gangster warning of an attack."],
  ["The Family Man", 2019, "2019-09-20", "series", "bollywood", "Hindi", "Action,Thriller", 8.7, 80, ["prime"], "Raj & DK", "Manoj Bajpayee,Priyamani,Samantha Ruth Prabhu", "A middle-class man secretly works for a national intelligence agency."],
  ["Mirzapur", 2018, "2018-11-16", "series", "bollywood", "Hindi", "Action,Thriller", 8.4, 83, ["prime"], "Gurmmeet Singh", "Pankaj Tripathi,Ali Fazal,Divyenndu", "A shocking incident sets off a chain of events in the lawless city of Mirzapur."],
  ["Ted Lasso", 2020, "2020-08-14", "series", "hollywood", "English", "Comedy,Drama", 8.8, 75, ["apple"], "Bill Lawrence", "Jason Sudeikis,Hannah Waddingham,Brett Goldstein", "An American football coach takes over an English soccer team."],
];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const CATALOG: Title[] = RAW.map((r, i) => ({
  id: slug(r[0]),
  title: r[0], year: r[1], released: r[2], type: r[3], region: r[4], language: r[5],
  genres: r[6].split(","), rating: r[7], popularity: r[8], platforms: r[9],
  director: r[10], cast: r[11].split(","), synopsis: r[12],
  hue: (i * 47) % 360,
}));

export const getTitle = (id: string) => CATALOG.find((t) => t.id === id);

const by = (k: "popularity" | "rating" | "year") => (a: Title, b: Title) =>
  k === "year" ? b.released.localeCompare(a.released) : b[k] - a[k];
const has = (g: string) => (t: Title) => t.genres.includes(g);
const movies = CATALOG.filter((t) => t.type === "movie");

export const SECTIONS: { title: string; items: Title[] }[] = [
  { title: "Trending Now", items: [...CATALOG].sort(by("popularity")).slice(0, 12) },
  { title: "Popular Movies", items: [...movies].sort(by("popularity")).slice(0, 12) },
  { title: "Latest Releases", items: [...CATALOG].sort(by("year")).slice(0, 12) },
  { title: "Top Rated", items: [...CATALOG].sort(by("rating")).slice(0, 12) },
  { title: "Hollywood Movies", items: movies.filter((t) => t.region === "hollywood") },
  { title: "Bollywood Movies", items: movies.filter((t) => t.region === "bollywood") },
  { title: "South Indian Movies", items: movies.filter((t) => t.region === "south") },
  { title: "Action & Adventure", items: CATALOG.filter((t) => has("Action")(t) || has("Adventure")(t)) },
  { title: "Sci-Fi & Fantasy", items: CATALOG.filter((t) => has("Sci-Fi")(t) || has("Fantasy")(t)) },
  { title: "Horror & Thriller", items: CATALOG.filter((t) => has("Horror")(t) || has("Thriller")(t)) },
  { title: "Romantic Movies", items: CATALOG.filter(has("Romance")) },
  { title: "Popular Web Series", items: CATALOG.filter((t) => t.type === "series" && t.region !== "anime").sort(by("popularity")) },
  { title: "Anime Collection", items: CATALOG.filter((t) => t.region === "anime") },
];

export const CATEGORIES: Record<string, { label: string; filter: (t: Title) => boolean }> = {
  movies: { label: "Movies", filter: (t) => t.type === "movie" },
  series: { label: "Web Series", filter: (t) => t.type === "series" && t.region !== "anime" },
  hollywood: { label: "Hollywood", filter: (t) => t.region === "hollywood" },
  bollywood: { label: "Bollywood", filter: (t) => t.region === "bollywood" },
  south: { label: "South Indian", filter: (t) => t.region === "south" },
  anime: { label: "Anime", filter: (t) => t.region === "anime" },
  tv: { label: "TV Shows", filter: (t) => t.type === "series" },
};

export const ALL_GENRES = [...new Set(CATALOG.flatMap((t) => t.genres))].sort();
export const ALL_LANGUAGES = [...new Set(CATALOG.map((t) => t.language))].sort();

export interface Filters {
  q?: string | undefined; genre?: string | undefined; year?: string | undefined; language?: string | undefined;
  minRating?: number | undefined; platform?: string | undefined; sort?: "newest" | "popular" | "rated" | undefined;
}

export function filterTitles(f: Filters, base: Title[] = CATALOG): Title[] {
  const q = f.q?.trim().toLowerCase();
  const out = base.filter((t) =>
    (!q || t.title.toLowerCase().includes(q)) &&
    (!f.genre || t.genres.includes(f.genre)) &&
    (!f.year || (f.year === "older" ? t.year < 2010 : String(Math.floor(t.year / 10) * 10) === f.year)) &&
    (!f.language || t.language === f.language) &&
    (!f.minRating || t.rating >= f.minRating) &&
    (!f.platform || t.platforms.includes(f.platform as PlatformId)),
  );
  const s = f.sort ?? "popular";
  return out.sort(by(s === "newest" ? "year" : s === "rated" ? "rating" : "popularity"));
}

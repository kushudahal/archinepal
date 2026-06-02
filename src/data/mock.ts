import { Article, Event, Firm, Job, Professional, Project } from "@/types";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/projects", label: "Projects" },
  { href: "/profile/aashna-shrestha", label: "Professionals" },
  { href: "/firms", label: "Firms" },
  { href: "/students", label: "Students" },
  { href: "/jobs", label: "Jobs" },
  { href: "/articles", label: "Articles" },
  { href: "/events", label: "Events" }
];

export const projects: Project[] = [
  {
    id: "terraced-house",
    title: "Terraced House Above Patan",
    firm: "Studio Sthapatya",
    architect: "Aashna Shrestha",
    location: "Lalitpur",
    category: "Residential",
    tags: ["Courtyard", "Brick", "Passive Cooling"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85"
    ],
    likes: 4280,
    views: 38200,
    year: "2026",
    area: "4,800 sq ft",
    software: ["Revit", "Rhino", "Enscape"],
    materials: ["Exposed brick", "Sal timber", "Lime plaster"],
    constructionType: "Reinforced concrete frame with crafted masonry skin",
    story:
      "A compact family home shaped around filtered light, a raised garden court, and the tactile memory of old Patan brickwork."
  },
  {
    id: "pokhara-learning-hub",
    title: "Pokhara Learning Hub",
    firm: "Nirman Collaborative",
    architect: "Prabal Gurung",
    location: "Pokhara",
    category: "Commercial",
    tags: ["Learning", "Timber", "Lake View"],
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85"
    ],
    likes: 3190,
    views: 24400,
    year: "2025",
    area: "18,000 sq ft",
    software: ["ArchiCAD", "Twinmotion", "Grasshopper"],
    materials: ["Glulam", "Rammed earth", "Low-e glass"],
    constructionType: "Hybrid timber and concrete",
    story:
      "A flexible education campus with shaded terraces, public stairs, and classrooms that breathe with the lake breeze."
  },
  {
    id: "thamel-micro-hotel",
    title: "Thamel Micro Hotel",
    firm: "Basecamp Design Lab",
    architect: "Nima Lama",
    location: "Kathmandu",
    category: "Interior",
    tags: ["Hospitality", "Adaptive Reuse", "Compact"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=85"
    ],
    likes: 2760,
    views: 19800,
    year: "2026",
    area: "9,200 sq ft",
    software: ["SketchUp", "V-Ray", "AutoCAD"],
    materials: ["Terrazzo", "Bamboo ply", "Blackened steel"],
    constructionType: "Adaptive reuse interiors",
    story:
      "A tight urban hotel that uses precise joinery, built-in storage, and warm light to make compact rooms feel generous."
  },
  {
    id: "bagmati-resilience-park",
    title: "Bagmati Resilience Park",
    firm: "Urban Root Nepal",
    architect: "Ishaan Maharjan",
    location: "Kathmandu",
    category: "Landscape",
    tags: ["Floodable Park", "Public Realm", "Ecology"],
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85"
    ],
    likes: 5010,
    views: 51600,
    year: "2025",
    area: "14 acres",
    software: ["QGIS", "Civil 3D", "Lumion"],
    materials: ["Native grasses", "Stone gabions", "Permeable paving"],
    constructionType: "Blue-green infrastructure",
    story:
      "A civic landscape designed as social infrastructure, flood storage, and a living classroom for Kathmandu's river future."
  },
  {
    id: "bhaktapur-bim-clinic",
    title: "Bhaktapur BIM Clinic",
    firm: "Parametric Nepal",
    architect: "Saugat Bista",
    location: "Bhaktapur",
    category: "BIM",
    tags: ["Digital Twin", "Healthcare", "Coordination"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
    ],
    likes: 2210,
    views: 17100,
    year: "2026",
    area: "32,000 sq ft",
    software: ["Revit", "Navisworks", "Dynamo"],
    materials: ["Concrete", "Aluminum fins", "Acoustic panels"],
    constructionType: "Coordinated MEP healthcare shell",
    story:
      "A BIM-first healthcare prototype that reduces site conflicts while giving clinics a calmer, clearer patient journey."
  },
  {
    id: "newari-courtyard-visualization",
    title: "Newari Courtyard Visualization",
    firm: "Render Ghar",
    architect: "Mira Bajracharya",
    location: "Patan",
    category: "Visualization",
    tags: ["CGI", "Heritage", "Atmosphere"],
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=85"
    ],
    likes: 3980,
    views: 28900,
    year: "2025",
    area: "Concept",
    software: ["Blender", "Corona", "Photoshop"],
    materials: ["Timber lattice", "Clay tile", "Aged brick"],
    constructionType: "Visualization study",
    story:
      "A cinematic visualization study translating Newari courtyard atmospheres into a contemporary conservation proposal."
  }
];

export const professionals: Professional[] = [
  {
    id: "aashna-shrestha",
    name: "Aashna Shrestha",
    role: "Architect",
    location: "Lalitpur",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=85",
    cover: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=85",
    bio: "Designs calm, climate-aware homes that bring traditional Nepali material intelligence into contemporary living.",
    specialties: ["Residential", "Adaptive reuse", "Passive design"],
    skills: ["Revit", "Rhino", "Enscape", "Detailing"],
    followers: 12800,
    following: 420
  },
  {
    id: "prabal-gurung",
    name: "Prabal Gurung",
    role: "Civil Engineer",
    location: "Pokhara",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85",
    cover: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85",
    bio: "Structural consultant focused on resilient mid-rise buildings and careful construction sequencing.",
    specialties: ["Structural", "Seismic", "Site coordination"],
    skills: ["ETABS", "SAFE", "Civil 3D", "Revit"],
    followers: 9300,
    following: 360
  },
  {
    id: "mira-bajracharya",
    name: "Mira Bajracharya",
    role: "BIM Specialist",
    location: "Bhaktapur",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85",
    cover: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
    bio: "Builds digital delivery workflows for firms moving from CAD documentation to coordinated BIM practice.",
    specialties: ["BIM", "Digital twins", "Visualization"],
    skills: ["Revit", "Dynamo", "Navisworks", "Blender"],
    followers: 15700,
    following: 510
  }
];

export const firms: Firm[] = [
  {
    id: "studio-sthapatya",
    name: "Studio Sthapatya",
    location: "Lalitpur",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85",
    banner: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=85",
    specialties: ["Architecture", "Interiors", "Conservation"],
    size: "18-30",
    hiring: true,
    about: "A design studio balancing craft, climate, and contemporary urban life across Nepal."
  },
  {
    id: "nirman-collaborative",
    name: "Nirman Collaborative",
    location: "Pokhara",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
    banner: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    specialties: ["Commercial", "Structural", "Campus planning"],
    size: "31-50",
    hiring: false,
    about: "A multidisciplinary practice delivering civic, educational, and hospitality projects."
  },
  {
    id: "parametric-nepal",
    name: "Parametric Nepal",
    location: "Kathmandu",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=85",
    banner: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    specialties: ["BIM", "Computational design", "MEP coordination"],
    size: "11-17",
    hiring: true,
    about: "A technical design office helping Nepali firms deliver coordinated BIM projects."
  }
];

export const articles: Article[] = [
  {
    id: "future-of-newari-urbanism",
    title: "The Future of Newari Urbanism Is Not Nostalgia",
    topic: "Nepali architecture",
    author: "Srijana Karki",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    readTime: "7 min read",
    excerpt: "How courtyard logic, density, and craft can guide the next generation of Kathmandu housing."
  },
  {
    id: "bim-small-firms",
    title: "BIM Workflows for Small Nepali Firms",
    topic: "BIM",
    author: "Mira Bajracharya",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    readTime: "5 min read",
    excerpt: "A practical path from 2D drafting to coordinated models without overwhelming lean teams."
  },
  {
    id: "sponge-city-kathmandu",
    title: "Can Kathmandu Become a Sponge City?",
    topic: "Urban development",
    author: "Rabin Thapa",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    readTime: "9 min read",
    excerpt: "Design ideas for water-sensitive streets, river edges, and public spaces in the valley."
  }
];

export const events: Event[] = [
  {
    id: "bim-bootcamp",
    title: "BIM Bootcamp Kathmandu",
    type: "Workshop",
    date: "Jun 18, 2026",
    location: "Pulchowk Campus",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85",
    speakers: ["Mira Bajracharya", "Saugat Bista"]
  },
  {
    id: "architecture-walk",
    title: "Patan Architecture Walk",
    type: "Architecture walk",
    date: "Jul 02, 2026",
    location: "Patan Durbar Square",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=85",
    speakers: ["Aashna Shrestha"]
  },
  {
    id: "student-thesis-night",
    title: "Student Thesis Night",
    type: "Competition",
    date: "Jul 28, 2026",
    location: "Kathmandu",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
    speakers: ["Pulchowk Architecture Society"]
  }
];

export const jobs: Job[] = [
  { id: "site-engineer", title: "Site Engineer", company: "Nirman Collaborative", location: "Pokhara", level: "Mid level", type: "Full time", salary: "NPR 70k-95k" },
  { id: "bim-designer", title: "BIM Designer", company: "Parametric Nepal", location: "Kathmandu", level: "Junior", type: "Full time", salary: "NPR 55k-80k" },
  { id: "architect", title: "Architect", company: "Studio Sthapatya", location: "Lalitpur", level: "Senior", type: "Full time", salary: "NPR 95k-140k" },
  { id: "draftsman", title: "Draftsman", company: "Basecamp Design Lab", location: "Kathmandu", level: "Entry", type: "Contract", salary: "NPR 35k-50k" },
  { id: "structural-engineer", title: "Structural Engineer", company: "Nirman Collaborative", location: "Pokhara", level: "Senior", type: "Full time", salary: "NPR 120k-160k" },
  { id: "interior-designer", title: "Interior Designer", company: "Studio Sthapatya", location: "Lalitpur", level: "Mid level", type: "Full time", salary: "NPR 65k-95k" }
];

export const categories = ["Residential", "Commercial", "Interior", "Landscape", "Structural", "Urban Design", "BIM", "Visualization"];

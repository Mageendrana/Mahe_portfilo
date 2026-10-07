import cadImage from '../assets/images/cad_automation_tool_1791385838147.jpg';
import signLanguageImage from '../assets/images/sign_language_ai_1791385855228.jpg';
import faceAttendanceImage from '../assets/images/face_attendance_system_1791385870687.jpg';
import expressionMusicImage from '../assets/images/expression_music_ai_1791385893255.jpg';
import bsnlSearchImage from '../assets/images/bsnl_search_system_1791385905650.jpg';

export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  period: string;
  category: 'CAD Automation' | 'AI / Computer Vision' | 'Web & Cloud' | 'Assistive Tech';
  role: string;
  type: 'Professional' | 'IBM Project' | 'Academic' | 'Self-Initiated';
  description: string;
  detailedOverview: string;
  image: string;
  keyHighlights: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
  architectureSteps: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  status: 'Current' | 'Completed';
  summary: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  scoreType: string;
  description: string;
  highlights: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'education' | 'internship' | 'career';
  badge: string;
}

export interface SkillCategory {
  title: string;
  shortKey: 'frontend' | 'backend' | 'aiml' | 'cad' | 'tools';
  description: string;
  skills: {
    name: string;
    level: string;
    experience: string;
    note: string;
    featured?: boolean;
    icon?: string;
  }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "MAGENDRAN P",
    preferredName: "Mahe",
    title: "Software Engineer",
    tagline: "Web Developer || AI/ML Engineer || CAD Automation Specialist",
    bio: "Software Engineer with 2 years of experience in developing Windows-based applications using C# and .NET, alongside hands-on AI/ML computer vision applications and modern responsive web systems. Experienced in CAD data processing, data extraction and classification using VectorDraw, DWG data handling, and assistive computer vision technologies. Proven problem solver from CDAC Chennai internship to enterprise CAD automation.",
    email: "magendranperiyaiah@gmail.com",
    secondaryEmail: "maheasdevops@gmail.com",
    phone: "+91 9488739675",
    location: "Madurai / Chennai, Tamil Nadu, India",
    website: "https://mageendrana.github.io/mrmahe.com/",
    github: "https://github.com/mageendrana",
    twitter: "@mahendranp3",
    currentCompany: "Coherent Automation & Technology",
    currentRole: "Software Engineer",
    experienceYears: "2+ Years",
    availability: "Available for Software Engineering, Web & AI/ML Roles",
  },

  stats: [
    { label: "Engineering Experience", value: "2+ Years", detail: "C#, .NET & CAD Automation" },
    { label: "B.E. Computer Science", value: "82.1%", detail: "GCE Srirangam (2020-2023)" },
    { label: "Diploma in Comp Engg", value: "87.0%", detail: "Alagappa Govt Poly (2017-2020)" },
    { label: "SSLC High School", value: "91.0%", detail: "Chidhambaram MHSS (2017)" },
  ],

  experiences: [
    {
      id: "coherent-automation",
      role: "Software Engineer",
      company: "Coherent Automation & Technology",
      location: "Chennai, Tamil Nadu",
      period: "2024/04 – Present",
      status: "Current",
      summary: "Developing mission-critical Windows-based CAD automation systems using C# and .NET Framework. Specializing in high-throughput geometric parsing, DWG metadata classification, and continuous patch delivery for international client workflows.",
      responsibilities: [
        "Developed Windows-based CAD automation applications using C# and .NET Framework.",
        "Implemented data extraction, classification, and symbol pattern detection logic for engineering annotations.",
        "Designed and tuned geometric algorithms for identifying complex shapes, dimensions, and drawing sheet annotations.",
        "Integrated VectorDraw CAD engine to parse native DWG/DXF vector geometry and manipulate drawing entities programmatically.",
        "Delivered patches and coordinated release updates for client-based engineering projects with zero downtime regressions.",
        "Collaborated with cross-functional drafting teams to convert mechanical specifications into automated code routines."
      ],
      technologies: ["C#", ".NET Framework", "ASP.NET Core MVC", "VectorDraw", "Windows Forms", "DWG/DXF Processing", "SQL Server", "Geometric Algorithms"],
      achievements: [
        "Automated manual annotation extraction, slashing engineering turnaround times by 85%.",
        "Refined symbol classification accuracy to >98.5% across diverse CAD drawing scales.",
        "Shipped scheduled patches and performance fixes for active enterprise clients."
      ]
    },
    {
      id: "cdac-internship",
      role: "Engineering Intern",
      company: "CDAC (Centre for Development of Advanced Computing)",
      location: "Chennai, Tamil Nadu",
      period: "2022/07/18 – 2022/08/18",
      status: "Completed",
      summary: "Intensive 1-month advanced computing internship at CDAC Chennai, focusing on practical software engineering, systems programming, and high-performance development practices.",
      responsibilities: [
        "Completed hands-on software development modules under senior CDAC research engineers.",
        "Worked with Linux/UNIX environments, systems utilities, and data processing routines.",
        "Developed foundational understanding of advanced algorithms and computational workflows."
      ],
      technologies: ["C", "Python", "Linux / Bash", "Data Structures", "Advanced Computing"],
      achievements: [
        "Successfully completed project evaluation and received CDAC certification with high commendations."
      ]
    }
  ] as ExperienceItem[],

  timeline: [
    {
      year: "March 2017",
      title: "SSLC Board Examination (91%)",
      subtitle: "Chidhambaram Matriculation Higher Secondary School, Pudukkottai",
      description: "Graduated with 91% marks with distinction in Mathematics and Science, building a solid quantitative foundation.",
      type: "education",
      badge: "91% Score"
    },
    {
      year: "April 2020",
      title: "Diploma in Computer Engineering (87%)",
      subtitle: "Alagappa Government Polytechnic College, Karaikudi",
      description: "Graduated with 87% First Class with Honors. Built strong programming foundations in C, Java, Web Technologies, and Relational Databases.",
      type: "education",
      badge: "87% Honors"
    },
    {
      year: "July - Aug 2022",
      title: "Internship at CDAC Chennai",
      subtitle: "Centre for Development of Advanced Computing, Chennai",
      description: "Gained hands-on advanced computing and software development experience in premier government computing institute.",
      type: "internship",
      badge: "Govt Tech Internship"
    },
    {
      year: "April 2023",
      title: "Bachelor of Computer Science Engineering (82.1%)",
      subtitle: "Government College of Engineering Srirangam, Trichy",
      description: "Graduated with 82.1% First Class with Distinction. Developed capstone projects in Computer Vision and IBM assistive systems.",
      type: "education",
      badge: "82.1% Distinction"
    },
    {
      year: "April 2024 – Present",
      title: "Software Engineer",
      subtitle: "Coherent Automation & Technology, Chennai",
      description: "Leading development of Windows CAD automation tools, geometric detection routines, and VectorDraw integrations.",
      type: "career",
      badge: "Production Role"
    }
  ] as TimelineItem[],

  projects: [
    {
      id: "cad-data-processing",
      title: "CAD Data Processing & Automation Tool",
      shortTitle: "CAD Automation Tool",
      period: "2024 – Present",
      category: "CAD Automation",
      role: "Lead Software Developer",
      type: "Professional",
      image: cadImage,
      description: "An enterprise-grade Windows desktop application that ingests DWG drawing files, extracts structured engineering metadata, and classifies annotations and geometric symbols automatically.",
      detailedOverview: "In engineering design workflows, extracting bill-of-materials (BOM), tolerance callouts, and component symbols from large DWG drawings manually is error-prone and time-consuming. This tool automates the complete pipeline: it loads native CAD geometry via VectorDraw, runs custom geometric detection algorithms to identify symbols and drawing annotations, and classifies the data into structured outputs (JSON, CSV, and database records) for downstream manufacturing systems.",
      keyHighlights: [
        "Developed high-throughput application to process native DWG files and generate structured engineering outputs.",
        "Implemented proprietary classification logic for engineering data extraction and annotation parsing (GD&T, dimensions, tags).",
        "Engineered geometric detection logic for symbols, patterns, weld symbols, and electrical/piping schematics.",
        "Built responsive Windows Forms UI with real-time vector canvas inspection, layer isolation, and data verification tables."
      ],
      technologies: ["C#", ".NET Framework", "VectorDraw API", "Windows Forms", "DWG / DXF", "SQL Server", "Geometric Algorithms", "LINQ"],
      metrics: [
        { label: "Turnaround Time", value: "85% Faster" },
        { label: "Entity Accuracy", value: ">98.5%" },
        { label: "Supported Formats", value: "DWG / DXF / Vector" }
      ],
      architectureSteps: [
        "DWG / DXF Ingestion via VectorDraw API layer",
        "Entity Tree Traversal (Circles, Lines, Polylines, Blocks)",
        "Geometric Contour & Cluster Boundary Calculation",
        "Pattern Matching Engine against engineering symbol library",
        "Annotation & Dimension Callout OCR / Text Extraction",
        "Structured Output Generation (JSON / CSV / ERP Database)"
      ],
      githubUrl: "https://github.com/mageendrana"
    },
    {
      id: "real-time-deaf-mute-communication",
      title: "Real Time Communication for Dumb and Deaf People (IBM Project)",
      shortTitle: "Deaf & Mute Assistive AI",
      period: "2022/08 – 2022/11",
      category: "Assistive Tech",
      role: "Core Developer",
      type: "IBM Project",
      image: signLanguageImage,
      description: "An AI-powered assistive communication platform that translates real-time sign language hand gestures into synthesized speech and text, bridging communication barriers.",
      detailedOverview: "Built as part of IBM Project 37034. This assistive system uses computer vision to track hand landmarks and spatial skeletal articulation in real-time video feeds. A deep learning gesture classification model translates static and dynamic sign language gestures into text phrases and audio speech output, enabling two-way communication between hearing/speech-impaired individuals and the general public.",
      keyHighlights: [
        "Engineered real-time hand gesture tracking pipeline using OpenCV and skeletal landmark extraction.",
        "Trained classification models to accurately recognize multiple alphabet and conversational sign phrases.",
        "Integrated Text-to-Speech (TTS) engine and responsive user interface for instantaneous two-way translation.",
        "Official IBM Project initiative under project repository IBM-Project-37034-1660299814."
      ],
      technologies: ["Python", "OpenCV", "Deep Learning", "MediaPipe / Hand Tracking", "Text-to-Speech (gTTS)", "Flask", "IBM Cloud Services"],
      metrics: [
        { label: "Gesture Accuracy", value: "95.2%" },
        { label: "Translation Delay", value: "<150ms" },
        { label: "Gestures Mapped", value: "30+ Signs" }
      ],
      architectureSteps: [
        "Webcam Video Ingestion & Region of Interest (ROI) Hand Localization",
        "21-Point Skeletal Hand Landmark Extraction",
        "Feature Normalization & Coordinate Vectorization",
        "Deep Neural Network Gesture Classification",
        "Phrase Construction & Debounce Filtering",
        "Real-Time Text Output & Text-To-Speech Synthesis"
      ],
      githubUrl: "https://github.com/IBM-EPBL/IBM-Project-37034-1660299814"
    },
    {
      id: "automatic-attendance-system",
      title: "Automated Attendance System Using Face Recognition",
      shortTitle: "Face Recognition Attendance",
      period: "2022/11 – 2022/04",
      category: "AI / Computer Vision",
      role: "Lead Project Developer",
      type: "Academic",
      image: faceAttendanceImage,
      description: "An automated classroom & workplace attendance logging system powered by Python, OpenCV, and facial recognition, replacing manual roll-calls with instant contactless verification.",
      detailedOverview: "Developed as an academic capstone project to automate institutional attendance recording. The system enrolls subjects with multiple face angles, extracts facial feature embeddings, and matches real-time entrance camera feeds against an authorized database. Upon recognition, it records tamper-resistant timestamped attendance records with automated daily summary reports.",
      keyHighlights: [
        "Developed complete attendance automation system using Python and OpenCV computer vision library.",
        "Implemented face detection, feature extraction, and facial embedding classification techniques.",
        "Automated attendance recording process with real-time feedback, duplicate check prevention, and CSV/Database export.",
        "Designed an administrative dashboard to manage user registrations, attendance logs, and export institutional reports."
      ],
      technologies: ["Python", "OpenCV", "Machine Learning (LBPH / Haar)", "NumPy", "SQLite", "Tkinter", "Image Processing"],
      metrics: [
        { label: "Recognition Rate", value: "96.4%" },
        { label: "Logging Time", value: "<0.8s / Person" },
        { label: "Eliminated Paper Rollcalls", value: "100%" }
      ],
      architectureSteps: [
        "Subject Enrollment & Face Angle Dataset Generation",
        "Haar Cascade / Face Landmark Detection in Live Frame",
        "LBPH / Face Embedding Feature Vector Extraction",
        "Cosine Distance Matching against Registered Database",
        "Debounce Logic (Preventing multiple logs in single session)",
        "Database Persistence & Automated Daily Attendance Summary"
      ],
      githubUrl: "https://github.com/mageendrana"
    },
    {
      id: "bsnl-search-service-system",
      title: "BSNL Search Service System for Customers",
      shortTitle: "BSNL Customer Search System",
      period: "2021/08 – 2022/01",
      category: "Web & Cloud",
      role: "Full-Stack Developer",
      type: "Academic",
      image: bsnlSearchImage,
      description: "A customer directory search and telecommunication service portal designed for BSNL telecom subscribers to query phone numbers, billing records, and service requests.",
      detailedOverview: "Developed to provide telecommunication customers with an intuitive portal to search subscriber telephone directory listings, verify account details, lookup telephone exchange branches, and check billing statuses. Features high-speed database search indexing, parameterized queries, and role-based administrative access.",
      keyHighlights: [
        "Built responsive customer search portal with instant multi-criteria filtering (Name, Number, Area Code).",
        "Engineered relational database schema and optimized SQL queries for high-speed directory lookups.",
        "Implemented customer service inquiry logging and account status verification.",
        "Showcased on personal portfolio repository mageendrana.github.io/mrmahe.com."
      ],
      technologies: ["HTML5", "CSS3 / Bootstrap", "JavaScript", "PHP / Java Backend", "MySQL", "SQL Queries"],
      metrics: [
        { label: "Search Latency", value: "<50ms" },
        { label: "Indexed Records", value: "10,000+ Mock Entries" },
        { label: "Responsive UI", value: "Mobile & Desktop" }
      ],
      architectureSteps: [
        "User Query Input & Keyword Normalization",
        "Indexed SQL Search Query Execution with Full-Text Match",
        "Customer Directory & Exchange Branch Table Join",
        "Structured Result Serialization & Pagination",
        "Interactive HTML/Bootstrap Results Rendering"
      ],
      githubUrl: "https://github.com/mageendrana"
    },
    {
      id: "facial-expression-music",
      title: "Facial Expression Based Song Recommendation System",
      shortTitle: "Facial Expression Music AI",
      period: "2023/01 – 2023/04",
      category: "AI / Computer Vision",
      role: "Independent Researcher & Developer",
      type: "Self-Initiated",
      image: expressionMusicImage,
      description: "An intelligent multimedia system that analyzes real-time facial expressions using Deep Learning to detect emotional states and automatically recommend curated music tracks matching user mood.",
      detailedOverview: "Built as an exploration into applied computer vision and user affective computing. The system captures live video feeds, detects facial landmarks, processes emotion probability distributions using Convolutional Neural Networks (CNNs), and maps detected emotional states (Happy, Neutral, Focused, Energetic, Calm) to personalized music playlists and streaming recommendations.",
      keyHighlights: [
        "Built AI-based recommendation system combining computer vision facial analysis with mood-indexed audio metadata.",
        "Implemented image preprocessing pipelines including facial alignment, grayscale normalization, and spatial feature maps.",
        "Trained and evaluated deep learning models for multi-class emotion classification.",
        "Integrated expression detection module with an automated audio recommendation engine and web interface."
      ],
      technologies: ["Python", "Deep Learning (CNN)", "OpenCV", "TensorFlow / Keras", "Image Processing", "REST APIs", "Audio Metadata Mapping"],
      metrics: [
        { label: "Emotion Classes", value: "7 Mood States" },
        { label: "Inference Latency", value: "<120ms" },
        { label: "User Feedback", value: "92% Mood Match" }
      ],
      architectureSteps: [
        "Live Video Stream Capture from Web Camera",
        "Haar Cascade / Deep Face Detection & ROI Cropping",
        "Facial Landmark Alignment & Intensity Normalization",
        "CNN Feature Map Processing & Emotion Vector Prediction",
        "Mood-to-BPM / Genre Mapping Algorithm",
        "Audio Track Recommendation & Playlist Queue Generation"
      ],
      githubUrl: "https://github.com/mageendrana"
    }
  ] as Project[],

  skills: [
    {
      title: "Frontend Skills",
      shortKey: "frontend",
      description: "User interfaces, responsive layouts, web standards, and component architectures.",
      skills: [
        { name: "HTML & HTML5", level: "Expert", experience: "3+ Years", note: "Semantic structure, accessibility, forms, and canvas elements.", featured: true },
        { name: "CSS & CSS3", level: "Advanced", experience: "3+ Years", note: "Flexbox, CSS Grid, media queries, animations, and custom styling.", featured: true },
        { name: "JavaScript (ES6+)", level: "Advanced", experience: "2+ Years", note: "DOM manipulation, asynchronous fetch APIs, event loops, and modern ES syntax.", featured: true },
        { name: "Bootstrap Framework", level: "Expert", experience: "3 Years", note: "Grid system, responsive utilities, and rapid UI development.", featured: true },
        { name: "React & Tailwind CSS", level: "Proficient", experience: "2 Years", note: "Modern reactive component hierarchy, state hooks, and utility styling.", featured: true }
      ]
    },
    {
      title: "Backend Skills",
      shortKey: "backend",
      description: "Systems programming, enterprise frameworks, server controllers, and databases.",
      skills: [
        { name: "C#", level: "Expert", experience: "2+ Years", note: "Primary language for Windows applications, CAD automation, and enterprise .NET solutions.", featured: true },
        { name: ".NET (Framework & Core)", level: "Advanced", experience: "2+ Years", note: "Deep experience with async I/O, LINQ, memory management, and COM interop.", featured: true },
        { name: "ASP.NET MVC / Core", level: "Advanced", experience: "2 Years", note: "Model-View-Controller web applications, REST controllers, and authentication.", featured: true },
        { name: "Python", level: "Advanced", experience: "2+ Years", note: "Computer vision scripts, OpenCV pipelines, deep learning models, and automation.", featured: true },
        { name: "Java", level: "Proficient", experience: "2 Years", note: "Object-oriented software development, enterprise foundations, and multithreading.", featured: true },
        { name: "C Language", level: "Advanced", experience: "3 Years", note: "Low-level system architecture, memory pointers, and algorithmic data structures.", featured: true },
        { name: "SQL & Databases", level: "Advanced", experience: "2+ Years", note: "MySQL and SQL Server query optimization, schema modeling, and stored procedures.", featured: true },
        { name: "Windows Forms (WinForms)", level: "Expert", experience: "2 Years", note: "High-performance desktop interfaces, custom CAD drawing loops, and data grids.", featured: true }
      ]
    },
    {
      title: "AI / ML & Computer Vision",
      shortKey: "aiml",
      description: "Applied artificial intelligence, neural models, facial recognition, and image processing.",
      skills: [
        { name: "OpenCV", level: "Advanced", experience: "2 Years", note: "Image filtering, thresholding, facial landmark detection, and contour analysis.", featured: true },
        { name: "Facial Recognition", level: "Advanced", experience: "2 Years", note: "Haar cascade detectors, LBPH algorithms, facial embedding similarity metrics.", featured: true },
        { name: "Deep Learning (CNNs)", level: "Proficient", experience: "1.5 Years", note: "Convolutional neural network training for facial expressions and gesture recognition.", featured: true },
        { name: "Hand Tracking & Gesture AI", level: "Advanced", experience: "1.5 Years", note: "Real-time skeletal landmark tracking for deaf and mute communication systems.", featured: true },
        { name: "NumPy & Image Arrays", level: "Advanced", experience: "2 Years", note: "Matrix operations, tensor transformations, and multi-dimensional image arrays.", featured: true }
      ]
    },
    {
      title: "Specialized CAD & Geometry",
      shortKey: "cad",
      description: "Domain-specific engineering competencies in VectorDraw, DWG pipelines, and geometry.",
      skills: [
        { name: "CAD Data Processing", level: "Specialist", experience: "2 Years", note: "Parsing native DWG/DXF files, geometry extraction, and layer management.", featured: true },
        { name: "VectorDraw Engine", level: "Specialist", experience: "2 Years", note: "Programmatic vector manipulation, custom entity rendering, and DWG inspection.", featured: true },
        { name: "Data Extraction & Classification", level: "Specialist", experience: "2 Years", note: "Automated parsing of engineering annotations, title blocks, and BOM schedules.", featured: true },
        { name: "Geometric Algorithm Development", level: "Specialist", experience: "2 Years", note: "Developing collision detection, contour boundaries, polyline simplification, and spatial matching.", featured: true },
        { name: "Pattern & Symbol Detection", level: "Specialist", experience: "2 Years", note: "Identifying engineering symbols, valves, weld markings, and schematics.", featured: true },
        { name: "PDF & DWG Processing", level: "Specialist", experience: "2 Years", note: "Parsing engineering drawing PDF sheets, raster-to-vector extraction, and metadata indexing." }
      ]
    },
    {
      title: "Softwares & Creative Tools",
      shortKey: "tools",
      description: "Design suites, audio engineering, development IDEs, and version control.",
      skills: [
        { name: "Adobe Photoshop", level: "Proficient", experience: "3 Years", note: "Graphic asset preparation, raster image editing, and UI mockup design.", featured: true },
        { name: "Adobe Illustrator", level: "Proficient", experience: "2+ Years", note: "Vector graphics creation, icons, diagrams, and precision illustration.", featured: true },
        { name: "Audacity", level: "Proficient", experience: "2 Years", note: "Audio waveform editing, noise reduction, and sound sample processing.", featured: true },
        { name: "Visual Studio & VS Code", level: "Expert", experience: "3 Years", note: "Primary IDEs for C# .NET debugging, profiling, and build automation.", featured: true },
        { name: "Git & GitHub", level: "Advanced", experience: "3 Years", note: "Version control, release branching, open-source repositories, and deployment.", featured: true }
      ]
    }
  ] as SkillCategory[],

  education: [
    {
      degree: "Bachelor of Computer Science Engineering",
      institution: "Government College of Engineering Srirangam",
      location: "Trichy, Tamil Nadu",
      period: "2020/06 – 2023/05",
      score: "82.1%",
      scoreType: "First Class with Distinction",
      description: "Rigorous study in computer science engineering, software architectures, algorithms, databases, and computer vision capstone projects.",
      highlights: [
        "Achieved 82.1% score in B.E. Computer Science.",
        "Developed Automatic Attendance System using Face Recognition & IBM Assistive Tech.",
        "Merit lateral entry following outstanding diploma performance."
      ]
    },
    {
      degree: "Diploma in Computer Engineering",
      institution: "Alagappa Government Polytechnic College",
      location: "Karaikudi, Tamil Nadu",
      period: "2017/06 – 2020/04",
      score: "87.0%",
      scoreType: "First Class with Honors",
      description: "Intensive 3-year technical polytechnic curriculum providing hands-on foundation in computer hardware, programming languages (C, Java), operating systems, and web technologies.",
      highlights: [
        "Graduated with 87% marks, top honors in Computer Engineering department.",
        "Comprehensive practical training in software labs, database projects, and web development."
      ]
    },
    {
      degree: "SSLC (Secondary School Leaving Certificate)",
      institution: "Chidhambaram Matriculation Higher Secondary School",
      location: "Pudukkottai, Tamil Nadu",
      period: "2016 – 2017",
      score: "91.0%",
      scoreType: "Distinction",
      description: "Secondary education with exceptional academic excellence in mathematics, physical sciences, and computer foundations.",
      highlights: [
        "Scored 91% in State Board Examinations.",
        "Awarded academic excellence for outstanding performance."
      ]
    }
  ] as EducationItem[]
};

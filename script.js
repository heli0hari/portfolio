// ---- SAFARI VIEWPORT HEIGHT FIX ----
function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);


// ===== INTRO IMAGE PRELOADER (ADD THIS AT THE TOP) =====
document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("intro-overlay");
    const loader = document.getElementById("loader");
    const loaderBar = document.getElementById("loader-bar");
    const loaderText = document.getElementById("loader-text");
    const introChildren = intro.querySelectorAll("h1, p, button");

    // Hide intro content initially
    introChildren.forEach(el => el.style.opacity = 0);

    // Collect ALL image sources
    const imageSources = new Set();

    // 1. Images already in DOM
    document.querySelectorAll("img").forEach(img => {
        if (img.src) imageSources.add(img.src);
    });

    // 2. Images from projects data
    if (typeof projects !== "undefined") {
        projects.forEach(project => {
            if (project.image) imageSources.add(project.image);
            if (project.imageDesktop) imageSources.add(project.imageDesktop);
            if (project.imageMobile) imageSources.add(project.imageMobile);

            project.details?.content?.forEach(item => {
                if (item.type === "image" && item.value?.src) {
                    imageSources.add(item.value.src);
                }
            });
        });
    }

    const images = Array.from(imageSources);
    let loaded = 0;

    function updateLoader() {
        loaded++;
        const percent = Math.round((loaded / images.length) * 100);
        loaderBar.style.width = `${percent}%`;
        loaderText.textContent = `Loading assets ${percent}%`;

        if (loaded === images.length) {
            setTimeout(() => {
                loader.classList.add("is-hidden");

                introChildren.forEach((el, i) => {
                    el.style.opacity = 1;
                    el.style.animationDelay = `${i * 0.15}s`;
                });
            }, 400);
        }
    }

    images.forEach(src => {
        const img = new Image();
        img.onload = updateLoader;
        img.onerror = updateLoader;
        img.src = src;
    });
});
// ===== END INTRO IMAGE PRELOADER =====

const projects = [
    {
        id: "dub-transit",
        title: "Dublin Public Transport App",
        category: "User Experience Design",
        description: "A real-time transit application that simplifies navigating Dublin’s transport network through intuitive route discovery, live bus tracking, service alerts, integrated weather insights, and an AI-powered journey assistant.",
        image: "images/dubtransit/dubscreen.png",
        year: "2025",
        tags: ["UX Design", "Visual Communication", "Mobile App Design", "InteractionDesign", "AI-Driven Interfaces"],
        details: {
            content: [
                { type: 'image', value: { src: 'images/dubtransit/dubtitlescreen.jpg', alt: 'Title card showing "transport network" over a visualization of interconnected bubbles.' } },

                { type: 'paragraph', value: "DubTransit is a mobile application built to unify Dublin’s fragmented public transport information into one clear, minimal, and elegant experience." },
                { type: 'paragraph', value: "The app combines:" },
                {
                    type: 'list', value: [
                        `<span class="icon-wrapper">
                    <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                 </span>
                 <span><strong>Route Search & Stop Lookup</strong><br> Intuitive navigation across the network.</span>`,

                        `<span class="icon-wrapper">
                    <svg viewBox="0 0 24 24"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
                 </span>
                 <span><strong>Live Network Map</strong><br> Real-time visuals with simulated tracking.</span>`,

                        `<span class="icon-wrapper">
                    <svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                 </span>
                 <span><strong>Service Alerts</strong><br> Live updates for events, delays, and accidents.</span>`,

                        `<span class="icon-wrapper">
                   <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 12l-6.91 3.74L12 22l-3.09-6.26L2 12l6.91-3.74z"></path></svg>
                 </span>
                 <span><strong>AI Journey Planning</strong><br> Smart assistance powered by Gemini.</span>`,

                        `<span class="icon-wrapper">
                    <svg viewBox="0 0 24 24"><path d="M12 2v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="M20 12h2"></path><path d="m19.07 4.93-1.41 1.41"></path><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"></path><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"></path></svg>
                 </span>
                 <span><strong>Weather-Aware Guidance</strong><br> Travel advice based on live forecast.</span>`
                    ]
                },
                { type: 'heading', value: 'Problem & Opportunity' },
                { type: 'subheading', value: "Dublin’s transport experience is often fragmented:" },
                {
                    type: 'list', value: ["-Outdated interfaces and inconsistent behaviour",
                        "-Live location accuracy issues",
                        "-Limited route discovery",
                        "-No contextual travel info (weather, events, delays)"]
                },
                { type: 'subheading', value: 'User Research Findings' },
                {
                    type: 'list', value: ["-Commuters want quick and simple route lookup (bus numbers, origins/destinations).",
                        "-People check real-time bus status frequently.",
                        "-Dublin residents rely on Google Maps, but hate its delay unpredictability.",
                        "-Users want alerts before problems happen.",
                        "-Weather affects travel significantly"]
                },
                { type: 'image', value: { src: 'images/dubtransit/dublinstpatrick.jpg', alt: "Traffic control during St Patrick's day" } },
                { type: 'subheading', value: "Opportunity" },
                { type: 'paragraph', value: "Create a single, friendly, modern app that integrates routing, AI guidance, alerts, weather, and live tracking together." },
                { type: 'heading', value: 'Design Process & UX Approach' },
                { type: 'subheading', value: "User Requirements" },
                { type: 'paragraph', value: "Through informal interviews with students, workers, and migrants in Dublin, I identified key priorities:" },
                {
                    type: 'lined-list', value: ["“Just show me where the bus is.”",
                        "“I don’t want to figure out inbound/outbound.”",
                        "“I just want a clean app that works.”",
                        "“Weather screws up my commute, tell me beforehand.”"]
                },
                { type: 'paragraph', value: "These insights shaped the core flows." },
                { type: 'subheading', value: "Information Architecture & Key Screens" },
                { type: 'image', value: { src: 'images/dubtransit/dubmockup.jpg', alt: "Mockup screens of the app" } },
                { type: 'paragraph', value: "1. Routes Directory" },
                { type: 'paragraph', value: "A minimal search-first interface that lets users quickly find routes by number or name." },
                {
                    type: 'box-list', value: ["Clear typography",
                        "Line-colour coding",
                        "Simple forward/backward direction labels (“A → B”, “B → A”)"]
                },
                { type: 'paragraph', value: "2. Live Map & Tracking" },
                { type: 'paragraph', value: "A full-screen map visualizing:" },
                {
                    type: 'box-list', value: ["Bus stop markers",
                        "Route polylines",
                        "Live (or simulated) bus positions",
                        "Smooth marker animation for realism"]
                },
                { type: 'paragraph', value: "3. Service Alerts" },
                { type: 'paragraph', value: "Supports categories:" },
                {
                    type: 'box-list', value: ["GENERAL",
                        "EVENT",
                        "ACCIDENT",
                        "WEATHER"]
                },
                { type: 'paragraph', value: "4. AI Journey Planner" },
                { type: 'paragraph', value: "An interface where users type the current location and destination location. The AI responds with:" },
                {
                    type: 'box-list', value: ["Multi-modal journey",
                        "Clear step-by-step navigation",
                        "Estimated travel time",
                        "Weather at departure and arrival",
                        "Notes about delays or events"]
                },
                { type: 'paragraph', value: "5. Empty States & Loading Screens" },
                { type: 'paragraph', value: "Designed intentionally to reduce anxiety and create trust:" },
                {
                    type: 'box-list', value: ["Encouraging microcopy",
                        "Soft colour palette",
                        "Clean visuals"]
                },
                { type: 'heading', value: 'System Architecture' },
                {
                    type: 'architecture', value: [
                        // Row 1: Top Level
                        { text: "<strong>Mobile App</strong><br>DubTransit (React Native)", highlight: true },

                        // Row 2: Parallel Branches (3 Columns)
                        [
                            // Column 1: GPS / Crowdsourcing Flow
                            [
                                "<strong>User Location</strong><br>GPS (With Consent)",
                                "<strong>Crowd Data Formatter</strong><br>Anonymizer",
                                "<strong>Crowdsourced DB</strong><br>Bus Position Database",
                                "<strong>Data Smoothing</strong><br>Interpolation & Kalman Filter"
                            ],
                            // Column 2: Route / Data Flow
                            [
                                "<strong>User Query</strong><br>'Bus 15', 'UCD'",
                                "<strong>Firestore Routes</strong><br>GTFS Static Data",
                                "<strong>GTFS-Realtime Feed</strong><br>Official Vehicle Positions",
                                "<strong>Data Fusion Engine</strong><br>Merging Crowd + Official Data"
                            ],
                            // Column 3: AI / Weather Flow
                            [
                                "<strong>Origin / Destination</strong><br>Metadata extraction",
                                "<strong>Gemini AI Processor</strong><br>Journey Reasoning",
                                "<strong>Weather API</strong><br>Open-Meteo (Current & Forecast)"
                            ]
                        ],

                        // Row 3: Merging Logic
                        [
                            // Merging Col 1 & 2
                            ["<strong>Live Bus Position API</strong><br>Unified Source"],
                            // Merging Logic
                            ["<strong>Map Renderer</strong><br>Polyline + Smooth Animation"]
                        ],

                        // Row 4: Final Output
                        { text: "<strong>AI Journey Planner Output</strong><br>ETA + Weather + Steps", highlight: true }
                    ]
                },
                { type: 'heading', value: 'Visual Design Language' },
                { type: 'paragraph', value: "I chose a dark, modern UI with a yellow similar to the Dublin bus color (#E3CD00) as the primary accent." },
                { type: 'image', value: { src: 'images/dubtransit/dubcolor.jpg', alt: "Colorscheme for the app" } },
                { type: 'subheading', value: "Reasons:" },
                {
                    type: 'list', value: ["High visibility",
                        "Works great on OLED screens",
                        "Creates strong brand identity"]
                },
                { type: 'heading', value: 'Prototyping & Iteration' },
                { type: 'paragraph', value: "I iterated through several cycles:" },
                {
                    type: 'list', value: [`<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Redesigned direction labels from Inbound/Outbound → A → B / B → A</span>`,
                        `<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Rebuilt the map for readability and smooth marker animation</span>`,
                        `<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Optimised the AI planner’s information density (steps, ETA, weather)</span>`,
                        `<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Refined empty states and loading behaviours to reduce user stress</span>`,
                        `<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Enhanced the weather integration after feedback (“show arrival weather too”)</span>`]
                },
                { type: 'subheading', value: 'AI-Assisted Prototyping Process' },
                { type: 'paragraph', value: "This prototype heavily used AI tools during iteration:" },
                {
                    type: 'list', value: ["Google AI Studio — initial drafts of features & logic",
                        "DeepSeek — refining data structures, simulation logic, and route handling",
                        "ChatGPT — final refinements, debugging, API integration, UX adjustments",]
                },
                { type: 'image', value: { src: 'images/dubtransit/dubaiuses.jpg', alt: "Usage of Google AI Studio for the development" } },
                { type: 'paragraph', value: "AI helped speed up prototyping, letting me focus on design and experience rather than spending too much time on development." },
                { type: 'heading', value: 'Live Prototype' },
                { type: 'paragraph', value: "To make Dub.Transit accessible directly from the browser, I created a web-based preview of the app. This allows the viewers to interact with the interface without installing the Android app." },
                { type: 'mobile-demo', value: 'https://dublintransporttracker.netlify.app' },
                { type: 'box-list', value: ['You can also <a href="https://dublintransporttracker.netlify.app" target="_blank" rel="noopener noreferrer" class="underline hover:text-[#DDA853]">open the app in a new tab</a> to explore it fully.'] },
                { type: 'paragraph', value: "The current version preserves the overall UX, typography, and component layout so viewers can understand the design system." },
                { type: 'heading', value: 'Advanced Features' },
                {
                    type: 'subheading', value: `<span class="icon-wrapper">
                    <svg viewBox="0 0 24 24"><path d="M12 2v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="M20 12h2"></path><path d="m19.07 4.93-1.41 1.41"></path><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"></path><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"></path></svg>
                 </span>
                 <span>Weather Integration</span>`},
                { type: 'paragraph', value: "Using Open-Meteo, the app fetches: Current temperature, Feels-like, Rain probability, Wind, Weather at arrival time, for journey planning This allows the AI to adjust trip suggestions (e.g., “Expect rain when you arrive at St. Stephen’s Green”)." },
                { type: 'image', value: { src: 'images/dubtransit/dubweather.jpg', alt: "Screen showing weather details at the current location and destination location" } },
                {
                    type: 'subheading', value: `<span class="icon-wrapper">
                   <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 12l-6.91 3.74L12 22l-3.09-6.26L2 12l6.91-3.74z"></path></svg>
                 </span>
                 <span>Gemini AI Journey Assistant</span>`},
                { type: 'paragraph', value: "A central highlight of the project." },
                { type: 'paragraph', value: "The assistant: Reads user’s start + destination, Checks possible transport modes, Considers weather conditions, Provides a human-readable plan, Gives suggestions (“Leave 10 minutes early, traffic is heavy near Drumcondra”)." },
                { type: 'paragraph', value: "Gemini acts as the smart layer on top of the transit data." },
                { type: 'image', value: { src: 'images/dubtransit/dubaiapp.jpg', alt: "Screen showing navigation details and steps" } },
                { type: 'heading', value: 'Crowdsourced Real-Time Tracking (Future Feature)' },
                { type: 'paragraph', value: "A key innovation planned for DubTransit is a community-powered real-time bus tracking system, designed to overcome the limitations of existing transport data sources in Dublin." },

                { type: 'subheading', value: 'Why Crowdsourcing?' },
                { type: 'paragraph', value: "GTFS-Realtime (GTFS-R) feeds are:" },
                {
                    type: 'box-list', value: ["often inconsistent or delayed",
                        "missing direction accuracy",
                        "expensive or restricted for developers",
                        "unreliable for smaller-scale apps",
                        "out of scope for a prototype project"]
                },
                { type: 'paragraph', value: "Although GTFS-Realtime is a standard, its accuracy in Dublin varies, and buses frequently jump, freeze, or move in the wrong direction, which is exactly what I experienced while testing." },
                { type: 'paragraph', value: "Crowdsourcing solves this by decentralizing the live tracking system, similar to how Waze collects real-world traffic data from its drivers." },
                { type: 'subheading', value: 'How the Crowdsourced System Works?' },
                { type: 'paragraph', value: "With user consent, the app would:" },
                {
                    type: 'list', value: [`<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Detect when a passenger is inside a bus (based on movement patterns + manual confirmation).</span>`,
                        `<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Upload minimal, anonymous data such as:</span>`,]
                },
                {
                    type: 'box-list', value: ["GPS location",
                        "Route number",
                        "Timestamp"]
                },
                {
                    type: 'list', value: [`<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Combine data from multiple passengers on the same route.</span>`,
                        `<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Smooth and interpolate positions on the backend to produce a highly accurate, real-time view.</span>`,]
                },
                { type: 'subheading', value: 'Privacy-Preserving Design' },
                {
                    type: 'lined-list', value: ["No personal identity stored",
                        "No background tracking unless explicitly enabled",
                        "Data expires and is deleted automatically after a few minutes",
                        "Users opt-in on a per-trip basis"]
                },
                { type: 'heading', value: 'Limitations & Technical Challenges' },
                { type: 'paragraph', value: "Crowdsourcing isn’t magic, it introduces a new set of challenges:" },
                {
                    type: 'list', value: [`<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Requires a critical mass of active users</span>`,]
                },
                { type: 'paragraph', value: "--(early versions may have sparse tracking)" },
                {
                    type: 'list', value: [`<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Data quality varies</span>`,]
                },
                { type: 'paragraph', value: "--(e.g., inaccurate GPS, people on the wrong bus)" },
                {
                    type: 'list', value: [`<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Requires server-side smoothing</span>`,]
                },
                { type: 'paragraph', value: "--(Kalman filtering, interpolation, direction correction)" },
                {
                    type: 'list', value: [`<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Detecting whether a user is genuinely on a bus</span>`,]
                },
                { type: 'paragraph', value: "--(signal patterns, speed, or manual confirmation)" },
                {
                    type: 'list', value: [`<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>User outreach is essential</span>`,]
                },
                { type: 'paragraph', value: "--The quality of tracking depends directly on the number of participants." },
                { type: 'paragraph', value: "I present these limitations openly as part of the project’s honest, real-world constraints." },
                { type: 'heading', value: 'Prototype Status & Future Improvements' },
                { type: 'subheading', value: 'The current version of DubTransit is a functional prototype, with:' },
                {
                    type: 'box-list', value: ["fully working AI-powered journey planner (Gemini API)",
                        "Weather-aware routing using Open-Meteo",
                        "Working route search, stop lookup, and route shapes",
                        "Simulated live buses moving along real route geometry",
                        "Cross-platform mobile UI built in React Native"
                    ]
                },
                { type: 'subheading', value: 'What’s next?' },
                { type: 'paragraph', value: "Here’s the roadmap for turning this into a full production app:" },
                {
                    type: 'roadmap', value: [
                        {
                            title: "Short-Term Goals",
                            items: [
                                "<strong>Crowdsourced GPS</strong><br>Backend Setup (User Opt-in)",
                                "<strong>Push Notifications</strong><br>Delays & ETA Alerts",
                                "<strong>Real GTFS-R</strong><br>Integration with Fallback",
                                "<strong>Offline Caching</strong><br>For poor network areas",
                                "<strong>Improved Onboarding</strong><br>User education flows",
                                "<strong>Smarter AI</strong><br>Journey Tuning & Context"
                            ]
                        },
                        {
                            title: "Long-Term Goals",
                            items: [
                                "<strong>Real-Time Multimodal</strong><br>Bus + Luas + DART Unified",
                                "<strong>Predictive Congestion</strong><br>Historical Traffic Models",
                                "<strong>ML Delay Prediction</strong><br>Using Crowdsourced Data",
                                "<strong>WearOS / Apple Watch</strong><br>Companion Experience",
                                "<strong>Agency Partnerships</strong><br>Official Data Access",
                                "<strong>Scale Infrastructure</strong><br>For City-Wide Adoption"
                            ]
                        }
                    ]
                },
                { type: 'heading', value: 'Final Thoughts' },
                { type: 'paragraph', value: "Dub.Transit represents more than a transit app, it’s a vision for a more efficient, accessible, and human-centered mobility experience in Dublin. This project brought together UX design, visual storytelling, mobile engineering, geospatial logic, AI integration, and systems thinking into one unified product." },
                { type: 'paragraph', value: "The process taught me that designing for transit is ultimately designing for people: their routines, their anxieties, their unpredictability, and their need for clarity in moments of stress. By blending thoughtful design with emerging technologies like Gemini AI and future crowdsourced real-time data, Dub.Transit aims to make everyday commuting smoother, smarter, and more equitable." },
                { type: 'quote', value: "“A developed country is not a place where the poor have cars. It's where the rich use public transportation.”", author: "Gustavo Petro (Former Mayor of Bogotá, Colombia)" },
            ]
        }
    },
    {
        id: "city-beneaththesurface",
        title: "City, Beneath the Surface",
        category: "Data Visualization",
        description: "An interactive data visualization and public installation that reveals the invisible labor sustaining cities by transforming public sentiment into dynamic visual form.",
        image: "images/City/City_Main.jpg",
        year: "2025",
        tags: ["Information Design", "UX Design", "Data Visualization", "Public Installation", "Interactive Design"],
        details: {
            content: [
                { type: 'image', value: { src: 'images/City/City_Title.jpg', alt: 'Title card showing "City, Beneath the Surface" over a visualization of interconnected bubbles.' } },
                { type: 'quote', value: "“No work is insignificant. All labor that uplifts humanity has dignity and importance and should be undertaken with painstaking excellence.”", author: "Martin Luther King Jr." },
                { type: 'heading', value: 'Project Overview' },
                { type: 'paragraph', value: "City, Beneath the Surface is a data-driven interactive installation that reframes how we perceive care-based labor in cities. It visualizes the hidden hierarchies of essential workers — bus drivers, waste collectors, maintenance crews, and others — as dynamic bubble networks, transforming public sentiment and contextual data into living, responsive visuals.  \n\nBy situating the installation in everyday public spaces (bus stops, train stations), the project brings recognition to often unseen labor, sparking reflection on the value of those who sustain urban life." },
                { type: 'heading', value: 'Context & Motivation' },
                {
                    type: 'list', value: ["Growing up in India, I observed cultural stigma toward manual and public-facing labor, often framed as “low-status” work.",
                        "In contrast, while studying in Dublin, I noticed greater respect and infrastructural support for these workers, yet still a lack of emotional recognition.",
                        "This project became both a personal reconciliation and a design intervention, aiming to shift public narratives by making invisible labor visible"]
                },
                { type: 'image', value: { src: 'images/City/City_Personal.jpg', alt: "Photograph of a street in India with visible waste, illustrating the project's personal motivation." } },
                { type: 'quote', value: "“YOU WILL END UP PICKING TRASH, IF YOU DON'T STUDY WELL”", author: "A Random Teacher from My School" },
                { type: 'heading', value: 'Problem Statement' },
                { type: 'paragraph', value: "Despite being essential, care-based workers remain socially undervalued. Public frustration with systemic failures is often misdirected toward visible figures like drivers or cleaners, reinforcing stigma and invisibility" },
                { type: 'heading', value: 'Research Question' },
                { type: 'paragraph', value: "How might contextual data visualization be used to reframe public narratives surrounding care-based labor?" },
                { type: 'image', value: { src: 'images/City/City_Ran.jpg', alt: "A person interacting with the 'City, Beneath the Surface' installation on a large public screen." } },
                { type: 'heading', value: 'Objectives' },
                {
                    type: 'list', value: ["Expose the hidden tiers of labor that sustain the city.",
                        "Collect and visualize sentiment data around urban workers.",
                        "Build a responsive installation that shifts based on public interaction.",
                        "Challenge stigma by connecting emotions, data, and design."]
                },
                { type: 'heading', value: 'Design Concept' },
                { type: 'image', value: { src: 'images/City/City_Diag.jpg', alt: "Diagram illustrating the project's design concept: data input leads to interactive visualization and an AR layer." } },
                {
                    type: 'list', value: ["Dynamic Bubbles: Each sector of urban labor (waste, water, transport, construction, electrical, sanitation, emergency, etc.) is represented as a parent bubble. Roles and sub-roles emerge around it, creating a living hierarchy of workers.",
                        "Network Visualization: The installation shows how different sectors connect and interdepend to keep the city functioning, emphasizing systemic collaboration rather than isolated roles.",
                        "Public Interaction: Users can tap or click bubbles to reveal details about roles, responsibilities, and worker counts within each sector.",
                        "Augmented Reality Layer: In the mobile app, the AR view links the virtual system to real-world objects. For example, pointing at a bus, trash can, or streetlight reveals the associated bubble, its sector, and data about the number of workers behind it.",
                        "Atmosphere: Idle animations and floating motion give the system a “living” quality, symbolizing the ongoing, often unnoticed work beneath the city."]
                },
                { type: 'heading', value: 'Theoretical Frameworks' },
                { type: 'list', value: ["Everyday Life and Cultural Theory (Ben Highmore) → Centers ordinary, undervalued labor as culturally significant."] },
                { type: 'image', value: { src: 'images/City/City_T1.jpg', alt: "Slide explaining the theoretical framework of 'Everyday Life and Cultural Theory by Ben Highmore'." } },
                { type: 'list', value: ["Maintenance and Care (Shannon Mattern) → Frames maintenance as essential, emotional, and infrastructural labor."] },
                { type: 'image', value: { src: 'images/City/City_T2.jpg', alt: "Slide explaining the theoretical framework of 'Maintenance and Care by Shannon Mattern'." } },
                { type: 'list', value: ["Convergence Culture (Henry Jenkins) → Informs how public narratives and digital participation shape collective meaning."] },
                { type: 'image', value: { src: 'images/City/City_T3.jpg', alt: "Slide explaining the theoretical framework of 'Convergence Culture by Henry Jenkins'." } },
                { type: 'paragraph', value: "<em>These frameworks guided the design in making invisible work visible, reframing workers not just as functional roles but as vital cultural and social contributors.</em>" },
                { type: 'heading', value: 'Tools & Development' },
                { type: 'list', value: ["Early Prototyping: Initial concepts tested in p5.js to explore visual states and interaction ideas. Some other concepts were also explored, using 3D models and map data of the city."] },
                { type: 'paragraph', value: "Prototype using map data and 3D models in blender" },
                { type: 'image', value: { src: 'images/City/City_Prot1.jpg', alt: "Early 3D prototype showing a map of a city with data points rendered in Blender." } },
                { type: 'paragraph', value: "Second Prototype using p5.js" },
                { type: 'image', value: { src: 'images/City/City_Prot2.jpg', alt: "Screenshot of a p5.js prototype with colorful circular data points on a dark background." } },
                { type: 'list', value: ["Final Implementation: Live Interactive Installation"] },
                { type: 'paragraph', value: "Built as a web-based interactive installation with an accompanying mobile AR app." },
                { type: 'list', value: ["Development Workflow: Iteratively coded using ChatGPT, Claude.ai, and Google AI Studio, with final refinements and debugging done manually."] },
                { type: 'image', value: { src: 'images/City/City_AI.jpg', alt: "Screenshot of code being generated using an AI tool, illustrating the project's development workflow." } },
                { type: 'list', value: ["Delivery Platforms: Public Installation → large screen or projection in transit hubs. Mobile Application → includes Hierarchy View and AR View linking bubbles to real-world city objects."] },
                { type: 'heading', value: 'User Journey - Storyboard' },
                { type: 'image', value: { src: 'images/City/City_User.jpg', alt: "A three-panel storyboard showing a user's journey from seeing the installation to interacting with it." } },
                { type: 'heading', value: 'Final Output' },
                { type: 'list', value: ["Mobile AR App UI Prototypes: Extends the installation into everyday life, letting users scan familiar city objects to uncover the workers and systems behind them.",] },
                { type: 'image', value: { src: 'images/City/City_App.jpg', alt: "UI mockups of the mobile AR app, showing the hierarchy view and the camera-based AR view." } },
                { type: 'list', value: ["Interactive Visualization: A responsive bubble system representing the city’s essential workers.",] },
                { type: 'iframe', value: { src: 'https://city-beneath-surface.netlify.app/', title: 'City, Beneath the Surface - Live Installation' } },
                { type: 'paragraph', value: 'You can also <a href="https://city-beneath-surface.netlify.app/" target="_blank" rel="noopener noreferrer" class="underline hover:text-[#DDA853]">open the installation in a new tab</a> to explore it fully.' },
                {
                    type: 'list', value: ["Exhibition Setup: Designed for public spaces where passersby can engage with the installation and explore hidden labor systems.",
                        "Message: Cities thrive because of invisible labor — this project transforms that invisibility into a visible, interactive network.",]
                },
                { type: 'heading', value: 'Reflection' },
                { type: 'paragraph', value: "This project taught me how design, data, and empathy can merge into impactful public interventions. It demonstrated:" },
                {
                    type: 'list', value: ["The power of interactive visualization in making complex labor systems approachable and humanized.",
                        "How accurate datasets (not just sentiment) can ground storytelling in realism while still keeping the experience poetic and engaging.",
                        "The potential and limits of AI-assisted coding as a design partner, and the importance of taking creative control in the final refinements.",
                        "The need to balance clarity and exploration, ensuring accessibility for the general public while keeping the experience compelling for institutions and stakeholders."]
                },
                { type: 'image', value: { src: 'images/City/City_Last.jpg', alt: "Final exhibition shot of the data visualization glowing on a screen in a dark room." } },
            ]
        }
    },
    {
        id: "theyyam-threads",
        title: "Theyyam Threads",
        category: "Visual Design",
        description: "A project encapsulating Kerala's Theyyam art form into modern wearable art, blending tradition with contemporary design.",
        image: "images/Theyyam/Theyyam_1.jpg",
        year: "2023",
        tags: ["T-Shirt", "Visual Communication", "Fashion"],
        details: {
            content: [
                { type: 'image', value: { src: 'images/Theyyam/Theyyam_3.jpg', alt: "Closeup of the 'Theyyam Threads' t-shirt design, a powerful black and white graphic of a Theyyam face." } },
                { type: 'quote', value: "“He was made man that we might be made God”", author: "St. Athanasius of Alexandria" },
                { type: 'heading', value: 'Project Overview' },
                { type: 'paragraph', value: "'Theyyam Threads' is a unique project encapsulating the essence of Kerala's vibrant Theyyam art form into modern wearable art. Inspired by the rich cultural heritage of Kerala, this project seamlessly blends tradition with contemporary design, resulting in visually stunning and culturally significant t-shirt designs." },
                { type: 'image', value: { src: 'images/Theyyam/Theyyam_2.jpg', alt: "A person wearing the Theyyam t-shirt, looking away from the camera in a stylish pose." } },
                { type: 'heading', value: 'Colors' },
                { type: 'image', value: { src: 'images/Theyyam/Theyyam_col.jpg', alt: "Color palette for the project, showing primary red, yellow, and black inspired by Theyyam costumes." } },
                { type: 'heading', value: 'Inspirations' },
                { type: 'image', value: { src: 'images/Theyyam/Theyyam_insp.jpg', alt: "A grid of inspiration photos showing the vibrant colors and intense expressions of Theyyam performers." } },
                { type: 'heading', value: 'Development' },
                { type: 'image', value: { src: 'images/Theyyam/Theyyam_dev1.jpg', alt: "Initial pencil sketches exploring different compositions for the Theyyam face graphic." } },
                { type: 'paragraph', value: "Sketch was made as a joint effort of me and my friend Adithya. We tried to explore several forms based on our references and came up with the idea of just the facial expression of Theyyam. Some sparks were also added later in front to show the intense artform." },
                { type: 'image', value: { src: 'images/Theyyam/Theyyam_dev2.jpg', alt: "Digital illustration of the Theyyam graphic in progress, showing monochrome vector lines." } },
                { type: 'paragraph', value: "Later we decided to go with a  monochrome approach, showing just the black and white elements." },
                { type: 'image', value: { src: 'images/Theyyam/Theyyam_dev3.jpg', alt: "Refined digital version of the Theyyam graphic with added details and textures." } },
                { type: 'paragraph', value: "Some extra details were added to make the design more likeable by the youth." },
                { type: 'image', value: { src: 'images/Theyyam/Theyyam_8.jpg', alt: "The final Theyyam graphic with added spark and grunge details for a modern feel." } },
                { type: 'heading', value: 'Learnings' },
                { type: 'paragraph', value: "Beyond mere aesthetics, this project delves deeper into the cultural significance and historical roots of Theyyam, aiming to foster a deeper appreciation and understanding of Kerala's cultural heritage. Through thoughtful artwork and design choices, 'Theyyam Threads' serves as a platform for cultural exchange and celebration, bridging the gap between tradition and modernity." },
                { type: 'image', value: { src: 'images/Theyyam/Theyyam_tshirt.jpg', alt: "Mockup of the final design on a black t-shirt." } },
            ]
        }
    },
    {
        id: "artbox",
        title: "ArtBox",
        category: "Product Design",
        description: "A mediatory system for artisans to sell their knowledge and craft, helping customers get hands-on experience.",
        imageDesktop: "images/Artbox/Artbox.jpg",
        imageMobile: "images/Artbox/ArtboxS.jpg",
        year: "2022",
        tags: ["Brand", "Packaging", "UX Design", "Service Design"],
        details: {
            content: [
                { type: 'image', value: { src: 'images/Artbox/Artbox_Title.jpg', alt: "Title image for the ArtBox project, displaying the logo and tagline on a branded box." } },
                { type: 'heading', value: 'Area of Intervention' },
                { type: 'paragraph', value: "After some deliberation, we narrowed it down to three sectors namely education, health and small businesses. We tried to identify various problems these sectors face to help us weigh in between these." },
                { type: 'image', value: { src: 'images/Artbox/Artbox_1.jpg', alt: "Mind map diagram exploring problem areas in education, health, and small business sectors." } },
                { type: 'heading', value: 'Design Model' },
                { type: 'image', value: { src: 'images/Artbox/Artbox_Model.jpg', alt: "Diagram showing the ArtBox service design model connecting artisans, the platform, and customers." } },
                { type: 'heading', value: 'Visual Identity' },
                { type: 'image', value: { src: 'images/Artbox/Artbox_Visual1.jpg', alt: "Visual identity board for ArtBox, showing the logo, color palette, and typography." } },
                { type: 'image', value: { src: 'images/Artbox/Artbox_Visual2.jpg', alt: "Second visual identity board for ArtBox, showing iconography and brand patterns." } },
                { type: 'heading', value: 'User Flow' },
                { type: 'image', value: { src: 'images/Artbox/Artbox_Userflow.jpg', alt: "A user flow diagram mapping the customer's journey from discovery to receiving their ArtBox kit." } },
                { type: 'heading', value: 'Prototypes' },
                { type: 'paragraph', value: "Website" },
                { type: 'image', value: { src: 'images/Artbox/Artbox_Website.jpg', alt: "Screenshots of the ArtBox website user interface, showing the homepage and product pages." } },
                { type: 'paragraph', value: "Product" },
                { type: 'image', value: { src: 'images/Artbox/Artbox_Product.jpg', alt: "Photographs of the physical ArtBox product: a beautifully packaged craft kit with tools and materials." } },
            ]
        }
    },
    {
        id: "aujus",
        title: "Aujus",
        category: "System Design",
        description: "A 5-week semester project to understand and design for complex, interconnected socio-economic problems.",
        imageDesktop: "images/Aujus/Aujus.jpg",
        imageMobile: "images/Aujus/AujusS.jpg",
        year: "2022",
        tags: ["System Design", "Service Design", "Wayfinding", "UX/UI"],
        details: {
            content: [
                { type: 'image', value: { src: 'images/Aujus/Aujus_Title.jpg', alt: "Title card for the Aujus project with its logo and a brief description." } },
                { type: 'heading', value: 'Initial Steps' },
                { type: 'heading', value: 'Understanding Medical Systems' },
                { type: 'paragraph', value: "We started by looking at problem areas within a medical system, starting with an initial study by looking into the normal procedures happening inside a hospital." },
                { type: 'paragraph', value: "We looked at various departments and their functions inside hospitals." },
                { type: 'image', value: { src: 'images/Aujus/Aujus_1.jpg', alt: "Diagram mapping the different departments and functions within a hospital system." } },
                { type: 'heading', value: 'Identifying system components' },
                { type: 'paragraph', value: "We started our process by looking studying how, where and why datas are collected inside hospitals and identified the  system components which helps us to evaluate the system." },
                { type: 'paragraph', value: "We identified the components through an entity relationship mapping of the hospital." },
                { type: 'image', value: { src: 'images/Aujus/Aujus_entity.jpg', alt: "An entity-relationship diagram illustrating the data connections within a hospital." } },
                { type: 'paragraph', value: "Entity-relationship mapping" },
                { type: 'image', value: { src: 'images/Aujus/Aujus_comp.jpg', alt: "A list of identified system components, such as patient data, diagnosis, and medical records." } },
                { type: 'paragraph', value: "Identified system components" },
                { type: 'heading', value: 'Connection circles' },
                { type: 'paragraph', value: "In the process of identifying system components we started grouping these identified system components which are patient information, patient diagnosis, and medical research." },
                { type: 'paragraph', value: "Negative and positive connections are shown with red and green coloured arrows, respectively, with the direction of the connections." },
                { type: 'image', value: { src: 'images/Aujus/Aujus_Pat.jpg', alt: "Connection circle diagram showing the relationships within patient information data." } },
                { type: 'paragraph', value: "Patient info" },
                { type: 'image', value: { src: 'images/Aujus/Aujus_Med.jpg', alt: "Connection circle diagram showing the relationships within medical research data." } },
                { type: 'paragraph', value: "Medical Research" },
                { type: 'image', value: { src: 'images/Aujus/Aujus_Diag.jpg', alt: "Connection circle diagram showing the relationships within patient diagnosis data." } },
                { type: 'paragraph', value: "Patient diagnosis" },
                { type: 'heading', value: 'System Implementation' },
                { type: 'image', value: { src: 'images/Aujus/Aujus_Sys1.jpg', alt: "System flow diagram identifying points of data entry." } },
                { type: 'paragraph', value: "Identified areas of data entry and data accessing in the system." },
                { type: 'image', value: { src: 'images/Aujus/Aujus_Sys2.jpg', alt: "System flow diagram identifying points of data access for patients and medical staff." } },
                { type: 'heading', value: 'AUJUS' },
                { type: 'paragraph', value: "Aujus is a system with centralised medical database where data can be entered and accessed by the patients from anywhere at any point." },
                { type: 'image', value: { src: 'images/Aujus/Aujus_Card.jpg', alt: "Closeup of the Aujus medical information card design." } },
                { type: 'image', value: { src: 'images/Aujus/Aujus_Screen.jpg', alt: "Mockup of the Aujus user interface on a screen, displaying patient medical data." } },
            ]
        }
    },
    {
        id: "3dtype",
        title: "3D Typography",
        category: "3D Art",
        description: "Crafted using Blender, each letter is a blend of creativity and technical skill. ",
        imageDesktop: "images/3D/3D_Title.jpg",
        imageMobile: "images/3D/3D_TitleS.jpg",
        year: "2023",
        tags: ["3D", "Blender", "Art"],
        details: {
            content: [
                { type: 'heading', value: 'About' },
                { type: 'paragraph', value: "In this 3D Typography Project, I've brought letters A to G to life in stunning three-dimensional form. Crafted using Blender, each letter is a blend of creativity and technical skill. While my academic commitments paused the project, these letters stand as a testament to my passion for design and innovation. Explore the fusion of artistry and technology in this captivating showcase of 3D typography." },
                { type: 'heading', value: 'Letter a' },
                { type: 'image', value: { src: 'images/3D/3D_a.jpg', alt: "A 3D rendering of the letter 'A' as an abstract shape with white fur and a marble texture." } },
                { type: 'video', value: `<iframe title="vimeo-player" src="https://player.vimeo.com/video/851099588?h=364bda9f34" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowfullscreen></iframe>` },
                { type: 'paragraph', value: "Made it into an abstract form.  Added some hair using particle system. And a marble texture was created procedurally using nodes in blender." },
                { type: 'heading', value: 'Letter b' },
                { type: 'image', value: { src: 'images/3D/3D_b.jpg', alt: "A diesel-punk themed letter 'B' made of metal with glowing orange lights and flames." } },
                { type: 'video', value: `<iframe title="vimeo-player" src="https://player.vimeo.com/video/851099981?h=15cfb6a41e" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>` },
                { type: 'paragraph', value: "Went with diesel punk theme for this. Created some flames and light emission animations" },
                { type: 'heading', value: 'Letter c' },
                { type: 'image', value: { src: 'images/3D/3D_c.jpg', alt: "A playful 3D letter 'C' designed to look like a piece of Swiss cheese." } },
                { type: 'video', value: `<iframe title="vimeo-player" src="https://player.vimeo.com/video/851101527?h=83dcc45949" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>` },
                { type: 'paragraph', value: "Made C into cheese. Created some extra elements using geometry nodes and scattered them across." },
                { type: 'heading', value: 'Letter d' },
                { type: 'image', value: { src: 'images/3D/3D_d.jpg', alt: "A furry, orange 3D letter 'D' with smaller 'D' shapes attached to its hair." } },
                { type: 'video', value: `<iframe title="vimeo-player" src="https://player.vimeo.com/video/851102005?h=63d3b474ed" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>` },
                { type: 'paragraph', value: "Created some hair and parented some extra D elements for this one." },
                { type: 'heading', value: 'Letter e' },
                { type: 'image', value: { src: 'images/3D/3D_e.jpg', alt: "A 3D letter 'E' made of a reflective, iridescent material that transitions through colors." } },
                { type: 'video', value: `<iframe title="vimeo-player" src="https://player.vimeo.com/video/851102127?h=5740f8f60e" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>` },
                { type: 'paragraph', value: "Made two elements and a ring at the middle to transition between the both." },
                { type: 'heading', value: 'Letter f' },
                { type: 'image', value: { src: 'images/3D/3D_f.jpg', alt: "A 3D letter 'F' composed of many small, transparent bubbles against a blue background." } },
                { type: 'video', value: `<iframe title="vimeo-player" src="https://player.vimeo.com/video/851102860?h=f40540a40c" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>` },
                { type: 'paragraph', value: "Created random bubbles and made a simple animation using geometry nodes." },
                { type: 'heading', value: 'Letter g' },
                { type: 'image', value: { src: 'images/3D/3D_g.jpg', alt: "A 3D letter 'G' with a grassy texture and a rope element wrapping around it." } },
                { type: 'video', value: `<iframe title="vimeo-player" src="https://player.vimeo.com/video/935374270?h=080f5fcf22" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>` },
                { type: 'paragraph', value: "Made a grass form for the circular element and a rope to go around it. Animated the wind on the grass, as well as the rope movement." },

            ]
        }
    },
    {
        id: "revvedup",
        title: "Revved Up - 3D Cars in motion",
        category: "3D",
        description: "Animated 3D cars, including original models created in Blender, showcasing modeling and motion skills. ",
        image: "images/Cars/Cars_Main.jpg",
        year: "2023",
        tags: ["3D Modeling", "Blender", "Art", "Animation"],
        details: {
            content: [
                { type: 'heading', value: 'About' },
                { type: 'paragraph', value: "In this project, I've meticulously crafted and animated a collection of stunning car models using Blender. Through the magic of animation, I have made some of these cars come to life, showcasing their agility, power, and elegance in dynamic motion." },
                { type: 'heading', value: 'Rendered Stills' },
                { type: 'image', value: { src: 'images/Cars/Cars_Img1.jpg', alt: "A beautifully lit 3D render of a classic Honda Civic in a photorealistic studio setting." } },
                { type: 'paragraph', value: "Some models were created from scratch, focusing on realistic materials and lighting." },
                { type: 'image', value: { src: 'images/Cars/Cars_Img2.jpg', alt: "A 3D model of a vintage Honda Civic shown in a clay render style to highlight its form." } },
                { type: 'heading', value: 'Interactive 3D Models' },
                { type: 'paragraph', value: 'You can interact with the models below. Click and drag to rotate, scroll to zoom, and right-click to pan.' },
                { type: 'sketchfab', value: `<div class="sketchfab-embed-wrapper"> <iframe title="Honda Civic First Generation" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share" src="https://sketchfab.com/models/9d71ea92a33c4a1e82cc589730822f63/embed?autospin=1&autostart=1"> </iframe> </div>` },
                { type: 'sketchfab', value: `<div class="sketchfab-embed-wrapper"> <iframe title="SB1 Civic in Naked Style" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share" src="https://sketchfab.com/models/fab52fc398b44564be1b22f8a4dbf23c/embed?autospin=1&autostart=1"> </iframe> </div>` },
                { type: 'heading', value: 'Videos' },
                { type: 'paragraph', value: "The animation showcases 3D cars modeled in Blender, driving through richly detailed environments composed of sourced elements. The project highlights both modeling and animation skills, bringing vehicles to life within dynamic scenes." },
                { type: 'video', value: `<iframe title="vimeo-player" src="https://player.vimeo.com/video/935375739?h=783ccfb540" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>` },
                { type: 'video', value: `<iframe title="vimeo-player" src="https://player.vimeo.com/video/935377589?h=b915c93a62" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>` },
                { type: 'video', value: `<iframe title="vimeo-player" src="https://player.vimeo.com/video/935377842?h=b5226399db" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>` },
            ]
        }
    },
    {
        id: "christmas-party",
        title: "Christmas Party - Dublin",
        category: "Photography",
        description: "A low-light photo series capturing the energy, emotion, and joy of a student Christmas party. ",
        image: "images/Christ/Christ_Main.jpg",
        year: "2024",
        tags: ["Photography", "Lightroom", "Photoshop"],
        details: {
            content: [
                { type: 'heading', value: 'About' },
                { type: 'paragraph', value: "This photo series captures the electric energy and intimacy of a student-led Christmas party. From close-knit conversations under warm lights to moments of pure joy on the dance floor, these images celebrate youth, expression, and the unfiltered warmth of festive gatherings. The shoot focuses on movement, emotion, and the interplay of dynamic lighting in a club environment. I approached this project with a low-light documentary style, aiming to preserve the authenticity of the atmosphere without flash interference. Each shot was composed to retain the ambient hues, stage lights, and crowd interactions that define nightlife storytelling." },
                { type: 'heading', value: 'Lights and connection' },
                { type: 'paragraph', value: "where dance becomes conversation" },
                { type: 'image', value: { src: 'images/Christ/Christ_1.jpg', alt: "A candid photo of a DJ at a Christmas party, focused on their hands on the turntables with the crowd blurred." } },
                { type: 'paragraph', value: 'Shortlisted for the Fujifilm Life As You See It Competition 2025. <a href="https://www.fujifilm-houseofphotography.com/life-as-you-see-it-2025/" target="_blank" rel="noopener noreferrer" class="underline hover:text-[#DDA853]">CLick here to know more about the Competition.</a>' },
                { type: 'heading', value: 'Gear' },
                { type: 'list', value: ["Fujifilm X-T5 + 30mm f/1.4 Lens"] },
                { type: 'paragraph', value: " Ideal for low-light detail, shallow depth of field, and capturing color fidelity in dim conditions." },
                { type: 'list', value: ["Sony A6400 + 18-55mm f/3.5–5.6"] },
                { type: 'paragraph', value: " Versatile for wider scenes, DJ booth shots, and dynamic zoom-in portraits." },
                { type: 'heading', value: 'Gallery' },
                {
                    type: 'gallery', value: [
                        { src: 'images/Christ/Christ_2.jpg', alt: 'Two people laughing together on the dance floor, bathed in warm ambient light.' },
                        { src: 'images/Christ/Christ_3.jpg', alt: 'A high-energy shot of the crowd dancing, with motion blur capturing the movement.' },
                        { src: 'images/Christ/Christ_4.jpg', alt: 'A singer performing on stage, silhouetted against bright concert lighting.' },
                        { src: 'images/Christ/Christ_5.jpg', alt: 'An intimate moment of two friends talking away from the main dance floor.' }
                    ]
                },
                { type: 'heading', value: 'Post-Processing' },
                { type: 'list', value: ["Color correction for ambient light consistency, using Adobe Lightroom", "Noise reduction selectively applied to maintain texture.", "Cropped for cinematic balance while preserving crowd energy."] },
                { type: 'paragraph', value: "This Christmas party series was more than just an exercise in event photography, it was a study in atmosphere, spontaneity, and human connections. Working in a challenging low-light environment pushed me to embrace the unpredictability of club lighting and focus on capturing raw, honest moments rather than posed perfections. The project reinforced the value of observation, knowing when to step in, when to wait, and how to let the ambient mood shape each frame. As a photographer, it reminded me that even in the most chaotic settings, there's always a story unfolding, if you’re willing to look for it." },
                { type: 'image', value: { src: 'images/Christ/Christ_6.jpg', alt: "A wide shot of the entire venue, showing the packed dance floor and festive decorations." } },
            ]
        }
    },

];

// [KEEP PROJECTS ARRAY]

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. INTRO ---
    let isIntroActive = true;
    const introOverlay = document.getElementById('intro-overlay');
    const skipBtn = document.getElementById('skip-intro');
    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            introOverlay.style.transform = 'translateY(-100%)';
            isIntroActive = false;
            document.body.classList.remove('is-loading');
            document.documentElement.classList.remove('is-loading');
        });
    }



    // --- 2. SETUP ---
    const track = document.getElementById('projects-track');
    const scrollContainer = document.getElementById('horizontal-scroll');

    let isLocked = false;
    let activeIndex = -1;
    let suppressPreviewClicksUntil = 0;
    const closePressEvent = window.PointerEvent ? 'pointerdown' : 'touchstart';
    let selectorApi = null;
    let savedScrollPosition = 0;

    // --- 3. RENDER LOOP ---
    projects.forEach((p, index) => {
        const section = document.createElement('article');
        section.className = 'project-panel group';
        section.dataset.index = index;

        const imgSrc = p.imageDesktop || p.image;

        section.innerHTML = `
            <div class="close-btn text-[#16404D] hover:scale-110 transition-transform">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>

            <div class="panel-preview cursor-pointer">
                
                <div class="preview-content w-full max-w-[550px] mx-auto flex flex-col justify-center relative z-10">
                    
                    <div class="panel-image-wrapper mb-8 overflow-hidden rounded-md aspect-video">
                        <img src="${imgSrc}" alt="${p.title}" class="panel-image object-cover w-full h-full transition-transform duration-75">
                    </div>

                    <div class="flex flex-col items-start gap-2 w-full">
                        <span class="text-[#DDA853] text-xs font-bold tracking-widest uppercase">${p.category}</span>
                        <h3 class="font-serif text-3xl md:text-4xl leading-tight group-hover:text-[#A6CDC6] transition-colors">${p.title}</h3>
                        <p class="text-[#FBF5DD]/60 text-sm md:text-base mt-2 line-clamp-3">${p.description}</p>
                        <div class="view-btn mt-6 flex items-center gap-2 text-xs border border-[#FBF5DD]/20 rounded-full px-4 py-2 group-hover:bg-[#FBF5DD] group-hover:text-[#111] transition-all">
                            <span>VIEW PROJECT</span>
                        </div>
                    </div>

                </div>

                <span class="absolute bottom-10 left-10 text-[6rem] font-serif opacity-5 select-none pointer-events-none text-white stroke-text z-0">
                    0${index + 1}
                </span>
            </div>

            <div class="panel-details">
                <div class="details-inner max-w-5xl mx-auto px-0 md:px-12 md:px-16 pb-16 pt-12"></div>
            </div>
        `;

        const previewSide = section.querySelector('.panel-preview');
        const closeBtn = section.querySelector('.close-btn');

        previewSide.addEventListener('click', () => {
            if (Date.now() < suppressPreviewClicksUntil) return;
            if (activeIndex === index) return;
            expandProject(index);
        });

        let closeHandledOnPress = false;

        const handleCloseProject = (e) => {
            e.preventDefault();
            e.stopPropagation();
            suppressPreviewClicksUntil = Date.now() + 450;
            collapseProject();
        };

        closeBtn.addEventListener(closePressEvent, (e) => {
            closeHandledOnPress = true;
            handleCloseProject(e);
        });

        closeBtn.addEventListener('click', (e) => {
            if (closeHandledOnPress) {
                closeHandledOnPress = false;
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            handleCloseProject(e);
        });

        track.appendChild(section);
    });





    // --- 4. EXPAND / LOCK LOGIC ---
    function expandProject(index) {
        if (activeIndex !== -1) collapseProject();

        activeIndex = index;
        isLocked = true;
        if (selectorApi) selectorApi.setActive(index, true);

        document.documentElement.classList.add('project-open');
        document.body.classList.add('project-open');

        const ambientBg = document.getElementById('ambient-background');
        if (ambientBg) ambientBg.style.opacity = '0.05';

        const panel = track.children[index];
        const contentContainer = panel.querySelector('.details-inner');

        populateContent(projects[index], contentContainer);

        if (window.innerWidth >= 768) {
            // DESKTOP: Horizontal Logic
            savedScrollPosition = targetScroll;
            const targetPanelScroll = panel.offsetLeft;
            scrollContainer.scrollTo({ left: targetPanelScroll, behavior: 'smooth' });

            setTimeout(() => {
                panel.classList.add('is-expanded');
                document.body.classList.add('overflow-hidden');
                scrollContainer.scrollLeft = panel.offsetLeft;
            }, 300);

        } else {
            // MOBILE: Modal Logic
            panel.classList.add('is-expanded');
            document.body.classList.add('overflow-hidden'); // Locks background
            panel.scrollTop = 0; // Resets modal scroll to top
        }
    }

    function collapseProject() {
        if (activeIndex === -1) return;
        suppressPreviewClicksUntil = Date.now() + 450;

        // ✅ REMOVE PROJECT-OPEN STATE FIRST (prevents tap-through)
        document.documentElement.classList.remove('project-open');
        document.body.classList.remove('project-open');

        const ambientBg = document.getElementById('ambient-background');
        if (ambientBg) ambientBg.style.opacity = '0.5';

        const panel = track.children[activeIndex];

        panel.classList.add('is-closing');

        document.body.classList.remove('overflow-hidden');
        panel.classList.remove('is-expanded');

        // Reset styles
        panel.style.minWidth = '';
        panel.style.width = '';

        setTimeout(() => {
            const inner = panel.querySelector('.details-inner');
            if (inner) inner.innerHTML = '';
            panel.classList.remove('is-closing');
        }, 600);

        activeIndex = -1;
        isLocked = false;

        // Restore scroll position for desktop layout
        if (window.innerWidth >= 768) {
            targetScroll = savedScrollPosition;
            scrollContainer.scrollTo({ left: savedScrollPosition, behavior: 'auto' });
        }

        if (selectorApi) selectorApi.sync();
    }




    // --- NEW: HAMBURGER MENU LOGIC ---
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const aboutMenu = document.getElementById('about-menu');

    function toggleMenu() {
        const openingMenu = !aboutMenu.classList.contains('is-visible');

        if (openingMenu) {
            // Reset About scroll to top
            const scrollWrapper = aboutMenu.querySelector('.h-full.overflow-y-auto');
            if (scrollWrapper) {
                scrollWrapper.scrollTop = 0;
            }
        }

        aboutMenu.classList.toggle('is-visible');
        document.body.classList.toggle('menu-open');
        menuToggle.classList.toggle('is-open');
    }



    if (menuToggle && aboutMenu) {
        menuToggle.addEventListener('click', (e) => {

            e.stopPropagation();
            toggleMenu();
        });
    }

    if (menuClose) {
        menuClose.addEventListener('click', (e) => {
            // 🚫 ALSO BLOCK CLOSE TAP FROM REOPENING MENU VIA BUBBLE
            e.stopPropagation();

            toggleMenu();
        });
    }



    // --- 5. WHEEL CONTROLLER (Free Scroll) ---
    // --- 5. SMOOTH SCROLL & MAGNETIC SNAP CONTROLLER ---

    // Config
    const scrollEase = 0.08;      // Smoothness (Lower = floatier)
    const snapStrength = 0.03;    // Magnetic pull (Lower = softer docking)
    const snapThreshold = 50;     // Magnet Range (Lower = easier to detach)
    const scrollSensitivity = 2.5; // Scroll speed (Higher = less effort to move)

    // State
    let currentScroll = scrollContainer.scrollLeft;
    let targetScroll = scrollContainer.scrollLeft;
    let isWheeling = false;
    let wheelTimeout;

    // A. Wheel Listener: Updates the TARGET only
    window.addEventListener('wheel', (e) => {
        // Run on desktop/tablet layout and when no project is expanded
        if (isLocked || isIntroActive || window.innerWidth < 768 || document.body.classList.contains('menu-open')) return;

        // Update target based on wheel delta
        targetScroll += e.deltaY * scrollSensitivity;

        // Clamp target so we don't scroll past the start or end
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

        // Detect when user stops wheeling
        isWheeling = true;
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            isWheeling = false;
        }, 150);
    }, { passive: true });

    // B. Touch Listener: Translate swipes to horizontal scroll
    let touchStartX = 0;
    let touchStartY = 0;

    window.addEventListener('touchstart', (e) => {
        if (isLocked || isIntroActive || window.innerWidth < 768 || document.body.classList.contains('menu-open')) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (isLocked || isIntroActive || window.innerWidth < 768 || document.body.classList.contains('menu-open')) return;

        // Prevent default browser bouncing and native scrolling
        if (e.cancelable) e.preventDefault();

        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchStartX - touchX;
        const deltaY = touchStartY - touchY;

        // Accumulate both swipe axes (vertical and horizontal) to increase flexibility
        // Increase sensitivity slightly on touch devices relative to wheel
        targetScroll += (deltaX + deltaY * 1.5) * (scrollSensitivity * 0.8);

        touchStartX = touchX;
        touchStartY = touchY;

        // Clamp target
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

        isWheeling = true;
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => { isWheeling = false; }, 150);
    }, { passive: false });

    // C. Physics Loop: Makes the CURRENT scroll catch up to TARGET
    function animateScroll() {

        // --- DESKTOP/TABLET SCROLL BEHAVIOR ---
        if (!isLocked && window.innerWidth >= 768 && !document.body.classList.contains('menu-open')) {

            // 1. Magnetic Snap Logic
            if (!isWheeling) {
                const panels = document.querySelectorAll('.project-panel');
                let closestPanel = null;
                let minDist = Infinity;

                panels.forEach(panel => {
                    const dist = Math.abs(panel.offsetLeft - targetScroll);
                    if (dist < minDist) {
                        minDist = dist;
                        closestPanel = panel;
                    }
                });

                if (closestPanel && minDist < snapThreshold && minDist > 1) {
                    targetScroll +=
                        (closestPanel.offsetLeft - targetScroll) * snapStrength;
                }
            }

            // 2. Smooth interpolation
            if (Math.abs(targetScroll - currentScroll) > 0.5) {
                currentScroll +=
                    (targetScroll - currentScroll) * scrollEase;

                scrollContainer.scrollLeft = currentScroll;
            } else {
                scrollContainer.scrollLeft = targetScroll;
                currentScroll = targetScroll;
            }

            // 3. Distance-based Image Scaling (Griflan-style)
            const renderPanels = document.querySelectorAll('.project-panel');
            renderPanels.forEach(p => {
                const img = p.querySelector('.panel-image');
                if (img) {
                    // We measure distance from the panel's left edge to the scroll position
                    // This aligns with how the snap logic works (snapping panel's left to viewport's left)
                    const distanceFromActive = Math.abs(currentScroll - p.offsetLeft);

                    // Base scale 1.0, max scale 1.30.
                    // Divisor controls how fast it scales down as it moves away from the active spot.
                    const scaleFactor = Math.max(1, 1.30 - (distanceFromActive / 2500));

                    img.style.transform = `scale(${scaleFactor})`;
                }
            });

            // 4. Ambient Background Parallax
            const ambientBg = document.getElementById('ambient-background');
            if (ambientBg) {
                // Calculate how far along the track we are (0 to 1)
                const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
                const scrollProgress = maxScroll > 0 ? currentScroll / maxScroll : 0;

                // Shift the background slowly (e.g. max -10vw horizontal, -5vh vertical over the whole site)
                const bgX = scrollProgress * -10;
                const bgY = scrollProgress * -5;

                ambientBg.style.transform = `translate(${bgX}vw, ${bgY}vh)`;
            }

            // Continue loop
            requestAnimationFrame(animateScroll);
        }

        // --- MOBILE OR LOCKED ---
        else {
            // Reset image scales when locked/mobile
            document.querySelectorAll('.panel-image').forEach(img => {
                img.style.transform = 'scale(1)';
            });

            // Sync values but DO NOT force scroll animation
            currentScroll = scrollContainer.scrollLeft;
            targetScroll = scrollContainer.scrollLeft;

            // Only continue loop if returning to desktop later
            requestAnimationFrame(animateScroll);
        }
    }


    // Start the loop
    animateScroll();

    // --- 5.5. AMBIENT PARTICLES ---
    function initAmbientParticles() {
        const container = document.getElementById('ambient-background');
        if (!container) return;

        const colors = ['#16404D', '#A6CDC6', '#DDA853'];
        const numParticles = window.innerWidth < 768 ? 20 : 50;

        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');

            // Random properties to match the reference image's subtle starry/dot look
            const size = Math.random() * 8 + 2; // 2px to 10px
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 120 - 10; // -10% to 110%
            const top = Math.random() * 120 - 10;
            const opacity = Math.random() * 0.4 + 0.1; // 0.1 to 0.5
            const animDuration = Math.random() * 10 + 8; // 8s to 18s
            const animDelay = Math.random() * -10; // Negative delay to start mid-animation

            particle.className = 'ambient-particle absolute rounded-full mix-blend-screen pointer-events-none';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = color;
            particle.style.left = `${left}%`;
            particle.style.top = `${top}%`;
            particle.style.opacity = opacity;

            // Custom CSS variable for animation distance (much larger motion now)
            particle.style.setProperty('--travel-x', `${(Math.random() - 0.5) * 40}vw`);
            particle.style.setProperty('--travel-y', `${(Math.random() - 0.5) * 40}vh`);

            particle.style.animation = `particle-drift ${animDuration}s infinite alternate ease-in-out ${animDelay}s`;

            container.appendChild(particle);
        }
    }

    initAmbientParticles();


    // --- 6. CONTENT POPULATOR ---
    function populateContent(project, container) {
        container.innerHTML = '';

        // 1. HEADER (Title, Year, Tags)
        const header = document.createElement('div');
        // CHANGED: Reduced mb-12 -> mb-8, pt-10 -> pt-2, pb-6 -> pb-4
        header.className = 'mb-8 pt-2 border-b border-[#16404D]/10 pb-4';
        header.innerHTML = `
            <h2 class="text-3xl font-serif font-bold text-[#16404D] mb-2">Project Insights</h2>
            <div class="flex gap-4 text-sm text-[#DDA853] font-mono uppercase">
                <span>${project.year}</span>
                <span>//</span>
                <span>${project.tags ? project.tags.join(', ') : ''}</span>
            </div>
        `;
        container.appendChild(header);

        // 2. CONTENT LOOP
        if (project.details && project.details.content) {
            project.details.content.forEach(item => {
                let element = null;

                switch (item.type) {
                    case 'heading':
                        element = document.createElement('h3');
                        element.className = 'text-2xl font-serif font-bold text-[#16404D] mt-12 mb-4';
                        element.textContent = item.value;
                        break;

                    case 'subheading':
                        element = document.createElement('h4');
                        element.className = 'text-xl font-bold text-[#16404D]/90 mt-8 mb-2 font-sans flex items-start gap-3';
                        element.innerHTML = item.value;
                        break;

                    case 'paragraph':
                        element = document.createElement('p');
                        element.className = 'text-[#16404D]/80 leading-relaxed my-4 text-lg font-sans';
                        element.innerHTML = item.value;
                        break;

                    case 'image':
                        element = document.createElement('img');
                        element.className = 'w-full h-auto rounded-sm shadow-md my-8 lightbox-trigger cursor-zoom-in';
                        element.src = item.value.src;
                        element.alt = item.value.alt;
                        break;

                    case 'box-list':
                        element = document.createElement('ul');
                        element.className = 'flex flex-wrap gap-3 my-6 justify-center';

                        item.value.forEach(text => {
                            const li = document.createElement('li');
                            li.className = 'px-4 py-2 border border-[#16404D]/20 rounded-lg text-sm text-[#16404D] bg-[#16404D]/5 font-medium leading-relaxed';
                            li.innerHTML = text;
                            element.appendChild(li);
                        });
                        break;

                    case 'lined-list':
                        element = document.createElement('div');
                        element.className = 'my-6 border-l-4 border-[#DDA853] pl-6 py-1';

                        const ulLined = document.createElement('ul');
                        ulLined.className = 'space-y-3 text-[#16404D]/90';

                        item.value.forEach(text => {
                            const li = document.createElement('li');
                            li.className = 'leading-relaxed text-base';
                            li.innerHTML = text;
                            ulLined.appendChild(li);
                        });
                        element.appendChild(ulLined);
                        break;

                    case 'ascii':
                        element = document.createElement('pre');
                        element.className = 'ascii-terminal';
                        element.textContent = item.value;
                        break;

                    case 'roadmap':
                        element = document.createElement('div');
                        element.className = 'roadmap-wrapper';

                        // 1. The Background Spine
                        const spine = document.createElement('div');
                        spine.className = 'roadmap-spine';
                        element.appendChild(spine);

                        item.value.forEach((phase, index) => {
                            const phaseContainer = document.createElement('div');
                            phaseContainer.className = 'roadmap-phase';

                            // 2. Phase Header
                            const header = document.createElement('div');
                            header.className = 'roadmap-header-pill';
                            header.textContent = phase.title;
                            phaseContainer.appendChild(header);

                            // 3. The Arrow
                            const arrow = document.createElement('div');
                            arrow.className = 'roadmap-arrow';
                            phaseContainer.appendChild(arrow);

                            // 4. The Split Bar
                            const splitBar = document.createElement('div');
                            splitBar.className = 'roadmap-split-bar';
                            phaseContainer.appendChild(splitBar);

                            // 5. The Grid of Boxes
                            const grid = document.createElement('div');
                            grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl'; // Added grid classes here

                            phase.items.forEach(boxText => {
                                const box = document.createElement('div');
                                box.className = 'bg-[#FBF5DD] border border-[#16404D] text-[#16404D] p-4 rounded text-center text-sm shadow-[4px_4px_0px_rgba(22,64,77,0.1)]'; // Added styling classes
                                box.innerHTML = boxText;
                                grid.appendChild(box);
                            });
                            phaseContainer.appendChild(grid);

                            // 6. Next Arrow (if not last)
                            if (index < item.value.length - 1) {
                                const nextArrow = document.createElement('div');
                                nextArrow.className = 'roadmap-arrow';
                                nextArrow.style.marginTop = '1rem';
                                nextArrow.style.marginBottom = '1rem';
                                phaseContainer.appendChild(nextArrow);
                            }

                            element.appendChild(phaseContainer);
                        });
                        break;

                    case 'gallery':
                        element = document.createElement('div');
                        element.className = 'image-gallery';
                        item.value.forEach(imageData => {
                            const img = document.createElement('img');
                            img.src = imageData.src;
                            img.alt = imageData.alt;
                            img.className = 'lightbox-trigger cursor-zoom-in';
                            element.appendChild(img);
                        });
                        break;

                    case 'quote':
                        element = document.createElement('blockquote');
                        element.className = 'my-12 border-l-4 border-[#DDA853] pl-6 italic text-2xl font-serif text-[#16404D]';
                        const quoteText = String(item.value || '').replace(/^["“]|["”]$/g, '');
                        element.innerHTML = `“${quoteText}”` + (item.author ? `<footer class="mt-4 text-sm text-[#16404D]/60 font-sans not-italic">— ${item.author}</footer>` : '');
                        break;

                    case 'video':
                        element = document.createElement('div');
                        element.className = 'my-8 w-full aspect-video bg-[#16404D]/5 rounded overflow-hidden relative';
                        element.innerHTML = item.value.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"');
                        break;

                    case 'iframe':
                        element = document.createElement('div');
                        element.className = 'iframe-wrapper my-8 w-full aspect-video bg-[#16404D]/5 rounded overflow-hidden relative';
                        element.innerHTML = `
                            <iframe src="${item.value.src}" title="${item.value.title}" loading="lazy" class="absolute inset-0 w-full h-full border-0"></iframe>
                            <button class="absolute bottom-4 right-4 bg-[#16404D] text-[#FBF5DD] p-2 rounded-full hover:bg-[#DDA853] transition-colors shadow-lg z-10" onclick="window.open('${item.value.src}', '_blank')" aria-label="Open in new tab">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </button>
                        `;
                        break;

                    case 'mobile-demo':
                        element = document.createElement('div');
                        element.className = 'mobile-demo-container my-12 flex flex-col items-center justify-center';
                        element.innerHTML = `
                             <div class="mobile-bezel relative w-[300px] h-[600px] bg-[#161616] rounded-[3rem] border-[8px] border-[#161616] shadow-2xl overflow-hidden">
                                <div class="mobile-screen w-full h-full bg-white overflow-hidden rounded-[2.5rem]">
                                    <iframe src="${item.value}" title="Live Mobile Prototype" class="w-full h-full border-0" allow="geolocation" loading="lazy"></iframe>
                                </div>
                            </div>
                            <p class="text-center text-xs text-[#16404D]/50 mt-6 uppercase tracking-widest">Interact with the screen to test the app</p>
                        `;
                        break;

                    case 'sketchfab':
                        element = document.createElement('div');
                        // 1. Create a responsive container with aspect ratio
                        element.className = 'my-8 w-full aspect-video bg-[#16404D]/5 rounded overflow-hidden relative';

                        // 2. Insert the Sketchfab HTML
                        element.innerHTML = item.value;

                        // 3. Find the inner elements and force them to fill the space
                        const skWrapper = element.querySelector('.sketchfab-embed-wrapper');
                        const skFrame = element.querySelector('iframe');

                        // Force wrapper to full size if it exists
                        if (skWrapper) {
                            skWrapper.style.width = '100%';
                            skWrapper.style.height = '100%';
                            skWrapper.style.margin = '0';
                        }

                        // Force iframe to absolute positioning to fill the container
                        if (skFrame) {
                            skFrame.style.position = 'absolute';
                            skFrame.style.top = '0';
                            skFrame.style.left = '0';
                            skFrame.style.width = '100%';
                            skFrame.style.height = '100%';
                            skFrame.removeAttribute('width');  // Remove fixed attributes
                            skFrame.removeAttribute('height');
                        }
                        break;

                    case 'architecture':
                        element = document.createElement('div');
                        element.className = 'arch-wrapper w-full overflow-x-auto py-8';

                        item.value.forEach((row, index) => {
                            const rowDiv = document.createElement('div');
                            rowDiv.className = 'arch-row';

                            if (Array.isArray(row)) {
                                // Parallel Branches (Columns)
                                row.forEach(colData => {
                                    const colDiv = document.createElement('div');
                                    colDiv.className = 'arch-col';

                                    colData.forEach((boxHtml, i) => {
                                        const box = document.createElement('div');
                                        box.className = 'arch-box';
                                        box.innerHTML = boxHtml;
                                        colDiv.appendChild(box);

                                        if (i < colData.length - 1) {
                                            const arrow = document.createElement('div');
                                            arrow.className = 'arch-arrow-down';
                                            colDiv.appendChild(arrow);
                                        }
                                    });
                                    rowDiv.appendChild(colDiv);
                                });
                            } else {
                                // Full Width Box
                                const box = document.createElement('div');
                                const isHighlight = typeof row === 'object' && row.highlight;
                                const content = typeof row === 'object' ? row.text : row;

                                box.className = isHighlight ? 'arch-box highlight' : 'arch-box';
                                box.style.maxWidth = "400px";
                                box.innerHTML = content;
                                rowDiv.appendChild(box);
                            }

                            element.appendChild(rowDiv);

                            if (index < item.value.length - 1) {
                                const mainArrow = document.createElement('div');
                                mainArrow.className = 'arch-arrow-down';
                                element.appendChild(mainArrow);
                            }
                        });
                        break;

                    case 'list':
                        element = document.createElement('ul');
                        element.className = 'space-y-3 my-6 text-[#16404D]/80 font-light';
                        item.value.forEach(text => {
                            const li = document.createElement('li');
                            li.className = 'custom-list-item';
                            li.innerHTML = text;
                            element.appendChild(li);
                        });
                        break;
                }

                // Append the created element to the main container
                if (element) {
                    container.appendChild(element);
                }
            });
        }

        // 3. Footer Spacer
        const footer = document.createElement('div');
        // CHANGED: Reduced h-32 -> h-12
        footer.className = 'h-12';
        container.appendChild(footer);

        // Initialize lightbox for all images in this container
        initializeLightboxForContainer(container);
    }

    // ========================================================
    // ================ IMAGE LIGHTBOX GALLERY ================
    // ========================================================

    function initializeLightboxForContainer(container) {
        const images = Array.from(container.querySelectorAll('img'));
        if (images.length === 0) return;

        images.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(images, index);
            });
        });
    }

    let lightboxOpen = false;
    let currentLightboxImages = [];
    let currentLightboxIndex = 0;
    let lightboxZoomed = false;
    let lightboxTranslateX = 0;
    let lightboxTranslateY = 0;

    function openLightbox(images, startIndex) {
        currentLightboxImages = images;
        currentLightboxIndex = startIndex;
        lightboxOpen = true;

        const lightbox = document.getElementById('imageLightbox');
        const lightboxImg = document.getElementById('lightboxImage');
        const counter = document.getElementById('lightboxCounter');

        lightboxImg.src = images[startIndex].src;
        lightboxImg.alt = images[startIndex].alt || '';
        counter.textContent = `${startIndex + 1} / ${images.length}`;

        lightbox.classList.add('is-visible');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        const lightbox = document.getElementById('imageLightbox');
        lightbox.classList.remove('is-visible');
        document.body.style.overflow = '';
        lightboxOpen = false;
        resetLightboxZoom();
    }

    function showLightboxImage(index) {
        if (index < 0) index = currentLightboxImages.length - 1;
        if (index >= currentLightboxImages.length) index = 0;

        currentLightboxIndex = index;
        const lightboxImg = document.getElementById('lightboxImage');
        const counter = document.getElementById('lightboxCounter');

        lightboxImg.src = currentLightboxImages[index].src;
        lightboxImg.alt = currentLightboxImages[index].alt || '';
        counter.textContent = `${index + 1} / ${currentLightboxImages.length}`;
        resetLightboxZoom();
    }

    function nextLightboxImage() {
        showLightboxImage(currentLightboxIndex + 1);
    }

    function prevLightboxImage() {
        showLightboxImage(currentLightboxIndex - 1);
    }

    function toggleLightboxZoom(e) {
        const lightboxImg = document.getElementById('lightboxImage');

        if (!lightboxZoomed) {
            const rect = lightboxImg.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;

            lightboxImg.style.transform = 'scale(2.5)';
            lightboxImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
            lightboxImg.classList.add('zoomed');
            lightboxZoomed = true;
        } else {
            resetLightboxZoom();
        }
    }

    function resetLightboxZoom() {
        const lightboxImg = document.getElementById('lightboxImage');
        lightboxImg.style.transform = 'scale(1)';
        lightboxImg.style.transformOrigin = 'center';
        lightboxImg.classList.remove('zoomed');
        lightboxZoomed = false;
        lightboxTranslateX = 0;
        lightboxTranslateY = 0;
    }

    // Lightbox event listeners - Set up immediately
    const closeLightboxBtn = document.getElementById('closeLightbox');
    const nextBtn = document.getElementById('nextImage');
    const prevBtn = document.getElementById('prevImage');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightbox = document.getElementById('imageLightbox');

    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextLightboxImage();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevLightboxImage();
        });
    }

    if (lightboxImg) {
        lightboxImg.addEventListener('click', toggleLightboxZoom);
    }

    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightboxOpen) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLightboxImage();
        if (e.key === 'ArrowLeft') prevLightboxImage();
    });

    // Pan when zoomed
    let isPanning = false;
    let startX = 0, startY = 0;

    if (lightboxImg) {
        lightboxImg.addEventListener('mousedown', (e) => {
            if (lightboxZoomed) {
                isPanning = true;
                startX = e.clientX - lightboxTranslateX;
                startY = e.clientY - lightboxTranslateY;
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (isPanning && lightboxZoomed) {
                lightboxTranslateX = e.clientX - startX;
                lightboxTranslateY = e.clientY - startY;
                lightboxImg.style.transform = `scale(2.5) translate(${lightboxTranslateX}px, ${lightboxTranslateY}px)`;
            }
        });

        document.addEventListener('mouseup', () => {
            isPanning = false;
        });

        // Touch support
        let touchStartX = 0;
        let touchStartY = 0;
        let isSwiping = false;

        lightboxImg.addEventListener('touchstart', (e) => {
            if (lightboxZoomed) {
                const touch = e.touches[0];
                touchStartX = touch.clientX - lightboxTranslateX;
                touchStartY = touch.clientY - lightboxTranslateY;
            } else {
                touchStartX = e.touches[0].clientX;
                isSwiping = true;
            }
        });

        lightboxImg.addEventListener('touchmove', (e) => {
            if (lightboxZoomed) {
                const touch = e.touches[0];
                lightboxTranslateX = touch.clientX - touchStartX;
                lightboxTranslateY = touch.clientY - touchStartY;
                lightboxImg.style.transform = `scale(2.5) translate(${lightboxTranslateX}px, ${lightboxTranslateY}px)`;
            }
        });

        lightboxImg.addEventListener('touchend', (e) => {
            if (!lightboxZoomed && isSwiping) {
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > 50) {
                    if (diff > 0) nextLightboxImage();
                    else prevLightboxImage();
                }
            }
            isSwiping = false;
        });
    }



    /* ---------- Project Selector ---------- */
    function initProjectSelector() {
        const panels = Array.from(track.querySelectorAll('.project-panel'));
        if (!panels.length) return null;

        const existing = document.getElementById('project-selector');
        if (existing) existing.remove();

        const selector = document.createElement('nav');
        selector.id = 'project-selector';
        selector.className = 'project-selector';
        selector.setAttribute('aria-label', 'Project selection');

        const selectorTrack = document.createElement('div');
        selectorTrack.className = 'project-selector-track';

        const indicator = document.createElement('span');
        indicator.className = 'project-selector-indicator is-hidden';
        selectorTrack.appendChild(indicator);

        const buttons = panels.map((panel, index) => {
            const project = projects[index];
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'project-selector-btn';
            btn.setAttribute('aria-label', `Go to ${project.title}`);
            btn.innerHTML = `
                <span>${String(index + 1).padStart(2, '0')}</span>
                <span class="selector-label">${project.title}</span>
            `;

            btn.addEventListener('click', () => {
                if (window.innerWidth >= 768) {
                    targetScroll = panel.offsetLeft;
                    scrollContainer.scrollTo({ left: targetScroll, behavior: 'smooth' });
                } else {
                    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                setActive(index, true);
            });

            selectorTrack.appendChild(btn);
            return btn;
        });

        selector.appendChild(selectorTrack);
        document.body.appendChild(selector);

        let selectedIndex = -1;
        let lastTranslateX = 0;

        function setActive(nextIndex, animate = false) {
            if (nextIndex < 0 || nextIndex >= buttons.length) {
                selectedIndex = -1;
                indicator.classList.add('is-hidden');
                buttons.forEach((button) => {
                    button.classList.remove('is-active');
                    button.removeAttribute('aria-current');
                });
                return;
            }

            const firstButtonOffset = buttons[0].offsetLeft;
            const targetX = buttons[nextIndex].offsetLeft - firstButtonOffset;
            const shouldAnimate = animate && selectedIndex !== -1 && selectedIndex !== nextIndex;

            indicator.classList.remove('is-hidden');
            indicator.style.transform = `translateX(${targetX}px)`;

            if (shouldAnimate && typeof indicator.animate === 'function') {
                indicator.animate(
                    [
                        { transform: `translateX(${lastTranslateX}px) scale(0.82, 1)` },
                        { transform: `translateX(${targetX}px) scale(1.16, 1)` },
                        { transform: `translateX(${targetX}px) scale(1, 1)` }
                    ],
                    { duration: 440, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
                );
            }

            buttons.forEach((button, idx) => {
                if (idx === nextIndex) {
                    button.classList.add('is-active');
                    button.setAttribute('aria-current', 'true');
                } else {
                    button.classList.remove('is-active');
                    button.removeAttribute('aria-current');
                }
            });

            selectedIndex = nextIndex;
            lastTranslateX = targetX;
        }

        function closestPanelFromScroll() {
            if (window.innerWidth < 768) return -1;
            if (activeIndex !== -1) return activeIndex;

            const introSection = scrollContainer.querySelector('section');
            if (!introSection) return 0;

            const introWidth = introSection.offsetWidth;
            const leftEdge = scrollContainer.scrollLeft + 24;
            if (leftEdge < introWidth) return -1;

            const viewportCenter = scrollContainer.scrollLeft + (scrollContainer.clientWidth / 2);
            let closestIndex = 0;
            let minDistance = Number.POSITIVE_INFINITY;

            panels.forEach((panel, index) => {
                const panelCenter = panel.offsetLeft + (panel.offsetWidth / 2);
                const distance = Math.abs(panelCenter - viewportCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });

            return closestIndex;
        }

        function sync() {
            setActive(closestPanelFromScroll(), false);
        }

        scrollContainer.addEventListener('scroll', sync, { passive: true });
        window.addEventListener('resize', sync);
        requestAnimationFrame(sync);

        return { setActive, sync };
    }

    selectorApi = initProjectSelector();
});

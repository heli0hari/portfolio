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
            { type: 'image', value: { src: 'images/dubtransit/dubtitlescreen.jpg', alt: 'Title card showing "transport network" over a visualization of interconnected bubbles.' }  },

            { type: 'paragraph', value: "DubTransit is a mobile application built to unify Dublin’s fragmented public transport information into one clear, minimal, and elegant experience." },
            { type: 'paragraph', value: "The app combines:" },
            { type: 'list', value: [
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
            ]},
            { type: 'heading', value: 'Problem & Opportunity' },
            { type: 'subheading', value: "Dublin’s transport experience is often fragmented:" },
            { type: 'list', value: ["-Outdated interfaces and inconsistent behaviour",
                                    "-Live location accuracy issues",
                                    "-Limited route discovery",
                                    "-No contextual travel info (weather, events, delays)"]},
            { type: 'subheading', value: 'User Research Findings' },
            { type: 'list', value: ["-Commuters want quick and simple route lookup (bus numbers, origins/destinations).",
                                    "-People check real-time bus status frequently.",
                                    "-Dublin residents rely on Google Maps, but hate its delay unpredictability.",
                                    "-Users want alerts before problems happen.",
                                    "-Weather affects travel significantly"]},
            { type: 'image', value: { src: 'images/dubtransit/dublinstpatrick.jpg', alt: "Traffic control during St Patrick's day" } },
            { type: 'subheading', value: "Opportunity" },  
            { type: 'paragraph', value: "Create a single, friendly, modern app that integrates routing, AI guidance, alerts, weather, and live tracking together." },
            { type: 'heading', value: 'Design Process & UX Approach' },
            { type: 'subheading', value: "User Requirements" },
            { type: 'paragraph', value: "Through informal interviews with students, workers, and migrants in Dublin, I identified key priorities:" },
            { type: 'lined-list', value: ["“Just show me where the bus is.”",
                                    "“I don’t want to figure out inbound/outbound.”",
                                    "“I just want a clean app that works.”",
                                    "“Weather screws up my commute, tell me beforehand.”"]},
            { type: 'paragraph', value: "These insights shaped the core flows." },
            { type: 'subheading', value: "Information Architecture & Key Screens" },
            { type: 'image', value: { src: 'images/dubtransit/dubmockup.jpg', alt: "Mockup screens of the app" } },
            { type: 'paragraph', value: "1. Routes Directory" },
            { type: 'paragraph', value: "A minimal search-first interface that lets users quickly find routes by number or name." },
            { type: 'box-list', value: ["Clear typography",
                                        "Line-colour coding",
                                        "Simple forward/backward direction labels (“A → B”, “B → A”)"]},
            { type: 'paragraph', value: "2. Live Map & Tracking" },
            { type: 'paragraph', value: "A full-screen map visualizing:" },
            { type: 'box-list', value: ["Bus stop markers",
                                        "Route polylines",
                                        "Live (or simulated) bus positions",
                                        "Smooth marker animation for realism"]},
            { type: 'paragraph', value: "3. Service Alerts" },
            { type: 'paragraph', value: "Supports categories:" },
            { type: 'box-list', value: ["GENERAL",
                                        "EVENT",
                                        "ACCIDENT",
                                        "WEATHER"]},
            { type: 'paragraph', value: "4. AI Journey Planner" },
            { type: 'paragraph', value: "An interface where users type the current location and destination location. The AI responds with:" },
            { type: 'box-list', value: ["Multi-modal journey",
                                        "Clear step-by-step navigation",
                                        "Estimated travel time",
                                        "Weather at departure and arrival",
                                        "Notes about delays or events"]},
            { type: 'paragraph', value: "5. Empty States & Loading Screens" },
            { type: 'paragraph', value: "Designed intentionally to reduce anxiety and create trust:" },
            { type: 'box-list', value: ["Encouraging microcopy",
                                        "Soft colour palette",
                                        "Clean visuals"]},
            { type: 'heading', value: 'System Architecture' },
            { type: 'ascii', value: `
                                    ┌──────────────────────────┐
                                    │        Mobile App        │
                                    │ (DubTransit React Native)│
                                    └──────────────┬───────────┘
                                                   │
                 ┌─────────────────────────────────┼─────────────────────────────────┐
                 │                                 │                                 │
  Crowdsource GPS│                                 │Route & Stop Search              │AI Journey Planner
   Data Upload   │                                 │                                 │
                 ▼                                 ▼                                 ▼
       ┌───────────────────┐                 ┌─────────────────┐                 ┌───────────────────┐
       │User Location (GPS)│                 │   User Query:   │                 │Origin/Destination │
       │    With Consent   │                 │ "Bus 15", "UCD" │                 │    + Metadata     │
       └─────────┬─────────┘                 └────────┬────────┘                 └─────────┬─────────┘
                 │                                    │                                    │
                 ▼                                    ▼                                    ▼
       ┌────────────────────┐              ┌──────────────────────┐             ┌────────────────────┐
       │Crowd Data Formatter│              │Firestore Routes/Stops│             │Gemini AI Processor │
       │   (Anonymizer)     │              │     (GTFS Static)    │             │Journey Reasoning   │
       └─────────┬──────────┘              └─────────┬────────────┘             └─────────┬──────────┘
                 │                                   │                                    │
                 │                                   │                                    │
                 ▼                                   ▼                                    ▼
       ┌─────────────────────┐             ┌──────────────────────┐             ┌──────────────────────────────┐
       │  Crowdsourced Bus   │             │ GTFS-Realtime Feed   │             │  Weather API: Open-Meteo     │
       │  Position Database  │◀──────┐     │ Vehicle positions    │             │  - Current weather (origin)   │
       └─────────┬───────────┘       │     │ (official but        │             │  - Forecast (arrival time)   │
                 │                   │     │ sometimes inaccurate)│             └───────────┬──────────────────┘
                 ▼                   │     └──────────┬───────────┘                         │
       ┌──────────────────────┐      │                │                                     │
       │Crowd Data Smoothing  │◀─────┘     ┌──────────▼───────────┐                         │
       │ & Interpolation      │            │ Data Fusion Engine   │◀───────────────────────┘
       └─────────┬────────────┘            │ (Crowd + GTFSR Merge) │
                 │                         └───────────┬───────────┘
                 │                                     │
                 ▼                                     ▼
       ┌────────────────────────┐          ┌────────────────────────┐
       │ Live Bus Position API  │─────────▶│     Map Renderer       │
       │    (Unified Source)    │          │ Route Polyline + Stops │
       └────────────────────────┘          │ Bus Animations (Smooth)│
                                           └───────────┬────────────┘
                                                       │
                                                       ▼
                                          ┌──────────────────────────┐
                                          │ AI Journey Planner Output│
                                          │   ETA + Weather + Steps  │
                                          └──────────────────────────┘`
            },
            { type: 'heading', value: 'Visual Design Language' },
            { type: 'paragraph', value: "I chose a dark, modern UI with a yellow similar to the Dublin bus color (#E3CC00) as the primary accent." },
            { type: 'image', value: { src: 'images/dubtransit/dubcolor.jpg', alt: "Colorscheme for the app" } },
            { type: 'subheading', value: "Reasons:" },
            { type: 'list', value: ["High visibility",
                                    "Works great on OLED screens",
                                    "Creates strong brand identity"]},
            { type: 'heading', value: 'Prototyping & Iteration' },
            { type: 'paragraph', value: "I iterated through several cycles:" },
            { type: 'list', value: [`<span class="icon-wrapper">
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
                 <span>Enhanced the weather integration after feedback (“show arrival weather too”)</span>`]},
            { type: 'subheading', value: 'AI-Assisted Prototyping Process' },
            { type: 'paragraph', value: "This prototype heavily used AI tools during iteration:" },
            { type: 'list', value: ["Google AI Studio — initial drafts of features & logic",
                                    "DeepSeek — refining data structures, simulation logic, and route handling",
                                    "ChatGPT — final refinements, debugging, API integration, UX adjustments",]},
            { type: 'image', value: { src: 'images/dubtransit/dubaiuses.jpg', alt: "Usage of Google AI Studio for the development" } },
            { type: 'paragraph', value: "AI helped speed up prototyping, letting me focus on design and experience rather than spending too much time on development." },
            { type: 'heading', value: 'Live Prototype' },
            { type: 'paragraph', value: "To make Dub.Transit accessible directly from the browser, I created a web-based preview of the app. This allows the viewers to interact with the interface without installing the Android app." },
            { type: 'mobile-demo', value: 'https://dublintransporttracker.netlify.app' },
            { type: 'box-list', value: ['You can also <a href="https://dublintransporttracker.netlify.app" target="_blank" rel="noopener noreferrer" class="underline hover:text-[#DDA853]">open the app in a new tab</a> to explore it fully.'] },
            { type: 'paragraph', value: "The current version preserves the overall UX, typography, and component layout so viewers can understand the design system." },
            { type: 'heading', value: 'Advanced Features' },
            { type: 'subheading', value: `<span class="icon-wrapper">
                    <svg viewBox="0 0 24 24"><path d="M12 2v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="M20 12h2"></path><path d="m19.07 4.93-1.41 1.41"></path><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"></path><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"></path></svg>
                 </span>
                 <span>Weather Integration</span>`},
            { type: 'paragraph', value: "Using Open-Meteo, the app fetches: Current temperature, Feels-like, Rain probability, Wind, Weather at arrival time, for journey planning This allows the AI to adjust trip suggestions (e.g., “Expect rain when you arrive at St. Stephen’s Green”)." },
            { type: 'image', value: { src: 'images/dubtransit/dubweather.jpg', alt: "Screen showing weather details at the current location and destination location" } },
            { type: 'subheading', value: `<span class="icon-wrapper">
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
            { type: 'box-list', value: ["often inconsistent or delayed",
                                    "missing direction accuracy",
                                    "expensive or restricted for developers",
                                    "unreliable for smaller-scale apps",
                                    "out of scope for a prototype project"]},
            { type: 'paragraph', value: "Although GTFS-Realtime is a standard, its accuracy in Dublin varies, and buses frequently jump, freeze, or move in the wrong direction, which is exactly what I experienced while testing." },    
            { type: 'paragraph', value: "Crowdsourcing solves this by decentralizing the live tracking system, similar to how Waze collects real-world traffic data from its drivers." },
            { type: 'subheading', value: 'How the Crowdsourced System Works?' },    
            { type: 'paragraph', value: "With user consent, the app would:" },
            { type: 'list', value: [`<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Detect when a passenger is inside a bus (based on movement patterns + manual confirmation).</span>`,
                                    `<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Upload minimal, anonymous data such as:</span>`,]},
            { type: 'box-list', value: ["GPS location",
                                        "Route number",
                                        "Timestamp"]},   
            { type: 'list', value: [`<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Combine data from multiple passengers on the same route.</span>`,
                                    `<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Smooth and interpolate positions on the backend to produce a highly accurate, real-time view.</span>`,]},
            { type: 'subheading', value: 'Privacy-Preserving Design' },
            { type: 'lined-list', value: ["No personal identity stored",
                                        "No background tracking unless explicitly enabled",
                                        "Data expires and is deleted automatically after a few minutes",
                                        "Users opt-in on a per-trip basis"]},  
            { type: 'heading', value: 'Limitations & Technical Challenges' },
            { type: 'paragraph', value: "Crowdsourcing isn’t magic, it introduces a new set of challenges:" },
            { type: 'list', value: [`<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Requires a critical mass of active users</span>`,]},
                 { type: 'paragraph', value: "--(early versions may have sparse tracking)" },
            { type: 'list', value: [`<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Data quality varies</span>`,]},
                 { type: 'paragraph', value: "--(e.g., inaccurate GPS, people on the wrong bus)" },
            { type: 'list', value: [`<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Requires server-side smoothing</span>`,]},
                 { type: 'paragraph', value: "--(Kalman filtering, interpolation, direction correction)" },
            { type: 'list', value: [`<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>Detecting whether a user is genuinely on a bus</span>`,]},
                 { type: 'paragraph', value: "--(signal patterns, speed, or manual confirmation)" },
            { type: 'list', value: [`<span class="icon-wrapper">
                                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle></svg>
                                        </span>
                 <span>User outreach is essential</span>`,]},
                 { type: 'paragraph', value: "--The quality of tracking depends directly on the number of participants." },
            { type: 'paragraph', value: "I present these limitations openly as part of the project’s honest, real-world constraints." },
            { type: 'heading', value: 'Prototype Status & Future Improvements' },
            { type: 'subheading', value: 'The current version of DubTransit is a functional prototype, with:' },
            { type: 'box-list', value: ["fully working AI-powered journey planner (Gemini API)",
                                    "Weather-aware routing using Open-Meteo",
                                    "Working route search, stop lookup, and route shapes",   
                                    "Simulated live buses moving along real route geometry",
                                    "Cross-platform mobile UI built in React Native"
                                    ]},
            { type: 'subheading', value: 'What’s next?' },
            { type: 'paragraph', value: "Here’s the roadmap for turning this into a full production app:" },
            { type: 'ascii', value: `
                        ┌───────────────────────────────────┐
                        │        DUB.TRANSIT ROADMAP        │
                        └───────────────────────────────────┘

                                        │
                                        ▼
                      ┌───────────────────────────────────────┐
                      │            SHORT-TERM GOALS           │
                      └───────────────────────────────────────┘
                                        │
     ┌──────────────────────────────────┼──────────────────────────────────┐
     │                                  │                                  │
     ▼                                  ▼                                  ▼
┌──────────────┐                ┌────────────────┐                ┌──────────────────┐
│ Crowdsourced │                │ Push           │                │ Real GTFS-R      │
│ GPS Backend  │                │ Notifications  │                │ Integration      │
│ (User Opt-in)│                │ (Delays, ETA)  │                │ (with fallback)  │
└──────────────┘                └────────────────┘                └──────────────────┘
     │                                  │                                  │
     ▼                                  ▼                                  ▼
┌──────────────┐                ┌────────────────┐                ┌──────────────────┐
│ Offline      │                │ Improved       │                │ Smarter AI       │
│ Caching      │                │ Onboarding     │                │ Journey Tuning   │
└──────────────┘                └────────────────┘                └──────────────────┘


                                        │
                                        ▼
                      ┌───────────────────────────────────────┐
                      │            LONG-TERM GOALS            │
                      └───────────────────────────────────────┘
                                        │
     ┌──────────────────────────────────┼──────────────────────────────────┐
     │                                  │                                  │
     ▼                                  ▼                                  ▼
┌─────────────────┐            ┌───────────────────────┐        ┌────────────────────────┐
│ Real-Time       │            │ Predictive Congestion │        │ ML Delay Prediction    │
│ Multimodal Plan │            │ Models                │        │ Models (Historical +   │
│ (Bus+Luas+DART) │            │                       │        │ Crowdsourced Data)     │
└─────────────────┘            └───────────────────────┘        └────────────────────────┘
     │                                  │                                  │
     ▼                                  ▼                                  ▼
┌──────────────────────────┐  ┌──────────────────────────┐  ┌──────────────────────────┐
│ WearOS / Apple Watch     │  │ Partnerships With Dublin │  │ Scale Infrastructure     │
│ Companion Experience     │  │ Transport Agencies       │  │ For City-Wide Adoption   │
└──────────────────────────┘  └──────────────────────────┘  └──────────────────────────┘`
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
            { type: 'image', value: { src: 'images/City/City_Title.jpg', alt: 'Title card showing "City, Beneath the Surface" over a visualization of interconnected bubbles.' }  },
            { type: 'quote', value: "“No work is insignificant. All labor that uplifts humanity has dignity and importance and should be undertaken with painstaking excellence.”", author: "Martin Luther King Jr." },
            { type: 'heading', value: 'Project Overview' },
            { type: 'paragraph', value: "City, Beneath the Surface is a data-driven interactive installation that reframes how we perceive care-based labor in cities. It visualizes the hidden hierarchies of essential workers — bus drivers, waste collectors, maintenance crews, and others — as dynamic bubble networks, transforming public sentiment and contextual data into living, responsive visuals.  \n\nBy situating the installation in everyday public spaces (bus stops, train stations), the project brings recognition to often unseen labor, sparking reflection on the value of those who sustain urban life." },
            { type: 'heading', value: 'Context & Motivation' },
            { type: 'list', value: ["Growing up in India, I observed cultural stigma toward manual and public-facing labor, often framed as “low-status” work.",
                                    "In contrast, while studying in Dublin, I noticed greater respect and infrastructural support for these workers, yet still a lack of emotional recognition.",
                                    "This project became both a personal reconciliation and a design intervention, aiming to shift public narratives by making invisible labor visible"]},
            { type: 'image', value: { src: 'images/City/City_Personal.jpg', alt: "Photograph of a street in India with visible waste, illustrating the project's personal motivation." } },
            { type: 'quote', value: "“YOU WILL END UP PICKING TRASH, IF YOU DON'T STUDY WELL”", author: "A Random Teacher from My School" },
            { type: 'heading', value: 'Problem Statement' },
            { type: 'paragraph', value: "Despite being essential, care-based workers remain socially undervalued. Public frustration with systemic failures is often misdirected toward visible figures like drivers or cleaners, reinforcing stigma and invisibility" },
            { type: 'heading', value: 'Research Question' },
            { type: 'paragraph', value: "How might contextual data visualization be used to reframe public narratives surrounding care-based labor?" },
            { type: 'image', value: { src: 'images/City/City_Ran.jpg', alt: "A person interacting with the 'City, Beneath the Surface' installation on a large public screen." } },
            { type: 'heading', value: 'Objectives' },
            { type: 'list', value: ["Expose the hidden tiers of labor that sustain the city.",
                                    "Collect and visualize sentiment data around urban workers.",
                                    "Build a responsive installation that shifts based on public interaction.",
                                    "Challenge stigma by connecting emotions, data, and design."]},
            { type: 'heading', value: 'Design Concept' },
            { type: 'image', value: { src: 'images/City/City_Diag.jpg', alt: "Diagram illustrating the project's design concept: data input leads to interactive visualization and an AR layer." } },
            { type: 'list', value: ["Dynamic Bubbles: Each sector of urban labor (waste, water, transport, construction, electrical, sanitation, emergency, etc.) is represented as a parent bubble. Roles and sub-roles emerge around it, creating a living hierarchy of workers.",
                                    "Network Visualization: The installation shows how different sectors connect and interdepend to keep the city functioning, emphasizing systemic collaboration rather than isolated roles.",
                                    "Public Interaction: Users can tap or click bubbles to reveal details about roles, responsibilities, and worker counts within each sector.",
                                    "Augmented Reality Layer: In the mobile app, the AR view links the virtual system to real-world objects. For example, pointing at a bus, trash can, or streetlight reveals the associated bubble, its sector, and data about the number of workers behind it.",
                                    "Atmosphere: Idle animations and floating motion give the system a “living” quality, symbolizing the ongoing, often unnoticed work beneath the city."]},
            { type: 'heading', value: 'Theoretical Frameworks' },
            { type: 'list', value: ["Everyday Life and Cultural Theory (Ben Highmore) → Centers ordinary, undervalued labor as culturally significant."]},
            { type: 'image', value: { src: 'images/City/City_T1.jpg', alt: "Slide explaining the theoretical framework of 'Everyday Life and Cultural Theory by Ben Highmore'." } },
            { type: 'list', value: ["Maintenance and Care (Shannon Mattern) → Frames maintenance as essential, emotional, and infrastructural labor."]},
            { type: 'image', value: { src: 'images/City/City_T2.jpg', alt: "Slide explaining the theoretical framework of 'Maintenance and Care by Shannon Mattern'." } },
            { type: 'list', value: ["Convergence Culture (Henry Jenkins) → Informs how public narratives and digital participation shape collective meaning."]},
            { type: 'image', value: { src: 'images/City/City_T3.jpg', alt: "Slide explaining the theoretical framework of 'Convergence Culture by Henry Jenkins'." } },
            { type: 'paragraph', value: "<em>These frameworks guided the design in making invisible work visible, reframing workers not just as functional roles but as vital cultural and social contributors.</em>"},
            { type: 'heading', value: 'Tools & Development' },
            { type: 'list', value: ["Early Prototyping: Initial concepts tested in p5.js to explore visual states and interaction ideas. Some other concepts were also explored, using 3D models and map data of the city."]},
            { type: 'paragraph', value: "Prototype using map data and 3D models in blender" },
            { type: 'image', value: { src: 'images/City/City_Prot1.jpg', alt: "Early 3D prototype showing a map of a city with data points rendered in Blender." } },
            { type: 'paragraph', value: "Second Prototype using p5.js" },
            { type: 'image', value: { src: 'images/City/City_Prot2.jpg', alt: "Screenshot of a p5.js prototype with colorful circular data points on a dark background." } },
            { type: 'list', value: ["Final Implementation: Live Interactive Installation"]},
            { type: 'paragraph', value: "Built as a web-based interactive installation with an accompanying mobile AR app." },
            { type: 'list', value: ["Development Workflow: Iteratively coded using ChatGPT, Claude.ai, and Google AI Studio, with final refinements and debugging done manually."]},
            { type: 'image', value: { src: 'images/City/City_AI.jpg', alt: "Screenshot of code being generated using an AI tool, illustrating the project's development workflow." } },
            { type: 'list', value: ["Delivery Platforms: Public Installation → large screen or projection in transit hubs. Mobile Application → includes Hierarchy View and AR View linking bubbles to real-world city objects."]},
            { type: 'heading', value: 'User Journey - Storyboard' },
            { type: 'image', value: { src: 'images/City/City_User.jpg', alt: "A three-panel storyboard showing a user's journey from seeing the installation to interacting with it." } },
            { type: 'heading', value: 'Final Output' },
            { type: 'list', value: ["Mobile AR App UI Prototypes: Extends the installation into everyday life, letting users scan familiar city objects to uncover the workers and systems behind them.",]},
            { type: 'image', value: { src: 'images/City/City_App.jpg', alt: "UI mockups of the mobile AR app, showing the hierarchy view and the camera-based AR view." } },
            { type: 'list', value: ["Interactive Visualization: A responsive bubble system representing the city’s essential workers.",]},
            { type: 'iframe', value: { src: 'https://city-beneath-surface.netlify.app/', title: 'City, Beneath the Surface - Live Installation' } },
            { type: 'paragraph', value: 'You can also <a href="https://city-beneath-surface.netlify.app/" target="_blank" rel="noopener noreferrer" class="underline hover:text-[#DDA853]">open the installation in a new tab</a> to explore it fully.' },
            { type: 'list', value: ["Exhibition Setup: Designed for public spaces where passersby can engage with the installation and explore hidden labor systems.",
                                    "Message: Cities thrive because of invisible labor — this project transforms that invisibility into a visible, interactive network.",]},
            { type: 'heading', value: 'Reflection' },
            { type: 'paragraph', value: "This project taught me how design, data, and empathy can merge into impactful public interventions. It demonstrated:" },
            { type: 'list', value: ["The power of interactive visualization in making complex labor systems approachable and humanized.",
                                    "How accurate datasets (not just sentiment) can ground storytelling in realism while still keeping the experience poetic and engaging.",
                                    "The potential and limits of AI-assisted coding as a design partner, and the importance of taking creative control in the final refinements.",
                                    "The need to balance clarity and exploration, ensuring accessibility for the general public while keeping the experience compelling for institutions and stakeholders."]},
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
            { type: 'list', value: ["Fujifilm X-T5 + 30mm f/1.4 Lens"]},
            { type: 'paragraph', value: " Ideal for low-light detail, shallow depth of field, and capturing color fidelity in dim conditions." },
            { type: 'list', value: ["Sony A6400 + 18-55mm f/3.5–5.6"]},
            { type: 'paragraph', value: " Versatile for wider scenes, DJ booth shots, and dynamic zoom-in portraits." },
            { type: 'heading', value: 'Gallery' },
            { type: 'gallery', value: [
                { src: 'images/Christ/Christ_2.jpg', alt: 'Two people laughing together on the dance floor, bathed in warm ambient light.' },
                { src: 'images/Christ/Christ_3.jpg', alt: 'A high-energy shot of the crowd dancing, with motion blur capturing the movement.' },
                { src: 'images/Christ/Christ_4.jpg', alt: 'A singer performing on stage, silhouetted against bright concert lighting.' },
                { src: 'images/Christ/Christ_5.jpg', alt: 'An intimate moment of two friends talking away from the main dance floor.' }
            ]},
            { type: 'heading', value: 'Post-Processing' },
            { type: 'list', value: ["Color correction for ambient light consistency, using Adobe Lightroom", "Noise reduction selectively applied to maintain texture.", "Cropped for cinematic balance while preserving crowd energy."]},
            { type: 'paragraph', value: "This Christmas party series was more than just an exercise in event photography, it was a study in atmosphere, spontaneity, and human connections. Working in a challenging low-light environment pushed me to embrace the unpredictability of club lighting and focus on capturing raw, honest moments rather than posed perfections. The project reinforced the value of observation, knowing when to step in, when to wait, and how to let the ambient mood shape each frame. As a photographer, it reminded me that even in the most chaotic settings, there's always a story unfolding, if you’re willing to look for it." },
            { type: 'image', value: { src: 'images/Christ/Christ_6.jpg', alt: "A wide shot of the entire venue, showing the packed dance floor and festive decorations." } },
          ]
        }
      },
     
    ];

    document.addEventListener('DOMContentLoaded', () => {
        const loader = document.getElementById('loader');
        const mainContent = document.getElementById('main-content');
        const loaderCircle = document.getElementById('loader-circle');
        const circumference = loaderCircle.r.baseVal.value * 2 * Math.PI;
        loaderCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        loaderCircle.style.strokeDashoffset = circumference;
    
        function setProgress(percent) {
            const offset = circumference - (percent / 100) * circumference;
            loaderCircle.style.strokeDashoffset = offset;
        }

        function preloadImages(onProgress) {
            const imageSources = new Set();
            projects.forEach(p => {
                if (p.image) imageSources.add(p.image);
                if (p.imageDesktop) imageSources.add(p.imageDesktop);
                if (p.imageMobile) imageSources.add(p.imageMobile);
                
                p.details.content.forEach(item => {
                    if (item.type === 'image') {
                        imageSources.add(item.value.src);
                    }
                    if (item.type === 'gallery') {
                        item.value.forEach(imageData => imageSources.add(imageData.src));
                    }
                });
            });
            imageSources.add('images/Profile_image2.jpg');

            const sources = Array.from(imageSources);
            const totalImages = sources.length;
            let loadedImages = 0;

            if (totalImages === 0) return Promise.resolve();

            const promises = sources.map(src => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    const onFinish = () => {
                        loadedImages++;
                        const progress = (loadedImages / totalImages) * 100;
                        onProgress(progress);
                        resolve();
                    };
                    img.onload = onFinish;
                    img.onerror = onFinish; 
                });
            });
            return Promise.all(promises);
        }

        function initializeApp() {
            const pageBackdrop = document.getElementById('pageBackdrop');
            const cursorGlow = document.getElementById('cursor-glow');
            if (cursorGlow) {
                let touchTimer;

                const updateGlowPosition = (e) => {
                    const x = e.clientX || (e.touches && e.touches[0].clientX);
                    const y = e.clientY || (e.touches && e.touches[0].clientY);
                    
                    if (x === undefined) return;
                    
                    requestAnimationFrame(() => {
                        cursorGlow.style.left = `${x}px`;
                        cursorGlow.style.top = `${y}px`;
                    });
                };

                window.addEventListener('mousemove', updateGlowPosition);

                window.addEventListener('touchstart', (e) => {
                    clearTimeout(touchTimer);
                    updateGlowPosition(e);
                    cursorGlow.style.transition = 'transform 0s, opacity 0.1s ease-in';
                    cursorGlow.classList.add('is-active');
                }, { passive: true });

                window.addEventListener('touchend', () => {
                    cursorGlow.style.transition = 'opacity 0.4s ease-out';
                    touchTimer = setTimeout(() => {
                        cursorGlow.classList.remove('is-active');
                    }, 20);
                }, { passive: true });
            }
            
            const canvas = document.getElementById('particle-canvas');
            const ctx = canvas.getContext('2d');
            let particles = [];

            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 2.5 + 0.5;
                    this.speedX = (Math.random() * 1 - 0.5) * 0.5;
                    this.speedY = (Math.random() * 1 - 0.5) * 0.5;
                    this.color = 'rgba(22, 64, 77, 0.1)';
                }
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;

                    if (this.x < 0) this.x = canvas.width;
                    if (this.x > canvas.width) this.x = 0;
                    if (this.y < 0) this.y = canvas.height;
                    if (this.y > canvas.height) this.y = 0;
                }
                draw() {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            function initParticles() {
                const particleCount = Math.floor(canvas.width * canvas.height / 15000);
                particles = [];
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }
            initParticles();
            window.addEventListener('resize', initParticles);

            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].draw();
                }
                requestAnimationFrame(animateParticles);
            }
            animateParticles();

            const shapes = document.querySelectorAll('.shape');
            window.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const x = -(clientX / window.innerWidth - 0.5) * 60;
                const y = -(clientY / window.innerHeight - 0.5) * 60;

                shapes.forEach(shape => {
                    const speed = shape.getAttribute('data-speed');
                    shape.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
                });
            });

            const navWork = document.getElementById('navWork');
            const navAbout = document.getElementById('navAbout');
            const secWork = document.getElementById('work');
            const secAbout = document.getElementById('about');
            const workExperienceScroller = document.getElementById('workExperienceScroller');

            function show(page){
              if(page === 'work'){
                 secWork.classList.remove('page-hidden');
                 secAbout.classList.add('page-hidden');
                  navWork.classList.add('bg-[#A6CDC6]/40');
                  navAbout.classList.remove('bg-[#A6CDC6]/40');
                  document.body.classList.add('no-scroll','body-lock');
                  document.documentElement.classList.add('body-lock');
                  document.body.classList.remove('about-visible');
                } else {
                  secAbout.classList.remove('page-hidden');
                  secWork.classList.add('page-hidden');
                  navAbout.classList.add('bg-[#A6CDC6]/40');
                  navWork.classList.remove('bg-[#A6CDC6]/40');
                  document.body.classList.remove('no-scroll','body-lock');
                  document.documentElement.classList.remove('body-lock');
                  document.body.classList.add('about-visible');
                  
                  setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'instant' });
                      if (workExperienceScroller) {
                          workExperienceScroller.scrollTop = 0;
                      }
                  }, 0);
                }
            }

            navWork.addEventListener('click', () => show('work'));
            navAbout.addEventListener('click', () => show('about'));

            const flipbookWrapper = document.querySelector('.flipbook-wrapper');
            const flipbook = document.getElementById('flipbook');
            let currentIndex = 0;
            let projectCards = [];
            let isFlipping = false;

            projects.forEach((p, i) => {
                const card = document.createElement('div');
                card.className = 'project-card interactive-hint';
                if (i > 0) card.classList.add('is-next');
                const tagsHTML = p.tags.map(t => `<span class="px-2.5 py-1 rounded-full bg-[#FBF5DD]/30 backdrop-blur-sm border border-[#16404D]/20">${t}</span>`).join('');
                
                const imageHTML = p.imageDesktop 
                  ? `<img class="absolute inset-0 w-full h-full object-cover card-image-desktop" src="${p.imageDesktop}" alt="${p.title}" /><img class="absolute inset-0 w-full h-full object-cover card-image-mobile" src="${p.imageMobile}" alt="${p.title}" />`
                  : `<img class="absolute inset-0 w-full h-full object-cover" src="${p.image}" alt="${p.title}" />`;

                card.innerHTML = `
                    <div class="relative w-full h-full rounded-2xl overflow-hidden border border-[#16404D]/20 shadow-2xl shadow-black/20 group">
                        ${imageHTML}
                        <div class="absolute inset-0 bg-gradient-to-t from-[#FBF5DD] via-[#FBF5DD]/60 to-transparent"></div>
                        
                        <div class="arrow-indicator absolute top-0 left-0 h-full w-1/4 flex items-start pt-[25%] justify-start p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-black/20 to-transparent">
                          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"></path></svg>
                        </div>
                        <div class="arrow-indicator absolute top-0 right-0 h-full w-1/4 flex items-start pt-[25%] justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-l from-black/20 to-transparent">
                          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                        
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            <button data-index="${i}" class="open-project-btn inline-block text-base font-medium px-6 py-3 rounded-full bg-[#FBF5DD]/80 hover:bg-[#FBF5DD] border border-[#16404D]/20 backdrop-blur-md transition-all transform group-hover:scale-100 scale-90">View Details</button>
                        </div>

                        <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-[#16404D]">
                            <div class="flex justify-between items-start">
                                <h3 class="text-2xl font-semibold pr-4">${p.title} — ${p.category}</h3>
                                <span class="text-[#16404D]/70 text-sm whitespace-nowrap">${p.year}</span>
                            </div>
                            <p class="text-[#16404D]/80 mt-2 text-base overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${p.description}</p>
                            <div class="mt-4 flex flex-wrap gap-2 text-xs">${tagsHTML}</div>
                        </div>
                    </div>
                `;
                flipbook.appendChild(card);
                projectCards.push(card);
            });

            function setVH() {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            }
            setVH();
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', setVH);

            function flip(direction) {
                if (isFlipping) return;
                isFlipping = true;
                const currentCard = projectCards[currentIndex];
                const nextIndex = (direction === 'next')
                    ? (currentIndex + 1) % projects.length
                    : (currentIndex - 1 + projects.length) % projects.length;
                const nextCard = projectCards[nextIndex];
                nextCard.classList.remove('is-flipped', 'is-next');
                if (direction === 'next') {
                    nextCard.classList.add('is-next');
                }
                setTimeout(() => {
                    if (direction === 'next') {
                        currentCard.classList.add('is-flipped');
                    } else {
                        currentCard.classList.add('is-next');
                    }
                    nextCard.classList.remove('is-flipped', 'is-next');
                    currentIndex = nextIndex;
                }, 20);
                setTimeout(() => { isFlipping = false; }, 700);
            }

            document.getElementById('prevBtn').addEventListener('click', () => flip('prev'));
            document.getElementById('nextBtn').addEventListener('click', () => flip('next'));

            const projectOverlay = document.getElementById('projectOverlay');
            const overlayScrollWrapper = document.getElementById('overlayScrollWrapper');
            const closeOverlayBtn = document.getElementById('closeOverlay');
            const openProjectBtns = document.querySelectorAll('.open-project-btn');
            
            const imageLightbox = document.getElementById('imageLightbox');
            const lightboxContainer = document.getElementById('lightboxContainer');
            const lightboxImage = document.getElementById('lightboxImage');
            const closeLightboxBtn = document.getElementById('closeLightbox');
            const zoomInBtn = document.getElementById('zoomInBtn');
            const zoomOutBtn = document.getElementById('zoomOutBtn');
            const prevImageBtn = document.getElementById('prevImageBtn');
            const nextImageBtn = document.getElementById('nextImageBtn');
            
            const iframeLightbox = document.getElementById('iframeLightbox');
            const lightboxIframe = document.getElementById('lightboxIframe');
            const closeIframeLightboxBtn = document.getElementById('closeIframeLightbox');
            
            let scale = 1, isPanning = false, pointX = 0, pointY = 0, start = { x: 0, y: 0 }, initialPinchDistance = null;
            let currentLightboxImages = [];
            let currentLightboxIndex = 0;
            const pointerCache = [];

            function populateOverlay(project) {
                 overlayScrollWrapper.innerHTML = ''; 

                const titleEl = document.createElement('h2');
                titleEl.className = 'text-3xl font-bold mb-2';
                titleEl.textContent = project.title;
                overlayScrollWrapper.appendChild(titleEl);

                const categoryEl = document.createElement('p');
                categoryEl.className = 'text-sm text-[#DDA853] mb-6';
                categoryEl.textContent = project.category;
                overlayScrollWrapper.appendChild(categoryEl);

                project.details.content.forEach(item => {
                    let element;
                    switch (item.type) {
                        case 'heading':
                            element = document.createElement('h3');
                            element.className = 'text-xl font-semibold mt-8 mb-2';
                            element.textContent = item.value;

                            break;
                        case 'subheading':
                            element = document.createElement('h4');
                            // Slightly smaller than heading (text-lg), less bold (font-medium), distinct color
                            element.className = 'text-lg font-medium mt-6 mb-2 text-[#16404D] flex items-start gap-3'; 
                            element.textContent = item.value;
                            element.innerHTML = item.value;
                            break;
                        case 'paragraph':
                            element = document.createElement('p');
                            element.className = 'text-[#16404D]/80 leading-relaxed my-2';
                            element.innerHTML = item.value;
                            break;
                        case 'image':
                            element = document.createElement('img');
                            element.className = 'w-full h-auto rounded-lg my-6 lightbox-trigger';
                            element.src = item.value.src;
                            element.alt = item.value.alt;
                            break;
                        case 'box-list':
                            element = document.createElement('ul');
                            // Added 'justify-center' to align the boxes to the middle
                            element.className = 'flex flex-wrap gap-3 my-4 justify-center'; 
                            
                            item.value.forEach(text => {
                                const li = document.createElement('li');
                                li.className = 'px-4 py-2 border border-[#16404D]/20 rounded-lg text-sm text-[#16404D] bg-[#16404D]/5 font-medium leading-relaxed';
                                li.innerHTML = text;
                                element.appendChild(li);
                            });
                            break;
                        case 'lined-list':
                            element = document.createElement('div');
                            // We use the same border style as the quote: Gold left border, padding left
                            element.className = 'my-6 border-l-4 border-[#DDA853] pl-6 py-1'; 
                            
                            const ul = document.createElement('ul');
                            // 'space-y-3' adds breathing room between the list items
                            ul.className = 'space-y-3 text-[#16404D]/90'; 
                            
                            item.value.forEach(text => {
                                const li = document.createElement('li');
                                li.className = 'leading-relaxed text-base';
                                li.innerHTML = text;
                                ul.appendChild(li);
                            });
                            
                            element.appendChild(ul);
                            break;
                        case 'ascii':
                            element = document.createElement('pre'); // <pre> tag preserves whitespace
                            element.className = 'ascii-terminal';
                            element.textContent = item.value;
                            break;
                        case 'gallery':
                            element = document.createElement('div');
                            element.className = 'image-gallery';
                            item.value.forEach(imageData => {
                                const img = document.createElement('img');
                                img.src = imageData.src;
                                img.alt = imageData.alt;
                                img.className = 'lightbox-trigger';
                                element.appendChild(img);
                            });
                            break;
                        case 'quote':
                            element = document.createElement('blockquote');
                            element.className = 'my-6 border-l-4 border-[#DDA853] pl-4 italic text-lg text-[#16404D]/90';
                            const quoteText = String(item.value || '').replace(/^["“]|["”]$/g, '');
                            element.innerHTML = `“${quoteText}”` + (item.author ? `<footer class="mt-2 text-sm text-[#16404D]/60 text-right">— ${item.author}</footer>` : '');
                            break;
                        case 'video':
                            element = document.createElement('div');
                            element.className = 'video-container';
                            element.innerHTML = item.value;
                            break;
                        case 'iframe':
                            element = document.createElement('div');
                            element.className = 'iframe-wrapper';
                            element.innerHTML = `
                                <iframe src="${item.value.src}" title="${item.value.title}" loading="lazy"></iframe>
                                <button class="iframe-fullscreen-trigger" data-src="${item.value.src}" aria-label="Open in fullscreen">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m0 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m0 0v-4m0 4l-5-5"></path></svg>
                                </button>
                            `;
                            break;
                        case 'mobile-demo':
                            element = document.createElement('div');
                            element.className = 'mobile-demo-container';
                            element.innerHTML = `
                                <div class="mobile-bezel">
                                    <div class="mobile-screen">
                                        <iframe src="${item.value}" title="Live Mobile Prototype" allow="geolocation" loading="lazy"></iframe>
                                    </div>
                                </div>
                                <p class="text-center text-xs text-[#16404D]/50 mt-4 w-full absolute -bottom-8">Interact with the screen to test the app</p>
                            `;
                            // We need position relative on container for the caption to work nicely
                            element.style.position = 'relative'; 
                            break;
                        case 'sketchfab':
                            element = document.createElement('div');
                            element.innerHTML = item.value;
                            break;
                        case 'list':
                            element = document.createElement('ul');
                            element.className = 'space-y-2 my-4 text-[#16404D]/80 font-light';
                            item.value.forEach(text => {
                                const li = document.createElement('li');
                                li.className = 'custom-list-item'; 
                                li.innerHTML = text; // This allows the SVG to render
                                element.appendChild(li);
                            });
                            break;
                    }
                    if (element) {
                        overlayScrollWrapper.appendChild(element);
                    }
                });
            }

            // Updated openModal to handle URL updates
            function openModal(index, updateUrl = true) {
                const project = projects[index];
                populateOverlay(project);
                overlayScrollWrapper.scrollTop = 0;
                pageBackdrop.classList.add('is-visible');
                projectOverlay.classList.add('is-visible');
                document.documentElement.classList.add('body-lock');
                document.body.classList.add('body-lock');

                // Update the URL to include the project ID
                if (updateUrl) {
                    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?project=' + project.id;
                    window.history.pushState({ path: newUrl }, '', newUrl);
                }
            }

            // Updated closeModal to reset URL
            function closeModal(updateUrl = true) {
                pageBackdrop.classList.remove('is-visible');
                projectOverlay.classList.remove('is-visible');
                document.documentElement.classList.remove('body-lock');
                document.body.classList.remove('body-lock');

                // Reset URL to homepage
                if (updateUrl) {
                    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                    window.history.pushState({ path: newUrl }, '', newUrl);
                }
            }
            function updateTransform() {
                lightboxContainer.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
            }

            function resetLightboxTransform() {
                scale = 1; pointX = 0; pointY = 0; initialPinchDistance = null;
                lightboxContainer.style.transition = 'transform 0s';
                updateTransform();
                lightboxContainer.style.transition = 'transform 0.2s ease-out';
            }
            
            function showImageAtIndex(index) {
                currentLightboxIndex = index;
                lightboxImage.src = currentLightboxImages[index];
                resetLightboxTransform();
            }

            function showNextImage() {
                if (currentLightboxImages.length <= 1) return;
                const nextIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
                showImageAtIndex(nextIndex);
            }

            function showPrevImage() {
                if (currentLightboxImages.length <= 1) return;
                const prevIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
                showImageAtIndex(prevIndex);
            }

            function openLightbox(images, index) {
                currentLightboxImages = images;
                imageLightbox.classList.add('is-visible');
                
                if (images.length > 1) {
                    prevImageBtn.classList.remove('hidden');
                    nextImageBtn.classList.remove('hidden');
                } else {
                    prevImageBtn.classList.add('hidden');
                    nextImageBtn.classList.add('hidden');
                }
                showImageAtIndex(index);
            }

            function closeLightbox() {
                imageLightbox.classList.remove('is-visible');
            }

            // --- NEW FUNCTION: Normalize wheel/trackpad scroll delta ---
            function normalizeWheel(event) {
                let sY = 0;
                if (event.detail) { sY = event.detail; } 
                else if (event.wheelDelta) { sY = event.wheelDelta / -120; } 
                else if (event.deltaY) { sY = event.deltaY / 3; }
                
                // Mac trackpads send small, rapid values. This caps the value to prevent extreme jumps.
                return Math.min(Math.max(-1, sY), 1);
            }

            function handleZoom(delta, clientX, clientY) {
                const rect = lightboxContainer.getBoundingClientRect();
                const xs = (clientX - rect.left) / scale;
                const ys = (clientY - rect.top) / scale;
                // Use a smaller multiplier for a less sensitive zoom
                const newScale = Math.max(1, Math.min(5, scale * Math.exp(delta * 0.5)));
                pointX += (xs - pointX / scale) * (scale - newScale);
                pointY += (ys - pointY / scale) * (scale - newScale);
                scale = newScale;
                if (scale === 1) {
                    pointX = 0;
                    pointY = 0;
                }
                updateTransform();
            }

            function openIframeLightbox(src) {
                lightboxIframe.src = src;
                iframeLightbox.classList.add('is-visible');
            }

            function closeIframeLightbox() {
                iframeLightbox.classList.remove('is-visible');
                lightboxIframe.src = '';
            }
            
            // --- DEEP LINKING LOGIC START ---
            
            // 1. Check if URL has a project ID on load
            const urlParams = new URLSearchParams(window.location.search);
            const projectId = urlParams.get('project');
            
            if (projectId) {
                // Find the project with this ID
                const projectIndex = projects.findIndex(p => p.id === projectId);
                
                // If found, open it (false means don't push state, since we are already there)
                if (projectIndex !== -1) {
                    // Slight delay to allow animations/DOM to settle
                    setTimeout(() => {
                        openModal(projectIndex, false); 
                    }, 100);
                }
            }

            // 2. Handle Browser "Back" and "Forward" buttons
            window.addEventListener('popstate', (event) => {
                const params = new URLSearchParams(window.location.search);
                const pId = params.get('project');

                if (pId) {
                    const idx = projects.findIndex(p => p.id === pId);
                    if (idx !== -1) openModal(idx, false);
                } else {
                    // If no ID in URL, ensure modal is closed
                    if (projectOverlay.classList.contains('is-visible')) {
                        closeModal(false);
                    }
                }
            });
            // --- DEEP LINKING LOGIC END ---

            openProjectBtns.forEach(btn => btn.addEventListener('click', (e) => openModal(e.currentTarget.dataset.index)));
            closeOverlayBtn.addEventListener('click', closeModal);
            projectOverlay.addEventListener('click', (e) => { if (e.target === projectOverlay) closeModal(); });

            overlayScrollWrapper.addEventListener('click', (e) => {
                const trigger = e.target.closest('.lightbox-trigger');
                if (trigger) {
                    const allImagesInProject = Array.from(overlayScrollWrapper.querySelectorAll('.lightbox-trigger'));
                    const imagesSrc = allImagesInProject.map(img => img.src);
                    const clickedIndex = allImagesInProject.findIndex(img => img === trigger);
                    openLightbox(imagesSrc, clickedIndex);
                }
                if (e.target.closest('.iframe-fullscreen-trigger')) {
                    openIframeLightbox(e.target.closest('.iframe-fullscreen-trigger').dataset.src);
                }
            });

            closeLightboxBtn.addEventListener('click', closeLightbox);
            nextImageBtn.addEventListener('click', showNextImage);
            prevImageBtn.addEventListener('click', showPrevImage);
            zoomInBtn.addEventListener('click', () => handleZoom(0.2, window.innerWidth / 2, window.innerHeight / 2));
            zoomOutBtn.addEventListener('click', () => handleZoom(-0.2, window.innerWidth / 2, window.innerHeight / 2));
            
            // --- MODIFIED: Use the normalized wheel value ---
            imageLightbox.addEventListener('wheel', (e) => {
                e.preventDefault();
                const normalizedDelta = normalizeWheel(e);
                handleZoom(-normalizedDelta, e.clientX, e.clientY);
            }, { passive: false });


            function removePointer(e) {
                const index = pointerCache.findIndex(p => p.pointerId === e.pointerId);
                if (index > -1) pointerCache.splice(index, 1);
            }

            function stopPanning() {
                isPanning = false;
                initialPinchDistance = null;
                lightboxImage.classList.remove('is-panning');
            }

            imageLightbox.addEventListener('pointerdown', (e) => {
                pointerCache.push(e);
                if (pointerCache.length === 2) {
                    initialPinchDistance = Math.hypot(pointerCache[0].clientX - pointerCache[1].clientX, pointerCache[0].clientY - pointerCache[1].clientY);
                } else if (pointerCache.length === 1 && scale > 1) {
                    start = { x: e.clientX - pointX, y: e.clientY - pointY };
                    isPanning = true;
                    lightboxImage.classList.add('is-panning');
                }
            });

            imageLightbox.addEventListener('pointermove', (e) => {
                const index = pointerCache.findIndex(p => p.pointerId === e.pointerId);
                if (index > -1) pointerCache[index] = e;

                if (pointerCache.length === 2 && initialPinchDistance) {
                    const newPinchDistance = Math.hypot(pointerCache[0].clientX - pointerCache[1].clientX, pointerCache[0].clientY - pointerCache[1].clientY);
                    const delta = newPinchDistance - initialPinchDistance;
                    const centerX = (pointerCache[0].clientX + pointerCache[1].clientX) / 2;
                    const centerY = (pointerCache[0].clientY + pointerCache[1].clientY) / 2;
                    handleZoom(delta / 100, centerX, centerY);
                    initialPinchDistance = newPinchDistance;
                } else if (isPanning) {
                    pointX = e.clientX - start.x;
                    pointY = e.clientY - start.y;
                    updateTransform();
                }
            });

            imageLightbox.addEventListener('pointerup', (e) => { removePointer(e); stopPanning(); });
            imageLightbox.addEventListener('pointercancel', (e) => { removePointer(e); stopPanning(); });
            imageLightbox.addEventListener('pointerleave', (e) => { removePointer(e); stopPanning(); });
            
            closeIframeLightboxBtn.addEventListener('click', closeIframeLightbox);
            iframeLightbox.addEventListener('click', (e) => { if (e.target === iframeLightbox) closeIframeLightbox(); });

            document.addEventListener('keydown', (e) => {
                if (iframeLightbox.classList.contains('is-visible')) {
                    if (e.key === 'Escape') closeIframeLightbox();
                } else if (imageLightbox.classList.contains('is-visible')) {
                    if (e.key === 'Escape') closeLightbox();
                    if (e.key === 'ArrowRight') showNextImage();
                    if (e.key === 'ArrowLeft') showPrevImage();
                } else if (projectOverlay.classList.contains('is-visible')) {
                    if (e.key === 'Escape') closeModal();
                }
            });
        }
        
        preloadImages(setProgress)
            .then(() => {
                setTimeout(() => {
                    loader.classList.add('loader-hidden');
                    mainContent.classList.remove('opacity-0', 'invisible');
                    
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);

                    initializeApp();
                }, 300);
            })
            .catch(error => {
                console.error("Error preloading images:", error);
                loader.classList.add('loader-hidden');
                mainContent.classList.remove('opacity-0', 'invisible');
                initializeApp();
            });
    });
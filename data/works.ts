import { Work } from "@/schema/type";

enum Field {
    PERSONAL = "works",
    COLLABORATE = "collabs"
}

export const works: Work[] = [ 
    {
        id: "3d-ai-assistant",
        title: "Real-Time 3D AI Assistant: Graduation thesis, 94/100",
        author: "Trần Ngọc Đăng Khôi",
        description: "A 3D AI host you can talk to in the browser, with no install, GPU or VR headset. After reviewing seven existing avatar products (Synthesia, NVIDIA Audio2Face, Soul Machines, Convai and others) that were pre-rendered, GPU-bound or tied to Unreal/VR, I built a web-native alternative with three ready personas: interviewer, English teacher and assistant. The LLM acts as the avatar's director: one prompt-engineered call returns a strict JSON contract (speech, voice emotion, facial expression, gesture) that drives ElevenLabs TTS and Three.js animation, with lip-sync from a hand-built Rhubarb-to-Oculus viseme mapping. The host stops and listens when interrupted, shows a thinking pose while a reply is generated, and users bring their own API keys, so the platform carries no per-conversation AI cost. Evaluated with pilot users: 60 FPS rendering in Chrome, about 9 seconds from speech to reply for short answers, and a 96% valid-JSON rate (estimated).",
        headingImg: "/images/works/3d-ai-assistant/lipsync.jpg",
        stack: "Next.js, TypeScript, React Three Fiber, Three.js, Zustand, Groq (LLaMA 3.3 70B), ElevenLabs, Web Speech API, Prisma, PostgreSQL",
        linkAttached: {
            linkSource: "https://github.com/koitran14/Virtual-3D-Chatbot",
            SourceTitle: "Virtual-3D-Chatbot | GitHub",
        },
        platform: "Web (desktop browser)",
        field: Field.PERSONAL,
        publishYear: 2025,
        stats: [
            { value: "94/100", label: "thesis grade" },
            { value: "60", label: "FPS in Chrome" },
            { value: "~9s", label: "speech → reply" },
            { value: "3", label: "ready personas" },
        ],
        caseStudy: {
            headline: "Talk to a 3D AI host,\nright in the browser.",
            lead: "A real-time voice assistant with a face, built as my graduation thesis. No install, no GPU, no headset.",
            cover: "/images/works/3d-ai-assistant/cover.jpg",
            gap: {
                ours: "live, unscripted voice conversation in any modern browser.",
                lead: "Avatars could talk. None could hold a conversation.",
                items: [
                    { name: "Synthesia", issue: "pre-rendered video" },
                    { name: "NVIDIA Audio2Face", issue: "needs a dedicated GPU" },
                    { name: "Soul Machines", issue: "closed enterprise platform" },
                    { name: "Convai · MetaHuman", issue: "tied to Unreal Engine or VR" },
                ],
            },
            pipeline: {
                lead: "One LLM call directs the whole performance.",
                steps: [
                    { title: "Voice in", tech: "Web Speech API" },
                    { title: "LLM director", tech: "Groq · LLaMA 3.3 70B" },
                    { title: "Voice and visemes", tech: "ElevenLabs · Rhubarb" },
                    { title: "3D avatar", tech: "Three.js · 60 FPS" },
                ],
                sample: `{
  "message": "Hmm, are you sure that's the best approach?",
  "voiceMessage": "Hmm, are you sure that's the best approach?",
  "voiceEmotion": "he said, confused",
  "facialExpression": "suprised",
  "animation": "Thinking",
  "question": { "choiceType": "default", "choices": ["Yes", "Not really"] }
}`,
            },
            features: [
                { title: "Thinks before it speaks", body: "While the reply is being generated, the host strikes a **thinking pose** instead of freezing, so the pause reads as natural.", image: "/images/works/3d-ai-assistant/thinking.jpg", alt: "Host in a thinking pose while a reply is generated" },
                { title: "Listens when you cut in", body: "Speak over the host and it **stops mid-sentence**: the stale request is aborted and the new message takes over, with no overlapping replies.", image: "/images/works/3d-ai-assistant/voice-input.jpg", alt: "Voice input while the host listens" },
                { title: "Voice, face and body agree", body: "Each answer carries a voice emotion, facial expression and gesture **chosen together**, and lip-sync comes from a hand-built Rhubarb-to-Oculus viseme mapping.", image: "/images/works/3d-ai-assistant/gesture.jpg", alt: "Host performing a full-body gesture" },
            ],
            results: {
                worked: [
                    "Smooth 60 FPS rendering in Chrome",
                    "About 96% of LLM replies match the JSON contract (estimated)",
                    "Users bring their own API keys, so the platform has no per-conversation AI cost",
                ],
                next: [
                    "Cut ~9s latency by streaming the LLM reply and switching to Azure TTS",
                    "Rhubarb covers 9 of 15 Oculus visemes; Azure TTS would give the full set",
                    "Richer gesture library and dynamic expression blending",
                ],
            },
        },
        images: [
            { alt: "Meeting view with the 3D host", href: "/images/works/3d-ai-assistant/meeting.jpg" },
            { alt: "Voice input while the host listens", href: "/images/works/3d-ai-assistant/voice-input.jpg" },
            { alt: "Suggested actions in text chat", href: "/images/works/3d-ai-assistant/suggested-actions.jpg" },
            { alt: "Thinking pose while a reply is generated", href: "/images/works/3d-ai-assistant/thinking.jpg" },
            { alt: "Lip-sync and gesture while speaking", href: "/images/works/3d-ai-assistant/lipsync.jpg" },
            { alt: "Full-body gesture on request", href: "/images/works/3d-ai-assistant/gesture.jpg" },
            { alt: "Choosing a host when creating a session", href: "/images/works/3d-ai-assistant/choose-host.jpg" },
        ],
    },
    {
        id: "whiteboard-project",
        title: "Sketcha: Real-time collaborative whiteboard",
        author: "Trần Ngọc Đăng Khôi, Trần Phương Quang Huy",
        description: "A collaborative whiteboard where teams draw, annotate and share boards in real time. Built for remote learning, brainstorming and team workshops, with live multi-user sync powered by Liveblocks.",
        headingImg: "/images/works/whiteboard-project/thumbnail.png",
        stack: "Next.js, TypeScript, Prisma, MongoDB, Liveblocks, Clerk",
        linkAttached: {
            linkSource: "https://github.com/koitran14/WhiteBoard-Platform",
            SourceTitle: "Sketcha: Whiteboard Platform | Github",
            linkdemo: "https://white-board-platform.vercel.app/",
        },
        platform: "Web",
        demoVideo: "https://www.youtube.com/watch?v=lUOXCpwxx_0",
        field: Field.COLLABORATE,
        newest: true,
        publishYear: 2024,
        images: [
            {
                alt: "1",
                href: "/images/works/whiteboard-project/1.png",
            },
            {
                alt: "2",
                href: "/images/works/whiteboard-project/2.png",
            },
            {
                alt: "3",
                href: "/images/works/whiteboard-project/3.png",
            },
            {
                alt: "4",
                href: "/images/works/whiteboard-project/4.png",
            },
            {
                alt: "5",
                href: "/images/works/whiteboard-project/5.png",
            },
            {
                alt: "6",
                href: "/images/works/whiteboard-project/6.png",
            }
        ]
    },
    {
        id: "iu-blackboard",
        title: "IU Blackboard: Course management system",
        author: "Trần Ngọc Đăng Khôi, Đỗ Duy Anh",
        description: "An education management system that streamlines academic administration for students and instructors. Built on a REST API with Node.js, Express and SQL Server.",
        headingImg: "/images/works/iu-blackboard/image.png",
        stack: "Next.js, TypeScript, Node.js, Express, MS SQL Server, REST API",
        linkAttached: {
            linkSource: "https://github.com/koitran14/Course-Management-Project/tree/master",
            SourceTitle: "Course Management System | Github"
        },
        platform: "Web",
        field: Field.COLLABORATE,
        newest: true,
        publishYear: 2024,
        demoVideo: "https://www.youtube.com/watch?v=LgzlADwTnGk",
        images: [
            {
                alt: "1",
                href: "/images/works/iu-blackboard/1.png",
            },
            {
                alt: "2",
                href: "/images/works/iu-blackboard/2.png",
            },
            {
                alt: "3",
                href: "/images/works/iu-blackboard/3.png",
            },
            {
                alt: "4",
                href: "/images/works/iu-blackboard/4.png",
            },
            {
                alt: "5",
                href: "/images/works/iu-blackboard/5.png",
            }
        ]
    },
    {
        id: "algovisualizer",
        title: "AlgoVisualizer.io: Interactive algorithm visualizer",
        author: "Trần Ngọc Đăng Khôi",
        description: "Step-by-step, interactive visualizations of core algorithms and data structures, covering sorting, graph traversal and dynamic programming. Each one pairs the animation with an explanation of how it works and how efficient it is.",
        headingImg: "/images/works/algoVisualizer/image.png",
        stack: "Next.js, React, JavaScript, Tailwind CSS, Chart.js",
        linkAttached: {
            linkdemo: "https://algorithms-visualizer-koitran14.vercel.app/",
            linkSource: "https://github.com/koitran14/Algorithm-Visualizer",
            SourceTitle: "Algorithms Visualizer | Github"
        },
        platform: "Web",
        field: Field.PERSONAL,
        newest: true,
        publishYear: 2024,
        images: [
            {
                alt: "1",
                href: "/images/works/algoVisualizer/1.png",
            },
            {
                alt: "2",
                href: "/images/works/algoVisualizer/2.png",
            },
            {
                alt: "3",
                href: "/images/works/algoVisualizer/3.png",
            },
            {
                alt: "4",
                href: "/images/works/algoVisualizer/4.png",
            },
            {
                alt: "5",
                href: "/images/works/algoVisualizer/5.png",
            }
        ]
    },
    {
        id: "my-ecommerce-store",
        title: "Pisces: Full-stack e-commerce store",
        author: "Trần Ngọc Đăng Khôi",
        description: "A full-stack online store with Stripe payments, run from a companion admin dashboard that shares the same data layer.",
        headingImg: "/images/works/my-ecommerce-store/image.png",
        stack: "Next.js, Tailwind CSS, MongoDB, Prisma, Stripe",
        field: Field.PERSONAL,
        linkAttached: {
            linkdemo: "https://my-ecommerce-store.vercel.app/",
            linkSource: "https://github.com/koitran14/My-Ecommerce-Store",
            SourceTitle: "Pisces.io: My Ecommmerce Store | Github"
        },
        platform: "Web · responsive",
        publishYear: 2023,
        images: [
            {
                alt: "1",
                href: "/images/works/my-ecommerce-store/1.jpeg",
            },
            {
                alt: "2",
                href: "/images/works/my-ecommerce-store/3.png",
            },
            {
                alt: "3",
                href: "/images/works/my-ecommerce-store/2.png",
            },
            {
                alt: "4",
                href: "/images/works/my-ecommerce-store/4.png",
            },
            {
                alt: "5",
                href: "/images/works/my-ecommerce-store/5.png",
            },
            {
                alt: "6",
                href: "/images/works/my-ecommerce-store/6.png",
            }
        ]
    },
    {
        id: "store-dashboard",
        title: "Store Dashboard: Admin console for Pisces",
        author: "Trần Ngọc Đăng Khôi",
        description: "The admin dashboard behind the Pisces store, used to manage the shop from one place. Built with Next.js and Prisma on MySQL and MongoDB.",
        headingImg: "/images/works/dashboard-for-admin/image.png",
        stack: "Next.js, Tailwind CSS, Prisma, MySQL, MongoDB",
        field: Field.PERSONAL,
        linkAttached: {
            linkdemo: "https://store-dash-board-for-admin.vercel.app/",
            linkSource: "https://github.com/koitran14/Store-DashBoard-For-Admin",
            SourceTitle: "Store DashBoard For Admin | Github"
        },
        platform: "Web · responsive",
        publishYear: 2023,
        images: [
            {
                alt: "1",
                href: "/images/works/dashboard-for-admin/1.png",
            },
            {
                alt: "2",
                href: "/images/works/dashboard-for-admin/3.png",
            },
            {
                alt: "3",
                href: "/images/works/dashboard-for-admin/2.png",
            },
            {
                alt: "4",
                href: "/images/works/dashboard-for-admin/4.png",
            },
            {
                alt: "5",
                href: "/images/works/dashboard-for-admin/5.png",
            }
        ]
    },
    {
        id: "the-treasure-hunt",
        title: "The Treasure Hunt: Pirate adventure game",
        author: "Trần Ngọc Đăng Khôi, Nguyễn Trần Hoàng Hạ, Hà Văn Uyển Nhi, Nguyễn Hoàng Quân",
        description: "A pirate-themed adventure game built by a four-person team as an object-oriented programming project. The game was designed to put object-oriented design principles into practice.",
        headingImg: "/images/works/the-treasure-hunt/image.gif",
        stack: "Java",
        field: Field.COLLABORATE,
        linkAttached: {
            linkSource: "https://github.com/koitran14/The-Treasure-Hunt-Project",
            SourceTitle: "The Treasure Hunt Project | Github"
        },
        platform: "Desktop (Java)",
        publishYear: 2023,
        images: [
            {
                alt: "1",
                href: "/images/works/the-treasure-hunt/1.png",
            },
            {
                alt: "2",
                href: "/images/works/the-treasure-hunt/3.png",
            },
            {
                alt: "3",
                href: "/images/works/the-treasure-hunt/2.png",
            },
            {
                alt: "4",
                href: "/images/works/the-treasure-hunt/4.png",
            },
            {
                alt: "5",
                href: "/images/works/the-treasure-hunt/5.png",
            }
        ]
    },
    {
        id: "the-x-agent",
        title: "The X Agent: eSports event site",
        author: "Trần Ngọc Đăng Khôi",
        description: "The official information page for THE X AGENT, an eSports tournament in the IT Gaming Tour run by the IT Faculty Association. Hand-built with HTML, CSS and JavaScript.",
        headingImg: "/images/works/the-x-agent/image.png",
        stack: "HTML, CSS, JavaScript",
        field: Field.PERSONAL,
        linkAttached: {
            linkdemo: "https://the-x-agent-info-page.vercel.app/",
            linkSource: "https://github.com/koitran14/The-X-Agent-Info-Page",
            SourceTitle: "The X Agent Info Page | Github"
        },
        platform: "Web · responsive",
        publishYear: 2023,
        images: [
            {
                alt: "1",
                href: "/images/works/the-x-agent/image.png",
            },
            {
                alt: "2",
                href: "/images/works/the-x-agent/1.png",
            }
        ]
    },
]
/** "Sketcha: The Whiteboard Platform" -> name "Sketcha", tagline "The Whiteboard Platform" */
export const splitTitle = (title: string) => {
  const [name, ...rest] = title.split(":");
  return { name: name.trim(), tagline: rest.join(":").trim() };
};

export const fieldLabel = (field: string) => (field === Field.COLLABORATE ? "Team" : "Personal");

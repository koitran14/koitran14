import { Work } from "@/schema/type";

enum Field {
    PERSONAL = "works",
    COLLABORATE = "collabs"
}

export const works: Work[] = [ 
    {
        id: "iu-blackboard",
        title: "IU Blackboard: Course Management System",
        author: "Trần Ngọc Đăng Khôi, Đỗ Duy Anh",
        description: "The `Blackboard IU` project is meticulously crafted to serve as an advanced education management system, streamlining academic administration with its array of essential functionalities. Users, whether they be students or instructors, are empowered with seamless access to a range of features designed to enhance their educational experience.",
        headingImg: "/images/works/iu-blackboard/image.png",
        stack: "React, NextJS, TailwindCSS, NodeJS, SQL Server",
        linkAttached: {
            linkSource: "https://github.com/koitran14/Course-Management-Project/tree/master",
            SourceTitle: "Course Management System | Github"
        },
        platform: "Windows/macOS/Linux",
        field: Field.COLLABORATE,
        newest: true,
        publishYear: 2024,
        demoVideo: "/images/works/iu-blackboard/demo.mp4",
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
        title: "AlgoVisualizer.io: Algorithms Visualizer Website",
        author: "Trần Ngọc Đăng Khôi",
        description: "This website offers visualizations and explanations for Algorithms and Data Structures. Dive into sorting, graph traversal, and dynamic programming, gaining insights into their efficiency and real-world applications. Understand complex concepts effortlessly through interactive representations, strengthening your problem-solving skills in algorithmic scenarios.",
        headingImg: "/images/works/algoVisualizer/image.png",
        stack: "Next.JS, JavaScript, Tailwind CSS, React, Chart.JS",
        linkAttached: {
            linkdemo: "https://algorithms-visualizer-koitran14.vercel.app/",
            linkSource: "https://github.com/koitran14/Algorithm-Visualizer",
            SourceTitle: "Algorithms Visualizer | Github"
        },
        platform: "Windows/macOS/Linux",
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
        title: "Pisces: The E-shop",
        author: "Trần Ngọc Đăng Khôi",
        description: "This is my own store (pisces.io) served for my practice in learning full-stack web development and connected to my Dashboard manager, which called Dashboard for Store.",
        headingImg: "/images/works/my-ecommerce-store/image.png",
        stack: "NextJS, Tailwind, MongoDB, Prisma, Stripe.",
        field: Field.PERSONAL,
        linkAttached: {
            linkdemo: "https://my-ecommerce-store.vercel.app/",
            linkSource: "https://github.com/koitran14/My-Ecommerce-Store",
            SourceTitle: "Pisces.io: My Ecommmerce Store | Github"
        },
        platform: "Windows/macOS/Linux/iOS/Android",
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
        title: "Dashboard for Admin",
        author: "Trần Ngọc Đăng Khôi",
        description: "This is a web that supports for admin in business management. It is also a creation of my practice in learning of NextJS, TailwindCSS worked with Database MySQL, Prisma and MongoDB.",
        headingImg: "/images/works/dashboard-for-admin/image.png",
        stack: "NextJS, Tailwind, MongoDB, Prisma, Stripe.",
        field: Field.PERSONAL,
        linkAttached: {
            linkdemo: "https://store-dash-board-for-admin.vercel.app/",
            linkSource: "https://github.com/koitran14/Store-DashBoard-For-Admin",
            SourceTitle: "Store DashBoard For Admin | Github"
        },
        platform: "Windows/macOS/Linux/iOS/Android",
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
        title: "The Treasure Hunt",
        author: "Trần Ngọc Đăng Khôi, Nguyễn Trần Hoàng Hạ, Hà Văn Uyển Nhi, Nguyễn Hoàng Quân",
        description: "The pirate game as a teamwork project based on Object-Oriented Programming's deep learning and 'the pirate' as the concept.",
        headingImg: "/images/works/the-treasure-hunt/image.gif",
        stack: "Java.",
        field: Field.COLLABORATE,
        linkAttached: {
            linkSource: "https://github.com/koitran14/The-Treasure-Hunt-Project",
            SourceTitle: "The Treasure Hunt Project | Github"
        },
        platform: "Windows/macOS/Linux/iOS/Android",
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
        title: "The X Agent Homepage",
        author: "Trần Ngọc Đăng Khôi",
        description: "This is my personal project, using three languages JavaScript, HTML, and CSS to create an information page of the Information Technology Faculty Association for an eSport competition IT Gaming Tour: THE X AGENT.",
        headingImg: "/images/works/the-x-agent/image.png",
        stack: "HTML, CSS, JavaScript.",
        field: Field.PERSONAL,
        linkAttached: {
            linkdemo: "https://the-x-agent-info-page.vercel.app/",
            linkSource: "https://github.com/koitran14/The-X-Agent-Info-Page",
            SourceTitle: "The X Agent Info Page | Github"
        },
        platform: "Windows/macOS/Linux/iOS/Android",
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
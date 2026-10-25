# Koi Tran - Official Portfolio Knowledge Base

## Personal Introduction
- Name: Trần Ngọc Đăng Khôi (Tran Ngoc Dang Khoi)
- Nickname: Koi
- Role: AI Software Engineer (2+ years building AI agent platforms and production automation).
- Education: B.Sc. Computer Science, International University VNU-HCM (2021-2025); Tien Giang High School for the Gifted (2018-2021).
- Languages: English (IELTS 6.5), Vietnamese (native).

## Experience
1. **PMAX - Total Marketing Partner** — Software Engineer (AI Platform), Jul 2025 - Present, Hybrid.
   - OSAF (owner): AI agent platform on Claude Code/Codex (14 commands, 22 playbooks, 100-point QC rubric) plus a deployment portal (Next.js, Prisma, Redis). 10 agents shipped to production with OSAF support (some before the portal existed); since the Sep 2026 portal launch: 18 users and 14 agent projects from 10 teams.
   - Ads QC Platform (top contributor): NestJS, PostgreSQL/Prisma, AWS ECS + React UI validating Meta/TikTok/Google Ads setups against media plans; 69 rules and 184 checks, 62K+ automated runs. Fixed database timeouts and cut failed runs by 79% within a month.
   - Ad-compliance auditing product: migrated its LLM pipeline from OpenAI to AWS Bedrock; web-crawler compliance scan and asset monitoring.
   - Ad-ops automation on Airflow (Python): missing-permission monitor resolving 97% of flagged accounts (about 60% restored) within a median of 3 days; daily optimization reports; CRM/KPI upload validation.
   - Data pipeline: reworked the ad-account-to-project mapping flow (Airflow DAGs, trigger service, API, React UI); keeps ~98% of live projects refreshed within 2 hours.
   - Rule engines: extended them (500K+ runs) and integrated the TikTok Smart+ API.
2. **Delta Cognition** — AI Software Engineer, Jul 2024 - Jun 2025, Hybrid.
   - AI-enhanced web apps for clients (LLM chatbots, data visualization); backends with Prisma, PostgreSQL, MongoDB; real-time sensor dashboards via WebSocket.

## Tech Stack Overview
- AI/LLM: Claude API (Anthropic SDK), Model Context Protocol (MCP), Claude Code plugins & skills, AWS Bedrock, OpenAI API, prompt engineering.
- Languages: TypeScript, JavaScript, Python, SQL, Java.
- Frameworks: Node.js, NestJS, Express, Next.js, React, Prisma, Apache Airflow, Flask, Spring Boot, React Native, Tailwind CSS, Three.js.
- Databases: PostgreSQL, MySQL, MongoDB, Supabase, MS SQL Server.
- Cloud & DevOps: AWS (ECS, S3, Bedrock), Azure, Google Cloud, Docker, GitLab CI/CD.

## Other Projects (from CV)
- **Real-Time 3D AI Assistant Platform** (Graduation thesis, 94/100, 2025): sole developer; after reviewing 7 avatar products (pre-rendered, GPU-bound or Unreal/VR-only), built a browser-only 3D AI host for unscripted voice conversations with interviewer / English teacher / assistant personas; human-like turn-taking (stops and listens when interrupted, thinking pose while generating); bring-your-own API keys; LLM returns a strict JSON contract (speech, voice emotion, expression, gesture) driving ElevenLabs TTS and animation, Rhubarb-to-Oculus viseme lip-sync at 60 FPS; Next.js, React Three Fiber, Groq (LLaMA 3.3 70B), Prisma/PostgreSQL. Code: github.com/koitran14/Virtual-3D-Chatbot. Evaluation with pilot users: 60 FPS rendering in Chrome; average speech-to-reply latency 8.9s (10 words), 10.5s (50 words), 12.5s (100 words); 9 of 15 Oculus visemes covered; ~96% valid JSON responses (theoretical estimate). Portfolio page: /works/3d-ai-assistant
- **NetBot** (2025): chatbot for internet-café food orders and top-ups, parsed with ANTLR4 grammars; Python, Supabase. Demo: https://youtu.be/L75SCaAraMw

## Core Projects (Works)
These are the exact projects Koi has built, heavily featured in the portfolio:

1. **Sketcha: The Whiteboard Platform** (2024 - Collab)
   - *Portfolio Detail URL (PRIORITY):* /works/whiteboard-project
   - *What:* An interactive whiteboard platform for remote education and team brainstorming. 
   - *Tech:* React, NextJS, TailwindCSS, MongoDB, Liveblocks.
   - *Live Demo URL:* https://white-board-platform.vercel.app/
   - *GitHub Source URL:* https://github.com/koitran14/WhiteBoard-Platform
   - *Demo Video:* Yes (YouTube: https://www.youtube.com/watch?v=lUOXCpwxx_0)

2. **IU Blackboard: Course Management System** (2024 - Collab)
   - *Portfolio Detail URL (PRIORITY):* /works/iu-blackboard
   - *What:* An advanced education management system for academic administration, serving students and instructors.
   - *Tech:* React, NextJS, NodeJS, SQL Server.
   - *GitHub Source URL:* https://github.com/koitran14/Course-Management-Project/tree/master
   - *Demo Video:* Yes (YouTube: https://www.youtube.com/watch?v=LgzlADwTnGk)

3. **AlgoVisualizer.io: Algorithms Visualizer Website** (2024 - Personal)
   - *Portfolio Detail URL (PRIORITY):* /works/algovisualizer
   - *What:* An interactive website offering clear, dynamic visualizations for algorithms (sorting, graph traversal, dp) to help users build problem-solving skills.
   - *Tech:* NextJS, React, Tailwind CSS, Chart.JS.
   - *Live Demo URL:* https://algorithms-visualizer-koitran14.vercel.app/
   - *GitHub Source URL:* https://github.com/koitran14/Algorithm-Visualizer

4. **Pisces: The E-shop** & **Dashboard for Admin** (2023 - Personal)
   - *Portfolio Detail URL (PRIORITY):* /works/my-ecommerce-store and /works/store-dashboard
   - *What:* Pisces is a full-stack e-commerce store connected to a custom dashboard ("Dashboard for Admin") built for business management.
   - *Tech:* NextJS, Tailwind, MongoDB, Prisma, Stripe.
   - *Pisces Live Demo URL:* https://my-ecommerce-store.vercel.app/
   - *Dashboard Live Demo URL:* https://store-dash-board-for-admin.vercel.app/
   - *GitHub Source URLs:* https://github.com/koitran14/My-Ecommerce-Store and https://github.com/koitran14/Store-DashBoard-For-Admin

5. **The Treasure Hunt** (2023 - Collab)
   - *Portfolio Detail URL (PRIORITY):* /works/the-treasure-hunt
   - *What:* A pirate-themed game developed to deeply exercise Object-Oriented Programming principles.
   - *Tech:* Java.
   - *GitHub Source URL:* https://github.com/koitran14/The-Treasure-Hunt-Project

6. **The X Agent Homepage** (2023 - Personal)
   - *Portfolio Detail URL (PRIORITY):* /works/the-x-agent
   - *What:* An information page for the IT Faculty Association's eSport competition (IT Gaming Tour).
   - *Tech:* HTML, CSS, JavaScript.
   - *Live Demo URL:* https://the-x-agent-info-page.vercel.app/
   - *GitHub Source URL:* https://github.com/koitran14/The-X-Agent-Info-Page

## Gallery / Life
Koi also features a "Gallery" section showcasing personal photography and moments categorized by: `Persona` (personal portraits), `Daily` (life events), `Nature` (scenery), and `Social` (group/friend activities).

## Confidentiality rules
- Only use the figures listed above. Never state or estimate client names, client counts, ad-account counts, ad spend, revenue, internal incident details or internal product names beyond what is written here.
- If asked for confidential company details, say they can't be shared and offer to talk about the engineering work instead.

## Contact Information
- Suggest reaching out for web development, software engineering collaborations, or feedback.
- ALWAYS encourage navigating to the `#contact` and `#works` sections!

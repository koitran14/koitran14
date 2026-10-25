// Public-safe figures only: every number is tied to the project it measures, and
// client counts, account volumes, client data sizes, incident baselines and internal
// product names are left out or generalized.
export type Stat = { value: string; label: string; project?: string };

export type Experience = {
  slug: string;
  company: string;
  shortCompany: string;
  companyLink: string;
  title: string;
  period: string;
  shortPeriod: string;
  location: string;
  /** Headline stats, each naming the project it comes from; keep to 3 or fewer. */
  stats: Stat[];
  /** `**phrase**` marks a highlight (see components/highlight.tsx). */
  summary: string[];
  /** Each story carries the evidence (stats) for its own claims. */
  stories: { title: string; stats?: Stat[]; body: string[] }[];
  /** Tools grouped by role, each with what it was used for. */
  toolkit: { group: string; items: string[]; usedFor: string }[];
};

export const experiences: Experience[] = [
  {
    slug: "pmax",
    company: "PMAX — Total Marketing Partner",
    shortCompany: "PMAX",
    companyLink: "https://pmax.com.vn/",
    title: "Software Engineer (AI Platform)",
    period: "Jul 2025 — Present",
    shortPeriod: "2025 — now",
    location: "Ho Chi Minh City · Hybrid",
    stats: [
      { value: "10", label: "agents shipped", project: "OSAF" },
      { value: "62K+", label: "automated QC runs", project: "Ads QC Platform" },
      { value: "−79%", label: "QC run failures", project: "Ads QC Platform" },
    ],
    summary: [
      "Built **OSAF**, an AI agent platform on Claude Code/Codex that lets non-technical staff build and ship **production agents**.",
      "Co-built the **Ads QC Platform**, which checks live Meta, TikTok and Google Ads setups against media plans on a schedule.",
      "Restored QC reliability, cutting failed runs by **79%** within a month.",
    ],
    stories: [
      {
        title: "OSAF — AI agent platform",
        stats: [
          { value: "10", label: "agents shipped" },
          { value: "18", label: "portal users" },
          { value: "10", label: "teams onboarded" },
        ],
        body: [
          "Business teams had plenty of automation ideas but no way to turn them into reliable agents without an engineer in the loop.",
          "I conceived, architected and built OSAF end to end: a Claude Code/Codex plugin with **14 commands**, **22 playbooks** and a **100-point** evidence-based QC rubric, plus a deployment portal on Next.js, Prisma and Redis.",
          "I drove adoption by consulting business users on their use cases and supporting their deployments. **10 agents** have shipped to production with OSAF support, including some built before the portal existed, and since its launch the portal has onboarded **18 users** and **14 agent projects** from **10 teams**.",
        ],
      },
      {
        title: "Ads QC Platform",
        stats: [
          { value: "62K+", label: "automated QC runs" },
          { value: "184", label: "checks across 69 rules" },
          { value: "−79%", label: "failed runs after the fix" },
        ],
        body: [
          "Live ad setups on Meta, TikTok and Google Ads drift away from the media plans in Google Sheets, and catching that by hand does not scale.",
          "As top contributor, I co-built an end-to-end QC service (NestJS, PostgreSQL/Prisma, AWS ECS) and its React UI that validates live setups against media plans on cron schedules. Its **69 rules** and **184 checks** have run **62K+ times**, sending mismatch alerts to account teams via Gmail and Google Chat and flagging broken source sheets before they corrupt results.",
          "When database transaction and query timeouts started failing scheduled runs, I traced and fixed them, **cutting failed runs by 79%** within a month and isolating the rest to faulty input sheets. I also added on-demand runs, rate-limit retries and S3 archiving.",
        ],
      },
      {
        title: "Ad-ops automation and data pipeline",
        stats: [
          { value: "97%", label: "flagged accounts resolved" },
          { value: "3 days", label: "median time to resolve" },
          { value: "98%", label: "live projects refreshed within 2h" },
        ],
        body: [
          "On Airflow (Python), built a missing-permission monitor that alerts account owners and auto-deactivates accounts after three reminders. It resolves **97% of flagged accounts** (about 60% restored, the rest switched off) within a **median of 3 days**.",
          "Reworked the ad-account-to-project mapping flow across Airflow DAGs, a DAG-trigger service, the client API and the React UI: auto-mapping configs, separate manual and hourly run status, and project-ID revalidation with alerts for unmapped projects. The pipeline keeps **~98% of live projects** refreshed within 2 hours.",
          "Also shipped a daily 24-hour optimization report spanning QC, alert, performance and trend rules, plus alerting and validation for CRM/KPI uploads.",
        ],
      },
      {
        title: "Rule engines and LLM migration",
        stats: [{ value: "500K+", label: "rule-engine runs" }],
        body: [
          "Extended the performance-control and alert rule engines, which have run **500K+ times**, with action status and suggestion reporting plus failure alerts, and integrated the TikTok Smart+ campaign API.",
          "Migrated an ad-compliance auditing product's LLM pipeline from **OpenAI to AWS Bedrock**, and built its web-crawler compliance scan and asset monitoring.",
        ],
      },
    ],
    toolkit: [
      { group: "AI / LLM", items: ["Claude API", "Claude Code", "MCP", "AWS Bedrock"], usedFor: "OSAF agents and playbooks, ad-compliance LLM pipeline" },
      { group: "Backend", items: ["NestJS", "Prisma", "PostgreSQL", "Redis"], usedFor: "Ads QC service, OSAF deployment portal" },
      { group: "Frontend", items: ["Next.js", "React"], usedFor: "OSAF portal, Ads QC UI" },
      { group: "Data", items: ["Airflow", "Python"], usedFor: "Permission monitor, account-to-project pipeline, daily reports" },
      { group: "Infra", items: ["AWS ECS", "S3"], usedFor: "QC runners, run archiving" },
    ],
  },
  {
    slug: "delta-cognition",
    company: "Delta Cognition",
    shortCompany: "Delta Cognition",
    companyLink: "https://www.linkedin.com/company/delta-cognition/",
    title: "AI Software Engineer",
    period: "Jul 2024 — Jun 2025",
    shortPeriod: "2024 — 2025",
    location: "Ho Chi Minh City · Hybrid",
    stats: [],
    summary: [
      "Shipped **AI-enhanced web apps** for clients: LLM chatbots and data visualization MVPs.",
      "Built **real-time sensor dashboards** over WebSocket streams.",
    ],
    stories: [
      {
        title: "AI-enhanced client applications",
        body: [
          "Spearheaded AI-enhanced web applications for real-world clients — LLM chatbots, data visualization and data management — partnering with AI/ML, product and design teams to define roadmaps and ship MVPs.",
        ],
      },
      {
        title: "Backends and real-time dashboards",
        body: [
          "Architected backend systems with Prisma, PostgreSQL and MongoDB, and built real-time sensor dashboards for anomaly tracking via Socket.io/WebSocket stream parsing.",
        ],
      },
    ],
    toolkit: [
      { group: "Frontend", items: ["Next.js", "React"], usedFor: "Client web apps, LLM chatbot UIs, data visualization" },
      { group: "Backend", items: ["Prisma", "PostgreSQL", "MongoDB"], usedFor: "Data management backends" },
      { group: "Real-time", items: ["Socket.io", "WebSocket"], usedFor: "Sensor dashboards and anomaly tracking" },
    ],
  },
];

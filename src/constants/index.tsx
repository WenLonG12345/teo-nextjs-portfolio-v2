import { NavItemProps } from "./types";

import { SiGmail } from "react-icons/si";
import {
  FaLinkedin,
  FaStackOverflow,
  FaMedium,
  FaGithub,
} from "react-icons/fa";
import { CgAlbum } from "react-icons/cg";
import { BiPhoneCall } from "react-icons/bi";

export const METADATA = {
  title: "Teo | Frontend Engieer",
  titleTemplate: "%s | Teo",
  description:
    "A React/React Native developer, Android developer, UI / UX designer and tech enthusiast.",
  url: "https://teowenlong.com/",
};

export const NAV_ITEM_LIST: NavItemProps[] = [
  {
    href: "/",
    label: "navbar.home",
  },
  {
    href: "/about",
    label: "navbar.about",
  },
  {
    href: "/repos",
    label: "navbar.repo",
  },
  {
    href: "/articles",
    label: "navbar.article",
  },
  {
    href: "/contact",
    label: "navbar.contact",
  },
];

export const SITE_CONFIG = {
  resume: {
    url: "https://drive.google.com/file/d/1Obu0CIWpsB3IlfoUDKZV_caATVPc040O/view",
    icon: <CgAlbum />,
    name: "home.resume",
  },
  contact: {
    url: "/contact",
    icon: <BiPhoneCall />,
    name: "home.contact_me",
    email: "teowenlong0316@gmail.com",
  },
  footer: {
    copyright: `Copyright © ${new Date().getFullYear()} Teo Wen Long. All Rights Reserved.`,
    name: "Teo",
    accounts: [
      {
        url: "https://github.com/WenLonG12345",
        icon: <FaGithub size={24} className="text-black dark:text-white" />,
        name: "Github",
        type: "gray",
      },
      {
        url: "https://www.linkedin.com/in/teo-wen-long-19960316/",
        icon: <FaLinkedin size={24} color="#0e76a8" />,
        name: "Linkedin",
        type: "linkedin",
      },
      {
        url: "https://stackoverflow.com/users/12261890/teo",
        icon: <FaStackOverflow size={24} color="#f48024" />,
        name: "StackOverflow",
        type: "orange",
      },
      {
        url: "https://skynight1996.medium.com/",
        icon: <FaMedium size={24} className="text-black dark:text-white" />,
        name: "Medium",
        type: "gray",
      },
      {
        url: "mailto:teowenlong0316@gmail.com",
        icon: <SiGmail size={24} color="red" />,
        name: "Gmail",
        type: "red",
      },
    ],
  },
};

export const PROJECT_LIST: {
  [x: string]: {
    name: string;
    imageUrl: string;
    alt: string;
    summary: string;
    summary_zh?: string;
    link?: string;
    tech: string[];
  }[];
} = {
  "project.works": [
    {
      name: "Astro News Portals",
      imageUrl: "/images/astro_vortals.png",
      alt: "AstroVortals",
      summary:
        "Discover Malaysia's premier news portals, offering comprehensive coverage of diverse topics and boasting over 2 million monthly active users (MAU)",
      summary_zh:
        "探索马来西亚首屈一指的新闻门户网站，提供涵盖各种主题的全面报道，并拥有超过 200 万月活跃用户 (MAU)。",
      link: "https://www.astroawani.com/",
      tech: ["React", "ReactQuery", "SCSS", "AWS", "Redux", "Typescript"],
    },
    {
      name: "Ecosystem Design System",
      imageUrl: "/images/eco-design-system.png",
      alt: "eco-design-system",
      summary:
        "Design System built with StorybookJS based on design token and publish as open-source in NPM",
      summary_zh:
        "基于设计令牌使用 StorybookJS 构建的设计系统，并在 NPM 中以开源形式发布。",
      link: "https://meraki-design-system.eco.astro.com.my/",
      tech: ["React", "StorybookJS", "SCSS", "Emotion", "Typescript"],
    },
    {
      name: "Digital Fortress Assistant Portal",
      imageUrl: "/images/dfap.png",
      alt: "dfap",
      summary:
        "CMS Assistant Portal for building website with components and make configuration easier",
      summary_zh: "用于构建带有组件的网站并简化配置的 CMS 辅助门户。",
      link: "https://de-digital-fortress-assistant-stg.eco.astro.com.my/",
      tech: ["React", "ReactQuery", "TailwindCSS", "MantineUI", "Typescript"],
    },
    {
      name: "Chativo",
      imageUrl:
        "https://play-lh.googleusercontent.com/tgLiP-ZL-sBuZt2RzDU1tN88Cp7NPbdjF7c0311_dui86f1HrAQM0j4gXaRE0pb5zW0=s360-rw",
      alt: "chativo",
      summary:
        "Enterprise ready live-chat base customer support & engagement software",
      summary_zh: "企业级实时聊天客户支持和互动软件。",
      tech: ["Android", "Kotlin", "Android Jetpack", "Coroutine Flow"],
      link: "https://play.google.com/store/apps/details?id=io.chativo.chat",
    },
    {
      name: "ChativoV",
      imageUrl:
        "https://play-lh.googleusercontent.com/5U5s7sSIuzP6CygPkU2ZYxyOXT-MKv7oiyweGKHgkEgVameOcYt44rnXqCTWZJNZgVqn=s360-rw",
      alt: "chativo-v",
      summary:
        "Live-chat specifically designed for visitors to communicate with real-time agent instantly",
      summary_zh: "专为访客设计的实时聊天，可立即与实时代理沟通。",
      tech: ["React Native", "Javascript", "Redux", "Redux Saga", "RealmJS"],
      link: "https://play.google.com/store/apps/details?id=io.chativo.visitor",
    },
  ],
  "project.freelance": [
    {
      name: "Ideasss",
      imageUrl: "/images/ideasss.png",
      alt: "ideasss",
      summary:
        "NFT Platform for Creativity and Ideas,  First marketplace to connect demanders and designers through transparent competition",
      summary_zh:
        "创意和想法的 NFT 平台，第一个通过透明竞争连接需求者和设计师的市场。",
      link: "https://ideasss.com/",
      tech: ["React", "ReactQuery", "TailwindCSS", "Typescript", "Zustand"],
    },
    {
      name: "3CommasClub NFT",
      imageUrl: "/images/3commas.png",
      alt: "3commasclub",
      summary:
        "NFC business card builder linked with unique NFT. Build business profile embed with NFC that allows others to scan and connect.",
      summary_zh:
        "与独特 NFT 关联的 NFC 名片构建器。构建嵌入 NFC 的商业档案，允许其他人扫描和连接。",
      link: "https://nextjs-3commasclub-frontend.vercel.app/",
      tech: ["NextJS", "ChakraUI", "Ant Design", "Ant Design Pro"],
    },
    {
      name: "KlusterX Player Portal",
      imageUrl: "/images/klusterx_player.png",
      alt: "klusterx",
      summary:
        "Online Gaming Player Portal, built with NextJS, TailwindCSS and MantineUI",
      summary_zh:
        "在线游戏玩家门户，使用 NextJS、TailwindCSS 和 MantineUI 构建。",
      tech: ["NextJS", "TailwindCSS", "MantineUI", "Zustand"],
    },
    {
      name: "KlusterX Tenant Portal",
      imageUrl: "/images/klusterx_tenant.png",
      alt: "klusterx",
      summary: "Online Gaming Tenant Portal, built with Ant Design Pro",
      summary_zh: "在线游戏租户门户，使用 Ant Design Pro 构建。",
      tech: ["UmiJS", "Ant Design", "Ant Design Pro"],
    },
  ],
  "project.opensource": [
    {
      name: "React Date Dropdown",
      imageUrl: "/images/date-picker.png",
      alt: "date-picker",
      summary:
        "React Date Dropdown library. Highly customisable and provide individuals components for years, months and days",
      summary_zh:
        "React 日期下拉库。高度可定制，并为年、月和日提供单独的组件。",
      tech: ["React", "StorybookJS", "NPM", "Typescript"],
    },
    {
      name: "CM Script",
      imageUrl: "/images/cm-script.png",
      alt: "klusterx",
      summary: "CLI script for linting your commit message 🎉",
      summary_zh: "用于检查提交消息的 CLI 脚本 🎉。",
      tech: ["Javascript", "Bash", "CLI"],
    },
  ],
};

export const SKILL_LIST = [
  {
    name: "React",
    icon: "/images/skills/react.png",
  },
  {
    name: "NextJS",
    icon: "/images/skills/nextjs.png",
  },
  {
    name: "Typescript",
    icon: "/images/skills/ts.png",
  },
  {
    name: "Javascript",
    icon: "/images/skills/js.png",
  },
  {
    name: "React Query",
    icon: "/images/skills/react_query.png",
  },
  {
    name: "Redux Saga",
    icon: "/images/skills/redux.png",
  },
  {
    name: "TailwindCSS",
    icon: "/images/skills/tailwindcss.png",
  },
  {
    name: "SASS",
    icon: "/images/skills/sass.png",
  },
  {
    name: "AWS",
    icon: "/images/skills/aws.png",
  },
  {
    name: "Cloudflare",
    icon: "/images/skills/cloudflare.png",
  },
  {
    name: "Google Analytics",
    icon: "/images/skills/google_analytics.png",
  },
  {
    name: "Google Search Console",
    icon: "/images/skills/google_search_console.png",
  },
  {
    name: "CI/CD",
    icon: "/images/skills/bitbucket.png",
  },
  {
    name: "Github & GitLab",
    icon: "/images/skills/gitlab.png",
  },
  {
    name: "Kotlin",
    icon: "/images/skills/kotlin.png",
  },
  {
    name: "Java",
    icon: "/images/skills/java.png",
  },
  {
    name: "Android",
    icon: "/images/skills/android.png",
  },
];

export const CAREER_LIST = [
  {
    title: "Astro",
    alt: "astro image",
    url: "https://www.astro.com.my/",
    role: "Senior Associate Frontend Engineer",
    skills: ["React", "Sass", "Redux", "Redux Saga", "StorybookJS"],
    period: "Oct 2022 - Present",
    logo: "/images/astro.png",
    job_scope: [
      "Launched the PageBuilder CMS for Astro Awani, Gempak, Stadium Astro, Xuan, and Ulagam.",
      "Introduced a Design System using Storybook and published it as open‐source on NPM.",
      "Migrated from ReactJS to NextJS to improve SEO scoring and page performance, boosting pageviews by 89% and DAU by 50% for Gempak, pageviews by 53% and DAU by 34% for Xuan.",
      "Managed AWS infrastructure, including CloudFront, ECS, EC2, Lambda, S3, Route 53, and more.",
      "Managed CDN, DNS, website redirection, and cache optimization on Cloudflare to enhance performance and reliability.",
      "Monitored website traffic using Google Analytics and continuously optimized performance for better indexing on Google Search Console, improving total impression from 210k to 465k and total click from 9.4k to 30k.",
      "Improved Core Web Vitals by fixing various bugs, enhancing website performance, and reducing user bounce rates.",
    ],
    job_scope_zh: [
      "为 Astro Awani、Gempak、Stadium Astro、Xuan 和 Ulagam 推出了 PageBuilder CMS。",
      "使用 Storybook 引入了一个设计系统，并在 NPM 上以开源形式发布。",
      "从 ReactJS 迁移到 NextJS，以提高 SEO 评分和页面性能，将 Gempak 的页面浏览量提高了 89%，DAU 提高了 50%，将 Xuan 的页面浏览量提高了 53%，DAU 提高了 34%。",
      "管理 AWS 基础设施，包括 CloudFront、ECS、EC2、Lambda、S3、Route 53 等。",
      "在 Cloudflare 上管理 CDN、DNS、网站重定向和缓存优化，以提高性能和可靠性。",
      "使用 Google Analytics 监控网站流量，并不断优化性能，以便在 Google Search Console 上更好地索引，将总展示次数从 21 万提高到 46.5 万，总点击次数从 9.4 千提高到 3 万。",
      "通过修复各种错误、提高网站性能和降低用户跳出率来改善核心网页指标。",
    ],
  },
  {
    title: "Qumon Intelligence",
    alt: "qumon image",
    url: "https://www.qumonintelligence.com/",
    role: "Software Engineer",
    skills: [
      "Kotlin",
      "Java",
      "Android",
      "Javascript",
      "React",
      "React Native",
    ],
    period: "Aug 2020 - Sept 2022",
    logo: "/images/qumon.png",
    job_scope: [
      "Develop Android application with Kotlin in MVVM architecture by using Jetpack library, LiveData, Coroutines, Retrofit",
      "Develop hybrid application with React Native, Redux, Redux Saga, RealmDB",
      "Release and Maintain production application in Google Play Store",
      "Develop and maintain websites with ReactJS, NextJS, Redux",
    ],
    job_scope_zh: [
      "使用 Jetpack 库、LiveData、协程、Retrofit，以 MVVM 架构使用 Kotlin 开发 Android 应用程序。",
      "使用 React Native、Redux、Redux Saga、RealmDB 开发混合应用程序。",
      "在 Google Play 商店中发布和维护生产应用程序。",
      "使用 ReactJS、NextJS、Redux 开发和维护网站。",
    ],
  },
  {
    title: "TimeTec Cloud Sdn Bhd",
    alt: "timetec image",
    url: "https://www.timeteccloud.com/",
    role: "Mobile Application Developer Intern",
    skills: ["Java", "Android", "C#", "Appium Automation Testing", "AWS"],
    period: "Jul 2019 - Jan 2020",
    logo: "/images/timetec.png",
    job_scope: [
      " Native Android development in TimeTec Patrol and QF Master.",
      "Complete project stated in Software Requirement Specification (SRS) within assigned duration.",
      "Debug and fix bugs that reported from either Quality Control (QC) team or feedback from client.",
      "Research in DevOps and modify code to ease automation testing using Appium or Mockito.",
    ],
    job_scope_zh: [
      "在 TimeTec Patrol 和 QF Master 中进行原生 Android 开发。",
      "在分配的期限内完成软件需求规格 (SRS) 中声明的项目。",
      "调试并修复质量控制 (QC) 团队报告的错误或来自客户的反馈。",
      "研究 DevOps 并修改代码以使用 Appium 或 Mockito 简化自动化测试。",
    ],
  },
];

export const EDUCATION_LIST = [
  {
    title: "University Technology Malaysia (UTM)",
    alt: "utm image",
    url: "https://www.utm.my/",
    role: "Bachelor's Degree in Computer Science (Network and Security)",
    skills: ["CGPA - 3.79", "CCNA", "Security Management", "Network Security"],
    period: "Sept 2016 - Sept 2020",
    logo: "/images/utm.png",
  },
  {
    title: "SMK Mentakab",
    alt: "smk image",
    url: "https://www.facebook.com/pages/category/College---university/Sekolah-Menengah-Kebangsaan-Mentakab-224802077565350/",
    role: "STPM - Science Stream (Physics)",
    skills: ["CGPA - 3.33", "Math T", "Physics", "Chemistry"],
    period: "Jan 2015 - Jun 2016",
    logo: "/images/smk.png",
  },
];

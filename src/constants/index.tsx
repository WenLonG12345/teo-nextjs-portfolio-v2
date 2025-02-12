import {
  FAQProps,
  NavItemProps,
  ProjectProps,
  ServiceProps,
  TeamProps,
} from "./types";

import {
  SiKotlin,
  SiFirebase,
  SiFastlane,
  SiGmail,
  SiTypescript,
  SiTailwindcss,
  SiAntdesign,
  SiRedux,
} from "react-icons/si";
import {
  FaReact,
  FaJs,
  FaGitAlt,
  FaAndroid,
  FaJava,
  FaLinkedin,
  FaStackOverflow,
  FaMedium,
  FaGithub,
  FaSass,
  FaAws,
  FaGoogle,
  FaCloudflare,
} from "react-icons/fa";
import { SiReactquery, SiGoogleanalytics } from "react-icons/si";
import { CgAlbum } from "react-icons/cg";
import { TbBrandNextjs } from "react-icons/tb";
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
    label: "Home",
  },
  {
    href: "/about",
    label: "About Me",
  },
  {
    href: "/repos",
    label: "Github",
  },
  {
    href: "/articles",
    label: "Articles",
  },
  {
    href: "/contact",
    label: "Contact Me",
  },
];

export const SITE_CONFIG = {
  resume: {
    url: "https://drive.google.com/file/d/1Obu0CIWpsB3IlfoUDKZV_caATVPc040O/view",
    icon: <CgAlbum />,
    name: "Resume",
  },
  contact: {
    url: "/contact",
    icon: <BiPhoneCall />,
    name: "Contact Me",
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
      link: "https://www.astroawani.com/",
      tech: ["React", "ReactQuery", "SCSS", "AWS", "Redux", "Typescript"],
    },
    {
      name: "Ecosystem Design System",
      imageUrl: "/images/eco-design-system.png",
      alt: "eco-design-system",
      summary:
        "Design System built with StorybookJS based on design token and publish as open-source in NPM",
      link: "https://meraki-design-system.eco.astro.com.my/",
      tech: ["React", "StorybookJS", "SCSS", "Emotion", "Typescript"],
    },
    {
      name: "Digital Fortress Assistant Portal",
      imageUrl: "/images/dfap.png",
      alt: "dfap",
      summary:
        "CMS Assistant Portal for building website with components and make configuration easier",
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
      link: "https://ideasss.com/",
      tech: ["React", "ReactQuery", "TailwindCSS", "Typescript", "Zustand"],
    },
    {
      name: "3CommasClub NFT",
      imageUrl: "/images/3commas.png",
      alt: "3commasclub",
      summary:
        "NFC business card builder linked with unique NFT. Build business profile embed with NFC that allows others to scan and connect.",
      link: "https://nextjs-3commasclub-frontend.vercel.app/",
      tech: ["NextJS", "ChakraUI", "Ant Design", "Ant Design Pro"],
    },
    {
      name: "KlusterX Player Portal",
      imageUrl: "/images/klusterx_player.png",
      alt: "klusterx",
      summary:
        "Online Gaming Player Portal, built with NextJS, TailwindCSS and MantineUI",
      tech: ["NextJS", "TailwindCSS", "MantineUI", "Zustand"],
    },
    {
      name: "KlusterX Tenant Portal",
      imageUrl: "/images/klusterx_tenant.png",
      alt: "klusterx",
      summary: "Online Gaming Tenant Portal, built with Ant Design Pro",
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
      tech: ["React", "StorybookJS", "NPM", "Typescript"],
    },
    {
      name: "CM Script",
      imageUrl: "/images/cm-script.png",
      alt: "klusterx",
      summary: "CLI script for linting your commit message 🎉",
      tech: ["Javascript", "Bash", "CLI"],
    },
  ],
};

export const teamList: TeamProps[] = [
  {
    imageUrl: "/koh.jpeg",
    firstName: "Leong Chien",
    lastName: "Koh",
    positions: [
      "A passionate Golang backend developer. Learning from mistake, is another way to success⁠",
    ],
    socialNetworks: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/leong-chien-koh/",
      },
      {
        name: "Github",
        url: "https://github.com/LcKoh0830",
      },
    ],
  },
  {
    imageUrl: "/teo.png",
    firstName: "Wen Long",
    lastName: "Teo",
    positions: [
      "A ReactJS/React Native developer, Android developer, UI / UX designer and tech enthusiast.",
    ],
    socialNetworks: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/teo-wen-long-19960316/",
      },
      {
        name: "Github",
        url: "https://github.com/WenLonG12345",
      },
      {
        name: "Personal",
        url: "https://teowenlong.com/",
      },
    ],
  },
];

export const serviceList: ServiceProps[] = [
  {
    icon: "TabletSmartphone",
    title: "Web and Mobile Development",
    description:
      "Our team builds robust web and mobile applications, leveraging the latest technologies to ensure functionality, speed, and security.",
  },
  {
    icon: "BadgeCheck",
    title: "E-commerce Solutions",
    description:
      "From product listing management to payment gateway integration, we ensure your e-commerce business is set for seamless online shopping experiences.",
  },
  {
    icon: "Goal",
    title: "Content Management Systems (CMS)",
    description:
      "We create user-friendly systems that allow you to update, manage, and organize your digital content without needing technical expertise.",
  },
  {
    icon: "PictureInPicture",
    title: "API Development & Integration",
    description:
      "Our API development services ensure smooth communication between your applications and external services.",
  },
  {
    icon: "MousePointerClick",
    title: "DevOps & Continuous Integration",
    description:
      "We implement continuous integration, automated testing, and streamlined workflows to ensure quick, reliable releases of your software products.",
  },
  {
    icon: "Newspaper",
    title: "Maintenance & Support",
    description:
      "We provide ongoing support and maintenance services to ensure your website or app stays up to date, secure, and performing optimally.",
  },
];

export const FAQList: FAQProps[] = [
  {
    question: "What types of projects do you specialize in?",
    answer:
      "We specialize in web and mobile development, e-commerce platforms, content management systems, API integrations, and custom software solutions. Our team works with a variety of industries to create tailored digital solutions.",
    value: "item-1",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines depend on the complexity and scope of the project. Smaller projects can take a few weeks, while larger, more intricate solutions may take several months. We work closely with you to set realistic timelines and ensure timely delivery.",
    value: "item-2",
  },
  {
    question: "How do you handle project communication?",
    answer:
      "We maintain open and transparent communication throughout the project, using tools like Whatsapp, email, and project management platforms to keep you updated on progress. Regular meetings and reports ensure we stay aligned with your expectations.",
    value: "item-3",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "We work with a wide range of modern technologies, including but not limited to JavaScript frameworks (React, NextJS), backend systems (Golang, Nodejs, Nestjs), and mobile development (iOS, Android, React Native). We also integrate cloud solutions and various APIs.",
    value: "item-4",
  },
  {
    question: "Can you help with website or app updates after launch?",
    answer:
      "Absolutely! We provide ongoing maintenance and support services to ensure your website or app remains updated, secure, and optimized for performance.",
    value: "item-5",
  },
  {
    question: "Do you offer SEO services?",
    answer:
      "Yes, we offer SEO optimization as part of our services. We implement best practices to improve your website’s visibility on search engines and attract more organic traffic.",
    value: "item-6",
  },
  {
    question: "Do you offer custom solutions or just off-the-shelf products?",
    answer:
      "We specialize in creating custom solutions tailored to your specific needs. Whether you require a completely new application or enhancements to an existing system, we design and build software that fits your business goals.",
    value: "item-7",
  },
  {
    question: "How do you ensure the security of my application?",
    answer:
      "We take security very seriously. We implement industry best practices such as SSL encryption, regular security audits, secure coding practices, and user authentication protocols to protect your application from threats.",
    value: "item-8",
  },
  {
    question: "What is your pricing model?",
    answer:
      "Our pricing is based on the scope and complexity of each project. We offer flexible pricing models, including fixed-price contracts and time-and-materials arrangements. We can discuss the best option during the consultation phase.",
    value: "item-9",
  },
  {
    question: "Do you work with clients from different countries?",
    answer:
      "Yes, we serve clients globally. With our experience in international projects, we ensure that our solutions are adaptable for different markets and regions.",
    value: "item-10",
  },
];

export const projectList: ProjectProps[] = [
  {
    image: "/images/ideasss.png",
    name: "Ideasss",
    description:
      "NFT Platform for Creativity and Ideas,  First marketplace to connect demanders and designers through transparent competition",
    url: "https://ideasss.com/",
    techStack: ["React", "ReactQuery", "TailwindCSS", "Typescript", "Zustand"],
  },
  {
    image: "/images/3commas.png",
    name: "3CommasClub NFT",
    description:
      "NFC business card builder linked with unique NFT. Build business profile embed with NFC that allows others to scan and connect.",
    url: "https://nextjs-3commasclub-frontend.vercel.app/",
    techStack: ["NextJS", "ChakraUI", "Ant Design", "Ant Design Pro"],
  },
  {
    image: "/images/tinkercode.png",
    name: "TinkerCode",
    description:
      "Learning website built with Google Blockl, 3D Unity by sending signals to a 3D model and connects with local robots through a local robot server for interactive learning experiences.",
    url: "https://learn.tinkercode.my/",
    techStack: ["HTML", "CSS", "Javascript"],
  },
  {
    image: "/images/goldapple_player.png",
    name: "GA Player Portal",
    description:
      "Online Gaming Player Portal, built with NextJS, TailwindCSS and MantineUI",
    url: "https://ga-player.vercel.app/",
    techStack: ["NextJS", "TailwindCSS", "MantineUI", "Zustand"],
  },
  {
    image: "/images/goldapple_admin.png",
    name: "GA Admin Portal",
    description: "Online Gaming Tenant Portal, built with Ant Design Pro",
    url: "https://ga-admin.vercel.app/",
    techStack: ["UmiJS", "Ant Design", "Ant Design Pro"],
  },
  {
    image: "/images/quiz1.png",
    name: "Quiz System + Admin Panel",
    description:
      "Quiz system built for rbtxchallenge.com. Admins can manage quizzes through a CRUD interface for different schools, and participants receive their results immediately after submission.",
    url: "https://rbtxchallenge.com/login/login.php",
    techStack: ["HTML", "CSS", "Javascript", "PHP"],
  },
  {
    image: "/images/date-picker.png",
    name: "React Date Dropdown",
    description:
      "React Date Dropdown library. Highly customisable and provide individuals components for years, months and days",
    url: "https://www.npmjs.com/package/react-date-dropdown",
    techStack: ["React", "StorybookJS", "NPM", "Typescript"],
  },
  {
    image: "/images/masjid.png",
    name: "MTPI Masjid Project",
    description:
      "Dashboard for data presentation for a masjid project and Integrate PayHalal payment gateway for donation",
    url: "#",
    techStack: ["HTML", "CSS", "Javascript", "PHP"],
  },
];

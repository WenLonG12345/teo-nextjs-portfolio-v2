import { FAQProps, NavItemProps, ServiceProps, TeamProps } from "./types";

export const navItemList: NavItemProps[] = [
  {
    href: "#services",
    label: "Services",
  },
  // {
  //   href: "#features",
  //   label: "Features",
  // },
  {
    href: "#projects",
    label: "Projects",
  },
  {
    href: "#team",
    label: "Team",
  },
  {
    href: "#contact",
    label: "Contact",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

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
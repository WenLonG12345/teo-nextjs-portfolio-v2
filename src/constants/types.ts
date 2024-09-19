export interface NavItemProps {
  href: string;
  label: string;
}

export interface TeamProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialNetworkProps[];
}

export interface SocialNetworkProps {
  name: string;
  url: string;
}

export interface ServiceProps {
  icon: string;
  title: string;
  description: string;
}

export interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

export interface ProjectProps {
  image: string;
  name: string;
  description: string;
  url: string;
  techStack?: string[];
}
export interface MetadataProps {
  params: Promise<{ locale: string }>;
}

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

export type ISpotifyAccessTokenRes = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

export type ISpotifyNowPlayingRes = {
  timestamp?: number;
  context?: {
    external_urls?: {
      spotify?: string;
    };
    href?: string;
    type?: string;
    uri?: string;
  };
  progress_ms?: number;
  item?: {
    album?: {
      album_type?: string;
      artists?: { name?: string }[];
      available_markets?: string[];
      external_urls?: { spotify?: string };
      href?: string;
      id?: string;
      images?: { url?: string }[];
      name?: string;
      release_date?: string;
      release_date_precision?: string;
      total_tracks?: number;
      type?: string;
      uri?: string;
    };
    artists?: { name?: string }[];
    available_markets?: string[];
    disc_number?: number;
    duration_ms?: number;
    explicit?: boolean;
    external_ids?: { isrc?: string };
    external_urls?: { spotify?: string };
    href?: string;
    id?: string;
    is_local?: boolean;
    name?: string;
    popularity?: number;
    preview_url?: string | null;
    track_number?: number;
    type?: string;
    uri?: string;
  };
  currently_playing_type?: string;
  actions?: { disallows?: { resuming?: boolean } };
  is_playing?: boolean;
};

export type ISpotifySongRes = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type IGitRepo = {
  name: string;
  description: string;
  language: string;
  url: string;
  stargazers_count: number;
  forks_count: number;
  clone_url: string;
};

export type IMediumArticle = {
  title: string;
  url: string;
  thumbnail: string;
  description: string;
  date: string;
  categories: string[];
  guid: string;
  pubDate: string;
};

export type IMediumArticleRes = {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: IMediumArticle[];
};

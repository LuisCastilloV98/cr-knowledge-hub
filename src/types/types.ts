export interface TopicItemSection {
  heading: string;
  content: string;
}

export interface TopicItem {
  title: string;
  description: string;
  image?: string;
  images?: string[];
  emoji?: string; 
}

export type TopicReference = string | { label?: string; url: string };

export interface TopicData {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  cardImage: string; 
  wideImage: string;
  gallery?: string[];
  items?: TopicItem[];
  references?: TopicReference[];
  emoji?: string;
}

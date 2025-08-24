export interface TopicItem {
  title: string;
  description: string;
  image?: string;
  emoji?: string; 
}

export interface TopicData {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;

  cardImage: string; 
  wideImage: string;
  textImage?: string;

  gallery?: string[];
  items?: TopicItem[];

  emoji?: string;
}

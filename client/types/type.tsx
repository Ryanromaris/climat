export type CategoryList = string[];

export type WineType = 'red' | 'white' | 'sparkling' | 'rose';

export type MenuType = {
  id: number;
  name: string;
  category: string;
  type: WineType;
  summary: string;
};

export type CategoryType = {
  id: number;
  name: string;
};

export type WineType = 'red' | 'white' | 'sparkling' | 'rose';

export type MenuType = {
  id?: number;
  name?: string;
  categoryname?: string;
  type?: WineType;
  summary?: string;
  alcohol?: string;
  vintage?: string;
  amount?: string;
};

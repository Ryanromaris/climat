export const queryKeys = {
  category: ['category'] as const,
  menu: ['menu'] as const,
  menuById: (id: number) => ['menu', id] as const,
};

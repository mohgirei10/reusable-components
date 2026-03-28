export interface User {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
}

// MAKE SURE THIS IS HERE:
export interface ThemeColors {
  bg: string;
  text: string;
  card: string;
  border: string;
  accent: string;
}

export interface User {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
}
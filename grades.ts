export interface Grade {
  name: string;
  completed: boolean | string;
  total: number;
  score: number;
  id?: number;
}

export const assignments: Grade[] = [
  {
    name: "Walrus Worksheet",
    completed: "✔",
    total: 10,
    score: 9,
    id: 1,
  },

  {
    name: "Jellyfish Project",
    completed: "✔",
    total: 15,
    score: 15,
    id: 2,
  },

  {
    name: "Dolphin Quiz",
    completed: "✔",
    total: 10,
    score: 8,
    id: 3,
  },

  {
    name: "Oceans Unit Test",
    completed: "",
    total: 25,
    score: 0,
    id: 4,
  },
];

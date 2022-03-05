export interface Grade {
  Assignment: string;
  Score: number;
  Total: number;
  Completed: boolean | string;
}

export const assignments: Grade[] = [
  {
    Assignment: "Walrus Worksheet",
    Score: 9,
    Total: 10,
    Completed: true,
  },
  {
    Assignment: "Jellyfish Project",
    Score: 15,
    Total: 15,
    Completed: false,
  },
  {
    Assignment: "Dolphin Quiz",
    Score: 8,
    Total: 10,
    Completed: false,
  },
  {
    Assignment: "Oceans Unit Test",
    Score: 0,
    Total: 25,
    Completed: true,
  },
];

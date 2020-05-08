const data = [
  {
    name: "Bob",
    date: "2020-04-3",
    gender: "Male",
    age: 33,
    totalCommits: 40,
    commits: [
      { date: "2020-04-2", count: 56 },
      { date: "2020-04-3", count: 55 },
      { date: "2020-04-4", count: 70 },
      { date: "2020-04-5", count: 35 },
      { date: "2020-04-6", count: 61 },
      { date: "2020-04-7", count: 71 },
      { date: "2020-04-8", count: 57 },
      { date: "2020-04-9", count: 14 },
      { date: "2020-04-10", count: 72 },
      { date: "2020-04-11", count: 75 },
      { date: "2020-04-12", count: 35 },
      { date: "2020-04-13", count: 27 },
      { date: "2020-04-14", count: 57 },
      { date: "2020-04-15", count: 77 },
    ],
  },
  {
    name: "Robin",
    gender: "Male",
    date: "2020-04-2",
    age: 12,
    totalCommits: 20,
    commits: [
      { date: "2020-04-2", count: 31 },
      { date: "2020-04-3", count: 76 },
      { date: "2020-04-4", count: 48 },
      { date: "2020-04-5", count: 63 },
      { date: "2020-04-6", count: 42 },
      { date: "2020-04-7", count: 76 },
      { date: "2020-04-8", count: 30 },
      { date: "2020-04-9", count: 51 },
      { date: "2020-04-10", count: 42 },
      { date: "2020-04-11", count: 37 },
      { date: "2020-04-12", count: 26 },
      { date: "2020-04-13", count: 48 },
      { date: "2020-04-14", count: 95 },
      { date: "2020-04-15", count: 11 },
    ],
  },
  {
    name: "Anne",
    gender: "Female",
    date: "2020-04-3",
    age: 41,
    totalCommits: 32,
    commits: [
      { date: "2020-04-2", count: 31 },
      { date: "2020-04-3", count: 76 },
      { date: "2020-04-4", count: 48 },
      { date: "2020-04-5", count: 36 },
      { date: "2020-04-6", count: 42 },
      { date: "2020-04-7", count: 72 },
      { date: "2020-04-8", count: 33 },
      { date: "2020-04-9", count: 55 },
      { date: "2020-04-10", count: 42 },
      { date: "2020-04-11", count: 27 },
      { date: "2020-04-12", count: 46 },
      { date: "2020-04-13", count: 58 },
      { date: "2020-04-14", count: 45 },
      { date: "2020-04-15", count: 12 },
    ],
  },
  {
    name: "Mark",
    gender: "Male",
    date: "2020-04-4",
    age: 16,
    totalCommits: 50,
    commits: [
      { date: "2020-04-2", count: 66 },
      { date: "2020-04-3", count: 10 },
      { date: "2020-04-4", count: 54 },
      { date: "2020-04-5", count: 75 },
      { date: "2020-04-6", count: 55 },
      { date: "2020-04-7", count: 84 },
      { date: "2020-04-8", count: 24 },
      { date: "2020-04-9", count: 92 },
      { date: "2020-04-10", count: 84 },
      { date: "2020-04-11", count: 3 },
      { date: "2020-04-12", count: 78 },
      { date: "2020-04-13", count: 14 },
      { date: "2020-04-14", count: 30 },
      { date: "2020-04-15", count: 81 },
    ],
  },
  {
    name: "Joe",
    gender: "Male",
    date: "2020-04-5",
    age: 59,
    totalCommits: 45,
    commits: [
      { date: "2020-04-2", count: 17 },
      { date: "2020-04-3", count: 22 },
      { date: "2020-04-4", count: 23 },
      { date: "2020-04-5", count: 1 },
      { date: "2020-04-6", count: 54 },
      { date: "2020-04-7", count: 58 },
      { date: "2020-04-8", count: 84 },
      { date: "2020-04-9", count: 24 },
      { date: "2020-04-10", count: 32 },
      { date: "2020-04-11", count: 16 },
      { date: "2020-04-12", count: 5 },
      { date: "2020-04-13", count: 22 },
      { date: "2020-04-14", count: 33 },
      { date: "2020-04-15", count: 29 },
    ],
  },
  {
    name: "Eve",
    gender: "Female",
    age: 38,
    date: "2020-04-5",
    totalCommits: 12,
    commits: [
      { date: "2020-04-2", count: 3 },
      { date: "2020-04-3", count: 16 },
      { date: "2020-04-4", count: 12 },
      { date: "2020-04-5", count: 6 },
      { date: "2020-04-6", count: 97 },
      { date: "2020-04-7", count: 81 },
      { date: "2020-04-8", count: 22 },
      { date: "2020-04-9", count: 55 },
      { date: "2020-04-10", count: 99 },
      { date: "2020-04-11", count: 13 },
      { date: "2020-04-12", count: 76 },
      { date: "2020-04-13", count: 24 },
      { date: "2020-04-14", count: 39 },
      { date: "2020-04-15", count: 87 },
    ],
  },
  {
    name: "Karen",
    gender: "Female",
    date: "2020-04-6",
    age: 21,
    totalCommits: 23,
    commits: [
      { date: "2020-04-2", count: 74 },
      { date: "2020-04-3", count: 99 },
      { date: "2020-04-4", count: 60 },
      { date: "2020-04-5", count: 2 },
      { date: "2020-04-6", count: 90 },
      { date: "2020-04-7", count: 63 },
      { date: "2020-04-8", count: 36 },
      { date: "2020-04-9", count: 88 },
      { date: "2020-04-10", count: 23 },
      { date: "2020-04-11", count: 34 },
      { date: "2020-04-12", count: 56 },
      { date: "2020-04-13", count: 87 },
      { date: "2020-04-14", count: 18 },
      { date: "2020-04-15", count: 38 },
    ],
  },
  {
    name: "Kirsty",
    gender: "Unknown",
    date: "2020-04-7",
    age: 25,
    totalCommits: 56,
    commits: [
      { date: "2020-04-2", count: 5 },
      { date: "2020-04-3", count: 99 },
      { date: "2020-04-4", count: 9 },
      { date: "2020-04-5", count: 65 },
      { date: "2020-04-6", count: 41 },
      { date: "2020-04-7", count: 99 },
      { date: "2020-04-8", count: 42 },
      { date: "2020-04-9", count: 21 },
      { date: "2020-04-10", count: 89 },
      { date: "2020-04-11", count: 76 },
      { date: "2020-04-12", count: 83 },
      { date: "2020-04-13", count: 19 },
      { date: "2020-04-14", count: 63 },
      { date: "2020-04-15", count: 80 },
    ],
  },
  {
    name: "Chris",
    gender: "Female",
    date: "2020-04-6",
    age: 30,
    totalCommits: 76,
    commits: [
      { date: "2020-04-2", count: 77 },
      { date: "2020-04-3", count: 28 },
      { date: "2020-04-4", count: 97 },
      { date: "2020-04-5", count: 40 },
      { date: "2020-04-6", count: 45 },
      { date: "2020-04-7", count: 21 },
      { date: "2020-04-8", count: 49 },
      { date: "2020-04-9", count: 24 },
      { date: "2020-04-10", count: 54 },
      { date: "2020-04-11", count: 99 },
      { date: "2020-04-12", count: 69 },
      { date: "2020-04-13", count: 9 },
      { date: "2020-04-14", count: 69 },
      { date: "2020-04-15", count: 70 },
    ],
  },
  {
    name: "Lisa",
    gender: "Female",
    date: "2020-04-4",
    age: 47,
    totalCommits: 34,
    commits: [
      { date: "2020-04-2", count: 95 },
      { date: "2020-04-3", count: 66 },
      { date: "2020-04-4", count: 83 },
      { date: "2020-04-5", count: 36 },
      { date: "2020-04-6", count: 82 },
      { date: "2020-04-7", count: 51 },
      { date: "2020-04-8", count: 75 },
      { date: "2020-04-9", count: 76 },
      { date: "2020-04-10", count: 8 },
      { date: "2020-04-11", count: 58 },
      { date: "2020-04-12", count: 4 },
      { date: "2020-04-13", count: 94 },
      { date: "2020-04-14", count: 49 },
      { date: "2020-04-15", count: 61 },
    ],
  },
  {
    name: "Tom",
    gender: "Male",
    date: "2020-04-2",
    age: 15,
    totalCommits: 98,
    commits: [
      { date: "2020-04-2", count: 21 },
      { date: "2020-04-3", count: 88 },
      { date: "2020-04-4", count: 61 },
      { date: "2020-04-5", count: 9 },
      { date: "2020-04-6", count: 80 },
      { date: "2020-04-7", count: 37 },
      { date: "2020-04-8", count: 82 },
      { date: "2020-04-9", count: 67 },
      { date: "2020-04-10", count: 93 },
      { date: "2020-04-11", count: 19 },
      { date: "2020-04-12", count: 90 },
      { date: "2020-04-13", count: 10 },
      { date: "2020-04-14", count: 23 },
      { date: "2020-04-15", count: 13 },
    ],
  },
  {
    name: "Stacy",
    gender: "Unknown",
    date: "2020-04-10",
    age: 20,
    totalCommits: 43,
    commits: [
      { date: "2020-04-2", count: 56 },
      { date: "2020-04-3", count: 98 },
      { date: "2020-04-4", count: 95 },
      { date: "2020-04-5", count: 62 },
      { date: "2020-04-6", count: 84 },
      { date: "2020-04-7", count: 51 },
      { date: "2020-04-8", count: 71 },
      { date: "2020-04-9", count: 73 },
      { date: "2020-04-10", count: 33 },
      { date: "2020-04-11", count: 5 },
      { date: "2020-04-12", count: 50 },
      { date: "2020-04-13", count: 12 },
      { date: "2020-04-14", count: 77 },
      { date: "2020-04-15", count: 68 },
    ],
  },
  {
    name: "Charles",
    gender: "Male",
    date: "2020-04-9",
    age: 13,
    totalCommits: 22,
    commits: [
      { date: "2020-04-2", count: 98 },
      { date: "2020-04-3", count: 10 },
      { date: "2020-04-4", count: 93 },
      { date: "2020-04-5", count: 19 },
      { date: "2020-04-6", count: 70 },
      { date: "2020-04-7", count: 26 },
      { date: "2020-04-8", count: 6 },
      { date: "2020-04-9", count: 82 },
      { date: "2020-04-10", count: 98 },
      { date: "2020-04-11", count: 43 },
      { date: "2020-04-12", count: 95 },
      { date: "2020-04-13", count: 50 },
      { date: "2020-04-14", count: 60 },
      { date: "2020-04-15", count: 93 },
    ],
  },
  {
    name: "Mary",
    gender: "Female",
    date: "2020-04-8",
    age: 29,
    totalCommits: 61,
    commits: [
      { date: "2020-04-2", count: 53 },
      { date: "2020-04-3", count: 20 },
      { date: "2020-04-4", count: 82 },
      { date: "2020-04-5", count: 76 },
      { date: "2020-04-6", count: 9 },
      { date: "2020-04-7", count: 3 },
      { date: "2020-04-8", count: 76 },
      { date: "2020-04-9", count: 23 },
      { date: "2020-04-10", count: 80 },
      { date: "2020-04-11", count: 84 },
      { date: "2020-04-12", count: 88 },
      { date: "2020-04-13", count: 53 },
      { date: "2020-04-14", count: 58 },
      { date: "2020-04-15", count: 66 },
    ],
  },
];

export default data;

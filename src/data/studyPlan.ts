export interface StudyDay {
  date: string;
  title: string;
  tasks: string[];
}

export const studyPlan: StudyDay[] = [
  {
    date: "2026-03-02",
    title: "2 March — Monday",
    tasks: [
      "Design & Algorithm — Unit 1 (Priority)",
      "Operating System — Unit 1",
      "DBMS — Unit 1 (Half + Concepts)",
      "Probability — Basics",
      "Stress Management — Unit 1 Reading",
    ],
  },
  {
    date: "2026-03-03",
    title: "3 March — Tuesday",
    tasks: [
      "Design & Algorithm — Unit 2",
      "Operating System — Unit 2",
      "DBMS — Unit 1 Practice",
      "Probability — Descriptive Statistics",
      "Quick Revision (All Today Topics)",
    ],
  },
  {
    date: "2026-03-04",
    title: "4 March — Wednesday",
    tasks: [
      "Design & Algorithm — Unit 3",
      "Operating System — Unit 3",
      "DBMS — Unit 2",
      "Stress Management — Unit 2",
      "Practice Questions",
    ],
  },
  {
    date: "2026-03-05",
    title: "5 March — Thursday",
    tasks: [
      "Design & Algorithm — Problem Solving Practice",
      "Operating System — Important Concepts",
      "DBMS — Unit 3",
      "Probability — Unit 1 Complete",
      "Revision Session",
    ],
  },
  {
    date: "2026-03-06",
    title: "6 March — Friday",
    tasks: [
      "Design & Algorithm — PYQs + Algorithms",
      "Operating System — Numericals & Scheduling",
      "DBMS — Queries & Normalization",
      "Probability — Unit 2 Start",
    ],
  },
  {
    date: "2026-03-07",
    title: "7 March — Saturday",
    tasks: [
      "FULL REVISION — Design & Algorithm",
      "FULL REVISION — Operating System",
      "DBMS Quick Revision",
      "Probability Key Formulas",
      "Stress Management Revision",
    ],
  },
  {
    date: "2026-03-08",
    title: "8 March — Sunday",
    tasks: [
      "Light Revision Only",
      "Important Formulas Review",
      "Previous Questions",
      "Sleep Early & Relax Mind",
    ],
  },
];

export function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function getDayStatus(date: string, today: string): "past" | "today" | "future" {
  if (date === today) return "today";
  return new Date(date) < new Date(today) ? "past" : "future";
}

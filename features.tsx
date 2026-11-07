// Achievement and Reward

type Stats = { breaths: number; journals: number; moods: number; chats: number; voiceNotes: number };

const achievements = [
  { id: "first-sprout", title: "First Sprout", reward: 1, check: (s: Stats) => s.breaths + s.journals >= 1 },
  { id: "deep-breather", title: "Deep Breather", reward: 1, check: (s: Stats) => s.breaths >= 3 },
  { id: "dear-diary",   title: "Dear Diary",   reward: 1, check: (s: Stats) => s.journals >= 1 },
  { id: "check-in",     title: "Check-In Champ", reward: 2, check: (s: Stats) => s.moods >= 3 },
];

function checkAchievements(stats: Stats, unlocked: string[]) {
  return achievements.filter(a => !unlocked.includes(a.id) && a.check(stats));
}

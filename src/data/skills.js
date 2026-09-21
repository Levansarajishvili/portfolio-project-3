export const SKILL_FILTERS = ['all', 'frontend', 'backend', 'tools'];

/** status: 'shipped' = used in a real project, 'learning' = under construction (dashed frame). */
export const skills = [
  { id: 'html-css', name: 'HTML & CSS', category: 'frontend', symbol: 'sq-o', status: 'shipped' },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', symbol: 'sq', status: 'shipped' },
  { id: 'react', name: 'React', category: 'frontend', symbol: 'ci', status: 'shipped' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', symbol: 'dia', status: 'shipped' },
  { id: 'jquery', name: 'jQuery', category: 'frontend', symbol: 'tri', status: 'shipped' },
  { id: 'leaflet', name: 'Leaflet', category: 'frontend', symbol: 'pin', status: 'shipped' },
  { id: 'nodejs', name: 'Node.js', category: 'backend', symbol: 'ci-d', status: 'learning' },
  { id: 'mongodb', name: 'MongoDB', category: 'backend', symbol: 'sq-d', status: 'learning' },
  { id: 'git', name: 'Git & GitHub', category: 'tools', symbol: 'x', status: 'shipped' },
  { id: 'figma', name: 'Figma', category: 'tools', symbol: 'ring', status: 'shipped' },
  { id: 'vscode', name: 'VS Code', category: 'tools', symbol: 'bar', status: 'shipped' },
  { id: 'vite', name: 'Vite', category: 'tools', symbol: 'chev', status: 'shipped' },
];

export const skillsById = Object.fromEntries(skills.map((skill) => [skill.id, skill]));

export const SKILL_COUNTS = skills.reduce(
  (counts, skill) => ({ ...counts, [skill.category]: (counts[skill.category] ?? 0) + 1 }),
  { all: skills.length },
);

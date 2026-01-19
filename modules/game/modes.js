/**
 * Список режимов игры
 * @type {{ id: string, text: string, icon: string, locked: boolean }[]}
 */
export const GAME_MODES = [
  { id: 'MARKET', text: 'MARKET', icon: '🛒', locked: true },
  { id: 'EGGS', text: 'EGGS', icon: '🥚', locked: true },
  { id: 'PETS', text: 'PETS', icon: '🐶', locked: false },
  { id: 'FRIENDS', text: 'FRIENDS', icon: '👥', locked: true },
  { id: 'TASKS', text: 'TASKS', icon: '✅', locked: true },
];
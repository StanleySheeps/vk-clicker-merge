import { GAME_MODES } from "../game/modes.js";

/**
 * Создаёт одну кнопку навигации с иконкой и текстом
 * @param {Object} mode { id, text, icon, locked }
 * @param {Function} onClick
 * @returns {HTMLElement}
 */

export function createNavigationButton(mode, onClick) {
  const button = document.createElement('button');
  button.id = mode.id;
  button.className = `navigation-button ${mode.locked ? 'locked' : ''}`;
  button.disabled = mode.locked;

  // Создаём контейнер для иконки
  const iconSpan = document.createElement('span');
  iconSpan.className = 'icon';
  iconSpan.textContent = mode.icon;
  button.appendChild(iconSpan);

  // Создаём контейнер для текста
  const textSpan = document.createElement('span');
  textSpan.className = 'text';
  textSpan.textContent = mode.text;
  button.appendChild(textSpan);

  // Если режим заблокирован, добавляем значок замка
  if (mode.locked) {
    const lockSpan = document.createElement('span');
    lockSpan.className = 'lock';
    lockSpan.textContent = '🔒';
    button.appendChild(lockSpan);
  }

  // Добавляем обработчик клика
  button.addEventListener('click', () => {
    if (!mode.locked) {
      onClick(mode);
    }
  });

  return button;
}

/**
 * Создаёт все кнопки навигации и добавляет в контейнер
 * @param {HTMLElement} container
 * @param {Function} onNavigate
 */
export function createNavigationButtons(container, onNavigate) {
  // Очищаем контейнер перед созданием новых кнопок
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  GAME_MODES.forEach(mode => {
    const button = createNavigationButton(mode, (selectedMode) => {
      onNavigate(selectedMode);
      highlightActiveButton(button);
    });
    container.appendChild(button);
  });
}

/**
 * Вспомогательная функция для подсветки активной кнопки
 * @param {HTMLElement} activeButton
 */
export function highlightActiveButton(activeButton) {
  document.querySelectorAll('.navigation-button.active')
    .forEach(btn => btn.classList.remove('active'));
  activeButton.classList.add('active');
}
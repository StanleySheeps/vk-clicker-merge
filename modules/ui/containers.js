import { createNavigationButtons } from "./buttons.js";

/**
 * Создаёт или возвращает существующий контейнер приложения
 * @returns {HTMLElement}
 */
export function createAppContainer() {
  let app = document.getElementById('app-container');
  
  // Если элемент уже существует, используем его
  if (!app) {
    try {
    app = document.createElement('div');
    app.id = 'app-container';
    document.body.appendChild(app); // Добавляем элемент в DOM
    console.log('✅ Контейнер приложения создан')
    } catch (error) {
      console.error('❌ Ошибка при создании контейнера приложения:', error);
    }
  }
  return app;
}

/**
 * Создаёт контейнер для ошибок
 * @param {string} text
 */
export function createErrorContainer(textContent) {
  let errorContainer = document.getElementById('error-container');

  // Если элемент уже существует, используем его
  if (!errorContainer) {
    try {
      errorContainer = document.createElement('div');
      errorContainer.id = 'error-container';
      errorContainer.className = 'error-container';

      // Добавляем элемент в DOM
      const app = document.getElementById('app-container');
      if (app) {
        try {
          app.appendChild(errorContainer);
        } catch (error) {
          console.error('❌ Контейнер приложения не найден', error);
        }
      }
    } catch (error) {
      console.error('Ошибка при создании контейнера для ошибок:', error);
    }
  }
  
  // Очищаем содержимое
  while (errorContainer.firstChild) {
    errorContainer.removeChild(errorContainer.firstChild);
  }

  // Присваиваем текстовое содержимое
  errorContainer.textContent = textContent || '❌ Ошибка!';  
}

/**
 * Создаёт контейнер для пользователя
 * @param {Object} user
 */
export function createUserContainer(user) {
  let userContainer = document.getElementById('user-container');

  // Если элемент уже существует, используем его
  if (!userContainer) {
    try {
      userContainer = document.createElement('div');
      userContainer.id = 'user-container';
      userContainer.className = 'user-container';

      // Добавляем элемент в DOM
      const app = document.getElementById('app-container');
      if (app) {
        try {
          app.appendChild(userContainer);
          console.log('✅ Контейнер пользователя создан')
        } catch (error) {
          console.error('❌ Контейнер приложения не найден', error);
        }
      }
    } catch (error) {
      console.error('Ошибка при создании контейнера для пользователя:', error);
    }
  }
  // Очищаем содержимое
  while (userContainer.firstChild) {
    userContainer.removeChild(userContainer.firstChild);
  }

  // Присваиваем содержимое
    // Создаем изображение аватара
  const avatarImg = document.createElement('img');
  avatarImg.src = user.photo_200 || 'https://vk.com/images/camera_100.png';
  avatarImg.alt = 'Аватар';
  avatarImg.className = 'avatar';

    // Создаем заголовок с приветствием
  const greetingHeader = document.createElement('h1');
  greetingHeader.textContent = `Привет, ${user.first_name || 'Пользователь'}!`;

    // Добавляем элементы в контейнер
    userContainer.appendChild(avatarImg);
    userContainer.appendChild(greetingHeader);
}

/**
 * Создаёт динамический контейнера для режимов игры
 * @returns {HTMLElement}
 */
export function createGameModesContainer() {
  let gameModesContainer = document.getElementById('game-modes-container');

  // Если элемент уже существует, используем его
  if(!gameModesContainer) {
    try {
      gameModesContainer = document.createElement('div');
      gameModesContainer.id = 'game-modes-container';
      gameModesContainer.className = 'game-modes-container';

      // Добавляем элемент в DOM
      const app = document.getElementById('app-container');
      if (app) {
        try {
          app.appendChild(gameModesContainer);
          console.log('✅ Контейнер для режимов игры создан')
        } catch (error) {
          console.error('❌ Контейнер приложения не найден', error);
        }
      }
    } catch (error) {
      console.error('Ошибка при создании контейнера для режимов игры:', error);
    }
  }
  // Очищаем содержимое
  while (gameModesContainer.firstChild) {
    gameModesContainer.removeChild(gameModesContainer.firstChild);
  }
}

/**
 * Создаёт контейнер для кнопок навигации
 * @param {HTMLElement} container
 */
export function createFooterContainer(onNavigate) {
  let footerContainer = document.getElementById('footer-container');

  // Если элемент уже существует, используем его
  if (!footerContainer) {
    try {
      footerContainer = document.createElement('div');
      footerContainer.id = 'footer-container';
      footerContainer.className = 'footer-container';

      // Добавляем элемент в DOM
      const app = document.getElementById('app-container');
      if (app) {
        try {
          app.appendChild(footerContainer);
          console.log('✅ Контейнер для кнопок навигации создан')
        } catch (error) {
          console.error('❌ Контейнер приложения не найден', error);
        }
      }
    } catch (error) {
      console.error('Ошибка при создании контейнера для кнопок навигации:', error);
    }
  }
  // Очищаем содержимое
  while (footerContainer.firstChild) {
    footerContainer.removeChild(footerContainer.firstChild);
  }
}
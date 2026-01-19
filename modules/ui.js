// ui.js - модуль пользовательского интерфейса

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

// Создание контейнера для вывода ошибок
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

// Создание контейнера для приветствия пользователя
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

// Создание динамического контейнера для режимов игры
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
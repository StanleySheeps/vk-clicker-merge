// main.js — основной файл приложения

import { waitForVkBridgeInit, adjustWindowSize } from './modules/vk.js';
import { 
  createAppContainer, 
  createErrorContainer, 
  createFooterContainer, 
  createGameModesContainer, 
  createUserContainer 
} from './modules/ui/containers.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Шаг 1: Создаём основной контейнер
    createAppContainer();

  try {
    // Шаг 2: Инициализация vkBridge
    const vkBridge = await waitForVkBridgeInit();

    // Шаг 3: Подстройка размера окна
    await adjustWindowSize(vkBridge);

    // Шаг 4: Получение информации о пользователе
    const user = await vkBridge.send('VKWebAppGetUserInfo');
    const userContainer = createUserContainer(user);

    // Шаг 5: Создание контейнера для режимов игры
    const gameModesContainer = createGameModesContainer();

    /* Шаг 6: Создание футера
    createFooterContainer((mode) => {
      if (mode.locked) {
        gameModesContainer.innerHTML = '<p>🔒 Режим временно недоступен</p>';
        return;
      }
      // Временная мера для демонстрации
      switch (mode.id) {
        case 'EGGS':
          gameModesContainer.innerHTML = '<h2>🥚 Режим сбора яиц</h2><p>Кликай по яйцам!</p>';
          break;
        case 'PETS':
          gameModesContainer.innerHTML = '<h2>🐶 Мои питомцы</h2><p>Здесь будут твои звери</p>';
          break;
        default:
          gameModesContainer.innerHTML = `<h2>${mode.icon} ${mode.text}</h2>`;
      }
    }); */
    

  } catch (err) {
    console.error('🔴 Фатальная ошибка:', err);
    createErrorContainer(`❌ ${err.message}`);
  }
});

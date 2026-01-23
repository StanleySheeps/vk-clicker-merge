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

    // Шаг 4: Создание контейнера для режимов игры
    createGameModesContainer();

    // Шаг 5: Создание футера
    createFooterContainer();
    

  } catch (err) {
    console.error('🔴 Фатальная ошибка:', err);
    createErrorContainer(`❌ ${err.message}`);
  }

   // Шаг 6: Получение информации о пользователе
   try {
    const user = await vkBridge.send('VKWebAppGetUserInfo');
    createUserContainer(user);
  } catch (err) {
    createUserContainer({ first_name: 'Гость', last_name: '', photo_200: 'https://vk.com/images/camera_200.png' });
  }
});

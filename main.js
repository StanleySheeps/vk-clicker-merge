// main.js — основной файл приложения, главный модуль

import { waitForVkBridgeInit, adjustWindowSize } from './modules/vk.js';
import { createAppContainer, createErrorContainer, createFooterContainer, createGameModesContainer, createUserContainer } from './modules/ui.js';

document.addEventListener('DOMContentLoaded', async () => {
  createAppContainer(); // Ожидание загрузки контейнера

  try {
    // Шаг 1: Инициализация
    const vkBridge = await waitForVkBridgeInit();

    // Шаг 2: Адаптация окна
    await adjustWindowSize(vkBridge);

    // Шаг 3: Получение пользователя
    createAppContainer();
    const user = await vkBridge.send('VKWebAppGetUserInfo');
    createUserContainer(user);
    
    // Шаг 4: Создание динамического контейнера для режимов игры
    createGameModesContainer();

    // Шаг 5: Создание кнопок навигации
    createFooterContainer();    

  } catch (err) {
    console.error('🔴 Фатальная ошибка:', err);
    createErrorContainer();
  }
});

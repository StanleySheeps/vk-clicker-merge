// main.js — основной файл приложения, главный модуль

import { waitForVkBridgeInit, adjustWindowSize } from './modules/vk.js';
import { createAppContainer, createErrorContainer, createUserContainer } from './modules/ui.js';

document.addEventListener('DOMContentLoaded', async () => {
  createAppContainer(); // Ожидание загрузки контейнера

  try {
    // Шаг 1: Инициализация
    const vkBridge = await waitForVkBridgeInit();

    // Шаг 2: Адаптация окна
    await adjustWindowSize(vkBridge);

    // Шаг 3: Получение пользователя
    createAppContainer('☕ Загружаем профиль...');
    const user = await vkBridge.send('VKWebAppGetUserInfo');
    createUserContainer(user);

  } catch (err) {
    console.error('🔴 Фатальная ошибка:', err);
    createErrorContainer();
  }
});

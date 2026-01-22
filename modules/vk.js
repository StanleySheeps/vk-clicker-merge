// vk.js - модуль для работы с vkBridge

/**
 * Ожидание vkBridge и его инициализация
 */
export function waitForVkBridgeInit(maxAttempts = 300, interval = 100) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const tryInit = () => {
      attempts++;

      if (typeof window.vkBridge !== 'undefined' && typeof window.vkBridge.send === 'function') {
        console.log(`✅ vkBridge найден на попытке ${attempts}`);

        window.vkBridge.subscribe((e) => console.log(e)); // Подписка на события

        window.vkBridge.send('VKWebAppInit')
        .then(() => {
          console.log('✅ VKWebAppInit отправлен');
          resolve(window.vkBridge);
        })
        .catch(err => {
          console.error('❌ Ошибка VKWebAppInit:', err);
          if (attempts >= maxAttempts) {
            reject(new Error('Не удалось инициализировать VKWebAppInit'));
          } else {
            setTimeout(tryInit, interval);
          }
        });
      } else {
        console.log(`⏳ vkBridge ещё не доступен, попытка ${attempts}`);
        if (attempts >= maxAttempts) {
          reject(new Error('Превышено время ожидания: vkBridge не появился'))
        } else {
          setTimeout(tryInit, interval);
        }
      }
    };

    tryInit();
  });
}

/**
 * Адаптирует окно под нужный размер, если поддерживается
 */
export async function adjustWindowSize(vkBridge) {
  try {
    if (typeof vkBridge.supportsAsync !== 'function') {
      console.warn('⚠️ vkBridge.supportsAsync не поддерживается');
      return;
    }

    const isSupported = await vkBridge.supportsAsync('VKWebAppResizeWindow');
    if (isSupported) {
      await vkBridge.send('VKWebAppResizeWindow', { width: 480, height: 800 });
      console.log('✅ Окно изменено: 480×800');
    }
  } catch (err) {
    console.error('❌ Ошибка изменения окна:', err);
  }
}
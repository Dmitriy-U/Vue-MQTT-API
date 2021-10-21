/**
 * Эндпоинты MQTT сообщений
 *
 * @readonly
 * @enum {String}
 */
export const ENDPOINTS = {
  SPECIFICATIONS_ALL: 'specification/all',
};

/**
 * Модули стора по эндпоинтам MQTT сообщений.
 * Ключ - эндпоинт; Значение - модуль store
 *
 * @readonly
 * @enum {String}
 */
export const STORE_MODULES = {
  [ENDPOINTS.SPECIFICATIONS_ALL]: 'specifications',
};

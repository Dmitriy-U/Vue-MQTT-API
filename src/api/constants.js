/**
 * Направления передачи данных
 *
 * @readonly
 * @enum {String}
 */
export const DIRECTIONS = {
  REQ: 'REQ',
  RES: 'RES',
};

/**
 * Мотоды передачи данных
 *
 * @readonly
 * @enum {String}
 */
export const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

/**
 * Форматы передачи данных
 *
 * @readonly
 * @enum {String}
 */
export const DATA_FORMATS = {
  JSON: 'json',
};

/**
 * Ошибки
 *
 * @readonly
 * @enum {String}
 */
export const ERRORS = {
  NO_ACTION_FOR_TOPIC: 'Отсутствует экшн для топика',
};

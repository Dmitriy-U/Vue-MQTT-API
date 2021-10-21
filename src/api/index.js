import config from '../config';
import * as endpoints from './endpoints';
import * as constants from './constants';

/**
 * Парсер MQTT сообщения
 *
 * @param topic {String} Топик MQTT сообщения
 * @param payload {Object} Данные MQTT сообщения
 * @returns {Object} Распарсеные данные
 */
class MqttMessageParser {
  constructor({
    topic,
    payload,
  }) {
    const [
      baseTopic,
      mqttClient,
      direction,
      endpoint,
      dataFormat,
    ] = topic.match(`^${config.apiServicePrefix}/(\\w+)/RES/(\\w+)/(.+)/(\\w+)$`);

    this.topic = baseTopic;
    this.payload = payload;
    this.mqttClient = mqttClient;
    this.direction = direction;
    this.endpoint = endpoint;
    this.dataFormat = dataFormat;
    this.resultCode = this.payload.resultCode;
    this.request = this.payload.request;
    this.data = this.payload?.data;
    this.error = this.payload?.error;

    this.storeAction = `${endpoints.STORE_MODULES[this.endpoint]}/${this.direction}/RES/${this.endpoint}`;
  }
}

/**
 * Собирает топик запроса
 *
 * @param method {String} Метод
 * @param endpoint {String} Эндпоинт
 * @returns {String} Топик
 */
const requestTopic = (method, endpoint) => `${config.apiServicePrefix}/${config.mqttClient}/REQ/${method}/${endpoint}/json`;

/**
 * Обрабатывает объект запроса перед отправкой
 *
 * @param payload {Object} Объект данных
 * @returns {string} JSON строка
 */
const requestPayload = (payload = {}) => JSON.stringify(payload);

/**
 * Обработчик получения Mqtt сообщений
 *
 * @param topic {String} Топик сообщения
 * @param payload {Object} Данные
 * @param store {Object} Vuex хранилище
 */
function receiveMessage(topic, payload, store) {
  const parsedMqttMessage = new MqttMessageParser({
    topic,
    payload: JSON.parse(payload.toString()),
  });

  store.dispatch(
    parsedMqttMessage.storeAction,
    parsedMqttMessage.data,
    { root: true },
  );
}

export {
  receiveMessage,
  requestTopic,
  requestPayload,
  endpoints,
  constants,
};

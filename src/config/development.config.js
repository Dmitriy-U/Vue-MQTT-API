const client = `LedFront_${parseInt(Math.random() * 10000, 10)}`;
const apiServicePrefix = 'service/LedBackend';
const apiPath = `${apiServicePrefix}/${client}/RES/#`;
const clientStatusTopic = `status/client/${client}/state`;

export default {
  mqttHost: 'mqtt0.bast-dev.ru',
  mqttProtocol: 'ws',
  mqttPort: 80,
  mqttUseSSL: false,
  mqttClient: client,
  mqttUser: 'admin',
  mqttPassword: 'adminpsw',
  mqttConnectTimeout: 30 * 1000,
  mqttProtocolVersion: 4,
  mqttBasePath: 'vwss/mqtt',
  apiServicePrefix,
  apiPath,
  clientStatusTopic,
};

import Vue from 'vue';
import Vuex from 'vuex';
import mqtt from 'mqtt';
import config from '@/config';
import specifications from './modules/specifications';

Vue.use(Vuex);

function initialState() {
  const mqttClient = mqtt.connect(
    `${config.mqttProtocol}://${config.mqttHost}:${config.mqttPort}/${config.mqttBasePath}`,
    {
      clientId: config.mqttClient,
      username: config.mqttUser,
      password: config.mqttPassword,
      connectTimeOut: config.mqttConnectTimeout,
      protocolVersion: config.mqttProtocolVersion,
      will: {
        topic: config.clientStatusTopic,
        payload: '',
        retain: true,
      },
    },
  );

  mqttClient.on('connect', () => {
    mqttClient.subscribe(config.apiPath, (err) => {
      if (!err) {
        mqttClient.publish(config.clientStatusTopic, 'active', { retain: true });
      }
    });
  });

  return {
    mqttClient,
  };
}

export default new Vuex.Store({
  state: initialState,
  mutations: {},
  actions: {},
  modules: {
    specifications,
  },
});

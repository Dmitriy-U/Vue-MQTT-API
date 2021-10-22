import Vue from 'vue';
import Vuex from 'vuex';
import mqtt from 'mqtt';
import config from '@/config';
import specifications from './modules/specifications';
import { ERRORS } from '@/api/constants';
import { receiveMessage } from '@/api';

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

  return {
    mqttClient,
    error: null,
  };
}

export default new Vuex.Store({
  state: initialState,

  mutations: {
    setTopicError(state) {
      state.error = ERRORS.NO_ACTION_FOR_TOPIC;

      if (config.debug) {
        console.log(ERRORS.NO_ACTION_FOR_TOPIC);
      }
    },
  },

  actions: {
    mqttSetEventOnMessage({ state }) {
      state.mqttClient.on('message', (topic, payload) => {
        receiveMessage(topic, payload, this);
      });
    },

    mqttSetEventOnConnect({ state, dispatch }) {
      state.mqttClient.on('connect', () => {
        dispatch('mqttSubscribeToTopic');
      });
    },

    mqttSubscribeToTopic({ state, dispatch }) {
      state.mqttClient.subscribe(config.apiPath, (err) => {
        if (!err) {
          dispatch('mqttPublishStatusActive');
        }
      });
    },

    mqttPublishStatusActive({ state }) {
      state.mqttClient.publish(
        config.clientStatusTopic,
        'active',
        { retain: true },
      );
    },

    onTopicError({ commit }) {
      commit('setTopicError');
    },
  },

  modules: {
    specifications,
  },
});

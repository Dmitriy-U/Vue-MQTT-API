import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { receiveMessage } from './api';

Vue.config.productionTip = false;

store.state.mqttClient.on('message', (topic, payload) => {
  receiveMessage(topic, payload, store);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

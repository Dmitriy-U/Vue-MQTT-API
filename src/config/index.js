/* eslint-disable global-require */
import baseConfig from './base.config';

let envConfig;

// eslint-disable-next-line default-case
switch (process.env.NODE_ENV || 'development') {
  // Конфиг боевого режима
  case 'production':
    envConfig = require('./production.config').default;
    break;

  // Конфиг тестовый сервер или удаленный сервер разработки
  case 'test':
    envConfig = require('./test.config').default;
    break;

  // Конфиг разработки на локальной машине
  case 'development':
    envConfig = require('./development.config').default;
    break;
}

export default {
  ...baseConfig,
  ...envConfig,
};

/* global process */
import developerConfigureStore from './develop';
import productionConfigureStore from './production';

export default function getConfigureStore() {
  if (process.env.NODE_ENV === 'development') {
    return developerConfigureStore;
  }

  if (process.env.NODE_ENV === 'production') {
    return productionConfigureStore;
  }
  return true;
}

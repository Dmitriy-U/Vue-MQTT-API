import { DIRECTIONS, METHODS } from '@/api/constants';
import { ENDPOINTS } from '@/api/endpoints';

function initialState() {
  return {
    list: [],
  };
}

const getters = {
  list: (state) => state.list,
};

const actions = {
  [`${METHODS.GET}/${DIRECTIONS.RES}/${ENDPOINTS.SPECIFICATIONS_ALL}`](
    { commit },
    data,
  ) {
    if (data === undefined) return;
    commit('setSpecificationList', data);
  },
};

const mutations = {
  setSpecificationList(state, data) {
    state.list = data;
  },
};

export default {
  namespaced: true,
  state: initialState(),
  getters,
  actions,
  mutations,
};

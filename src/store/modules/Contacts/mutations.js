import * as _ from './mutations-types';
export default {
  [_.SET_LOADING_LIST](state, nextState) {
    state.loadingList = nextState;
  },
  [_.SET_CONTACTS_LIST](state, list) {
    state.contactsList = list;
  },
  [_.SET_FILTERING_PROPS](state, props) {
    state.contactsFilters = { ...state.contactsFilters, ...props };
  },
};

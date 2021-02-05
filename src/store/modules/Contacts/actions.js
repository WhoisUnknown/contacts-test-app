import * as $ from './actions-types';
import * as _ from './mutations-types';
import { getList, editItem, removeItem, addItem } from './data.js';

const awaiter = function (timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), timer);
  });
};

export default {
  async [$.GET_CONTACTS_LIST]({ state, commit }, query) {
    commit(_.SET_LOADING_LIST, true);
    await awaiter(1000);
    const list = getList(query);
    commit(_.SET_CONTACTS_LIST, list);
    commit(_.SET_LOADING_LIST, false);
    return list;
  },
  async [$.ADD_CONTACT]({ state, dispatch }, data) {
    const res = addItem(data);
    if (res.success) {
      await dispatch($.GET_CONTACTS_LIST, state.contactsFilters);
    }
    return res;
  },
  async [$.EDIT_CONTACT]({ state, dispatch }, { id, data }) {
    const res = await editItem(id, data);
    if (res.success) {
      await dispatch($.GET_CONTACTS_LIST, state.contactsFilters);
    }
    return res;
  },
  async [$.REMOVE_CONTACT]({ state, dispatch }, id) {
    const res = await removeItem(id);
    if (res.success) {
      await dispatch($.GET_CONTACTS_LIST, state.contactsFilters);
    }
    return res;
  },

};

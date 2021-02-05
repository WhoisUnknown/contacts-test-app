import Vue from 'vue';
import Vuex from 'vuex';
import Contacts from './modules/Contacts';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Contacts,
  },
});

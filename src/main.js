import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import 'assets/scss/app.scss';
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

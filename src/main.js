import './style.css';
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);
app.use(router);
app.use(VueApexCharts);
app.mount('#app');

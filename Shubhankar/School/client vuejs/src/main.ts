/* eslint-disable prettier/prettier */
import { createApp } from "vue";
import App from "@/App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "@/router";
import Vue3EasyDataTable from "vue3-easy-data-table";

createApp(App)
  .component("EasyDataTable", Vue3EasyDataTable )
  .use(router)
  .mount("#app");

<!-- eslint-disable vue/no-unused-components -->
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
/* eslint-disable prettier/prettier */
import { defineComponent } from "vue";
import DoughnutChart from './components/Charts'

export default defineComponent({
  name: "App",
  components: {
  DoughnutChart
}
});
</script>
<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">bezKoder</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/school" class="nav-link">Schoolist</router-link>
        </li>       
        <li class="nav-item">
          <router-link to="/studentlist" class="nav-link">Studentlist</router-link>
        </li>      
        <li class="nav-item">
          <router-link to="/teacherslist" class="nav-link">TeachersList</router-link>
        </li>    
        <li class="nav-item">
          <router-link to="/validation2" class="nav-link">validation2</router-link>
        </li>    
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

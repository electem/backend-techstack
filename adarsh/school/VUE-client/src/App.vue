<!-- eslint-disable prettier/prettier -->
<script lang="ts">
/* eslint-disable prettier/prettier */
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
}
});
</script>
<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/school" class="navbar-brand">bezKoder</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/datatable" class="nav-link">data table</router-link>
        </li>   
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
          <router-link to="/customecharts" class="nav-link">Line-Chart</router-link>
        </li>     
        <li class="nav-item">
          <router-link to="/piechart" class="nav-link">Pie-Chart</router-link>
        </li>  
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<!-- eslint-disable prettier/prettier -->
<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">SchoolManagement</router-link>
      <div class="navbar-nav mr-auto">
       <li class="nav-item">
          <router-link to="/school" class="nav-link">School</router-link>
        </li>
         <li class="nav-item">
          <router-link to="/teacher" class="nav-link">Teacher</router-link>
        </li>  
        <li class="nav-item">
          <router-link to="/student" class="nav-link">Student</router-link>
        </li> 
    </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
    
</template>

<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  
});
</script>

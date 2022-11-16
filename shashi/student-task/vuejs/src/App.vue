<!-- eslint-disable prettier/prettier -->
<script lang="ts">
/* eslint-disable prettier/prettier */
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
});
</script>
<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">bezKoder</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/tutorials" class="nav-link">Tutorials</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/school" class="nav-link">Schoolist</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addschool" class="nav-link">CreateSchool</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/studentlist" class="nav-link">Studentlist</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addstudent" class="nav-link">AddStudent</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/teacherslist" class="nav-link">TeachersList</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addteacher" class="nav-link">CreateTeacher</router-link>
        </li>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<template>

  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="#" class="navbar-brand" v-size="'big'">BezKoder</a>
      <div class="navbar-nav mr-auto">
        
        <li class="nav-item">
          <a href="/school" class="nav-link">School</a>
        </li>
         <li class="nav-item">
          <a href="/student" class="nav-link">Student</a>
        </li>
          <li class="nav-item">
          <a href="/teacher" class="nav-link">Teacher</a>
        </li>
         <li class="nav-item">
          <a href="/chart" class="nav-link">Chart</a>
        </li>
        <li class="nav-item">
          <a href="/table" class="nav-link">Table</a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
      <BarChart />
  </div>
    
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BarChart from './components/SchoolChart.vue'


import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
}
});
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
</style>
<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-0 padding" >
          <slot />
        </div>
      </main>
      <Footer/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>
<style >
.padding{
  padding-top: 0rem;
}
</style>

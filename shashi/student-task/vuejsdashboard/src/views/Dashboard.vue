<template>
  <div>

    <div class="mt-4">   

      <div class="mt-6">
        <div
          class="
            my-1
            overflow-show
            bg-white
            rounded-md
            shadow        
            gap-5
          "
        >    
          <Pie />
          <AreaChart />        
          <BarChart />
        
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "../partials/Breadcrumb.vue";
import Pie from "@/components/charts/DonutChart.vue";
import BarChart from "../components/charts/BarChart.vue";
import AreaChart from "../components/charts/AreaChart.vue";
</script>

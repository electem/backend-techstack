<!-- eslint-disable prettier/prettier -->
<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Plugin
} from 'chart.js'
import Teacher from '@/types/Teacher'
import TeacherService from '@/services/TeacherService'
import ResponseData from '@/types/ResponseData'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'bar-chart',
  components: {
    Bar
  },
 props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    },
    plugins: {
      type: Array as PropType<Plugin<'bar'>[]>,
      default: () => []
    }
  },

 data() {
    return {
      teachers: [] as Teacher[],
      teacherNames: [] as string[],
      schoolCount: [] as number[],
      chartData: {
        labels: [] as string[],
        datasets: [
          {
            label: "",
            backgroundColor: "",
            data: [] as number[],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          intersect: false,
        },
      },
    }
 },

 methods: {
 async setup(){
    await  TeacherService
          .getAllTeachers()
          .then((response: ResponseData) => {
              this.teachers = response.data;
              for (const teacher of  this.teachers){
                this.teacherNames.push(teacher.teachername);
                this.schoolCount.push(teacher.schools?.length);
              }
            })
          .catch((e: Error) => {
            console.log(e);
          });

       this.chartData = {
       labels: this.teacherNames,
      datasets: [
        {
          label: 'School count',    
          backgroundColor: '#f87979',
          data:this.schoolCount,
          
        }
      ]
    },
      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          intersect: false,
        },
      };
      
  },
 },

 mounted() {
    this.setup();
  },
})
</script>

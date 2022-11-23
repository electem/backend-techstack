<!-- eslint-disable prettier/prettier -->
<template>
    <Pie
      :chart-data="chartData"
      :chart-options="chartOptions"
      :chart-id="chartId"
      :width="width"
      :height="height"
      :css-classes="cssClasses"
      :styles="styles"
      :plugins="plugins"
    />
  </template>  <!-- eslint-disable prettier/prettier -->
  <script lang="ts">
import { defineComponent,  PropType } from "vue";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin,
} from "chart.js";
import School from "@/types/school";
import ResponseData from "@/types/ResponseData";
import studentservice from "@/services/studentservice";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default defineComponent({
  name: "PieChart",
  data() {
    return {        
      schoolList: [] as School[],
      schoolNames: [] as string[],
      teacherCountInschool: [] as number[],
      chartData: {
        labels: [] as string[],
        datasets: [
          {
            backgroundColor: [] as string[],
            data: [] as number[],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,       
      },
    };
  },
  components: {
    Pie,
  },
  props: {
    chartId: {
      type: String,
      default: "pie-chart",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
    },
    plugins: {
      type: Array as PropType<Plugin<"pie">[]>,
      default: () => [],
    },
  },
  methods: {
   async setup() {
    await  studentservice
        .getAll()
        .then((response: ResponseData) => {
          this.schoolList = response.data;
          console.log(response.data);
          this.schoolNames = this.schoolList.map((school) => school.schoolname);
          console.log(this.schoolNames);
          this.teacherCountInschool = this.schoolList.map((school) => school.teacher.length);
        })
        this.chartData = {
      labels:this.schoolNames,
      datasets: [
        {
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
          data: this.teacherCountInschool,
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };
    },
  },
  mounted() {
    this.setup();
  },
});

  </script>
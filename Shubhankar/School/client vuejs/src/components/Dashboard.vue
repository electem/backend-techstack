<!-- eslint-disable prettier/prettier -->
<template>
  <div class="content-wrapper pb-0" style="margin-top: -2350px">
    <div class="page-header flex-wrap">
      <h3 class="mb-0">
        Hi, welcome back!
        <span class="pl-0 h6 pl-sm-2 text-muted d-inline-block"
          >Your web analytics dashboard .</span
        >
      </h3>
    </div>
    <div class="row">
      <div class="col-xl-3 col-lg-12 stretch-card grid-margin">
        <div class="row"></div>
      </div>
      <div class="col-xl-12 stretch-card grid-margin">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-7">
                <h5>School Survey</h5>
                <p class="text-muted">
                  Show overview jan 2022 - Nov 2022
                  <a class="text-muted font-weight-medium pl-2" href="#"
                    ><u>See Details</u></a
                  >
                </p>
              </div>
              <div class="col-sm-5 text-md-right">
                <button
                  type="button"
                  class="btn btn-icon-text mb-3 mb-sm-0 btn-inverse-primary font-weight-normal"
                >
                  <i class="mdi mdi-email btn-icon-prepend"></i>Download Report
                </button>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-sm-12">
                <div id="barChart" class="card-title">
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
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-7">
                <h5>Teacher Survey</h5>
                <p class="text-muted">
                  Show overview jan 2022 - Nov 2022
                  <a class="text-muted font-weight-medium pl-2" href="#"
                    ><u>See Details</u></a
                  >
                </p>
              </div>
              <div class="col-sm-5 text-md-right">
                <button
                  type="button"
                  class="btn btn-icon-text mb-3 mb-sm-0 btn-inverse-primary font-weight-normal"
                >
                  <i class="mdi mdi-email btn-icon-prepend"></i>Download Report
                </button>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-sm-12">
                <div id="lineChart" class="card-title">
                  <LineChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Bar } from "vue-chartjs";
import Teacher from "@/types/Teacher";
import ResponseData from "@/types/ResponseData";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  Plugin,
} from "chart.js";
import SchoolService from "@/services/SchoolService";
import School from "@/types/School";
import LineChart from "@/components/Linechart.vue";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement
);
export default defineComponent({
  name: "App",
  components: {
    Bar,
    LineChart,
  },

  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
    plugins: {
      type: Array as PropType<Plugin<"bar">[]>,
      default: () => [],
    },
  },

  data() {
    return {
      teachers: [] as Teacher[],
      teacherNames: [] as string[],
      schoolCount: [] as number[],

      schools: [] as School[],
      schoolNames: [] as string[],
      teacherCount: [] as number[],

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
    };
  },
  methods: {
    async setup() {
      await SchoolService.getAllSchool()
        .then((response: ResponseData) => {
          this.schools = response.data;
          for (const school of this.schools) {
            this.schoolNames.push(school.schoolname);
            this.teacherCount.push(school.teachers?.length);
          }
        })
        .catch((e: Error) => {
          console.log(e);
        });
      (this.chartData = {
        labels: this.schoolNames,
        datasets: [
          {
            label: "Teacher count",
            backgroundColor: "#f87979",
            data: this.teacherCount,
          },
        ],
      }),
        (this.chartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            intersect: false,
          },
        });
    },
  },
  mounted() {
    this.setup();
  },
});
</script>
<!-- eslint-disable prettier/prettier -->
<style>
@import "assets/css/Tablelist.css";
@import "assets/vendors/mdi/css/materialdesignicons.min.css";
@import "assets/vendors/flag-icon-css/css/flag-icon.min.css";
@import "assets/vendors/css/vendor.bundle.base.css";
@import "assets/vendors/font-awesome/css/font-awesome.min.css";
</style>

<!-- eslint-disable prettier/prettier -->
<template>
  <LineWithLine
    :chart-data="chartData"
    :chart-options="chartOptions"
    :chart-id="chartId"
    :width="width"
    :height="height"
    :css-classes="cssClasses"
    :styles="styles"
    :plugins="plugins"
  />
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { generateChart } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Plugin,
} from "chart.js";
import School from "@/types/school";
import studentservice from "@/services/studentservice";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

class LineWithLineController extends LineController {
  draw() {
    super.draw();

    if (this.chart?.tooltip?.active) {
      const ctx = this.chart.ctx;
      const x = this.chart.tooltip.x;
      const topY = this.chart.scales["y-axis-0"].top;
      const bottomY = this.chart.scales["y-axis-0"].bottom;

      // draw line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#07C";
      ctx.stroke();
      ctx.restore();
    }
  }
}
const LineWithLine = generateChart(
  "line-with-chart",
  "line",
  LineWithLineController
);
export default defineComponent({
  name: "CustomChart",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    LineWithLine,
  },
  props: {
    chartId: {
      type: String,
      default: "-chart",
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
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
    plugins: {
      type: Array as PropType<Plugin<"line">[]>,
      default: () => [],
    },
  },
  data() {
    return {
      schoolList: [] as School[],
      schoolname: "",
      schoolNames: [] as string[],
      teacherCountInschool: [] as number[],
      studentsCountInschool: [] as number[],
      props: "",
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
    await  studentservice.getAllSchool().then((response) => {
        this.schoolList = response.data;
        console.log(response.data);
        this.schoolNames = this.schoolList.map((school) => school.schoolname);
        console.log(this.schoolNames);
        this.teacherCountInschool = this.schoolList.map(
          (school) => school.teacher.length);
      });
      this.chartData = {
        labels:   this.schoolNames ,
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: this.teacherCountInschool,
          },
        ],
      };

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
});
</script>

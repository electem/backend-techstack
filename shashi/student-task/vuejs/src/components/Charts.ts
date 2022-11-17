/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { defineComponent, h, PropType } from "vue";

import { Doughnut } from "vue-chartjs";
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
import studentservice from "@/services/studentservice";
import ResponseData from "@/types/ResponseData";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default defineComponent({
  name: "DoughnutChart",
  components: {
    Doughnut,
  },

  data() {
    return {
      // schoolList: [] as School[],
      //studentData: [] as School[],
    };
  },
  methods: {
    retrieveSchools() {
      // studentservice
      //   .getAll()
      //   .then((response: ResponseData) => {
      //     this.schoolList = response.data;
      //     console.log(response.data);
      //   })
      //   .catch((e: Error) => {
      //     console.log(e);
      //   });
      // this.schoolname = this.schoolList.map((school) => school.schoolname!);
      // this.countOfteachers = this.schoolList.map(
      //   (school) => school.teacher!.length
      // );
      // for (const school of this.schoolList) {
      //   this.schoolname.push(school.schoolname!);
      //   console.log(this.schoolname);
      //   this.countOfteachers.push(school.teacher?.length);
      //   console.log(this.countOfteachers);
      // }
    },
  },
  props: {
    chartId: {
      type: String,
      default: "doughnut-chart",
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
      default: () => {},
    },
    plugins: {
      type: Array as PropType<Plugin<"doughnut">[]>,
      default: () => [],
    },
  },

  setup(props) {
    let schoolList: School[] = [];
    const schoolname: string[] = [];
    const countOfteachers: number[] = [];
    studentservice
      .getAll()
      .then((response: ResponseData) => {
        schoolList = response.data;
        console.log(schoolList);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    // schoolname = schoolList.map((school) => school.schoolname!);
    // countOfteachers = schoolList.map((school) => school.teacher!.length);
    for (const school of schoolList) {
      schoolname.push(school.schoolname);
      console.log(schoolname);
      countOfteachers.push(school.teacher.length);
      console.log(countOfteachers);
    }
    const chartData = {
      labels: [schoolname],
      datasets: [
        {
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
          data: countOfteachers,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return () =>
      h(Doughnut, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      });
  },
  mounted() {
    //this.retrieveSchools();
   
  },
});

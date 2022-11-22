/* eslint-disable prettier/prettier */
import { defineComponent, h, PropType } from "vue";

import { Pie, Bar } from "vue-chartjs";
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
  // data() {
  //   return {
  //     schoolList: [] as School[],
  //     schoolname: "",
  //     schoolNames: [] as string[],
  //     teacherCountInschool: [] as number[],
  //   };
  // },
  components: {
    Pie,
    Bar,
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
    // retrieveSchools() {
    //   studentservice
    //     .getAll()
    //     .then((response: ResponseData) => {
    //       this.schoolList = response.data;
    //       console.log(response.data);
    //     })
    //     .catch((e: Error) => {
    //       console.log(e);
    //     });
    //   this.schoolNames = this.schoolList.map((school) => school.schoolname);
    //   this.teacherCountInschool = this.schoolList.map(
    //     (school) => school.teacher.length
    //   );
    //   this.$props;
    // },
  },
  mounted() {
    //this.retrieveSchools();
  },
  setup(props) {
    let schoolList = [] as School[];
    const schoolNames = [] as string[];
    const teacherCountInschool = [] as number[];
    studentservice
      .getAll()
      .then((response: ResponseData) => {
        schoolList = response.data;
        for (const i of schoolList) {
          
          schoolNames.push(i.schoolname);
        }
        for (const j of schoolList) {
          teacherCountInschool.push(j.teacher.length);
        }

        schoolNames.push();
        console.log(schoolNames);
        console.log(teacherCountInschool);
      })
      .catch((e: Error) => {
        console.log(e);
      });

    const chartData = {
      labels: schoolNames,
      datasets: [
        {
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
          data: teacherCountInschool,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return () =>
      h(Pie, {
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
});

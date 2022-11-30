<template>
  <div>
    <label>Total Number Of teachers In each School</label>
    <apexchart
      width="800"
      type="bar"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>
<script lang="ts">
import studentservice from "@/studentservice";
import School from "@/types/school";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "CustomChart",
  data() {
    return {
      schoolList: [] as School[],
      schoolname: "",
      schoolNames: [] as string[],
      teacherCountInschool: [] as number[],
      studentsCountInschool: [] as number[],
      options: {},
      series: {},
    };
  },
  methods: {
    async setup() {
      await studentservice.getAllSchool().then((response) => {
        this.schoolList = response.data;
        console.log(response.data);
        this.schoolNames = this.schoolList.map((school) => school.schoolname);
        console.log(this.schoolNames);
        this.teacherCountInschool = this.schoolList.map(
          (school) => school.teacher.length
        );
      });
      this.options = ref({
        chart: {
          label: "Data One",
          backgroundColor: "#f87979",
          id: "vuechart-example",
        },
        xaxis: {
          categories: this.schoolNames,
        },
      });
      this.series = ref([
        {
          name: "series-1",
          data: this.teacherCountInschool,
        },
      ]);
    },
  },

  mounted() {
    this.setup();
  },
});
</script>

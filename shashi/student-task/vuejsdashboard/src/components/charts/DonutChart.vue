<template>
  <div>
    <apexchart
      width="380"
      type="donut"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import studentservice from "@/studentservice";
import School from "@/types/school";
import { defineComponent } from "vue";
export default defineComponent({
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
        this.schoolNames = this.schoolList.map((schooll) => schooll.schoolname);
        console.log(this.schoolNames);
        this.teacherCountInschool = this.schoolList.map(
          (school) => school.teacher.length
        );
      });
      this.options =  ref({});
      this.series = ref(this.teacherCountInschool);
    },
  },

  mounted() {
    this.setup();
  },
});
</script>
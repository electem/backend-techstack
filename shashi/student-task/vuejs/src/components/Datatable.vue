<!-- eslint-disable prettier/prettier -->
<template>
  <EasyDataTable
    buttons-pagination
    :headers="headers"
    :items="items"
    :loading="loading"
  />
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent, ref } from "vue";
import type { Header, Item, ServerOptions } from "vue3-easy-data-table";
import studentservice from "@/services/studentservice";
import School from "@/types/school";

export default defineComponent({
  name: "edit-school",
  data() {
    return {
      currentSchool: {} as School,
      message: "",
      headers: [] as Header[],
      items: [] as Item[],
      teacherCountInschool: [] as number[],
      loading: ref(false),
      serverItemsLength: ref(0),
      serverOptions: ref<ServerOptions>({
        page: 1,
        rowsPerPage: 5,
        sortBy: "age",
        sortType: "desc",
      }),
    };
  },
  methods: {
    setup() {
      this.headers = [
        { text: "schoolname", value: "schoolname" },
        { text: "address", value: "address" },
        { text: "No_Of_Teachers", value: "teacher.length", sortable: true },
      ];
      studentservice.getAllSchool().then((response) => {
        console.log(response.data);
        this.items = response.data;
      });
    },
  },

  mounted() {
    this.setup();
  },
});
</script>

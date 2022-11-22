<!-- eslint-disable prettier/prettier -->

<template>
  <EasyDataTable :headers="headers" :items="items" />
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent } from "vue";
import type { Header, Item } from "vue3-easy-data-table";
import studentservice from "@/services/studentservice";
import ResponseData from "@/types/ResponseData";
import School from "@/types/school";

export default defineComponent({
  name: "edit-school",
  setup() {
    let schoolList = [] as School[];
    let items:Item[] =[];
    const headers: Header[] = [
      { text: "schoolname", value: "schoolname" },
      { text: "address", value: "address" },
    ];    
    studentservice.getAll().then((response: ResponseData) => {
      schoolList = response.data;
      console.log(response.data);
      items = schoolList;
    });
    return {
      headers,
      items,
    };
  },
});
</script>

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
  data(){
    return{
      headers:[ { text: "schoolname", value: "schoolname" },
      { text: "address", value: "address" },],
      items:this.schollist
    //   items,
    }
  },
  setup() {
    // const headers: Header[] = [
    //   { text: "schoolname", value: "schoolname" },
    //   { text: "address", value: "address" },
    // ];

    let schoolList: School[] = [];
    studentservice
      .getAll()
      .then((response: ResponseData) => {
        schoolList = response.data;
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    // const json = JSON.stringify(schoolList);
    // const jsonStrings = schoolList.map((item) => JSON.stringify(item));
    // console.log(jsonStrings);
   // const items: Item[] = schoolList;
    // { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
    // { "name": "James", "height": 180, "weight": 75, "age": 21 },
    // { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    // { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    // { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    // { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    // { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    // { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    // { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    // { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    // { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    // { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    // { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    // { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    // { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    // { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    // { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    // return {
    //   headers,
    //   items,
    // };
  },
});
</script>

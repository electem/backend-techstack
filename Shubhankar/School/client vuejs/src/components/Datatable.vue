<!-- eslint-disable prettier/prettier -->
<template>
  <EasyDataTable
   buttons-pagination
    :headers="headers"
    :items="items"
     border-cell
     show-index
     multi-sort
  />
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import SchoolService from "@/services/SchoolService";
import ResponseData from "@/types/ResponseData";
import { defineComponent } from "vue";
import type { Header, Item } from "vue3-easy-data-table";

export default defineComponent({

  name: "Datatable", 

  data() {
    return {
       headers:[] as Header[], 
       items:[] as Item[],
     };
  },

  methods:{
 async setup() {
        this.headers = [
      { text: "SchoolId", value: "schoolid", sortable: true},
      { text: "Name", value: "schoolname" },
      { text: "Address", value: "address", sortable: true},
      { text: "Established", value: "createdAt", sortable: true},
      { text: "Teachers Present", value: "teachers.length", sortable: true },
      { text: "Students Present", value: "students.length", sortable: true }
    ];

      await  SchoolService.getAllSchool()
        .then((response: ResponseData) => {
          this.items = response.data;
          
        })
        .catch((e: Error) => {
          console.log(e);
        });
     },
  },
 mounted() {
    this.setup() ;
  },

});
</script>
<!-- eslint-disable prettier/prettier -->
<style >

.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>

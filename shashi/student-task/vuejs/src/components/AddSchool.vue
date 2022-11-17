<!-- eslint-disable prettier/prettier -->

<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="schoolname">School name</label>
        <input
          type="text"
          class="form-control"
          id="schoolname"
          placeholder="schoolname"
          required
          v-model="school.schoolname"
          name="schoolname"
        />
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <textarea
          class="form-control"
          id="address"
          required
          v-model="school.address"
          name="address"
          placeholder="address"
        ></textarea>
      </div>
      <div>
  </div>    
      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>
    

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
  
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { Field, useValidation } from "vue3-form-validation";
import { computed, PropType } from "vue";
import { defineComponent } from "vue";
import Multiselect from '@suadelabs/vue3-multiselect'
import studentservice from "@/services/studentservice";
import School from "@/types/school";
import ResponseData from "@/types/ResponseData";
export default defineComponent({
  name: "add-tutorial",
  Multiselect,
  validating: {
    type: Boolean,
    required: true,
  },
  submitting: {
    type: Boolean,
    required: true,
  },
  hasError: {
    type: Boolean,
    required: true,
  },
  errors: {
    type: Object as PropType<string[]>,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
  data() {
    return {
      school: {
        schoolname: "",
        address: "",
      } as School,

      submitted: false,
      value: null,
        options: [
          'Batman',
          'Robin',
          'Joker',
        ],
        selected: null,
        options1: ['list', 'of', 'options']
    };
    
  },
  methods: {
    saveTutorial() {
      let data = {
        schoolname: this.school.schoolname,
        address: this.school.address,
      };

      studentservice
        .create(data)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.school = {} as School;
    },
  },  
});


</script>
<style></style>
<!-- eslint-disable prettier/prettier -->
<style >
.submit-form {
  max-width: 300px;
  margin: auto;
}
.body {
  padding: 1rem;
}

</style>

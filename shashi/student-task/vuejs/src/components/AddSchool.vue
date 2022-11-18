<!-- eslint-disable prettier/prettier -->

<template>
  <form @submit="onSubmit" class="add-form">
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
        <div></div>
        <input
          type="submit"
          value="Submit"
          @click="onSubmit"
          class="btn-btn-block"
        />
        <button
          type="submit"
          value="Submit"
          @click="saveTutorial"
          class="btn btn-success"
        >
          Submit
        </button>
      </div>
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newTutorial">Add</button>
      </div>
    </div>
  </form>
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent } from "vue";
import studentservice from "@/services/studentservice";
import School from "@/types/school";
import ResponseData from "@/types/ResponseData";
export default defineComponent({
  name: "add-tutorial",
  data() {
    return {
      school: {
        schoolname: "",
        address: "",
      } as School,

      submitted: false,
    };
  },
  methods: {
    onSubmit(event: any) {
      console.log(event);
    },
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
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
.body {
  padding: 1rem;
}
</style>

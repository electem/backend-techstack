<!-- eslint-disable prettier/prettier -->
<template>
    <div>
<h2>Vee validation</h2>
<!-- <ValidationObserver v-slot="{handleSubmit}">
    <form @submit.prevent="handleSubmit(onSubmit)">
        <ValidationProvider name="Name" rules="required|alpha" v-slot="{errors }">
            <div class="form-group">
                <label for="">Name</label>
                <input type="text" class="form-control" v-model="formData.name">
                <span>{{errors[0]}}</span>
            </div>
        </ValidationProvider>
    </form>
</ValidationObserver> -->
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            formData: {
                name: "",
                email: "",
                password: "",
                gender: "",
                acceptterms: null,
            }
        };
    },
    methods: {
        onSubmit() {
            console.log(this.formData);
        }
    },
    // components: { ValidationProvider,ValidationObserver }
    
})
</script>

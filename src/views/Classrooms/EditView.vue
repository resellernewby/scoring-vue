<script setup>
import { watchEffect, onBeforeUnmount } from 'vue'
import { useClassroom } from '@/stores/classroom'
import { useRoute } from 'vue-router'

const store = useClassroom()
const route = useRoute()

onBeforeUnmount(store.resetForm)

watchEffect(async () => {
  store.getClassroom({ id: route.params.id })
})
</script>

<template>
  <form @submit.prevent="store.updateClassroom({ id: route.params.id })" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Edit Classroom</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="classroom_name" class="required">Classroom Name</label>
        <input
          v-model="store.form.name"
          id="name"
          name="name"
          type="text"
          class="form-input plate"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="name" />
      </div>
      <div class="flex flex-col gap-2">
        <label class="flex gap-2 items-center hover:cursor-pointer">
          <input
            v-model="store.form.is_active"
            type="checkbox"
            class="w-4 h-4"
            :disabled="store.loading"
          />
          <span class="select-none">Is Active</span>
        </label>
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex gap-2">
        <button type="submit" class="btn btn-primary w-full" :disabled="store.loading">
          <IconSpinner class="animate-spin" v-show="store.loading" />
          Update Classroom
        </button>
        <RouterLink :to="{ name: 'classrooms.index' }" class="btn btn-secondary">
          Cancel
        </RouterLink>
      </div>
    </div>
  </form>
</template>

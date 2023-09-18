<script setup>
import { onBeforeUnmount } from 'vue'
import { useClassroom } from '@/stores/classroom'
import { useScore } from '@/stores/score'

const classroomStore = useClassroom()
const scoreStore = useScore()

classroomStore.getClassrooms().then((res) => {
  if (res.length > 0) {
    scoreStore.form.classroom_id = response[0].id
  }
})

onBeforeUnmount(scoreStore.resetForm)
</script>

<template>
  <form @submit.prevent="scoreStore.storeScore" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Scoring</h1>

      <div class="flex flex-col gap-2 mb-4">
        <label for="classroom_id" class="required">Classroom</label>
        <select
          v-model="scoreStore.form.classroom_id"
          name="classroom_id"
          id="classroom_id"
          class="form-input"
          :disabled="scoreStore.loading"
        >
          <option
            v-for="classroom in classroomStore.classrooms"
            :value="classroom.id"
            :key="classroom.id"
          >
            {{ classroom.name.toUpperCase() }}
          </option>
        </select>
        <ValidationError :errors="scoreStore.errors" field="classroom_id" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="scoring_floor" class="required">Lantai</label>
        <input
          v-model="scoreStore.form.scoring_floor"
          id="scoring_floor"
          name="scoring_floor"
          type="number"
          class="form-input plate"
          :disabled="scoreStore.loading"
        />
        <ValidationError :errors="scoreStore.errors" field="scoring_floor" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="scoring_table" class="required">Meja</label>
        <input
          v-model="scoreStore.form.scoring_table"
          id="scoring_table"
          name="scoring_table"
          type="number"
          class="form-input plate"
          :disabled="scoreStore.loading"
        />
        <ValidationError :errors="scoreStore.errors" field="scoring_table" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="scoring_equipment" class="required">Peralatan</label>
        <input
          v-model="scoreStore.form.scoring_equipment"
          id="scoring_equipment"
          name="scoring_equipment"
          type="number"
          class="form-input plate"
          :disabled="scoreStore.loading"
        />
        <ValidationError :errors="scoreStore.errors" field="scoring_equipment" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="scoring_date" class="required">Tanggal</label>
        <input
          v-model="scoreStore.form.scoring_date"
          id="scoring_date"
          name="scoring_date"
          type="text"
          class="form-input plate"
          :disabled="scoreStore.loading"
        />
        <ValidationError :errors="scoreStore.errors" field="scoring_date" />
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex gap-2">
        <button type="submit" class="btn btn-primary w-full" :disabled="scoreStore.loading">
          <IconSpinner class="animate-spin" v-show="scoreStore.loading" />
          Save Score
        </button>
        <RouterLink :to="{ name: 'score.index' }" class="btn btn-secondary"> Cancel </RouterLink>
      </div>
    </div>
  </form>
</template>

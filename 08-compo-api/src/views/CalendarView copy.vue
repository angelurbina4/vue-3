<template>
  <div>
    <q-form @submit.prevent="saveEvent">
      <q-input v-model="event.title" label="Título del evento" required />
      <q-input v-model="event.description" label="Descripción del evento" />
      <q-date v-model="event.startDate" label="Fecha de inicio" required />
      <q-date v-model="event.endDate" label="Fecha de finalización" required />
      <q-select v-model="event.repeatType" label="Frecuencia de repetición" :options="repeatOptions" required />
      <div v-if="event.repeatType === 'weekly'">
        <q-select v-model="event.weeklyDays" label="Días de la semana" :options="weeklyDayOptions" multiple required />
      </div>
      <q-list v-if="event.repeatType">
        <q-item v-for="(date, index) in repeatedDates" :key="index">
          <q-item-label>{{ date.toLocaleString() }}</q-item-label>
        </q-item>
      </q-list>
      <q-btn type="submit" label="Guardar" />
    </q-form>
  </div>
</template>
<script>
import { ref, computed } from 'vue'
import { DateTime } from 'luxon'

export default {
  name: 'RecurringEventEditor',
  setup() {
    const event = ref({
      title: '',
      description: '',
      startDate: null,
      endDate: null,
      repeatType: null,
      weeklyDays: [], // Agregamos un nuevo campo para los días de la semana
    })

    const repeatOptions = ref([
      { label: 'No repetir', value: null },
      { label: 'Diariamente', value: 'daily' },
      { label: 'Semanalmente', value: 'weekly' },
      { label: 'Mensualmente', value: 'monthly' },
      { label: 'Anualmente', value: 'yearly' },
    ])

    const weeklyDayOptions = ref([
      { label: 'Lunes', value: 'monday' },
      { label: 'Martes', value: 'tuesday' },
      { label: 'Miércoles', value: 'wednesday' },
      { label: 'Jueves', value: 'thursday' },
      { label: 'Viernes', value: 'friday' },
      { label: 'Sábado', value: 'saturday' },
      { label: 'Domingo', value: 'sunday' },
    ])

    const repeatedDates = computed(() => {
      if (!event.value.startDate || !event.value.endDate || !event.value.repeatType) {
        return []
      }

      const startDate = DateTime.fromISO(event.value.startDate)
      const endDate = DateTime.fromISO(event.value.endDate)
      const repeatType = event.value.repeatType

      const dates = []
      let currentDate = startDate

      while (currentDate <= endDate) {
        if (repeatType === 'weekly' && !event.value.weeklyDays.includes(currentDate.toFormat('EEEE').toLowerCase())) {
          // Si estamos creando un evento semanal y el día de la semana actual no está incluido en la selección del usuario, lo omitimos
          currentDate = currentDate.plus({ days: 1 })
          continue
        }

        dates.push(currentDate)
        switch (repeatType) {
          case 'daily':
            currentDate = currentDate.plus({ days: 1 })
            break
          case 'weekly':
            currentDate = currentDate.plus({ weeks: 1 })
            break
          case 'monthly':
            currentDate = currentDate.plus({ months: 1 })
            break
          case 'yearly':
            currentDate = currentDate.plus({ years: 1 })
            break
        }
      }

      return dates
    })

    const saveEvent = () => {
      // Guardamos el evento en la base de datos o hacemos lo que sea necesario
      console.log(event.value)
    }

    return {
      event,
      repeatOptions,
      weeklyDayOptions,
      repeatedDates,
      saveEvent,
    }
  },
}
</script>

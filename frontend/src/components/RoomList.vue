<template>
  <div class="room-list">
    <div v-if="rooms.length === 0" class="no-rooms">
      <p>Nenhuma sala disponível.</p>
    </div>
    <div v-for="room in rooms" :key="room.id" class="room-card">
      <div class="room-content">
        <h3 class="room-name">{{ room.name }}</h3>
        <p class="room-capacity">Capacidade: {{ room.capacity }} pessoas</p>
        <div class="room-resources">
          <span
            v-for="resource in room.resources"
            :key="resource"
            class="resource"
          >
            {{ resource }}
          </span>
        </div>
        <div class="room-slots">
          <h4 class="slots-title">Horários Disponíveis:</h4>
          <div class="slot-list">
            <span
              v-for="(slot, index) in room.availableSlots"
              :key="index"
              class="slot"
            >
              {{ slot }}
            </span>
          </div>
        </div>
      </div>
      <div class="room-footer">
        <button 
          @click="$emit('open-reservation', room)" 
          class="reserve-button" 
          aria-label="Reservar {{ room.name }}">
          Reservar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const rooms = ref([])

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
})

const fetchRooms = async () => {
  try {
    const response = await api.get('/meeting-rooms/')
    rooms.value = response.data.map(room => ({
      ...room,
      availableSlots: room.disponibilidade,  // Atribuindo diretamente o array de horários
    }))
  } catch (error) {
    console.error('Erro ao buscar salas:', error.response?.data || error.message)
  }
}


// Chamando fetchRooms ao montar o componente
onMounted(fetchRooms)

defineProps({
  rooms: Array
})

defineEmits(['open-reservation'])
</script>

<style scoped>
.room-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.no-rooms {
  grid-column: span 100%; /* Ocupa todas as colunas */
  text-align: center; /* Centraliza o texto */
  font-size: 1.25rem;
  color: #666;
}

.room-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column; 
  height: 100%; 
}

.room-content {
  padding: 16px;
  flex-grow: 1; 
}

.room-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.room-capacity {
  font-size: 0.875rem;
  color: #666;
}

.room-resources {
  margin-top: 8px;
}

.resource {
  display: inline-block;
  background-color: #e2e8f0;
  border-radius: 12px;
  padding: 4px 12px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a5568;
  margin-right: 8px;
  margin-bottom: 8px;
}

.room-slots {
  margin-top: 16px;
}

.slots-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 4px;
}

.slot-list {
  display: flex; 
  flex-wrap: wrap; 
  gap: 8px; 
}

.slot {
  background-color: #c6f6d5; 
  color: #276749; 
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
}

.room-footer {
  background-color: #f7fafc; 
  padding: 16px;
}

.reserve-button {
  width: 100%;
  padding: 10px;
  background-color: #4c51bf; 
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.reserve-button:hover {
  background-color: #434190; 
}
</style>

<script setup>

    import { computed } from 'vue';

    const props = defineProps({
        stats: Array
    })
    
    const options = {
        chart: {
          id: 'stats-pokemon'
        },
        xaxis: {
          categories: ['PuntosVida', 'Ataque', 'Defensa', 'Ataque ES', 'Defensa ES', 'Velocidad']
        }
    }

    const series = computed(()=> [
        {
            name: 'valor',
            data: props.stats
        }
    ])
    
</script>

<template>

    <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
    
</template>

<style scoped>

</style>

<script setup>

    import { ref, reactive, toRefs, computed, onMounted, watch } from 'vue';
    import { useRoute } from 'vue-router';

    //se pudo hacer con una props que cambiara el valor del atributo type del grafico
    //pero vamos a colocar en practica el tema de componente Component
    import BarChart from '../components/BarChart.vue';
    import RadarChart from '../components/RadarChart.vue';

    const route = useRoute();

    //estas variables pueden ir en el objeto state, el objeto state se puede llamar de cualquier forma, esta es una tecnica
    const error = ref(false);
    const loading = ref(true);

    const state = reactive({
        pokemon : null, 
        stats: computed(()=>filterStats()),
        types: computed(()=>filterTypes()),
        isBar: true
    })

    const { pokemon, stats, types } = toRefs(state);

    function filterStats(){
        if(state.pokemon){
            return state.pokemon.stats.map(stat => stat.base_stat);
        }    
    }

    function filterTypes(){
        if(state.pokemon){
            return state.pokemon.types.map(type => type.type.name);
        }    
    }

    const changeTypeChart = () => {
        state.isBar = !state.isBar;
    }

    const labelButton = computed(()=>{
        return `Cambiar a grafico de ${ state.isBar ? 'radar ' : 'barra' }`;
    })    

    const getData = async () => {
        pokemon.value = null;
        error.value = false;
        loading.value = true;
        await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
        .then(res => {            
            if(!res.ok){
                error.value = true;
                loading.value = false;
            }
            else{
                return res.json()
            }
        })
        .then(data => {
            setTimeout(()=>{
                loading.value = false;
                pokemon.value = data;
            }, 500);
            // pokemon.value = data;
        })
        .catch(error => {
            error.value = true;
            loading.value = false;
        })
    }

    onMounted(()=>{
        getData();
    })

    watch(route, ()=>{
        getData();
    })
    
</script>

<template>
    <div v-if="pokemon" class="mt-3">        
        <div class="w-4/6 mx-auto rounded-xl p-5 shadow-lg">
            <h2 class="font-black md:text-3xl text-xl text-red-900 mb-2">{{ pokemon.name }}</h2>
            <span 
                v-for="(type, i) in types" 
                :key="'type'+i" 
                class="py-1 px-2 mr-2 mt-3 shadow-md rounded-full bg-red-500 text-white font-semibold"
            >
                {{ type }}
            </span>
            <div class="md:flex flex-wrap">
                <div class="flex-1 grid place-items-center">
                    <img 
                        :src="pokemon.sprites.front_default" 
                        :alt="pokemon.name" 
                        class="w-48 h-48" />
                </div>
                <div class="flex-1">
                    <div class="flex justify-end">
                        <button @click="changeTypeChart">{{ labelButton }}</button>
                    </div>
                    <!-- <BarChart :stats="stats" /> -->
                    <Component :is="state.isBar ? BarChart : RadarChart" :stats="stats" />
                </div>
            </div>            
        </div>
    </div>
    <div class="spinner" v-if="loading">
        <div class="cube1"></div>
        <div class="cube2"></div>
    </div>
    <div v-if="error" class="text-red-500 text-center bg-red-100 border-color-red p-3 mt-5">
        No hay datos disponibles
    </div>
</template>

<style scoped>
.spinner {
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
}

.cube1, .cube2 {
  background-color: #333;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;
  
  -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
  animation: sk-cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes sk-cubemove {
  25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }
  50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }
  75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }
  100% { -webkit-transform: rotate(-360deg) }
}

@keyframes sk-cubemove {
  25% { 
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  } 50% { 
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  } 50.1% { 
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  } 75% { 
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  } 100% { 
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
</style>
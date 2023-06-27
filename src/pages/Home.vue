<script setup>

    import { computed, reactive, toRefs } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const state = reactive({
        pokemons: [],
        name: ''    
    })

    //ya la variable pokemons no se esta utilizando en la vista, no es necesaria
    const { pokemons, name } = toRefs(state); //para no utilizar state.pokemons

    const filterPokemon = computed(()=>searchPokemon())   

    function searchPokemon(){
        return state.pokemons.filter(pokemon => {
            return pokemon.name.toLowerCase().includes(name.value.toLowerCase())
        })  
    }

    const total = computed(()=>{
        return filterPokemon.value.length;
    })

    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
        .then(res => res.json())
        .then(data =>{
            data.results.forEach((element, index) => {
                const pokemon = {
                    ...element,
                    index: index+1
                }

                state.pokemons.push(pokemon);
            });
        })

    //funcionalidad agregada por practica y mejorar la interaccion del usuario
    //el <LI> no tiene el enlace, cuando estas sobre el li, pero no en el <a>
    //se muestra el icono de la mano, pero no activa el enlace
    //se le asigna esta funcion al click al li
    //pero si hacemos click sobre el a, tambien se activa esta funcion, por lo cual se realiza un if para determinar que elemento llama la funcion

    const activateLink = (event, index) => {
        if(!event.target.classList.contains('cursor-pointer'))
            return;

        router.push(`/details/${ index }`);
    }

</script>

<template>
    <div class="grid grid-cols-6 gap-1">
        <div class="col-span-1">
            <div>
                <input 
                    type="text" 
                    class="mb-3 p-2 border-black-500 border-2 w-100" 
                    placeholder="nombre del pokemon" 
                    v-model="name"  
                />
                <br>
                <span class="text-sm">{{ total }} pokemons encontrados</span>                
            </div>
            <ul class="overflow-y-auto max-h-96 w-100">
                <li 
                    v-for="pokemon in filterPokemon" 
                    :key="pokemon.index"  
                    @click="activateLink($event, pokemon.index)"
                    class="mt-2 p-2 rounded hover:text-indigo-400 hover:bg-indigo-100 cursor-pointer border-l-2 border-l-solid border-l-indigo-400" 
                >
                    <router-link :to="`/details/${pokemon.index}`" class="font-bold" active-class="active">
                        #{{ pokemon.index }} {{ pokemon.name }} 
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="col-span-5">
            <router-view></router-view>
        </div>
    </div>
    
</template>

<style scoped>
    .active{
        background-color: rgb(224 231 255);
        color: rgb(129 140 248);
        padding: 8px 20px 8px 5px;
    }
</style>
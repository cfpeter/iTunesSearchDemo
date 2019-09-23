import Vue from "vue";
import Vuex from "vuex";
import itunesService from './services/itunesService'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchResult : {},
    favorites : localStorage.getItem('favorites') || []
  },
  mutations: { 
    
    SET_SEARCH_ITUNES( state , data ){
      state.searchResult = data;
    },

    REMOVE_FAVORITES(state, trackId){
      let favArray = JSON.parse(localStorage.getItem('favorites')) 
      let newFaveArray = favArray.filter(function( obj ) {
        return obj.trackId !== trackId;
      });
      localStorage.setItem('favorites', JSON.stringify(newFaveArray))
      state.favorites = newFaveArray
    },
    REMOVEALLFAVORITES(state){
      localStorage.setItem('favorites', '[]');
      state.favorites = []
    },
    SET_FAVORITES (state, JSONdata){  
      if(localStorage.getItem('favorites') === null ){ 
          localStorage.setItem('favorites', JSON.stringify([JSONdata])); 
          state.favorites.push(JSONdata)

      }else{
        let favData = JSON.parse(localStorage.getItem('favorites'));
        favData.push(JSONdata)
        state.favorites = favData
        localStorage.setItem('favorites', JSON.stringify( favData ) );
      }  
  
    }

  },
  actions: {

    async searchItunes({commit}, searchData){
      try { 
        const {data} = await itunesService.searchItunes(searchData) 
        console.log(data)
        commit('SET_SEARCH_ITUNES', data)
        return data
      } 
      catch (error) {
        throw error
      }  
    
    },

    async addToFave({commit}, data){
      try {  
        commit('SET_FAVORITES', data)
      } catch (error) {
        throw error
      }
    },

    removeFavorite({commit} , trackId){
      commit('REMOVE_FAVORITES', trackId)
    },
    removeAllFavorites({commit}){
      commit('REMOVEALLFAVORITES')
    }

  },
  getters: {
    getFavorites: state => {
      return state.favorites
    }
  }
});

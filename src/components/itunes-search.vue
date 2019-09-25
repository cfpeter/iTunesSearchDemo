<template>
<div>
<v-container>
    <v-row> 
        <v-col cols="12" >               
            <v-card color="white" :loading="loading" >
                <v-progress-linear v-show="loading"></v-progress-linear>
                <v-card-title class="text-center justify-center py-6">
                <h1 class="font-weight-bold display-2 red--text d-none d-sm-flex">iTunes Search</h1>
                <h1 class="font-weight-bold title red--text d-xl-none d-lg-none d-sm-none d-md-none" >iTunes Search</h1>
                </v-card-title> 
                <v-container fluid>
                <v-row>  
                    <v-col cols="ms-auto mx-10"   > 
                        
                            <v-row> 
                                <template>
                                <v-card-text>
                                <v-slider
                                    v-model="searchLimitValue"
                                    min="5"
                                    step="5"
                                    label="Search Quantity"
                                    ticks="always"
                                    thumb-label="always"
                                ></v-slider>
                                </v-card-text>
                                </template>
                            </v-row>
                        <v-form @submit.prevent="search">
                            <v-row >
                                <v-text-field
                                    v-model="searchVal" 
                                    :counter="100"
                                    label="Search"
                                    required 
                                ></v-text-field>
                            </v-row>
                            <v-row>
                                <v-btn class="mx-auto" @click="search">Search</v-btn>  
                            </v-row>
                        </v-form> 
                        
                    </v-col>
                </v-row>
                </v-container>

                <v-tabs
                v-model="tab"
                background-color="transparent"
                color="red"
                centered 
                >
                    <v-tab v-for="item in items" :key="item" >
                        {{ item }} ({{searchResult[item].length}})
                    </v-tab>
                    <v-tab v-if="favorites.length" >
                        Favorites ({{favorites.length}})
                    </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="(list , key) in searchResult"
                    :key="key"
                >
                    <v-card flat color="grey lighten-3">
                    <v-card-text>  
                    <v-layout row wrap>
                        <v-flex xs12 sm6 md4 lg3 v-for="kind in searchResult[key]" :key="kind.trackId">
                    <v-card
                        raised
                        :loading='loading'
                        flat class="text-xs-center ma-2"
                        max-width="344"                  
                    >  
                        <v-row
                        class="py-4 pl-4"
                        >
                        <v-col class="shrink">
                            <v-img
                            height="100"
                            width="100"
                            :src="kind.artworkUrl100"
                            ></v-img>
                        </v-col>
                        <v-col class="text-center">
                            <v-container class="pa-2">
                            <v-row>
                                <v-col>  
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-icon @click="linkTo(kind.trackViewUrl)" 
                                            color="primary" dark v-on="on">mdi-link</v-icon>
                                        </template>
                                        <span>Link to iTunes</span>
                                    </v-tooltip>
                                </v-col> 
                                    

                                <v-col>
                                     <v-tooltip bottom v-if="isFavorite(kind.trackId)">
                                        <template v-slot:activator="{ on }" >
                                            <v-icon 
                                            @click="btn_toggleFavorites(kind)"
                                            color="red" dark v-on="on">mdi-heart</v-icon> 
                                        </template> 
                                            <span>Remove from favorites</span>
                                    </v-tooltip> 
                                    <v-tooltip bottom v-else> 
                                        <template v-slot:activator="{ on }">  
                                            <v-icon 
                                            @click="btn_toggleFavorites(kind)"
                                            color="grey" dark v-on="on">mdi-heart</v-icon>
                                        </template>
                                            <span>Add to favorites</span>
                                    </v-tooltip> 
                                </v-col>
                            </v-row>  
                            </v-container>
                        </v-col>
                        </v-row>  
                            <v-container class="pa-0 pt-0 mt-0">
                                <v-card-text class="py-0 my-0 font-weight-black">{{kind.trackName}}</v-card-text>   
                                <v-card-text> 
                                {{kind.primaryGenreName}} 
                                </v-card-text>
                            </v-container> 
                        </v-card>
                    </v-flex>
                    </v-layout> 
                    </v-card-text>
                    </v-card>
                </v-tab-item> 
                <v-tab-item v-if="favorites.length" >
                 
              
                    <v-card flat color="grey lighten-4">
                    <v-card-text>  
                    <v-col  cols="12" >
                        <v-row justify="end"> 
                        <v-tooltip left>
                            <template v-slot:activator="{ on }">
                                <v-icon 
                                @click.stop="dialog = true"
                                color="red" x-large dark v-on="on">mdi-delete</v-icon> 
                            </template>
                            <span>Remove all favorites</span>
                        </v-tooltip> 
                        </v-row>
                    </v-col>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 md4 lg3 v-for="kind in favorites" :key="kind.trackId">
                    <v-card
                        raised
                        :loading='loading'
                        flat class="text-xs-center ma-3"
                        max-width="344"                        
                    >
                   
                        <v-row
                        class="py-4 pl-4"
                        >
                        <v-col class="shrink">
                            <v-img
                            height="100"
                            width="100"
                            :src="kind.artworkUrl100"
                            ></v-img>
                        </v-col>
                        <v-col class="text-center">
                            <v-container class="pa-2">
                            <v-row>
                                <v-col>  
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-icon @click="linkTo(kind.trackViewUrl)" 
                                            color="primary" dark v-on="on">mdi-link</v-icon>
                                        </template>
                                        <span>Link to iTunes</span>
                                    </v-tooltip>
                                </v-col> 
                                    

                                <v-col>
                                     <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-icon
                                            @click="btn_toggleFavorites(kind)"
                                            color="red" dark v-on="on">mdi-heart</v-icon> 
                                        </template>
                                        <span>Remove from favorites</span>
                                    </v-tooltip> 
                                </v-col>
                            </v-row>  
                            </v-container>
                        </v-col>
                        </v-row>  
                            <v-container class="pa-0 pt-0 mt-0">
                                <v-card-title class="py-0 my-0">{{kind.trackName}}</v-card-title>   
                                <v-card-text> 
                                {{kind.primaryGenreName}} 
                                </v-card-text>
                            </v-container> 
                        </v-card>
                    </v-flex>
                    </v-layout> 
                    </v-card-text>
                    </v-card>
                </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-col>
    </v-row>
    </v-container>
        <template>
  <v-row justify="center"> 

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Confirmation.</v-card-title>

        <v-card-text>
        Are you sure you want to remove all the favorites? </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn
            color="grey darken-1"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            @click="btn_removeAllFavorites"
          >
            Remove ALL
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
</div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'

export default {
    name: 'Itunes-search',
    data (){
        return {
            tab: null,
            name: '',
            searchVal: '',
            searchResult: null,
            show: false,
            items: [],
            loading: false,
            favorites: [],
            searchLimitValue: 30,
            dialog: false
        }
    },
    created () {
        this.applyFavorites()
    },  
    methods: {
        ...mapActions([
            'searchItunes',
            'addToFave',
            'removeFavorite',
            'removeAllFavorites'
        ]),
        ...mapGetters(
            ['getFavorites']
        ),

        isFavorite(trackId){
            return this.favorites.find(function(element) {
                return element.trackId == trackId;
            });  
        },
        applyFavorites() { 
            if(typeof this.getFavorites() == "string")
                this.favorites = JSON.parse(this.getFavorites())  
            else
                this.favorites = this.getFavorites()
        },
        search (){ 
            this.loading = !this.loading
            this.searchItunes({searchVal: this.searchVal , limit: this.searchLimitValue })
            .then(data => { 
                this.searchResult = data 
                this.items = Object.keys(data)
                this.loading = !this.loading

            })
            .catch(err => {
                alert('We could not load the data. Please try again later.')
                this.loading = !this.loading
            })
        },
        linkTo(producturl){
            window.open(producturl, '_blank'); 
        },
        btn_removeAllFavorites(){
            this.dialog = false
            this.removeAllFavorites()
            this.applyFavorites()
        },
        btn_toggleFavorites(data){ 
            if(this.isFavorite(data.trackId)){
                this.removeFavorite(data.trackId)
            }
            else{ 
                this.addToFave(data)
            }
            this.applyFavorites()
        }
    }
}
</script>
<style scoped> 
/* Helper classes */
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
} 
</style>
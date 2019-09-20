<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Demo</span>
        <span class="font-weight-light"> - iTunes Search</span>
      </v-toolbar-title>
      <v-spacer></v-spacer> 
    </v-app-bar>

  <v-content>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <itunesSearch/>
    </v-container>
  </v-content>
 
  </v-app>
</template>

<script> 
import itunesSearch from './components/itunes-search.vue';


export default {
  name: 'App',
  components: {
    itunesSearch,
  },
  data: () => ({
    //
  }),
};
</script>

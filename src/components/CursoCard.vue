<template>
  
  <v-row class="d-flex"
    style="background: linear-gradient(to right, #0f2c5c, #4e7ab5); min-height: 100vh; padding: 20px;">
    
    <v-col
  v-for="c in cursos"
  :key="c.id"
      cols="12"
      sm="6"
      md="4"
      lg="4"
      xl="4"
      
>
    <v-card
      max-width="344"
      style="margin-top: 20px; margin-left: 5%;"
    >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="c.url" alt="https://firebasestorage.googleapis.com/v0/b/appa-20667.appspot.com/o/cursos_imagens%2Fficr.jpg?alt=media&token=322951dc-f29e-4e89-a4be-2d2b42ce6da0"
    >
    </v-img>

      <v-card-title>{{ c.nome }} </v-card-title>

      <v-card-subtitle>Mensalidade R${{c.valor}},mês</v-card-subtitle>
        
      <v-card-subtitle> {{c.tempo}} Semestres </v-card-subtitle>
      <v-card-actions>
        <v-btn  color="orange lighten-2" text>Explore</v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{c.sobre}}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-col>

</v-row>
</template>

<script>

export default {
props: {
  cursos: Array   
},
data() {
  return {
    show: false,
    defaultImageUrl: "https://firebasestorage.googleapis.com/v0/b/appa-20667.appspot.com/o/cursos_imagens%2Fficr.jpg?alt=media&token=322951dc-f29e-4e89-a4be-2d2b42ce6da0"
  };
},

methods:{
  
},
      
}

</script>
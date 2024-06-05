
<template>
  

  <main style="height: 100%;width: 100%;">
<v-card class="overflow-hidden">
    <div style="padding-bottom: 220px;">
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="@/assets/ficr.png"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-4"
      style="margin-bottom:100px ;"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Cursos</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>

        
        
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      
      <v-menu
        bottom
        left
        style="width: 100%;"
        
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="yellow"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list >
          <v-list-item>
            <button @click="AbrirCreateCard" style="border-bottom:solid black 1px;">Adicionar curso</button>
                   
          </v-list-item>

          <v-list-item>
            <button @click="AbrirDeleteCard" style="border-bottom:solid black 1px;">Remover curso</button>
          </v-list-item>

          <v-list-item>
            <button @click="AbrirEditCard" style="border-bottom:solid black 1px;" >Editar curso</button>
          </v-list-item>

          
        </v-list>
      </v-menu>

      <template v-slot:extension>
        
        
        

      <v-tabs class="transparent-tabs">
        <v-tab style="background: transparent" @click="selecionarArray('Bacharelado')">Bacharelado</v-tab>
        <v-tab style="background-color: transparent" @click="selecionarArray('Licenciatura')">Licenciatura</v-tab>
        <v-tab style="background-color: none" @click="selecionarArray('Tecnologo')">Tecnólogo</v-tab>
      </v-tabs>
  
      
      <v-text-field
        v-model="filtroNome"
        label="Pesquisar cursos"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
    

  

         
      </template>
    </v-app-bar>
    
<CreateCard v-if="showSquareCreate" @fechar="fecharCard" @att="attDados"/>        
<DeleteCard v-if="showSquareDelete" @att="attDados" @fechar="fecharCard"/>
<EditCard v-if="showSquareEdit"     @fechar="fecharCard" @att="attDados"/>
  </div>     
  
  <CursoCard :cursos="filteredCursos"/>
 
    <v-sheet
      id="scrolling-techniques-4"
      class="overflow-y-auto"
      max-height="1000"
    >    
      <div style="height: 300px;background: linear-gradient(to right, #0f2c5c, #4e7ab5);width: 100%;"></div>
    </v-sheet> 

    <v-alert v-if="errorMessage" type="error" dismissible @input="errorMessage = ''">
          {{ errorMessage }}
        </v-alert>
  </v-card>
<v-footer
  dark
  padless
>
  <v-card
    flat
    tile
    class="indigo lighten-1 white--text text-center"
  >
    <v-card-text>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4 white--text"
        icon
      >
        <v-icon size="24px">
          {{ icon }}
        </v-icon>
      </v-btn>
    </v-card-text>   
      <v-card-text class="white--text pt-0">
        Percebemos, cada vez mais, que o comprometimento entre as equipes representa uma abertura para a melhoria do levantamento das variáveis envolvidas. Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a adoção de políticas descentralizadoras nos obriga à análise da gestão inovadora da qual fazemos parte. Ainda assim, existem dúvidas a respeito de como a necessidade de renovação processual aponta para a melhoria do retorno esperado a longo prazo. Não obstante, o julgamento imparcial das eventualidades afeta positivamente a correta previsão do remanejamento dos quadros funcionais.
    </v-card-text>
    
    <v-divider></v-divider>

    <!-- <v-card-text class="white--text">
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </v-card-text> -->
  </v-card>
</v-footer>
</main>
</template>

<script>
import CursoCard from '../components/CursoCard.vue';
import CreateCard from '../components/CreateCard.vue';
import DeleteCard from '../components/DeleteCard.vue';
import EditCard from '../components/EditCard.vue';
import axios from 'axios';



export default {
  components:{
    CursoCard,CreateCard,DeleteCard,EditCard
  },
  data() {
    return {     
      errorMessage : '', 
      // 1-arrays onde são armazenados o get
      // 2-são apontados pelo 'arrayEscolhido'
      cursoLicenciatura: [],
      cursoBacharelado: [],
      cursoTecnologo: [],
      // showSquare(s) que abrem o as telas do C.R.U.D(não sabia do v-dialog quando fiz e acabei não migrando ainda)
      showSquareDelete: false,
      showSquareCreate: false,
      showSquareEdit: false,
      //array que aponta para os arrays de curso 
      arrayEscolhido:[],
      filtroNome: '',  

      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    };
  },
  computed: {
    //filtra os cursos pelo nome
  filteredCursos() {
    return this.arrayEscolhido.filter(curso => curso.nome.toLowerCase().includes(this.filtroNome.toLowerCase()));
  }
},
methods: {
  //Metodo que atualiza os dados
    attDados(){ 
      this.get('CursoT', this.cursoTecnologo);
        this.get('CursoB', this.cursoBacharelado);
       this.get('CursoL', this.cursoLicenciatura);       
    },
    //Metodo que seleciona o array no qual o arrayEscolhido vai apontar assim exibindo na tela
    selecionarArray(tipo) {
      // this.attDados()
           
      if (tipo === 'Bacharelado') {
        this.arrayEscolhido = this.cursoBacharelado;
      } else if (tipo === 'Licenciatura') {
        this.arrayEscolhido = this.cursoLicenciatura;
      } else if (tipo === 'Tecnologo') {
        this.arrayEscolhido = this.cursoTecnologo;
      }else console.log('erro')
    },
    //Metodo para o fechamento das telas do C.R.U.D
    fecharCard() {
      this.showSquareCreate = false;
      this.showSquareDelete = false;
      this.showSquareEdit = false;
    },
    //Metodos para abrir as telas do C.R.U.D
    AbrirCreateCard() {
      this.showSquareCreate = !this.showSquareCreate;
    },
    AbrirDeleteCard() {
      this.showSquareDelete = !this.showSquareDelete;
    },
    AbrirEditCard() {
      this.showSquareEdit = !this.showSquareEdit;
    },
    //Metodo get(chama a api de get)  
    async get(tipo, arrayCurso) {
      try {
        const response = await axios.get(`https://beyond-api-k3zvawu2ha-uc.a.run.app/cursos/${tipo}`);
        const data = response.data;
        arrayCurso.splice(0, arrayCurso.length, ...data);
      } catch (error) {
        this.errorMessage = 'Erro ao editar curso: ' + (error.response?.data?.error || error.message);
      }
    },
},
// Atualiza os arrays assim que o 'home' e criado
  created() {    
    this.attDados()
    this.selecionarArray('Bacharelado');
  },

}

</script>




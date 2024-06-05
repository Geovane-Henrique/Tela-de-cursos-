<template>
  <div>
    

    <div v-if="showSquare" style="position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow-y: auto;">
       
      <div style="width: 95%;
  height:95%;
  background-color: white;
  border: 2px solid black;
  overflow-y: auto;
  
  
  ">
        
        
        

<v-btn @click=DefaltShowSquarePai>Voltar</v-btn>

<div style="display: flex; padding-left: 2%;border-bottom: 1px solid black;margin-top: 1%;padding-bottom: 1%">   
  <v-tabs>
    <v-tab @click="selecionarArray('Bacharelado')" style="margin-left: 0%;background-color:#d3d3d3;border-radius: 10px;"> Bacharelado </v-tab>

    <v-tab @click="selecionarArray('Licenciatura')" style="margin-left: 5%;background-color:#d3d3d3;border-radius: 10px;">Licenciatura</v-tab>

    <v-tab @click="selecionarArray('Tecnologo')"  style="margin-left: 5%;background-color:#d3d3d3;border-radius: 10px;"> Tecnólogo</v-tab>
      
  </v-tabs>
  
</div>



<v-dialog v-model="aviso" max-width="400">
      <v-card>
        <v-card-title class="headline">Curso atualizado</v-card-title>
        <v-card-actions>
         
          <v-spacer></v-spacer>        
          <v-btn color="blue darken-1" text @click="aviso = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> 

    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

<v-row style="max-height: 70%;">
  
  <v-col   
    v-for="(item, index) in arrayLocal"
    :key="index"
    cols="12"
    sm="6"
    md="4"
    lg="4"
    xl="4"
    
  >
  
  <v-card
  
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="item.url"
    >
      <v-card-title>{{ item.nome }}</v-card-title>
    </v-img>
 
    
  <p>Nome do curso:</p>
          <v-text-field
            v-model="item.nome"
            solo
            v-bind:label="item.nome"
            clearable
          ></v-text-field>
  <p>Sobre:</p>
          <v-text-field
            v-model="item.sobre"
            solo
            v-bind:label="item.sobre"
            clearable
          ></v-text-field>

    <p>Valor:</p>  
          <v-text-field
            v-model="item.valor"
            solo
            v-bind:label="item.valor"
            clearable
          ></v-text-field>
     <P>Periodos:</P>
    <v-text-field
            v-model="item.tempo"
            solo
            v-bind:label="item.tempo"
            clearable
          ></v-text-field>
          
<input
  type="file"
  accept="image/*"
  @change="handleFileChange($event, item)"
>

          <v-btn  @click="attCurso(item)" style="margin-left: 39%; background-color: green;">Save</v-btn>

          <v-alert v-if="errorMessage" type="error" dismissible @input="errorMessage = ''">
          {{ errorMessage }}
        </v-alert>
  </v-card>
</v-col>

</v-row>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../service/firebase';

export default {
  
  data(){
      return{ 
        errorMessage: '',
        overlay: false,
        // Vira o banco no qual o curso deve ser editado
        banco: "",     
        show: false,
        //decide define se o componente deve deve fechar
        showSquare:true,
        // avisa que o curso foi salvo
        aviso: false,
        // uma versão local do 'arrayescolhido'
        arrayLocal :[],
        //arrays que serao apontados
      cursoLicenciatura: [],
      cursoBacharelado: [],
      cursoTecnologo: [],
      }
  },
  methods:{
    handleFileChange(event, item) {
      const file = event.target.files[0];
      if (file) {
        item.file = file;
      }
    },

    attDados(){ 
      this.get('CursoT', this.cursoTecnologo);
        this.get('CursoB', this.cursoBacharelado);
       this.get('CursoL', this.cursoLicenciatura);       
    },
    //fecha o componente e envia o comando para o 'pai' fechar
    DefaltShowSquarePai() {
      this.showSquare = false;
    this.$emit('fechar');
    },
    //Metodo que seleciona o array no qual o arrayEscolhido vai apontar assim exibindo na tela
    selecionarArray(tipo) {
      if (tipo === 'Bacharelado') {
    this.arrayLocal = this.cursoBacharelado;
    this.banco = "CursoB"
  } else if (tipo === 'Licenciatura') {
    this.arrayLocal = this.cursoLicenciatura;
    this.banco = "CursoL"
  } else if (tipo === 'Tecnologo') {
    this.arrayLocal = this.cursoTecnologo;
    this.banco = "CursoT"
  }
    },
    //Metodo get
    async get(tipo, arrayCurso) {
      try {
        const response = await axios.get(`https://beyond-api-k3zvawu2ha-uc.a.run.app/cursos/${tipo}`);
        const data = response.data;
        arrayCurso.splice(0, arrayCurso.length, ...data);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      }
    },
   //atualiza os cursos
  async  attCurso(item) {
  this.overlay = true;
  this.errorMessage = '';
  try {

    if (item.file) {
          const storageRef = ref(storage, `cursos_imagens/${item.file.name}`);
          const snapshot = await uploadBytes(storageRef, item.file);
          const url = await getDownloadURL(snapshot.ref);
          item.url = url;
        }
 await axios.put('https://beyond-api-k3zvawu2ha-uc.a.run.app/update', {      
        id: item.id,
        tipo: item.tipo,
        curso: {
          nome: item.nome,
          valor: item.valor,
          tempo: item.tempo,
          sobre: item.sobre,
          url: item.url
        },
    });
    this.aviso = true
  }catch (error) {
    this.errorMessage = 'Erro ao editar curso: ' + (error.response?.data?.error || error.message);
  } finally {
    this.overlay = false;
    this.$emit('att');
  }
}

  },
  //Atualiza os arrays assim que o 'home' e criado
  created() {
    this.attDados()
    this.selecionarArray('Bacharelado');
  },
  watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
  
  }





</script>






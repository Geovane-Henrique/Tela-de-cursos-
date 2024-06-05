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
         
         <!-- <div style="display: flex;border-bottom: solid black 2px;padding-bottom: 1%;margin-top: 1%;">   -->

<v-btn @click=DefaltShowSquarePai>Voltar</v-btn>
 

   <div style="display: flex; padding-left: 2%;border-bottom: 1px solid black;margin-top: 1%;padding-bottom: 1%;">   
  <v-tabs style="border-radius: 13px">
      <v-tab @click="selecionarArray('Bacharelado')" style="margin-left: 0%;background-color:#d3d3d3;border-radius: 13px;"> Bacharelado </v-tab>

   <v-tab @click="selecionarArray('Licenciatura')" style="margin-left: 5%;background-color:#d3d3d3;border-radius: 13px;">Licenciatura</v-tab>

    <v-tab @click="selecionarArray('Tecnologo')"  style="margin-left: 5%;background-color:#d3d3d3;border-radius: 13px;"> Tecnólogo</v-tab>
  
    <v-tab style="padding-left:10%"><v-btn  @click="warning = true" style="margin-left: 25%; background-color:#FF0000;border-radius: 10px;opacity: 90%;">delete</v-btn></v-tab>
    </v-tabs>
  
  </div>


<!-- </div> -->

<v-dialog v-model="warning" max-width="400">
      <v-card>
        <v-card-title class="headline">Tem certeza que deseja excluir?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="warning = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="deleteCursos()">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<v-row style="max-height: 70%;margin-top: 2%" >
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

    <v-card-subtitle class="pb-0">
      R${{ item.valor }}/mes
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ item.name }}</div>

      <div> {{item.tempo}} Periodos</div>

      
    </v-card-text>
    <v-container
    class="px-0"
    fluid
    style="margin-left: 5%;"
  >
    <v-checkbox
      v-model="item.delete"
      :label="`delete:`"
    ></v-checkbox>
  </v-container>
    
    <v-card-actions>
          <v-btn color="orange lighten-2" text>Explore</v-btn>

          <v-spacer></v-spacer>

          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              {{ item. sobre }}
            </v-card-text>
          </div>
        </v-expand-transition>
  </v-card>
</v-col>

</v-row>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  data(){
      return{
        // Vira o banco no qual o curso deve ser deletado
        banco:"",
        show: false,
        //aviso de confirmação
        warning: false,
        //decide define se o componente deve deve fechar
        showSquare:true,
        // uma versão local do 'arrayescolhido'
        arrayLocal :[],
        //arrays que serao apontados
      cursoLicenciatura: [],
      cursoBacharelado: [],
      cursoTecnologo: [],
      overlay: false,
      }
  },
  //Atualiza os arrays assim que o 'home' e criado
  created() {
    this.attDados()
    this.selecionarArray('Bacharelado');
  },
  methods:{

    //Metodo que atualiza os dados
    attDados(){ 
      this.get('CursoT', this.cursoTecnologo);
        this.get('CursoB', this.cursoBacharelado);
       this.get('CursoL', this.cursoLicenciatura);       
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


    //fecha o componente e envia o comando para o 'pai' fechar
    DefaltShowSquarePai() {
      this.showSquare = false;
      this.$emit('fechar');
    },

    //Metodo que seleciona o array no qual o arrayEscolhido vai apontar assim exibindo na tela
    selecionarArray(tipo){
      this.attDados()
  
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

// verifica quais cursos tem sua propiedade delete como true e os armazena em um array e o deleta 
async deleteCursos() {
  this.overlay= true
    const deletarCurso= [];
    const tipoDeleteCurso = [];
    for (let i = this.arrayLocal.length - 1; i >= 0; i--) {
      if (this.arrayLocal[i].delete) {       
        deletarCurso.push(this.arrayLocal[i].id);
        tipoDeleteCurso.push(this.arrayLocal[i].tipo)
        this.arrayLocal.splice(i, 1);
      }
    }
    try{
     await axios.delete(`https://beyond-api-k3zvawu2ha-uc.a.run.app/delete`,{
       data : {deletarCurso,tipoDeleteCurso} 
    });
        this.resetCursosToDelete();    
    }catch(error){
    console.log("",error)
}
    this.warning =false
    this.$emit('att')   
},

resetCursosToDelete() {
      this.arrayLocal.forEach(curso => {
        curso.delete = false;
      });
    },
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






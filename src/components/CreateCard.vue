<template>
  <div >
    
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
  padding-bottom: 40%
  ">
      
      <div style="width: 85%;
  height: 85%;
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  ">
        <v-btn @click=DefaltShowSquarePai>Voltar</v-btn>
        <template>
          
        
      <v-card>
        <v-card-title>Formulário</v-card-title>
        <v-card-text>
          <v-text-field v-model="nome" label="Nome"></v-text-field>
          <v-text-field v-model="valor" label="Valor"></v-text-field>
          <v-text-field v-model="tempo" label="Tempo"></v-text-field>
          <v-textarea v-model="sobre" label="Sobre"></v-textarea>
          <v-select v-model="tipo" :items="items" label="Seleção"></v-select>
          <input
          type="file"
          accept="image/*"
          @change="handleFileChange($event)">
        </v-card-text>
        <v-card-actions>
          
          <v-btn color="primary" @click="createCurso">Enviar</v-btn>
        </v-card-actions>
      </v-card>

      <v-alert v-if="errorMessage" type="error" dismissible @input="errorMessage = ''">
          {{ errorMessage }}
        </v-alert>
</template>
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../service/firebase';
export default {
  
  data() {
  return {  
    
      errorMessage: '',
      nome: '',
      valor: '',
      tempo: '',
      sobre: '',
      tipo: null,
      items: ['Bacharelado', 'Licenciatura', 'Tecnologo'],            
      showSquare: true,   
      overlay: false ,
      file: null, 
      
  };
},
  methods: {
    //acha a imagen e aloca na variavel
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    //fecha o componente e envia o comando para o 'pai' fechar
    DefaltShowSquarePai() {
      this.showSquare = false;
      this.$emit('fechar');
    },
    //Reseta o formulario
    resetForm() {
      this.nome= '',
      this.valor= '',
      this.tempo= '',
      this.sobre= '',
      this.tipo= null
      
    },
    //chama a api de criar curso
    async createCurso() {

      let url = 'https://firebasestorage.googleapis.com/v0/b/appa-20667.appspot.com/o/cursos_imagens%2Fficr.jpg?alt=media&token=322951dc-f29e-4e89-a4be-2d2b42ce6da0';
      this.overlay = true;
      this.errorMessage = '';
      
      try {
        
        //adiciona a imagen ao storage e armazena seu url a uma variavel
        if (this.file) { // Verifica se this.file está definido
      const storageRef = ref(storage, `cursos_imagens/${this.file.name}`);        
      const snapshot = await uploadBytes(storageRef, this.file);
      url = await getDownloadURL(snapshot.ref);
    }
        
        
        const curso = {
          tipo: this.tipo,
          nome: this.nome,
          sobre: this.sobre,
          tempo: this.tempo,
          valor: this.valor,
          delete: false,
          url: url,
          date: new Date()
        };
        await axios.post(`https://beyond-api-k3zvawu2ha-uc.a.run.app/create/${this.tipo}`, 
          curso
        )
          this.resetForm();
          url = ''
      } catch (error) {
        this.errorMessage = 'Erro ao criar curso: ' + (error.response?.data?.error || error.message);
      } finally {
        this.$emit('att')
        this.overlay = false;
      }
    }
        
    },
  
  
  watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    }
  }
  
</script>
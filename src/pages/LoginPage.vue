
<template>
  
    <main style="background: linear-gradient(to bottom, #0f2c5c, #4e7ab5); height: 100%;align-items: center;display: flex;">
    <div style="margin: 0 auto;width:">
          
    <v-card style=" height: 300px;min-width: 200px;width: 300px;">
      <v-card-title class="headline grey lighten-2">
        Bem-vindo!
      </v-card-title>
      <v-card-text style="text-align: center;">
        <v-btn style="margin-left: -2%; width:98%;height: 55px; margin-top: 10px;" color="primary" @click="cadastroDialog = true">Cadastro</v-btn>
        <v-btn style="margin-left: -2%; width:98%;height: 55px; margin-top: 10px;" color="primary" @click="loginDialog = true">Login</v-btn>
      </v-card-text>
    </v-card>
   
        <v-dialog v-model="cadastroDialog" max-width="400" style="background-color: black;">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            Cadastro
          </v-card-title>
          <v-card-text>
            
              <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
              <v-text-field v-model="password" label="Senha" type="password" required></v-text-field>
              <v-btn @click="createAcc()" >Cadastrar</v-btn>
            
          </v-card-text>
          <v-alert v-if="errorMessage" type="error" dismissible @input="errorMessage = ''">
          {{ errorMessage }}
        </v-alert>
        </v-card>
              
       </v-dialog>

       
        <v-dialog v-model="loginDialog" max-width="400">     
        <v-card>
          <v-card-title class="headline grey lighten-2">
            Login
          </v-card-title>
          <v-card-text>
            
              <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
              <v-btn @click="login()" color="primary" type="submit">Login</v-btn>
            
          </v-card-text>
        </v-card>

        <v-dialog v-model="erroLogin" max-width="400" style="background-color: black;">
          <v-card-title class="headline" style="background-color: azure;">Erro ao efetuar o login</v-card-title>
        <v-card-actions style="background-color: azure;">
           email ou password errados
          <v-spacer></v-spacer>        
          
        </v-card-actions>

      </v-dialog>
</v-dialog>

<v-dialog v-model="success" max-width="400">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Sucesso!
        </v-card-title>
        <v-card-text>
          <p>Usuário criado com sucesso.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="fecharContaCriada()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  </main>

</template>

<script>
//import axios from 'axios'

export default {

  data() {
    return {
      //variavel de erro
      errorMessage: '',
      email: '',
      password: '',
      //variaveis de dialogs
      loginDialog: false,
      cadastroDialog:false,
      success:false,
      erroLogin:false,

      overlay:false
      
    }
  },
  methods: {
    //Cria a conta do usuario
    async createAcc(){
      try {
        this.overlay = true
    const result = await this.$store.dispatch("create", {
      email: this.email,
      password : this.password
    });
    if (result && result.error) {
      this.errorMessage = result.error
    } else {
      this.cadastroDialog = false;
      this.success = true;
      this.password = null;
      this.email = null;
    }
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    this.password = null;
    this.email = null;
    this.errorMessage = 'Erro ao criar usuário: ' + error.message;
  }
  this.overlay = false
    },
    //faz o login
   async login(){
    try {
      this.overlay = true
        const result = await this.$store.dispatch("login", {
          email: this.email,
          password: this.password
        });

        if (result && !result.error) {
          if (this.$route.path !== '/home') {
      this.$router.push('/home');
    }
        } else {
          console.error("Erro ao fazer login:", result.error);
        }
      } catch(error) {
        this.erroLogin = true
      console.error("Erro ao fazer login:", error);
    }
        this.overlay = false
    },
    //fecha o v-dialog de conta criada
    fecharContaCriada() {
      this.success = false;
    
}
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
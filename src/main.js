import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routes/router'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth} from './service/firebase';
//import { initializeApp } from 'firebase/app';
//import { getAuth } from 'firebase/auth';


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setCursoId(state, { cursoType, id }) {
      state[cursoType].id = id;
    },
    
  },
  actions: {
    async create({ commit }, payload) {
      const { email, password } = payload;

      if(password.length < 8){
        return { error: 'A senha deve ter no minimo 8 caracteres' };
      }
  
      if(!/\d/.test(password)){
        return { error: 'A senha deve conter ao menos um digito' };
      }
  
      if(!/[a-z]/.test(password)){
        return { error: 'A senha deve conter ao menos um caractere minusculo' };
      }
  
      if(!/[A-Z]/.test(password)){
        return { error: 'A senha deve conter ao menos um caractere maiusculo '};
      }
  
      if(!/[!@#$%&*]/.test(password)){
        return { error: 'A senha deve conter ao menos um caractere especial (!,@,#,$,%,&,*) '};
      }
  
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Usuário criado:", user);
        commit('setUser', user);
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw error;
      }
    },
    async login({ commit }, payload) {
      const { email, password } = payload;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Usuário logado:", user);
        commit('setUser', user);
        return { success: true };
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
      }
    },

    

  }
})
Vue.config.productionTip = false



new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

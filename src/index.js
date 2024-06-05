const express = require("express");
const {auth, db ,createUserWithEmailAndPassword ,signInWithEmailAndPassword, } = require('./service/firebase'); 
const app = express();
const cors = require("cors");
const { collection, getDocs,addDoc,deleteDoc,doc,updateDoc } = require("firebase/firestore");
const { FirebaseError } = require("firebase/app");


app.use(express.json());
app.use(cors());

 app.post("/login", async (req, res) => {
     try {
         const { email, password } = req.body;
         const userCredential = await signInWithEmailAndPassword(auth,email, password);
        const user = userCredential.user;
         const token = await user.getIdToken();
         res.json({ message: 'Login bem-sucedido', token, user });  
     } catch (error) {
           console.error('Erro ao fazer login:', error);
         res.status(401).json({ error: 'Credenciais inválidas' });
     }
 });


  app.post('/cadastro', async (req, res) => {
    const { email, password } = req.body;

    if(password.length < 8){
      return res.status(401).json({ error: 'A senha deve ter no minimo 8 caracteres' });
    }

    if(!/\d/.test(password)){
      return res.status(401).json({ error: 'A senha deve conter ao menos um digito' });
    }

    if(!/[a-z]/.test(password)){
      return res.status(401).json({ error: 'A senha deve conter ao menos um caractere minusculo' });
    }

    if(!/[A-Z]/.test(password)){
      return res.status(401).json({ error: 'A senha deve conter ao menos um caractere maiusculo '});
    }

    if(!/[!@#$%&*]/.test(password)){
      return res.status(401).json({ error: 'A senha deve conter ao menos um caractere especial (!,@,#,$,%,&,*) '});
    }

      try {        
          const userCredential = await createUserWithEmailAndPassword(auth,email, password);
          const user = userCredential.user;
         res.status(201).json({ message: 'Usuário registrado com sucesso', user });
      } catch (error) {
          console.error('Erro ao registrar usuário:', error);
          res.status(500).json({ error: 'Erro ao registrar usuário' });
      }
  });

  app.get('/cursos/:tipo', async (req, res) => {
    const { tipo } = req.params;
    try {
        const querySnapshot = await getDocs(collection(db, tipo));
        const cursos = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.status(200).json(cursos);
        
    } catch (error) {

      if(error instanceof FirebaseError){
        return res.status(500).json({ error: "Erro ao conectar com o banco de dados"})
      }
        console.error('Erro ao buscar cursos:', error);
        res.status(500).json({ error: 'Erro ao buscar cursos' });
    }
});

app.post('/create/:tipo', async (req, res) => {
    const { tipo } = req.params;
    const curso = req.body;

    if(!curso.nome || !curso.valor || !curso.tempo || !curso.sobre) {
      return res.status(400).json({ error: 'Formato de requisição inválido. Todos os campos são obrigatórios.' });
  }

  curso.valor = Number(curso.valor)
    curso.tempo = Number(curso.tempo)

   if(isNaN(curso.valor)){
    return res.status(400).json({error: "Formato de valor invalido. Valor deve ser um numero"})
   }

   if(isNaN(curso.tempo)){
    return res.status(400).json({error: "Formato de tempo invalido. tempo deve ser um numero"})
   }

   curso.valor = String(curso.valor)
   curso.tempo = String(curso.tempo)

    try {
        const docRef = await addDoc(collection(db, getBanco(tipo)), curso);
        res.status(201).json({ message: 'Curso criado com sucesso', id: docRef.id });
    } catch (error) {

      if(error instanceof FirebaseError){
        return res.status(500).json({ error: "Erro ao conectar com o banco de dados"})
      }
        console.error('Erro ao criar curso:', error);
        res.status(500).json({ error: 'Erro ao criar curso' });
    }
});

app.delete("/delete", async (req,res) =>{
try{
    const {deletarCurso,tipoDeleteCurso} = req.body
    console.log(deletarCurso)

    for (let i = 0; i < deletarCurso.length; i++) {
        const curso = deletarCurso[i];
        const banco = tipoDeleteCurso[i];
        await deleteDoc(doc(db, getBanco(banco), curso));
      }

    res.status(200).json({ message: "Cursos excluídos com sucesso" });
}catch(error){
  if(error instanceof FirebaseError){
    return res.status(500).json({ error: "Erro ao conectar com o banco de dados"})
  }
    console.error("Erro ao excluir cursos:", error);
    res.status(500).json({ error: "Erro ao excluir cursos" });
}

});

app.put("/update", async (req, res) => {
  const { id, tipo, curso } = req.body;
  const banco = getBanco(tipo);

    if(!curso.nome || !curso.valor || !curso.tempo || !curso.sobre) {
    return res.status(400).json({ error: 'Formato de requisição inválido. Todos os campos são obrigatórios.' });
   }

  curso.valor = Number(curso.valor)
  curso.tempo = Number(curso.tempo)

   if(isNaN(curso.valor)){
   return res.status(400).json({error: "Formato de valor invalido. Valor deve ser um numero"})
  }

   if(isNaN(curso.tempo)){
   return res.status(400).json({error: "Formato de tempo invalido. tempo deve ser um numero"})
   }

   curso.valor = String(curso.valor)
   curso.tempo = String(curso.tempo)
    try {          
      await updateDoc(doc(db, banco, id), curso); 
      res.status(204).json({ message: "Curso atualizado com sucesso" });
    } catch (error) {
      if(error instanceof FirebaseError){
        return res.status(500).json({ error: "Erro ao conectar com o banco de dados"})
      }

      console.error("Erro ao atualizar curso:", error);
      res.status(500).json({ error: "Erro ao atualizar curso" });
    }
  });

const PORT = 8080;
app.listen(PORT, (error) => {
    if(error){
        console.log("erro")
    }
    console.log(`Servidor Express rodando hhh porta ${PORT}`);
});


function getBanco(tipo) {
    if (tipo === "Bacharelado") {
      return "CursoB";
    } else if (tipo === "Licenciatura") {
      return "CursoL";
    } else if (tipo === "Tecnologo") {
      return "CursoT";
    } else {
      throw new Error("Tipo de curso inválido");
    }
  }


module.exports = app;
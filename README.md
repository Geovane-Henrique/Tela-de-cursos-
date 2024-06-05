1(login)- O login/cadastro eles tem algumas mensagens de erro estilizadas, porem caso aparece um erro imprevisto a mensagem aparecera na tela sem estar tratada(todas as mensagens de erro são assim no login, create e update), com um login bem feito a tela vai para o home.

2-(front)- No home na area superior direita tem os (3 pontinho) la fica o C.R.U.D eles são de telas criadas sem o v-dialog e são "componentizadas" por isso, tem os métodos de controle de exibição e emissão de updates sem o refresh para o home, la estão os cursos da forma como o cliente deveria ver e com um filtro de pesquisa.

3-(um pouco do back)- Existem 3 bancos compartilhando os mesmos métodos da A.P.I alterando apenas os parâmetros, sua exibição e realizada pelo arrayescolhido, ele referencia os outras arrays tecnólogo, bacharelado e licenciatura quando o click e feito em algum em todas as partes do projeto.

4-(get)- O get e realizado e recebe o parâmetro do nome do banco no firestore e o array que o exibira.

5-(create)- O create recebe os dados do usuário com os seguintes requisitos: valor e tempo devem ser números e todos os campos exceto o de imagens são obrigatórios caso seja aprovado o curso e criado no banco onde tipo estiver referenciando.

6-(update)- O update e feito capturando os dados do "forms" e em seguida achando pelo id e tipo o documento a ser atualizado se 
as validações aprovarem o curso será atualizado com sucesso.

7(delete)- todos os cursos têm um elemento 'delete' false como default
 e ao clicar na check box ele vira true, pertando no botão delete ele compara todos os cursos os que tiverem delete como true tem seus id e tipos adicionados nos 2 arrays responsáveis por localizar o documento a ser deletado e em seguida o deletar.

8(testes)- Os testes da A.P.I foram feitos em quanto ele estava no serve local porem deve pegar normalmente ao trocar o url

9(A.P.I)- O Firebase desta pasta não esta em node.js porem se converter ele pega normalmente nela.
_______________________________________________________________________________________________________________________

Obrigado pelas aulas e trilhas.
# Tela-de-cursos-
# Tela-de-cursos-
# Tela-de-cursos-

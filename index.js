import express from 'express';
import usuarios from './dados/dados.js';
const app  = express();



app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});


app.post('/usuarios/adicionarUsuario', (req, res) => {
    const nome = req.query.nome;
    const email = req.query.email;
    
    if(nome && email){
        const id = usuarios.length + 1
        usuarios.push({'id':id, 'nome':nome, 'email':email});
        res.status(201).json(usuarios);
    }else{
        res.status(400).send('dados inválidos');
    }
}) 


app.delete('/usuarios/excluirUsuario/:id', (req, res) => {
    const idParaRemover = parseInt(req.params.id);
    //const idParaRemover = 1;
    // Encontra o índice do objeto a ser removido
    const index = usuarios.findIndex(objeto => objeto.id === idParaRemover);

    if (index !== -1) {
        // Remove o objeto do array
        usuarios.splice(index, 1);

        // Atualiza os IDs dos objetos restantes
        for (let i = index; i < usuarios.length; i++) {
            usuarios[i].id--;
        }
        res.json(usuarios)
        //console.log(usuarios);
    } else {
        res.send("Objeto não encontrado no array.");
    }

})

//atualizar usuário

/**
 * localizar pelo ID do usuário e alterar o nome e/ou email
 */
app.put('/usuarios/atualizar', (req, res) => {
    const id = parseInt(req.query.id);
    const nome = req.query.nome;
    const email = req.query.email;
  
    const itemIndex = usuarios.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      usuarios[itemIndex] = { id, nome, email };
      res.status(200).send(usuarios[itemIndex]);
    } else {
      res.status(404).send({ message: 'Item não localizado' });
    }
  });

app.listen(8080, () => {
    const data = new Date();
    console.log(`Servidor iniciado com sucesso em ${data}`);
});
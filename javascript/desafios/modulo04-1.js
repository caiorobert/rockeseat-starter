function checaIdade(idade) {
  //Criando a promise
  return new Promise(function (resolve, reject) {
    //joga um timeout com Arrow function
    setTimeout(() => {
      //verifica a idade
      if (idade > 18) {
        //retorna sucesso se maior que 18
        resolve();
      }else{
        //retorna error se menor que 18
        reject();
      }
    }, 2000);
  }) 
 }

 checaIdade(20)
  .then(function() {
  console.log("Maior que 18");
  })
  .catch(function() {
  console.log("Menor que 18");
  });
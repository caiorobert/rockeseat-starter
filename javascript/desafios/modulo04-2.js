var btnElement = document.querySelector('button');
var inputElement = document.querySelector('input[name=user]');
var divElement = document.querySelector('#app');

function buscaGithubUser(user) {
  var inputText = inputElement.value;
  var apiGithub = (inputText == '') ? 'diego3g' : inputText;

  var ulElement = document.querySelector('#app ul');
  ulElement.innerHTML = '';

  var liElement = document.createElement('li');
  var liText = document.createTextNode('Carregando...!');

  liElement.appendChild(liText);
  ulElement.appendChild(liElement);
  divElement.appendChild(ulElement);

  axios.get(`https://api.github.com/users/${apiGithub}/repos`)
    .then(function(response) {
      // var ulElement = document.querySelector('#app ul');
      ulElement.innerHTML = '';
      
      for(repos in response.data) {
        var liElement = document.createElement('li');
        var linkElement = document.createElement('a');

        var html_url = response.data[repos].html_url;
        var full_name = response.data[repos].full_name

        var linkText = document.createTextNode(full_name);
        
        linkElement.setAttribute('href', html_url);
        linkElement.setAttribute('target', '_blank');

        linkElement.appendChild(linkText);
        liElement.appendChild(linkElement);
        ulElement.appendChild(liElement);
      }

      divElement.appendChild(ulElement);
    })

    .catch(function(error) {
      // console.error("Error response:");
      // console.error(error.response.data);    // ***
      // console.error(error.response.status);  // ***
      // console.error(error.response.headers); // ***
      if (error.response.status === 404) {
        var ulElement = document.querySelector('#app ul');
        ulElement.innerHTML = '';
        
        var liElement = document.createElement('li');
        var liText = document.createTextNode('Usuário não encontrado!');

        liElement.appendChild(liText);
        ulElement.appendChild(liElement);
        divElement.appendChild(ulElement);
      }
    })
  
  inputElement.value ='';
}

btnElement.onclick = buscaGithubUser
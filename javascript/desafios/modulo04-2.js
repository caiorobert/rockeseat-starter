var btnElement = document.querySelector('button');
var inputElement = document.querySelector('input[name=user]');
var divElement = document.querySelector('#app');

function buscaGithubUser(user) {
  var inputText = inputElement.value;
  var apiGithub = (inputText == '') ? 'diego3g' : inputText;

  axios.get(`https://api.github.com/users/${apiGithub}/repos`)
    .then(function(response) {
      var ulElement = document.querySelector('#app ul');
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
      console.warn('Erro de requisição');
    })
  
  inputElement.value ='';
}

btnElement.onclick = buscaGithubUser
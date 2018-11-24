import axios from 'axios';

function getUsers() {
  return axios.get('https://jsonplaceholder.typicode.com/users/1')
    .then(function (response) {
      console.log(response.data);
      console.log('Started from the bottom now we here!');
    })
    .catch(function (error) {
      console.log(error);
    });
}

getUsers();

export default getUsers;

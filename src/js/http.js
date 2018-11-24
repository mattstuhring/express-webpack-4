import axios from 'axios';

function getUsers() {
  return axios.get('https://jsonplaceholder.typicode.com/users/1')
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getUsers();

export default getUsers;

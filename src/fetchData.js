import axios from "axios";

/*
 * This function fetches data from backend using axios
 * Compares entries using Reference Number
*/

// TODO : What if there are multiple same reference numbers //

function fetchData() {
  var data = {}
  axios.get('http://localhost:5000/api')
  .then(res => {
    res.data.forEach(element => {
      if(element.refNo === localStorage.getItem('refNo')){
        data = element
      }
    });
  })
}
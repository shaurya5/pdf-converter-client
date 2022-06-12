import {useState, useEffect} from 'react';
import axios from 'axios'
import generatePdf from '../generatePdf';

function Submit(props) {

  // const [data, setData] = useState([])

  // function fetchData() {
  //   axios.get('http://localhost:5000/api')
  //     .then(res => {
  //       res.data.forEach(element => {
  //         if(element.refNo === localStorage.getItem('refNo')){
  //           // console.log(element)
  //         }
  //       });
  //     })
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])
  
  return (
    <div>
      <button onClick={generatePdf}>Get PDF</button>
    </div>
  );
}

export default Submit;
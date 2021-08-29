import axios from 'axios';

function App() {
  const clickHandler=()=>{
    axios.post('http://localhost:3007/user/login',{
      email:'akshaya@gmail.com',
      password:'test'
    }).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log("err is",err)
    })
    console.log("clicked me")
  }
  return (
    <div>
      <button onClick={clickHandler}>login</button>
    </div>
  );
}

export default App;

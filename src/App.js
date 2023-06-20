/* eslint-disable */
import { createContext, Suspense, lazy, useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import data from './data.js'
// import Detail from './routes/Detail.js'
// import Cart from './routes/Cart.js'
import { Routes, Route, Link, useNavigate, Outlet, json } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';

export let Context1 = createContext();


const Detail = lazy(()=>import('./routes/Detail.js'));
const Cart = lazy(()=>import('./routes/Cart.js'));
import Test from './test';


function App() {

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify( [] ))
    
  }, [])


  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [재고] = useState([10, 11, 12])
  
  let result = useQuery('작명', ()=>
     axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      console.log('요청됨')
       return a.data
    })
  )

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">NEGORANI</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail/0')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/test')}}>test</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            { result.isLoading ? '로딩중' : result.data.name}
            { result.error && '에러'}
            { result.data && result.data.name }
          </Nav>
        </Container>
      </Navbar>



      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'/>
              <div className='container'>
                <div className='row'>        
                  {
                    shoes.map((a, i) =>{
                      return(
                        <Card shoes = { shoes[i] } i={i} ></Card>
                      )
                    })
                  }        
                </div>
            </div>
            <button onClick={()=>{
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{
                let copy = [...shoes, ...result.data];
                setShoes(copy);
                
              })
              .catch(()=>{
                console.log('실패')
              })



            }}>더보기</button>
          </>
        }/>
        <Route path='/detail/:id' element={
          <Suspense fallback = { <div>로딩중임</div>}>
            <Context1.Provider value={{ 재고, shoes}}>
            <Detail shoes={shoes}/>
            </Context1.Provider>
          </Suspense>
        }/>

        <Route path="/cart" element= <Cart/>/>
        <Route path="/test" element= <Test/>/>


        <Route path="/about" element={ <About/> } >  
          <Route path="member" element={ <div>멤버들</div> } />
          <Route path="location" element={ <div>회사위치</div> } />
        </Route>

        <Route path ="/even" element = {<Even/>}>
          <Route path = "one" element = {<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path = "two" element = {<div>생일기념 쿠폰 받기</div>}/>
        </Route>

      </Routes>


    </div>
  );
}

function Card(props){
  return(
    <div className='col-md-4'>
    <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) + '.jpg'} width="80%" />
    <h4>{props.shoes.title}</h4>
    <p>{props.shoes.price}</p>
    </div>
  )
}

function About(){
  return(
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Even(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}


export default App;

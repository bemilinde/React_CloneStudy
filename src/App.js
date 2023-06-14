/* eslint-disable */
import { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import data from './data.js'
import Detail from './routes/Detail.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

function App() {

  let [shoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">NEGORANI</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
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
          </>
        }/>
        <Route path='/detail/:id' element={<Detail shoes={shoes}/>}/>

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

import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { cleanup } from "@testing-library/react";
import { Nav } from "react-bootstrap";
import '../App.css';

import { Context1 } from './../App.js'



function Detail(props){

    let {재고} = useContext(Context1);

    let {id} = useParams();
    let 찾은상품 = props.shoes.find(x => x.id == id);    
    let [alert, setAlert] = useState(true)
    let [Dfade, DsetFade] = useState('')
    let [탭, 탭변경] = useState(0)

    useEffect(()=>{
        let a = setTimeout(()=>{ }, 2000)
        return ()=>{
            clearTimeout(a)
        }
      }, [])

    useEffect(()=>{
        let a = setTimeout(()=>{ DsetFade('end') },100)
        return ()=>{
            clearTimeout(a)
            DsetFade('')
        }
    }, [])



      return (
        <div className={'container start ' + Dfade}>
            {
                alert == true
                ? <div className="alert alert-warning">
                    2초이내 구매시 할인
                  </div>
                : null
            }
          
          <div className="row mb-5">
            <div className="col-md-6">
              <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-6 mt-4">
              <h4 className="pt-5">{찾은상품.title}</h4>
              <p>{찾은상품.content}</p>
              <p>{찾은상품.price}원</p>
              <button className="btn btn-danger">주문하기</button> 
            </div>
          </div>

        <Nav variant="tabs"  defaultActiveKey="link0">
            <Nav.Item>
              <Nav.Link onClick={()=>{탭변경(0)}} eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={()=>{탭변경(1)}} eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={()=>{탭변경(2)}} eventKey="link2">버튼2</Nav.Link>
            </Nav.Item>
        </Nav>
        <TabContent 탭 = {탭}/>

      </div>  
      )
};

function TabContent({탭}){

    let [fade, setFade] = useState('')
    let {재고} = useContext(Context1);

    useEffect(()=>{    
        let a = setTimeout(()=>{ setFade('end') },100)
        return ()=>{
            clearTimeout(a)
            setFade('')
        }
    }, [탭])

    return (<div className={`start ${fade}` }>{
        [<div>{재고}</div>, <div>내용1</div>, <div>내용2</div>][탭]
    }
    </div>)

    // if(탭 == 0){
    //    return <div>내용0</div>
    // }else if(탭 == 1){
    //    return <div>내용1</div>
    // }else if(탭 == 2){
    //    return <div>내용2</div>
    // }
}

export default Detail;
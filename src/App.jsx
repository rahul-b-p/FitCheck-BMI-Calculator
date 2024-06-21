import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Row, Col,Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';




function App() {
  const [show, setShow] = useState(false);

  const [massInput, setMassInput] = useState(0)

  const [heightInput, setHeightInput] = useState(0)

  const [bmiResult, setBmiResult] = useState(0)

  const [healthCondition, setHealthCondition] =useState("")


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const massInputHandle =(mass)=>{
    setMassInput(mass)
  }

  const heightInputHandle =(height)=>{
    setHeightInput(height)
  }

  const handleReset =()=>{
    setHeightInput(0)
    setMassInput(0)
    setBmiResult(0)
  }

  const handleResult=()=>{
    let height = cmTom(heightInput)
    // console.log(height);
    let mass = massInput
    if(height>0 && mass>0){
      let bmi = mass/(height**2)
      bmi=bmi.toFixed(1)
      setBmiResult(bmi)
      // console.log(bmi);
      if(bmi<18.5){
        setHealthCondition("Under Weight")
      }
      else if(bmi>=18.5 && bmi<=24.9){
        setHealthCondition("Normal Weight")
      }
      else if(bmi>=25 && bmi<=29.9){
        setHealthCondition("Over Weight")
      }
      else if(bmi>=30 && bmi<=34.9){
        setHealthCondition("Low-Risk Obesity")
      }
      else if(bmi>=35 && bmi<=39.9){
        setHealthCondition("Modarate-Risk Obesity")
      }
      else{
        setHealthCondition("Severe Obesity")
      }
    }
    else{
      alert('Please Fill Input Completely')
      toast.info('Please fill completely')
    }
  }

  const cmTom=(cm)=>{
    let m = cm/100
    // console.log(m);
    return(m)
  }

  return (
    <>
      <div className="page bg-secondary">
        <div className=' d-flex align-items-center bg-dark w-100'>
          <img src="../public/Fitcheck.png" alt="" width={60} className='ms-2 mt-1'/>
          <h2 className='text-success ms-2 mt-1'>FitCheck</h2>
          <Button className='bg-dark border-dark ms-auto me-2 onClick={handleShow}' onClick={handleShow}>
            <FontAwesomeIcon icon={faCircleInfo} className='text-light' size='xl'/>
          </Button>
          
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Body Mass Index Scale</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ul>
              <li>Underweight: BMI less than 18.5</li>
              <li>Normal weight: BMI 18.5 - 24.9</li>
              <li>Overweight: BMI 25 - 29.9</li>
              <li>Obesity: BMI 30 - 39.9</li>
              <ul>
                <li>Class 1 (Low-risk obesity): BMI 30 - 34.9</li>
                <li>Class 2 (Moderate-risk obesity): BMI 35 - 39.9</li>
              </ul>
              <li>Severe obesity: BMI 40 or greater</li>
            </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <h1 className='mt-5 text-center fs-1 bmitxtclr'>Body Mass Index Navigator</h1>
        <Row className='mt-5'>
          <Col xs={1} sm={2} md={3} lg={4}></Col>
          <Col xs={10} sm={8} md={6} lg={4} className='p-4 bg-dark rounded shadow'>
            <div className='d-flex align-items-center justify-content-center'>
              {
                bmiResult>0?
                <div>
                  <div className='d-flex align-items-center justify-content-center'>
                    <div className='rounded-circle bg-success d-flex align-items-center justify-content-center' style={{height:'60px',width:'60px'}} >
                      <p className='mt-3 fw-bolder'>{bmiResult}</p>
                    </div>
                  </div>
                  <p className='text-warning fs-2 fw-bolder' style={{marginLeft:'-7px',display:'inline-block'}}>{healthCondition}</p>
                </div>
                


                :
                
                massInput>0 || heightInput>0 ?

                <Spinner animation="grow" variant="success" style={{width:'60px',height:'60px'}}/>

                :

                <div className='rounded-circle bg-success d-flex align-items-center justify-content-center' style={{height:'60px',width:'60px'}}>
                  <p className='mt-3 fw-bolder'>BMI</p>
                </div>
                
                
              }
            </div>
            <form>
              <label className='mt-4 text-light' htmlFor="">Input your Weight(in kg) :<span id='mass'>{massInput}</span></label>
              <input value={massInput} onChange={(e)=>massInputHandle(e.target.value)} className='align-middle w-100 slider' type="range" min={0} max={200}/>
              <label className='mt-4 text-light' htmlFor="">Input your height(in cm) :<span id='hght'>{heightInput}</span></label>
              <input value={heightInput} onChange={(e)=>heightInputHandle(e.target.value)} className='align-middle w-100 slider' type="range" min={0} max={200}/>
              <div className='d-flex mt-4 w-100'>
                <button type='button' onClick={handleReset} className='ms-auto btn btn-light'>Reset</button>
                <button type='button' onClick={handleResult} className='ms-2 btn btn-danger'>Submit</button>
              </div>
            </form>
          
          </Col> 
          <Col xs={1} sm={2} md={3} lg={4}></Col>
        </Row>
        <p className='text-center text-light' style={{marginTop:'100px',fontSize:'9px'}}>BMI-Calculator Developed by Rahul B P© Using React.JS</p>
      </div>
    </>
      
  )
}

export default App

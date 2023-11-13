import React ,{useState,useEffect} from 'react'
import {Card,Container,Row,Col,Button,Modal,Form }from 'react-bootstrap';



function Homepage() {
    const [apierror,setapirerror]=useState(false);
    const [status,setStatus]=useState(false);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [updatedtitle, setupdatedTitle] = useState('');
    const [updateddescription, setupdatedDescription] = useState('');
    const [description, setDescription] = useState('');
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedtitle,setselectedtitle]=useState();
    const [selecteddesc,setselecteddesc]=useState();
    
    const [titleerror,settitleerror]=useState(false);
    const [descerror,setdescerror]=useState(false);
  
//   const [priority, setPriority] = useState('low'); 

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let [data, setdata] = useState([]);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => {
    settitleerror(false);
            setdescerror(false);
            setTitle('');
            setDescription('');
    setShow2(false);
}
 

  const handleShow2 = () =>{
    settitleerror(false);
    setdescerror(false);
    setTitle('');
    setDescription('');
     setShow2(true);}
  const handleDeleteConfirmation=(id)=>{
    // console.log(id);
    handleClose1();
  
  const deleteApiUrl = `http://localhost:1337/api/todolists/${id}`;

  fetch(deleteApiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      
    },
  })
    .then((response) => response.json())
    .then((data) => {
    //   console.log('Item deleted successfully', data);
      
      
     
      update();
    })
    .catch((error) => {
      console.error('Error deleting item', error);
      
    });
};
    const handleSubmitData = () => {
        
        // console.log('Submitting data...',title,description,priority);
        const apiurl = "http://localhost:1337/api/todolists";
        let postData = {
            data:{
           
          title: title,
          description: description,
        // priority:priority
    }
        };
      
        // POST request
        fetch(apiurl, {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(postData),
        })
          .then((response) => response.json())
          .then((newItem) => {
            // console.log("POST request response", newItem);
            settitleerror(false);
            setdescerror(false);
            setTitle('');
            setDescription('');
            
            update();
          
           
          })
          .catch((error) => {
            console.error("Error making POST request:", error);
          });

      };
    const handleButtonClick = () => {
        if(title.trim() !== ''&&description.trim()!==''){
            handleClose();
            handleSubmitData();
        }
        else if(title.trim() === ''){

            settitleerror(true);
        }
        else {
            setdescerror(true);
        }
       
      };
      const handleButtonClick2 = (id,tit,des) => {
        // console.log("update button clicked",status)
        // console.log("update button clicked title",title,"des",description)
        // console.log("title",tit,"desc",des);
        // if(title.trim() !== ''&&description.trim()!==''){
            handleClose2();
            handleupdateData2(id,tit,des);
        // }
        // else if(title.trim() === ''){

        //     settitleerror(true);
        // }
        // else {
        //     setdescerror(true);
        // }
         

      }
      const handleupdateData2=(id,tit,des)=>{
        const apiurl = `http://localhost:1337/api/todolists/${id}`;
        let postData = {
            data:{
           
          title: tit,
          description: des,
          status:status,
        // priority:priority
    }
        };
      
        // PUT request
        fetch(apiurl, {
          method: "PUT",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(postData),
        })
          .then((response) => response.json())
          .then((newItem) => {
            // console.log("PUT request response", newItem);
      
            update();
            
           
          })
          .catch((error) => {
            console.error("Error making PUT request:", error);
          });
      }

    const apiurl = "http://localhost:1337/api/todolists";
    let headers = {
      Authorization:
        "Bearer 96c832525965b22b4e2caa1c9170bd5f28ed33035490453586b9ffc7f0b8007c5d8551ac25d00eda2ba46d9215921a8434b466f747c391995bad739c3dc979b848e00cdb25d2fd007b33a3491623bf5021fd9ede3e36506f1e7dd466c1f6122f63b8c5b0bd494e76db971bf5e0f19f2ed0a2155b63c40cfdabffb9659247b667",
      "Content-Type": "application/json",
    };
    
    
   function update()  {
   
      fetch(apiurl,{headers:headers})
        .then((response) => {
        //   console.log(response);
        settitleerror(false);
            setdescerror(false);
            setTitle('');
            setDescription('');
          return response.json();
        })
        .then((datar) => {
        //   console.log("data received", datar);
          setdata(datar.data);
        }).catch((e)=>{
            
        });
        
    }
    useEffect(()=>{
        fetch(apiurl,{headers:headers})
        .then((response) => {
          if(!response.ok){
            throw  new Error("api not found")
          }
          return response.json();
        })
        .then((datar) => {
        //   console.log("data received", datar);
          setdata(datar.data);
        }).catch((e)=>{
            setapirerror(true);
            console.log(e);
        });
        
    },[apiurl])

    //  console.log(data[4]?.attributes?.status); // Use optional chaining to handle potential undefined values

  return (
   <>
   <div className="addtask">
   <Button variant="primary" onClick={handleShow} style={{width:"60%",margin:"auto",display:"block" ,padding:"10px"}}>
        Add New Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form>
           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label >Title</Form.Label>
        <Form.Control
         type="text" placeholder="title of your work" name='title'
        
         onChange={(e) => setTitle(e.target.value)}
         required/>
           {titleerror?(<p style={{color:"red"}}> title required</p>):null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea"  rows={3} name='desc' placeholder='description of your task'
         onChange={(e) => setDescription(e.target.value)}
         required
         />
        {descerror?(<p style={{color:"red"}}> description required</p>):null}
      </Form.Group>
           {/* <Form.Select aria-label="Default select example"  onChange={(e)=>{
            setPriority(e.target.value)
           }}>
           <option >priority</option>
                <option value="high">High</option>
                <option value="low">low</option>
             </Form.Select>
            */}

           
           </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleButtonClick}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
   </div>

   <Container>
    <Row >
        <Row><h3 id='tasks'>Your tasks are:</h3></Row>
        {data && data.length?(data.map((item,index)=>(
         <Col style={{marginTop:"8px"}} key={index}>
         <Card style={{ width: '18rem' }}>
               <Card.Body>
                 <div className="taskheader">
                 <Card.Title style={{display:"inline"}}>Task {index+1}</Card.Title>
                 <Card.Title style={{display:"inline"}}>Status : {item?.attributes?.status?(<input type="checkbox"  style={{width:"17px",height:"17px"}}defaultChecked />):(<input type="checkbox"style={{width:"17px",height:"17px"}} />)}</Card.Title>
                 </div>
                 <Card.Subtitle className="mb-2 text-muted" style={{fontSize:"19px"}}>{item.attributes.title.toUpperCase()}</Card.Subtitle>
                 <Card.Text style={{fontSize:"18px"}}>
                  {item.attributes.description}
                 </Card.Text>
                 
              
   <Button variant='primary' onClick={()=>{
    // console.log("edit",item.id);
    setSelectedItemId(item.id);
    setselectedtitle(item.attributes.title);
   
    setselecteddesc(item.attributes.description);
     
    
    
    
    handleShow2();
   }} style={{marginRight:"5px"}}>Edit</Button>
   <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton onClick={handleClose2}>
          <Modal.Title>Edit Your TAsk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label >Title</Form.Label>
        <Form.Control
         type="text" defaultValue={selectedtitle} name='title'
         
        
         onChange={(e) => setupdatedTitle(e.target.value)}
         required/>
          
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea"  rows={3} name='desc' defaultValue={selecteddesc} 
         onChange={(e) => setupdatedDescription(e.target.value)}
         required
         />
       
      </Form.Group>
           {/* <Form.Select aria-label="Default select example"  onChange={(e)=>{
            setPriority(e.target.value)
           }}>
           <option >priority</option>
                <option value="high">High</option>
                <option value="low">low</option>
             </Form.Select>
            */}

           
           
     

           <Form.Select aria-label="Default select example"  onChange={(e)=>{
            setStatus(e.target.value)
           }}>
           <option >Status of Task</option>
                <option value="true">Task is Completed</option>
                <option value="false">Task is not completed yet</option>
             </Form.Select>
           

           
          
           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Cancle
          </Button>
          <Button variant="primary" onClick={()=>{
           if(updateddescription===''&&updatedtitle==''){
            handleButtonClick2(selectedItemId,selectedtitle,selecteddesc);
           }
           else if(updatedtitle===''&&updateddescription!==''){
            handleButtonClick2(selectedItemId,selectedtitle,updateddescription);
           }
           else if(updatedtitle!==''&&updateddescription===''){
            handleButtonClick2(selectedItemId,updatedtitle,selecteddesc);
           }
           else{
            handleButtonClick2(selectedItemId,updatedtitle,updateddescription);
           }
            
            
          }}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
<Button variant="danger" value={item.id} onClick={()=>{
    // console.log(item.id);
    setSelectedItemId(item.id);
    handleShow1();

}}>
        Delete
      </Button>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontSize:"30px",color:"red"}}>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this item ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="primary"  onClick={() =>{
        //   console.log(item.id);
        // console.log(selectedItemId);
    handleDeleteConfirmation(selectedItemId);

             }}>
           Confirm
          </Button>
        </Modal.Footer>
      </Modal>
                 </Card.Body>
             </Card>
             </Col>
             

    ))):(
        
        <Card.Title style={{textAlign:"center",marginTop:"10px"}}>{apierror?"Api Not found , contact to developer":"Your Todos is empty yet"}</Card.Title>
        
    )
}
       

    </Row>
    </Container>
   </>

 )}
export default Homepage

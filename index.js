import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; 
//Basic React Client using axios for HTTP requests. 

 
 //Create component for sort fields and result display

class SortComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { // Declare some states that will be saved during component use. 
      message:"",
      data:[],
      type:"numbers",
    }
    this.submitButtonHandle = this.submitButtonHandle.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleType = this.handleType.bind(this);
  }
  handleMessage(e){ //Create handling functions for message input. 
    this.setState({message: e.target.value})
    
  }
  handleType(e){ //Create handling functions for type input. 
    this.setState({type: e.target.value})
  }
  async submitButtonHandle(){ //Create handling for POST request. Received response is saved inside the state. 
    
    const reply = await axios.post(
      'http://localhost:4000/sort',
      { message:this.state.message, type:this.state.type},
      { headers: { 'Content-Type': 'application/json' } }
    )
    this.setState({data:reply.data.Steps});
    console.log(reply.data.Steps)};

  render(props){
    
    return (
      <React.Fragment>
      <div>
							<h1>Sorting Tool</h1>
       <form id="Submit">
       <select name="mode" id="mode" defaultValue="numbers"onChange={this.handleType}>
        <option value="numbers">Numbers</option>
        <option value="strings">Strings</option>
        </select>
        <br/>
        Message: <input type="text" name="message" onChange={this.handleMessage}></input>
        <br/>
      <button onClick={e => {e.preventDefault(); this.submitButtonHandle()}}>Submit</button>
      </form>
      </div>
      <div>
      <h3>Steps:</h3><br></br> {/*Client evaluates the returned data, saves it to state, then displays it using map function.*/} 
      <ul>
      {this.state.data.map(reply => (
        <li key={Math.random()}>{reply}</li>
      ))}
    </ul>
      </div>
  </React.Fragment>
      
    );
  }
}



ReactDOM.render( <SortComponent />, document.getElementById("root"))
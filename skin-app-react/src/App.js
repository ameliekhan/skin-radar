import React, { Component } from 'react';
import './App.css';
import SkinForm from './SkinForm.js';
import IngredientTable from './IngredientTable.js';
import 'react-sticky-header/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      iData: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(e) { 
    //debugger;
    e.preventDefault();
    var data = new FormData();
    data.append("ingredient", this.state.value);

    fetch("http://127.0.0.1:5000/pizza", {
      method: "POST",
      body: data
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        //debugger;
        this.setState({ iData: responseData })
        // let frm = document.getElementsByName('ingredient')[0]; //work on clearing form input once submitted
        // frm.reset();

      })
      .catch((err) => {
        console.log(err);
      })

  }

  render() {
    return (
      <div className="App">

        <div>
          <SkinForm handleSubmit={this.handleSubmit} value={this.state.value} handleChange={this.handleChange} />

        </div>
        {this.state.iData.length > 0 &&
          <div>
            <IngredientTable data={this.state.iData} />
          </div>
        }

      </div>


    );
  }
}
export default App;

import React, { Component } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import GifList from './components/GifList';

export default class App extends Component {
  
  constructor() {
    super()
    this.state ={
      gifs: []
    }
  } 

  componentDidMount() {
    fetch('http://api.giphy.com/v1/gifs/trending?api_key=5mscSow7ozMpCy6J76LJFTZF9dW1L53Y')
      .then(response => response.json())
      .then(responseData => {
        this.setState({gifs: responseData.data})
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error)
      })
  }

  render() { 
    console.log(this.state.gifs)
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm />      
          </div>   
        </div>    
        <div className="main-content">
          <GifList />
        </div>
      </div>
    );
  }
}

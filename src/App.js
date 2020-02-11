import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import SearchForm from './components/SearchForm';
import GifList from './components/GifList';

export default class App extends Component {
  
  constructor() {
    super()
    this.state ={
      gifs: [],
      loading: true
    }
  }

  componentDidMount(){
    this.performSearch()
  }

  //Refactor2-Wired up search bar to take dynamic user input to render results
  performSearch = (query = 'cats') => {
    axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=5mscSow7ozMpCy6J76LJFTZF9dW1L53Y`)
      .then(response => {
        this.setState({
          gifs: response.data.data,
          loading: false
        })
      })
      .catch(error => {
        console.log("Error fetching and parsing data",error)
      })
  }
  
  //Reactor1- used axios get method instead of fetch
  // componentDidMount() {
  //   axios.get('http://api.giphy.com/v1/gifs/trending?api_key=5mscSow7ozMpCy6J76LJFTZF9dW1L53Y')
  //     .then(response => {
  //       this.setState({
  //         gifs: response.data.data
  //       })
  //     })
  //     .catch(error => {
  //       console.log("Error fetching and parsing data",error)
  //     })
  // }

  // Initial solution-Using fetch request
  // componentDidMount() {
  //   fetch('http://api.giphy.com/v1/gifs/trending?api_key=5mscSow7ozMpCy6J76LJFTZF9dW1L53Y')
  //     .then(response => response.json())
  //     .then(responseData => {
  //       this.setState({ gifs: responseData.data })
  //     })
  //     .catch(error => {
  //       console.log("Error fetching and parsing data", error)
  //     })
  // }

  render() { 
    console.log(this.state.gifs)
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch}/>      
          </div>   
        </div>    
        <div className="main-content">
          {
            (this.state.loading)
            ? <p>Loading...</p>
            : <GifList data={this.state.gifs} />
          }
        </div>
      </div>
    );
  }
}

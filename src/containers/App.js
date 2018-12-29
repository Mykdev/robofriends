import React, {Component} from 'react';
import {connect} from 'react-redux';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll.js';
import ErrorBoundry from '../components/ErrorBoundry.js';
import './App.css';

import {setSearchField} from '../actions';

const mapStateToProps = state =>{
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

class App extends Component {

  constructor(){
    super()
    this.state = {
        robots: []
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(responce => responce.json())
      .then(users => this.setState({robots: users}));
  }

  render(){
    const {robots} = this.state;
    const {searchField,onSearchChange} = this.props;
    const filterRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
      return !robots.length?(
        <div className='tc'>
          <h1>Loading...</h1>
        </div>
      ):(
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <ErrorBoundry>
              <Cardlist robots={filterRobots}/>
            </ErrorBoundry>
          </Scroll>
        </div>
      );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);

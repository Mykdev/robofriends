import React, {Component} from 'react';
import {connect} from 'react-redux';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll.js';
import ErrorBoundry from '../components/ErrorBoundry.js';
import './App.css';

import {setSearchField,requestRobots} from '../actions';

const mapStateToProps = state =>{
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {

  componentDidMount(){
    this.props.onRequestRobots();
  }

  render(){
    const {searchField,onSearchChange,robots,isPending} = this.props;
    const filterRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
      return isPending?(
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

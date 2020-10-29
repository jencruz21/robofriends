import React from "react";
import CardList from "../components/CardList.js";
import SearchBox from "../components/SearchBox.js";
import Scroll from "../components/Scroll.js";
import "./App.css";

//state of the app
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: "",
    };
  }
  //We render the robots array
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        this.setState({ robots: users });
      });
  }
  //We set the state of the searchfield
  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  //We return the container
  render() {
    const { robots, searchField } = this.state;
    const filterRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    //Checking if the robots is not yet loaded
   return !robots.length ? <h1 className="tc">Loading</h1>:
   (<div className="tc">
      <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <CardList robots={filterRobots} />
        </Scroll>
    </div>);
  }
}

export default App;

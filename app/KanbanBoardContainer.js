import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
import 'babel-polyfill';
import update from 'react-addons-update';

const API_URL = 'http://kanbanapi.pro-react.com/';
const API_HEADERS = {
  'Content-Type' : 'application/json',
  'Authorization': 'string'
};

class KanbanBoardContainer extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
    };
  }

  componentDidMount() {
    fetch(API_URL+'/cards', {headers: API_HEADERS})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({ cards: responseData })
    })
    .catch((error) => {
      console.log("Error fetching and parsing data", error);
    });
  }

  addTask(cardId, taskName) {
    console.log("addTask");
    // keep a rference to the original state prior to the mutations
    // in case you need to revert the optimistic changes in the UI
    let prevState = this.state;

    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card)=> card.id == cardId);

    // Create a new task with the given name and temp ID
    let newTask = { id: Date.now(), name: taskName, done: false };

    // Create a new object and push the new task to the array of tasks
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {$push: [newTask] }
      }
    });

    // set the component state to the mutated object
    this.setState({cards: nextState});

    // Call the API to add the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        // Throw an error if server response wasn't ok
        // so you can revert back the optimistic changes
        // made to the UI
        throw new Error("Serve response wasn't ok: addTask()")
      }
    })
    .then((responseData) => {
      // when the server returns the definitive id
      // used for the new Task on the server, update it on React
      newTask.id = responseData.id
      this.setState({ cards: nextState });
    })
    .catch((error) => {
      console.log("fetch error: ", error);
      this.setState(prevState);
    });

  }

  deleteTask(cardId, taskId, taskIndex) {
    console.log("deleteTask")
    // keep a rference to the original state prior to the mutations
    // in case you need to revert the optimistic changes in the UI
    let prevState = this.state;

    // find the index of the card
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

    // Create a new object without the task
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        // remove the task at taskIndex
        tasks: { $splice: [[taskIndex, 1]] }
      }
    });

    // set the component state to the mutated object
    this.setState({ cards: nextState })

    // call the API to remove the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'delete',
      headers: API_HEADERS
    })
    .then((response) => {
      if (!response.ok) {
        // Throw an error if server response wasn't ok
        // so you can revert back the optimistic changes
        // made to the UI
        throw new Error("Serve response wasn't ok: deleteTask()")
      }
    })
    .catch((error) => {
      console.log("fetch error: ", error);
      this.setState(prevState);
    });
  }

  toggleTask(cardId, taskId, taskIndex) {
    console.log("toggleTask");
    // keep a rference to the original state prior to the mutations
    // in case you need to revert the optimistic changes in the UI
    let prevState = this.state;

    // find the index of the card
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

    // save a reference to the tasks's 'done' value
    let newDoneValue;

    // Using the $apply command, you will change the done value to its opposite
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          [taskIndex]: {
            done: {
              $apply: (done) => {
                newDoneValue = !done
                return newDoneValue;
              }
            }
          }
        }
      }
    });

    // set the component state to the mutated object
    this.setState({cards:nextState})

    // Call the API to toggle the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({done:newDoneValue})
    })
    .then((response) => {
      if (!response.ok) {
        // Throw an error if server response wasn't ok
        // so you can revert back the optimistic changes
        // made to the UI
        throw new Error("Serve response wasn't ok: toggleTask()")
      }
    })
    .catch((error) => {
      console.log("Fetch error: ", error);
      this.setState({prevState});
    });

  }

  render() {
    let cards = this.state.cards;
    return (
      <KanbanBoard cards={cards}
                   taskCallbacks={{
                    toggle: this.toggleTask.bind(this),
                    delete: this.deleteTask.bind(this),
                       add: this.addTask.bind(this) }} />
    )
  }
}

export default KanbanBoardContainer;

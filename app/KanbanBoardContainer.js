import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';

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

  render() {
    let cards = this.state.cards;
    return <KanbanBoard cards={cards} />
  }
}

export default KanbanBoardContainer;

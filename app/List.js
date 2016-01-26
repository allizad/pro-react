import React, { Component } from 'react';
import Card from './Card.js';

class List extends Component {
  render() {
    var cards = this.props.cards.map((card) => {
      return (
        <Card
          id={ card.id }
          key={ card.id }
          title={ card.title }
          description={ card.description }
          tasks={ card.tasks }
        />
      )
    })
    return (
      <div className="list">
        <h2>{ this.props.title }</h2>
        { cards }
      </div>
    )
  }
}

export default List;
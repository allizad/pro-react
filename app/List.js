import React, { Component, PropTypes } from 'react';
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
          color={ card.color }
          tasks={ card.tasks }
          taskCallbacks={ this.props.taskCallbacks }
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
List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
}


export default List;

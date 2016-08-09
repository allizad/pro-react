import React, { Component } from 'react';

var ITEMS = [
  {id: 1, name: "Milk"},
  {id: 2, name: "Yoghurt"},
  {id: 3, name: "Orange Juice"}
]

class AnimatedShoppingList extends Component {
  constructor(){
    super();
    this.state = {
      items: ITEMS
    }
  }

  // called when user changes the input field
  handleChange(evt){
    if(evt.key == "Enter") {
      // create new item, set id as current date
      let newItem = { id: Date.now(), name:evt.target.value}
      // create new array w/ previous items + new value from user
      let newItems = this.state.items.concat(newItem);
      // clear text field
      evt.target.value="";
      // set new state
      this.setState({items:newItems})
    }
  }

  // called when user clicks on a shopping item
  handleRemove(i){
    // create new array without the clicked item
    var newItems = this.state.items;
    newItems.splice(i, 1);

    // set the new state
    this.setState({items:newItems})
  }
  render(){
    let shoppingItems = this.state.items.map((item, i) => (
      <div key={item.id}
        className="item"
        onClick={this.handleRemove.bind(this, i)}>
        {item.name}
      </div>
    ));

    return (
      <div>

        {shoppingItems}

        <input type="text" value={this.state.newItem} onKeyDown={this.handleChange.bind(this)} />
      </div>
    )
  }
}

export default AnimatedShoppingList;

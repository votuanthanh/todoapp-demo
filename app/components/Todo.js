/* eslint-disable no-unused-vars */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/newline-after-import */
/* eslint-disable camelcase */
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import './todo.global.css';
const faker = require('faker');

const btn_style = {
  marginLeft: '10px',
  marginBottom: '5px'
};

const input_style = {
  width: '250px',
  padding: '5px'
};

class TodoItem extends React.PureComponent {
  constructor() {
    super();

    this.onMarkItemComplete = event => {
      this.props.markItemComplete(this.props.item.id);
    };

    this.onDeleteItem = event => {
      this.props.deleteItem(this.props.item.id);
    };

    this.onHandleChangeCreater = event => {
      this.props.handleChangeCreater(this.props.item.id);
    };
  }

  render() {
    const itemClass =
      'isItemCompleted-' + (this.props.item.status ? 'done' : 'undone');

    return (
      <div className="container-fluid">
        <div className="item">
          <input type="checkbox" onChange={this.onMarkItemComplete} />
          <span style={{ marginLeft: '5px' }} className={itemClass}>{`${
            this.props.item.task
          } --- ${this.props.item.creater.profile.name}`}</span>

          <button
            style={{ float: 'right', marginTop: '-7px' }}
            type="button"
            className="btn btn-danger btn-md"
            onClick={this.onDeleteItem}
          >
            x
          </button>
          <button
            style={{ float: 'right', marginTop: '-7px', marginRight: '5px' }}
            type="button"
            className="btn btn-info btn-md"
            onClick={this.onHandleChangeCreater}
          >
            Random Creater
          </button>
        </div>
      </div>
    );
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map(item => (
          <TodoItem
            key={item.id}
            item={item}
            handleChangeCreater={this.props.handleChangeCreater}
            deleteItem={this.props.deleteItem}
            markItemComplete={this.props.markItemComplete}
          />
        ))}
      </div>
    );
  }
}

class TodoApp extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      value: '',
      items: []
    };

    this.handleChangeCreater = this.handleChangeCreater.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleAddItemMutable = this.handleAddItemMutable.bind(this);
    this.handleMarkItemComplete = this.handleMarkItemComplete.bind(this);
    // this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleDeleteItem(itemId) {
    const updatedItems = this.state.items.filter(item => item.id !== itemId);

    this.setState({
      items: [].concat(updatedItems)
    });
  }

  handleMarkItemComplete(itemId) {
    // const updatedItems = this.state.items.map(item => {
    //   if (itemId === item.id) item.status = !item.status;

    //   return item;
    // });

    const updatedItems = this.state.items.map(item => {
      return itemId === item.id ? { ...item, status: !item.status } : item;
    });

    this.setState({
      items: [].concat(updatedItems)
    });
  }

  handleAddItemMutable(event) {
    event.preventDefault();

    if (this.state.value === '') return;

    const newItem = {
      task: this.state.value,
      id: Date.now(),
      status: false,
      creater: {
        id: Date.now(),
        age: 20,
        profile: {
          name: 'Vo Tuan Thanh'
        }
      }
    };
    const copyTodo = this.state.items;
    copyTodo.push(newItem);
    this.setState({
      items: copyTodo
    });
  }

  handleInput(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleAddItem(event) {
    event.preventDefault();

    if (this.state.value === '') return;

    const newItem = {
      task: this.state.value,
      id: Date.now(),
      status: false,
      creater: {
        id: Date.now(),
        age: 20,
        profile: {
          name: faker.name.findName()
        }
      }
    };

    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      value: ''
    }));
  }

  handleChangeCreater(todoId) {
    const selectedIndex = this.state.items.findIndex(
      todo => todo.id === todoId
    );
    // const oldItem = this.state.items;
    // oldItem[selectedIndex].creater.profile.name = faker.name.findName();
    // this.setState({
    //   items: oldItem
    // });

    this.setState({
      items: this.state.items.map((item, index) => {
        return selectedIndex === index
          ? {
              ...item,
              creater: {
                ...item.creater,
                profile: {
                  ...item.creater.profile,
                  name: faker.name.findName()
                }
              }
            }
          : item;
      })
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="body">
              <h2 className="heading">TODO List</h2>
              <input
                style={input_style}
                placeholder="Add New Todo"
                type="input"
                onChange={this.handleInput}
                value={this.state.value}
              />
              <button
                style={btn_style}
                type="button"
                className="btn btn-success btn-md"
                onClick={this.handleAddItem}
              >
                Add Immutable
              </button>
              <button
                style={btn_style}
                type="button"
                className="btn btn-primary btn-md"
                onClick={this.handleAddItemMutable}
              >
                Add mutable
              </button>
              <TodoList
                items={this.state.items}
                deleteItem={this.handleDeleteItem}
                handleChangeCreater={this.handleChangeCreater}
                markItemComplete={this.handleMarkItemComplete}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoApp;

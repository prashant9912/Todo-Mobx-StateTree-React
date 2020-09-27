import React, { Component, PureComponent } from "react";

import styled, { css } from "styled-components";
import { observer } from "mobx-react";
import { values } from "mobx";

const Cointainer = styled.div`
  padding: 10px;
  height: 100vh;
  background-color: #f7f7f7;
`;

const Add = styled.button`
  background-color: #5f27cd;
  border: none;
  color: white;
  padding: 7px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  margin-bottom: 20px;
  cursor: pointer;

  ${(props) =>
    props.enable &&
    css`
      background-color: red;
    `}
`;
const TodoBox = styled.div`
    display:flex;
    flex-direction: row;
  padding: 10px;
  border: 2px solid #2cb6d3;
  border-radius: 10px;
  width: 300px;
  margin-bottom: 10px;
`;

const Check = styled.input`

height: 25px;
width: 25px;
background-color: #eee;
`


const TodoCounterView = observer(props => {
  console.log('Counter Updated')
  return <div>
      {props.store.pendingCount} pending, {props.store.completedCount} completed
  </div>
})


const Todo = observer((props) => {
  console.log("TODO id:"+props.todo.id+" updated");

  return (
    <TodoBox>
      <Check
        type="checkbox"
        checked={props.todo.done}
        onChange={(e) => props.todo.toggle()}
      />
      <input style={{border:"none",fontSize:18}}
      type="text"
      value={props.todo.name}
      onChange={e => props.todo.setName(e.target.value)}
    />
    </TodoBox>
  );
});

const TodoView = observer((props) => {
  console.log("View Updated");
  return (
    <div>
      <Add
        onClick={() =>
          props.todo.addTodo(
            Math.floor(Math.random() * 1000).toString(36),
            "new Task"
          )
        }
      >
        {" "}
        Add
      </Add>

      {values(props.todo.todos).map((v, k) => (
        <Todo key={k} todo={v} />
      ))}
    </div>
  );
});

export default class App extends Component {
  render() {
    console.log("Main Comp Render");
    return (
      <Cointainer>
        <h2>Mobx Todo</h2>
        <TodoCounterView store={this.props.store}/>
        <TodoView todo={this.props.store} />
      </Cointainer>
    );
  }
}

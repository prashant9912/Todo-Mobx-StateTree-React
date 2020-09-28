import React from "react";
import { types, onPatch, cast } from "mobx-state-tree";
import { runInAction, values } from "mobx";
import axios from "axios";

import * as localForage from  "localforage";
import { persist } from 'mst-persist'

const Todo = types

  .model({
    name: types.string,
    id: types.string,
    done: types.optional(types.boolean, false),
  })
  .actions((self) => {
    function setName(name) {
      self.name = name;
    }
    function toggle() {
      self.done = !self.done;
    }
    return { setName, toggle };
  });

const Api = types
  .model({
    data: types.array(
      types.model({
        postId: types.number,
        id: types.number,
        name: types.string,
        email: types.string,
        body: types.string,
      })
    ),
  })
  .actions((self) => ({
    getData() {
      axios
        .get("https://jsonplaceholder.typicode.com/posts/1/comments")
        .then((data) => {
          self.data = data.data;
        });
    },
  }));

const RootStore = types
  .model({
    todos: types.map(Todo),
    api: types.map(Api),
    data: "[]",
  })
  .views((self) => ({
    get pendingCount() {
      return values(self.todos).filter((todo) => !todo.done).length;
    },
    get completedCount() {
      return values(self.todos).filter((todo) => todo.done).length;
    },
    get ddd(){
        console.log(JSON.parse(self.data))
        return JSON.parse(self.data)
    }
  }))
  .actions((self) => ({
    addTodo(id, name) {
      self.todos.set(id, Todo.create({ id, name }));
    },

    loadData() {},
    getData() {
        console.log('api calls')
      axios
        .get("https://jsonplaceholder.typicode.com/posts/1/comments")
        .then((data) => {
        //   console.log(data.data);
          self.addData(JSON.stringify(data.data));
        });
    },
    addData(data) {
      self.data = data;
    },
  }));

export const store = RootStore.create({});


//Presist here

persist('some', store, {
  storage: localForage,  // or AsyncStorage in react-native.
                         // default: localStorage
  jsonify: false , // if you use AsyncStorage, this shoud be true

}).then(() => console.log('someStore has been hydrated'))


onPatch(store, (patch) => {
  console.log(patch);
});

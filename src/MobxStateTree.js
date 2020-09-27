import React from 'react'
import {types} from 'mobx-state-tree'
import {values} from 'mobx'


const Todo = types

.model({
    name:types.string,
    id:types.string,
    done:types.optional(types.boolean,false)
})
.actions(self=>{
    function setName(name){
        self.name = name
    }
    function toggle(){
        self.done = !self.done;
    }
    return {setName,toggle}
})


const RootStore = types
.model({
    todos:types.map(Todo)
})
  .views(self => ({
        get pendingCount() {
            return values(self.todos).filter(todo => !todo.done).length
        },
        get completedCount() {
            return values(self.todos).filter(todo => todo.done).length
        }
    }))
.actions(self=>({
     addTodo(id,name){
        self.todos.set(id,Todo.create({id,name}));
    },

    loadData(){

    }

}
))


export const store = RootStore.create({
todos:{
    "1":{
        name:'wow',
        id:'11',
        done:true
    }
}
})
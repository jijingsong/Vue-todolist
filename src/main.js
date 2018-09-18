import 'todomvc-app-css/index.css'
import Vue from 'vue'

let filters = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter(item => {
      return !item.completed
    })
  },
  completed(todos) {
    return todos.filter(item => {
      return item.completed
    })
  }
}

let vm = new Vue({
  el: '#app',
  data: {
    title: 'my-todo',
    todos: [{
      content: 'todo1',
      completed: false
    }, {
      content: 'todo2',
      completed: false
    }],
    newTodo: '',
    editTodo: null,
    stateName: 'all'
  },
  computed: {
    left() {
      return filters.active(this.todos).length
    },
    isAll: {
      get() {
        return this.left === 0
      },
      set(val) {
        this.todos.forEach(item => {
          item.completed = val
        })
      }
    },
    filteredTodos() {
      return filters[this.stateName](this.todos)
    }
  },
  methods: {
    add() {
      if(!this.newTodo) return
      this.todos.push({
        content: this.newTodo,
        completed: false
      })
      this.newTodo = ''
    },
    remove(index) {
      this.todos.splice(index, 1)
    },
    edit(list) {
      this.editCache = list.content
      this.editTodo = list
    },
    doneEdit(list,index) {
      this.editTodo = null
      if(!list.content) {
        this.remove(index)
      }
    },
    cancelEdit(list,index) {
      this.editTodo = null
      list.content = this.editCache
    },
    clearCompleted() {
      this.todos = filters.active(this.todos)
    }
  },
  directives: {
    focus(el,value) {
      if(value) {
        el.focus()
      }
    }
  }
})

function stateChange() {
  let stateName = location.hash.replace(/#\/?/,'')
  if(filters[stateName]) {
    vm.stateName = stateName
  } else {
    location.hash = ''
    vm.stateName = 'all'
  }
}
window.addEventListener('hashchange', stateChange)
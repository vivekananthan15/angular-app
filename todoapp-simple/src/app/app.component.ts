import { Component } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Simple ToDo List App';
  todos:Todo[]=[];
  newTodo:string='';
  
  saveTodo(){
    if(this.newTodo){
      let todo=new Todo();
      todo.todo_name=this.newTodo;
      if(typeof todo.todo_name == 'string'){
        todo.todo_name=todo.todo_name.toUpperCase();
      }
      todo.isCompleted=true;
      this.todos.push(todo);   
      this.newTodo='';   
    }
    else{
      alert('Please Enter Todo');
    }  

  }
  done(id:any){
    this.todos[id].isCompleted=!this.todos[id].isCompleted;
  }
  remove(id:any){
    this.todos=this.todos.filter((v,i)=>i!==id);
    if(this.todos.length==0){
      alert('Todo Lists are empty');
    }
  }
}



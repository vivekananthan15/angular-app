import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';
import { observable } from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  taskObj: Task = new Task();
  taskArr:Task[]=[];

  addTaskValue:string='';
  editTaskValue:string='';

  constructor(private crudService:CrudService) { }

  ngOnInit(): void {
    this.editTaskValue='';
    this.addTaskValue='';
    this.taskObj=new Task();
    this.taskArr=[];
    this.getAllTask();
  }

  getAllTask(){
    this.crudService.getAllTask().subscribe({
      next:res=>{
        this.taskArr=res;
console.log(this.taskArr);
      },
      error:()=>{        
          alert('Unable to get list of tasks');    
      }
    })
  }

  addTask(){
    this.taskObj.task_name=this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe({
      next:res=>{
        this.ngOnInit();
        this.addTaskValue='';
      },
      error:()=>{
        alert('Unable to add list of tasks');    
      }
    })   

  }

  editTask(){
    this.taskObj.task_name=this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert('Failed to update task');
    })
  }

  deleteTask(etask:Task){
    if(confirm('Are you sure want to delete?')){
      this.crudService.deleteTask(etask).subscribe(res=>{
        this.ngOnInit();
      },err=>{
        alert('Failed to delete task');
      })
    }    
  }

  call(etask:Task){
    this.taskObj=etask;
    this.editTaskValue=etask.task_name;
  }

}

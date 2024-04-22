import { Component, computed, effect, signal } from '@angular/core';
import { DetailTicketModalComponent } from "../detail-ticket-modal/detail-ticket-modal.component";
import { CommonModule } from '@angular/common';
import { SwitchService } from '../../services/switch.service';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Filters } from '../../clases';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, ReactiveFormsModule]
})
export class HomeComponent {

  tasks = signal<Task[]>([]);

  filter = signal<'all' | 'pending' | 'completed'>('all');
  taskByFilter = computed(() =>{
    const filter = this.filter();
    const tasks = this.tasks();
    if(filter === 'pending'){
      return tasks.filter(task => !task.completed)
    }
    if(filter === 'completed'){
      return tasks.filter(task => task.completed)
    }
    return tasks;
  })

  //alternativa
  taskByFilter2 = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    const filterMap: Record<Filters, () => Task[]> = {
      [Filters.Completed]: () => tasks.filter((task) => task.completed),
      [Filters.Pending]: () => tasks.filter((task) => !task.completed),
      [Filters.All]:  () => tasks
    }

    return filterMap[filter]();
  })

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  })

  changeHandler(){
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value;
      this.addTask(value);
      this.newTaskCtrl.setValue('');
    }
  }

  addTask(title: string){
    const ti = title.trim();
    if(ti != ''){
    // if(title.replaceAll(/\s/gi, '') != ''){
      const newTask = {
        id: Date.now(),
        title: ti,
        completed: false
      }
      this.tasks.update((tasks) => [...tasks, newTask]);
    }else{
      alert('please insert value');
    }
  }

  deleteTask(index: number){
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }

  updateTask(index: number){
    this.tasks.update((tasks) => tasks.map((task, position) => {if(position == index ) task.completed = !task.completed; return task}));
    console.log(this.tasks);
    // this.tasks.update((tasks) =>{
    //   return tasks.map((task, position) => {
    //     if(position === index){
    //       return {
    //         ...task, completed: !task.completed
    //       }
    //     }
    //     return task;
    //   })
    // })
  };

  constructor(){
    //con el efect vigilamos cambios 
    effect(() => {
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks))
    })
  }

  ngOnInit(){
    document.body.style.background = "url(../../assets/wallgeek.png)"
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
  }

  updateTaskEditingMode(index: number){
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if(position === index){
          return {
            ...task, editing:true
          }
        }
        return {
          ...task, editing:false
        }
      })
    })
  }

  updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if(position === index){
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    })
  }

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter);
  }



}

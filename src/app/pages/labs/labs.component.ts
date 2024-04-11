import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { ServicesService } from '../../services.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
  providers: [ServicesService]
})
export class LabsComponent {
  welcome= 'Hola primera app con angular';
  tasks= signal(['Instalar angular CLI',
          'crear proyecto nuevo',
          'Crear componentes',
          'configurar rutas'  
        ]);
  person = signal([{name: "jesus", age: 34}]);
  
  constructor(private service:ServicesService){
    service.get2().subscribe((data: any) => console.log(data));
  }

  ngOnInit(){
    // document.body.style.background = "url(../../assets/wallplanetary.jpg)"
    const res = this.tasks2.reduce((acumulator, currentValue) => acumulator +  parseInt(currentValue.min), 0 )/this.tasks2.length;
    console.log(res);
  }

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
      nonNullable: true
  });
  nameCtrl = new FormControl('Jesus', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });

  tasks2 = [
    {id: '1', name: 'jesus', status: '0', min: '5'},
    {id: '2', name: 'ana', status: '0', min: '8'},
    {id: '3', name: 'nancy', status: '0', min: '15'},
    {id: '4', name: 'lupita', status: '1', min: '2'},
    {id: '5', mane: 'blanca', status: '1', min: '7'}
  ]


  


}    

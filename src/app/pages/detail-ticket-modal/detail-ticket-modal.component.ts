import { Component } from '@angular/core';
import { SwitchService } from '../../services/switch.service';

@Component({
  selector: 'app-detail-ticket-modal',
  standalone: true,
  imports: [],
  templateUrl: './detail-ticket-modal.component.html',
  styleUrl: './detail-ticket-modal.component.css'
})
export class DetailTicketModalComponent {

  constructor(private modalS:SwitchService){

  }

  ngOnInit(){

  }

  closeModal(){
    this.modalS.$modal.emit(false);
  }

}

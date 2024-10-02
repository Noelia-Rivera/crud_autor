import { Component } from '@angular/core';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { ToastModule } from 'primeng/toast';
import { Autor } from '../models/autor';
import { AutorService } from '../services/autor.service';

@Component({
  selector: 'app-autor',
  standalone: true,
  imports: [TableModule, ButtonModule, DialogModule, RouterModule, InputTextModule, FormsModule, ConfirmDialogModule, ToastModule],
  templateUrl: './autor.component.html',
  styleUrl: './autor.component.css'
})
export class AutorComponent {
 autores: Autor[] = [];
 titulo: string = '';
 opc: string = '';
 autor = new Autor;
 op = 0;
 visible: boolean = false;
 isDeleteInProgress: boolean = false;

  constructor(
    private autorService: AutorService,
    private messageService: MessageService
  ){}

  ngOnInit(): void{
    this.listarAutores();
  }
  listarAutores(){
    this.autorService.getAutores().subscribe((data)=>{
      this.autores = data;
    });
  }
  hola(id:number){
    console.log('button clicked' + id);
  }
  showDialogCreate(){
    this.titulo = "Crear Autor"
    this.opc = "Save";
    this.op = 0;
    this.visible = true;
  }
  showDialogEdit(id: number){
    this.titulo = "Editar Autor"
    this.opc = "Editar";
    this.autorService.getAutorById(id).subscribe((data)=>{
      this.autor = data;
      this. op = 1;
    });
    this.visible = true;
  }
  deleteAutor(id: number){
    this.isDeleteInProgress = true;
    this.autorService.deleteAutor(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Correcto',
          detail: 'Autor se elimino',
        });
        this.isDeleteInProgress = false;
        this.listarAutores();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar Autor'
        });
      },
    });
  }
  addAutor(): void{
    this.autorService.createAutor(this.autor).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Correcto',
          detail: 'Autor agregado',
        });
        this.listarAutores();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar Autor'
        });
      },
    });  
  }
  editAutor(){
    this.autorService.updateAutor(this.autor,this.autor.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Autor editado',
        });
        this.listarAutores();
        console.log(this.autor.id + ' ' + this.autor.nombres + ' ' + this.autor.apellidos + ' ' + this.autor.pais + ' ' + this.autor.foto + ' ' + this.autor.estado);
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Editar el Autor',
        });
      },
    });    
    this.visible = false;
  }
  opcion():void{
    if(this.op==0){
      this.addAutor();
      this.limpiar();
    }else if(this.op==1){
      console.log("Editar");
      this.editAutor();
      this.limpiar();
    }else{
      console.log("No se hace nada");
      this.limpiar();
    }
  }
  limpiar(){
    this.titulo='';
    this.opc='';
    this.op = 0; 
    this.autor.id = 0;
    this.autor.nombres = '';
    this.autor.apellidos = '';
    this.autor.pais = '';
    this.autor.foto = '';
    this.autor.estado = '1';
   }
}
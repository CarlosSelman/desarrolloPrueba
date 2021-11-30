import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from "../../servicios/usuario.service";

import { Router } from '@angular/router';
import Swal from "sweetalert2";
declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [UsuarioService]
})
export class InicioComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['nombres','apellidos', 'fechaNacimiento','estadoCivil','gradoAcademico','direccion','acciones'];
  dataSource = new MatTableDataSource<any[]>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumnsD: string[] = ['usuario','correo', 'tel','rol','estado','acciones'];
  dataSourceD = new MatTableDataSource<any[]>();

  public usuarios:any;
  public user: Usuario;
  public idUsuarioModel: Usuario;

  constructor(
    private _usuarioService: UsuarioService,
   /* private fb: FormBuilder,*/
    private _router: Router
    ) {
   
    this.user = new Usuario("","","","","","","");
    this.idUsuarioModel = new Usuario("","","","","","","");
    

    this._usuarioService.obtenerUsuarios().subscribe ( usuarios => {
      this.dataSource.data = usuarios;
    })
   }

   ngOnInit(): void {
     //this.obtenerUsuarios();
   }

  //Obteniendo los usuarios activos
  obtenerUsuarios(){
    this._usuarioService.obtenerUsuarios().subscribe(
      response => {
         this.dataSource.data = response.usuariosEncontrados;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //Obteniendo los usuarios desactivados
  obtenerUsuariosD(){
    this._usuarioService.obtenerUsuariosD().subscribe(
      response => {
         this.dataSourceD.data = response.usuariosEncontrados;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  obtenerUsuarioId(idUsuario:String){
    this._usuarioService.obtenerUsuarioId(idUsuario).subscribe(
      response=>{
        this.idUsuarioModel = response.usuarioEncontrado;
        console.log(response);

      }
    )
  }


  ngAfterViewInit() {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  //Filtro tabla de usuarios activos
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Filtro tabla de usuarios desactivados
  applyFilterD(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceD.filter = filterValue.trim().toLowerCase();
  }

  //Crear los usuarios
  crearUsuarios(){
    //Validación
      if(
        this.user.nombres===""||
        this.user.apellidos===""||
        this.user.fechaNacimiento===""||
        this.user.estadoCivil===""||
        this.user.gradoAcademico ===""||
        this.user.direccion ===""
        ){
        //Alerta para que se llenen todos los campos
        Swal.fire({
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      }else{
      console.log(this.user)

      this._usuarioService.crearUsuario(this.user).subscribe(
        response=>{
          console.log(response);
          //Alerta de que se creó correctamente el usuario
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          //Limpiando los campos luego de la creación
          this.user.nombres ='';
          this.user.apellidos ='';
          this.user.fechaNacimiento ='';
          
          //Refrescando la ventana
          $('#mCrearUsuario').modal('hide');
          this.refresh();
          //this._router.navigate(['/usuarios'])
        },
        (error) => {
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: 'No se pudo crear el usuario',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      )
    }

  }

  editarUsuario(){
    //Validación
      if(
        this.idUsuarioModel.nombres===""||
        this.idUsuarioModel.apellidos===""||
        this.idUsuarioModel.fechaNacimiento===""||
        this.idUsuarioModel.estadoCivil===""||
        this.idUsuarioModel.gradoAcademico ===""||
        this.idUsuarioModel.direccion ===""
      ){
        //Alerta para que se llenen todos los campos
        Swal.fire({
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      }else{

      this._usuarioService.editarUsuario(this.idUsuarioModel).subscribe(
        response=>{
          console.log(response);
          //Alerta de que se actualizó correctamente el usuario
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          //Refrescando la ventana
          $('#mEditarUsuario').modal('hide');

          this.refresh();
        },
        (error) => {
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: 'No se pudo actualizar el usuario',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      )
    }
  }

  eliminarUsuario(idUsuario:String){
    this._usuarioService.eliminarUsuario(idUsuario).subscribe(
      response=>{
        console.log(response)
        //Refrescando la ventana
        this.refresh();
      }
    )
  }

  refresh(): void{
    window.location.reload();
  }
}
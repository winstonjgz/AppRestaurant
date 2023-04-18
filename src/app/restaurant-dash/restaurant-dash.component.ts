import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestaurantData } from './restaurant.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {
  formValue!: FormGroup;
  restaurantModelObject: RestaurantData = new RestaurantData;
  datosRestaurantes: any;
  showAgregarBut!: boolean;
  showButton!: boolean;


  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nombre: [''],
      email: [''],
      movil: [''],
      direccion: [''],
      servicio: [''],
    });
    this.obtenerDataRestaurante();
  }


  clickAgregarRest(){
    this.formValue.reset();
    this.showAgregarBut=true;
    this.showButton=false;
  }


  //Aqui se suscribe el servicio de nuestra data via Service
  agregarRestaurante() {
    this.restaurantModelObject.nombre = this.formValue.value.nombre;
    this.restaurantModelObject.email = this.formValue.value.email;
    this.restaurantModelObject.movil = this.formValue.value.movil;
    this.restaurantModelObject.direccion = this.formValue.value.direccion;
    this.restaurantModelObject.servicio = this.formValue.value.servicio;

    this.api.postRestaurant(this.restaurantModelObject).subscribe(res => {
      console.log(res);
      alert('Restaurant agregado exitosamente! ');

      this.formValue.reset();
      this.obtenerDataRestaurante();
    },
      err => {
        alert('Por favor verifique los datos no se pudo crear el registro!')
      }
    )
  }

  obtenerDataRestaurante() {
    this.api.getRestaurant().subscribe(res => {
      this.datosRestaurantes = res;
    })
  }

  borrarRestaurant(data: any) {
    this.api.deleteRestaurant(data.id).subscribe(res => {
      alert('Registro eliminado exitosamente!')
      this.obtenerDataRestaurante();
    })
  }

  actualizarRestaurantReg(data: any) {
    this.showAgregarBut=false;
    this.showButton=true;
    this.restaurantModelObject.id = data.id;
    this.formValue.controls['nombre'].setValue(data.nombre);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['movil'].setValue(data.movil);
    this.formValue.controls['direccion'].setValue(data.direccion);
    this.formValue.controls['servicio'].setValue(data.servicio);
  }

  actualizarRestaurante() {
    this.restaurantModelObject.nombre = this.formValue.value.nombre;
    this.restaurantModelObject.email = this.formValue.value.email;
    this.restaurantModelObject.movil = this.formValue.value.movil;
    this.restaurantModelObject.direccion = this.formValue.value.direccion;
    this.restaurantModelObject.servicio = this.formValue.value.servicio;

    this.api.updateRestaurant(this.restaurantModelObject, this.restaurantModelObject.id).subscribe(res => {
      console.log(res);
      alert('Restaurant actualizado exitosamente! ');
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.obtenerDataRestaurante();
    },
      err => {
        alert('Por favor verifique los datos no se pudo actualizar el registro!');

      })
  }

}

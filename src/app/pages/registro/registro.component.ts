import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from '@angular/forms';

import {UsuarioModel} from '../../models/usuario.model';
import {AuthService} from "../../services/auth.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.usuario.email = 'leonmatias@gmail.com';
  }


  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'spere por favor ... '
    });
    Swal.showLoading();
    this.auth.newUser(this.usuario).subscribe(resp => {
      console.log(resp);
      Swal.close();
      if (this.recordarme){
        localStorage.setItem('email',this.usuario.email);
      }
      this.router.navigateByUrl('/home');

    }, (err => {
      Swal.fire({
        icon: 'error',
        title: 'Error al Crear Cuenta',
        text: err.error.error.message
      });
    }));
  }
}

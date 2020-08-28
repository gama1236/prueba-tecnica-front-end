import { Component, OnInit } from '@angular/core';
import { User } from './Model/User';
import { ServiceService } from './Service/service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Rol } from './Model/Rol';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  finder: string;
  usuarios: User[];
  roles: Rol[];
  disableButton: boolean;
  formUsuario = this.fb.group({
    id: [{ value: '', disabled: true }],
    nombre: ['', [Validators.required]],
    rol: [null, [Validators.required]],
    estado: ['', [Validators.required]],
  });
  constructor(private service: ServiceService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAll();
    this.getRoles();
  }
  getAll(): void {
    this.service.getUsers().subscribe((data) => {
      if (data.code === 200) {
        this.usuarios = data.value;
      } else {
        this.usuarios = [];
      }
    });
  }

  getRoles(): void {
    this.service.getRoles().subscribe((data) => {
      if (data.code === 200) {
        this.roles = data.value;
      } else {
        this.roles = [];
      }
    });
  }
  getByName(): void {
    if (this.finder === '' || this.finder === null) {
      this.ngOnInit();
    } else {
      this.service.getByName(this.finder).subscribe((data) => {
        if (data.code === 200) {
          this.usuarios = data.value;
        }
      });
    }
  }

  createUser(): void {
    if (this.formUsuario.invalid) {
      alert('Digite todos los campos');
      return;
    }
    const usuario: User = {
      userId: null,
      userName: this.formUsuario.get('nombre').value,
      rol: {
        rolId: this.formUsuario.get('rol').value.rolId,
        nameRol: this.formUsuario.get('rol').value.nameRol,
      } as Rol,
      userState: this.formUsuario.get('estado').value,
    };
    this.service.saveUser(usuario).subscribe(
      (data) => {
        if (data.code === 200) {
          alert(data.message);
          this.ngOnInit();
        } else {
          alert(data.message);
        }
      },
      (error) => console.log(error)
    );
    this.disableButton = false;
  }

  compareByName(rol1: Rol, rol2: Rol): boolean {
    return rol1 && rol2 ? rol1.nameRol === rol2.nameRol : rol1 === rol2;
  }

  seleccionarUsuario(usuario: User): void {
    this.formUsuario.patchValue({
      id: usuario.userId,
      nombre: usuario.userName,
      rol: usuario.rol,
      estado: usuario.userState.toString(),
    });
  }

  updateUser(): void {
    if (this.formUsuario.invalid) {
      alert('Digite todos los campos');
      return;
    }
    const usuario: User = {
      userId: this.formUsuario.get('id').value,
      userName: this.formUsuario.get('nombre').value,
      rol: {
        rolId: this.formUsuario.get('rol').value.rolId,
        nameRol: this.formUsuario.get('rol').value.nameRol,
      } as Rol,
      userState: this.formUsuario.get('estado').value,
    };
    console.log(usuario);
    this.service.updateUser(usuario).subscribe(
      (data) => {
        if (data.code === 200) {
          alert(data.message);
          this.ngOnInit();
        } else {
          alert(data.message);
        }
      },
      (error) => console.log(error)
    );
  }

  deleteUser(): void {
    this.service.deleteUser(this.formUsuario.get('id').value).subscribe(
      (data) => {
        if (data.code === 200) {
          alert(data.message);
          this.ngOnInit();
        } else {
          alert(data.message);
        }
      },
      (error) => console.log(error)
    );
  }

  clearFields(): void {
    this.finder = '';
    this.formUsuario.reset();
    this.ngOnInit();
  }

  create(): void {
    this.clearFields();
    this.disableButton = true;
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {DoctorEntity} from "./usuario/doctor/doctor.entity";
import {EspecialidadEntity} from "./usuario/doctor/especialidad/especialidad.entity";
import {CitaEntity} from "./cita/cita.entity";
import {DiagnosticoEntity} from "./cita/diagnostico/diagnostico.entity";
import {ExamenEntity} from "./cita/examen/examen.entity";
import {SignosVitalesEntity} from "./cita/signos_vitales/signos-vitales.entity";
import {UsuarioModule} from "./usuario/usuario.module";
import {DoctorModule} from "./usuario/doctor/doctor.module";
import {EspecialidadModule} from "./usuario/doctor/especialidad/especialidad.module";
import {CitaModule} from "./cita/cita.module";
import {DiagnosticoModule} from "./cita/diagnostico/diagnostico.module";
import {ExamenModule} from "./cita/examen/examen.module";
import {SignosVitalesModule} from "./cita/signos_vitales/signos-vitales.module";
import {AdministradorModule} from "./usuario/Administrador/administrador.module";

@Module({
  imports: [
    UsuarioModule,
    DoctorModule,
    EspecialidadModule,
    CitaModule,
    DiagnosticoModule,
    ExamenModule,
    SignosVitalesModule,
    AdministradorModule,
    TypeOrmModule
        .forRoot({
          name: 'default', //nombre conexion
          type: 'mysql',  //mysql o postgres
          host: 'localhost', //ip
          port: 3306, //puerto
          username: 'root', //usuario
          password: '4321', //password
          database: 'citas_medicas', //base de datos
          entities: [
              UsuarioEntity,
              DoctorEntity,
              EspecialidadEntity,
              CitaEntity,
              DiagnosticoEntity,
              ExamenEntity,
              SignosVitalesEntity
          ], //TODAS LAS ENTIDADES
          synchronize: true, //Actualiza el esquema de la base de datos
          dropSchema: false, //Elimina Datos y el Esquema de la base de datos
        }),
  ],
  controllers: [AppController],
  providers: [
      AppService
  ],
})
export class AppModule {
}

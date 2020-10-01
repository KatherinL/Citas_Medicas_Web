import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {DoctorModule} from "./doctor/doctor.module";
import {CitaModule} from "../cita/cita.module";

@Module(
    {
        controllers: [
            UsuarioController
        ],
        imports: [
            DoctorModule,
            CitaModule,
            TypeOrmModule
                .forFeature(
                    [
                        UsuarioEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers: [
            UsuarioService
        ],
        exports: [
            UsuarioService  //para poder usarlo desde otros modulos
        ]
    }
)
export class UsuarioModule{

}
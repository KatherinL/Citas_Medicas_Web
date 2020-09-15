import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DoctorController} from "./doctor.controller";
import {EspecialidadController} from "./especialidad/especialidad.controller";
import {EspecialidadModule} from "./especialidad/especialidad.module";
import {DoctorService} from "./doctor.service";
import {DoctorEntity} from "./doctor.entity";

@Module(
    {
        controllers: [
            DoctorController
        ],
        imports: [
            EspecialidadModule,
            TypeOrmModule
                .forFeature(
                    [
                        DoctorEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers: [
            DoctorService
        ]
    }
)
export class DoctorModule{

}
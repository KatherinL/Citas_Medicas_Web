import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EspecialidadController} from "./especialidad.controller";
import {EspecialidadEntity} from "./especialidad.entity";
import {EspecialidadService} from "./especialidad.service";

@Module(
    {
        controllers: [
            EspecialidadController
        ],
        imports: [

            TypeOrmModule
                .forFeature(
                    [
                        EspecialidadEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers: [
            EspecialidadService
        ],
        exports: [
            EspecialidadService
        ]
    }
)
export class EspecialidadModule{

}
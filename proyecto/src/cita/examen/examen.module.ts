import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ExamenController} from "./examen.controller";
import {ExamenEntity} from "./examen.entity";
import {ExamenService} from "./examen.service";

@Module(
    {
        controllers: [
            ExamenController
        ],
        imports: [
            TypeOrmModule
                .forFeature(
                    [
                        ExamenEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers: [
            ExamenService
        ],
        exports:[
            ExamenService
        ]
    }
)
export class ExamenModule{

}
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SignosVitalesController} from "./signos-vitales.controller";
import {SignosVitalesEntity} from "./signos-vitales.entity";
import {SignosVitalesService} from "./signos-vitales.service";

@Module(
    {
        controllers: [
            SignosVitalesController
        ],
        imports: [
            TypeOrmModule
                .forFeature(
                    [
                        SignosVitalesEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers: [
            SignosVitalesService
        ],
        exports:[
            SignosVitalesService
        ]
    }
)
export class SignosVitalesModule{

}
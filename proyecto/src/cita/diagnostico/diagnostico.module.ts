import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DiagnosticoController} from "./diagnostico.controller";
import {DiagnosticoEntity} from "./diagnostico.entity";
import {DiagnosticoService} from "./diagnostico.service";

@Module(
    {
        controllers: [
            DiagnosticoController
        ],
        imports: [
            TypeOrmModule
                .forFeature(
                    [
                        DiagnosticoEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers: [
            DiagnosticoService
        ],
        exports:[
            DiagnosticoService
        ]
    }
)
export class DiagnosticoModule{

}
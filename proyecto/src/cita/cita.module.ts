import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CitaController} from "./cita.controller";
import {CitaEntity} from "./cita.entity";
import {CitaService} from "./cita.service";
import {DiagnosticoModule} from "./diagnostico/diagnostico.module";
import {ExamenModule} from "./examen/examen.module";
import {SignosVitalesModule} from "./signos_vitales/signos-vitales.module";

@Module(
    {
        controllers: [
            CitaController
        ],
        imports: [
            DiagnosticoModule,
            ExamenModule,
            SignosVitalesModule,
            TypeOrmModule
                .forFeature(
                    [
                        CitaEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers: [
            CitaService
        ]
    }
)
export class CitaModule{

}
import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";

@Module(
    {
        controllers: [
            UsuarioController
        ],
        imports: [
            /*MascotaModule,
            TypeOrmModule
                .forFeature(
                    [
                        UsuarioEntity
                    ],
                    'default' //Nombre cadena de conexion
                )*/
        ],
        providers: [
            UsuarioService
        ]
    }
)
export class UsuarioModule{

}
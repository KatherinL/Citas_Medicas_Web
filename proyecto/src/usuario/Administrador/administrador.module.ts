import {Module} from "@nestjs/common";
import {AdministradorController} from "./administrador.controller";
import {DoctorModule} from "../doctor/doctor.module";

@Module({
    controllers: [ AdministradorController],
    imports: [ DoctorModule],
    providers: []
})
export class AdministradorModule{

}




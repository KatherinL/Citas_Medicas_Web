import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DiagnosticoEntity} from "./diagnostico.entity";
import {FindManyOptions, Like, Repository} from "typeorm";

@Injectable()
export class DiagnosticoService{

    constructor(
        @InjectRepository(DiagnosticoEntity)
        private repositorio: Repository<DiagnosticoEntity>
    ) {
    }

    //metodos de la entidad

    crearUno(nuevoDiagnostico:DiagnosticoEntity){
        return this.repositorio.save(nuevoDiagnostico) //devuelve una promesa
    }

    buscarTodos(textoDeConsulta?: string) {

        const consulta: FindManyOptions<DiagnosticoEntity> ={
            where: [
                {
                    nombre: Like(`%${textoDeConsulta}%`)
                },
                {
                    apellido: Like(`%${textoDeConsulta}%`)
                },
                {
                    cedula: Like(`%${textoDeConsulta}%`)
                }
            ]
        }
        return this.repositorio.find(consulta) //promesa
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id) //promesa
    }

    editarUno(diagnosticoEditado: DiagnosticoEntity){
        return this.repositorio.save(diagnosticoEditado);
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }
}
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {ExamenEntity} from "./examen.entity";

@Injectable()
export class ExamenService{

    constructor(
        @InjectRepository(ExamenEntity)
        private repositorio: Repository<ExamenEntity>
    ) {
    }

    //metodos de la entidad

    crearUno(nuevoExamen:ExamenEntity){
        return this.repositorio.save(nuevoExamen) //devuelve una promesa
    }

    buscarTodos(textoDeConsulta?: string) {

        const consulta: FindManyOptions<ExamenEntity> ={
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

    editarUno(examenEditado: ExamenEntity){
        return this.repositorio.save(examenEditado);
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }
}
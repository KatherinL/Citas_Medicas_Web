import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {EspecialidadEntity} from "./especialidad.entity";

@Injectable()
export class EspecialidadService{

    constructor(
        @InjectRepository(EspecialidadEntity)
        private repositorio: Repository<EspecialidadEntity>
    ) {
    }

    //metodos de la entidad

    crearUno(nuevaEspecialidad:EspecialidadEntity){
        return this.repositorio.save(nuevaEspecialidad) //devuelve una promesa
    }

    buscarTodos(textoDeConsulta?: string) {

        const consulta: FindManyOptions<EspecialidadEntity> ={
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

    editarUno(especialidadEditada: EspecialidadEntity){
        return this.repositorio.save(especialidadEditada);
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }
}

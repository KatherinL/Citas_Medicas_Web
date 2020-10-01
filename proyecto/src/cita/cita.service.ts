import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CitaEntity} from "./cita.entity";
import {FindManyOptions, Like, Repository} from "typeorm";

@Injectable()
export class CitaService{

    constructor(
        @InjectRepository(CitaEntity)
        private repositorio: Repository<CitaEntity>
    ) {
    }

    //metodos de la entidad

    crearUno(nuevaCita:CitaEntity){
        return this.repositorio.save(nuevaCita) //devuelve una promesa
    }

    buscarTodos(textoDeConsulta?: string) {

        const consulta: FindManyOptions<CitaEntity> ={
            where: [
                {
                    usuario: Like(`%${textoDeConsulta}%`)
                },
                {
                    doctor: Like(`%${textoDeConsulta}%`)
                }
            ]
        }
        return this.repositorio.find(consulta) //promesa
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id, { relations: ["usuario", "doctor"] }) //promesa
    }

    editarUno(citaEditada: CitaEntity){
        return this.repositorio.save(citaEditada);
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }

    buscarUsuarios(){

        return this.repositorio.find({ relations: ["usuario", "doctor"] }) //promesa
    }
}
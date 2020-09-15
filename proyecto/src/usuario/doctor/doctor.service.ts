import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DoctorEntity} from "./doctor.entity";
import {FindManyOptions, Like, Repository} from "typeorm";

@Injectable()
export class DoctorService{

    constructor(
        @InjectRepository(DoctorEntity)
        private repositorio: Repository<DoctorEntity>
    ) {
    }

    crearUno(nuevoDoctor:DoctorEntity){
        return this.repositorio.save(nuevoDoctor) //devuelve una promesa
    }

    buscarTodos(textoDeConsulta?: string) {

        const consulta: FindManyOptions<DoctorEntity> ={
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

    editarUno(doctorEditado: DoctorEntity){
        return this.repositorio.save(doctorEditado);
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }
}
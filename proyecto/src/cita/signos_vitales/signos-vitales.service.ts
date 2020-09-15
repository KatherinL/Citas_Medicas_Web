import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {SignosVitalesEntity} from "./signos-vitales.entity";
import {FindManyOptions, Like, Repository} from "typeorm";

@Injectable()
export class SignosVitalesService{

    constructor(
        @InjectRepository(SignosVitalesEntity)
        private repositorio: Repository<SignosVitalesEntity>
    ) {
    }

    //metodos de la entidad

    crearUno(nuevoSignoVital:SignosVitalesEntity){
        return this.repositorio.save(nuevoSignoVital) //devuelve una promesa
    }

    buscarTodos(textoDeConsulta?: string) {

        const consulta: FindManyOptions<SignosVitalesEntity> ={
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

    editarUno(signoVitalEditado: SignosVitalesEntity){
        return this.repositorio.save(signoVitalEditado);
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }
}
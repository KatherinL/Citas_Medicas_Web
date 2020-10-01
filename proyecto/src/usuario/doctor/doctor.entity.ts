import {Column, Entity, JoinTable, ManyToMany, OneToMany} from "typeorm";
import {UsuarioEntity} from "../usuario.entity";
import {EspecialidadEntity} from "./especialidad/especialidad.entity";
import {CitaEntity} from "../../cita/cita.entity";

@Entity('db_doctor')
export class DoctorEntity extends UsuarioEntity{

    @Column({
        name: 'numero_consultorio',
        type: 'integer',
        unique: true,
        nullable: false
    })
    numeroConsultorio: number;

    @Column({
        name: 'especialidad',
        type: "varchar",
        nullable: false,
        length: '60'
    })
    especialidad: string;

    //Relaciones
    @ManyToMany(type => EspecialidadEntity)
    @JoinTable()
    especialidades: EspecialidadEntity[];

    @OneToMany(
        type => CitaEntity,
        citas => citas.doctor
    )
    citas: CitaEntity[];
}
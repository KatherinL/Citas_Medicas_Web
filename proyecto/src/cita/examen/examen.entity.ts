import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CitaEntity} from "../cita.entity";

@Entity('db_examen')
export class ExamenEntity{

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_examen'
    })
    idExamen: number;

    @Column({
        name: 'tipo',
        type: 'varchar',
        nullable: false,
        length: '60'
    })
    tipo:string;

    @Column({
        name: 'descripcion_examen',
        type: 'varchar',
        nullable: true,
        length: '100'
    })
    descripcionExamen?:string;

    //Relaciones
    @ManyToOne(
        type => CitaEntity,
        cita => cita.examenes
    )
    cita: CitaEntity;
}
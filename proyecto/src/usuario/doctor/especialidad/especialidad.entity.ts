import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('db_especialidad')
export class EspecialidadEntity{

    @PrimaryGeneratedColumn({
        name: 'id_especialidad',
        unsigned: true,
        comment: 'Identificador'
    })
    idEspecialidad: number;

    @Column({
        name: 'nombre_especialidad',
        type: 'varchar',
        nullable:false, // no puede ser nulo
        length: '60' //tamaño
    })
    nombreEspecialidad: string;

    @Column({
        name: 'descripcion',
        type: 'varchar',
        nullable:true, // puede ser nulo
        length: '150' //tamaño
    })
    descripcion?: string;

    //Relaciones


}
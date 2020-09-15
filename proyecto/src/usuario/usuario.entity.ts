import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CitaEntity} from "../cita/cita.entity";
import {createInflateRaw} from "zlib";
/*https://typeorm.io/#/many-to-many-relations*/

@Entity('db_usuario')
export class UsuarioEntity{

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number;

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable:false, // no puede ser nulo
        unique: true, // no puede repetirse
        length: '18' //tamaño
    })
    cedula:string;

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: false,
        length: '60'
    })
    nombre:string;

    @Column({
        name: 'fecha_nacimiento',
        nullable: false,
        type: 'date'
    })
    fechaNacimiento:string;

    @Column({
        name: 'genero',
        type: 'varchar',
        nullable: false,
        length: '5'
    })
    genero:string;

    @Column({
        name: 'correo',
        type: 'varchar',
        nullable: false,
        length: '60'
    })
    correo:string;

    @Column({
        name: 'telefono',
        type: 'varchar',
        nullable: false,
        length: '15'
    })
    telefono:string;

    @Column({
        name: 'direccion',
        type: 'varchar',
        nullable: false,
        length: '60'
    })
    direccion:string;

    @Column({
        name: 'usuario',
        type: 'varchar',
        nullable: false,
        length: '30'
    })
    user:string;

    @Column({
        name: 'password',
        type: 'varchar',
        nullable: false,
        length: '30'
    })
    password:string;

    //Relaciones

    @OneToMany(
        type => CitaEntity,
        cita => cita.usuario
    )
    citas: CitaEntity[];
}

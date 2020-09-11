import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('db_signos_vitales')
export class SignosVitalesEntity{

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_signos'
    })
    idSignosVitales: number;

    @Column({
        name: 'pulso',
        type: 'varchar',
        nullable: false,
        length: '50'
    })
    pulso:string;

    @Column({
        name: 'temperatura',
        type: 'varchar',
        nullable: false,
        length: '50'
    })
    temperatura:string;

    @Column({
        name: 'presion_arterial',
        type: 'varchar',
        nullable: false,
        length: '50'
    })
    presionArterial:string;
}
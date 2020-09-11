import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CitaEntity} from "../cita.entity";

@Entity()
export class DiagnosticoEntity{

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_diagnostico'
    })
    idDiagnostico: number;

    @Column({
        name: 'sintomas',
        type: 'varchar',
        nullable: false,
        length: '100'
    })
    sintomas:string;

    @Column({
        name: 'observaciones',
        type: 'varchar',
        nullable: false,
        length: '100'
    })
    observaciones:string;

    @Column({
        name: 'receta',
        type: 'varchar',
        nullable: true,
        length: '100'
    })
    receta?:string;

    //Relaciones

    @ManyToOne(
        type => CitaEntity,
        cita => cita.diagnosticos
    )
    cita: CitaEntity;

}
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {DiagnosticoEntity} from "./diagnostico/diagnostico.entity";
import {ExamenEntity} from "./examen/examen.entity";
import {SignosVitalesEntity} from "./signos_vitales/signos-vitales.entity";
import {DoctorEntity} from "../usuario/doctor/doctor.entity";

@Entity('db_cita')
export class CitaEntity{

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_cita'
    })
    idCita: number;

    @Column({
        name: 'especialidad',
        type: 'varchar',
        nullable:false, // no puede ser nulo
    })
    especialidad:string;

    @Column({
        name: 'hora',
        type: 'time', //HH:MM:SS
        nullable:false, // no puede ser nulo
    })
    hora:string;

    @Column({
        name: 'fecha_cita',
        nullable: false,
        type: 'date'
    })
    fechaCita:string;

    @Column({
        name: 'estado',
        type: 'varchar',
        nullable: false,
        length: '10'
    })
    estado:string;

    //Relaciones

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.citas
    )
    usuario: UsuarioEntity;

    @ManyToOne(
        type => DoctorEntity,
        doctor => doctor.citas
    )
    doctor: DoctorEntity;

    @OneToMany(
        type => DiagnosticoEntity,
        diagnostico=> diagnostico.cita
    )
    diagnosticos: DiagnosticoEntity[];

    @OneToMany(
        type => ExamenEntity,
        examen => examen.cita
    )
    examenes: ExamenEntity[];

    @OneToOne(type => SignosVitalesEntity)
    @JoinColumn()
    signosVitales?: SignosVitalesEntity;
}
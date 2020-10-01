import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post, Put, Res
} from "@nestjs/common";
import {validate, ValidationError} from "class-validator";
import {CitaService} from "./cita.service";
import {CitaCreateDto} from "./dto/cita.create-dto";
import {SignosVitalesService} from "./signos_vitales/signos-vitales.service";
import {DiagnosticoService} from "./diagnostico/diagnostico.service";
import {ExamenService} from "./examen/examen.service";
import {CitaEntity} from "./cita.entity";
import {UsuarioService} from "../usuario/usuario.service";
import {DoctorService} from "../usuario/doctor/doctor.service";

/* clase 22 crear diagnostico, examen y servicios desde cita*/

@Controller('cita')
export class CitaController{

    constructor(
        private readonly _citaService: CitaService,
        private readonly _signosService: SignosVitalesService,
        private readonly _diagnosticoService: DiagnosticoService,
        private readonly _examenService: ExamenService,

        //private readonly _usuarioService: UsuarioService,
        //private readonly _doctorService: DoctorService
    ) {
    }
    //Metodos restfull
    @Get()
    async mostrarTodos() {
        try {
            const respuesta = await this._citaService.buscarTodos('');
            return respuesta;
        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo,
        @Res() res
    ){
        const cita = {
            hora: parametrosCuerpo.hora,
            fechaCita: parametrosCuerpo.fechaCita,
            estado: parametrosCuerpo.estado,
            especialidad: parametrosCuerpo.especialidad,
            usuario: parametrosCuerpo.usuario,
            doctor: parametrosCuerpo.doctor
        } as CitaEntity

        let respuesta;
        try {
            const citaValida = new CitaCreateDto();
            citaValida.hora = cita.hora;
            citaValida.fechaCita = cita.fechaCita;
            citaValida.especialidad = cita.especialidad;

            const errores: ValidationError[] = await validate(citaValida);
            if (errores.length > 0){
                console.log('Errores',errores);
            }else {

                respuesta = await this._citaService.crearUno(parametrosCuerpo);
                console.log('Datos cita nueva: ',cita);
                return res.redirect('http://localhost:3001/paciente/vista/inicio');
            }
        }
        catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })
        }

    }

    //Ver uno
    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ){
        let respuesta;
        try {
            respuesta = await this._citaService.buscarUno(Number(parametrosRuta.id));

        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }
        if (respuesta)
            return respuesta;
        else
        {
            throw new NotFoundException({
                mensaje: 'No existen registros'
            })
        }
    }

    //Eliminar uno
    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        try {
            const respuesta = await this._citaService.eliminarUno(id);
            return {
                mensaje: 'Registro con id ' + id + ' eliminado'
            };

        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }
    }

    //vistas

    @Post('registrarCitaDesdeVista/:id')
    async registrarCita(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res
    ){
        const idCita = Number(parametrosRuta.id);
        const citaEditada = {
            idCita: idCita,
            estado: parametrosCuerpo.estado
        } as CitaEntity;
        console.log('signos',parametrosCuerpo)

        let signos;
        let examen;
        let diagnostico;

        let respuestaSignos;
        let respuestaExamen;
        let respuestaDiagnostico;
        let respuestaCita;

        try {
            signos.pulso = parametrosCuerpo.pulso;
            signos.temperatura = parametrosCuerpo.temperatura;
            signos.presionArterial = parametrosCuerpo.presion;
            respuestaSignos = await this._signosService.crearUno(signos);

            examen.tipo = parametrosCuerpo.examenes;
            examen.cita = idCita

            respuestaExamen = await this._examenService.crearUno(examen);

            diagnostico.sintomas = parametrosCuerpo.sintomas;
            diagnostico.observaciones = parametrosCuerpo.observaciones;
            diagnostico.receta = parametrosCuerpo.receta;
            diagnostico.cita = idCita

            respuestaDiagnostico = await this._diagnosticoService.crearUno(diagnostico);

            if (respuestaSignos){
                citaEditada.signosVitales = respuestaSignos.id;
                respuestaCita = await this._citaService.editarUno(citaEditada);
            }

            if (respuestaSignos && respuestaDiagnostico && respuestaExamen && respuestaCita){
                return res.redirect('/doctor/vista/inicio?mensaje=Usuario editado')
            }

        }catch (e) {
            console.log(e);
            return res.redirect('/doctor/vista/inicio?mensaje=Error editando usuario')
        }
    }

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Param() parametrosRuta,
        @Res() res
    ){

        const cita = {
            hora: parametrosCuerpo.hora,
            fechaCita: parametrosCuerpo.fechaCita,
            especialidad: parametrosCuerpo.especialidad,
            usuario: parametrosCuerpo.usuario,
            doctor: parametrosCuerpo.doctor
        } as CitaEntity

        let respuesta;
        let resUsuario;
        let resDoctor;
        try {
            const citaValida = new CitaCreateDto();
            citaValida.hora = cita.hora;
            citaValida.fechaCita = cita.fechaCita;
            citaValida.especialidad = cita.especialidad;
            const errores: ValidationError[] = await validate(citaValida);
            if (errores.length > 0){
                console.log('Errores',errores);
            }else {
                // resUsuario = await this._usuarioService.buscarUno(idUsuario);
                // resDoctor = await this._doctorService.buscarUno(idDoctor);

                // if (resUsuario && resDoctor){
                    // let usuario;
                    // resUsuario.forEach( (obj)=> {
                    //     usuario = obj
                    // })
                    // let usuario;
                    // resUsuario.forEach( (obj)=> {
                    //     usuario = obj
                    // })
                    // cita.usuario = resUsuario;
                    // cita.doctor = resDoctor;

                    cita.estado = 'Pendiente';
                    respuesta = await this._citaService.crearUno(parametrosCuerpo);
                    // console.log('Datos cita nueva: ',cita);
                    return res.redirect('/paciente/vista/inicio');
                // }


            }
        }
        catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })
        }
    }
}
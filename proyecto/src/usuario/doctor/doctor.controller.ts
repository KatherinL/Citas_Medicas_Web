import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post, Put, Query,
    Res, Session
} from "@nestjs/common";
import {DoctorService} from "./doctor.service";
import {validate, ValidationError} from "class-validator";
import {DoctorCreateDto} from "../dto/doctor.create-dto";
import {DoctorUpdateDto} from "../dto/doctor.update-dto";
import {EspecialidadService} from "./especialidad/especialidad.service";
import {DoctorEntity} from "./doctor.entity";
import {CitaService} from "../../cita/cita.service";
import {CitaEntity} from "../../cita/cita.entity";

/* clase 22 crear especialidad*/

@Controller('doctor')
export class DoctorController{

    constructor(
        private readonly _doctorService: DoctorService,
        private readonly _especialidadesService: EspecialidadService,
        private readonly _citasService: CitaService
    ) {
    }

    //Metodos RestFull
    @Get()
    async mostrarTodos() {
        try {
            return await this._doctorService.buscarTodos();
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
        let respuesta;
        try {
            const doctorValido = new DoctorCreateDto();
            doctorValido.cedula = parametrosCuerpo.cedula;
            doctorValido.nombre = parametrosCuerpo.nombre;
            doctorValido.fechaNacimiento = parametrosCuerpo.fechaNacimiento;
            doctorValido.genero = parametrosCuerpo.genero;
            doctorValido.correo = parametrosCuerpo.correo;
            doctorValido.telefono = parametrosCuerpo.telefono;
            doctorValido.direccion = parametrosCuerpo.direccion;
            doctorValido.consultorio = Number(parametrosCuerpo.numeroConsultorio);
            doctorValido.user = parametrosCuerpo.user;
            doctorValido.password = parametrosCuerpo.password;
            doctorValido.especialidad = parametrosCuerpo.especialidad;

            const errores: ValidationError[] = await validate(doctorValido);
            if (errores.length > 0){
                console.log('Errores',errores);
            }else {
                respuesta = await this._doctorService.crearUno(parametrosCuerpo);
                console.log('Datos doctor nuevo: ',doctorValido);
                return res.redirect('admin/vista/inicio');
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
            respuesta = await this._doctorService.buscarUno(Number(parametrosRuta.id));

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

    //Editar Uno
    @Put(':id')
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const id = Number(parametrosRuta.id);
        const doctorEditado = parametrosCuerpo;
        doctorEditado.id = id;

        let errores: ValidationError[];
        let respuesta;
        try {
            //Validacion del update DTO
            const doctorUpdate = new DoctorUpdateDto()
            doctorUpdate.nombre = doctorEditado.nombre;
            doctorUpdate.genero = doctorEditado.genero;
            doctorUpdate.correo = doctorEditado.correo;
            doctorUpdate.telefono = doctorEditado.telefono;
            doctorUpdate.direccion = doctorEditado.direccion;
            doctorUpdate.consultorio = doctorEditado.numeroConsultorio;
            doctorUpdate.user = doctorEditado.user;
            doctorUpdate.password = doctorEditado.password;

            errores = await validate(doctorUpdate);
            if (errores.length > 0){
                console.log('Errores',errores);
            }else {
                respuesta = await this._doctorService.editarUno(doctorEditado);
                console.log('Datos doctor actuallizar: ',  doctorUpdate);
                return respuesta;
            }

        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }
        if (!respuesta || errores.length > 0){
            throw new NotFoundException({
                mensaje: 'Error validando'
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
            const respuesta = await this._doctorService.eliminarUno(id);
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

    @Get('especialidades')
    async obtenerEspecialidades(){
        try {
            return await this._especialidadesService.buscarTodos();
        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }
    }

    //Vistas
    @Get('vista/inicio')
    inicio(
        @Session() session,
        @Res() res
    ){
        const estaLogueado = session.email;
        if (estaLogueado) {
            return res.render('doctor/home')
        }else {
            return res.redirect('/login')
        }
    }

    @Get('vista/citas')
    async citas(
        @Res() res,
        @Session() session
    ){
        const doctorLogueado = session.email;

        let resultadoEncontrado;
        let resultadoCitas;
        let resultadoUser;
        try {
            resultadoEncontrado = await this._doctorService.buscarTodos(doctorLogueado);
            resultadoUser = await this._citasService.buscarUsuarios();

        }catch (e) {
            throw new InternalServerErrorException('Error encontrando citas')
        }
        if(resultadoUser && resultadoEncontrado){
            console.log('usuaio', resultadoUser)
            let objeto;
            resultadoEncontrado.forEach( (obj)=> {
                objeto = obj
            })
            // console.log('doctorLogueado', doctorLogueado)
            // console.log('doctor', objeto.id)
            resultadoUser.forEach((obj)=> {
                if (objeto.id === obj.doctor.id ){
                    resultadoCitas = obj
                }
            })
            // console.log('cita', resultadoCitas)

            return res.render(
                'doctor/citas',
                {
                    usuario: session.email,
                    arregloCitas: resultadoUser
                })
        }else {
            throw new NotFoundException('No se encontraron citas')
        }

    }

    @Get('vista/registro/:id')
    async registro(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res
    ){
        const id = Number(parametrosRuta.id);
        let citaEncontrada;
        try {
            citaEncontrada = await this._citasService.buscarUno(id);
        } catch (error) {
            console.error('Error del servidor');
            return res.redirect('/doctor/vista/citas?mensaje=Error buscando cita');
        }
        if (citaEncontrada) {
            return res.render(
                'doctor/registrar-cita',
                {
                    error: parametrosConsulta.error,
                    cita: citaEncontrada
                }
            )
        } else {
            return res.redirect('/doctor/vista/citas?mensaje=Cita no encontrado');
        }
    }

    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res
    ){
        console.log('editar: ', parametrosCuerpo)
        const usuarioEditado = {
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            genero: parametrosCuerpo.genero,
            correo: parametrosCuerpo.correo,
            telefono: parametrosCuerpo.telefono,
            direccion: parametrosCuerpo.direccion,
            user: parametrosCuerpo.user,
            password: parametrosCuerpo.password,
            numeroConsultorio: parametrosCuerpo.consultorio,
            especialidad:parametrosCuerpo.especialidad
        } as DoctorEntity;

        try {
            await this._doctorService.editarUno(usuarioEditado);
            return res.redirect('/admin/vista/inicio?mensaje=Usuario editado')
        }catch (e) {
            console.log(e);
            return res.redirect('/admin/vista/inicio?mensaje=Error editando usuario')
        }
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ){
        try {
            const id = Number(parametrosRuta.id);
            await this._doctorService.eliminarUno(id);
            return res.redirect('/admin/vista/inicio?mensaje=Usuario eliminado')
        }catch (e) {
            return res.redirect('/admin/vista/inicio?mensaje=Error eliminando usuario')
        }
    }

}
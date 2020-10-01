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
import {UsuarioService} from "./usuario.service";
import {PacienteCreateDto} from "./dto/paciente.create-dto";
import {validate, ValidationError} from "class-validator";
import {PacienteUpdateDto} from "./dto/paciente.update-dto";
import {DoctorService} from "./doctor/doctor.service";
import {CitaService} from "../cita/cita.service";
import {DoctorEntity} from "./doctor/doctor.entity";
import {UsuarioEntity} from "./usuario.entity";

@Controller('paciente')
export class UsuarioController{

    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _doctorService: DoctorService,
        private readonly _citaService: CitaService
    ) {
    }

    //Metodos restfull
    @Get()
    async mostrarTodos() {
        try {
            const respuesta = await this._usuarioService.buscarTodos('');
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
        let respuesta;
        try {
            const pacienteValido = new PacienteCreateDto();
            pacienteValido.cedula = parametrosCuerpo.cedula;
            pacienteValido.nombre = parametrosCuerpo.nombre;
            pacienteValido.fechaNacimiento = parametrosCuerpo.fechaNacimiento;
            pacienteValido.genero = parametrosCuerpo.genero;
            pacienteValido.correo = parametrosCuerpo.correo;
            pacienteValido.telefono = parametrosCuerpo.telefono;
            pacienteValido.direccion = parametrosCuerpo.direccion;
            pacienteValido.user = parametrosCuerpo.user;
            pacienteValido.password = parametrosCuerpo.password;

            const errores: ValidationError[] = await validate(pacienteValido);
            if (errores.length > 0){
                console.log('Errores',errores);
            }else {
                respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
                console.log('Datos paciente nuevo: ',pacienteValido);
                return res.redirect('paciente/vista/inicio');
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
            respuesta = await this._usuarioService.buscarUno(Number(parametrosRuta.id));

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
        const pacienteEditado = parametrosCuerpo;
        pacienteEditado.id = id;

        let errores: ValidationError[];
        let respuesta;
        try {
            //Validacion del update DTO
            const pacienteUpdate = new PacienteUpdateDto()
            pacienteUpdate.nombre = pacienteEditado.nombre;
            pacienteUpdate.genero = pacienteEditado.genero;
            pacienteUpdate.correo = pacienteEditado.correo;
            pacienteUpdate.telefono = pacienteEditado.telefono;
            pacienteUpdate.direccion = pacienteEditado.direccion;
            pacienteUpdate.user = pacienteEditado.user;
            pacienteUpdate.password = pacienteEditado.password;

            errores = await validate(pacienteUpdate);
            if (errores.length > 0){
                console.log('Errores',errores);
            }else {
                respuesta = await this._usuarioService.editarUno(pacienteEditado);
                console.log('Datos paciente actuallizar: ',  pacienteUpdate);
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
            const respuesta = await this._usuarioService.eliminarUno(id);
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

    //Vistas

    @Get('vista/inicio')
    async inicio(
        @Res() res,
        @Session() session,
        @Query() parametrosConsulta
    ){
        const estaLogueado = session.email;
        if (estaLogueado) {
            return res.render('paciente/home')
        }else {
            return res.redirect('/login?mensaje=Paciente no logueado')
        }
    }

    @Get('vista/agendarCita')
    async agendarCita(
        @Session() session,
        @Res() res
    ){
        const estaLogueado = session.email
        let resultadoEncontrado;
        let resultadoDoctores;
        try {
            resultadoEncontrado = await this._usuarioService.buscarTodos(estaLogueado);
            resultadoDoctores = await this._doctorService.buscarTodos('')
        }catch (e) {
            throw new InternalServerErrorException('Error encontrando usuarios')
        }
        if(resultadoEncontrado && resultadoDoctores){
            let objeto;
            resultadoEncontrado.forEach( (obj)=> {
                objeto = obj
            })
            // console.log('usuario', objeto)
            // console.log('doctores', resultadoDoctores)
            res.render(
                'paciente/agendarCita',
                {
                    usuario: session.email,
                    arregloPacientes: objeto,
                    arregloDoctores: resultadoDoctores
                })
        }else {
            throw new NotFoundException('No se encontraron usuarios')
        }
    }
    //
    // @Get('vista/nav')
    // menuHome(
    //     @Res() res
    // ){
    //     res.render('paciente/nav-paciente')
    // }

    @Get('vista/historial')
    async historial(
        @Session() session,
        @Res() res
    ){
        const usuarioLogueado = session.email;

        let resultadoEncontrado;
        let resultado;
        try {
            resultadoEncontrado = await this._usuarioService.buscarTodos(usuarioLogueado);
            resultado = await this._citaService.buscarUsuarios();

        }catch (e) {
            throw new InternalServerErrorException('Error encontrando citas')
        }
        if(resultado && resultadoEncontrado){
            // console.log('usuaro', resultado)
            let objeto;
            resultadoEncontrado.forEach( (obj)=> {
                objeto = obj
            })
            // console.log('paciente Logueado', usuarioLogueado)
            // console.log('paciente', objeto.id)

            return res.render(
                'paciente/historial',
                {
                    username: session.email,
                    arregloCitas: resultado
                })
        }else {
            throw new NotFoundException('No se encontraron citas')
        }
    }

    @Get('vista/especialistas')
    async especialistas(
        @Res() res
    ){
        let resultadoDoctores;
        try {
            resultadoDoctores = await this._doctorService.buscarTodos('')
            console.log(resultadoDoctores)
        }catch (e) {
            throw new InternalServerErrorException('Error encontrando doctores')
        }
        if(resultadoDoctores){
            return res.render(
                'paciente/especialistas',
                {
                    arregloDoctores: resultadoDoctores
                })
        }else {
            throw new NotFoundException('No se encontraron doctores')
        }
    }

    @Get('vista/servicios')
    servicios(
        @Res() res
    ){
        res.render('paciente/servicios')
    }

    @Get('vista/perfil')
    async perfil(
        @Session() session,
        @Res() res,
        @Query() parametrosConsulta
    ){
        const estaLogueado = session.email
        let resultadoEncontrado;
        try {
            resultadoEncontrado = await this._usuarioService.buscarTodos(estaLogueado);

        }catch (e) {
            throw new InternalServerErrorException('Error encontrando usuarios')
        }
        if(resultadoEncontrado){
            // console.log(resultadoEncontrado)
            let objeto;
            resultadoEncontrado.forEach((obj)=> {
                    objeto = obj
            })
            return res.render(
                'paciente/perfil',
                {
                    usuario: session.email,
                    paciente: objeto
                })
        }else {
            throw new NotFoundException('No se encontraron usuarios')
        }
    }

    @Post('editarPacienteDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res
    ){
        console.log('Editar: ', parametrosCuerpo)
        const pacienteEditado = {
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            correo: parametrosCuerpo.correo,
            telefono: parametrosCuerpo.telefono,
            direccion: parametrosCuerpo.direccion,
            genero: parametrosCuerpo.genero,
            user: parametrosCuerpo.user,
            password: parametrosCuerpo.password
        } as UsuarioEntity;

        try {
            await this._usuarioService.editarUno(pacienteEditado);
            return res.redirect('/paciente/vista/inicio?mensaje=Usuario editado')
        }catch (e) {
            console.log(e);
            return res.redirect('/paciente/vista/inicio?mensaje=Error editando usuario')
        }
    }
}
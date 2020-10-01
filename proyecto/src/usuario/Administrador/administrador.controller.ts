import {
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Query,
    Res,
    Session
} from "@nestjs/common";
import {DoctorService} from "../doctor/doctor.service";

@Controller('admin')
export class AdministradorController {

    constructor(
        private readonly _doctorService: DoctorService
    ) {
    }

    //Vistas
    @Get('vista/inicio')
    async inicio(
        @Res() res,
        @Session() session,
        @Query() parametrosConsulta
    ) {
        const estaLogueado = session.email;
        if (estaLogueado) {
            let resultadoEncontrado;
            try {
                resultadoEncontrado = await this._doctorService.buscarTodos('');

            } catch (e) {
                throw new InternalServerErrorException('Error encontrando doctores')
            }
            if (resultadoEncontrado) {
                res.render(
                    'administrador/home',
                    {
                        usuario: session.email,
                        arregloDoctores: resultadoEncontrado,
                        parametrosConsulta: parametrosConsulta
                    })
            } else {
                throw new NotFoundException('No se encontraron doctores')
            }
        } else {
            return res.redirect('/login')
        }

    }

    @Get('vista/nav')
    menu(
        @Res() res
    ) {
        res.render('administrador/home')

    }

    @Get('vista/editar/:id')
    async editarDoctor(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res
    ) {
        const id = Number(parametrosRuta.id)
        let usuarioEncontrado;
        try {
            usuarioEncontrado = await this._doctorService.buscarUno(id);
        } catch (error) {
            console.error('Error del servidor');
            return res.redirect('/admin/vista/inicio?mensaje=Error buscando usuario');
        }
        if (usuarioEncontrado) {
            return res.render(
                'administrador/editar-doctor',
                {
                    error: parametrosConsulta.error,
                    doctor: usuarioEncontrado
                }
            )
        } else {
            return res.redirect('/admin/vista/inicio?mensaje=Usuario no encontrado');
        }

    }

    @Get('vista/registrar')
    async registrarDoctor(
        @Res() res
    ) {
        res.render('administrador/crear-doctor')

    }
}
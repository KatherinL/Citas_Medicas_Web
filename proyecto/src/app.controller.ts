import {Body, Controller, Get, InternalServerErrorException, Post, Req, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {DoctorService} from "./usuario/doctor/doctor.service";
import {UsuarioService} from "./usuario/usuario.service";

@Controller()
export class AppController {
  constructor( private readonly appService: AppService,
               private readonly _doctorService: DoctorService,
               private readonly _pacienteService: UsuarioService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  login(
      @Res() res
  ){
    return res.render('auth/login')
  }

  @Get('register')
  register(
      @Res() res
  ){
    return res.render('auth/registrar')
  }

  @Post('login')
  loginPost(
      @Body() parametrosConsulta,
      @Res() response,
      @Session() session
  ) {

    const email = parametrosConsulta.email;
    const password = parametrosConsulta.password;
    const rol = parametrosConsulta.rol;

    if (email == undefined || password == undefined) {

      return response.redirect('login');

    } else {

      switch (rol) {
        case 'administrador':
          if (email == 'admin@email.com' && password == 'Admin1234') {
            session.email = email;
            session.roles = rol;
            return response.redirect('/admin/vista/inicio');
          } else {
            //alert('El correo o contraseña es incorrecto')
            return response.redirect('login?mensaje=El correo o contraseña es incorrecto');
          }
          break;

        case 'doctor':
          const doctor = this.comprobarLogin(email, password, rol);
          if (doctor){
            console.log('doctor ', doctor)
            session.email = email;
            session.roles = rol;
            return response.redirect('/doctor/vista/inicio');
          }else {
            return response.redirect('login?mensaje=El correo o contraseña es incorrecto');
            //alert('El correo o contraseña es incorrecto')
          }
          break;

        case 'paciente':
          const paciente = this.comprobarLogin(email, password, rol);
          if (paciente){
            console.log('Paciente', paciente)
            session.email = email;
            session.roles = rol;
            return response.redirect('/paciente/vista/inicio');
          } else {
            return response.redirect('login?mensaje=El correo o contraseña es incorrecto');
            // alert('El correo o contraseña es incorrecto')
          }
          break;
      }
    }
  }

  @Get('logout')
  logout(
      @Res() response,
      @Req() request,
      @Session() session
  ) {
    session.email = undefined;
    session.roles = undefined;
    request.session.destroy();
    return response.redirect('login');
  }

  async comprobarLogin(email: string, password:string ,rol: string){
    try {
      let respuesta;
      if (rol == 'doctor'){
        respuesta = await this._pacienteService.buscarLogin(email, password);
      }else if (rol == 'paciente'){
        respuesta = await this._doctorService.buscarLogin(email,password);
      }
      return respuesta;
    }catch (e) {
      console.error(e);
      throw new InternalServerErrorException({
        mensaje: 'Error del servidor',
      })
    }
  }

}

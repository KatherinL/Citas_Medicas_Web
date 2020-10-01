import {IsDateString, IsEmail, IsInt, IsNotEmpty, IsString, Length, MaxLength} from "class-validator";

export class DoctorCreateDto{

    @IsNotEmpty()
    @Length(10,18)
    cedula:string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    nombre: string;

    @IsNotEmpty()
    fechaNacimiento:string;

    @IsNotEmpty()
    @MaxLength(7)
    genero: string;

    @IsNotEmpty()
    @IsEmail()
    correo: string;

    @IsNotEmpty()
    @MaxLength(15)
    telefono: string;

    @IsNotEmpty()
    @MaxLength(60)
    direccion:string;

    @IsNotEmpty()
    @MaxLength(30)
    user: string;

    @IsNotEmpty()
    @MaxLength(30)
    password: string;

    @IsNotEmpty()
    @IsInt()
    consultorio: number;

    @IsNotEmpty()
    @MaxLength(60)
    especialidad: number;
}
import {IsEmail, IsInt, IsNotEmpty, IsString, MaxLength} from "class-validator";

export class DoctorUpdateDto{

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    nombre: string;

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
    @IsInt()
    consultorio: number;

    @IsNotEmpty()
    @MaxLength(30)
    user: string;

    @IsNotEmpty()
    @MaxLength(30)
    password: string;

}
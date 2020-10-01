import {IsAlpha, IsMilitaryTime, IsNotEmpty} from "class-validator";

export class CitaCreateDto{

    @IsNotEmpty()
    especialidad: string;

    @IsMilitaryTime()
    @IsNotEmpty()
    hora: string;  //HH:MM:SS

    @IsNotEmpty()
    fechaCita: string;

    // @IsNotEmpty()
    // @IsAlpha()
    // estado: string; //pendiente | realizada | cancelada
}
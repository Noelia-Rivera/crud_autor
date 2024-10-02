export class Autor {
    id: number;
    nombres: string;
    apellidos: string;
    pais: string;
    foto: string;
    estado: string;

    constructor(id: number = 0, nombres: string ='', apellidos: string = '', pais: string = '', foto: string = '', estado: string = '1'){
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.pais = pais;
        this.foto = foto;
        this.estado = estado;
    }
}

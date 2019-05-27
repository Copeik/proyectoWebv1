import { Cliente } from './Cliente';
export class Pedidos {

    codpedido: number
    cliente = new Cliente()
    fecha: string
    entregado: boolean
    descripcion: string
    total: number
    estado: {
        id: number
    }

}
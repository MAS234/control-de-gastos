import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import Cerrar from "../img/cerrar.png"


function Modal({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, SetGastoEditar}) {

    const [mensaje, SetMensaje] = useState("")
    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [categoria, setCategoria] = useState("")
    const [fecha, setFecha] = useState("")
    const [id, setId] = useState("")

    useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
        setNombre(gastoEditar.nombre)
        setCantidad(gastoEditar.cantidad)
        setCategoria(gastoEditar.categoria)
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
        }
    }, [])

    const ocultarModal = () => {
        setAnimarModal(false)
        SetGastoEditar({})
        
        setTimeout(() => {    
        setModal(false)
        },500)

    }

    const handletSumit = e => {
        e.preventDefault();

        if([nombre, categoria, cantidad].includes("")){
            SetMensaje("Todos los campos son obligatorios")

            setTimeout(() =>{
                SetMensaje("")
            },3000)

            return;
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha})

    }

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img src={Cerrar} alt="CerrarModal" onClick={ocultarModal}/>
        </div>

        <form 
        onSubmit={handletSumit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        >
            <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
            {mensaje && <Mensaje tipo="error" >{mensaje}</Mensaje>}

            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>

                <input 
                type="text" 
                placeholder='Añade el nombre del gasto'
                id='nombre'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>

                <input 
                type="number" 
                placeholder='Añade la cantidad del gasto: ej. 300'
                id='cantidad'
                value={cantidad}
                onChange={e => setCantidad(Number(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor="categoria">Categoria</label>

                <select 
                id="categoria"
                value={categoria}
                onChange={e => setCategoria(e.target.value)}
                >
                    <option value="">--Seleccione--</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">suscripciones</option>
                    <option value="ocio">Ocio</option>
                    <option value="casa">Casa</option>
                </select>
            </div>

            <input 
            type="submit"
            value={gastoEditar.nombre ? "Guardar Cambios" : "Agregar Gasto"}
            />

        </form>

    </div>
  )
}

export default Modal

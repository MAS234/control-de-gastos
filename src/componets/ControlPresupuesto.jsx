import {useState,useEffect} from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

function ControlPresupuesto({presupuesto,setPresupuesto, gastos,setGastos, setIsvalidPresupuesto }) {
  
  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  console.log(gastos)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0 );

    const totalDisponible = presupuesto - totalGastado;

    //PORCENTAJE DE GRAFICA 
    const nuevoPorcentaje =((presupuesto - totalDisponible) / presupuesto * 100).toFixed(2);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)

    }, 2000)

    setGastado(totalGastado)
    setDisponible(totalDisponible)
    }, [gastos])



  const formatear = (cantidad) => {
    return cantidad.toLocaleString("en-US",{
      style: "currency",
      currency: "USD"
    })
  }

  const handleResetApp = () => {
    const resultado = confirm("¿Desea reiniciar presupuesto y gastos?")

    if(resultado){
      setGastos([])
      setPresupuesto(0)
      setIsvalidPresupuesto(false)
    }

  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      
      <div>
        <CircularProgressbar
          value={porcentaje}
          text={`${porcentaje}% GASTADO`}
          styles={buildStyles({
            pathColor:porcentaje > 100 ? "red" : "#29bf12",
            trailColor:"#e0e1dd82",
            pathTransitionDuration: 1,
            textColor:porcentaje > 100 ? "red" : "#29bf12"
          })}
        />
      </div>

      <div className='contenido-presupuesto'>
        <button
        className='reset-app'
        type='button'
        onClick={handleResetApp}
        >
          Resetear Aplicacion
        </button>
        <p>
          <span>Presupuesto: </span>{formatear(presupuesto)}
        </p>

        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span>{formatear(disponible)}
        </p>

        <p>
          <span>Gastado: </span>{formatear(gastado)}
        </p>
      </div>

    </div>
  )
}

export default ControlPresupuesto

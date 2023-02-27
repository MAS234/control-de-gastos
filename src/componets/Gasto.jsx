import React from "react";

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import IconoAhorro from "../img/ahorro.png";
import IconoComida from "../img/icono-comida.png";
import IconoCasa from "../img/casa.png";
import IconoGastos from "../img/gastos.png";
import IconoOcio from "../img/ocio.png";
import IconoSuscripcion from "../img/suscripciones.png";
import IconoSalud from "../img/icono-salud.png";

const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return fechaNueva.toLocaleDateString("es-ES", opciones);
};

const diccionarioIconos = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  gastos: IconoGastos,
  salud: IconoSalud,
  suscripciones: IconoSuscripcion,
  ocio: IconoOcio,
  casa: IconoCasa,
};

function Gasto({ gasto, SetGastoEditar, eliminarGastos }) {
  const { categoria, nombre, cantidad, id, fecha } = gasto;

  const leadingActions = () =>(

    <LeadingActions>
      <SwipeAction onClick={() => SetGastoEditar(gasto)}>
        Editar
      </SwipeAction>
    </LeadingActions>

  )

  const trailingActions = () =>(
    <TrailingActions>
      <SwipeAction onClick={() => eliminarGastos(id)} destructive={true} >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
      leadingActions={leadingActions()}
      trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={diccionarioIconos[categoria]} alt="" />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>

              <p className="nombre-gasto">{nombre}</p>

              <p className="fecha-gasto">
                Agregado el: <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>

          <div className="cantidad-gasto">${cantidad}</div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}

export default Gasto;

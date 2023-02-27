import React from "react";
import Gasto from "./Gasto";

function ListadoGastos({
  gastos,
  SetGastoEditar,
  eliminarGastos,
  filtro,
  gastosFiltrados,
}) {
  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>{gastosFiltrados.length ? "Gastos" : "No hay gastos aun"}</h2>
          {gastosFiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              SetGastoEditar={SetGastoEditar}
              eliminarGastos={eliminarGastos}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{gastos.length ? "Gastos" : "No hay gastos aun"}</h2>
          {gastos.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              SetGastoEditar={SetGastoEditar}
              eliminarGastos={eliminarGastos}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default ListadoGastos;

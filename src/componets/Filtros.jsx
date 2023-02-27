import { useState, useEffect } from "react";

function Filtros({filtro, setFiltro}) {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label>Filtrar Gastos</label>
          <select 
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          >
            <option value="">--Todas las Categorias--</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="gastos">Gastos Varios</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">suscripciones</option>
            <option value="ocio">Ocio</option>
            <option value="casa">Casa</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default Filtros;

import React from "react";
import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./ControlPresupuesto";

function Header({
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsvalidPresupuesto,
  gastos,
  setGastos
}) {
  return (
    <div>
      <header>
        <h1>Planificador de gastos</h1>

        {isValidPresupuesto ? (
            <ControlPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            gastos={gastos}
            setGastos={setGastos}
            setIsvalidPresupuesto={setIsvalidPresupuesto}
            />
        ): (
            <NuevoPresupuesto

                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsvalidPresupuesto={setIsvalidPresupuesto}
                
            />
        )}

      </header>
    </div>
  );
}

export default Header;

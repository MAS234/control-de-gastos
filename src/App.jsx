import Header from "./componets/Header";
import Filtros from "./componets/Filtros";
import ListadoGastos from "./componets/ListadoGastos";
import { useState, useEffect } from "react";
import IconoNuevoGasto from "./img/nuevo-gasto.png";
import Modal from "./componets/Modal";
import { object } from "prop-types";

function App() {

  // STATES 
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsvalidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );

  const [gastoEditar, SetGastoEditar] = useState({});
  const [filtro, setFiltro] = useState("")
  const [gastosFiltrados, setgastosFiltrados] = useState([])


  // USEEFFECTS
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;

    if (presupuestoLS > 0) {
      setIsvalidPresupuesto(true);
    }
  }, []);

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);

      setgastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  // FUNCIONES 
  const handletNuevoGasto = () => {
    setModal(true);
    SetGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      const gastoActualizado = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastoActualizado);
      SetGastoEditar({});
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGastos = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsvalidPresupuesto={setIsvalidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
            filtro={filtro}
            setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              SetGastoEditar={SetGastoEditar}
              eliminarGastos={eliminarGastos}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono"
              onClick={handletNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          SetGastoEditar={SetGastoEditar}
        />
      )}
    </div>
  );
}

export default App;

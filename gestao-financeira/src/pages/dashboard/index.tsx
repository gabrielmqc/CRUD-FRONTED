import React  from "react";
import Receitas from "../../components/dashboard/Receitas";
import Despezas from "../../components/dashboard/Despezas";
import SaldoEmTempoReal from "../../components/dashboard/Saldo";

const Dashboard: React.FC = () => {
  // ... other code ...

  return (
    <div>
      {/* ... other components ... */}
      <SaldoEmTempoReal/>
      <Receitas />
      <Despezas/>
    </div>
  );
}

export default Dashboard;
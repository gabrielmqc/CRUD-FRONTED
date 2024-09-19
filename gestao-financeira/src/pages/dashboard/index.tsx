import React  from "react";
import Receitas from "../../components/dashboard/Receitas";
import Despezas from "../../components/dashboard/Despezas";

const Dashboard: React.FC = () => {
  // ... other code ...

  return (
    <div>
      {/* ... other components ... */}
      <Receitas />
      <Despezas/>
    </div>
  );
}

export default Dashboard;
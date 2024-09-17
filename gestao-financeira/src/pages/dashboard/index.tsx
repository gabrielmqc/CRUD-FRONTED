import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useApp } from '../../context/appContext';
import Receitas from '../components/Receitas';
import Despesas from '../components/Despesas';
import '../styles/dashboard.css';
import { Transacao } from '../types';

const Dashboard: React.FC = () => {
  const { receitas, despesas } = useApp();
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const [transactionHistory, setTransactionHistory] = useState<Transacao[]>([]);

  const totalReceitas = receitas.reduce((total, receita) => total + receita.valor, 0);
  const totalDespesas = despesas.reduce((total, despesa) => total + despesa.valor, 0);

  const data = [
    { name: 'Receitas', value: totalReceitas },
    { name: 'Despesas', value: totalDespesas },
  ];

  const COLORS = ['#4CAF50', '#F44336'];

  useEffect(() => {
    const allTransactions = [
      ...receitas.map(r => ({ ...r, tipo: 'receita' as const })),
      ...despesas.map(d => ({ ...d, tipo: 'despesa' as const }))
    ];

    setTransactionHistory(prevHistory => {
      const newTransactions = allTransactions.filter(
        transaction => !prevHistory.some(historyItem => historyItem.id === transaction.id)
      );
      return [...newTransactions, ...prevHistory].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    });
  }, [receitas, despesas]);

  const monthlyData = useMemo(() => {
    const data: { [key: string]: { month: string; receitas: number; despesas: number } } = {};
    
    [...receitas, ...despesas].forEach(transaction => {
      const date = new Date(transaction.data);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!data[monthYear]) {
        data[monthYear] = { month: monthYear, receitas: 0, despesas: 0 };
      }
      
      if (transaction.tipo === 'receita') {
        data[monthYear].receitas += transaction.valor;
      } else {
        data[monthYear].despesas += transaction.valor;
      }
    });

    return Object.values(data).sort((a, b) => {
      const [aMonth, aYear] = a.month.split('/');
      const [bMonth, bYear] = b.month.split('/');
      return new Date(Number(aYear), Number(aMonth) - 1).getTime() - new Date(Number(bYear), Number(bMonth) - 1).getTime();
    });
  }, [receitas, despesas]);

  const onPieClick = (data: any, index: number) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props: any) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >
          {`${payload.name}: R$ ${value.toFixed(2)}`}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Financeiro</h1>
      </header>
      <div className="dashboard-content">
        <main className="dashboard-main">
          <div className="dashboard-summary">
            <div className="summary-card income">
              <h3>Receitas</h3>
              <p>R$ {totalReceitas.toFixed(2)}</p>
            </div>
            <div className="summary-card expenses">
              <h3>Despesas</h3>
              <p>R$ {totalDespesas.toFixed(2)}</p>
            </div>
            <div className="summary-card balance">
              <h3>Saldo</h3>
              <p>R$ {(totalReceitas - totalDespesas).toFixed(2)}</p>
            </div>
          </div>
          <div className="dashboard-chart">
            <h2>Distribuição Financeira</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  onClick={onPieClick}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="dashboard-chart">
            <h2>Receitas e Despesas Mensais</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="receitas" fill="#4CAF50" />
                <Bar dataKey="despesas" fill="#F44336" />
              </BarChart>
            </ResponsiveContainer>
            </div>
          <div className="dashboard-lists">
            {" "}
            <div className="list-container">
              {" "}
              <Receitas />{" "}
            </div>{" "}
            <div className="list-container">
              {" "}
              <Despesas />{" "}
            </div>{" "}
          </div>
          <div className="transaction-history">
            <h2>Histórico de Transações</h2>
            <ul className="transaction-list">
              {transactionHistory.map((transaction, index) => (
                <li
                  key={index}
                  className={`transaction-item ${transaction.tipo}`}
                >
                  <span className="transaction-description">
                    {transaction.descricao}
                  </span>
                  <span className="transaction-amount">
                    R$ {transaction.valor.toFixed(2)}
                  </span>
                  <span className="transaction-date">
                    {new Date(transaction.data).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
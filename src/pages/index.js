import Image from "next/image";
import { Inter } from "next/font/google";

/*const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
   <h1>Bienvenidos</h1>
  )
}*/

import NodeRedGraphs from '../components/NodeRedGraphs';

const Dashboard = () => {
 return (
    <div>
      <h1>Dashboard</h1>
      <NodeRedGraphs />
    </div>
 );
};

export default Dashboard;
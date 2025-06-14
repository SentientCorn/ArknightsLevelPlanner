import { useState } from 'react';
import LoginModal from '../components/LoginModal';
import Operator from '../components/Operator';
import Planner from '../components/Planner';

interface Item {
  id: string;
  name: string;
  image_url: string;
  class_id: number;
  rarity: number;
}

const Landing: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<Item | null>(null);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-16 text-center">
        Welcome
      </h1>
      
      {/* Containers*/}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        <div style={{backgroundColor: '#2D2D2D'}} className="flex-2 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-1 min-h-96">

          <div className="h-full flex items-center justify-center">
            {selectedBox === 'planner' ? (
              <Planner 
              selectedOperator={selectedOperator} />
            ) : selectedBox === 'operator' ? (
              <Operator 
              selected={selectedOperator} 
              onSelect={setSelectedOperator} 
            />
            ) : (
              <div className="text-slate-400 text-lg font-medium">Large Box</div>
            )}

          </div>
        </div>

        <div style={{backgroundColor: '#2D2D2D'}} className="flex-1 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 min-h-96 flex flex-col justify-center">
          <div className="bg-gradient-to-br from-[#F4E5C0] to-[#E2CBAA] h-full flex flex-col items-center justify-start rounded-2xl gap-6 p-6 shadow-inner">
            
            {selectedOperator ? (
            <div className="flex flex-col items-center gap-4 mb-6">
            
            <span className="text-gray-800 font-semibold text-lg">Selected operator: {selectedOperator.name}</span>
               </div>
              ) : null}
            
            <button
              className="bg-[#C7B996] hover:bg-[#b3a47d] text-white font-medium px-6 py-3 rounded-lg w-full shadow transition-all duration-200"
              onClick={() => setSelectedBox('planner')}
            >
              Planner
            </button>
            <button
              className="bg-[#C7B996] hover:bg-[#b3a47d] text-white font-medium px-6 py-3 rounded-lg w-full shadow transition-all duration-200"
              onClick={() => setSelectedBox('operator')}
            >
              Operator
            </button>
            <button
              className="bg-[#C7B996] hover:bg-[#b3a47d] text-white font-medium px-6 py-3 rounded-lg w-full shadow transition-all duration-200"
              onClick={() => setSelectedBox('materials')}
            >
              Materials
            </button>
          </div>
        </div>

      </div>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}

export default Landing;

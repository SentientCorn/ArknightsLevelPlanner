import { useState } from 'react';
import LoginModal from '../components/LoginModal';
import Operator from '../components/Operator';
import Planner from '../components/Planner';

const Landing: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);

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
              <Planner />
            ) : selectedBox === 'operator' ? (
              <Operator />
            ) : (
              <div className="text-slate-400 text-lg font-medium">Large Box</div>
            )}

          </div>
        </div>

        <div style={{backgroundColor: '#2D2D2D'}} className="flex-1 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 min-h-96 flex flex-col justify-center">
          <div className="bg-gradient-to-br from-[var(--kuning1)] to-[#E2CBAA] h-full flex flex-col items-center justify-center rounded-2xl gap-6 p-6 shadow-inner">
            <button
              className={`${
                selectedBox === 'planner'
                ? 'border-4 border-[var(--coklat)] text-[var(--coklat)]'
                : 'bg-[var(--coklat)] hover:bg-[var(--coklat)] text-white shadow-sm'
              } font-medium px-6 py-3 rounded-lg w-full shadow transition-all hover:cursor-pointer`}
              onClickCapture={() => setSelectedBox('planner')}
              > 
              Planner
            </button>

            <button
              className={`${
                selectedBox === 'operator'
                ? 'border-4 border-[var(--coklat)] text-[var(--coklat)]'
                : 'bg-[var(--coklat)] hover:bg-[var(--coklat)] text-white'
              } font-medium px-6 py-3 rounded-lg w-full shadow transition-all hover:cursor-pointer`}
              onClickCapture={() => setSelectedBox('operator')}
              > 
              Operator
            </button>

            <button
              className={`${
                selectedBox === 'materials'
                ? 'border-4 border-[var(--coklat)] text-[var(--coklat)]'
                : 'bg-[var(--coklat)] hover:bg-[var(--coklat)] text-white'
              } font-medium px-6 py-3 rounded-lg w-full shadow transition-all hover:cursor-pointer`}
              onClickCapture={() => setSelectedBox('materials')}
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

// import { useState } from 'react'

const Landing: React.FC = () => {

return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-16 text-center">
        Welcome
      </h1>
      
      {/* Containers*/}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        <div style={{backgroundColor: '#3A3A3A'}} className="flex-2 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-12 min-h-96">
          <div className="h-full flex items-center justify-center">
            <div className="text-slate-400 text-lg font-medium">Large Box</div>
          </div>
        </div>
        
        <div style={{backgroundColor: '#3A3A3A'}} className="flex-1 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-12 min-h-96">
          <div className="h-full flex items-center justify-center">
            <div className="text-slate-400 text-lg font-medium">Small Box</div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Landing;
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Database, Layers, BarChart3, LayoutGrid, Play, Workflow, Table2, Eraser, Info, MousePointerClick, Filter, Group, Calculator, Trash2, PaintBucket, Eye, ScanLine, Binary, Tag, Sparkles, Brain, Search, Truck, Zap, Timer, Move, Grid3X3, Plus, Minus, Cpu, BoxSelect, Microscope, BarChart, PieChart, Activity, HelpCircle, CheckCircle, TrendingUp, AlertTriangle, Ruler, ArrowDown, ArrowRight, X, Copy, Split, FunctionSquare, Sigma, Maximize, RefreshCw, Scissors, PenLine, FileText, List, Terminal } from 'lucide-react';
import { Button } from './Button';
import { CodeBlock } from './CodeBlock';

interface StudyModeProps {
  onBack: () => void;
}

export const StudyMode: React.FC<StudyModeProps> = ({ onBack }) => {
  const [activeTopic, setActiveTopic] = useState<string>('intro');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 shadow-md z-50 sticky top-0 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pr-12">
          <div className="flex items-center gap-4 w-full md:w-auto justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <ArrowLeft size={24} />
                <span className="font-bold text-sm hidden md:inline">Salir</span>
              </button>
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-300 leading-tight">
                  La Gran Biblioteca
                </h1>
                <p className="text-[10px] md:text-xs text-slate-500 font-mono hidden sm:block">SIMULADORES INTERACTIVOS</p>
              </div>
            </div>
          </div>
          
          <nav className="flex overflow-x-auto w-full md:w-auto p-1 gap-2 bg-slate-100 dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-800 no-scrollbar">
            <TabButton 
              active={activeTopic === 'intro'} 
              onClick={() => setActiveTopic('intro')} 
              icon={<Workflow size={16} />} 
              label="El Proceso"
            />
            <TabButton 
              active={activeTopic === 'numpy'} 
              onClick={() => setActiveTopic('numpy')} 
              icon={<LayoutGrid size={16} />} 
              label="NumPy"
            />
            <TabButton 
              active={activeTopic === 'pandas'} 
              onClick={() => setActiveTopic('pandas')} 
              icon={<Table2 size={16} />} 
              label="Pandas"
            />
            <TabButton 
              active={activeTopic === 'cleaning'} 
              onClick={() => setActiveTopic('cleaning')} 
              icon={<Eraser size={16} />} 
              label="Limpieza"
            />
            <TabButton 
              active={activeTopic === 'eda'} 
              onClick={() => setActiveTopic('eda')} 
              icon={<Microscope size={16} />} 
              label="EDA"
            />
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-2 md:p-8 animate-fade-in pb-24 text-slate-900 dark:text-slate-200">
        {activeTopic === 'intro' && <IntroVisualizer />}
        {activeTopic === 'numpy' && <NumpyVisualizer />}
        {activeTopic === 'pandas' && <PandasVisualizer />}
        {activeTopic === 'cleaning' && <CleaningVisualizer />}
        {activeTopic === 'eda' && <EDAVisualizer />}
      </main>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
    }`}
  >
    {icon}
    <span className="font-medium text-xs md:text-sm">{label}</span>
  </button>
);

// --- TOPIC 1: INTRO (REFINED) ---
const IntroVisualizer = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { id: 1, title: "1. Pregunta", icon: <Info size={24} className="text-indigo-500 dark:text-indigo-400" />, desc: "Definir el objetivo.", explanation: "Todo proyecto de Data Science nace de una necesidad de negocio o investigación. Sin una pregunta clara, los datos son solo ruido.", codeSnippet: `# Objetivo: Determinar qué factor influye más en las ventas de helados.\n# Hipótesis: La temperatura ambiental.`, visual: (<div className="flex flex-col items-center justify-center h-full animate-fade-in"><div className="relative"><div className="w-24 h-24 rounded-full border-4 border-dashed border-slate-400 dark:border-slate-600 flex items-center justify-center animate-spin-slow"></div><div className="absolute inset-0 flex items-center justify-center"><span className="text-6xl font-bold text-indigo-500 dark:text-indigo-400 animate-bounce">?</span></div></div><p className="mt-4 text-center text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">"¿Por qué vendo menos helados?"</p></div>) },
    { id: 2, title: "2. Recolectar", icon: <Truck size={24} className="text-yellow-500 dark:text-yellow-400" />, desc: "Conseguir ingredientes.", explanation: "Necesitamos datos crudos. Pueden venir de archivos CSV, Excel, Bases de Datos SQL o APIs.", codeSnippet: `import pandas as pd\n\n# Cargamos el archivo crudo\ndf = pd.read_csv('ventas_helados_2023.csv')\nprint(df.head())`, visual: (<div className="flex flex-col items-center justify-center h-full relative overflow-hidden"><Truck size={48} className="text-slate-400 dark:text-slate-500 mb-8 animate-pulse" /><div className="flex gap-2">{[1,2,3].map(i => (<div key={i} className="w-8 h-8 bg-yellow-100 dark:bg-yellow-600 rounded flex items-center justify-center text-xs border border-yellow-400 text-yellow-800 dark:text-white shadow-lg animate-[fall_2s_infinite]" style={{animationDelay: `${i*0.5}s`}}>CSV</div>))}</div></div>) },
    { id: 3, title: "3. Limpieza", icon: <Sparkles size={24} className="text-cyan-500 dark:text-cyan-400" />, desc: "Limpiar y ordenar.", explanation: "El paso más largo (80% del tiempo). Corregimos errores, rellenamos valores vacíos (NaN) y eliminamos duplicados.", codeSnippet: `# Rellenar nulos con 0\ndf = df.fillna(0)\n\n# Eliminar duplicados\ndf = df.drop_duplicates()`, visual: (<div className="flex items-center justify-center h-full gap-8"><div className="flex flex-col gap-2 opacity-50"><div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded flex items-center justify-center text-red-500 border border-red-200 dark:border-red-800 font-bold text-xs">NaN</div></div><div className="flex flex-col items-center text-cyan-500 dark:text-cyan-400"><ArrowLeft className="rotate-180 mb-2 animate-pulse" /><div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/20 rounded-full flex items-center justify-center border-2 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]"><Eraser className="animate-wiggle" /></div><ArrowLeft className="rotate-180 mt-2 animate-pulse" /></div><div className="flex flex-col gap-2"><div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-500 shadow-lg font-bold text-xs">OK</div></div></div>) },
    { id: 4, title: "4. Explorar", icon: <Search size={24} className="text-pink-500 dark:text-pink-400" />, desc: "Entender patrones.", explanation: "También llamado EDA. Usamos estadística descriptiva y gráficos para entender los datos antes de modelar.", codeSnippet: `import seaborn as sns\n\n# Correlación\nsns.scatterplot(x='temp', y='ventas', data=df)`, visual: (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="flex items-end gap-2 h-32 mb-2 px-4">
           {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
             <div 
               key={i} 
               className="w-6 bg-pink-400 dark:bg-pink-500 rounded-t-md animate-slide-up shadow-lg" 
               style={{height: `${h}%`, animationDelay: `${i * 0.1}s`}}
             ></div>
           ))}
        </div>
        <div className="flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 px-3 py-1 rounded-full border border-pink-200 dark:border-pink-800">
          <BarChart3 size={16} className="text-pink-600 dark:text-pink-400" />
          <span className="text-xs font-bold text-pink-700 dark:text-pink-300">Distribución</span>
        </div>
      </div>
    ) },
    { id: 5, title: "5. Modelar", icon: <Brain size={24} className="text-emerald-500 dark:text-emerald-400" />, desc: "Predecir el futuro.", explanation: "Entrenamos un algoritmo de Machine Learning para que aprenda los patrones del pasado.", codeSnippet: `from sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\nprediccion = model.predict([[30]])`, visual: (
      <div className="flex items-center justify-center h-full w-full px-8">
        <div className="relative flex items-center justify-between w-full">
           {/* Inputs */}
           <div className="flex flex-col gap-2">
              <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-[10px] font-bold">X1</div>
              <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-[10px] font-bold">X2</div>
              <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-[10px] font-bold">X3</div>
           </div>

           {/* Connections */}
           <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-30">
              <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none">
                 <line x1="10" y1="20" x2="100" y2="50" stroke="currentColor" strokeWidth="2" className="text-emerald-500 animate-pulse" />
                 <line x1="10" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" className="text-emerald-500 animate-pulse" style={{animationDelay: '0.2s'}} />
                 <line x1="10" y1="80" x2="100" y2="50" stroke="currentColor" strokeWidth="2" className="text-emerald-500 animate-pulse" style={{animationDelay: '0.4s'}} />
              </svg>
           </div>

           {/* Hidden Layer / Model */}
           <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500 rounded-xl flex items-center justify-center relative animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Brain size={32} className="text-emerald-500 animate-spin-slow" />
              <div className="absolute -top-6 text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Training</div>
           </div>

           {/* Output */}
           <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg scale-110">Y</div>
              <span className="text-[10px] text-slate-500 mt-1 font-mono">Prediction</span>
           </div>
        </div>
      </div>
    ) }
  ];

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-5 space-y-4">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
          <Workflow className="text-indigo-500" /> La Receta del Data Scientist
        </h2>
        <div className="space-y-3 relative">
          <div className="absolute left-[26px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800 -z-10"></div>
          {steps.map((step, idx) => (
            <button 
              key={idx} 
              onClick={() => setActiveStep(idx)} 
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 group relative overflow-hidden ${
                idx === activeStep 
                  ? 'bg-white dark:bg-slate-900 border-indigo-500 shadow-xl scale-105' 
                  : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700/50'
              }`}
            >
              <div className={`
                p-3 rounded-full transition-colors shrink-0 z-10 border-2
                ${idx === activeStep 
                  ? 'bg-indigo-500 text-white border-indigo-400' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700'}
              `}>
                {step.icon}
              </div>
              <div className="z-10">
                <h3 className={`font-bold transition-colors ${idx === activeStep ? 'text-indigo-900 dark:text-white' : 'text-slate-700 dark:text-slate-400'}`}>
                  {step.title}
                </h3>
                <p className={`text-sm transition-colors ${idx === activeStep ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'}`}>
                  {step.desc}
                </p>
              </div>
              {/* Active Background Glow */}
              {idx === activeStep && (
                <div className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/10 z-0"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-7 sticky top-24">
        <div className="bg-slate-800 dark:bg-slate-900 border border-slate-700 rounded-2xl p-2 shadow-2xl">
          <div className="bg-slate-950 rounded-xl relative overflow-hidden flex flex-col">
            <div className="bg-slate-900 p-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Pipeline_v1.0</div>
            </div>
            
            <div className="h-[280px] p-8 relative flex items-center justify-center bg-slate-900 group">
              <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
              
              <div key={activeStep} className="relative z-10 w-full h-full animate-fade-in flex items-center justify-center">
                 {steps[activeStep].visual}
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 border-t border-slate-800 animate-slide-up">
              <div className="flex items-start gap-3 mb-4">
                <div className="mt-1 p-1 bg-indigo-500/20 rounded">
                  <Info className="text-indigo-400 shrink-0" size={16} />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{steps[activeStep].explanation}</p>
              </div>
              <CodeBlock code={steps[activeStep].codeSnippet} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- TOPIC 3: PANDAS VISUALIZER (TOTAL OVERHAUL) ---
const PandasVisualizer = () => {
  const [mode, setMode] = useState<'select' | 'filter' | 'group'>('select');
  const [selectType, setSelectType] = useState<'loc' | 'iloc'>('loc');
  const [hoveredCell, setHoveredCell] = useState<{r: number, c: number} | null>(null);
  const [aggFunc, setAggFunc] = useState<'mean' | 'sum' | 'max'>('mean');
  
  // Advanced State for Filtering
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Data for Pandas
  const data = [
    { id: 0, name: 'Ana', dept: 'Ventas', salary: 3000 },
    { id: 1, name: 'Bob', dept: 'IT', salary: 5000 },
    { id: 2, name: 'Eva', dept: 'Ventas', salary: 3200 },
    { id: 3, name: 'Dan', dept: 'IT', salary: 4800 },
    { id: 4, name: 'Zoe', dept: 'RRHH', salary: 2900 },
  ];

  const cols = ['name', 'dept', 'salary'];

  // Helper for Group By visualization
  const groupedData = {
    'Ventas': data.filter(d => d.dept === 'Ventas'),
    'IT': data.filter(d => d.dept === 'IT'),
    'RRHH': data.filter(d => d.dept === 'RRHH'),
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Modes Navigation */}
      <div className="flex flex-wrap gap-2 md:gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
         <button onClick={() => setMode('select')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all ${mode==='select'?'bg-indigo-600 text-white shadow-lg':'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            <BoxSelect size={16}/> Selección (.loc/iloc)
         </button>
         <button onClick={() => setMode('filter')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all ${mode==='filter'?'bg-indigo-600 text-white shadow-lg':'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            <Filter size={16}/> Filtrado (Boolean)
         </button>
         <button onClick={() => setMode('group')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all ${mode==='group'?'bg-indigo-600 text-white shadow-lg':'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            <Group size={16}/> Agrupación (GroupBy)
         </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Panel: Controls & Explanation */}
        <div className="lg:col-span-4 space-y-6">
           
           {/* MODE: SELECTION */}
           {mode === 'select' && (
             <div className="space-y-6 animate-slide-up">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800">
                   <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">El Francotirador</h3>
                   <p className="text-sm text-slate-600 dark:text-slate-300">
                     Accede a datos específicos por etiqueta (loc) o posición (iloc). Pasa el ratón por la tabla.
                   </p>
                </div>
                
                <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                   <button onClick={() => setSelectType('loc')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${selectType === 'loc' ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>.loc [Etiqueta]</button>
                   <button onClick={() => setSelectType('iloc')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${selectType === 'iloc' ? 'bg-white dark:bg-slate-700 shadow text-pink-600 dark:text-pink-400' : 'text-slate-400'}`}>.iloc [Posición]</button>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl shadow-inner font-mono text-sm border border-slate-700 min-h-[80px] flex items-center justify-center">
                   {hoveredCell ? (
                     <span className="text-emerald-400 animate-pulse">
                       df.{selectType}[
                         <span className="text-yellow-400">{selectType === 'loc' ? hoveredCell.r : hoveredCell.r}</span>, 
                         <span className="text-pink-400">{selectType === 'loc' ? `'${cols[hoveredCell.c]}'` : hoveredCell.c}</span>
                       ]
                     </span>
                   ) : (
                     <span className="text-slate-500">// Pasa el ratón por la tabla</span>
                   )}
                </div>
             </div>
           )}

           {/* MODE: FILTER */}
           {mode === 'filter' && (
             <div className="space-y-6 animate-slide-up">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800">
                   <h3 className="font-bold text-purple-900 dark:text-purple-300 mb-2">La Máscara</h3>
                   <p className="text-sm text-slate-600 dark:text-slate-300">
                     Filtra filas usando condiciones lógicas. Solo sobreviven las que devuelven <code>True</code>.
                   </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Aplicar Filtro:</p>
                  <button onClick={() => setActiveFilter(activeFilter === 'salary' ? null : 'salary')} className={`w-full p-3 rounded-lg border text-left transition-all ${activeFilter === 'salary' ? 'bg-indigo-100 dark:bg-indigo-900/50 border-indigo-500 ring-1 ring-indigo-500' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300'}`}>
                    <code className="text-sm font-bold text-indigo-600 dark:text-indigo-400">df[ df['salary'] &gt; 4000 ]</code>
                  </button>
                  <button onClick={() => setActiveFilter(activeFilter === 'dept' ? null : 'dept')} className={`w-full p-3 rounded-lg border text-left transition-all ${activeFilter === 'dept' ? 'bg-pink-100 dark:bg-pink-900/50 border-pink-500 ring-1 ring-pink-500' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-pink-300'}`}>
                    <code className="text-sm font-bold text-pink-600 dark:text-pink-400">df[ df['dept'] == 'Ventas' ]</code>
                  </button>
                </div>
             </div>
           )}

           {/* MODE: GROUP */}
           {mode === 'group' && (
             <div className="space-y-6 animate-slide-up">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800">
                   <h3 className="font-bold text-emerald-900 dark:text-emerald-300 mb-2">Divide y Vencerás</h3>
                   <p className="text-sm text-slate-600 dark:text-slate-300">
                     <code>groupby</code> separa los datos en "cubos" por categoría y aplica una función de agregación.
                   </p>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Función de Agregación</label>
                   <div className="flex gap-2">
                      <button 
                        onClick={() => setAggFunc('mean')}
                        className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${aggFunc === 'mean' ? 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-500 text-emerald-700 dark:text-emerald-300' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}
                      >
                         <Calculator size={18} />
                         <span className="text-xs font-bold mt-1">Mean</span>
                      </button>
                      <button 
                        onClick={() => setAggFunc('sum')}
                        className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${aggFunc === 'sum' ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-700 dark:text-blue-300' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}
                      >
                         <Sigma size={18} />
                         <span className="text-xs font-bold mt-1">Sum</span>
                      </button>
                      <button 
                        onClick={() => setAggFunc('max')}
                        className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${aggFunc === 'max' ? 'bg-orange-100 dark:bg-orange-900/50 border-orange-500 text-orange-700 dark:text-orange-300' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}
                      >
                         <Maximize size={18} />
                         <span className="text-xs font-bold mt-1">Max</span>
                      </button>
                   </div>
                </div>

                <CodeBlock code={`df.groupby('dept')['salary'].${aggFunc}()`} />
             </div>
           )}
        </div>

        {/* Right Panel: Visualization */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 shadow-xl min-h-[400px] relative overflow-hidden">
           
           {/* TABLE VISUALIZATION FOR SELECT & FILTER */}
           {(mode === 'select' || mode === 'filter') && (
             <div className="overflow-x-auto">
               <table className="w-full border-collapse">
                 <thead>
                   <tr>
                     <th className="p-3 text-right font-mono text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">Index</th>
                     {cols.map((col, i) => (
                       <th key={col} className={`p-3 text-left font-bold border-b border-slate-200 dark:border-slate-700 transition-colors ${
                         mode === 'select' && selectType === 'iloc' && hoveredCell?.c === i ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300' : 
                         mode === 'select' && selectType === 'loc' && hoveredCell?.c === i ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'
                       }`}>
                         {mode === 'select' && selectType === 'iloc' ? <span className="text-xs font-mono bg-pink-200 dark:bg-pink-800 px-1 rounded mr-1">{i}</span> : null}
                         {col}
                       </th>
                     ))}
                   </tr>
                 </thead>
                 <tbody className="font-mono text-sm">
                   {data.map((row, rIndex) => {
                     // Filter Logic
                     let isDimmed = false;
                     if (mode === 'filter') {
                       if (activeFilter === 'salary' && row.salary <= 4000) isDimmed = true;
                       if (activeFilter === 'dept' && row.dept !== 'Ventas') isDimmed = true;
                     }

                     return (
                       <tr 
                         key={row.id} 
                         className={`transition-all duration-500 ${isDimmed ? 'opacity-10 blur-[1px] grayscale' : 'opacity-100'}`}
                       >
                         {/* INDEX COLUMN */}
                         <td className={`p-3 text-right font-bold border-r border-slate-200 dark:border-slate-700 transition-colors ${
                           mode === 'select' && hoveredCell?.r === rIndex 
                             ? (selectType === 'loc' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400')
                             : 'text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900'
                         }`}>
                           {row.id}
                         </td>

                         {/* DATA COLUMNS */}
                         {cols.map((col, cIndex) => (
                           <td 
                             key={col}
                             onMouseEnter={() => setHoveredCell({r: rIndex, c: cIndex})}
                             onMouseLeave={() => setHoveredCell(null)}
                             className={`p-3 border-b border-slate-100 dark:border-slate-800 transition-colors cursor-crosshair relative ${
                               mode === 'select' && hoveredCell?.r === rIndex && hoveredCell?.c === cIndex ? 'bg-indigo-500 text-white scale-105 shadow-lg rounded z-10' : 
                               mode === 'select' && (hoveredCell?.r === rIndex || hoveredCell?.c === cIndex) ? 'bg-slate-50 dark:bg-slate-800' : ''
                             }`}
                           >
                              {/* @ts-ignore */}
                             {col === 'salary' ? `$${row[col]}` : row[col]}
                           </td>
                         ))}
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
             </div>
           )}

           {/* GROUP BY VISUALIZATION */}
           {mode === 'group' && (
             <div className="flex flex-wrap gap-4 h-full items-start justify-center pt-8">
                {Object.entries(groupedData).map(([dept, rows], i) => {
                   let aggResult = 0;
                   if (aggFunc === 'mean') aggResult = rows.reduce((acc, curr) => acc + curr.salary, 0) / rows.length;
                   if (aggFunc === 'sum') aggResult = rows.reduce((acc, curr) => acc + curr.salary, 0);
                   if (aggFunc === 'max') aggResult = Math.max(...rows.map(r => r.salary));

                   const aggColor = aggFunc === 'mean' ? 'emerald' : aggFunc === 'sum' ? 'blue' : 'orange';

                   return (
                     <div key={dept} className="flex-1 min-w-[120px] max-w-[200px] animate-slide-up" style={{animationDelay: `${i*100}ms`}}>
                        {/* Bucket */}
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-t-xl border-x-2 border-t-2 border-slate-300 dark:border-slate-600 p-2 min-h-[150px] relative flex flex-col-reverse gap-1 shadow-inner">
                           {rows.map(r => (
                             <div key={r.id} className="bg-white dark:bg-slate-700 p-2 rounded border border-slate-200 dark:border-slate-600 text-xs text-center shadow-sm animate-bounce" style={{animationDuration: '2s'}}>
                               <div className="font-bold">{r.name}</div>
                               <div className="text-slate-400">${r.salary}</div>
                             </div>
                           ))}
                           <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-200 dark:bg-slate-700 px-2 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-500">Dept</div>
                        </div>
                        {/* Label */}
                        <div className="bg-slate-800 dark:bg-slate-700 text-white p-2 text-center font-bold text-sm rounded-b-xl mb-2">
                           {dept}
                        </div>
                        {/* Aggregation Result */}
                        <div className="text-center">
                           <div className={`w-0.5 h-4 bg-${aggColor}-500 mx-auto`}></div>
                           <div className={`bg-${aggColor}-100 dark:bg-${aggColor}-900/30 border border-${aggColor}-500 text-${aggColor}-700 dark:text-${aggColor}-400 rounded-lg p-2 text-xs transition-colors duration-300`}>
                              <span className={`block font-bold uppercase text-[10px] text-${aggColor}-500`}>{aggFunc} Salary</span>
                              ${Math.round(aggResult)}
                           </div>
                        </div>
                     </div>
                   );
                })}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const NumpyVisualizer = () => {
  const [racing, setRacing] = useState(false);
  const [step, setStep] = useState(-1); // -1: Start, 0-4: Python steps, 5: Done
  const data = [10, 20, 30, 40];
  
  const runSimulation = () => {
    if (racing) return;
    setRacing(true);
    setStep(-1);
    
    // Python steps (0, 1, 2, 3)
    let current = 0;
    const interval = setInterval(() => {
        setStep(current);
        current++;
        if (current > 4) {
            clearInterval(interval);
            setRacing(false);
        }
    }, 800); // Slower to show "1 by 1"
  };

  return (
    <div className="space-y-8 animate-fade-in">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800">
            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-300 mb-2">NumPy vs Python: La Carrera</h3>
            <p className="text-slate-600 dark:text-slate-300">
                La gran diferencia es la <strong>Vectorización</strong>. Python procesa los bucles elemento por elemento (lento). NumPy aplasta todo el array de golpe (rápido).
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Simulation Area */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-500"></div>
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <span className="text-slate-400 font-mono text-xs uppercase tracking-widest">CPU Simulation</span>
                    <button 
                        onClick={runSimulation}
                        disabled={racing}
                        className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${racing ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-400 text-white shadow-lg shadow-green-900/20'}`}
                    >
                        <Play size={14} fill="currentColor" /> {racing ? 'Procesando...' : 'Iniciar Simulación'}
                    </button>
                </div>

                {/* Python Lane */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                        <span className="flex items-center gap-2"><Timer size={14} /> Python List (Bucle For)</span>
                        <span className="text-red-400">{racing ? 'Lento...' : ''}</span>
                    </div>
                    <div className="flex gap-2">
                        {data.map((val, idx) => (
                            <div key={idx} className={`
                                w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all duration-300
                                ${step === idx ? 'bg-yellow-500 border-yellow-300 text-black scale-110 shadow-[0_0_20px_rgba(234,179,8,0.5)]' : 
                                  step > idx ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-slate-800 border-slate-700 text-slate-400'}
                            `}>
                                {step > idx ? val * 2 : val}
                            </div>
                        ))}
                    </div>
                    {/* Visual Code Pointer */}
                    <div className="mt-2 h-6">
                        {step >= 0 && step < 4 && (
                            <div className="text-xs font-mono text-yellow-500 animate-bounce" style={{marginLeft: `${step * 3.5 + 0.5}rem`}}>
                                ↑ i={step}
                            </div>
                        )}
                    </div>
                </div>

                {/* NumPy Lane */}
                <div>
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                        <span className="flex items-center gap-2"><Zap size={14} /> NumPy Array (Vectorizado)</span>
                        <span className="text-emerald-400">{racing && step >= 0 ? '¡Instantáneo!' : ''}</span>
                    </div>
                    <div className="flex gap-2">
                        {data.map((val, idx) => (
                            <div key={idx} className={`
                                w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all duration-300
                                ${step >= 0 ? 'bg-indigo-500 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-800 border-slate-700 text-slate-400'}
                            `}>
                                {step >= 0 ? val * 2 : val}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results & Explanation */}
            <div className="space-y-6">
                 <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <CheckCircle size={20} className="text-emerald-500" /> Resultado Final
                    </h4>
                    <p className="text-sm text-slate-500 mb-4">
                        Ambos métodos llegan al mismo resultado, pero NumPy lo hace en un solo ciclo de reloj de la CPU (SIMD), mientras Python tiene que leer, decodificar y ejecutar instrucción por instrucción.
                    </p>
                    <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded-lg font-mono text-sm border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                        Input: [10, 20, 30, 40]<br/>
                        Operación: x * 2<br/>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Output: [20, 40, 60, 80]</span>
                    </div>
                 </div>

                 <CodeBlock code={`import numpy as np\n\n# Python Normal (Lento)\nlista = [10, 20, 30]\nresultado = []\nfor x in lista:\n    resultado.append(x * 2)\n\n# NumPy (Rápido)\narray = np.array([10, 20, 30])\nresultado = array * 2  # ¡Sin bucles!`} />
            </div>
        </div>
    </div>
  );
};

const CleaningVisualizer = () => {
  const initialData = [
    { id: 1, name: 'Ana', score: 85, status: 'ok' },
    { id: 2, name: 'Bob', score: null, status: 'nan' },
    { id: 1, name: 'Ana', score: 85, status: 'dup' },
    { id: 3, name: ' Dan ', score: 90, status: 'dirty_str' },
  ];

  const [data, setData] = useState<any[]>(initialData);
  const [log, setLog] = useState<string>("Dataset cargado. Esperando limpieza...");
  const [actionState, setActionState] = useState<{type: string, active: boolean}>({type: '', active: false});
  const [colName, setColName] = useState("Score");

  const reset = () => {
    setData(initialData);
    setColName("Score");
    setLog("Dataset restaurado.");
    setActionState({type: '', active: false});
  }

  const runAction = (type: string, message: string, logic: () => void) => {
    if (actionState.active) return;
    
    // Step 1: Trigger Animation
    setActionState({type, active: true});
    setLog(`Ejecutando ${type}...`);

    // Step 2: Apply Logic after delay
    setTimeout(() => {
        logic();
        setLog(message);
        setActionState({type: '', active: false}); // Reset animation state (but changes persist)
    }, 800);
  }

  const dropNA = () => {
    runAction('dropna', "Filas con nulos eliminadas.", () => {
        setData(prev => prev.filter(row => row.score !== null));
    });
  }

  const fillNA = () => {
    runAction('fillna', "Nulos reemplazados por 0.", () => {
        setData(prev => prev.map(row => row.score === null ? { ...row, score: 0, status: 'filled' } : row));
    });
  }

  const dropDup = () => {
    runAction('dropdup', "Duplicados eliminados.", () => {
         const seen = new Set();
         const unique = data.filter(row => {
             const key = row.id;
             if (seen.has(key)) return false;
             seen.add(key);
             return true;
         });
         setData(unique);
    });
  }

  const cleanStr = () => {
      runAction('strip', "Espacios en blanco eliminados.", () => {
          setData(prev => prev.map(row => ({...row, name: row.name.trim(), status: row.status === 'dirty_str' ? 'clean' : row.status})));
      });
  }

  const renameCol = () => {
      runAction('rename', "Columna renombrada a 'Puntos'.", () => {
          setColName("Puntos");
      });
  }

  const getCodeForAction = (type: string) => {
    switch(type) {
      case 'dropna': return "df_clean = df.dropna()";
      case 'fillna': return "df_clean = df.fillna(0)";
      case 'dropdup': return "df_clean = df.drop_duplicates()";
      case 'strip': return "df['Name'] = df['Name'].str.strip()";
      case 'rename': return "df = df.rename(columns={'Score': 'Puntos'})";
      default: return "";
    }
  };

  const activeCode = getCodeForAction(actionState.type);

  return (
    <div className="space-y-8 animate-fade-in">
       <div className="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-2xl border border-cyan-100 dark:border-cyan-800">
        <h3 className="text-2xl font-bold text-cyan-900 dark:text-cyan-300 mb-2">Panel de Control de Limpieza</h3>
        <p className="text-slate-600 dark:text-slate-300">
          Usa las herramientas para limpiar el dataset corrupto. Observa cómo cambia la tabla en tiempo real con animaciones.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
         {/* Controls */}
         <div className="md:col-span-4 space-y-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase text-xs tracking-wider">Herramientas</h4>
                <div className="space-y-3">
                    <button onClick={dropNA} className="group w-full flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-100 dark:border-red-900/30 transition-all hover:translate-x-1">
                        <span className="font-bold text-sm flex items-center gap-2"><Trash2 size={16}/> Eliminar Nulos</span>
                        <code className="text-[10px] bg-slate-900 text-red-400 px-1.5 py-0.5 rounded font-mono border border-red-900/50 group-hover:bg-black transition-colors">.dropna()</code>
                    </button>
                    <button onClick={fillNA} className="group w-full flex items-center justify-between p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-900/30 transition-all hover:translate-x-1">
                        <span className="font-bold text-sm flex items-center gap-2"><PaintBucket size={16}/> Rellenar Nulos</span>
                        <code className="text-[10px] bg-slate-900 text-emerald-400 px-1.5 py-0.5 rounded font-mono border border-emerald-900/50 group-hover:bg-black transition-colors">.fillna(0)</code>
                    </button>
                    <button onClick={dropDup} className="group w-full flex items-center justify-between p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/10 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-900/30 transition-all hover:translate-x-1">
                        <span className="font-bold text-sm flex items-center gap-2"><Copy size={16}/> Quitar Duplicados</span>
                        <code className="text-[10px] bg-slate-900 text-indigo-400 px-1.5 py-0.5 rounded font-mono border border-indigo-900/50 group-hover:bg-black transition-colors">.drop_duplicates()</code>
                    </button>
                    <button onClick={cleanStr} className="group w-full flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-100 dark:border-blue-900/30 transition-all hover:translate-x-1">
                        <span className="font-bold text-sm flex items-center gap-2"><Scissors size={16}/> Limpiar Texto</span>
                        <code className="text-[10px] bg-slate-900 text-blue-400 px-1.5 py-0.5 rounded font-mono border border-blue-900/50 group-hover:bg-black transition-colors">.str.strip()</code>
                    </button>
                    <button onClick={renameCol} className="group w-full flex items-center justify-between p-3 rounded-lg bg-purple-50 dark:bg-purple-900/10 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 border border-purple-100 dark:border-purple-900/30 transition-all hover:translate-x-1">
                        <span className="font-bold text-sm flex items-center gap-2"><PenLine size={16}/> Renombrar</span>
                        <code className="text-[10px] bg-slate-900 text-purple-400 px-1.5 py-0.5 rounded font-mono border border-purple-900/50 group-hover:bg-black transition-colors">.rename()</code>
                    </button>

                    <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>
                    <button onClick={reset} className="w-full flex items-center justify-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs uppercase tracking-wider">
                        <RefreshCw size={14} /> Restaurar Dataset
                    </button>
                </div>
            </div>

            {/* NEW: ACTIVE CODE DISPLAY */}
             <div className="bg-slate-950 p-4 rounded-xl border border-slate-700 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-2 opacity-50"><Terminal size={16} className="text-slate-500"/></div>
               <div className="text-xs font-mono text-slate-500 mb-1">active_cell.py</div>
               <div className="font-mono text-sm text-emerald-400 min-h-[24px]">
                 {activeCode ? (
                   <span className="animate-fade-in">{activeCode}</span>
                 ) : (
                   <span className="text-slate-500 italic"># Selecciona una herramienta arriba...</span>
                 )}
                 <span className="animate-pulse ml-1 inline-block w-2 h-4 bg-emerald-500/50 align-middle"></span>
               </div>
             </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 font-mono text-xs text-green-400 shadow-inner">
                <div className="flex items-center gap-2 border-b border-slate-700 pb-2 mb-2 text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>terminal</span>
                </div>
                <div>
                   <span className="text-pink-500 mr-2">➜</span>
                   <span className="text-cyan-400">pandas</span> 
                   <span className="text-slate-300"> {log}</span>
                </div>
            </div>
         </div>

         {/* Visualizer */}
         <div className="md:col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden min-h-[300px]">
                <div className="bg-slate-100 dark:bg-slate-950 p-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                        <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    </div>
                    <span className="text-xs font-mono text-slate-500">df_view</span>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-mono text-xs uppercase">
                                <th className="p-4 text-left font-bold border-b dark:border-slate-800">Index</th>
                                <th className="p-4 text-left font-bold border-b dark:border-slate-800">ID</th>
                                <th className="p-4 text-left font-bold border-b dark:border-slate-800">Name</th>
                                <th className={`p-4 text-left font-bold border-b dark:border-slate-800 transition-colors duration-500 ${actionState.type === 'rename' && actionState.active ? 'bg-purple-500 text-white' : ''}`}>
                                    {colName}
                                </th>
                                <th className="p-4 text-left font-bold border-b dark:border-slate-800">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {data.map((row, idx) => {
                                // Dynamic classes for rows/cells based on action
                                let rowClass = "hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all duration-500 ";
                                let scoreCellClass = "p-4 font-mono transition-all duration-500 ";
                                let nameCellClass = "p-4 transition-all duration-500 ";

                                if (actionState.active) {
                                    if (actionState.type === 'dropna' && row.score === null) {
                                        rowClass += "bg-red-100 dark:bg-red-900/40 opacity-0 scale-95 translate-x-4";
                                    }
                                    if (actionState.type === 'dropdup' && row.status === 'dup') {
                                        rowClass += "bg-indigo-100 dark:bg-indigo-900/40 opacity-0 scale-95 translate-x-4";
                                    }
                                    if (actionState.type === 'fillna' && row.score === null) {
                                        scoreCellClass += "bg-emerald-200 dark:bg-emerald-900/60 scale-110 text-emerald-800 dark:text-emerald-300 font-bold";
                                    }
                                    if (actionState.type === 'strip' && row.status === 'dirty_str') {
                                        nameCellClass += "bg-blue-200 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 font-bold";
                                    }
                                }

                                return (
                                <tr key={idx} className={rowClass}>
                                    <td className="p-4 font-mono text-slate-400">{idx}</td>
                                    <td className="p-4 font-medium">{row.id}</td>
                                    <td className={nameCellClass}>
                                        {row.status === 'dirty_str' ? (
                                            <span className="bg-slate-200 dark:bg-slate-700 px-1 rounded border border-dashed border-slate-400">
                                                &nbsp;{row.name.trim()}&nbsp;
                                            </span>
                                        ) : row.name}
                                    </td>
                                    <td className={scoreCellClass}>
                                        {row.score === null ? (
                                            <span className="text-red-500 font-bold bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded text-xs border border-red-200 dark:border-red-900/50">NaN</span>
                                        ) : row.status === 'filled' ? (
                                            <span className="text-emerald-500 font-bold bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded text-xs animate-pulse">0.0</span>
                                        ) : (
                                            row.score
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {row.status === 'nan' ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full"><AlertTriangle size={10} /> Missing</span>
                                        ) : row.status === 'dup' ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-1 rounded-full"><Copy size={10} /> Duplicate</span>
                                        ) : row.status === 'dirty_str' ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full"><Scissors size={10} /> Dirty</span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full"><CheckCircle size={10} /> Valid</span>
                                        )}
                                    </td>
                                </tr>
                            );
                            })}
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-400 italic">
                                        El DataFrame está vacío.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const EDAVisualizer = () => {
  const [activeTab, setActiveTab] = useState<'head' | 'describe' | 'plot' | 'corr'>('head');

  // Monster Dataset
  const monsters = [
    { id: 1, name: "Goblin Scout", type: "Earth", hp: 45, atk: 12, def: 8 },
    { id: 2, name: "Slime", type: "Water", hp: 250, atk: 5, def: 5 }, // Outlier HP
    { id: 3, name: "Fire Drake", type: "Fire", hp: 120, atk: 45, def: 30 },
    { id: 4, name: "Skeleton", type: "Undead", hp: 60, atk: 15, def: 10 },
    { id: 5, name: "Orc Warrior", type: "Earth", hp: 100, atk: 25, def: 20 },
    { id: 6, name: "Water Spirit", type: "Water", hp: 80, atk: 18, def: 15 },
    { id: 7, name: "Lich King", type: "Undead", hp: 90, atk: 60, def: 10 },
    { id: 8, name: "Stone Golem", type: "Earth", hp: 150, atk: 20, def: 50 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-2xl border border-pink-100 dark:border-pink-800">
        <h3 className="text-2xl font-bold text-pink-900 dark:text-pink-300 mb-2">Simulador de Análisis Exploratorio (EDA)</h3>
        <p className="text-slate-600 dark:text-slate-300">
          Analiza el dataset de <strong>Monstruos de la Mazmorra</strong>. Usa las funciones de Pandas para encontrar patrones, debilidades y valores atípicos.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Sidebar Controls */}
        <div className="lg:col-span-3 space-y-2">
            <button 
                onClick={() => setActiveTab('head')}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${activeTab === 'head' ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
                <div className="p-2 bg-white/10 rounded-lg"><Eye size={18} /></div>
                <div>
                    <div className="font-bold text-sm">Explorar</div>
                    <code className="text-xs opacity-70 font-mono">df.head()</code>
                </div>
            </button>

            <button 
                onClick={() => setActiveTab('describe')}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${activeTab === 'describe' ? 'bg-pink-600 text-white border-pink-500 shadow-lg' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
                <div className="p-2 bg-white/10 rounded-lg"><Calculator size={18} /></div>
                <div>
                    <div className="font-bold text-sm">Analizar</div>
                    <code className="text-xs opacity-70 font-mono">df.describe()</code>
                </div>
            </button>

            <button 
                onClick={() => setActiveTab('plot')}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${activeTab === 'plot' ? 'bg-cyan-600 text-white border-cyan-500 shadow-lg' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
                <div className="p-2 bg-white/10 rounded-lg"><BarChart3 size={18} /></div>
                <div>
                    <div className="font-bold text-sm">Visualizar</div>
                    <code className="text-xs opacity-70 font-mono">df['Type'].plot()</code>
                </div>
            </button>

            <button 
                onClick={() => setActiveTab('corr')}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${activeTab === 'corr' ? 'bg-purple-600 text-white border-purple-500 shadow-lg' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
                <div className="p-2 bg-white/10 rounded-lg"><Grid3X3 size={18} /></div>
                <div>
                    <div className="font-bold text-sm">Correlación</div>
                    <code className="text-xs opacity-70 font-mono">sns.heatmap()</code>
                </div>
            </button>
        </div>

        {/* Notebook Display Area */}
        <div className="lg:col-span-9 flex flex-col h-full">
            {/* Notebook Cell */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex-1 flex flex-col">
                {/* Cell Input */}
                <div className="bg-slate-100 dark:bg-slate-950 p-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 font-mono text-sm">
                    <span className="text-slate-500 dark:text-slate-400 select-none">In [1]:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">
                        {activeTab === 'head' && "df.head(8)"}
                        {activeTab === 'describe' && "df.describe()"}
                        {activeTab === 'plot' && "df['Type'].value_counts().plot(kind='bar')"}
                        {activeTab === 'corr' && "sns.heatmap(df.corr(), annot=True)"}
                    </span>
                </div>

                {/* Cell Output */}
                <div className="p-6 overflow-auto custom-scrollbar flex-1 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 font-mono text-xs md:text-sm">
                    
                    {/* VIEW: HEAD */}
                    {activeTab === 'head' && (
                        <div className="animate-fade-in">
                            <table className="w-full border-collapse border border-slate-200 dark:border-slate-700">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800">
                                        <th className="border border-slate-200 dark:border-slate-700 p-2 text-right">#</th>
                                        <th className="border border-slate-200 dark:border-slate-700 p-2 font-bold text-left">Name</th>
                                        <th className="border border-slate-200 dark:border-slate-700 p-2 font-bold text-left">Type</th>
                                        <th className="border border-slate-200 dark:border-slate-700 p-2 font-bold text-right">HP</th>
                                        <th className="border border-slate-200 dark:border-slate-700 p-2 font-bold text-right">Atk</th>
                                        <th className="border border-slate-200 dark:border-slate-700 p-2 font-bold text-right">Def</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monsters.map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="border border-slate-200 dark:border-slate-700 p-2 text-right text-slate-500">{row.id}</td>
                                            <td className="border border-slate-200 dark:border-slate-700 p-2 font-bold text-indigo-600 dark:text-indigo-400">{row.name}</td>
                                            <td className="border border-slate-200 dark:border-slate-700 p-2">
                                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold 
                                                    ${row.type === 'Fire' ? 'bg-red-100 text-red-600' : 
                                                      row.type === 'Water' ? 'bg-blue-100 text-blue-600' :
                                                      row.type === 'Earth' ? 'bg-emerald-100 text-emerald-600' :
                                                      'bg-slate-200 text-slate-600'}`}>
                                                    {row.type}
                                                </span>
                                            </td>
                                            <td className={`border border-slate-200 dark:border-slate-700 p-2 text-right ${row.hp > 200 ? 'bg-red-100 dark:bg-red-900/30 font-bold text-red-600' : ''}`}>{row.hp}</td>
                                            <td className="border border-slate-200 dark:border-slate-700 p-2 text-right">{row.atk}</td>
                                            <td className="border border-slate-200 dark:border-slate-700 p-2 text-right">{row.def}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200 rounded border border-indigo-100 dark:border-indigo-800">
                                <span className="font-bold block mb-1">💡 Observación:</span>
                                Mira los datos. ¿Notas algo extraño en el <strong>Slime</strong>? Tiene 250 HP pero muy poco ataque. Parece un tanque de vida (Outlier).
                            </div>
                        </div>
                    )}

                    {/* VIEW: DESCRIBE */}
                    {activeTab === 'describe' && (
                        <div className="animate-fade-in">
                            <table className="w-full border-collapse border border-slate-200 dark:border-slate-700">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800">
                                        <th className="border border-slate-200 dark:border-slate-700 p-2 text-right"></th>
                                        <th className="border border-slate-200 dark:border-slate-700 p-2 text-right">HP</th>
                                        <th className="border border-slate-200 dark:border-slate-700 p-2 text-right">Atk</th>
                                        <th className="border border-slate-200 dark:border-slate-700 p-2 text-right">Def</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        {idx: "count", h: "8.00", a: "8.00", d: "8.00"},
                                        {idx: "mean", h: "111.87", a: "25.00", d: "18.50"},
                                        {idx: "std", h: "75.40", a: "18.30", d: "14.60"},
                                        {idx: "min", h: "45.00", a: "5.00", d: "5.00"},
                                        {idx: "25%", h: "56.25", a: "14.25", d: "9.50"},
                                        {idx: "50%", h: "95.00", a: "19.00", d: "12.50"},
                                        {idx: "75%", h: "127.50", a: "30.00", d: "22.50"},
                                        {idx: "max", h: "250.00", a: "60.00", d: "50.00"},
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                            <td className="border border-slate-200 dark:border-slate-700 p-2 font-bold text-slate-500">{row.idx}</td>
                                            <td className={`border border-slate-200 dark:border-slate-700 p-2 text-right font-mono ${row.idx === 'max' ? 'bg-red-50 dark:bg-red-900/10 font-bold text-red-500' : ''}`}>{row.h}</td>
                                            <td className="border border-slate-200 dark:border-slate-700 p-2 text-right font-mono">{row.a}</td>
                                            <td className="border border-slate-200 dark:border-slate-700 p-2 text-right font-mono">{row.d}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                             <div className="mt-4 p-4 bg-pink-50 dark:bg-pink-900/20 text-pink-800 dark:text-pink-200 rounded border border-pink-100 dark:border-pink-800">
                                <span className="font-bold block mb-1">💡 Análisis de Estadísticas:</span>
                                El HP máximo (250) es mucho mayor que el promedio (111). ¡Confirmamos que hay un <strong>Outlier</strong> inflando la media! La mediana (50%) es más fiable aquí.
                            </div>
                        </div>
                    )}

                    {/* VIEW: PLOT */}
                    {activeTab === 'plot' && (
                        <div className="animate-fade-in flex flex-col h-full justify-center px-8">
                             <div className="text-center font-bold mb-4">Distribución de Tipos de Monstruo</div>
                             <div className="flex items-end justify-center gap-8 h-64 border-b-2 border-slate-300 dark:border-slate-600 pb-2">
                                <div className="flex flex-col items-center gap-2 group w-16">
                                   <div className="w-full bg-emerald-400 rounded-t-lg transition-all h-0 animate-slide-up group-hover:bg-emerald-300 relative" style={{height: '150px', animationDelay: '0.1s'}}>
                                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">3 Monsters</div>
                                   </div>
                                   <div className="font-bold text-sm">Earth</div>
                                </div>
                                <div className="flex flex-col items-center gap-2 group w-16">
                                   <div className="w-full bg-blue-400 rounded-t-lg transition-all h-0 animate-slide-up group-hover:bg-blue-300 relative" style={{height: '100px', animationDelay: '0.2s'}}>
                                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">2 Monsters</div>
                                   </div>
                                   <div className="font-bold text-sm">Water</div>
                                </div>
                                <div className="flex flex-col items-center gap-2 group w-16">
                                   <div className="w-full bg-slate-400 rounded-t-lg transition-all h-0 animate-slide-up group-hover:bg-slate-300 relative" style={{height: '100px', animationDelay: '0.3s'}}>
                                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">2 Monsters</div>
                                   </div>
                                   <div className="font-bold text-sm">Undead</div>
                                </div>
                                <div className="flex flex-col items-center gap-2 group w-16">
                                   <div className="w-full bg-red-400 rounded-t-lg transition-all h-0 animate-slide-up group-hover:bg-red-300 relative" style={{height: '50px', animationDelay: '0.4s'}}>
                                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">1 Monster</div>
                                   </div>
                                   <div className="font-bold text-sm">Fire</div>
                                </div>
                             </div>
                             <div className="mt-8 p-4 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-800 dark:text-cyan-200 rounded border border-cyan-100 dark:border-cyan-800">
                                <span className="font-bold block mb-1">💡 Gráfico de Barras:</span>
                                Ideal para variables categóricas. Vemos rápidamente que la mazmorra está dominada por monstruos de tipo <strong>Tierra (Earth)</strong>.
                            </div>
                        </div>
                    )}

                    {/* VIEW: CORR */}
                    {activeTab === 'corr' && (
                        <div className="animate-fade-in flex flex-col items-center">
                            <div className="text-center font-bold mb-6">Matriz de Correlación (Heatmap)</div>
                            <div className="grid grid-cols-4 gap-2 font-mono text-sm max-w-md mx-auto">
                                {/* Header */}
                                <div></div>
                                <div className="text-center font-bold text-slate-500">HP</div>
                                <div className="text-center font-bold text-slate-500">Atk</div>
                                <div className="text-center font-bold text-slate-500">Def</div>

                                {/* Row HP */}
                                <div className="font-bold text-slate-500 flex items-center justify-end pr-2">HP</div>
                                <div className="h-16 w-16 bg-red-600 text-white flex items-center justify-center rounded transition-transform hover:scale-110 cursor-help" title="Correlación Perfecta">1.0</div>
                                <div className="h-16 w-16 bg-blue-200 text-slate-800 flex items-center justify-center rounded transition-transform hover:scale-110 cursor-help" title="Correlación Negativa Débil">-0.4</div>
                                <div className="h-16 w-16 bg-red-200 text-slate-800 flex items-center justify-center rounded transition-transform hover:scale-110 cursor-help" title="Correlación Positiva Débil">0.2</div>

                                {/* Row Atk */}
                                <div className="font-bold text-slate-500 flex items-center justify-end pr-2">Atk</div>
                                <div className="h-16 w-16 bg-blue-200 text-slate-800 flex items-center justify-center rounded transition-transform hover:scale-110 cursor-help" title="Correlación Negativa Débil">-0.4</div>
                                <div className="h-16 w-16 bg-red-600 text-white flex items-center justify-center rounded transition-transform hover:scale-110 cursor-help" title="Correlación Perfecta">1.0</div>
                                <div className="h-16 w-16 bg-red-400 text-white flex items-center justify-center rounded transition-transform hover:scale-110 cursor-help" title="Correlación Positiva Media">0.5</div>

                                {/* Row Def */}
                                <div className="font-bold text-slate-500 flex items-center justify-end pr-2">Def</div>
                                <div className="h-16 w-16 bg-red-200 text-slate-800 flex items-center justify-center rounded transition-transform hover:scale-110 cursor-help" title="Correlación Positiva Débil">0.2</div>
                                <div className="h-16 w-16 bg-red-400 text-white flex items-center justify-center rounded transition-transform hover:scale-110 cursor-help" title="Correlación Positiva Media">0.5</div>
                                <div className="h-16 w-16 bg-red-600 text-white flex items-center justify-center rounded transition-transform hover:scale-110 cursor-help" title="Correlación Perfecta">1.0</div>
                            </div>

                             <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 rounded border border-purple-100 dark:border-purple-800 w-full">
                                <span className="font-bold block mb-1">💡 Interpretación:</span>
                                <strong>Correlación Negativa (-0.4)</strong> entre HP y Ataque (Azul Claro): Los monstruos con mucha vida (como el Slime) tienden a pegar flojo.
                                <br/>
                                <strong>Correlación Positiva (0.5)</strong> entre Ataque y Defensa (Rojo Claro): Los monstruos fuertes también suelen ser duros.
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
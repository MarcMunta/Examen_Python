import React, { useState, useEffect } from 'react';
import { Trophy, ShieldAlert, Skull, Play, ArrowRight, RefreshCw, CheckCircle, XCircle, Lightbulb, BookOpen, Flame, Star, ArrowDown, LogOut, Home, Crown, Sun, Moon, ListOrdered } from 'lucide-react';
import { GameState, PlayerStats, Level, Question, LeaderboardEntry } from './types';
import { LEVELS, MAX_HP, DAMAGE_PER_MISTAKE } from './constants';
import { Button } from './components/Button';
import { HealthBar } from './components/HealthBar';
import { CodeBlock } from './components/CodeBlock';
import { StudyMode } from './components/StudyMode';
import { LevelMap } from './components/LevelMap';
import { NameModal } from './components/NameModal';
import { Leaderboard } from './components/Leaderboard';
import { supabase } from './supabaseClient';

const QUESTIONS_PER_LEVEL = 7;
const DB_KEY = 'data_dungeon_db_v1';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [gameLevels, setGameLevels] = useState<Level[]>([]);
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [stats, setStats] = useState<PlayerStats>({ hp: MAX_HP, maxHp: MAX_HP, score: 0, streak: 0 });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isShake, setIsShake] = useState(false);
  const [hintRevealed, setHintRevealed] = useState(false);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Leaderboard & User State
  const [playerName, setPlayerName] = useState<string>("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState<string | null>(null);
  const [showLeaderboardPanel, setShowLeaderboardPanel] = useState(false);
  
  // Derived Global High Score for TopBar
  const globalHighScoreEntry = leaderboard.length > 0 ? leaderboard[0] : null;

  // Logic helpers
  const currentLevel = gameLevels.length > 0 ? gameLevels[currentLevelIdx] : LEVELS[0];
  const currentQuestion = currentLevel ? currentLevel.questions[currentQuestionIdx] : LEVELS[0].questions[0];
  const isLastQuestion = currentLevel ? currentQuestionIdx === currentLevel.questions.length - 1 : false;
  const isLastLevel = currentLevelIdx === gameLevels.length - 1;

  const loadLocalLeaderboard = () => {
    const savedDb = localStorage.getItem(DB_KEY);
    if (savedDb) {
      try {
        setLeaderboard(JSON.parse(savedDb));
      } catch (e) {
        console.error("Error parsing DB", e);
      }
    }
  };

  // Load Leaderboard on mount
  useEffect(() => {
    const load = async () => {
      setIsLeaderboardLoading(true);
      setLeaderboardError(null);
      if (supabase) {
        const { data, error } = await supabase
          .from('scores')
          .select('username, score, date')
          .order('score', { ascending: false })
          .limit(50);

        if (error) {
          console.error('Error fetching leaderboard', error);
          setLeaderboardError('No se pudo cargar el ranking global. Mostrando datos locales.');
          loadLocalLeaderboard();
        } else {
          const normalized = (data || []).map(item => ({
            username: item.username,
            score: item.score,
            date: item.date
          })) as LeaderboardEntry[];
          setLeaderboard(normalized);
          localStorage.setItem(DB_KEY, JSON.stringify(normalized));
        }
      } else {
        loadLocalLeaderboard();
      }
      setIsLeaderboardLoading(false);
    };

    load();
  }, []);

  // Theme Toggle Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const saveScoreToDb = async (finalScore: number) => {
    const newEntry: LeaderboardEntry = {
      username: playerName,
      score: finalScore,
      date: new Date().toISOString()
    };

    if (supabase) {
      const { error } = await supabase.from('scores').insert([newEntry]);
      if (error) {
        console.error('Error saving score to Supabase', error);
        setLeaderboardError('No se pudo guardar el score en la nube. Guardando localmente.');
      } else {
        // Refresh leaderboard after successful insert
        const { data } = await supabase
          .from('scores')
          .select('username, score, date')
          .order('score', { ascending: false })
          .limit(50);
        const normalized = (data || []).map(item => ({
          username: item.username,
          score: item.score,
          date: item.date
        })) as LeaderboardEntry[];
        setLeaderboard(normalized);
        localStorage.setItem(DB_KEY, JSON.stringify(normalized));
        return;
      }
    }

    // Fallback: keep local copy
    const newLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 50);
    setLeaderboard(newLeaderboard);
    localStorage.setItem(DB_KEY, JSON.stringify(newLeaderboard));
  };

  const triggerShake = () => {
    setIsShake(true);
    setTimeout(() => setIsShake(false), 500);
  };

  // --- RANDOMIZATION LOGIC ---
  const shuffleQuestionsAndOptions = () => {
    const newLevels = LEVELS.map(level => {
      const shuffledPool = [...level.questions].sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffledPool.slice(0, QUESTIONS_PER_LEVEL);
      const processedQuestions: Question[] = selectedQuestions.map(q => {
        const correctOptionText = q.options[q.correctAnswer];
        const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
        const newCorrectIndex = shuffledOptions.indexOf(correctOptionText);
        return {
          ...q,
          options: shuffledOptions,
          correctAnswer: newCorrectIndex
        };
      });
      return { ...level, questions: processedQuestions };
    });
    setGameLevels(newLevels);
  };

  const handleStartClick = () => {
    setShowNameModal(true);
  };

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    setShowNameModal(false);
    startGameLogic();
  };

  const startGameLogic = () => {
    shuffleQuestionsAndOptions();
    setGameState(GameState.PLAYING);
    setStats({ hp: MAX_HP, maxHp: MAX_HP, score: 0, streak: 0 });
    setCurrentLevelIdx(0);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setHintRevealed(false);
  };

  const exitGame = () => {
    // Removed confirmation to prevent issues in strict environments
    setGameState(GameState.START);
  }

  const goToStudyMode = () => {
    setGameState(GameState.STUDY);
  };

  const useHint = () => {
    if (!hintRevealed) {
      setHintRevealed(true);
    }
  };

  const handleAnswer = (optionIdx: number) => {
    setSelectedOption(optionIdx);
    setGameState(GameState.FEEDBACK);

    if (optionIdx !== currentQuestion.correctAnswer) {
      // Wrong answer
      triggerShake();
      setStats(prev => {
        const newHp = Math.max(0, prev.hp - DAMAGE_PER_MISTAKE);
        return { ...prev, hp: newHp, streak: 0 };
      });
    } else {
      // Correct answer
      setStats(prev => {
        const newStreak = prev.streak + 1;
        const streakBonus = prev.streak * 20; 
        return { 
          ...prev, 
          score: prev.score + 100 + streakBonus,
          streak: newStreak
        };
      });
    }
  };

  const nextStep = () => {
    // Check if dead
    if (stats.hp <= 0) {
      setGameState(GameState.GAME_OVER);
      saveScoreToDb(stats.score);
      return;
    }

    // Reset selection & hint
    setSelectedOption(null);
    setHintRevealed(false);

    if (currentQuestionIdx < currentLevel.questions.length - 1) {
      // Next question
      setCurrentQuestionIdx(prev => prev + 1);
      setGameState(GameState.PLAYING);
    } else {
      // Level Complete
      if (currentLevelIdx < gameLevels.length - 1) {
        setGameState(GameState.LEVEL_TRANSITION);
      } else {
        // Victory
        saveScoreToDb(stats.score);
        setGameState(GameState.VICTORY);
      }
    }
  };

  const proceedToNextLevel = () => {
    setCurrentLevelIdx(prev => prev + 1);
    setCurrentQuestionIdx(0);
    setGameState(GameState.PLAYING);
  };

  // --- GLOBAL TOP-RIGHT CONTROLS ---
  const FloatingControls = () => (
    <>
      <div className="fixed top-4 right-4 z-[100] flex items-center gap-2">
        <button
          onClick={() => setShowLeaderboardPanel(true)}
          className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-indigo-200 border border-slate-300 dark:border-slate-600 shadow-lg hover:scale-110 transition-transform"
          title="Ver clasificación"
        >
          <ListOrdered size={20} />
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-yellow-400 border border-slate-300 dark:border-slate-600 shadow-lg hover:scale-110 transition-transform"
          title={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {showLeaderboardPanel && (
        <div className="fixed inset-0 z-[110] flex items-start justify-end p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setShowLeaderboardPanel(false)}
          />
          
          <div className="relative w-full max-w-md bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-4 sm:p-6 space-y-3 overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800 shadow-inner">
                  <ListOrdered size={18} />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">Clasificación</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Nombres y puntos / muertes</p>
                </div>
              </div>
              <button
                onClick={() => setShowLeaderboardPanel(false)}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                title="Cerrar ranking"
              >
                <XCircle size={18} />
              </button>
            </div>

            {leaderboardError && (
              <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-3">
                {leaderboardError}
              </div>
            )}

            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
              {isLeaderboardLoading ? (
                <div className="text-sm text-slate-500 dark:text-slate-400">Cargando clasificación...</div>
              ) : leaderboard.length === 0 ? (
                <div className="text-sm text-slate-500 dark:text-slate-400 italic">Aún no hay puntuaciones guardadas.</div>
              ) : (
                leaderboard.map((entry, idx) => (
                  <div 
                    key={`${entry.username}-${entry.date}-${idx}`} 
                    className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                      entry.username === playerName 
                        ? 'bg-indigo-50 dark:bg-indigo-900/40 border-indigo-200 dark:border-indigo-600/50' 
                        : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60'
                    }`}
                  >
                    {(() => {
                      const isPlayerEntry = entry.username === playerName;
                      const isDeathRun = isPlayerEntry && gameState === GameState.GAME_OVER;
                      const valueClasses = isDeathRun
                        ? "text-red-500 dark:text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.9)] animate-pulse"
                        : "text-yellow-600 dark:text-yellow-400";

                      return (
                        <>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-black text-slate-400 dark:text-slate-500 w-6 text-right">{idx + 1}</span>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">{entry.username}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">{new Date(entry.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-black leading-tight ${valueClasses}`}>
                            {isDeathRun ? 'MUERTO' : `${entry.score} pts`}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {isDeathRun ? 'Muertes' : 'Puntos'}
                          </p>
                        </div>
                        </>
                      );
                    })()}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );

  // --- RENDER SCREENS ---

  if (gameState === GameState.STUDY) {
    return (
      <>
        <FloatingControls />
        <StudyMode onBack={() => setGameState(GameState.START)} />
      </>
    );
  }

  if (gameState === GameState.START) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
        <FloatingControls />
        {showNameModal && (
          <NameModal 
            onSubmit={handleNameSubmit} 
            onCancel={() => setShowNameModal(false)} 
          />
        )}

        <div className="crt-scanline hidden dark:block"></div>
        
        {/* Animated Background */}
        <div className="absolute inset-0 bg-white dark:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:from-indigo-900/20 dark:via-slate-950 dark:to-slate-950"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 dark:opacity-5"></div>

        <div className="max-w-3xl w-full text-center space-y-10 z-10 bg-white/80 dark:bg-slate-900/60 p-12 rounded-[2.5rem] backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-[0_0_80px_rgba(79,70,229,0.15)] animate-fade-in text-slate-900 dark:text-slate-100">
          
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="mb-2 inline-block p-8 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-500/50 shadow-2xl relative z-10">
              <Trophy size={72} className="text-indigo-600 dark:text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-slate-800 to-cyan-600 dark:from-indigo-300 dark:via-white dark:to-cyan-300 drop-shadow-sm tracking-tighter">
              DATA DUNGEON
            </h1>
            <div className="flex items-center justify-center gap-4">
               <div className="h-px w-12 bg-indigo-500/50"></div>
               <h2 className="text-xl md:text-2xl text-indigo-700 dark:text-indigo-200 font-mono tracking-[0.2em] uppercase">
                 La Búsqueda del Insight
               </h2>
               <div className="h-px w-12 bg-indigo-500/50"></div>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
            Domina <strong>Python</strong>, <strong>NumPy</strong> y <strong>Pandas</strong> para sobrevivir a un mundo de datos corruptos.
          </p>

          {globalHighScoreEntry && (
            <div className="inline-flex items-center gap-3 bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-500/20 px-6 py-2 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.1)] animate-pulse">
              <Crown size={18} className="text-yellow-600 dark:text-yellow-400" />
              <span className="text-yellow-800 dark:text-yellow-100 font-mono font-bold tracking-wide text-sm">
                RÉCORD MUNDIAL: <span className="text-yellow-600 dark:text-yellow-400">{globalHighScoreEntry.username}</span> ({globalHighScoreEntry.score})
              </span>
            </div>
          )}
          
          <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center">
            <Button onClick={handleStartClick} className="text-lg px-10 py-5 w-full sm:w-auto hover:scale-105 transform transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)]">
              <span className="flex items-center justify-center gap-3 font-black tracking-wider">
                <Play size={24} fill="currentColor" /> COMENZAR MISIÓN
              </span>
            </Button>
            
            <Button onClick={goToStudyMode} variant="secondary" className="text-lg px-10 py-5 w-full sm:w-auto hover:scale-105 transform transition-all border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200">
              <span className="flex items-center justify-center gap-3 font-bold tracking-wider">
                <BookOpen size={24} /> BIBLIOTECA
              </span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === GameState.LEVEL_TRANSITION) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors">
        <FloatingControls />
        <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/20 backdrop-blur-sm z-0"></div>
        <div className="max-w-lg w-full bg-white dark:bg-slate-900/90 border border-indigo-200 dark:border-indigo-500/50 rounded-3xl p-10 shadow-2xl dark:shadow-[0_0_60px_rgba(99,102,241,0.2)] z-10 text-center space-y-8 animate-slide-up backdrop-blur-xl">
          
          <div className="inline-block bg-green-100 dark:bg-green-500/20 p-6 rounded-full mb-2 ring-4 ring-green-200 dark:ring-green-500/10">
             <CheckCircle size={56} className="text-green-600 dark:text-green-400" />
          </div>
          
          <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">¡Nivel {currentLevel.id} Completado!</h2>
            <p className="text-indigo-600 dark:text-indigo-300 font-medium">{currentLevel.title}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
             <div className="space-y-1">
               <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Puntuación Total</p>
               <p className="text-3xl text-yellow-600 dark:text-yellow-400 font-mono font-bold">{stats.score}</p>
             </div>
             <div className="space-y-1 text-right">
               <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Vida Restante</p>
               <p className="text-3xl text-green-600 dark:text-green-400 font-mono font-bold">{stats.hp}</p>
             </div>
             <div className="col-span-2 border-t border-slate-200 dark:border-slate-800 pt-4 mt-2">
               <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                 Próximo desafío: <span className="text-red-600 dark:text-red-400 font-bold uppercase tracking-wide">{gameLevels[currentLevelIdx + 1]?.monsterName}</span>
               </p>
             </div>
          </div>

          <Button onClick={proceedToNextLevel} fullWidth className="animate-pulse shadow-xl py-4">
            <span className="flex items-center justify-center gap-2 font-bold">
              DESCENDER AL SIGUIENTE NIVEL <ArrowDown size={20} />
            </span>
          </Button>
        </div>
      </div>
    );
  }

  // --- GAME_OVER & VICTORY ---

  if (gameState === GameState.GAME_OVER) {
    return (
      <div className="min-h-screen bg-red-50 dark:bg-red-950/30 flex flex-col items-center justify-center p-4 relative overflow-hidden overflow-y-auto">
        <FloatingControls />
        <div className="crt-scanline opacity-50 hidden dark:block"></div>
        <div className="absolute inset-0 bg-white dark:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:from-red-900/20 dark:via-slate-950 dark:to-slate-950 fixed"></div>

        <div className="max-w-4xl w-full text-center bg-white/90 dark:bg-slate-900/90 p-8 md:p-10 rounded-3xl border border-red-200 dark:border-red-500/50 shadow-2xl space-y-8 animate-slide-up backdrop-blur-xl relative z-[60] my-10 text-slate-900 dark:text-white">
          <div className="relative inline-block">
             <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 animate-pulse"></div>
             <Skull size={80} className="text-red-600 dark:text-red-500 mx-auto relative z-10" />
          </div>
          
          <div>
            <h1 className="text-5xl font-black text-red-600 dark:text-red-500 tracking-tighter mb-2">GAME OVER</h1>
            <p className="text-red-800/70 dark:text-red-200/70 font-medium">
              Tus modelos han fallado en producción, {playerName}.
            </p>
          </div>

          <div className="flex justify-center mb-6">
             <div className="bg-slate-100 dark:bg-slate-950/50 px-8 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
               <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Puntuación Final</p>
               <p className="text-4xl font-mono text-yellow-600 dark:text-yellow-400 font-bold">{stats.score}</p>
             </div>
          </div>

          <Leaderboard entries={leaderboard} currentPlayerName={playerName} />

          <div className="flex flex-col gap-4 max-w-md mx-auto">
             <Button onClick={handleStartClick} variant="danger" fullWidth className="py-4 shadow-red-900/50">
              <span className="flex items-center justify-center gap-2 font-bold tracking-wider">
                <RefreshCw size={20} /> REINTENTAR
              </span>
            </Button>
            <Button onClick={() => setGameState(GameState.START)} variant="secondary" fullWidth className="py-4 border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              MENÚ PRINCIPAL
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === GameState.VICTORY) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden overflow-y-auto">
        <FloatingControls />
        {/* Confetti Particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="confetti absolute top-0"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              backgroundColor: ['#fbbf24', '#f472b6', '#34d399', '#60a5fa', '#a78bfa'][Math.floor(Math.random() * 5)],
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.5,
            }}
          />
        ))}

        <div className="max-w-4xl w-full text-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-yellow-500/40 shadow-2xl space-y-8 z-[60] transform transition-all duration-500 my-10">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full animate-pulse"></div>
            <Trophy size={100} className="text-yellow-500 mx-auto animate-bounce" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 tracking-tighter">
              ¡MISIÓN CUMPLIDA!
            </h1>
            <p className="text-slate-600 dark:text-slate-300 font-medium text-lg">
              Dataset limpiado. Insights encontrados. ¡Bien hecho, {playerName}!
            </p>
          </div>

          <div className="flex justify-center gap-6">
            <div className="bg-slate-100 dark:bg-slate-950/50 px-8 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
               <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Puntuación</p>
               <p className="text-4xl font-mono text-yellow-600 dark:text-yellow-400 font-bold drop-shadow-sm">{stats.score}</p>
            </div>
          </div>

          <Leaderboard entries={leaderboard} currentPlayerName={playerName} />
          
          <div className="flex flex-col gap-4 max-w-md mx-auto">
             <Button onClick={handleStartClick} variant="success" fullWidth className="animate-pulse py-4 text-lg font-black tracking-widest shadow-lg shadow-green-900/40">
               JUGAR DE NUEVO
             </Button>
             <Button onClick={() => setGameState(GameState.START)} variant="secondary" fullWidth className="py-4 border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
               MENÚ PRINCIPAL
             </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- PLAYING & FEEDBACK STATES ---
  
  const isFeedback = gameState === GameState.FEEDBACK;
  const isCorrect = selectedOption === currentQuestion.correctAnswer;
  // If feedback is active, add huge padding bottom so users can scroll to see options C and D behind the overlay
  const mainContainerClass = isFeedback ? "pb-72 lg:pb-64 transition-all duration-300" : "pb-0 transition-all duration-300";

  return (
    <div className={`min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col ${isShake ? 'shake' : ''} overflow-x-hidden transition-colors`}>
      <FloatingControls />
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-indigo-900/10 dark:via-slate-950 dark:to-slate-950 pointer-events-none fixed"></div>

      {/* Header / HUD */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 p-4 sticky top-0 z-40 shadow-lg transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between pr-12">
          
          {/* Left: Level Progress */}
          <div className="flex items-center gap-6 w-full md:w-auto">
             <button 
                onClick={exitGame}
                className="flex items-center gap-2 px-3 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-900/50 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-300 rounded-lg transition-all border border-slate-300 dark:border-slate-700 hover:border-red-400 group shadow-sm"
                title="Abandonar Misión"
             >
                <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold text-xs uppercase tracking-wider hidden sm:inline">Salir</span>
             </button>

             <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                   <h3 className="text-sm text-indigo-600 dark:text-indigo-300 font-bold tracking-widest uppercase truncate max-w-[150px] sm:max-w-xs">
                     {currentLevel.title}
                   </h3>
                   <span className="text-xs text-slate-500 font-mono">Lvl {currentLevelIdx + 1}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-1 w-32 md:w-48">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    style={{ width: `${((currentQuestionIdx) / currentLevel.questions.length) * 100}%` }}
                  />
                </div>
             </div>
          </div>
          
          {/* Right: Stats */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
             {/* Show Global High Score info if available */}
             <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
               <Trophy size={12} className="text-yellow-500" />
               <span>TOP: {globalHighScoreEntry ? `${globalHighScoreEntry.username} (${globalHighScoreEntry.score})` : '---'}</span>
             </div>

             <div className="h-6 w-px bg-slate-300 dark:bg-slate-800 hidden lg:block"></div>

             {stats.streak > 1 && (
                <div className="hidden sm:flex items-center gap-1 text-orange-500 dark:text-orange-400 animate-pulse font-black italic bg-orange-100 dark:bg-orange-900/20 px-3 py-1 rounded-full border border-orange-200 dark:border-orange-500/30">
                  <Flame size={16} fill="currentColor" />
                  <span>COMBO x{stats.streak}</span>
                </div>
             )}
             
             <div className="bg-slate-100 dark:bg-slate-800/50 px-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
                <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-bold">Score</span>
                <span className="text-yellow-600 dark:text-yellow-400 font-mono font-bold text-lg drop-shadow-sm">{stats.score}</span>
             </div>
             <HealthBar current={stats.hp} max={stats.maxHp} />
          </div>
        </div>
      </header>

      {/* Main Game Grid Layout */}
      <main className={`flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 relative z-10 items-start ${mainContainerClass}`}>
        
        {/* CENTER COLUMN: Battle Area */}
        <div className="flex flex-col gap-6">
          
          {/* Monster Display */}
          <div className="flex flex-col items-center justify-center py-6 relative group">
            {/* Monster Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/10 blur-[50px] rounded-full group-hover:bg-indigo-500/20 transition-colors duration-1000"></div>
            
            <style>{`
              @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-15px); }
                100% { transform: translateY(0px); }
              }
            `}</style>
            
            <div style={{ animation: 'float 4s ease-in-out infinite' }} className="text-9xl filter drop-shadow-xl dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] relative z-10 transition-transform duration-300">
              {currentLevel.monsterEmoji}
            </div>
            
            <div className="mt-4 text-center relative z-10">
               <h2 className="text-3xl font-black text-slate-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:to-slate-400 drop-shadow-sm">{currentLevel.monsterName}</h2>
               <div className="inline-block bg-white/80 dark:bg-slate-900/80 px-4 py-1 rounded-full text-xs font-mono text-red-500 dark:text-red-300 mt-2 border border-red-200 dark:border-red-500/30 shadow-lg">
                  ENEMIGO {currentQuestionIdx + 1} <span className="text-slate-400 dark:text-slate-600">/</span> {currentLevel.questions.length}
               </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden group transition-colors duration-500">
            
            <div className="flex justify-between items-start gap-4 mb-6 relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {currentQuestion.text}
              </h3>
              
              {/* Hint Button */}
              {!isFeedback && (
                <button 
                  onClick={useHint}
                  disabled={hintRevealed}
                  className={`
                    flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all shrink-0
                    ${hintRevealed 
                      ? 'bg-yellow-100 dark:bg-yellow-500/10 border-yellow-300 dark:border-yellow-500/30 text-yellow-600/50 dark:text-yellow-200/50 cursor-default' 
                      : 'bg-slate-100 dark:bg-slate-800/80 border-slate-300 dark:border-slate-600 text-yellow-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-yellow-400'
                    }
                  `}
                  title="Solicitar Pista"
                >
                  <Lightbulb size={22} className={hintRevealed ? "fill-yellow-600 dark:fill-yellow-200" : "fill-none"} />
                </button>
              )}
            </div>

            {currentQuestion.codeSnippet && (
              <div className="relative z-10 shadow-2xl">
                <CodeBlock code={currentQuestion.codeSnippet} />
              </div>
            )}

            {/* HINT REVEAL AREA */}
            {hintRevealed && (
              <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-500/20 p-4 rounded-xl flex items-start gap-3 animate-fade-in relative z-10">
                <div className="bg-yellow-100 dark:bg-yellow-500/20 p-1.5 rounded-full shrink-0">
                   <Lightbulb size={16} className="text-yellow-600 dark:text-yellow-400" />
                </div>
                <p className="text-yellow-800 dark:text-yellow-100 text-sm italic leading-relaxed">
                  <span className="font-bold text-yellow-600 dark:text-yellow-400 block text-xs uppercase tracking-wider mb-1">Pista del Oráculo</span>
                  {currentQuestion.hint}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3 mt-6 relative z-10">
              {currentQuestion.options.map((option, idx) => {
                let btnClass = "text-left justify-start h-auto p-5 border-l-[6px] backdrop-blur-md ";
                
                if (isFeedback) {
                  if (idx === currentQuestion.correctAnswer) {
                    btnClass += "bg-emerald-100 dark:bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-white font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)]"; 
                  } else if (idx === selectedOption) {
                    btnClass += "bg-red-100 dark:bg-red-500/20 border-red-500 text-red-900 dark:text-red-200 opacity-90";
                  } else {
                    btnClass += "bg-slate-100 dark:bg-slate-800/40 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 opacity-40";
                  }
                } else {
                  btnClass += "bg-slate-100 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700/80 hover:border-indigo-400 hover:pl-6 hover:shadow-lg transition-all text-slate-800 dark:text-slate-200";
                }

                return (
                  <button
                    key={idx}
                    disabled={isFeedback}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full rounded-xl transition-all duration-300 flex items-center gap-4 group ${btnClass}`}
                  >
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-bold transition-colors
                      ${isFeedback && idx === currentQuestion.correctAnswer ? 'bg-emerald-500 text-emerald-950' : 'bg-slate-200 dark:bg-slate-950/50 text-slate-500 group-hover:bg-indigo-500 group-hover:text-white'}
                    `}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-base md:text-lg leading-snug">{option}</span>
                    {isFeedback && idx === currentQuestion.correctAnswer && <CheckCircle className="ml-auto text-emerald-500 dark:text-emerald-400 shrink-0" size={24} />}
                    {isFeedback && idx === selectedOption && idx !== currentQuestion.correctAnswer && <XCircle className="ml-auto text-red-500 dark:text-red-400 shrink-0" size={24} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Vertical Map */}
        <div className="hidden lg:block sticky top-24">
          <LevelMap levels={gameLevels} currentLevelIdx={currentLevelIdx} />
        </div>
        
      </main>

      {/* Feedback Overlay */}
      {isFeedback && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
           <div className={`h-1.5 w-full ${isCorrect ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]' : 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]'}`}></div>
           
           <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-6 md:p-8 border-t border-slate-200 dark:border-slate-800">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center">
                
                <div className={`p-4 rounded-full border-4 shrink-0 shadow-lg ${isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500/50 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 border-red-500/50 text-red-600 dark:text-red-400'}`}>
                   {isCorrect ? <CheckCircle size={40} /> : <ShieldAlert size={40} />}
                </div>

                <div className="flex-1 space-y-2 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3">
                    <h3 className={`text-2xl font-black italic tracking-tighter uppercase ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {isCorrect ? "¡CORRECTO!" : "FALLO DE SISTEMA"}
                    </h3>
                    {!isCorrect && <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">- {DAMAGE_PER_MISTAKE} HP</span>}
                  </div>
                  
                  {/* Explicitly show correct answer if wrong, so users know without scrolling */}
                  {!isCorrect && (
                    <div className="text-sm bg-slate-100 dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700 inline-block md:block mb-2">
                       <span className="font-bold text-slate-500 uppercase text-xs mr-2">La respuesta correcta era:</span>
                       <span className="text-emerald-600 dark:text-emerald-400 font-bold">{currentQuestion.options[currentQuestion.correctAnswer]}</span>
                    </div>
                  )}

                  <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed max-w-3xl">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase text-xs tracking-wider block mb-1">Explicación</span>
                    {currentQuestion.explanation}
                  </p>
                </div>

                <Button 
                  onClick={nextStep} 
                  variant={stats.hp <= 0 ? 'danger' : isCorrect ? 'success' : 'primary'}
                  className="w-full md:w-auto whitespace-nowrap px-8 py-4 text-lg shadow-xl"
                >
                  {stats.hp <= 0 ? (
                    "VER RESULTADO"
                  ) : (
                     <span className="flex items-center gap-2">
                       {isLastQuestion && isLastLevel ? 'RECLAMAR VICTORIA' : 'CONTINUAR'} <ArrowRight size={20} />
                     </span>
                  )}
                </Button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;

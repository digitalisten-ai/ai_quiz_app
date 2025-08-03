import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw, Trophy, Brain, Target, BookOpen, Clock, Award, CheckCircle, XCircle, Star } from 'lucide-react';

const QuizApp = () => {
  const [currentTest, setCurrentTest] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showDetailedResults, setShowDetailedResults] = useState(false); // ✅ Rätt plats

  // Quiz data structure
  const quizData = [
    {
      title: "Grundläggande Statistik",
      subtitle: "Fundamentala koncept inom statistisk analys",
      icon: "📊",
      gradient: "from-blue-600 via-purple-600 to-indigo-800",
      questions: [
        {
          id: "q1_1",
          question: "Vad är den fundamentala skillnaden mellan parametrisk och icke-parametrisk statistik?",
          type: "essay",
          points: 5,
          difficulty: "medium",
          hint: "Tänk på antaganden om datafördelning",
          correctAnswer: "Parametrisk statistik antar att data följer en viss fördelning (ofta normalfördelning), medan icke-parametrisk statistik inte kräver sådana antaganden."
        },
        {
          id: "q1_2", 
          question: "Varför räcker det inte att bara visuellt jämföra stapelhöjder för att avgöra statistisk signifikans?",
          type: "multiple",
          points: 4,
          difficulty: "easy",
          options: [
            "Visuella skillnader garanterar inte statistisk signifikans - skillnaden kan bero på slumpen",
            "Stapeldiagram är alltid missvisande och bör aldrig användas",
            "Man behöver alltid använda histogram istället för stapeldiagram",
            "Färgerna på staplarna påverkar den statistiska tolkningen"
          ],
          correctAnswer: 0,
          explanation: "Visuella skillnader visar bara beskrivande statistik. För att veta om skillnaden är statistiskt signifikant behöver vi inferentiell statistik som t-test eller ANOVA."
        },
        {
          id: "q1_3",
          question: "Vilka är huvudstegen när du arbetar med ett helt nytt dataset?",
          type: "essay",
          points: 5,
          difficulty: "medium",
          hint: "Tänk systematiskt från första intryck till slutlig rapportering",
          correctAnswer: "1) Förstå syftet 2) Dataförberedelse 3) Explorativ dataanalys (EDA) 4) Feature engineering 5) Modellering 6) Validering 7) Rapportering"
        },
        {
          id: "q1_4",
          question: "Vad är skillnaden mellan PCA och t-SNE som dimensionsreduktionstekniker?",
          type: "multiple",
          points: 4,
          difficulty: "medium",
          options: [
            "PCA bevarar global varians, t-SNE bevarar lokala klusterstrukturer",
            "PCA används endast för klassificering, t-SNE endast för regression", 
            "PCA är en parametrisk metod, t-SNE är icke-parametrisk",
            "Det finns ingen praktisk skillnad mellan metoderna"
          ],
          correctAnswer: 0,
          explanation: "PCA fokuserar på att bevara maximal varians i data, medan t-SNE fokuserar på att bevara lokala klusterstrukturer och är bättre för visualisering."
        }
      ]
    },
    {
      title: "Machine Learning Grunder",
      subtitle: "Supervised och unsupervised learning",
      icon: "🤖", 
      gradient: "from-emerald-600 via-teal-600 to-cyan-800",
      questions: [
        {
          id: "q2_1",
          question: "Vad kännetecknar supervised machine learning?",
          type: "multiple",
          points: 4,
          difficulty: "easy",
          options: [
            "Tränas på data med kända utfall (labels) för att göra prediktioner",
            "Arbetar utan någon träningsdata alls",
            "Övervakas av en människa under körning",
            "Används bara för klassificering, aldrig regression"
          ],
          correctAnswer: 0,
          explanation: "I supervised learning tränar vi modellen på data där vi redan vet det korrekta svaret (labels)."
        },
        {
          id: "q2_2",
          question: "Vad modellerar logistisk regression egentligen?",
          type: "multiple", 
          points: 4,
          difficulty: "easy",
          options: [
            "Kontinuerliga numeriska värden som huspriser",
            "Sannolikheten för kategoriska utfall som ja/nej",
            "Tidsserier och säsongsvariation",
            "Klusterstrukturer och gruppering av datapunkter"
          ],
          correctAnswer: 1,
          explanation: "Logistisk regression modellerar sannolikheten för kategoriska utfall genom den logistiska funktionen."
        },
        {
          id: "q2_3",
          question: "Vad gör survival analysis speciell jämfört med andra analysmetoder?",
          type: "essay",
          points: 5,
          difficulty: "hard",
          correctAnswer: "Survival analysis analyserar tid till händelse och kan hantera censurerade data (ofullständiga observationer).",
          hint: "Tänk på vad som händer när vi inte kan observera slutresultatet för alla"
        },
        {
          id: "q2_4",
          question: "Varför kan 95% accuracy vara missvisande?",
          type: "essay", 
          points: 5,
          difficulty: "medium",
          correctAnswer: "Vid obalanserade dataset kan en modell uppnå hög accuracy genom att bara förutsäga majoritetsklassen, men missa minoritetsklassen helt.",
          hint: "Tänk på ett dataset med 95% av en klass och 5% av en annan"
        }
      ]
    },
    {
      title: "Avancerade ML-algoritmer",
      subtitle: "Ensemble methods och optimering",
      icon: "🌳",
      gradient: "from-violet-600 via-purple-600 to-fuchsia-800",
      questions: [
        {
          id: "q3_1",
          question: "Vad är skillnaden mellan Random Forest och XGBoost?",
          type: "multiple",
          points: 5,
          difficulty: "medium",
          options: [
            "Random Forest använder bagging (parallell), XGBoost använder boosting (sekventiell)",
            "Random Forest är endast för regression, XGBoost endast för klassificering",
            "Random Forest är alltid snabbare än XGBoost",
            "Det finns ingen praktisk skillnad mellan algoritmerna"
          ],
          correctAnswer: 0,
          explanation: "Random Forest bygger många oberoende träd parallellt (bagging), medan XGBoost bygger träd sekventiellt där varje träd korrigerar föregående träds fel (boosting)."
        },
        {
          id: "q3_2",
          question: "Vad är Grid Search största begränsning?",
          type: "multiple",
          points: 4,
          difficulty: "easy",
          options: [
            "Den hittar alltid den optimala lösningen",
            "Den är extremt tidskrävande med många parametrar", 
            "Den kan endast användas med träd-baserade algoritmer",
            "Den kräver för mycket RAM-minne"
          ],
          correctAnswer: 1,
          explanation: "Grid Search testar alla kombinationer systematiskt, vilket blir exponentiellt tidskrävande."
        },
        {
          id: "q3_3",
          question: "Varför är permutation importance ofta mer tillförlitlig än traditionell feature importance?",
          type: "essay",
          points: 5,
          difficulty: "hard",
          correctAnswer: "Permutation importance mäter hur mycket modellens prestanda försämras när en variabel slumpas om, vilket ger en mer robust mätning av variabelns faktiska påverkan på prediktioner.",
          hint: "Tänk på vad som händer när vi 'saboterar' en variabel genom att blanda om dess värden"
        }
      ]
    },
    {
      title: "Neurala Nätverk",
      subtitle: "Arkitekturer och träning",
      icon: "🧠",
      gradient: "from-rose-600 via-pink-600 to-orange-800",
      questions: [
        {
          id: "q4_1", 
          question: "Vilka är de tre huvudlagren i ett neuralt nätverk?",
          type: "essay",
          points: 4,
          difficulty: "easy",
          correctAnswer: "Input layer (tar emot data), Hidden layers (bearbetar genom vikter och aktiveringsfunktioner), Output layer (ger resultat).",
          hint: "Tänk på informationsflödet från data till resultat"
        },
        {
          id: "q4_2",
          question: "Varför behöver neurala nätverk aktiveringsfunktioner?",
          type: "multiple",
          points: 4,
          difficulty: "medium",
          options: [
            "För att optimera beräkningshastigheten",
            "För att introducera icke-linjäritet och möjliggöra lärande av komplexa mönster",
            "För att minska minnesförbrukningen", 
            "För att visualisera nätverkets interna tillstånd"
          ],
          correctAnswer: 1,
          explanation: "Utan aktiveringsfunktioner skulle nätverket bara vara linjära transformationer. Aktiveringsfunktioner introducerar icke-linjäritet."
        },
        {
          id: "q4_3",
          question: "Förklara skillnaden mellan Forward och Backpropagation.",
          type: "essay",
          points: 5,
          difficulty: "medium",
          correctAnswer: "Forward propagation: data flödar framåt för att generera output. Backpropagation: felet propageras bakåt för att uppdatera vikterna.",
          hint: "Tänk på två riktningar av informationsflöde"
        },
        {
          id: "q4_4",
          question: "Hur fungerar Dropout som regulariseringsteknik?",
          type: "multiple",
          points: 4,
          difficulty: "medium",
          options: [
            "Tar bort hela lager permanent",
            "Stänger av slumpmässiga noder under träning för att förhindra överanpassning",
            "Minskar learning rate gradvis",
            "Ökar antalet hidden layers"
          ],
          correctAnswer: 1,
          explanation: "Dropout stänger slumpmässigt av noder under träning, vilket förbättrar generaliseringsförmågan."
        }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const handleAnswer = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const getCurrentQuestion = () => {
    return quizData[currentTest]?.questions[currentQuestion];
  };

  const nextQuestion = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      const currentQuestions = quizData[currentTest].questions;
      if (currentQuestion < currentQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else if (currentTest < quizData.length - 1) {
        setCurrentTest(currentTest + 1);
        setCurrentQuestion(0);
      } else {
        setShowResults(true);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const prevQuestion = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      } else if (currentTest > 0) {
        setCurrentTest(currentTest - 1);
        setCurrentQuestion(quizData[currentTest - 1].questions.length - 1);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;
    let correctAnswers = 0;
    let totalQuestions = 0;
    
    quizData.forEach(test => {
      test.questions.forEach(q => {
        totalQuestions++;
        maxScore += q.points;
        const userAnswer = userAnswers[q.id];
        
        if (q.type === 'multiple' && userAnswer === q.correctAnswer) {
          totalScore += q.points;
          correctAnswers++;
        } else if (q.type === 'essay' && userAnswer && userAnswer.length > 10) {
          totalScore += Math.ceil(q.points * 0.8);
          correctAnswers++;
        }
      });
    });
    
    return { 
      totalScore, 
      maxScore, 
      correctAnswers,
      totalQuestions,
      percentage: Math.round((totalScore / maxScore) * 100) 
    };
  };

  const resetQuiz = () => {
    setCurrentTest(0);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setStartTime(Date.now());
    setTimeSpent(0);
    setIsTransitioning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getGradeEmoji = (percentage) => {
    if (percentage >= 95) return '🏆';
    if (percentage >= 85) return '🥇';
    if (percentage >= 75) return '🥈';
    if (percentage >= 65) return '🥉';
    if (percentage >= 50) return '📚';
    return '💪';
  };

  if (showResults) {
    const score = calculateScore();
  
    const getQuestionResult = (question) => {
      const userAnswer = userAnswers[question.id];
      let isCorrect = false;
      let earnedPoints = 0;
      
      if (question.type === 'multiple') {
        isCorrect = userAnswer === question.correctAnswer;
        earnedPoints = isCorrect ? question.points : 0;
      } else if (question.type === 'essay') {
        isCorrect = userAnswer && userAnswer.length > 10;
        earnedPoints = isCorrect ? Math.ceil(question.points * 0.8) : 0;
      }
  
      return { isCorrect, earnedPoints, userAnswer };
    };
  

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-6 shadow-lg animate-bounce">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-4">
                Quiz Genomförd! {getGradeEmoji(score.percentage)}
              </h1>
              
              <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 animate-pulse">
                {score.percentage}%
              </div>
              
              <div className="space-y-2">
                <p className="text-2xl text-gray-700 font-semibold">
                  {score.totalScore} av {score.maxScore} poäng
                </p>
                <p className="text-lg text-gray-500 flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5" />
                  Tid: {formatTime(timeSpent)}
                </p>
                <p className="text-lg text-gray-500 flex items-center justify-center gap-2">
                  <Target className="w-5 h-5" />
                  {score.correctAnswers} av {score.totalQuestions} rätt
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Prestationsanalys</h3>
                  <Award className="w-8 h-8" />
                </div>
                <div className="space-y-3">
                  {score.percentage >= 90 && <p className="flex items-center gap-2"><Star className="w-5 h-5" /> Fenomenal! Expertkunskap!</p>}
                  {score.percentage >= 75 && score.percentage < 90 && <p className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Utmärkt förståelse!</p>}
                  {score.percentage >= 60 && score.percentage < 75 && <p className="flex items-center gap-2"><Target className="w-5 h-5" /> Bra grund, utveckla vidare!</p>}
                  {score.percentage < 60 && <p className="flex items-center gap-2"><Brain className="w-5 h-5" /> Fortsätt träna, du lär dig!</p>}
                </div>
              </div>

              <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Detaljerad Statistik</h3>
                  <Brain className="w-8 h-8" />
                </div>
                <div className="space-y-3">
                  <p className="flex items-center justify-between">
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Total tid:</span>
                    <span className="font-semibold">{formatTime(timeSpent)}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="flex items-center gap-2"><Target className="w-4 h-4" /> Träffsäkerhet:</span>
                    <span className="font-semibold">{Math.round((score.correctAnswers/score.totalQuestions)*100)}%</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="flex items-center gap-2"><Award className="w-4 h-4" /> Genomsnitt:</span>
                    <span className="font-semibold">{(score.totalScore/score.totalQuestions).toFixed(1)}/5</span>
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Områdesanalys</h3>
                  <BookOpen className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  {quizData.map((test, idx) => {
                    const testScore = Math.floor(Math.random() * 40) + 60;
                    return (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <span className="text-lg">{test.icon}</span>
                          <span className="truncate">{test.title.split(' ')[0]}</span>
                        </span>
                        <div className="w-16 bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-white rounded-full h-2 transition-all duration-1000"
                            style={{ width: `${testScore}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowDetailedResults(!showDetailedResults)}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <BookOpen className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  {showDetailedResults ? 'Dölj' : 'Visa'} Detaljerade Resultat
                </button>
                
                <button
                  onClick={resetQuiz}
                  className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <RotateCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                  Gör Om Quiz
                </button>
              </div>
            </div>

            {showDetailedResults && (
              <div className="mt-16 space-y-8">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                    📋 Detaljerad Genomgång
                  </h2>
                  <p className="text-gray-600">Analys av dina svar per område</p>
                </div>
                
                {quizData.map((test, testIndex) => (
                  <div key={testIndex} className={`bg-gradient-to-br ${test.gradient} rounded-3xl p-8 text-white shadow-2xl transform hover:scale-[1.02] transition-all duration-300`}>
                    <div className="flex items-center mb-8">
                      <div className="text-5xl mr-4 bg-white/20 rounded-2xl p-4">{test.icon}</div>
                      <div>
                        <h3 className="text-3xl font-bold mb-2">{test.title}</h3>
                        <p className="text-white/80 text-lg">{test.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="grid gap-6">
                      {test.questions.map((question, questionIndex) => {
                        const result = getQuestionResult(question);
                        return (
                          <div key={question.id} className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-300 ${
                            result.isCorrect 
                              ? 'border-green-400/50 bg-green-500/10' 
                              : 'border-red-400/50 bg-red-500/10'
                          }`}>
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    result.isCorrect ? 'bg-green-500' : 'bg-red-500'
                                  }`}>
                                    {result.isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                                  </div>
                                  <span className="font-bold text-lg">
                                    Fråga {questionIndex + 1}
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
                                    {question.difficulty}
                                  </span>
                                </div>
                                <p className="text-white/90 mb-3 text-lg">{question.question}</p>
                              </div>
                              <div className="text-right">
                                <span className={`font-bold text-lg ${result.isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                                  {result.earnedPoints}/{question.points}p
                                </span>
                              </div>
                            </div>
                            
                            {question.type === 'multiple' && (
                              <div className="space-y-2">
                                <div className="grid gap-2">
                                  {question.options.map((option, optIndex) => (
                                    <div key={optIndex} className={`p-3 rounded-lg border ${
                                      optIndex === question.correctAnswer ? 'bg-green-500/20 border-green-400 font-semibold' :
                                      optIndex === result.userAnswer ? 'bg-red-500/20 border-red-400' : 'bg-white/10 border-white/20'
                                    }`}>
                                      <span className="font-semibold mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                                      {option}
                                      {optIndex === question.correctAnswer && <span className="ml-2 text-green-300">✓ Rätt svar</span>}
                                      {optIndex === result.userAnswer && optIndex !== question.correctAnswer && 
                                        <span className="ml-2 text-red-300">✗ Ditt svar</span>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {question.type === 'essay' && (
                              <div className="space-y-3">
                                <div>
                                  <p className="font-semibold text-white/90 mb-1">Ditt svar:</p>
                                  <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                                    {result.userAnswer || 'Inget svar angivet'}
                                  </div>
                                </div>
                                <div>
                                  <p className="font-semibold text-green-300 mb-1">Exempel på bra svar:</p>
                                  <div className="bg-green-500/20 p-3 rounded-lg border border-green-400/50">
                                    {question.correctAnswer}
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {question.explanation && (
                              <div className="mt-3 p-3 bg-blue-500/20 rounded-lg border border-blue-400/50">
                                <p className="font-semibold text-blue-300 mb-1">Förklaring:</p>
                                <p className="text-blue-100">{question.explanation}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const question = getCurrentQuestion();
  const progress = ((currentTest * quizData[0].questions.length + currentQuestion + 1) / 
    (quizData.reduce((sum, test) => sum + test.questions.length, 0))) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Header Section */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 mb-6 p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${quizData[currentTest].gradient} flex items-center justify-center text-3xl shadow-lg transform hover:scale-110 transition-all duration-300`}>
                {quizData[currentTest].icon}
              </div>
              <div>
                <h1 className={`text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${quizData[currentTest].gradient}`}>
                  {quizData[currentTest].title}
                </h1>
                <p className="text-gray-600 font-medium">{quizData[currentTest].subtitle}</p>
                <p className="text-sm text-gray-500">
                  Fråga {currentQuestion + 1} av {quizData[currentTest].questions.length}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-end space-y-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="font-bold text-gray-800">{formatTime(timeSpent)}</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2">
                  <Trophy className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-purple-800">{question?.points || 0}p</span>
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(question?.difficulty)}`}>
                {question?.difficulty?.toUpperCase()}
              </div>
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">Framsteg</span>
              <span className="text-sm font-bold text-purple-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
              <div 
                className={`bg-gradient-to-r ${quizData[currentTest].gradient} h-4 rounded-full transition-all duration-500 ease-out shadow-lg relative overflow-hidden`}
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10 transform transition-all duration-300 ${
          isTransitioning ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
        }`}>
          
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-relaxed">
              {question?.question}
            </h2>
            
            {question?.hint && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-xl">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">💡</span>
                  </div>
                  <p className="text-blue-800 font-medium">{question.hint}</p>
                </div>
              </div>
            )}
          </div>

          {/* Answer Input Section */}
          <div className="mb-10">
            {question?.type === 'multiple' && (
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(question.id, index)}
                    className={`w-full p-5 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                      userAnswers[question.id] === index
                        ? `border-purple-500 bg-gradient-to-r ${quizData[currentTest].gradient} text-white shadow-xl scale-[1.02]`
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 bg-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className={`font-bold text-lg mr-4 w-8 h-8 rounded-full flex items-center justify-center ${
                        userAnswers[question.id] === index ? 'bg-white/20' : 'bg-purple-100 text-purple-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-lg leading-relaxed">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {question?.type === 'essay' && (
              <div className="space-y-4">
                <textarea
                  value={userAnswers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  placeholder="Skriv ditt detaljerade svar här..."
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none resize-none h-40 text-lg leading-relaxed transition-all duration-300 bg-white/80 backdrop-blur-sm"
                />
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Skriv minst 10 tecken för att få poäng</span>
                  <span className={`font-semibold ${(userAnswers[question.id] || '').length >= 10 ? 'text-green-600' : 'text-gray-400'}`}>
                    {(userAnswers[question.id] || '').length} tecken
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentTest === 0 && currentQuestion === 0}
              className="flex items-center px-6 py-4 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 font-semibold text-gray-700"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Föregående
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">
                Test {currentTest + 1} av {quizData.length}
              </p>
              <div className="flex gap-2">
                {quizData.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === currentTest ? 'bg-purple-500 scale-125' : 
                      idx < currentTest ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <button
              onClick={nextQuestion}
              className={`flex items-center px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 font-bold shadow-lg ${
                currentTest === quizData.length - 1 && currentQuestion === quizData[currentTest].questions.length - 1
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                  : `bg-gradient-to-r ${quizData[currentTest].gradient} hover:shadow-xl text-white`
              }`}
            >
              {currentTest === quizData.length - 1 && currentQuestion === quizData[currentTest].questions.length - 1 ? (
                <>
                  <Trophy className="w-5 h-5 mr-2" />
                  Avsluta Quiz
                </>
              ) : (
                <>
                  Nästa Fråga
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Answer Explanation (if available) */}
        {userAnswers[question?.id] !== undefined && question?.explanation && (
          <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 p-6 rounded-r-2xl shadow-lg transform animate-fadeIn">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-green-800 mb-2 text-lg">Förklaring:</h4>
                <p className="text-green-700 leading-relaxed">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
  );
};

export default QuizApp;



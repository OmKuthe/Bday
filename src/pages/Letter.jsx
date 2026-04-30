import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Gift, ArrowLeft } from 'lucide-react';

const Letter = ({ onNavigate, onBirthday }) => {
  const [stage, setStage] = useState('envelope'); // 'envelope' | 'letter'
  const [displayedText, setDisplayedText] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);

  const letterParagraphs = [
    "Dear Khushi 💕",
    "Happy Birthday! 🎂",
    "Today is all about celebrating YOU. Every day with you feels special, and today I want you to know just how much you mean to me.",
    "I like the way your eyes light up when you talk about things you care about. I like how you care deeply about everyone around you. I like our late night conversations, our inside jokes, and every single moment we've shared.",
    "You make me want to be a better person. You make every morning worth waking up for and every night worth dreaming about.",
    "On your birthday, I wish you all the happiness in the world. I wish you success in everything you dream of, and peace in your beautiful heart.",
    "Thank you for being unapologetically YOU. Thank you for every smile, every laugh, every memory we've created.",
    "You are my favourite person, my home, my heart.",
    "Yours always, ✨"
  ];

  const letterDone = currentParagraph >= letterParagraphs.length;

  // Typewriter
  useEffect(() => {
    if (!showLetter) return;
    if (currentParagraph >= letterParagraphs.length) return;
    const currentText = letterParagraphs[currentParagraph];
    if (charIndex < currentText.length) {
      const t = setTimeout(() => {
        setDisplayedText(prev => prev + currentText[charIndex]);
        setCharIndex(c => c + 1);
      }, 18);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayedText(prev => prev + '\n\n');
        setCurrentParagraph(p => p + 1);
        setCharIndex(0);
      }, 80);
      return () => clearTimeout(t);
    }
  }, [showLetter, currentParagraph, charIndex]);

  const handleOpenEnvelope = () => {
    if (stage !== 'envelope') return;
    setStage('letter');
    setTimeout(() => setShowLetter(true), 300);
  };

  const handleCelebrate = () => {
    setIsCelebrating(true);
    
    // Generate 100 hearts flying in all directions
    const hearts = [];
    for (let i = 0; i < 100; i++) {
      hearts.push({
        id: i,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        xEnd: `${Math.random() * 200 - 50}%`,
        yEnd: `${Math.random() * 200 - 100}%`,
        size: 20 + Math.random() * 40,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 1.5,
        color: ['#FF69B4', '#FF1493', '#FF6B9D', '#FFB6C1', '#FFC0CB'][Math.floor(Math.random() * 5)]
      });
    }
    setFloatingHearts(hearts);
    
    // Navigate to Starting page after celebration
    setTimeout(() => {
      onNavigate('starting');
    }, 2000);
  };

  // Confetti pieces
  const confettiColors = ['#FF3AF2', '#00F5D4', '#FFE600', '#FF6B35', '#7B2FFF', '#FF6B9D', '#FFD700'];
  const confettiItems = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    color: confettiColors[i % confettiColors.length],
    x: `${(Math.random() * 200) - 50}%`,
    y: `${Math.random() * 110}%`,
    size: 6 + Math.random() * 10,
    round: Math.random() > 0.5,
    delay: Math.random() * 0.5,
    rotate: Math.random() * 720,
  }));

  return (
    <div className="relative min-h-screen w-full overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0033 0%, #2d1b4e 50%, #0e0a1f 100%)' }}>

      {/* CSS-only background patterns */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(255,200,150,0.25) 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px', opacity: 0.2
      }} />
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'repeating-linear-gradient(45deg, rgba(255,58,242,0.04) 0px, rgba(255,58,242,0.04) 1px, transparent 1px, transparent 12px)'
      }} />
      
      {/* Soft gradient orbs */}
      <motion.div className="fixed inset-0 pointer-events-none"
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity }}
        style={{
          background: 'radial-gradient(ellipse at 20% 30%, rgba(255,58,242,0.14) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(123,47,255,0.14) 0%, transparent 55%)'
        }}
      />

      {/* FLOATING HEARTS - All over screen during celebration */}
      <AnimatePresence>
        {isCelebrating && floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ 
              left: heart.x, 
              top: heart.y, 
              scale: 0,
              opacity: 0,
              rotate: 0
            }}
            animate={{ 
              left: `calc(${heart.x} + ${heart.xEnd})`,
              top: `calc(${heart.y} + ${heart.yEnd})`,
              scale: [0, 1.5, 0.8],
              opacity: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: heart.duration, 
              delay: heart.delay,
              ease: "easeOut"
            }}
            className="fixed z-[60] pointer-events-none"
            style={{ position: 'fixed' }}
          >
            <Heart 
              size={heart.size} 
              fill={heart.color} 
              color={heart.color}
              style={{ filter: `drop-shadow(0 0 5px ${heart.color})` }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <motion.div key={i}
            className="absolute rounded-full"
            style={{
              width: 3 + (i % 4) * 3, height: 3 + (i % 4) * 3,
              left: `${(i * 19 + 7) % 100}%`, top: `${(i * 27 + 5) % 100}%`,
              background: confettiColors[i % confettiColors.length], opacity: 0.2
            }}
            animate={{ y: [0, -50, 0], opacity: [0.1, 0.32, 0.1] }}
            transition={{ duration: 6 + i % 5, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Background text */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-[10%] right-[-8%] text-[18vw] font-black text-white/[0.03] whitespace-nowrap rotate-12"
          style={{ letterSpacing: '0.12em', fontFamily: 'monospace' }}>LOVE</div>
        <div className="absolute bottom-[5%] left-[-10%] text-[15vw] font-black text-white/[0.025] whitespace-nowrap -rotate-12"
          style={{ letterSpacing: '0.12em', fontFamily: 'monospace' }}>ALWAYS</div>
      </div>

      {/* Celebration burst with confetti */}
      <AnimatePresence>
        {isCelebrating && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-50"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,58,242,0.3), transparent 70%)' }}
            />
            {confettiItems.map(c => (
              <motion.div key={c.id}
                className="fixed z-50 pointer-events-none"
                style={{
                  left: '50%', top: '50%',
                  width: c.size, height: c.size,
                  background: c.color,
                  borderRadius: c.round ? '50%' : '2px',
                }}
                initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
                animate={{ x: c.x, y: c.y, scale: [0, 1.6, 0.8], rotate: c.rotate, opacity: [1, 1, 0] }}
                transition={{ duration: 1.8, delay: c.delay, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Back button */}
      <div className="relative z-30 pt-6 px-4 max-w-7xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('thenvsnow')}
          className="text-white/70 hover:text-white text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 flex items-center gap-2 backdrop-blur-sm transition-all"
        >
          <ArrowLeft size={15} /> Back to Then vs Now
        </motion.button>
      </div>

      {/* ── HEADLINE ── */}
      <div className="relative z-20 pt-6 pb-4 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xs uppercase tracking-[0.45em] text-pink-300 font-bold mb-3"
        >
          ✦ a letter for you ✦
        </motion.p>
        <div className="flex flex-wrap justify-center gap-x-4">
          {['A', 'LETTER', 'FOR', 'YOU'].map((word, wi) => (
            <motion.span key={word}
              initial={{ opacity: 0, y: 50, rotate: wi % 2 === 0 ? -5 : 5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.12 + wi * 0.12, type: 'spring', damping: 12 }}
              className="text-5xl md:text-7xl font-black text-white"
              style={{
                textShadow: '4px 4px 0 #FF1493, 8px 8px 0 #8A2BE2, 12px 12px 0 #FFD700',
                fontFamily: 'monospace', lineHeight: 1.1
              }}
            >{word}</motion.span>
          ))}
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="h-1 rounded-full max-w-xs mx-auto mt-3 origin-left"
          style={{ background: 'linear-gradient(90deg, #FF3AF2, #FFE600, #00F5D4)' }}
        />
      </div>

      {/* ── ENVELOPE / LETTER AREA ── */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 pb-12">
        <AnimatePresence mode="wait">

          {/* ── ENVELOPE (closed) ── */}
          {stage === 'envelope' && (
            <motion.div
              key="envelope-wrap"
              initial={{ scale: 0.7, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: -40 }}
              transition={{ type: 'spring', damping: 18 }}
              className="cursor-pointer select-none"
              onClick={handleOpenEnvelope}
            >
              <div className="relative" style={{ width: 520, maxWidth: '90vw' }}>

                {/* Simple Envelope SVG - No animation */}
                <svg
                  width="100%" viewBox="0 0 520 320"
                  style={{ filter: 'drop-shadow(0 20px 60px rgba(255,58,242,0.25)) drop-shadow(0 8px 24px rgba(0,0,0,0.5))' }}
                >
                  <defs>
                    <linearGradient id="envBody" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fef3c7" />
                      <stop offset="100%" stopColor="#fde68a" />
                    </linearGradient>
                    <linearGradient id="envFlap" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fcd34d" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                    <linearGradient id="stampGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF3AF2" />
                      <stop offset="100%" stopColor="#7B2FFF" />
                    </linearGradient>
                  </defs>

                  {/* Envelope body */}
                  <rect x="0" y="60" width="520" height="260" rx="12"
                    fill="url(#envBody)" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="8 4" />

                  {/* Envelope flaps */}
                  <polygon points="0,60 260,190 0,320" fill="#fde68a" opacity="0.85" />
                  <polygon points="520,60 260,190 520,320" fill="#fde68a" opacity="0.85" />
                  <polygon points="0,320 260,190 520,320" fill="#fcd34d" />
                  
                  {/* Top flap */}
                  <polygon points="0,60 260,190 520,60" fill="url(#envFlap)" />
                  <line x1="0" y1="60" x2="520" y2="60" stroke="#d97706" strokeWidth="1.5" opacity="0.4" />

                  {/* Wax seal */}
                  <circle cx="260" cy="125" r="24" fill="#DC143C" stroke="#8B0000" strokeWidth="2" />
                  <circle cx="260" cy="125" r="18" fill="#C41230" />
                  <text x="260" y="131" textAnchor="middle" fontSize="16" fontWeight="bold"
                    fill="rgba(255,255,255,0.9)" fontFamily="serif">K</text>

                  {/* Stamp */}
                  <rect x="450" y="75" width="50" height="60" rx="3" fill="#FFF8E7" stroke="#d97706" strokeWidth="1.5" />
                  <rect x="455" y="80" width="40" height="48" rx="2" fill="url(#stampGrad)" />
                  <text x="475" y="110" textAnchor="middle" fontSize="18">💕</text>

                  {/* To: label */}
                  <text x="60" y="280" fontSize="12" fill="#92400e" fontFamily="serif" fontStyle="italic">To:</text>
                  <text x="80" y="280" fontSize="13" fill="#92400e" fontFamily="serif" fontWeight="bold">Khushi 🎀</text>
                </svg>

                {/* Click hint */}
                <motion.p
                  animate={{ scale: [1, 1.04, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="text-center text-yellow-300 text-sm font-bold tracking-widest uppercase mt-4"
                >
                  click to open ↑
                </motion.p>
              </div>
            </motion.div>
          )}

          {/* ── LETTER PAGE ── */}
          {stage === 'letter' && (
            <motion.div
              key="letter-page"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 16, duration: 0.6 }}
              className="w-full max-w-2xl mx-auto"
            >
              {/* Paper */}
              <motion.div
                className="rounded-2xl overflow-hidden relative"
                style={{
                  background: 'linear-gradient(160deg, #FFFDF7 0%, #FFF8E7 60%, #FFF2D7 100%)',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.2), 12px 12px 0 #FF3AF230, 20px 20px 0 #7B2FFF20',
                  border: '2px dashed rgba(245,158,11,0.35)'
                }}
              >
                {/* Lined paper texture */}
                <div className="absolute inset-0 pointer-events-none opacity-100" style={{
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(255,105,180,0.1) 27px, rgba(255,105,180,0.1) 28px)',
                  backgroundSize: '100% 28px'
                }} />

                {/* Left margin red line */}
                <div className="absolute top-0 bottom-0 left-14 w-px bg-pink-300 opacity-30" />

                <div className="relative z-10 p-8 pl-16">
                  {/* Date */}
                  <div className="text-right mb-5">
                    <span className="text-amber-600 text-sm font-serif italic">1st May 2026</span>
                  </div>

                  {/* Letter text */}
                  <div className="max-h-[48vh] overflow-y-auto pr-2 custom-scroll">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: showLetter ? 1 : 0 }}
                      className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-wrap"
                      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                    >
                      {displayedText.split('\n\n').map((para, idx) => (
                        <p key={idx} className="mb-4">{para}</p>
                      ))}
                      {!letterDone && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="inline-block w-0.5 h-4 bg-pink-500 ml-0.5 align-middle"
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Signature */}
                  {letterDone && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-4 pt-4 border-t border-pink-200 flex items-center justify-end gap-2"
                    >
                      <span className="text-pink-500 text-sm italic font-serif">— With all my heart</span>
                      <Heart size={13} fill="#F472B6" className="text-pink-400" />
                    </motion.div>
                  )}

                  {/* CTA button */}
                  {letterDone && (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6 text-center"
                    >
                      <motion.button
                        whileHover={{ scale: 1.07, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCelebrate}
                        className="relative overflow-hidden px-9 py-4 rounded-full font-black text-base uppercase tracking-wider text-white flex items-center gap-2 mx-auto"
                        style={{
                          background: 'linear-gradient(135deg, #FF3AF2, #7B2FFF, #00F5D4)',
                          border: '3px solid #FFE600',
                          boxShadow: '8px 8px 0 #FF3AF250, 14px 14px 0 #7B2FFF35'
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                        />
                        <Gift size={17} className="relative z-10" />
                        <span className="relative z-10">Have a nice bday Khushi 🎂</span>
                        <Sparkles size={17} className="relative z-10" />
                      </motion.button>
                    </motion.div>
                  )}
                </div>

                {/* Corner decorations */}
                {[['top-3 left-3', 'border-t-2 border-l-2 rounded-tl-lg'],
                  ['top-3 right-3', 'border-t-2 border-r-2 rounded-tr-lg'],
                  ['bottom-3 left-3', 'border-b-2 border-l-2 rounded-bl-lg'],
                  ['bottom-3 right-3', 'border-b-2 border-r-2 rounded-br-lg']].map(([pos, cls], i) => (
                  <div key={i} className={`absolute ${pos} w-6 h-6 border-pink-300 ${cls} opacity-40`} />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 3px; }
        .custom-scroll::-webkit-scrollbar-track { background: rgba(255,200,200,0.08); border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,105,180,0.25); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Letter;
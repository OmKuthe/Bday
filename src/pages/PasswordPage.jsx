import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Key, AlertCircle, Sparkles, Star, Shield } from 'lucide-react';

const PasswordPage = ({ onNavigate, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [shake, setShake] = useState(false);

  const correctPassword = "0.5";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      setError(false);
      setIsUnlocking(true);
      
      setTimeout(() => {
        setIsUnlocking(false);
        // Navigate directly to next page (emotions)
        if (onSuccess) onSuccess();
      }, 1500);
      
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  // Password Screen - Updated design
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0D0D1A]">
      {/* Cosmic Void Background Layers */}
      <div className="absolute inset-0 bg-[#0D0D1A]" />
      
      {/* Dot Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 90, 150, 0.3) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Diagonal Stripe Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'repeating-linear-gradient(45deg, rgba(255, 100, 200, 0.15) 0px, rgba(255, 100, 200, 0.15) 2px, transparent 2px, transparent 12px)'
        }}
      />

      {/* Massive Background Text "SHHH" */}
      <div 
        className="absolute bottom-[-5%] right-[-8%] text-[28vw] font-black text-white/5 whitespace-nowrap tracking-[0.2em] rotate-[-8deg] pointer-events-none select-none"
        style={{ letterSpacing: '0.2em' }}
      >
        SHHH
      </div>

      {/* Floating Decorative Elements - Stars, Sparkles, Lock Emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => {
          const icons = ['⭐', '✨', '🔒', '🌟', '🔐', '💎', '🔑', '🎀', '⚡', '💫'];
          const randomIcon = icons[Math.floor(Math.random() * icons.length)];
          return (
            <motion.div
              key={`float-${i}`}
              className="absolute text-2xl md:text-3xl"
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.5
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, -15, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            >
              {randomIcon}
            </motion.div>
          );
        })}
      </div>

      {/* Twinkling Stars */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-pink-300/30 text-sm pointer-events-none"
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        >
          ✦
        </motion.div>
      ))}

      {/* Main Content - Wider container with adjusted positioning */}
      <div className="relative z-10 flex items-start justify-center min-h-screen px-4 pt-32 pb-8">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 60 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", damping: 15 }}
          className={`w-full max-w-3xl ${shake ? 'animate-shake' : ''}`}
        >
          <div className="bg-[#0D0D1A]/70 backdrop-blur-xl rounded-[64px] p-10 border border-pink-500/30 shadow-2xl">
            {/* Headline - Changed to "ACCESS DENIED" */}
            <motion.h1
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
              className="text-5xl md:text-7xl font-black text-center mb-3 tracking-tighter"
              style={{
                color: '#FFEEF9',
                textShadow: '6px 6px 0 #FF1493, 12px 12px 0 #8A2BE2, 18px 18px 0 #FF4500'
              }}
            >
              ACCESS DENIED 🔐
            </motion.h1>
            
            {/* Subtext - Updated with new message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-pink-200 text-lg font-semibold mb-8 tracking-wide"
            >
              Enter correct password to get inside
            </motion.p>

            {/* Password Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-pink-400 z-10" size={24} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-14 pr-6 py-5 text-xl rounded-full bg-[#1a0f2e]/80 backdrop-blur-sm border-3 text-white placeholder-pink-300/50 focus:outline-none transition-all ${
                      error 
                        ? 'border-red-500 animate-shake' 
                        : 'border-pink-500 focus:border-pink-400'
                    }`}
                    style={{
                      borderWidth: '3px',
                      boxShadow: error ? 'none' : '0 0 0 rgba(255, 43, 158, 0)',
                      fontFamily: 'monospace'
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 0 4px rgba(255, 102, 204, 0.6), 0 0 20px 6px #ff44aa';
                      e.target.style.transform = 'scale(1.02)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'scale(1)';
                    }}
                    placeholder="🔐 enter secret code..."
                    autoFocus
                    disabled={isUnlocking}
                  />
                </div>
                
                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="mt-3 text-center"
                    >
                      <div className="inline-flex items-center gap-2 bg-red-500/90 backdrop-blur-md px-5 py-2 rounded-full text-white font-bold shadow-lg">
                        <AlertCircle size={18} />
                        <span>nope, try again 💀</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Updated Hint */}
                <p className="text-sm text-pink-300/70 mt-4 text-center font-mono">
                  💭 Hint: Khushi likes this the most (it's a number)
                </p>
              </motion.div>

              {/* Unlocking Animation */}
              {isUnlocking && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      <Sparkles size={24} className="text-pink-500" />
                    </motion.div>
                    <span className="text-pink-300 font-semibold">Verifying access...</span>
                  </div>
                  <div className="mt-3 h-2 bg-pink-500/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5 }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring" }}
                whileHover={{ 
                  scale: 1.05,
                  y: -8,
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.98, y: 2 }}
                disabled={isUnlocking}
                className={`w-full py-5 rounded-full font-black text-xl md:text-2xl uppercase tracking-wider transition-all ${
                  isUnlocking ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #FD8BFF 0%, #FF5F6D 40%, #FFD166 100%)',
                  border: '3px solid #FFE484',
                  boxShadow: '8px 8px 0px #b8005c, 0px 12px 25px rgba(0,0,0,0.3)',
                  color: '#1e0b2c',
                  textShadow: '1px 1px 0px rgba(255,255,255,0.5)'
                }}
              >
                {isUnlocking ? '✨ UNLOCKING... ✨' : '🔓 UNLOCK GATE 🔓'}
              </motion.button>

              {/* Back Button */}
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.02, color: '#FF69B4' }}
                onClick={() => onNavigate('starting')}
                className="w-full text-pink-400/80 hover:text-pink-300 text-sm transition-all duration-200"
              >
                ← Go Back
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Custom Shake Animation */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>
    </div>
  );
};

export default PasswordPage;
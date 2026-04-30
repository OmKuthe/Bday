import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail } from 'lucide-react';
// No need to import images - use absolute paths

const StartingPage = ({ onNavigate }) => {
  const [dateText, setDateText] = useState('');
  const fullDate = "Khushie";

  useEffect(() => {
    let index = 0;
    setDateText('');
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < fullDate.length) {
          setDateText(fullDate.substring(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 100);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleOpenAccess = () => {
    if (onNavigate) {
      onNavigate('password');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-birthday-bg">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, white 25%, white 26%, transparent 27%, transparent 74%, white 75%, white 76%, transparent 77%, transparent),
                           linear-gradient(90deg, transparent 24%, white 25%, white 26%, transparent 27%, transparent 74%, white 75%, white 76%, transparent 77%, transparent)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Flags */}
      <div className="flex justify-between animate-flag-down relative z-10">
        <img src="/src/assets/images/1.png" alt="flag" className="w-[350px] max-w-[40vw] -rotate-[10deg] -translate-x-20 translate-y-8" />
        <img src="/src/assets/images/1.png" alt="flag" className="w-[350px] max-w-[40vw] rotate-[10deg] translate-x-20 translate-y-8 scale-x-[-1]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row px-4 pt-12 lg:pt-16 max-w-7xl mx-auto">
        {/* Left Section */}
        <div className="w-full lg:w-2/5 flex flex-col items-center">
          <div className="relative perspective-1000">
            <h1 className="font-titan text-5xl lg:text-7xl text-white drop-shadow-[4px_4px_0_#333] flex justify-center gap-2">
              {'Happy'.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 50, opacity: 0, visibility: 'hidden' }}
                  animate={{ y: 0, opacity: 1, visibility: 'visible' }}
                  transition={{ delay: 1 + (i * 0.1), duration: 0.4 }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
            <h1 className="font-titan text-5xl lg:text-7xl text-birthday-pink drop-shadow-[4px_4px_0_#333] flex justify-center gap-2 mt-4">
              {'Birthday'.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 50, opacity: 0, visibility: 'hidden' }}
                  animate={{ y: 0, opacity: 1, visibility: 'visible' }}
                  transition={{ delay: 1.8 + (i * 0.1), duration: 0.4 }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            {/* Hat Animation */}
            <motion.div
              initial={{ top: -350, rotate: -40 }}
              animate={{ top: -30, rotate: 0 }}
              transition={{ delay: 3, duration: 2, ease: "easeOut" }}
              className="absolute right-[-50px] lg:right-[-100px] top-[-30px] z-[-1]"
            >
              <img src="/src/assets/images/hat.png" alt="hat" className="w-24 lg:w-32" />
            </motion.div>
          </div>

          {/* Date of Birth / Khushie Box */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Heart className="text-birthday-pink fill-birthday-pink animate-pulse" size={20} />
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0, y: -100 }}
              animate={{ width: 300, height: 50, opacity: 1, y: 0 }}
              transition={{ delay: 4, duration: 2.5 }}
              className="bg-birthday-pink border-4 border-black rounded-full flex items-center justify-center"
            >
              <span className="font-sriracha font-bold text-lg mx-10">{dateText}</span>
            </motion.div>
            <Heart className="text-birthday-pink fill-birthday-pink animate-pulse" size={20} />
          </div>

          {/* Button */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 7, duration: 1.5, type: "spring" }}
          >
            <button
              onClick={handleOpenAccess}
              className="mt-8 bg-birthday-pink px-6 py-2 rounded-full text-lg font-sriracha border-4 border-black hover:bg-[#FF6B78] hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              Click Here Khushie
              <Mail size={20} className="group-hover:animate-bounce" />
            </button>
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-3/5 flex flex-col items-center relative mt-12 lg:mt-0">
          <motion.div
            initial={{ y: 700 }}
            animate={{ y: 0 }}
            transition={{ delay: 3, duration: 4, ease: "easeOut" }}
            className="relative"
          >
            <div className="w-64 h-64 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-black relative">
              <img src="/src/assets/images/unnamed.jpg" alt="Khushie" className="w-full h-full object-cover" />
            </div>
            
            {/* Name Badge */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-birthday-pink px-6 py-2 rounded-full border-4 border-black whitespace-nowrap">
              <Heart className="inline text-red-600 mr-2" size={18} fill="red" />
              <span className="font-dancing text-2xl font-bold">Bday girl</span>
              <Heart className="inline text-red-600 ml-2" size={18} fill="red" />
            </div>

            {/* Balloons */}
            <div className="absolute -top-16 -left-20 animate-balloon1-fast">
              <img src="/src/assets/images/balloon1.png" alt="balloon" className="w-20 lg:w-24" />
            </div>
            <div className="absolute top-32 -right-16 z-[-1] animate-balloon2-fast rotate-12">
              <img src="/src/assets/images/balloon2.png" alt="balloon" className="w-20 lg:w-24" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Stars */}
      {[
        { top: 75, left: 300, width: 20, delay: 6 },
        { top: 35, right: 360, width: 15, delay: 6.2 },
        { top: 290, left: 630, width: 14, delay: 6.4 },
        { bottom: 60, left: 35, width: 18, delay: 6.6 },
        { bottom: 140, left: 500, width: 16, delay: 6.8 }
      ].map((star, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: star.delay, duration: 1.5 }}
          className="absolute animate-star"
          style={{
            ...star,
            width: star.width,
            height: star.width,
            clipPath: 'polygon(0 50%, 35% 35%, 50% 0, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%)',
            backgroundColor: '#333',
            position: 'absolute'
          }}
        />
      ))}

      {/* Decorative Flowers */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 6, duration: 1.5 }}
        className="absolute top-[250px] left-[50px]"
      >
        <img src="/src/assets/images/decorate_flower.png" alt="flower" className="w-5" />
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 6.3, duration: 1.5 }}
        className="absolute top-[225px] left-[540px]"
      >
        <img src="/src/assets/images/decorate_flower.png" alt="flower" className="w-5" />
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 6.6, duration: 1.5 }}
        className="absolute top-[150px] right-[235px]"
      >
        <img src="/src/assets/images/decorate_flower.png" alt="flower" className="w-5" />
      </motion.div>

      {/* Smiley Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 6, duration: 1.5 }}
        className="absolute bottom-[180px] left-[600px]"
      >
        <img src="/src/assets/images/smiley_icon.png" alt="smiley" className="w-16" />
      </motion.div>

      {/* Bottom Decoration */}
      <div className="absolute right-0 bottom-0">
        <img src="/src/assets/images/decorate.png" alt="decor" className="w-24" />
      </div>
    </div>
  );
};

export default StartingPage;
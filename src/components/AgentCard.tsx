import { motion } from "framer-motion";

interface AgentCardProps {
  name: string;
  title: string;
  description: string;
  characterImage: string;
  archColor: string;
  delay: number;
  onClick: () => void;
}

export const AgentCard = ({ name, characterImage, archColor, delay, onClick }: AgentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.03 }}
      className="relative cursor-pointer group"
      onClick={onClick}
    >
      {/* Moroccan arch frame */}
      <div className="relative">
        {/* Arch shape with gradient */}
        <div 
          className={`relative aspect-[3/4] rounded-t-[50%] overflow-hidden border-8 ${archColor} shadow-2xl transition-all duration-500 group-hover:shadow-moroccan`}
        >
          {/* Character image */}
          <img
            src={characterImage}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Name label at bottom */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full">
          <div className="bg-moroccan-beige/90 backdrop-blur-sm rounded-lg px-6 py-3 border-2 border-moroccan-gold/30 shadow-lg">
            <h3 className="text-xl font-bold text-center font-amiri text-moroccan-gold-dark">
              {name}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

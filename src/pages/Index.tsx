import { useState } from "react";
import { motion } from "framer-motion";
import { AgentCard } from "@/components/AgentCard";
import { ChatWindow } from "@/components/ChatWindow";
import { Navigation } from "@/components/Navigation";
import { AmbientPhoenix } from "@/components/AmbientPhoenix"; // Import the new component
import chefImg from "@/assets/chef-character.jpg";
import doctorImg from "@/assets/doctor-character.jpg";
import herbalistImg from "@/assets/herbalist-character.jpg";
import spiritualImg from "@/assets/spiritual-character.jpg";
import architectImg from "@/assets/architect-character.jpg";
import lawyerImg from "@/assets/lawyer-character.jpg";
import decoratorImg from "@/assets/decorator-character.jpg";
import guideImg from "@/assets/guide-character.jpg";
import scholarImg from "@/assets/scholar-character.jpg";
import techImg from "@/assets/tech-character.jpg";
import alfont from '@/assets/alfont_com_MTHALALVF-Normal.otf';
import moroccanSoukBg from "@/assets/moroccan-souk-bg.jpg";

interface Agent {
  id: string;
  name: string;
  title: string;
  description: string;
  characterImage: string;
  archColor: string;
}

const agents: Agent[] = [
  {
    id: "chef",
    name: "الشاف بوت",
    title: "خبير الطبخ المغربي",
    description: "خبير في الطبخ المغربي التقليدي والطاجين والتوابل العطرية",
    characterImage: chefImg,
    archColor: "border-moroccan-terracotta",
  },
  {
    id: "doctor",
    name: "سي الطبيب",
    title: "طبيب الطب التقليدي",
    description: "طبيب حكيم يجمع بين النصائح الصحية الحديثة والعلاجات التقليدية",
    characterImage: doctorImg,
    archColor: "border-moroccan-blue",
  },
  {
    id: "herbalist",
    name: "العشاب",
    title: "خبير الأعشاب",
    description: "حارس المعرفة العشبية القديمة وأسرار العلاج الطبيعي",
    characterImage: herbalistImg,
    archColor: "border-moroccan-emerald",
  },
  {
    id: "spiritual",
    name: "الشيخ",
    title: "مرشد روحي",
    description: "عالم حكيم يقدم الإرشاد والحكمة والمشورة الروحية",
    characterImage: spiritualImg,
    archColor: "border-moroccan-gold",
  },
  {
    id: "architect",
    name: "المهندس",
    title: "مهندس معماري مغربي",
    description: "خبير في العمارة الإسلامية والأنماط الهندسية والتصميم",
    characterImage: architectImg,
    archColor: "border-moroccan-beige-dark",
  },
  {
    id: "lawyer",
    name: "الشانيقة المحامي",
    title: "محامي مغربي",
    description: "العدالة بقيم مغربية",
    characterImage: lawyerImg,
    archColor: "border-moroccan-blue",
  },
  {
    id: "decorator",
    name: "رقية الديكور",
    title: "مختصة في الديكور الداخلي والخارجي",
    description: "تحويل المساحات المغربية إلى فن",
    characterImage: decoratorImg,
    archColor: "border-rose-400",
  },
  {
    id: "guide",
    name: "علال الكيد",
    title: "مرشد سياحي مغربي",
    description: "اكتشف المغرب بابتسامة رقمية",
    characterImage: guideImg,
    archColor: "border-cyan-400",
  },
  {
    id: "scholar",
    name: "الموجه التربيوي",
    title: "مستشار تعليمي ومهني",
    description: "توجيه الشباب المغربي نحو مستقبلهم",
    characterImage: scholarImg,
    archColor: "border-moroccan-emerald",
  },
  {
    id: "tech",
    name: "صلاح آي تي",
    title: "خبير تكنولوجيا وشبكات",
    description: "ربط المغرب من خلال التكنولوجيا",
    characterImage: techImg,
    archColor: "border-blue-500",
  },
];

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style>
        {`
          @font-face {
            font-family: 'Alfont';
            src: url(${alfont}) format('opentype');
          }
        `}
      </style>
      {/* Background with Moroccan Souk image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${moroccanSoukBg})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Ambient Phoenix Animation Layer */}
      <AmbientPhoenix />

      {/* Navigation */}
      <Navigation />

      {/* Header Layer */}
      <div className="relative z-10">
        <header
          className="pt-16 pb-12 text-center"
        >
          <h1 
            className="text-6xl md:text-8xl font-bold mb-20 text-white font-alfont tracking-wide"
          >
            سوق الإي آي
          </h1>
          <p
            className="text-xl md:text-2xl text-white/80"
          >
            اضحك واستافد واقضي غراض أخاي
          </p>
        </header>
      </div>

      {/* Agent Cards Grid Layer */}
      <div className="relative z-30">
        <div className="container mx-auto px-8 pb-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8 lg:gap-12 max-w-7xl mx-auto">
            {agents.map((agent, index) => (
              <AgentCard
                key={agent.id}
                name={agent.name}
                title={agent.title}
                description={agent.description}
                characterImage={agent.characterImage}
                archColor={agent.archColor}
                delay={0.1 * index}
                onClick={() => {
                  if (agent.id === "doctor") {
                    window.open("https://sitebib.netlify.app", "_blank");
                  } else if (agent.id === "herbalist") {
                    window.open("https://el3achab.netlify.app/", "_blank");
                  } else if (agent.id === "chef") {
                    window.open("https://echefbot.netlify.app/", "_blank");
                  }
                  else {
                    setSelectedAgent(agent);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Chat Window */}
      {selectedAgent && (
        <ChatWindow
          isOpen={!!selectedAgent}
          onClose={() => setSelectedAgent(null)}
          agentName={selectedAgent.name}
          agentTitle={selected.title}
        />
      )}
    </div>
  );
};

export default Index;

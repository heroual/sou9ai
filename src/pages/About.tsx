import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import moroccanSoukBg from "@/assets/moroccan-souk-bg.jpg";
import { AmbientPhoenix } from "@/components/AmbientPhoenix"; // Import the new component

interface AgentInfo {
  name: string;
  title: string;
  description: string;
  fullDescription: string;
  color: string;
  image: string;
  icon: string;
  skills: string[];
}

const agents: AgentInfo[] = [
  {
    name: "شيف بوت",
    title: "خبير الطبخ المغربي",
    description: "خبير في الطبخ المغربي التقليدي والطاجين والتوابل العطرية",
    fullDescription: "سلام! أنا شيف بوت، سيد المطبخ المغربي التقليدي. من الطاجين اللذيذ إلى الكسكس الشهي، أعرف كل أسرار التوابل والنكهات. دعني أريك كيف تطبخ كأنك في قلب مراكش! 🍲",
    color: "border-moroccan-terracotta",
    image: "/src/assets/chef-character.jpg",
    icon: "🍲",
    skills: ["وصفات مغربية أصيلة", "أسرار التوابل", "فنون الطاجين", "الحلويات التقليدية"]
  },
  {
    name: "سي الطبيب",
    title: "طبيب الطب التقليدي",
    description: "طبيب حكيم يجمع بين النصائح الصحية الحديثة والعلاجات التقليدية",
    fullDescription: "مرحبا بيك! أنا سي الطبيب، دكتور مغربي خلط الطب الحديث بالحكمة التقليدية. نصائح صحية بالفكاهة والرحمة - لأن الصحة ديال الجسم والروح! 🩺",
    color: "border-moroccan-blue",
    image: "/src/assets/doctor-character.jpg",
    icon: "🩺",
    skills: ["نصائح صحية", "طب تقليدي", "وقاية وعلاج", "صحة نفسية"]
  },
  {
    name: "العشاب",
    title: "خبير الأعشاب",
    description: "حارس المعرفة العشبية القديمة وأسرار العلاج الطبيعي",
    fullDescription: "أهلا وسهلا! أنا العشاب، حارس أسرار النباتات والعلاج الطبيعي المغربي. من الزعتر للكركم، كل عشبة عندها سرها وحكايتها! 🌿",
    color: "border-moroccan-emerald",
    image: "/src/assets/herbalist-character.jpg",
    icon: "🌿",
    skills: ["أعشاب طبية", "علاج طبيعي", "وصفات تقليدية", "حكمة الأجداد"]
  },
  {
    name: "الشيخ",
    title: "مرشد روحي",
    description: "عالم حكيم يقدم الإرشاد والحكمة والمشورة الروحية",
    fullDescription: "السلام عليكم! أنا الشيخ، مرشدك الروحي بالحكمة والأمثال المغربية. نجيبلك السكينة والإرشاد بالكلمة الطيبة واللسان الفصيح! 🧠",
    color: "border-moroccan-gold",
    image: "/src/assets/spiritual-character.jpg",
    icon: "🧠",
    skills: ["إرشاد روحي", "حكم وأمثال", "نصائح حياتية", "راحة نفسية"]
  },
  {
    name: "المهندس",
    title: "مهندس معماري مغربي",
    description: "خبير في العمارة الإسلامية والأنماط الهندسية والتصميم",
    fullDescription: "تشرفنا! أنا المهندس، فنان العمارة المغربية والتصميم الهندسي. من الزليج للجبس المنقوش، نبنيو أحلامك بطريقة أصيلة وعصرية! 🏗️",
    color: "border-moroccan-beige-dark",
    image: "/src/assets/architect-character.jpg",
    icon: "🏗️",
    skills: ["عمارة إسلامية", "تصميم هندسي", "زليج وجبس", "مشاريع عصرية"]
  },
  {
    name: "شنيقة المحامي",
    title: "محامي مغربي",
    description: "مستشار قانوني يقدم العدالة بقيم مغربية وحكمة",
    fullDescription: "أهلا بك! أنا شنيقة المحامي، محامي مغربي نحميك ونشرحلك القانون بالبساطة والوضوح. الحق واضح والحكم عادل! ⚖️",
    color: "border-moroccan-blue",
    image: "/src/assets/lawyer-character.jpg",
    icon: "⚖️",
    skills: ["استشارات قانونية", "حقوق وواجبات", "عقود وقضايا", "شرح مبسط"]
  },
  {
    name: "رقية الديكور",
    title: "مختصة في الديكور الداخلي والخارجي",
    description: "تحويل المساحات المغربية إلى فن بحلول تصميم أنيقة",
    fullDescription: "مرحبا! أنا رقية الديكور، فنانة الديكور المغربي التقليدي والعصري. نحول دارك لجنة صغيرة بالألوان والذوق الرفيع! 🏠",
    color: "border-rose-400",
    image: "/src/assets/decorator-character.jpg",
    icon: "🏠",
    skills: ["ديكور داخلي", "تنسيق ألوان", "أثاث مغربي", "حدائق ومساحات"]
  },
  {
    name: "الدليل",
    title: "مرشد سياحي مغربي",
    description: "اكتشف المغرب بمعرفة خبيرة وابتسامة رقمية",
    fullDescription: "بونجور صاحبي! أنا الدليل، مرشدك السياحي للمغرب من الشمال للجنوب. نوريك المغرب الأصيل بحكاياته وجماله الخفي! 🧭",
    color: "border-cyan-400",
    image: "/src/assets/guide-character.jpg",
    icon: "🧭",
    skills: ["معالم تاريخية", "ثقافة محلية", "جولات سياحية", "أماكن سرية"]
  },
  {
    name: "الموجه",
    title: "مستشار تعليمي ومهني",
    description: "توجيه الشباب المغربي نحو مستقبلهم التعليمي والمهني",
    fullDescription: "أهلا وسهلا! أنا الموجه، مستشارك للتعليم والمستقبل المهني. نساعدك تختار طريقك بثقة ونبنيو معاك مستقبل زاهر! 🎓",
    color: "border-moroccan-emerald",
    image: "/src/assets/scholar-character.jpg",
    icon: "🎓",
    skills: ["توجيه مهني", "اختيار التخصص", "فرص العمل", "تطوير الذات"]
  },
  {
    name: "صلاح آي تي",
    title: "خبير تكنولوجيا وشبكات",
    description: "ربط المغرب من خلال التكنولوجيا المتطورة والابتكار",
    fullDescription: "واش كاين! أنا صلاح آي تي، المهندس التقني المغربي. من الشبكات للبرمجة، نحلولك كل مشاكل التكنولوجيا بالبساطة والفكاهة! 💻",
    color: "border-blue-500",
    image: "/src/assets/tech-character.jpg",
    icon: "💻",
    skills: ["برمجة وتطوير", "شبكات وأمن", "حلول تقنية", "دعم فني"]
  },
];

const About = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentInfo | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with Moroccan Souk image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${moroccanSoukBg})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Ambient Phoenix Animation Layer */}
      <AmbientPhoenix zIndex={10} />

      {/* Navigation */}
      <Navigation />

      {/* Content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-20 pb-12 text-center px-4 relative"
        >
          {/* Tea steam animation */}
          <motion.div
            className="absolute top-32 left-1/4 w-2 h-20 bg-gradient-to-t from-moroccan-gold/30 to-transparent blur-md"
            animate={{ y: [-10, -30, -10], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-32 right-1/3 w-2 h-20 bg-gradient-to-t from-moroccan-terracotta/30 to-transparent blur-md"
            animate={{ y: [-10, -30, -10], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />

          <motion.h1 
            className="text-7xl md:text-9xl font-bold mb-6 text-white font-amiri tracking-wide drop-shadow-2xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            شكون حنا؟
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-5xl mx-auto bg-black/30 backdrop-blur-lg rounded-3xl p-8 border-2 border-moroccan-gold/30 shadow-2xl"
          >
            <p className="text-2xl md:text-3xl text-white/95 leading-relaxed mb-6 font-amiri">
              حنا فريق مغربي من مدينة تارودانت، تحت إشراف صلاح الدين الهروال، متخصّصين فـ تطوير و خلق الذكاء الاصطناعي بطريقة مغربية حرّة 🇲🇦
            </p>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-6 font-amiri">
              بنينا Sou9 El AI باش أي واحد يقدر يخدم الذكاء الاصطناعي فـ طريقته الخاصة، ولكن بـ لمسة مغربية فيها الزليج، الضحك، و الشاي بالنعناع ☕
            </p>
            <p className="text-2xl md:text-3xl text-moroccan-gold font-bold font-amiri">
              "حنا ماشي شركة… حنا عقل مغربي كايبرمج و يضحك و يخترع!" 🤖💃
            </p>
          </motion.div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="container mx-auto px-8 py-12"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black/30 backdrop-blur-md rounded-3xl p-10 border-4 border-moroccan-blue/40 shadow-moroccan relative overflow-hidden"
            >
              {/* AI Circuit decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-moroccan-gold/20 to-moroccan-terracotta/20 rounded-full blur-3xl"></div>
              
              <h2 className="text-5xl md:text-6xl font-bold text-moroccan-blue mb-6 font-amiri text-center">
                👨‍💻 الفريق ديالنا
              </h2>
              <p className="text-2xl md:text-3xl text-white/90 leading-relaxed mb-6 font-amiri text-center">
                فريق صغير ولكن القلب كبير ❤️، جا من <span className="text-moroccan-gold font-bold">تارودانت</span> العاصمة ديال الذكاء المغربي.
              </p>
              <p className="text-xl md:text-2xl text-white/85 leading-relaxed mb-6 font-amiri text-center">
                نخدمو فـ التطوير، الـ design، و نخلقو AI agents كايهضرو، يفكرو، و يعاونو الناس فـ كل المجالات.
              </p>
              <p className="text-xl md:text-2xl text-moroccan-gold font-bold font-amiri text-center">
                الهدف ديالنا بسيط: نسهلو على المغاربة و العالم يستعملو الذكاء الاصطناعي بـ طابع مغربي أصيل.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Sou9 El AI Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="container mx-auto px-8 py-12"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black/30 backdrop-blur-md rounded-3xl p-10 border-4 border-moroccan-emerald/40 shadow-moroccan relative overflow-hidden"
            >
              {/* Hologram effect */}
              <motion.div
                className="absolute top-10 right-10 w-20 h-20 border-2 border-cyan-400/30 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <h2 className="text-5xl md:text-6xl font-bold text-moroccan-emerald mb-6 font-amiri text-center">
                🧠 Sou9 El AI – السوق ديال الذكاء المغربي
              </h2>
              <p className="text-2xl md:text-3xl text-white/90 leading-relaxed mb-6 font-amiri text-center">
                هادي أول منصة مغربية فيها شخصيات AI مغربية حقيقية 👳‍♂️👩‍🍳👩‍🏫
              </p>
              <p className="text-xl md:text-2xl text-white/85 leading-relaxed mb-8 font-amiri text-center">
                كل شخصية عندها شخصية خاصة بها، كتعاونك فمجالها، و كاتهضر معاك بحال خوت.
              </p>
              
              {/* Examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-black/20 rounded-2xl p-4 border-2 border-moroccan-gold/20">
                  <p className="text-lg text-white/90 font-amiri">🩺 <span className="font-bold">سي الطبيب:</span> يعاونك بالنصائح الصحية ديالو بضحكة خفيفة 😄</p>
                </div>
                <div className="bg-black/20 rounded-2xl p-4 border-2 border-moroccan-terracotta/20">
                  <p className="text-lg text-white/90 font-amiri">🥘 <span className="font-bold">شيف بوت:</span> كتطبخ و تشرح المقادير بحال الوالدة</p>
                </div>
                <div className="bg-black/20 rounded-2xl p-4 border-2 border-moroccan-blue/20">
                  <p className="text-lg text-white/90 font-amiri">💻 <span className="font-bold">صلاح آي تي:</span> كايفسرلك التكنيك بلا صداع 🧑‍🔧</p>
                </div>
                <div className="bg-black/20 rounded-2xl p-4 border-2 border-moroccan-gold/20">
                  <p className="text-lg text-white/90 font-amiri">🧙‍♂️ <span className="font-bold">الشيخ:</span> يعطيك الحكمة المغربية فـ كل موقف</p>
                </div>
              </div>

              <p className="text-lg md:text-xl text-white/80 font-amiri text-center italic">
                و كل واحد منهم تقدر تضغط عليه باش تشوف الصورة ديالو و تسمع كيفاش كايعرف راسو بطريقة مضحكة و عفوية.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Characters Section Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-center py-12 px-4"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-white font-amiri mb-4">
            شخصيات السوق 🎭
          </h2>
          <p className="text-xl md:text-2xl text-white/80 font-amiri">
            دوز على أي شخصية باش تعرف عليها أكثر!
          </p>
        </motion.div>

        {/* Agents Grid Layer */}
        <div className="relative z-30">
          <div className="container mx-auto px-8 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8 lg:gap-12 max-w-7xl mx-auto"
            >
              {agents.map((agent, index) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -8, rotate: -1 }}
                  className="relative group cursor-pointer flex"
                  onClick={() => setSelectedAgent(agent)}
                >
                  {/* Card with Moroccan shop styling */}
                  <div
                    className={`relative bg-black/30 backdrop-blur-sm rounded-3xl p-6 border-4 ${agent.color} shadow-lg hover:shadow-moroccan transition-all duration-500 overflow-hidden h-full`}
                  >
                    {/* Character Image */}
                    <div className="relative mb-4 rounded-2xl overflow-hidden border-2 border-moroccan-gold/20">
                      <img 
                        src={agent.image} 
                        alt={agent.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 text-4xl animate-bounce">
                        {agent.icon}
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-moroccan-gold/30 rounded-tr-lg group-hover:border-moroccan-gold transition-colors"></div>
                    <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-moroccan-gold/30 rounded-bl-lg group-hover:border-moroccan-gold transition-colors"></div>

                    {/* Agent content */}
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-moroccan-gold font-amiri mb-2 group-hover:text-moroccan-gold-light transition-colors">
                        {agent.name} {agent.icon}
                      </h3>
                      <p className="text-lg text-white/80 font-semibold mb-3">
                        {agent.title}
                      </p>
                      <p className="text-white/70 leading-relaxed mb-4">
                        {agent.description}
                      </p>
                      <div className="text-center">
                        <span className="inline-block px-4 py-2 bg-moroccan-gold/20 rounded-full text-moroccan-gold font-semibold text-sm group-hover:bg-moroccan-gold/30 transition-colors">
                          تعرف علي أكثر 👋
                        </span>
                      </div>
                    </div>

                    {/* Sparkle effect on hover */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-moroccan-gold/10 via-transparent to-moroccan-terracotta/10 pointer-events-none"></div>
                    
                    {/* Incense smoke effect */}
                    <motion.div
                      className="absolute -top-2 right-1/2 w-1 h-8 bg-gradient-to-t from-moroccan-gold/40 to-transparent blur-sm opacity-0 group-hover:opacity-100"
                      animate={{ y: [-10, -20, -10] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Footer Section */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-center pb-16 px-4"
        >
          <div className="max-w-4xl mx-auto bg-black/30 backdrop-blur-md rounded-3xl p-10 border-4 border-moroccan-gold/40 shadow-2xl relative overflow-hidden">
            {/* Decorative Moroccan icons */}
            <div className="absolute top-4 left-4 text-4xl opacity-20">☕</div>
            <div className="absolute top-4 right-4 text-4xl opacity-20">🕌</div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-4xl opacity-20">🪬</div>
            
            <h3 className="text-4xl md:text-5xl font-bold text-moroccan-gold font-amiri mb-6">
              💬 الختام
            </h3>
            <p className="text-2xl md:text-3xl font-amiri text-white/95 leading-relaxed mb-6">
              Sou9 El AI مشروع مغربي حرّ، تصمّم فـ <span className="font-bold text-moroccan-gold">تارودانت</span>، و الهدف منه يوري للعالم أن المغرب قادر يبدع فالذكاء الاصطناعي على طريقتو الخاصة 🌍✨
            </p>
            <p className="text-xl md:text-2xl font-amiri text-white/90 leading-relaxed mb-6">
              بإشراف <span className="font-bold text-moroccan-gold">صلاح الدين الهروال</span> وفريقه،
            </p>
            <p className="text-2xl md:text-3xl font-bold text-moroccan-gold font-amiri">
              حنا ماشي غير ديڤلوپّورز… حنا صُنّاع المستقبل المغربي 🤝🇲🇦
            </p>
          </div>
        </motion.footer>
      </div>

      {/* Agent Popup Dialog */}
      <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-moroccan-beige border-4 border-moroccan-gold/40 rounded-3xl">
          {selectedAgent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative frame corners */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-moroccan-gold rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-moroccan-gold rounded-bl-3xl"></div>
              
              <DialogHeader className="text-center mb-6">
                <DialogTitle className="text-4xl font-bold text-moroccan-gold-dark font-amiri mb-2">
                  {selectedAgent.name} {selectedAgent.icon}
                </DialogTitle>
                <p className="text-xl text-foreground/80 font-semibold">
                  {selectedAgent.title}
                </p>
              </DialogHeader>

              {/* Character Portrait */}
              <div className="relative mb-6 rounded-2xl overflow-hidden border-4 border-moroccan-gold/30 shadow-2xl">
                <img 
                  src={selectedAgent.image} 
                  alt={selectedAgent.name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-moroccan-beige-dark/40 to-transparent"></div>
              </div>

              {/* Introduction */}
              <div className="bg-moroccan-beige-dark/30 rounded-2xl p-6 mb-6 border-2 border-moroccan-gold/20">
                <p className="text-lg text-foreground/90 leading-relaxed font-amiri text-center">
                  {selectedAgent.fullDescription}
                </p>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-xl font-bold text-moroccan-gold-dark font-amiri mb-4 text-center">
                  المهارات والخدمات:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedAgent.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-moroccan-gold/10 rounded-lg p-3 text-center border border-moroccan-gold/20"
                    >
                      <span className="text-foreground/80 font-semibold">✨ {skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center mt-6">
                <button 
                  onClick={() => setSelectedAgent(null)}
                  className="px-8 py-3 bg-moroccan-gold hover:bg-moroccan-gold-dark text-white font-bold rounded-full transition-colors duration-300 shadow-lg font-amiri text-lg"
                >
                  بارك الله فيك! 🙏
                </button>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default About;

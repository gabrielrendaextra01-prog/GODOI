/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { 
  Car, 
  Droplets, 
  MapPin, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Wrench,
  ShieldCheck,
  SprayCan,
  Trash2,
  Wind
} from "lucide-react";
import { useState, useRef, useEffect, MouseEvent, TouchEvent } from "react";

const SERVICES = [
  { name: "LAVAGEM DETALHADA", icon: Droplets, description: "Limpeza minuciosa em cada detalhe do seu veículo." },
  { name: "LAVAGEM SIMPLES", icon: Car, description: "Limpeza eficiente para o dia a dia." },
  { name: "DESCONTAMINAÇÃO DE PINTURA", icon: Trash2, description: "Remoção de impurezas que danificam o verniz." },
  { name: "POLIMENTO TÉCNICO", icon: Star, description: "Restauração do brilho e eliminação de riscos." },
  { name: "VITRIFICAÇÃO DE PINTURA", icon: ShieldCheck, description: "Proteção cerâmica de longa duração para o verniz." },
  { name: "POLIMENTO DE FARÓIS", icon: Wind, description: "Restauração da clareza e segurança dos seus faróis." },
  { name: "LAVAGEM DE CHASSI", icon: Wrench, description: "Limpeza profunda da parte inferior do veículo." },
  { name: "LIMPEZA DE MOTOR", icon: SprayCan, description: "Lavagem técnica preservando componentes sensíveis." },
  { name: "HIGIÊNIZAÇÃO DO TETO", icon: CheckCircle2, description: "Remoção de manchas e odores internos." },
  { name: "HIGIÊNIZAÇÃO DE BANCOS", icon: CheckCircle2, description: "Limpeza profunda de couro ou tecido." },
  { name: "HIGIÊNIZAÇÃO DE CARPETES", icon: CheckCircle2, description: "Ranhuras e carpetes livres de sujeira." },
];

const PORTFOLIO = [
  {
    title: "Moto Azul",
    before: "https://i.imgur.com/fKRXM2I.jpeg",
    after: "https://i.imgur.com/uzldmEu.jpeg"
  },
  {
    title: "Moto Cinza",
    before: "https://i.imgur.com/m2XSAlD.jpeg",
    after: "https://i.imgur.com/URBID6j.jpeg"
  },
  {
    title: "Moto MT03",
    before: "https://i.imgur.com/lPXwmD7.jpeg",
    after: "https://i.imgur.com/OD0WRPf.jpeg"
  },
  {
    title: "Roda Traseira",
    before: "https://i.imgur.com/HmYW5lF.jpeg",
    after: "https://i.imgur.com/XS2CSch.jpeg"
  }
];

const CONTACTS = [
  { name: "LUCIANO", link: "https://api.whatsapp.com/send?phone=5562999999029" },
  { name: "MATHEUS", link: "https://api.whatsapp.com/send?phone=5562998172456" }
];

function BeforeAfterSlider({ before, after, title }: { before: string; after: string; title: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in event ? event.touches[0].clientX : event.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-light tracking-wide text-zinc-400">{title}</h3>
      <div 
        ref={containerRef}
        className="relative aspect-square md:aspect-video rounded-xl overflow-hidden cursor-ew-resize select-none border border-white/10 bg-white/2"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* After Image (Background) */}
        <img 
          src={after} 
          alt={`${title} depois`}
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        {/* Before Image (Foreground with Clip) */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img 
            src={before} 
            alt={`${title} antes`}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Divider Handle */}
        <div 
          className="absolute inset-y-0 w-[2px] bg-brand shadow-[0_0_15px_rgba(34,211,238,0.4)] cursor-ew-resize flex items-center justify-center z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.6)] -ml-[1px]">
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-black/60 rounded-full" />
              <div className="w-1 h-3 bg-black/60 rounded-full" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-5 left-5 px-3 py-1 bg-black/80 backdrop-blur-md rounded border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white pointer-events-none z-10">
          Antes
        </div>
        <div className="absolute top-5 right-5 px-3 py-1 bg-brand text-black shadow-[0_0_20px_rgba(34,211,238,0.5)] rounded text-[10px] font-black uppercase tracking-[0.2em] pointer-events-none z-10">
          Depois
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div className="min-h-screen selection:bg-brand selection:text-white">
      {/* Floating Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-6 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand shadow-[0_0_15px_rgba(34,211,238,0.4)] bg-zinc-900 flex items-center justify-center p-1">
              <img 
                src="https://i.imgur.com/tBc8uWb.jpeg" 
                alt="Godoi Estética Automotiva Logo" 
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="font-display font-black text-xl tracking-[0.1em] uppercase hidden sm:block">
              Godoi Estética Automotiva
            </h1>
          </div>
          <nav className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3 mr-6">
              {CONTACTS.map(c => (
                <a 
                  key={c.name}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 border border-white/20 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all"
                >
                  <span className="text-green-500 text-lg leading-none">●</span>
                  {c.name}
                </a>
              ))}
            </div>
            <a 
              href="#contato" 
              className="bg-brand hover:bg-brand-light text-black px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(34,211,238,0.5)]"
            >
              Agendar
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-brand/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-zinc-800/20 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl"
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
            <span className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              Estética Automotiva de Elite
            </span>
          </div>
          <h1 className="text-6xl md:text-9xl font-display font-black leading-[0.85] tracking-tighter uppercase mb-8">
            GODOI<br />
            <span className="text-brand">ESTÉTICA</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600 pr-4">AUTOMOTIVA</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Seu veículo como novo. Do detalhe à proteção extrema, garantimos o melhor resultado em Bela Vista de Goiás.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#contato"
              className="w-full sm:w-auto px-10 py-5 bg-brand text-black font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 group transition-all hover:bg-brand-light hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(34,211,238,0.4)]"
            >
              Solicitar Orçamento
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#servicos"
              className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-zinc-300 font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center hover:bg-white/10 transition-all hover:text-white"
            >
              Nossos Serviços
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-[30px] h-[50px] rounded-full border-2 border-zinc-800 flex justify-center p-2 opacity-50">
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-3 bg-brand rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="section-container relative bg-zinc-950">
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-brand font-black text-xs uppercase tracking-[0.4em] block mb-4">Especialidades</span>
              <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none">
                Nossos <span className="text-zinc-600">Serviços</span>
              </h2>
            </div>
            <p className="max-w-md text-zinc-500 font-medium">
              Utilizamos produtos de alta tecnologia e técnicas avançadas para garantir que cada centímetro do seu veículo receba o tratamento que merece.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group p-6 bg-white/[0.03] border-l-2 border-white/10 hover:border-brand transition-all flex items-center gap-6"
            >
              <div className="w-10 h-10 flex items-center justify-center text-zinc-500 group-hover:text-brand transition-colors">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-medium tracking-wide uppercase text-zinc-300 group-hover:text-white transition-colors">
                {service.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-container border-t border-zinc-900">
        <div className="mb-16 text-center">
          <span className="text-brand font-black text-xs uppercase tracking-[0.4em] block mb-4">Galeria</span>
          <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none mb-6">
            Resultados <span className="text-zinc-600">Reais</span>
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-500 font-medium">
            Deslize o controle para ver a transformação completa. A diferença nos detalhes que valorizam seu patrimônio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PORTFOLIO.map((item, index) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BeforeAfterSlider {...item} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container mt-20">
        <div className="relative rounded-[50px] overflow-hidden bg-brand p-12 md:p-24 text-center">
          <div className="absolute inset-0 bg-black/10 opacity-50" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-30" />
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl md:text-7xl font-display font-black text-white uppercase leading-none mb-8 tracking-tighter">
              PRONTO PARA<br />BRILHAR NAS RUAS?
            </h2>
            <p className="text-white/80 text-lg font-bold mb-12 max-w-xl uppercase tracking-widest">
              Agende agora seu atendimento personalizado em Bela Vista de Goiás.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              {CONTACTS.map((contact) => (
                <a 
                  key={contact.name}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-12 py-5 bg-white text-brand font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-2xl"
                >
                  <Phone className="w-5 h-5 fill-current" />
                  Falar com {contact.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer & Map */}
      <footer id="contato" className="section-container border-t border-zinc-900 bg-zinc-950/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl overflow-hidden p-1 bg-zinc-900 border border-zinc-800">
                <img 
                  src="https://i.imgur.com/tBc8uWb.jpeg" 
                  alt="Godoi Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-display font-black text-3xl uppercase tracking-tighter">
                GODOI<br /><span className="text-brand">ESTÉTICA</span>
              </h3>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/5 p-8 rounded-2xl border border-dashed border-white/10 backdrop-blur-sm">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand mb-4">Localização</h4>
                <p className="text-sm font-medium text-zinc-400 leading-[1.8] uppercase">
                  <b className="text-white text-xs block mb-1">Bela Vista de Goiás</b>
                  Rua Carajás, Qd 12, Lt 02<br />
                  Setor Maria Nadir
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand mb-1 pl-1">WhatsApp Direct</h4>
                <div className="flex flex-col md:flex-row gap-3">
                  {CONTACTS.map(c => (
                    <a 
                      key={c.name} 
                      href={c.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-bold text-zinc-200 hover:text-brand hover:border-brand/50 transition-all flex items-center justify-between"
                    >
                      {c.name}
                      <ArrowRight className="w-4 h-4 opacity-30" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-[40px] overflow-hidden border border-zinc-800 min-h-[300px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3815.118991461943!2d-48.955483!3d-17.0068433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935e49339739564f%3A0xe744e45e77699926!2sRua%20Caraj%C3%A1s%2C%20Bela%20Vista%20de%20Goi%C3%A1s%20-%20GO!5e0!3m2!1spt-BR!2sbr!4v1713360000000!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale invert opacity-80"
            />
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">
            © 2026 GODOI ESTÉTICA AUTOMOTIVA. TODOS OS DIREITOS RESERVADOS.
          </p>
          <div className="flex items-center gap-6">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">Design por Build</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp Fixed Button */}
      <a 
        href={CONTACTS[0].link}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-white text-brand rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group border-4 border-brand"
      >
        <Phone className="w-8 h-8 group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
}

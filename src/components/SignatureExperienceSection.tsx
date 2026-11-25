import { useRef, useState, useCallback, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
  animate,
} from 'framer-motion';
import { ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';
import { PATIENT_DECK } from '../data/clinicData';
import { gsap, useGSAP, SplitText } from '../lib/gsapSetup';

export function SignatureExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const rightHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      [leftHeadingRef.current, rightHeadingRef.current].forEach((heading, idx) => {
        if (!heading) return;
        SplitText.create(heading, {
          type: 'lines, words',
          mask: 'lines',
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.words, {
              yPercent: 100,
              opacity: 0,
              stagger: 0.035,
              duration: 0.85,
              delay: idx * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 78%',
                once: true,
              },
            });
          },
        });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.signature-left-reveal', {
          y: 26,
          opacity: 0,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            once: true,
          },
        });

        gsap.fromTo(
          '.signature-lens-frame',
          { clipPath: 'inset(12% 0% 0% 0%)', y: 28, opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            clearProps: 'transform,opacity,clipPath',
            scrollTrigger: {
              trigger: '.signature-lens-frame',
              start: 'top 84%',
              once: true,
            },
          }
        );

        gsap.from('.signature-deck-reveal', {
          x: 34,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '.signature-deck-reveal',
            start: 'top 84%',
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );
  // 1. Lente Comparadora + Canvas 2D Metabólico em 60fps via MotionValue
  const splitValue = useMotionValue(54);
  const smoothSplit = useSpring(splitValue, { stiffness: 260, damping: 32 });
  const clipRight = useTransform(smoothSplit, (v) => `inset(0 ${100 - v}% 0 0)`);
  const dividerLeft = useTransform(smoothSplit, (v) => `${v}%`);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const comparatorRef = useRef<HTMLDivElement | null>(null);
  const draggingLens = useRef(false);

  const drawMetabolicGrid = useCallback((percent: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cutX = (percent / 100) * w;

    ctx.save();
    ctx.beginPath();
    ctx.rect(cutX, 0, w - cutX, h);
    ctx.clip();

    ctx.strokeStyle = 'rgba(31, 122, 83, 0.35)';
    ctx.lineWidth = 1;
    const step = 28;
    for (let x = 0; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(19, 49, 35, 0.72)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cutX, h * 0.48, 54, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();

    ctx.restore();
  }, []);

  useEffect(() => {
    drawMetabolicGrid(splitValue.get());
  }, [drawMetabolicGrid, splitValue]);

  useMotionValueEvent(smoothSplit, 'change', (latest) => {
    drawMetabolicGrid(latest);
  });

  const updateLensFromClientX = (clientX: number) => {
    const box = comparatorRef.current?.getBoundingClientRect();
    if (!box) return;
    const pct = Math.max(12, Math.min(88, ((clientX - box.left) / box.width) * 100));
    splitValue.set(pct);
  };

  // 2. Baralho Tátil Arrastável (Framer Motion Drag & Snap)
  const deckProgress = useMotionValue(0);
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const dragRef = useRef<{ startX: number; startProgress: number; moved: number } | null>(null);

  const snapToIndex = useCallback(
    (targetIdx: number) => {
      const clamped = Math.max(0, Math.min(PATIENT_DECK.length - 1, targetIdx));
      setActiveCardIdx(clamped);
      animate(deckProgress, clamped, {
        type: 'spring',
        duration: 0.75,
        bounce: 0.22,
      });
    },
    [deckProgress]
  );

  const onDeckPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      startX: e.clientX,
      startProgress: deckProgress.get(),
      moved: 0,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onDeckPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    dragRef.current.moved = Math.abs(dx);
    const next = dragRef.current.startProgress - dx / 280;
    deckProgress.set(Math.max(-0.35, Math.min(PATIENT_DECK.length - 0.65, next)));
  };

  const onDeckPointerUp = () => {
    if (!dragRef.current) return;
    const current = deckProgress.get();
    const isFlick = dragRef.current.moved > 38;
    const velocityDir = deckProgress.getVelocity() > 0 ? 1 : -1;
    const target = isFlick
      ? Math.round(current + velocityDir * 0.35)
      : Math.round(current);
    dragRef.current = null;
    snapToIndex(target);
  };

  return (
    <section
      id="experiencia"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden bg-[#E3F1E8] pt-28 pb-24 sm:pt-32 sm:pb-32 px-5 sm:px-10 text-[#133123]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
          {/* ESQUERDA: Lente Comparadora */}
          <div className="lg:col-span-6">
            <p className="signature-left-reveal font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#1F7A53]">
              Leitura de Nutrientes &amp; Rotina
            </p>
            <h2
              ref={leftHeadingRef}
              className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-medium leading-[1.03]"
            >
              Prazer à mesa guiado por precisão metabólica
            </h2>
            <p className="signature-left-reveal mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[#466959]">
              Arraste o divisor sobre a composição para alternar entre o olhar gastronômico
              leve e a malha clínica de densidade nutricional que sustenta seus resultados.
            </p>

            <div
              ref={comparatorRef}
              onPointerDown={(e) => {
                draggingLens.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                updateLensFromClientX(e.clientX);
              }}
              onPointerMove={(e) => {
                if (draggingLens.current) {
                  updateLensFromClientX(e.clientX);
                }
              }}
              onPointerUp={() => {
                draggingLens.current = false;
              }}
              className="signature-lens-frame card-chamfer relative mt-8 aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden border border-[#1F7A53]/25 bg-[#D5ECDD] shadow-verda touch-none"
            >
              {/* Camada Base (Lado Direito: Leitura Metabólica) */}
              <img
                src="/images/craft-nutrition.jpg"
                alt="Análise nutricional de fibras, fitoquímicos e micronutrientes"
                width={900}
                height={680}
                className="h-full w-full object-cover saturate-75 contrast-110 brightness-95"
                draggable={false}
              />

              {/* Canvas 2D desenhando a grade nutricional em tempo real */}
              <canvas
                ref={canvasRef}
                width={640}
                height={480}
                className="pointer-events-none absolute inset-0 h-full w-full"
              />

              {/* Camada Superior (Lado Esquerdo: Comida Viva) */}
              <motion.div
                style={{ clipPath: clipRight }}
                className="pointer-events-none absolute inset-0"
              >
                <img
                  src="/images/craft-nutrition.jpg"
                  alt="Gastronomia leve e ingredientes naturais em verde claro"
                  width={900}
                  height={680}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </motion.div>

              {/* Linha Divisória Óptica */}
              <motion.div
                style={{ left: dividerLeft }}
                className="pointer-events-none absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[#F6FAF7]"
              >
                <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#1F7A53] bg-[#F6FAF7]/95 text-[#1F7A53] shadow-verda">
                  <MoveHorizontal className="h-4 w-4" />
                </div>
              </motion.div>

              {/* Etiquetas Localizadas */}
              <div className="pointer-events-none absolute bottom-4 left-5 rounded-full bg-[#133123]/80 px-3 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-[#F6FAF7] backdrop-blur-md">
                Sabor &amp; Leveza
              </div>
              <div className="pointer-events-none absolute bottom-4 right-5 rounded-full bg-[#1F7A53]/90 px-3 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-white backdrop-blur-md">
                Densidade Vital
              </div>
            </div>
          </div>

          {/* DIREITA: Baralho Tátil Arrastável de Relatos */}
          <div className="lg:col-span-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="signature-deck-reveal font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#1F7A53]">
                  Histórias em Folhas
                </p>
                <h3
                  ref={rightHeadingRef}
                  className="mt-2 font-display text-3xl sm:text-4xl font-medium"
                >
                  Arraste para ler rotinas transformadas
                </h3>
              </div>

              <div className="signature-deck-reveal flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Relato anterior"
                  disabled={activeCardIdx === 0}
                  onClick={() => snapToIndex(activeCardIdx - 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1F7A53]/30 bg-[#F6FAF7] text-[#133123] disabled:opacity-35 hover:border-[#1F7A53] transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Próximo relato"
                  disabled={activeCardIdx === PATIENT_DECK.length - 1}
                  onClick={() => snapToIndex(activeCardIdx + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1F7A53]/30 bg-[#F6FAF7] text-[#133123] disabled:opacity-35 hover:border-[#1F7A53] transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Palco do Baralho Arrastável */}
            <div
              onPointerDown={onDeckPointerDown}
              onPointerMove={onDeckPointerMove}
              onPointerUp={onDeckPointerUp}
              onPointerCancel={onDeckPointerUp}
              className="signature-deck-reveal relative mt-8 h-[390px] sm:h-[370px] w-full cursor-grab active:cursor-grabbing select-none touch-pan-y"
            >
              {PATIENT_DECK.map((card, index) => (
                <DeckCardItem
                  key={card.id}
                  card={card}
                  index={index}
                  progress={deckProgress}
                  onSelect={() => snapToIndex(index)}
                />
              ))}
            </div>

            {/* Indicadores Táteis */}
            <div className="mt-6 flex items-center gap-2">
              {PATIENT_DECK.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  aria-label={`Ir para relato de ${c.patient}`}
                  onClick={() => snapToIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeCardIdx ? 'w-10 bg-[#1F7A53]' : 'w-2.5 bg-[#1F7A53]/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeckCardItem({
  card,
  index,
  progress,
  onSelect,
}: {
  card: (typeof PATIENT_DECK)[number];
  index: number;
  progress: ReturnType<typeof useMotionValue<number>>;
  onSelect: () => void;
}) {
  const offset = useTransform(progress, (p) => index - p);
  const x = useTransform(offset, (d) => d * 42);
  const y = useTransform(offset, (d) => Math.abs(d) * 14);
  const rotate = useTransform(offset, (d) => d * 3.8);
  const scale = useTransform(offset, (d) => Math.max(0.84, 1 - Math.abs(d) * 0.065));
  const opacity = useTransform(offset, (d) => (d < -0.75 ? Math.max(0, 1 + d) : 1 - Math.abs(d) * 0.18));
  const zIndex = useTransform(offset, (d) => 30 - Math.round(Math.abs(d) * 10));

  return (
    <motion.article
      onClick={onSelect}
      style={{ x, y, rotate, scale, opacity, zIndex }}
      className={`absolute inset-0 flex flex-col justify-between p-8 sm:p-10 shadow-verda will-change-transform ${
        index % 2 === 0
          ? 'card-leaf bg-[#F6FAF7] border border-[#1F7A53]/20 text-[#133123]'
          : 'card-pill-ticket bg-[#1E4935] text-[#F6FAF7] border border-[#A7E8C3]/30'
      }`}
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={`font-mono-tech text-[10px] uppercase tracking-[0.2em] ${
              index % 2 === 0 ? 'text-[#1F7A53]' : 'text-[#A7E8C3]'
            }`}
          >
            {card.treatment}
          </span>
          <span
            className={`rounded-full px-3 py-1 font-mono-tech text-[10px] ${
              index % 2 === 0
                ? 'bg-[#D5ECDD] text-[#133123]'
                : 'bg-[#133123]/60 text-[#EAF4EE]'
            }`}
          >
            {card.shadeTone}
          </span>
        </div>

        <blockquote className="mt-6 font-display text-2xl sm:text-[1.75rem] font-medium leading-[1.25]">
          “{card.quote}”
        </blockquote>
      </div>

      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-t pt-4 ${
          index % 2 === 0 ? 'border-[#133123]/12' : 'border-[#A7E8C3]/25'
        }`}
      >
        <div>
          <p className="text-sm font-semibold">{card.patient}</p>
          <p
            className={`text-xs ${
              index % 2 === 0 ? 'text-[#466959]' : 'text-[#C2E2CF]'
            }`}
          >
            {card.age}
          </p>
        </div>
        <span
          className={`font-mono-tech text-[10px] ${
            index % 2 === 0 ? 'text-[#1F7A53]' : 'text-[#A7E8C3]'
          }`}
        >
          {card.resultNote}
        </span>
      </div>
    </motion.article>
  );
}

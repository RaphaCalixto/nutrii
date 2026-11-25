import { useRef } from 'react';
import { TECHNOLOGY_STAGES } from '../data/clinicData';
import { gsap, useGSAP } from '../lib/gsapSetup';

export function HorizontalJourneySection() {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current;
        if (!track) return;

        const getScrollDistance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth + 48);

        const horizontalTween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 0.2,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        const cards = gsap.utils.toArray<HTMLElement>('.journey-stage-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 28, opacity: 0.55 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: 'left 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: wrapperRef }
  );

  const shapeClass = (shape: string) => {
    switch (shape) {
      case 'arch':
        return 'card-arch';
      case 'chamfer':
        return 'card-chamfer';
      case 'leaf':
        return 'card-leaf';
      default:
        return 'card-pill-ticket';
    }
  };

  return (
    <section
      id="tecnologia"
      ref={wrapperRef}
      className="relative scroll-mt-24 overflow-hidden bg-[#DFF0E5] text-[#133123] bg-blueprint-grid-sage"
    >
      <div className="mx-auto max-w-7xl px-5 pt-28 pb-6 sm:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#1F7A53]">
              Jornada Nutricional Integrada
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,4.6vw,3.9rem)] font-medium leading-[1.02]">
              Quatro etapas de cuidado contínuo
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#385748]">
            Da leitura metabólica inicial até o suporte semanal entre consultas, cada etapa
            respeita o seu tempo e a sua rotina.
          </p>
        </div>

        {/* Medidor contínuo da travessia horizontal */}
        <div className="mt-8 h-[2px] w-full overflow-hidden rounded-full bg-[#1F7A53]/20">
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left scale-x-0 bg-[#1F7A53]"
          />
        </div>
      </div>

      {/* Faixa Horizontal */}
      <div className="pb-20 pt-6">
        <div
          ref={trackRef}
          className="flex flex-col gap-8 px-5 sm:px-10 lg:flex-row lg:w-max lg:items-stretch lg:gap-10 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pr-[16vw]"
        >
          {TECHNOLOGY_STAGES.map((stage, idx) => {
            const isContrastVariant = idx % 2 === 1;
            const isArchCard = stage.shape === 'arch';
            return (
              <article
                key={stage.id}
                className={`journey-stage-card group relative flex flex-col justify-between overflow-hidden ${
                  isArchCard ? 'p-4 pb-7 sm:p-5 sm:pb-9' : 'p-7 sm:p-9'
                } lg:w-[clamp(420px,36vw,740px)] shrink-0 transition-transform duration-500 hover:-translate-y-1.5 ${shapeClass(
                  stage.shape
                )} ${
                  isContrastVariant
                    ? 'bg-[#1D4433] border border-[#8FE3B4]/30 text-[#F6FAF7] shadow-verda-deep'
                    : 'bg-[#F6FAF7] border border-[#1F7A53]/15 text-[#133123] shadow-verda'
                }`}
              >
                <div>
                  {isArchCard ? (
                    <>
                      <div className="overflow-hidden rounded-t-full rounded-b-2xl h-[210px] lg:h-[235px]">
                        <img
                          src={stage.image}
                          alt={stage.title}
                          width={800}
                          height={500}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-5 px-3 flex items-center justify-between gap-2">
                        <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#1F7A53]">
                          {stage.tag}
                        </span>
                        <span className="rounded-full bg-[#D5ECDD] px-3 py-1 font-mono-tech text-[10px] text-[#133123]">
                          {stage.detailMetric}
                        </span>
                      </div>
                      <div className="px-3">
                        <h3 className="mt-4 font-display text-3xl font-semibold leading-tight">
                          {stage.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-[#466959]">
                          {stage.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-mono-tech text-[10px] uppercase tracking-[0.2em] ${
                            isContrastVariant ? 'text-[#A7E8C3]' : 'text-[#1F7A53]'
                          }`}
                        >
                          {stage.tag}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 font-mono-tech text-[10px] ${
                            isContrastVariant
                              ? 'bg-[#2A9266]/35 text-[#EAF4EE]'
                              : 'bg-[#D5ECDD] text-[#133123]'
                          }`}
                        >
                          {stage.detailMetric}
                        </span>
                      </div>

                      <div
                        className={`mt-6 overflow-hidden h-[195px] lg:h-[215px] ${
                          stage.shape === 'leaf'
                            ? 'rounded-[6px_42px_6px_42px]'
                            : 'rounded-2xl'
                        }`}
                      >
                        <img
                          src={stage.image}
                          alt={stage.title}
                          width={800}
                          height={500}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>

                      <h3 className="mt-6 font-display text-3xl font-semibold leading-tight">
                        {stage.title}
                      </h3>
                      <p
                        className={`mt-3 text-sm leading-relaxed ${
                          isContrastVariant ? 'text-[#C2E2CF]' : 'text-[#466959]'
                        }`}
                      >
                        {stage.description}
                      </p>
                    </>
                  )}
                </div>

                <div
                  className={`mt-7 flex items-center justify-between border-t pt-4 text-xs font-medium ${
                    isArchCard ? 'mx-3' : ''
                  } ${
                    isContrastVariant
                      ? 'border-[#A7E8C3]/20 text-[#A7E8C3]'
                      : 'border-[#133123]/10 text-[#1F7A53]'
                  }`}
                >
                  <span>Protocolo Dra. Helena</span>
                  <span className="font-mono-tech text-[11px]">VITA · 360</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Calendar, Leaf, Menu, X } from 'lucide-react';
import { gsap } from '../lib/gsapSetup';

interface NavbarProps {
  onOpenBooking: (preselectedSpecialty?: string) => void;
}

const NAV_LINKS = [
  { id: 'manifesto', label: 'Filosofia' },
  { id: 'tecnologia', label: 'Método' },
  { id: 'especialidades', label: 'Especialidades' },
  { id: 'experiencia', label: 'Relatos' },
  { id: 'equipe', label: 'Sobre Mim' },
];

export function Navbar({ onOpenBooking }: NavbarProps) {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isScrolled = latest > 70;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  });

  useEffect(() => {
    const sections = ['hero', ...NAV_LINKS.map((l) => l.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -45% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    gsap.to(window, {
      duration: 1.05,
      scrollTo: { y: `#${id}`, offsetY: 92 },
      ease: 'power3.inOut',
    });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8 sm:pt-5 pointer-events-none">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        {/* Marca Pessoal Editorial */}
        <motion.button
          type="button"
          onClick={() => handleNavClick('hero')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`pointer-events-auto group flex items-center gap-3 rounded-full px-4 py-2.5 backdrop-blur-xl transition-colors duration-300 border ${
            scrolled
              ? 'bg-[#F6FAF7]/90 border-[#133123]/12 text-[#133123] shadow-verda'
              : 'bg-[#F6FAF7]/78 border-[#1F7A53]/20 text-[#133123] shadow-verda'
          }`}
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#1F7A53] text-white">
            <Leaf className="h-3.5 w-3.5" />
          </span>
          <div className="flex flex-col text-left leading-none">
            <span className="font-display text-lg font-semibold tracking-wide">
              Helena Prado
            </span>
            <span className="font-mono-tech text-[9px] uppercase tracking-[0.22em] text-[#466959]">
              Nutrição
            </span>
          </div>
        </motion.button>

        {/* Pílula Central de Navegação (Desktop) */}
        <nav
          aria-label="Navegação principal"
          className={`pointer-events-auto hidden lg:flex items-center gap-1 rounded-full px-2 py-1.5 backdrop-blur-xl border transition-colors duration-300 ${
            scrolled
              ? 'bg-[#F6FAF7]/90 border-[#133123]/12 text-[#133123] shadow-verda'
              : 'bg-[#F6FAF7]/78 border-[#1F7A53]/20 text-[#133123] shadow-verda'
          }`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`relative rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-[#466959] hover:text-[#133123]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    className="absolute inset-0 rounded-full -z-10 bg-[#1F7A53]"
                  />
                )}
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* CTA & Menu Mobile */}
        <div className="pointer-events-auto flex items-center gap-2">
          <motion.button
            type="button"
            onClick={() => onOpenBooking()}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            className="hidden sm:inline-flex items-center gap-2.5 rounded-full bg-[#1F7A53] px-5 py-3 text-xs font-semibold tracking-wide text-white shadow-verda hover:bg-[#175F40] transition-colors"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Agendar Consulta</span>
          </motion.button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-xl border bg-[#F6FAF7]/90 border-[#133123]/15 text-[#133123]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Barra de progresso de leitura ultrafina */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#2A9266] z-50"
      />

      {/* Drawer Mobile */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto lg:hidden mt-3 mx-auto max-w-md rounded-3xl bg-[#F6FAF7]/95 backdrop-blur-2xl border border-[#1F7A53]/20 p-5 text-[#133123] shadow-verda-deep"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium text-[#133123] hover:bg-[#D5ECDD] transition-colors"
              >
                <span>{link.label}</span>
                <span className="font-mono-tech text-[10px] text-[#1F7A53]">IR</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onOpenBooking();
            }}
            className="mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-[#1F7A53] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#175F40] transition-colors"
          >
            <Calendar className="h-4 w-4" />
            <span>Agendar Consulta</span>
          </button>
        </motion.div>
      )}
    </header>
  );
}

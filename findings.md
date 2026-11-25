# Findings & Decisions

## Requirements

- Website moderno em tons de azul para um Dentista (clínica odontológica editorial **Saphir Odontologia**).
- Animações e transições variadas utilizando as skills e libs disponíveis (GSAP: `ScrollTrigger`, `SplitText`, `Flip`, `DrawSVGPlugin`, `@gsap/react`; Framer Motion: `MotionValue`, `useSpring`, `useTransform`, `AnimatePresence`, gestos e Canvas 2D; Lenis smooth scroll).
- Cards em formatos e designs distintos (sem grids monótonos idênticos).
- Escopo completo de landing page cinematográfica: Hero dimensional multi-plano, manifesto/técnica, jornada tecnológica horizontal, especialidades com filtro e detalhe, signature move interativo, corpo clínico e agendamento via modal/drawer (sem backend/banco, com confirmação simulada + opção WhatsApp).
- Direção estética: Editorial Clínico Luxuoso (Azul Safira/Marinho + Porcelana Fria + Tipografia Display & Serifa).

## Research Findings

- Ambiente Windows com Node `v24.15.0` e `npm.cmd` `11.12.1`.
- Todos os plugins GSAP (`SplitText`, `Flip`, `DrawSVGPlugin`, `ScrollTrigger`, `Observer`) estão incluídos gratuitamente no pacote `gsap` padrão.
- Em React, animações GSAP devem usar `useGSAP()` de `@gsap/react` com `scope` e registro único de plugins no topo.
- Para alta performance em gestos contínuos e Canvas 2D, usar `MotionValue` + `useSpring` + `useMotionValueEvent` sem disparar re-renders de `useState`.
- Evitar `transition: all` ou animar `width`/`height`/`top`/`left`; priorizar `transform`, `opacity` e `clip-path`.

## Technical Decisions

| Decision | Rationale |
|----------|-----------|
| Vite + React + TypeScript + Tailwind CSS v4 | Setup leve, rápido e ideal para combinar GSAP e Framer Motion |
| Imagens geradas via `image-generator` salvas em `public/images/` | Garante estética fotográfica coerente em tons de azul sem depender de URLs externas quebradas |
| Dois stops de acento azul (Cobalto `#1A56DB` no claro, Gelo Luminoso `#7BB3FF` no escuro) | Mantém contraste acessível (>4.5:1) preservando uma única família cromática azul |

## Issues Encountered

| Issue | Resolution |
|-------|------------|
| `npm.ps1` restrito por ExecutionPolicy | Usar `npm.cmd` em comandos de terminal |

## Resources

- `C:\Users\NaoDr\.gemini\config\plugins\frontend-design\skills\frontend-design\SKILL.md`
- `C:\Users\NaoDr\.gemini\config\plugins\scroll-craft\skills\scroll-craft\SKILL.md`
- `C:\Users\NaoDr\.gemini\config\skills\framer-motion\SKILL.md`
- `C:\Users\NaoDr\.gemini\config\plugins\gsap-skills\skills\gsap-plugins\SKILL.md`

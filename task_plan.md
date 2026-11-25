# Task Plan: Website Editorial Saphir Odontologia (Tons de Azul)

## Goal

Construir um website cinematográfico e responsivo em tons de azul para a clínica odontológica editorial **Saphir Odontologia**, utilizando React, TypeScript, Tailwind CSS, GSAP (ScrollTrigger, SplitText, Flip, DrawSVG), Framer Motion (MotionValue, springs, AnimatePresence, Canvas 2D) e Lenis, com cards de formatos arquitetônicos distintos e agendamento interativo.

## Next Step

Projeto concluído, validado em build e inspecionado visualmente no navegador.

## Current Phase

Complete

## Phases

### Phase 1: Requirements & Discovery

- [x] Coletar requisitos via formulário interativo (`ask_question`)
- [x] Ler skills obrigatórias (`frontend-design`, `scroll-craft`, `framer-motion`, `gsap-react`, `gsap-scrolltrigger`, `gsap-plugins`, `planning-with-files`)
- [x] Inicializar workspace Vite + React + TypeScript
- **Status:** complete

### Phase 2: Planning & Architecture

- [x] Instalar bibliotecas de animação, scroll e estilização
- [x] Configurar tipografia (`Cormorant Garamond`, `Plus Jakarta Sans`, `JetBrains Mono`), tokens de cor azul editorial e `.gitignore`
- [x] Definir estrutura modular de componentes e dados clínicos
- **Status:** complete

### Phase 3: Visual Assets & Core Design System

- [x] Gerar imagens editoriais em tons de azul via `image-generator` (hero em camadas, retratos clínicos, estética dental)
- [x] Implementar utilitários de textura (NoiseOverlay, máscaras, clip-paths distintos) e wrapper Lenis + GSAP
- **Status:** complete

### Phase 4: Implementation of Sections & Distinct Cards

- [x] Implementar Navbar flutuante e Hero dimensional multi-plano (scroll scrub + pointer depth)
- [x] Implementar Ato 2: Manifesto pinado com `SplitText` e traço SVG (`DrawSVG`)
- [x] Implementar Ato 3: Travessia horizontal (`ScrollTrigger containerAnimation`) da jornada tecnológica
- [x] Implementar Ato 4: Especialidades com 4 formatos distintos de cards + filtro animado com `GSAP Flip`
- [x] Implementar Ato 5: Signature Move (Lente comparadora interativa + Baralho tátil drag-and-snap em Framer Motion / Canvas)
- [x] Implementar Ato 6 & 7: Corpo clínico com reveal por máscara, encerramento resolutivo e Drawer de Agendamento
- **Status:** complete

### Phase 5: Testing, Visual Verification & Delivery

- [x] Executar `npm.cmd run build` e checagem de tipos TypeScript (`tsc --noEmit`)
- [x] Iniciar servidor local e inspecionar visualmente (desktop e mobile) no navegador
- [x] Corrigir eventuais ajustes visuais/responsivos e finalizar entrega
- **Status:** complete

## Key Questions

1. Stack: React + Vite + Tailwind CSS + GSAP + Framer Motion (Respondido)
2. Escopo: Landing page cinematográfica completa (Respondido)
3. Dados: Sem banco inicial — modal/drawer interativo + simulação/WhatsApp (Respondido)
4. Estética: Editorial Clínico Luxuoso em Azul Safira/Marinho + Porcelana (Respondido)

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Paleta Azul Safira `#09152B` / `#0B1D3A` + Porcelana `#F4F7FB` + Cobalto `#1A56DB` / `#6BA3FF` | Foge do visual genérico branco/roxo, entrega alto contraste e sofisticação clínica editorial |
| Tipografia `Cormorant Garamond` + `Plus Jakarta Sans` + `JetBrains Mono` | Evita Inter/Roboto; cria contraste editorial marcante |
| 5 silhuetas de cards distintas (Arco, Chanfrado, Folha Orgânica, Flip Editorial, Lâminas Arrastáveis) | Atende diretamente ao pedido de cards em formatos e designs distintos |
| GSAP (`useGSAP`, `ScrollTrigger`, `SplitText`, `Flip`, `DrawSVGPlugin`) + Framer Motion + Lenis | Combina coreografia de scroll precisa com física de molas e gestos táteis a 60fps |

## Errors Encountered

| Error | Attempt | Resolution |
|-------|---------|------------|
| `npm` bloqueado por ExecutionPolicy do PowerShell (`npm.ps1`) | 1 | Utilizar `npm.cmd` e `npx.cmd` diretamente |

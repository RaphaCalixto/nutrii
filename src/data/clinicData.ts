export type SpecialtyCategory = 'todas' | 'comportamental' | 'clinica' | 'esportiva';

export type CardShapeVariant = 'arch' | 'chamfer' | 'leaf' | 'capsule-cut';

export interface SpecialtyItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: Exclude<SpecialtyCategory, 'todas'>;
  categoryLabel: string;
  shape: CardShapeVariant;
  duration: string;
  precisionMetric: string;
  summary: string;
  clinicalProtocol: string[];
  idealFor: string;
  image: string;
  imageAlt: string;
  surfaceTheme: 'porcelain' | 'sage' | 'forest' | 'mint';
}

export interface TechnologyStage {
  id: string;
  tag: string;
  title: string;
  description: string;
  detailMetric: string;
  shape: 'arch' | 'chamfer' | 'leaf' | 'pill';
  image: string;
}

export interface LeadNutritionist {
  name: string;
  title: string;
  crn: string;
  bio: string;
  credentials: string[];
  focus: string[];
  image: string;
}

export interface PatientDeckCard {
  id: string;
  patient: string;
  age: string;
  treatment: string;
  quote: string;
  resultNote: string;
  shadeTone: string;
}

export const SPECIALTIES: SpecialtyItem[] = [
  {
    id: 'nutricao-comportamental',
    code: 'ESP.01',
    title: 'Nutrição Comportamental & Leveza',
    subtitle: 'Autonomia alimentar sem culpa nem restrições rígidas',
    category: 'comportamental',
    categoryLabel: 'Comportamental',
    shape: 'arch',
    duration: 'Ciclo de 12 semanas',
    precisionMetric: 'Zero terrorismo nutricional',
    summary:
      'Construo com você uma relação tranquila com a comida, respeitando sinais de fome, saciedade, rotina social e preferências culturais para resultados duradouros.',
    clinicalProtocol: [
      'Mapeamento de gatilhos emocionais, horários críticos e histórico alimentar.',
      'Cardápio vivo e adaptável por trocas simples, nunca listas engessadas.',
      'Ferramentas práticas de comer atento para eventos, viagens e dias corridos.',
    ],
    idealFor: 'Quem busca emagrecimento leve ou equilíbrio alimentar após ciclos de dietas restritivas.',
    image: '/images/salad-bowls.jpg',
    imageAlt: 'Tigelas frescas de saladas nutritivas com folhas verdes e grãos sobre mármore claro',
    surfaceTheme: 'porcelain',
  },
  {
    id: 'clinica-metabolica',
    code: 'ESP.02',
    title: 'Nutrição Clínica & Exames Bioquímicos',
    subtitle: 'Investigação metabólica e precisão laboratorial',
    category: 'clinica',
    categoryLabel: 'Clínica',
    shape: 'chamfer',
    duration: 'Retorno em 30 dias',
    precisionMetric: 'Painel de 35+ biomarcadores',
    summary:
      'Leitura aprofundada de exames de sangue, perfil glicêmico, lipídico e micronutrientes para corrigir carências silenciosas e elevar sua disposição diária.',
    clinicalProtocol: [
      'Análise integrada de ferritina, vitamina D, B12, tireoide e resistência insulínica.',
      'Suplementação personalizada apenas quando há indicação bioquímica real.',
      'Ajuste anti-inflamatório gradual respeitando sua rotina e seu paladar.',
    ],
    idealFor: 'Casos de fadiga crônica, colesterol elevado, pré-diabetes e prevenção metabólica.',
    image: '/images/clinical-exams.jpg',
    imageAlt: 'Tubos de coleta e painel laboratorial representando leitura clínica de exames bioquímicos',
    surfaceTheme: 'forest',
  },
  {
    id: 'performance-esportiva',
    code: 'ESP.03',
    title: 'Performance & Composição Corporal',
    subtitle: 'Energia estável para treino, foco e recuperação',
    category: 'esportiva',
    categoryLabel: 'Esportiva',
    shape: 'leaf',
    duration: 'Ajustes quinzenais',
    precisionMetric: 'Bioimpedância segmentar',
    summary:
      'Estratégias de periodização nutricional alinhadas ao seu volume de treino para preservar massa magra, acelerar recuperação muscular e sustentar vitalidade.',
    clinicalProtocol: [
      'Avaliação por bioimpedância tetrapolar e circunferências funcionais.',
      'Distribuição estratégica de carboidratos e proteínas ao longo do dia.',
      'Protocolo de hidratação e recuperação para treinos matinais ou noturnos.',
    ],
    idealFor: 'Praticantes de musculação, corrida, cross training e esportes de alta exigência.',
    image: '/images/athlete-performance.jpg',
    imageAlt: 'Atletas realizando treino funcional intenso com corda naval e exercício físico de alta performance',
    surfaceTheme: 'mint',
  },
  {
    id: 'saude-intestinal-hormonal',
    code: 'ESP.04',
    title: 'Saúde Intestinal & Equilíbrio Hormonal',
    subtitle: 'Cuidado da microbiota, imunidade e bem-estar',
    category: 'clinica',
    categoryLabel: 'Clínica',
    shape: 'capsule-cut',
    duration: 'Protocolo em 3 fases',
    precisionMetric: 'Modulação de microbiota',
    summary:
      'Abordagem gentil para distensão abdominal, sensibilidades alimentares, TPM e sono irregular, restaurando o conforto digestivo com compostos naturais.',
    clinicalProtocol: [
      'Diário sintomático guiado para identificar alimentos fermentativos com precisão.',
      'Reintrodução progressiva de fibras prebióticas, chás e compostos bioativos.',
      'Sincronização nutricional com ciclo circadiano e qualidade do sono.',
    ],
    idealFor: 'Pessoas com desconforto digestivo recorrente, inchaço, SOP ou oscilações de energia.',
    image: '/images/gut-matcha.jpg',
    imageAlt: 'Infusão verde de matcha rica em antioxidantes naturais para saúde digestiva',
    surfaceTheme: 'sage',
  },
];

export const TECHNOLOGY_STAGES: TechnologyStage[] = [
  {
    id: 'escuta-clinica',
    tag: 'ETAPA I · DIAGNÓSTICO',
    title: 'Anamnese Ampliada & Exames',
    description:
      'Mapeio sua rotina real, horários, preferências, histórico de exames laboratoriais e qualidade do sono em uma conversa acolhedora de 60 minutos.',
    detailMetric: 'Leitura metabólica completa',
    shape: 'arch',
    image: '/images/clinical-exams.jpg',
  },
  {
    id: 'composicao-corporal',
    tag: 'ETAPA II · MEDIÇÃO',
    title: 'Bioimpedância & Sinais Vitais',
    description:
      'Avalio hidratação celular, massa muscular e equilíbrio metabólico sem obsessão por balança, transformando dados em metas serenas e alcançáveis.',
    detailMetric: 'Precisão multifrequência',
    shape: 'chamfer',
    image: '/images/bioimpedance-caliper.jpg',
  },
  {
    id: 'cardapio-vivo',
    tag: 'ETAPA III · ATELIER',
    title: 'Cardápio Vivo & Gastronomia Leve',
    description:
      'Você sai da consulta com combinações práticas de supermercado, lista de substituições inteligentes e receitas rápidas de 15 minutos.',
    detailMetric: 'Aplicativo interativo próprio',
    shape: 'leaf',
    image: '/images/salad-bowls.jpg',
  },
  {
    id: 'suporte-continuo',
    tag: 'ETAPA IV · CUIDADO',
    title: 'Acompanhamento Entre Consultas',
    description:
      'Canal direto comigo entre retornos para adaptar escolhas em viagens, restaurantes ou semanas atípicas sem perder o ritmo nem a leveza.',
    detailMetric: 'Suporte semanal direto',
    shape: 'pill',
    image: '/images/nutri-helena.jpg',
  },
];

export const LEAD_NUTRITIONIST: LeadNutritionist = {
  name: 'Dra. Helena Prado',
  title: 'Nutricionista Clínica, Comportamental & Esportiva',
  crn: 'CRN-3 52.940',
  bio: 'Mestre em Nutrição Humana pela USP e especialista em Comportamento Alimentar e Modulação Intestinal. Há 12 anos conduzo atendimentos individuais sem pressa, unindo leitura bioquímica criteriosa e acolhimento real para devolver prazer à mesa e energia ao cotidiano.',
  credentials: [
    'Mestre em Nutrição Humana pela Universidade de São Paulo (USP)',
    'Pós-graduada em Nutrição Comportamental e Saúde Intestinal',
    '12 anos de prática clínica individual presencial e por teleconsulta',
  ],
  focus: [
    'Exames Bioquímicos',
    'Comportamento Alimentar',
    'Saúde Intestinal',
    'Performance & Longevidade',
  ],
  image: '/images/nutri-helena.jpg',
};

export const PATIENT_DECK: PatientDeckCard[] = [
  {
    id: 'relato-1',
    patient: 'Camila Nogueira',
    age: '33 anos · Designer de Produto',
    treatment: 'Nutrição Comportamental & Saúde Intestinal',
    quote:
      'Pela primeira vez não saí de uma consulta com medo de comer pão ou sair com amigos. Em três meses meu inchaço desapareceu e recuperei minha energia.',
    resultNote: '12 semanas com a Dra. Helena · Zero efeito sanfona',
    shadeTone: 'Plano Leve & Flexível',
  },
  {
    id: 'relato-2',
    patient: 'Gustavo Ribeiro',
    age: '39 anos · Arquiteto & Corredor',
    treatment: 'Performance Esportiva & Exames Bioquímicos',
    quote:
      'Eu vivia cansado às 16h mesmo dormindo bem. Ajustando ferro, horários de carboidrato e hidratação com a Dra. Helena, bati meu melhor tempo nos 21 km.',
    resultNote: 'Ganho de 3,2 kg de massa magra · Ferritina normalizada',
    shadeTone: 'Periodização de Treino',
  },
  {
    id: 'relato-3',
    patient: 'Fernanda Vasques',
    age: '46 anos · Médica Pediatra',
    treatment: 'Equilíbrio Hormonal & Rotina de Plantões',
    quote:
      'O cardápio vivo pensado para os meus dias de hospital mudou tudo. As substituições rápidas cabem na bolsa e a consulta parece um respiro na semana.',
    resultNote: 'Glicemia estável · Qualidade de sono restaurada',
    shadeTone: 'Rotina Adaptativa',
  },
  {
    id: 'relato-4',
    patient: 'Thiago Mendes',
    age: '31 anos · Desenvolvedor',
    treatment: 'Reeducação Alimentar & Gastronomia Prática',
    quote:
      'Achava que precisava cozinhar pratos elaborados todo dia. Aprendi combinações de 10 minutos que realmente gostei de incluir no almoço e no jantar.',
    resultNote: 'Redução de 9 cm de cintura · Hábito consolidado',
    shadeTone: 'Cozinha Cotidiana',
  },
];

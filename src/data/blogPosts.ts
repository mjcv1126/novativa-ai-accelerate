export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  status: "Publicado" | "Borrador";
  views: number;
  image: string;
  seoDescription?: string;
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Transformación Digital con IA: Guía Completa para Empresas 2025",
    excerpt: "Descubre cómo la inteligencia artificial está revolucionando la transformación digital empresarial. Aprenderás estrategias prácticas para implementar IA, casos de éxito reales y cómo preparar tu empresa para el futuro digital. Una guía exhaustiva que cubre desde conceptos básicos hasta implementaciones avanzadas.",
    author: "Marlon Caballero",
    date: "25/04/2025",
    category: "Transformación Digital",
    status: "Publicado",
    views: 2450,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    seoDescription: "Guía definitiva sobre transformación digital empresarial con IA, incluyendo estrategias, beneficios y casos de éxito para 2025. Aprende a implementar soluciones de IA en tu negocio.",
    tags: ["Transformación Digital", "IA Empresarial", "Automatización", "Innovación Tecnológica"]
  },
  {
    id: 2,
    title: "Agentes IA en Atención al Cliente: El Futuro del Soporte 24/7",
    excerpt: "Un análisis profundo sobre cómo los agentes de IA están transformando la atención al cliente moderna. Exploramos las últimas tecnologías, mejores prácticas de implementación, estrategias de personalización y cómo medir el ROI. Descubre cómo grandes empresas están maximizando la satisfacción del cliente con IA.",
    author: "Marlon Caballero",
    date: "24/04/2025",
    category: "Agentes IA",
    status: "Publicado",
    views: 1890,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    seoDescription: "Implementación de agentes IA en servicio al cliente, mejores prácticas y beneficios para empresas modernas. Guía completa de automatización del soporte.",
    tags: ["Atención al Cliente", "Chatbots", "Automatización", "Experiencia del Cliente"]
  },
  {
    id: 3,
    title: "Automatización Industrial con IA: Casos de Éxito 2025",
    excerpt: "Exploración de casos reales donde la IA ha transformado procesos industriales, mejorando eficiencia y reduciendo costos. Este artículo detalla cómo empresas líderes han implementado soluciones de automatización basadas en IA, los desafíos superados y los beneficios tangibles obtenidos. Incluye ejemplos específicos y datos de rendimiento.",
    author: "Marlon Caballero",
    date: "23/04/2025",
    category: "Automatización Industrial",
    status: "Publicado",
    views: 2100,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    seoDescription: "Casos de éxito en automatización industrial utilizando IA, con análisis de ROI y mejores prácticas. Descubre cómo la IA optimiza la manufactura.",
    tags: ["Industria 4.0", "Automatización", "Manufactura Inteligente", "Eficiencia Operativa"]
  },
  {
    id: 4,
    title: "Marketing Digital con IA: Personalización y Predicción en 2025",
    excerpt: "Descubre cómo la IA está revolucionando el marketing digital a través de la personalización avanzada y la predicción de tendencias. Este artículo explora herramientas y técnicas que permiten a las empresas crear campañas más efectivas y dirigidas, mejorando el engagement y la conversión.",
    author: "Marlon Caballero",
    date: "22/04/2025",
    category: "Marketing Digital",
    status: "Publicado",
    views: 1950,
    image: "https://images.unsplash.com/photo-1505373585399-172be626ca14",
    seoDescription: "Estrategias de marketing digital con IA para 2025, personalización avanzada y predicción de tendencias. Aprende a optimizar tus campañas con IA.",
    tags: ["Marketing Digital", "Inteligencia Artificial", "Personalización", "Predicción de Tendencias"]
  },
  {
    id: 5,
    title: "E-commerce Inteligente: IA para Optimizar la Experiencia de Compra",
    excerpt: "Este artículo analiza cómo la IA está transformando el e-commerce, desde la recomendación de productos hasta la optimización de la logística. Aprenderás cómo implementar soluciones de IA para mejorar la experiencia del cliente, aumentar las ventas y reducir los costos operativos en tu tienda online.",
    author: "Marlon Caballero",
    date: "21/04/2025",
    category: "E-commerce",
    status: "Publicado",
    views: 1780,
    image: "https://images.unsplash.com/photo-1517842067410-499921861c31",
    seoDescription: "IA para e-commerce, optimización de la experiencia de compra, recomendación de productos y logística inteligente. Transforma tu tienda online con IA.",
    tags: ["E-commerce", "Inteligencia Artificial", "Experiencia del Cliente", "Logística Inteligente"]
  },
  {
    id: 6,
    title: "Recursos Humanos y la IA: Automatización y Mejora del Talento",
    excerpt: "Explora cómo la IA está impactando la gestión de recursos humanos, desde la automatización de tareas administrativas hasta la mejora de la selección y retención de talento. Este artículo ofrece una visión completa de las herramientas y estrategias que permiten a los departamentos de RR. HH. ser más eficientes y efectivos.",
    author: "Marlon Caballero",
    date: "20/04/2025",
    category: "Recursos Humanos",
    status: "Publicado",
    views: 1620,
    image: "https://images.unsplash.com/photo-1542744166-e35939358c6e",
    seoDescription: "IA en recursos humanos, automatización de tareas, selección y retención de talento. Optimiza tu gestión de RR. HH. con inteligencia artificial.",
    tags: ["Recursos Humanos", "Inteligencia Artificial", "Automatización", "Gestión del Talento"]
  },
  {
    id: 7,
    title: "Finanzas Inteligentes: IA para la Toma de Decisiones y la Predicción",
    excerpt: "Descubre cómo la IA está transformando el sector financiero, desde la detección de fraudes hasta la predicción de mercados. Este artículo analiza las aplicaciones de la IA en la toma de decisiones financieras, la gestión de riesgos y la optimización de inversiones, proporcionando ejemplos concretos y datos relevantes.",
    author: "Marlon Caballero",
    date: "19/04/2025",
    category: "Finanzas",
    status: "Publicado",
    views: 1550,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e",
    seoDescription: "IA en finanzas, toma de decisiones, predicción de mercados y gestión de riesgos. Transforma tus finanzas con inteligencia artificial.",
    tags: ["Finanzas", "Inteligencia Artificial", "Predicción de Mercados", "Gestión de Riesgos"]
  },
  {
    id: 8,
    title: "Salud Digital: IA para el Diagnóstico, Tratamiento y Bienestar",
    excerpt: "Este artículo explora cómo la IA está revolucionando el sector de la salud, desde el diagnóstico temprano de enfermedades hasta la personalización de tratamientos y la promoción del bienestar. Aprenderás sobre las últimas innovaciones y cómo la IA está mejorando la calidad de vida de los pacientes.",
    author: "Marlon Caballero",
    date: "18/04/2025",
    category: "Salud",
    status: "Publicado",
    views: 1480,
    image: "https://images.unsplash.com/photo-1532938314630-e9f2937ca776",
    seoDescription: "IA en salud, diagnóstico temprano, tratamiento personalizado y bienestar. Mejora la salud digital con inteligencia artificial.",
    tags: ["Salud", "Inteligencia Artificial", "Diagnóstico", "Tratamiento"]
  },
  {
    id: 9,
    title: "Educación Personalizada: IA para Adaptar el Aprendizaje a Cada Estudiante",
    excerpt: "Descubre cómo la IA está transformando la educación, permitiendo la creación de experiencias de aprendizaje personalizadas que se adaptan a las necesidades y el ritmo de cada estudiante. Este artículo analiza las herramientas y estrategias que están revolucionando la forma en que aprendemos.",
    author: "Marlon Caballero",
    date: "17/04/2025",
    category: "Educación",
    status: "Publicado",
    views: 1410,
    image: "https://images.unsplash.com/photo-1521737827429-2212baefe254",
    seoDescription: "IA en educación, aprendizaje personalizado, adaptación al estudiante y herramientas educativas. Transforma la educación con inteligencia artificial.",
    tags: ["Educación", "Inteligencia Artificial", "Aprendizaje Personalizado", "Herramientas Educativas"]
  },
  {
    id: 10,
    title: "Retail Inteligente: IA para Mejorar la Experiencia en Tiendas Físicas y Online",
    excerpt: "Este artículo explora cómo la IA está transformando el retail, desde la optimización de la gestión de inventario hasta la mejora de la experiencia del cliente en tiendas físicas y online. Aprenderás cómo implementar soluciones de IA para aumentar las ventas y reducir los costos operativos.",
    author: "Marlon Caballero",
    date: "16/04/2025",
    category: "Retail",
    status: "Publicado",
    views: 1340,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
    seoDescription: "IA en retail, experiencia del cliente, gestión de inventario y optimización de ventas. Transforma tu retail con inteligencia artificial.",
    tags: ["Retail", "Inteligencia Artificial", "Experiencia del Cliente", "Gestión de Inventario"]
  },
  {
    id: 11,
    title: "Logística Inteligente: IA para Optimizar la Cadena de Suministro",
    excerpt: "Descubre cómo la IA está revolucionando la logística, desde la optimización de rutas de transporte hasta la predicción de la demanda. Este artículo analiza las aplicaciones de la IA en la cadena de suministro, proporcionando ejemplos concretos y datos relevantes.",
    author: "Marlon Caballero",
    date: "15/04/2025",
    category: "Logística",
    status: "Publicado",
    views: 1270,
    image: "https://images.unsplash.com/photo-1547754980-3df39fed84d7",
    seoDescription: "IA en logística, optimización de la cadena de suministro, predicción de la demanda y gestión de rutas. Transforma tu logística con inteligencia artificial.",
    tags: ["Logística", "Inteligencia Artificial", "Cadena de Suministro", "Predicción de la Demanda"]
  },
  {
    id: 12,
    title: "Ciberseguridad con IA: Protección Avanzada contra Amenazas Digitales",
    excerpt: "Este artículo explora cómo la IA está transformando la ciberseguridad, desde la detección temprana de amenazas hasta la respuesta automatizada a incidentes. Aprenderás cómo implementar soluciones de IA para proteger tu empresa contra los ataques cibernéticos.",
    author: "Marlon Caballero",
    date: "14/04/2025",
    category: "Ciberseguridad",
    status: "Publicado",
    views: 1200,
    image: "https://images.unsplash.com/photo-1485827404703-87b59e892dd6",
    seoDescription: "IA en ciberseguridad, detección de amenazas, respuesta a incidentes y protección digital. Protege tu empresa con inteligencia artificial.",
    tags: ["Ciberseguridad", "Inteligencia Artificial", "Detección de Amenazas", "Respuesta a Incidentes"]
  },
  {
    id: 13,
    title: "Agricultura Inteligente: IA para Optimizar la Producción y la Sostenibilidad",
    excerpt: "Descubre cómo la IA está revolucionando la agricultura, desde la optimización del riego hasta la predicción de cosechas. Este artículo analiza las aplicaciones de la IA en la agricultura, proporcionando ejemplos concretos y datos relevantes.",
    author: "Marlon Caballero",
    date: "13/04/2025",
    category: "Agricultura",
    status: "Publicado",
    views: 1130,
    image: "https://images.unsplash.com/photo-1519682337058-a94d51a91e14",
    seoDescription: "IA en agricultura, optimización de la producción, predicción de cosechas y sostenibilidad. Transforma tu agricultura con inteligencia artificial.",
    tags: ["Agricultura", "Inteligencia Artificial", "Producción", "Sostenibilidad"]
  },
  {
    id: 14,
    title: "Manufactura Inteligente: IA para la Optimización de Procesos y la Calidad",
    excerpt: "Este artículo explora cómo la IA está transformando la manufactura, desde la optimización de procesos hasta la mejora de la calidad. Aprenderás cómo implementar soluciones de IA para aumentar la eficiencia y reducir los costos operativos.",
    author: "Marlon Caballero",
    date: "12/04/2025",
    category: "Manufactura",
    status: "Publicado",
    views: 1060,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    seoDescription: "IA en manufactura, optimización de procesos, mejora de la calidad y eficiencia. Transforma tu manufactura con inteligencia artificial.",
    tags: ["Manufactura", "Inteligencia Artificial", "Procesos", "Calidad"]
  },
  {
    id: 15,
    title: "Energía Inteligente: IA para la Optimización del Consumo y la Producción",
    excerpt: "Descubre cómo la IA está revolucionando el sector energético, desde la optimización del consumo hasta la predicción de la producción. Este artículo analiza las aplicaciones de la IA en la energía, proporcionando ejemplos concretos y datos relevantes.",
    author: "Marlon Caballero",
    date: "11/04/2025",
    category: "Energía",
    status: "Publicado",
    views: 990,
    image: "https://images.unsplash.com/photo-1489512203953-51d9980b939c",
    seoDescription: "IA en energía, optimización del consumo, predicción de la producción y eficiencia energética. Transforma tu energía con inteligencia artificial.",
    tags: ["Energía", "Inteligencia Artificial", "Consumo", "Producción"]
  },
  {
    id: 16,
    title: "Ciudades Inteligentes: IA para la Mejora de la Calidad de Vida Urbana",
    excerpt: "Este artículo explora cómo la IA está transformando las ciudades, desde la optimización del tráfico hasta la mejora de la seguridad. Aprenderás cómo implementar soluciones de IA para crear ciudades más eficientes y habitables.",
    author: "Marlon Caballero",
    date: "10/04/2025",
    category: "Ciudades Inteligentes",
    status: "Publicado",
    views: 920,
    image: "https://images.unsplash.com/photo-1499084732479-de2c8e21c967",
    seoDescription: "IA en ciudades inteligentes, optimización del tráfico, mejora de la seguridad y calidad de vida. Transforma tu ciudad con inteligencia artificial.",
    tags: ["Ciudades Inteligentes", "Inteligencia Artificial", "Tráfico", "Seguridad"]
  },
  {
    id: 17,
    title: "Turismo Inteligente: IA para la Personalización de la Experiencia del Viajero",
    excerpt: "Descubre cómo la IA está revolucionando el turismo, desde la personalización de la experiencia del viajero hasta la optimización de la gestión de destinos. Este artículo analiza las aplicaciones de la IA en el turismo, proporcionando ejemplos concretos y datos relevantes.",
    author: "Marlon Caballero",
    date: "09/04/2025",
    category: "Turismo",
    status: "Publicado",
    views: 850,
    image: "https://images.unsplash.com/photo-1476514525534-7342778116ca",
    seoDescription: "IA en turismo, personalización de la experiencia, gestión de destinos y optimización de viajes. Transforma tu turismo con inteligencia artificial.",
    tags: ["Turismo", "Inteligencia Artificial", "Experiencia", "Destinos"]
  },
  {
    id: 18,
    title: "Entretenimiento Inteligente: IA para la Creación de Contenido y la Personalización",
    excerpt: "Este artículo explora cómo la IA está transformando el entretenimiento, desde la creación de contenido hasta la personalización de la experiencia del usuario. Aprenderás cómo implementar soluciones de IA para crear experiencias de entretenimiento más atractivas y personalizadas.",
    author: "Marlon Caballero",
    date: "08/04/2025",
    category: "Entretenimiento",
    status: "Publicado",
    views: 780,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
    seoDescription: "IA en entretenimiento, creación de contenido, personalización de la experiencia y optimización de usuarios. Transforma tu entretenimiento con inteligencia artificial.",
    tags: ["Entretenimiento", "Inteligencia Artificial", "Contenido", "Personalización"]
  },
  {
    id: 19,
    title: "Deportes Inteligentes: IA para la Mejora del Rendimiento y la Experiencia del Fan",
    excerpt: "Descubre cómo la IA está revolucionando los deportes, desde la mejora del rendimiento de los atletas hasta la personalización de la experiencia del fan. Este artículo analiza las aplicaciones de la IA en los deportes, proporcionando ejemplos concretos y datos relevantes.",
    author: "Marlon Caballero",
    date: "07/04/2025",
    category: "Deportes",
    status: "Publicado",
    views: 710,
    image: "https://images.unsplash.com/photo-1484298845714-8498b3906055",
    seoDescription: "IA en deportes, mejora del rendimiento, experiencia del fan y optimización de atletas. Transforma tus deportes con inteligencia artificial.",
    tags: ["Deportes", "Inteligencia Artificial", "Rendimiento", "Fan"]
  },
  {
    id: 20,
    title: "Gobierno Inteligente: IA para la Mejora de los Servicios Públicos y la Transparencia",
    excerpt: "Este artículo explora cómo la IA está transformando el gobierno, desde la mejora de los servicios públicos hasta la promoción de la transparencia. Aprenderás cómo implementar soluciones de IA para crear gobiernos más eficientes y responsables.",
    author: "Marlon Caballero",
    date: "06/04/2025",
    category: "Gobierno",
    status: "Publicado",
    views: 640,
    image: "https://images.unsplash.com/photo-1454165804606-c3d53bc86b69",
    seoDescription: "IA en gobierno, mejora de servicios, transparencia y optimización de la gestión pública. Transforma tu gobierno con inteligencia artificial.",
    tags: ["Gobierno", "Inteligencia Artificial", "Servicios", "Transparencia"]
  },
  {
    id: 21,
    title: "Medio Ambiente Inteligente: IA para la Protección y la Sostenibilidad",
    excerpt: "Descubre cómo la IA está revolucionando la protección del medio ambiente, desde la monitorización de la contaminación hasta la predicción de desastres naturales. Este artículo analiza las aplicaciones de la IA en el medio ambiente, proporcionando ejemplos concretos y datos relevantes.",
    author: "Marlon Caballero",
    date: "05/04/2025",
    category: "Medio Ambiente",
    status: "Publicado",
    views: 570,
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3ad3",
    seoDescription: "IA en medio ambiente, protección, sostenibilidad y monitorización de la contaminación. Transforma tu medio ambiente con inteligencia artificial.",
    tags: ["Medio Ambiente", "Inteligencia Artificial", "Protección", "Sostenibilidad"]
  },
  {
    id: 22,
    title: "Banca Inteligente: IA para la Personalización de Servicios y la Detección de Fraudes",
    excerpt: "Este artículo explora cómo la IA está transformando la banca, desde la personalización de servicios hasta la detección de fraudes. Aprenderás cómo implementar soluciones de IA para crear experiencias bancarias más seguras y personalizadas.",
    author: "Marlon Caballero",
    date: "04/04/2025",
    category: "Banca",
    status: "Publicado",
    views: 500,
    image: "https://images.unsplash.com/photo-1501164333658-c3a9106b5e43",
    seoDescription: "IA en banca, personalización de servicios, detección de fraudes y optimización de la seguridad. Transforma tu banca con inteligencia artificial.",
    tags: ["Banca", "Inteligencia Artificial", "Servicios", "Fraudes"]
  },
  {
    id: 23,
    title: "Seguros Inteligentes: IA para la Evaluación de Riesgos y la Personalización de Pólizas",
    excerpt: "Descubre cómo la IA está revolucionando el sector de los seguros, desde la evaluación de riesgos hasta la personalización de pólizas. Este artículo analiza las aplicaciones de la IA en los seguros, proporcionando ejemplos concretos y datos relevantes.",
    author: "Marlon Caballero",
    date: "03/04/2025",
    category: "Seguros",
    status: "Publicado",
    views: 430,
    image: "https://images.unsplash.com/photo-1542751371-adc38f48a612",
    seoDescription: "IA en seguros, evaluación de riesgos, personalización de pólizas y optimización de la seguridad. Transforma tus seguros con inteligencia artificial.",
    tags: ["Seguros", "Inteligencia Artificial", "Riesgos", "Pólizas"]
  },
  {
    id: 24,
    title: "LegalTech: IA para la Automatización de Procesos Legales y la Investigación",
    excerpt: "Este artículo explora cómo la IA está transformando el sector legal, desde la automatización de procesos legales hasta la investigación. Aprenderás cómo implementar soluciones de IA para crear servicios legales más eficientes y accesibles.",
    author: "Marlon Caballero",
    date: "02/04/2025",
    category: "LegalTech",
    status: "Publicado",
    views: 360,
    image: "https://images.unsplash.com/photo-1505664194779-8be206e3a33f",
    seoDescription: "IA en LegalTech, automatización de procesos, investigación y optimización de servicios legales. Transforma tus servicios legales con inteligencia artificial.",
    tags: ["LegalTech", "Inteligencia Artificial", "Procesos", "Investigación"]
  },
  {
    id: 25,
    title: "Real Estate Inteligente: IA para la Valoración de Propiedades y la Personalización de la Búsqueda",
    excerpt: "Descubre cómo la IA está revolucionando el sector inmobiliario, desde la valoración de propiedades hasta la personalización de la búsqueda. Este artículo analiza las aplicaciones de la IA en el sector inmobiliario, proporcionando ejemplos concretos y datos relevantes.",
    author: "Marlon Caballero",
    date: "01/04/2025",
    category: "Real Estate",
    status: "Publicado",
    views: 290,
    image: "https://images.unsplash.com/photo-1484154214962-b737d3009df9",
    seoDescription: "IA en Real Estate, valoración de propiedades, personalización de la búsqueda y optimización de la inversión. Transforma tu Real Estate con inteligencia artificial.",
    tags: ["Real Estate", "Inteligencia Artificial", "Propiedades", "Búsqueda"]
  },
  {
    id: 26,
    title: "Moda Inteligente: IA para la Personalización de la Experiencia de Compra y la Predicción de Tendencias",
    excerpt: "Este artículo explora cómo la IA está transformando la industria de la moda, desde la personalización de la experiencia de compra hasta la predicción de tendencias. Aprenderás cómo implementar soluciones de IA para crear experiencias de moda más atractivas y personalizadas.",
    author: "Marlon Caballero",
    date: "31/03/2025",
    category: "Moda",
    status: "Publicado",
    views: 220,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    seoDescription: "IA en moda, personalización de la experiencia, predicción de tendencias y optimización de la compra. Transforma tu moda con inteligencia artificial.",
    tags: ["Moda", "Inteligencia Artificial", "Experiencia", "Tendencias"]
  },
  {
    id: 27,
    title: "Alimentos Inteligentes: IA para la Optimización de la Producción y la Seguridad Alimentaria",
    excerpt: "Descubre cómo la IA está revolucionando la industria alimentaria, desde la optimización de la producción hasta la mejora de la seguridad alimentaria. Este artículo analiza las aplicaciones de la IA en la industria alimentaria, proporcionando ejemplos concretos y datos relevantes.",
    author: "Marlon Caballero",
    date: "30/03/2025",
    category: "Alimentos",
    status: "Publicado",
    views: 150,
    image: "https://images.unsplash.com/photo-1490818387583-1caea2a5905f",
    seoDescription: "IA en alimentos, optimización de la producción, seguridad alimentaria y optimización de la calidad. Transforma tus alimentos con inteligencia artificial.",
    tags: ["Alimentos", "Inteligencia Artificial", "Producción", "Seguridad"]
  },
  {
    id: 28,
    title: "Automoción Inteligente: IA para la Conducción Autónoma y la Personalización de la Experiencia",
    excerpt: "Este artículo explora cómo la IA está transformando la industria automotriz, desde la conducción autónoma hasta la personalización de la experiencia del conductor. Aprenderás cómo implementar soluciones de IA para crear vehículos más seguros y personalizados.",
    author: "Marlon Caballero",
    date: "29/03/2025",
    category: "Automoción",
    status: "Publicado",
    views: 80,
    image: "https://images.unsplash.com/photo-1494976388535-8fa54cf94e1f",
    seoDescription: "IA en automoción, conducción autónoma, personalización de la experiencia y optimización de la seguridad. Transforma tu automoción con inteligencia artificial.",
    tags: ["Automoción", "Inteligencia Artificial", "Conducción", "Experiencia"]
  },
  {
    id: 29,
    title: "Aeroespacial Inteligente: IA para la Optimización del Diseño y la Seguridad de los Vuelos",
    excerpt: "Descubre cómo la IA está revolucionando la industria aeroespacial, desde la optimización del diseño de aeronaves hasta la mejora de la seguridad de los vuelos. Este artículo analiza las aplicaciones de la IA en la industria aeroespacial, proporcionando ejemplos concretos y datos relevantes.",
    author: "Marlon Caballero",
    date: "28/03/2025",
    category: "Aeroespacial",
    status: "Publicado",
    views: 10,
    image: "https://images.unsplash.com/photo-1503376780353-7275aa6d4518",
    seoDescription: "IA en aeroespacial, optimización del diseño, seguridad de los vuelos y optimización de la eficiencia. Transforma tu aeroespacial con inteligencia artificial.",
    tags: ["Aeroespacial", "Inteligencia Artificial", "Diseño", "Seguridad"]
  },
  {
    id: 30,
    title: "Robótica Inteligente: IA para la Automatización de Tareas y la Mejora de la Productividad",
    excerpt: "Este artículo explora cómo la IA está transformando la robótica, desde la automatización de tareas hasta la mejora de la productividad. Aprenderás cómo implementar soluciones de IA para crear robots más inteligentes y eficientes.",
    author: "Marlon Caballero",
    date: "27/03/2025",
    category: "Robótica",
    status: "Publicado",
    views: 15,
    image: "https://images.unsplash.com/photo-1576766411949-b34ca94aa526",
    seoDescription: "IA en robótica, automatización de tareas, mejora de la productividad y optimización de la eficiencia. Transforma tu robótica con inteligencia artificial.",
    tags: ["Robótica", "Inteligencia Artificial", "Automatización", "Productividad"]
  },
  {
    id: 31,
    title: "Biotecnología Inteligente: IA para el Descubrimiento de Fármacos y la Medicina Personalizada",
    excerpt: "Descubre cómo la IA está revolucionando la biotecnología, desde el descubrimiento de fármacos hasta la medicina personalizada. Este artículo analiza las aplicaciones de la IA en la biotecnología, proporcionando ejemplos concretos y datos relevantes.",
    author: "Marlon Caballero",
    date: "26/03/2025",
    category: "Biotecnología",
    status: "Publicado",
    views: 20,
    image: "https://images.unsplash.com/photo-1587327384592-4c6938b73119",
    seoDescription: "IA en biotecnología, descubrimiento de fármacos, medicina personalizada y optimización de la investigación. Transforma tu biotecnología con inteligencia artificial.",
    tags: ["Biotecnología", "Inteligencia Artificial", "Fármacos", "Medicina"]
  },
  {
    id: 32,
    title: "Nanotecnología Inteligente: IA para la Creación de Materiales Avanzados y la Manipulación a Nivel Atómico",
    excerpt: "Este artículo explora cómo la IA está transformando la nanotecnología, desde la creación de materiales avanzados hasta la manipulación a nivel atómico. Aprenderás cómo implementar soluciones de IA para crear nanotecnología más inteligente y eficiente.",
    author: "Marlon Caballero",
    date: "25/03/2025",
    category: "Nanotecnología",
    status: "Publicado",
    views: 25,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
    seoDescription: "IA en nanotecnología, creación de materiales, manipulación atómica y optimización de la investigación. Transforma tu nanotecnología con inteligencia artificial.",
    tags: ["Nanotecnología", "Inteligencia Artificial", "Materiales", "Atómico"]
  },
  {
    id: 33,
    title: "Exploración Espacial Inteligente: IA para la Automatización de Misiones y el Análisis de Datos",
    excerpt: "Descubre cómo la IA está revolucionando la exploración espacial, desde la automatización de misiones hasta el análisis de datos. Este artículo analiza las aplicaciones de la IA en la exploración espacial, proporcionando ejemplos concretos y datos relevantes.",
    author: "Marlon Caballero",
    date: "24/03/2025",
    category: "Exploración Espacial",
    status: "Publicado",
    views: 30,
    image: "https://images.unsplash.com/photo-1517131147490-25966059a9e1",
    seoDescription: "IA en exploración espacial, automatización de misiones, análisis de datos y optimización de la investigación. Transforma tu exploración espacial con inteligencia artificial.",
    tags: ["Exploración Espacial", "Inteligencia Artificial", "Misiones", "Datos"]
  },
  {
    id: 34,
    title: "Realidad Virtual e Inteligencia Artificial: Creando Experiencias Inmersivas",
    excerpt: "Explora cómo la IA y la realidad virtual están transformando la forma en que interactuamos con tecnologías digitales. Este artículo analiza las aplicaciones innovadoras de la IA en la creación de experiencias inmersivas, desde entretenimiento hasta entrenamiento profesional.",
    author: "Marlon Caballero",
    date: "23/03/2025",
    category: "Realidad Virtual",
    status: "Publicado",
    views: 45,
    image: "https://images.unsplash.com/photo-1510346454220-0715982254bb",
    seoDescription: "IA y realidad virtual, experiencias inmersivas, innovación tecnológica y aplicaciones prácticas. Transforma tu realidad virtual con inteligencia artificial.",
    tags: ["Realidad Virtual", "Inteligencia Artificial", "Experiencias Inmersivas", "Innovación"]
  }
];

export const getCategories = () => {
  return [...new Set(blogPosts.map(post => post.category))];
};

export const getPostsByCategory = (category: string) => {
  return blogPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
};

export const getAllTags = () => {
  const allTags = blogPosts.reduce((tags: string[], post) => {
    if (post.tags) {
      tags.push(...post.tags);
    }
    return tags;
  }, []);
  return [...new Set(allTags)];
};

export const getPostsByTag = (tag: string) => {
  return blogPosts.filter(post => 
    post.tags?.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
};

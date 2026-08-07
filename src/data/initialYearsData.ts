import { YearOverview, NoteItem } from '../types';

export const INITIAL_YEARS_OVERVIEW: YearOverview[] = [
  {
    year: 2020,
    themeTitle: "El Inicio y la Ilusión",
    themeSubtitle: "Donde comenzó nuestra historia y descubrimos un mundo juntos",
    summary: "El 2020 fue el año en que nuestras vidas se cruzaron de forma inesperada. En medio de la incertidumbre global, encontrar tu sonrisa se convirtió en mi refugio diario. Todo era nuevo, emocionante y lleno de promesas sinceras.",
    coverImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
    keyLessons: [
      "Descubrir la complicidad en las pequeñas conversaciones de madrugada.",
      "Aprender a valorar el tiempo presente sin prisas.",
      "Crear nuestro propio espacio seguro en el mundo."
    ],
    finalThought: "Guardaré siempre el 2020 como el año en que entendí lo que significaba iluminar los días oscuros de alguien."
  },
  {
    year: 2021,
    themeTitle: "Construcción y Complicidad",
    themeSubtitle: "Compartiendo sueños, rutinas y momentos inolvidables",
    summary: "En 2021 profundizamos nuestro vínculo. Compartimos viajes, metas personales, risas espontáneas y aprendimos a convivir con nuestras diferencias. Fue un año de muchos momentos mágicos y recuerdos imborrables.",
    coverImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    keyLessons: [
      "El valor de apoyarnos mutuamente en nuestros proyectos individuales.",
      "Celebrar las metas del otro como si fueran propias.",
      "La importancia de la empatía cotidiana."
    ],
    finalThought: "Fue el año con más risas compartidas y detalles que se quedaron grabados en mi memoria."
  },
  {
    year: 2022,
    themeTitle: "Tensiones y Malentendidos",
    themeSubtitle: "Los momentos donde no supe comunicarme ni expresar lo que sentía",
    summary: "El 2022 trajo grandes desafíos. El estrés, la falta de madurez de mi parte y la mala gestión de mis emociones crearon distanciamientos innecesarios. Hubo palabras no dichas y silencios que pesaron más de la cuenta.",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    keyLessons: [
      "Guardar silencio cuando se necesita hablar solo genera abismos.",
      "Asumir que el otro adivina nuestros sentimientos es un gran error.",
      "El orgullo nunca debe estar por encima de quien amas."
    ],
    finalThought: "Si pudiera volver al 2022, habría escuchado con más atención y abrazado con más frecuencia sin buscar tener la razón."
  },
  {
    year: 2023,
    themeTitle: "La Distancia y la Separación",
    themeSubtitle: "El impacto del cierre y darme cuenta de mis fallas",
    summary: "El 2023 marcó el punto de quiebre. Tras intentar sostener lo insostenible sin sanar las bases, tomamos caminos separados. Fue un periodo doloroso de confrontación personal, soledad y aceptación de la realidad.",
    coverImage: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80",
    keyLessons: [
      "Aceptar que el amor no basta si no hay responsabilidad emocional.",
      "Reconocer abiertamente mis propios errores sin poner excusas.",
      "Respetar las decisiones dolorosas pero necesarias para ambos."
    ],
    finalThought: "El dolor del 2023 fue la sacudida que necesité para mirarme al espejo y empezar a cambiar desde adentro."
  },
  {
    year: 2024,
    themeTitle: "Trabajo Personal y Maduración",
    themeSubtitle: "Reflexionando en retrospectiva sin rencores ni ataduras",
    summary: "Durante el 2024 me enfoqué en sanar, asistir a terapia, leer y reconstruir mi visión de vida. Aprendí a no guardar resentimientos y a mirar nuestra historia con profunda gratitud por lo vivido.",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    keyLessons: [
      "Perdonarse a uno mismo es el primer paso para poder ofrecer una disculpa sincera.",
      "Valorar la paz mental propia y la del ser amado.",
      "Crecer duele, pero transforma profundamente nuestra forma de amar."
    ],
    finalThought: "En 2024 entendí que quererte verdaderamente también significaba desearte lo mejor, aunque ya no fuera a mi lado."
  },
  {
    year: 2025,
    themeTitle: "Paz Interior y Claridad",
    themeSubtitle: "Ver el pasado con respeto, calma y gratitud sincera",
    summary: "El 2025 consolidó mi proceso. Con el tiempo transcurrido, las emociones intensas se transformaron en un aprecio sereno y respetuoso por ti. No hay espacio para culpabilidades ni reclamos, solo claridad.",
    coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    keyLessons: [
      "El verdadero cariño perdura transformado en respeto.",
      "Las explicaciones más valiosas son aquellas que nacen de la tranquilidad y la humildad.",
      "Apreciar la huella positiva que dejaste en mi vida."
    ],
    finalThought: "Mirar atrás en 2025 ya no causa dolor, sino una profunda sonrisa por haber tenido la dicha de coincidir."
  },
  {
    year: 2026,
    themeTitle: "Explicación Final y Deseos de Bien",
    themeSubtitle: "Esta bitácora que hoy leas es mi regalo de transparencia y cierre definitivo",
    summary: "Llegamos al 2026. Hago esta aplicación para darte la explicación honesta que te merecías, sin intenciones ocultas ni pretensiones de cambiar el presente, sino para entregarte la paz y la claridad que el tiempo nos adeudaba.",
    coverImage: "https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=800&q=80",
    keyLessons: [
      "Dar un cierre con amor y verdad es el acto más noble que nos debemos.",
      "Agradecer cada año transcurrido de 2020 a 2026.",
      "Desearte felicidad plena, luz y bendiciones en todo lo que emprendas."
    ],
    finalThought: "Gracias por haber sido parte fundamental de mi vida durante estos años. Te deseo lo más bonito del mundo, hoy y siempre."
  }
];

export const INITIAL_NOTES: NoteItem[] = [
  // 2020
  {
    id: "n-2020-1",
    year: 2020,
    date: "12 de Marzo, 2020",
    title: "El día que nos conocimos de verdad",
    content: "Aún recuerdo la primera charla larga que tuvimos. Estaba nervioso y no sabía qué decir, pero tu risa espontánea disipó cualquier timidez. En ese momento no sabía todo lo que significarías para mí, pero sentí una calidez muy especial.",
    mood: "Inicio",
    isImportant: true,
    isLetter: false,
    quote: "Hay miradas que parecen prometer un universo entero.",
    images: [
      {
        id: "p1",
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
        caption: "Aquel café al atardecer"
      }
    ]
  },
  {
    id: "n-2020-2",
    year: 2020,
    date: "25 de Septiembre, 2020",
    title: "Nuestra primera conversación bajo las estrellas",
    content: "Hablando por horas durante la cuarentena, descubriendo nuestras canciones favoritas, nuestros miedos más profundos y lo que soñábamos para el futuro. Fuiste mi faro cuando todo afuera parecía incierto.",
    mood: "Nostalgia",
    isImportant: false,
    quote: "En la distancia aprendimos a escucharnos con el corazón."
  },

  // 2021
  {
    id: "n-2021-1",
    year: 2021,
    date: "18 de Julio, 2021",
    title: "Aquel viaje improvisado al mirador",
    content: "Decidimos salir sin rumbo fijo un sábado por la mañana. Nos detuvimos a ver la puesta de sol en la montaña. Te tomé la mano y sentí que estábamos construyendo un equipo invencible.",
    mood: "Gratitud",
    isImportant: true,
    images: [
      {
        id: "p2",
        url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
        caption: "El paisaje aquel día"
      }
    ]
  },
  {
    id: "n-2021-2",
    year: 2021,
    date: "04 de Diciembre, 2021",
    title: "Detalles que marcaron la diferencia",
    content: "Cuando preparaste aquella sorpresa por mi logro laboral. Nunca antes alguien me había respaldado con tanto entusiasmo verdadero. Tu generosidad siempre fue infinita.",
    mood: "Gratitud",
    isImportant: false
  },

  // 2022
  {
    id: "n-2022-1",
    year: 2022,
    date: "15 de Junio, 2022",
    title: "Explicación sincera sobre mi distancia emocional",
    content: "Quiero explicarte qué pasó aquí: en 2022 atravesaba por una fuerte presión y en lugar de apoyarme en ti, me encerré en mi propio caparazón. Estaba frustrado con mis propios proyectos y permití que el cansancio nublara mi trato hacia ti. Tú no tenías la culpa de mi frialdad ni de mi mal humor. Debí haberte buscado y haber sido transparente.",
    mood: "Disculpa",
    isImportant: true,
    isLetter: true,
    quote: "El silencio a veces hiere más que mil discusiones.",
    audioNoteText: "Quiero darte esta explicación con el corazón en la mano: no fue por ti, fue por mi inmadurez para lidiar con mis problemas."
  },
  {
    id: "n-2022-2",
    year: 2022,
    date: "02 de Noviembre, 2022",
    title: "La discusión sobre el futuro",
    content: "Nos sentamos a hablar sobre lo que queríamos a largo plazo. Me di cuenta de que teníamos temores distintos y yo no supe darte la certidumbre y tranquilidad que necesitabas. Lamento no haber tenido la madurez de hablar claro en aquel momento.",
    mood: "Reflexión",
    isImportant: false
  },

  // 2023
  {
    id: "n-2023-1",
    year: 2023,
    date: "20 de Febrero, 2023",
    title: "El adiós y la despedida",
    content: "Fue el día más difícil. Cuando entendimos que debíamos tomar distancia. Lloré en silencio por días porque sabía que perdía a una persona maravillosa, pero también comprendía que mi comportamiento anterior te había lastimado. Te pedí espacio, pero en el fondo me dolía saber que era la consecuencia lógica de mis actos.",
    mood: "Desafío",
    isImportant: true,
    quote: "Aceptar las consecuencias de los propios errores es el principio de la verdadera responsabilidad."
  },

  // 2024
  {
    id: "n-2024-1",
    year: 2024,
    date: "10 de Agosto, 2024",
    title: "Un año de sanar e introspección",
    content: "En 2024 dediqué mucho tiempo a reflexionar. Fui a terapia, analicé mis patrones de conducta y aprendí a no culpar al destino ni a ti. Comprendí que amar es también aprender a comunicarse con vulnerabilidad y sin ego.",
    mood: "Madurez",
    isImportant: false,
    quote: "Para ofrecer paz a alguien más, primero hay que construirla dentro de uno mismo."
  },

  // 2025
  {
    id: "n-2025-1",
    year: 2025,
    date: "14 de Febrero, 2025",
    title: "Recordándote con un afecto limpio",
    content: "Hoy al caminar por el parque donde solíamos pasear, sentí una gran paz. Ya no sentí esa opresión en el pecho, sino un profundo agradecimiento por todo lo bonito que vivimos. Aprendí a recordarte con una sonrisa serena.",
    mood: "Gratitud",
    isImportant: false
  },

  // 2026
  {
    id: "n-2026-1",
    year: 2026,
    date: "06 de Agosto, 2026",
    title: "Carta de Cierre y Explicación Abierta (2020 - 2026)",
    content: `Hola.

Creé este pequeño blog de notas interactivo pensando en ti y en la historia que compartimos desde el 2020 hasta este 2026.

Sé que durante mucho tiempo quedaron dudas en el aire, explicaciones pendientes y quizás sensaciones de desconcierto sobre por qué las cosas sucedieron como sucedieron. 

Hoy, habiendo transcurrido estos años y con la perspectiva que solo da la madurez y la distancia sana, quiero decirte:

1. Perdonarme y pedirte perdón: Lamento de corazón las veces que fui impaciente, frío o inmaduro. Mis errores no eran un reflejo de lo que valías para mí, sino de mis propias luchas internas que no supe gestionar.
2. Reconocer lo bueno: Fuiste una mujer brillante, generosa y amorosa. Los años 2020 y 2021 están llenos de los recuerdos más bonitos y verdaderos que conservo.
3. Mi propósito con esto: No busco incomodarte ni forzar situaciones que ya pertenecen al pasado. Solo quería dejar este espacio limpio, ordenado y transparente, donde cada año tenga su explicación justa.

Te deseo de todo corazón una vida llena de éxitos, alegría, salud y un amor tan noble y sincero como el que tú mereces.

Con gratitud y respeto siempre,
Tu explicación desde el alma.`,
    mood: "Cierre",
    isImportant: true,
    isLetter: true,
    quote: "El tiempo pone cada recuerdo en su lugar, y el mío hacia ti se queda lleno de luz y bendiciones."
  }
];

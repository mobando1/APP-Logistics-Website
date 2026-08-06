import type { LegalDoc } from "./types";

// ============================================================================
// POL-PAE-02 V. 02 — Política de Protección de Datos Personas Naturales o
// Jurídicas (APP LOGISTICS SAS, Colombia). Vigente desde el 01/04/2026.
//
// Transcripción del documento firmado entregado por el cliente. Por decisión
// suya no se publican el bloque de firmas ni el índice de modificaciones del
// documento original: la fecha de actualización va en la nota de cierre.
//
// Al recibir una versión nueva se reemplaza este archivo completo y se
// actualizan `version` y `footnote`.
//
// Los identificadores de sección ("sec-5", "sec-5-1") se derivan del número y
// NO deben cambiarse entre versiones: son las anclas públicas del documento.
// ============================================================================

const politicaDatosCo: LegalDoc = {
  code: "POL-PAE-02",
  version: "V. 02",
  title: "Política de Protección de Datos Personas Naturales o Jurídicas",
  subtitle:
    "Tratamiento y protección de datos personales conforme a la Ley 1581 de 2012",
  footnote:
    "Esta Política de Protección de Datos Personas Naturales o Jurídicas fue actualizada el 31 de marzo de 2026.",

  sections: [
    // ------------------------------------------------------------------ 1
    {
      id: "sec-1",
      number: "1",
      title: "Alcance",
      blocks: [
        {
          kind: "p",
          text: [
            {
              text: "Esta Política de Protección de Datos Personales se aplicará a todas las Bases de Datos y/o Archivos que contengan Datos Personales que sean objeto de Tratamiento por parte de ",
            },
            { text: "APP LOGISTICS SAS", bold: true },
            { text: "." },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 2
    {
      id: "sec-2",
      number: "2",
      title: "Identificación del responsable del tratamiento de datos personales",
      blocks: [
        {
          kind: "p",
          text: [
            { text: "APP LOGISTICS SAS", bold: true },
            {
              text: " (en adelante «APP LOGISTICS SAS» o «la Compañía»), NIT 900.534.593-2, con domicilio en la Calle 23C No. 69B-56, oficina 503-1, de la ciudad de Bogotá D.C., Colombia; dirección electrónica: info@applogistics.com.co; teléfono (+571) 8037344.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 3
    {
      id: "sec-3",
      number: "3",
      title: "Definiciones",
      blocks: [
        {
          kind: "defs",
          items: [
            {
              term: "Autorización",
              text: [
                {
                  text: "Consentimiento previo, expreso e informado del titular para llevar a cabo el Tratamiento de Datos Personales.",
                },
              ],
            },
            {
              term: "Aviso de privacidad",
              text: [
                {
                  text: "Comunicación verbal o escrita dirigida al Titular, mediante la cual el Responsable le informa que existe una política de tratamiento de datos, cómo consultarla y las finalidades para las cuales se recogerán y tratarán sus datos personales.",
                },
              ],
            },
            {
              term: "Base de Datos",
              text: [
                {
                  text: "Conjunto de datos pertenecientes a un mismo contexto y almacenados sistemáticamente.",
                },
              ],
            },
            {
              term: "Dato Personal",
              text: [
                {
                  text: "Cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.",
                },
              ],
            },
            {
              term: "Dato Semiprivado",
              text: [
                {
                  text: "Dato que no tiene naturaleza íntima, reservada, ni pública y cuyo conocimiento y divulgación puede interesar no sólo a su titular sino a cierto sector o grupo de personas.",
                },
              ],
            },
            {
              term: "Dato Privado",
              text: [
                {
                  text: "Es el dato que por su naturaleza íntima o reservada solo es relevante para el titular.",
                },
              ],
            },
            {
              term: "Dato Sensible",
              text: [
                {
                  text: "Aquel que afecta la intimidad del Titular o cuyo uso indebido puede generar su discriminación, tales como los que revelen el origen racial o étnico, la orientación política, las convicciones religiosas o filosóficas, la pertenencia a sindicatos, organizaciones sociales, de derechos humanos o partidos políticos, así como los datos relativos a la salud, a la vida sexual y los datos biométricos.",
                },
              ],
            },
            {
              term: "Dato público",
              text: [
                {
                  text: "Dato calificado como tal por la ley o que no sea semiprivado, privado o sensible. Incluye, entre otros, datos relativos al estado civil, profesión u oficio, calidad de comerciante o servidor público, y los que consten en documentos públicos o sentencias no sometidas a reserva.",
                },
              ],
            },
            {
              term: "Encargado del Tratamiento",
              text: [
                {
                  text: "Persona natural o jurídica, pública o privada, que por sí misma o en asocio con otros, realice el Tratamiento de Datos Personales por cuenta del Responsable del Tratamiento. En los eventos en que el Responsable no ejerza como Encargado de la Base de Datos, se identificará expresamente quién será el Encargado.",
                },
              ],
            },
            {
              term: "Responsable del Tratamiento",
              text: [
                {
                  text: "Persona natural o jurídica, pública o privada, que por sí misma o en asocio con otros, decida sobre la Base de Datos y/o el Tratamiento de los datos.",
                },
              ],
            },
            {
              term: "Titular",
              text: [
                {
                  text: "Persona natural cuyos Datos Personales sean objeto de Tratamiento.",
                },
              ],
            },
            {
              term: "Tratamiento",
              text: [
                {
                  text: "Cualquier operación o conjunto de operaciones sobre Datos Personales, tales como la recolección, almacenamiento, uso, circulación o supresión.",
                },
              ],
            },
            {
              term: "Transmisión de datos personales",
              text: [
                {
                  text: "Comunicación de datos personales a un Encargado del Tratamiento para que los trate por cuenta del Responsable, dentro o fuera de Colombia.",
                },
              ],
            },
            {
              term: "Transferencia de datos personales",
              text: [
                {
                  text: "Envío de datos personales a un receptor que actúa como Responsable del Tratamiento y decide de manera autónoma sobre esos datos, dentro o fuera de Colombia.",
                },
              ],
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 4
    {
      id: "sec-4",
      number: "4",
      title: "Tratamiento",
      blocks: [
        {
          kind: "p",
          text: [
            {
              text: "APP LOGISTICS SAS actuando en calidad de Responsable del Tratamiento de Datos Personales, para el adecuado desarrollo de sus actividades de manipulación de carga, apoyo logístico en bodega y operaciones de distribución, así como para el fortalecimiento de sus relaciones con terceros, recolecta, almacena, usa, circula y suprime Datos Personales de personas naturales con quienes tiene o ha tenido relación, incluidos los datos de contacto de las personas naturales que actúan como representantes, empleados o contactos autorizados de personas jurídicas.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 5
    {
      id: "sec-5",
      number: "5",
      title: "Finalidad",
      blocks: [
        {
          kind: "p",
          text: [
            {
              text: "APP LOGISTICS SAS recolecta, almacena, usa, actualiza, consulta, transmite, transfiere cuando sea procedente y suprime datos personales únicamente para finalidades legítimas, necesarias y proporcionales a su objeto social, a las relaciones que mantiene con los Titulares y al cumplimiento de sus obligaciones legales, contractuales y de seguridad.",
            },
          ],
        },
        {
          kind: "p",
          text: [
            {
              text: "Las finalidades específicas aplicables dependerán de la relación del Titular con APP LOGISTICS SAS y serán informadas al momento de obtener la autorización, cuando esta sea requerida.",
            },
          ],
        },
      ],
      children: [
        {
          id: "sec-5-1",
          number: "5.1",
          title: "Clientes, prospectos y contactos comerciales",
          blocks: [
            {
              kind: "p",
              text: [
                {
                  text: "APP LOGISTICS SAS podrá tratar los datos personales de clientes, prospectos y sus contactos autorizados para:",
                },
              ],
            },
            {
              kind: "list",
              items: [
                [
                  {
                    text: "Elaborar y enviar cotizaciones, propuestas comerciales y ofertas de servicios.",
                  },
                ],
                [{ text: "Celebrar, ejecutar, administrar y terminar contratos." }],
                [
                  {
                    text: "Coordinar servicios de cargue, descargue, almacenamiento, inventarios, distribución y demás operaciones logísticas.",
                  },
                ],
                [
                  {
                    text: "Gestionar solicitudes, requerimientos, novedades, reclamaciones, devoluciones y servicio al cliente.",
                  },
                ],
                [
                  {
                    text: "Realizar facturación, recaudo, pagos, conciliaciones y gestión de cartera.",
                  },
                ],
                [
                  {
                    text: "Enviar información relacionada con los servicios contratados, reportes operativos, novedades, certificados y comunicaciones administrativas.",
                  },
                ],
                [
                  {
                    text: "Evaluar la calidad del servicio mediante encuestas de satisfacción.",
                  },
                ],
                [
                  {
                    text: "Enviar información comercial, promocional o institucional sobre servicios de APP LOGISTICS SAS, siempre que exista autorización cuando esta sea necesaria.",
                  },
                ],
                [
                  {
                    text: "Cumplir obligaciones legales, contractuales, tributarias, contables y de auditoría.",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sec-5-2",
          number: "5.2",
          title: "Proveedores, contratistas y aliados",
          blocks: [
            {
              kind: "p",
              text: [
                {
                  text: "APP LOGISTICS SAS podrá tratar datos de proveedores, contratistas, subcontratistas, conductores y aliados para:",
                },
              ],
            },
            {
              kind: "list",
              items: [
                [
                  {
                    text: "Verificar requisitos de vinculación, experiencia, capacidad técnica, documentación y cumplimiento contractual.",
                  },
                ],
                [
                  {
                    text: "Solicitar cotizaciones, celebrar y ejecutar contratos u órdenes de servicio.",
                  },
                ],
                [
                  {
                    text: "Coordinar ingresos, actividades, accesos, turnos, entregas y operaciones en instalaciones propias o de clientes.",
                  },
                ],
                [
                  {
                    text: "Gestionar facturación, pagos, retenciones, obligaciones tributarias y contables.",
                  },
                ],
                [
                  {
                    text: "Verificar el cumplimiento de requisitos de seguridad, SST, calidad y demás exigencias aplicables.",
                  },
                ],
                [
                  {
                    text: "Administrar novedades, incidentes, auditorías, evaluaciones y procesos de mejora.",
                  },
                ],
                [
                  {
                    text: "Atender requerimientos de autoridades y ejercer la defensa de los derechos de la Compañía.",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sec-5-3",
          number: "5.3",
          title: "Trabajadores, excolaboradores y personal en misión",
          blocks: [
            {
              kind: "p",
              text: [
                {
                  text: "APP LOGISTICS SAS podrá tratar datos de sus trabajadores, excolaboradores y personal vinculado a sus operaciones para:",
                },
              ],
            },
            {
              kind: "list",
              items: [
                [
                  {
                    text: "Adelantar procesos de vinculación, contratación, afiliación, pago de nómina y administración de beneficios.",
                  },
                ],
                [
                  {
                    text: "Gestionar aportes al sistema de seguridad social, obligaciones laborales, tributarias y parafiscales.",
                  },
                ],
                [
                  {
                    text: "Administrar turnos, asistencia, permisos, vacaciones, incapacidades, dotación, formación y evaluaciones de desempeño.",
                  },
                ],
                [
                  {
                    text: "Implementar actividades de seguridad y salud en el trabajo, prevención de riesgos, investigación de accidentes e incidentes y cumplimiento de obligaciones legales.",
                  },
                ],
                [
                  {
                    text: "Gestionar procesos disciplinarios, administrativos y de desvinculación.",
                  },
                ],
                [
                  {
                    text: "Expedir certificaciones laborales y atender requerimientos de entidades públicas o privadas autorizadas.",
                  },
                ],
                [
                  {
                    text: "Conservar soportes necesarios para la defensa judicial o administrativa de APP LOGISTICS SAS.",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sec-5-4",
          number: "5.4",
          title: "Candidatos y hojas de vida",
          blocks: [
            {
              kind: "p",
              text: [
                {
                  text: "APP LOGISTICS SAS podrá tratar los datos de candidatos para:",
                },
              ],
            },
            {
              kind: "list",
              items: [
                [{ text: "Recibir, clasificar, analizar y conservar hojas de vida." }],
                [
                  {
                    text: "Evaluar perfiles, experiencia, formación y competencias frente a vacantes existentes o futuras.",
                  },
                ],
                [{ text: "Contactar al candidato durante el proceso de selección." }],
                [
                  {
                    text: "Realizar verificaciones de referencias laborales o académicas, cuando sean procedentes y se cuente con la autorización aplicable.",
                  },
                ],
                [{ text: "Informar al candidato el resultado del proceso." }],
              ],
            },
            {
              kind: "p",
              text: [
                {
                  text: "Si el candidato no es seleccionado, su hoja de vida se conservará únicamente durante el término informado en la autorización o por el tiempo necesario para procesos de selección futuros, salvo que el Titular solicite su supresión o exista un deber legal de conservación.",
                },
              ],
            },
          ],
        },
        {
          id: "sec-5-5",
          number: "5.5",
          title: "Visitantes, seguridad y videovigilancia",
          blocks: [
            {
              kind: "p",
              text: [
                {
                  text: "APP LOGISTICS SAS podrá tratar datos de visitantes, imágenes y registros de acceso para:",
                },
              ],
            },
            {
              kind: "list",
              items: [
                [
                  {
                    text: "Verificar identidad y autorizar el ingreso a instalaciones propias o administradas por la Compañía.",
                  },
                ],
                [
                  {
                    text: "Proteger la seguridad de las personas, bienes, instalaciones, mercancías, vehículos e información.",
                  },
                ],
                [
                  {
                    text: "Prevenir, detectar, investigar y atender incidentes, pérdidas, actos fraudulentos o conductas contrarias a la ley o a los protocolos de seguridad.",
                  },
                ],
                [
                  {
                    text: "Apoyar investigaciones internas y atender requerimientos de autoridades competentes.",
                  },
                ],
                [
                  {
                    text: "Mantener trazabilidad de accesos y permanencia en áreas operativas.",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sec-5-6",
          number: "5.6",
          title: "Datos sensibles y SST",
          blocks: [
            {
              kind: "p",
              text: [
                {
                  text: "Cuando sea estrictamente necesario, APP LOGISTICS SAS podrá tratar datos sensibles, especialmente datos de salud relacionados con seguridad y salud en el trabajo, para cumplir obligaciones legales, prevenir riesgos laborales, gestionar incapacidades, accidentes de trabajo, restricciones médicas, actividades de prevención y vigilancia epidemiológica.",
                },
              ],
            },
            {
              kind: "p",
              text: [
                {
                  text: "El acceso a estos datos estará limitado al personal autorizado y se aplicarán medidas reforzadas de confidencialidad y seguridad. ",
                },
                {
                  text: "El Titular será informado de que no está obligado a suministrar datos sensibles, excepto cuando exista una obligación legal aplicable.",
                  bold: true,
                },
              ],
            },
          ],
        },
        {
          id: "sec-5-7",
          number: "5.7",
          title: "Atención de derechos y cumplimiento",
          blocks: [
            {
              kind: "p",
              text: [
                { text: "APP LOGISTICS SAS podrá tratar datos personales para:" },
              ],
            },
            {
              kind: "list",
              items: [
                [
                  {
                    text: "Atender consultas, reclamos, solicitudes de actualización, rectificación, supresión o revocatoria de autorización.",
                  },
                ],
                [
                  {
                    text: "Conservar evidencia de autorizaciones y de la atención de solicitudes.",
                  },
                ],
                [
                  {
                    text: "Cumplir requerimientos judiciales, administrativos, regulatorios o de autoridades competentes.",
                  },
                ],
                [
                  {
                    text: "Realizar auditorías internas o externas, controles de cumplimiento y gestión de riesgos.",
                  },
                ],
                [
                  {
                    text: "Ejercer y defender los derechos de APP LOGISTICS SAS en procesos judiciales, administrativos o extrajudiciales.",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sec-5-8",
          number: "5.8",
          title: "Canales digitales",
          blocks: [
            {
              kind: "p",
              text: [
                {
                  text: "APP LOGISTICS SAS podrá tratar los datos recolectados a través de su sitio web, formularios, correo electrónico, redes sociales, WhatsApp u otros canales digitales para atender solicitudes, cotizaciones, contactos comerciales, procesos de selección y comunicaciones relacionadas con sus servicios.",
                },
              ],
            },
            {
              kind: "p",
              text: [
                {
                  text: "Cuando se utilicen cookies u otras tecnologías de rastreo, la Compañía informará su finalidad y los mecanismos disponibles para su administración, de conformidad con la normativa aplicable.",
                },
              ],
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 6
    {
      id: "sec-6",
      number: "6",
      title: "Derechos de los titulares de los datos personales",
      blocks: [
        {
          kind: "p",
          text: [
            {
              text: "Los Titulares cuyos Datos Personales sean objeto de Tratamiento por parte de APP LOGISTICS SAS tienen los siguientes derechos, los cuales pueden ejercer en cualquier momento:",
            },
          ],
        },
        {
          kind: "list",
          items: [
            [
              {
                text: "Conocer los Datos Personales sobre los cuales APP LOGISTICS SAS está realizando el Tratamiento. De igual manera, el Titular puede solicitar en cualquier momento, que sus datos sean actualizados o rectificados, por ejemplo, si encuentra que sus datos son parciales, inexactos, incompletos, fraccionados, induzcan a error, o aquellos cuyo Tratamiento esté expresamente prohibido o no haya sido autorizado.",
              },
            ],
            [
              {
                text: "Ser informado por APP LOGISTICS SAS, previa solicitud, respecto del uso que esta le ha dado a sus Datos Personales.",
              },
            ],
            [
              {
                text: "Solicitar y obtener prueba de la autorización otorgada a APP LOGISTICS SAS, salvo en los casos en que la ley no exige autorización.",
              },
            ],
            [
              {
                text: "Revocar la autorización y/o solicitar la supresión de sus Datos Personales cuando en el Tratamiento no se respeten los principios, derechos y garantías constitucionales y legales, o cuando así lo haya determinado la Superintendencia de Industria y Comercio. La revocatoria y/o supresión no procederá cuando exista un deber legal o contractual que obligue al Titular a permanecer en la Base de Datos.",
              },
            ],
            [
              {
                text: "Acceder en forma gratuita a sus Datos Personales objeto de Tratamiento, al menos una vez cada mes calendario y cada vez que existan modificaciones sustanciales de esta Política.",
              },
            ],
            [
              {
                text: "Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la Ley 1581 de 2012, una vez agotado el trámite de consulta o reclamo ante APP LOGISTICS SAS.",
              },
            ],
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 7
    {
      id: "sec-7",
      number: "7",
      title: "Área responsable de la implementación y observancia de esta política",
      blocks: [
        {
          kind: "p",
          text: [
            {
              text: "La Gerencia General de APP LOGISTICS SAS o a quien este designe, tiene a su cargo la labor de desarrollo, implementación, capacitación y observancia de esta Política. Para el efecto, todos los funcionarios que realizan el Tratamiento de Datos Personales en las diferentes áreas de APP LOGISTICS SAS, están obligados a reportar estas Bases de Datos a la Gerencia y a dar traslado a esta de manera inmediata, de todas las peticiones, quejas o reclamos que reciban por parte de los Titulares de Datos Personales.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 8
    {
      id: "sec-8",
      number: "8",
      title: "Autorización",
      blocks: [
        {
          kind: "p",
          text: [
            {
              text: "APP LOGISTICS SAS debe solicitar autorización previa, expresa e informada a los Titulares de los Datos Personales sobre los que requiera realizar el Tratamiento.",
            },
          ],
        },
      ],
      children: [
        {
          id: "sec-8-1",
          number: "8.1",
          title: "Autorización previa",
          blocks: [
            {
              kind: "p",
              text: [
                {
                  text: "Autorización previa significa, que el consentimiento debe ser otorgado por el Titular, a más tardar en el momento de la recolección de los Datos Personales.",
                },
              ],
            },
          ],
        },
        {
          id: "sec-8-2",
          number: "8.2",
          title: "Autorización expresa",
          blocks: [
            {
              kind: "p",
              text: [
                {
                  text: "Autorización expresa quiere decir que el consentimiento del Titular debe ser explícito y concreto, ",
                },
                {
                  text: "no son válidas las autorizaciones abiertas y no específicas",
                  bold: true,
                },
                {
                  text: ". Se requiere que el Titular manifieste su voluntad de autorizar que APP LOGISTICS SAS realice el Tratamiento de sus Datos Personales.",
                },
              ],
            },
            {
              kind: "p",
              text: [
                {
                  text: "Esta manifestación de voluntad del Titular puede darse a través de diferentes mecanismos puestos a disposición por APP LOGISTICS SAS, tales como:",
                },
              ],
            },
            {
              kind: "list",
              items: [
                [
                  {
                    text: "Por escrito, por ejemplo, diligenciando un formato de autorización.",
                  },
                ],
                [
                  {
                    text: "De forma oral, por ejemplo, en una conversación telefónica o en videoconferencia.",
                  },
                ],
                [
                  {
                    text: "Mediante conductas inequívocas que permitan concluir que otorgó su autorización, por ejemplo, a través de su aceptación expresa a los Términos y Condiciones de una actividad dentro de los cuales se requiera la autorización de los participantes para el Tratamiento de sus Datos Personales.",
                  },
                ],
              ],
            },
            {
              kind: "p",
              text: [
                {
                  text: "Cualquiera que sea el mecanismo utilizado por APP LOGISTICS SAS, es necesario que la autorización se conserve para poder ser consultada con posterioridad.",
                },
              ],
            },
          ],
        },
        {
          id: "sec-8-3",
          number: "8.3",
          title: "Autorización informada",
          blocks: [
            {
              kind: "p",
              text: [
                {
                  text: "Autorización Informada significa que al momento de solicitar el consentimiento al Titular, debe informársele claramente:",
                },
              ],
            },
            {
              kind: "list",
              items: [
                [{ text: "Los Datos Personales que serán recolectados." }],
                [
                  {
                    text: "La identificación y datos de contacto del Responsable y del Encargado del Tratamiento.",
                  },
                ],
                [
                  {
                    text: "Las finalidades específicas del Tratamiento que se pretende realizar, es decir: cómo y para qué se va a hacer la recolección, el uso, la circulación de los Datos Personales.",
                  },
                ],
                [
                  {
                    text: "Cuáles son los derechos que tiene como Titular de los Datos Personales; para el efecto ver el numeral 6 de esta Política.",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 9
    {
      id: "sec-9",
      number: "9",
      title:
        "Disposiciones especiales para el tratamiento de datos personales de naturaleza sensible",
      blocks: [
        {
          kind: "p",
          text: [
            {
              text: "De acuerdo con la Ley de Protección de Datos Personales, se consideran como datos de naturaleza sensible aquellos que afectan la intimidad o cuyo uso indebido puede generar discriminación, tales como los relacionados con:",
            },
          ],
        },
        {
          kind: "list",
          items: [
            [{ text: "Origen racial o étnico." }],
            [{ text: "Orientación política." }],
            [{ text: "Convicciones religiosas / filosóficas." }],
            [
              {
                text: "Pertenencia a sindicatos, a organizaciones sociales, a organizaciones de derechos humanos o a partidos políticos.",
              },
            ],
            [{ text: "Salud. (Deberá tener consentimiento informado)" }],
            [{ text: "Vida sexual." }],
            [{ text: "Datos biométricos (como la huella dactilar, la firma y la foto)." }],
          ],
        },
        {
          kind: "p",
          text: [
            {
              text: "El Tratamiento de los Datos Personales de naturaleza sensible está prohibido por la ley, salvo que se cuente con autorización expresa, previa e informada del Titular, entre otras excepciones consagradas en el Artículo 6º de la Ley 1581 de 2012.",
            },
          ],
        },
        {
          kind: "p",
          text: [
            {
              text: "En este caso, además de cumplir con los requisitos establecidos para la autorización, APP LOGISTICS SAS deberá:",
            },
          ],
        },
        {
          kind: "list",
          items: [
            [
              {
                text: "Informar al Titular que por tratarse de datos sensibles no está obligado a autorizar su Tratamiento.",
              },
            ],
            [
              {
                text: "Informar al Titular cuáles de los datos que serán objeto de Tratamiento son sensibles y la finalidad del Tratamiento.",
              },
            ],
          ],
        },
        {
          kind: "p",
          text: [
            { text: "IMPORTANTE: ", bold: true },
            {
              text: "Ninguna actividad podrá condicionarse a que el Titular suministre Datos Personales sensibles.",
              bold: true,
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 10
    {
      id: "sec-10",
      number: "10",
      title:
        "Procedimiento para atención y respuesta a peticiones, consultas, quejas y reclamos de los titulares de datos personales",
      blocks: [
        {
          kind: "p",
          text: [
            {
              text: "Los Titulares de los Datos Personales que estén siendo recolectados, almacenados, utilizados, puestos en circulación por APP LOGISTICS SAS, podrán ejercer en cualquier momento sus derechos a conocer, actualizar, rectificar y suprimir información y revocar la autorización.",
            },
          ],
        },
        {
          kind: "p",
          text: [
            {
              text: "Para el efecto, se seguirá el siguiente procedimiento, de conformidad con la Ley de Protección de Datos Personales:",
            },
          ],
        },
      ],
      children: [
        {
          id: "sec-10-1",
          number: "10.1",
          title: "Atención y respuesta a peticiones y consultas",
          blocks: [
            {
              kind: "p",
              text: [
                { text: "¿En qué consiste el trámite? ", bold: true },
                {
                  text: "El Titular o sus causahabientes, podrán solicitar a APP LOGISTICS SAS, a través de los medios indicados más adelante:",
                },
              ],
            },
            {
              kind: "list",
              items: [
                [
                  {
                    text: "Información sobre los Datos Personales del Titular que son objeto de Tratamiento.",
                  },
                ],
                [
                  {
                    text: "Información respecto del uso que se le ha dado por APP LOGISTICS SAS a sus datos personales.",
                  },
                ],
              ],
            },
            {
              kind: "p",
              text: [
                {
                  text: "Medios habilitados para la presentación de peticiones y consultas: ",
                  bold: true,
                },
                {
                  text: "APP LOGISTICS SAS ha dispuesto los siguientes medios para la recepción y atención de peticiones y consultas, todos los cuales permiten conservar prueba de las mismas:",
                },
              ],
            },
            {
              kind: "list",
              items: [
                [
                  {
                    text: "Comunicación dirigida a APP LOGISTICS SAS — Calle 23C No. 69B-56, oficina 503-1, en la ciudad de Bogotá D.C.",
                  },
                ],
                [
                  {
                    text: "Solicitud presentada al correo electrónico: info@applogistics.com.co.",
                  },
                ],
              ],
            },
            {
              kind: "p",
              text: [
                {
                  text: "Atención y respuesta por parte de APP LOGISTICS SAS: ",
                  bold: true,
                },
                {
                  text: "Las peticiones y consultas serán atendidas en un término máximo de ",
                },
                { text: "diez (10) días hábiles", bold: true },
                {
                  text: " contados a partir de la fecha de recibo de las mismas. Cuando no fuere posible atender la petición o consulta dentro de dicho término, se informará al interesado, expresando los motivos de la demora y señalando la fecha en que se atenderá su petición o consulta, la cual en ningún caso podrá superar los cinco (5) días hábiles siguientes al vencimiento del primer término.",
                },
              ],
            },
          ],
        },
        {
          id: "sec-10-2",
          number: "10.2",
          title: "Atención y respuesta a reclamos",
          blocks: [
            {
              kind: "p",
              text: [
                { text: "¿En qué consiste el trámite? ", bold: true },
                {
                  text: "El Titular o sus causahabientes que consideren que la información contenida en una Base de Datos debe ser objeto de corrección, actualización o supresión, o que adviertan el presunto incumplimiento de cualquiera de los deberes previstos en la Ley 1581 de 2012, podrán presentar un reclamo ante APP LOGISTICS SAS.",
                },
              ],
            },
            {
              kind: "p",
              text: [
                { text: "Requisitos del reclamo: ", bold: true },
                {
                  text: "El reclamo se presentará por los mismos medios habilitados en el numeral 10.1 y deberá contener: (i) la identificación del Titular; (ii) la descripción de los hechos que dan lugar al reclamo; (iii) la dirección física o electrónica de notificación; y (iv) los documentos que se quieran hacer valer.",
                },
              ],
            },
            {
              kind: "p",
              text: [
                {
                  text: "Si el reclamo resulta incompleto, APP LOGISTICS SAS requerirá al interesado dentro de los cinco (5) días siguientes a su recepción para que subsane las fallas. Transcurridos dos (2) meses desde la fecha del requerimiento sin que el solicitante presente la información requerida, se entenderá que ha desistido del reclamo.",
                },
              ],
            },
            {
              kind: "p",
              text: [
                {
                  text: "Si APP LOGISTICS SAS no es competente para resolver el reclamo, dará traslado a quien corresponda en un término máximo de dos (2) días hábiles e informará de ello al interesado.",
                },
              ],
            },
            {
              kind: "p",
              text: [
                { text: "Trámite y término de respuesta: ", bold: true },
                {
                  text: "Una vez recibido el reclamo completo, se incluirá en la respectiva Base de Datos una leyenda que diga «reclamo en trámite» y el motivo del mismo, en un término no mayor a dos (2) días hábiles. Dicha leyenda se mantendrá hasta que el reclamo sea decidido.",
                },
              ],
            },
            {
              kind: "p",
              text: [
                { text: "El término máximo para atender el reclamo será de " },
                { text: "quince (15) días hábiles", bold: true },
                {
                  text: " contados a partir del día siguiente a la fecha de su recibo. Cuando no fuere posible atenderlo dentro de dicho término, se informará al interesado los motivos de la demora y la fecha en que se atenderá su reclamo, la cual en ningún caso podrá superar los ocho (8) días hábiles siguientes al vencimiento del primer término.",
                },
              ],
            },
          ],
        },
        {
          id: "sec-10-3",
          number: "10.3",
          title: "Requisito de procedibilidad",
          blocks: [
            {
              kind: "p",
              text: [
                {
                  text: "El Titular o sus causahabientes solo podrán elevar queja ante la Superintendencia de Industria y Comercio una vez hayan agotado el trámite de consulta o reclamo ante APP LOGISTICS SAS.",
                },
              ],
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 11
    {
      id: "sec-11",
      number: "11",
      title: "Seguridad de los datos personales",
      blocks: [
        {
          kind: "p",
          text: [
            {
              text: "APP LOGISTICS SAS, en estricta aplicación del Principio de Seguridad en el Tratamiento de Datos Personales, proporcionará las medidas técnicas, humanas y administrativas que sean necesarias para otorgar seguridad a los registros evitando su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento. Estas medidas serán razonables y proporcionales al riesgo y a la naturaleza de los Datos Personales tratados, y serán revisadas periódicamente.",
            },
          ],
        },
        {
          kind: "p",
          text: [
            {
              text: "En caso de presentarse un incidente de seguridad que afecte los Datos Personales, APP LOGISTICS SAS activará su protocolo de gestión de incidentes, adoptará las medidas correctivas necesarias y lo reportará a la Superintendencia de Industria y Comercio y a los Titulares afectados, cuando ello sea procedente conforme a la normativa aplicable. APP LOGISTICS SAS exigirá a los proveedores de servicios que contrata, la adopción y cumplimiento de las medidas técnicas, humanas y administrativas adecuadas para la protección de los Datos Personales en relación con los cuales dichos proveedores actúen como Encargados.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 12
    {
      id: "sec-12",
      number: "12",
      title: "Transferencia, transmisión y revelación de datos personales",
      blocks: [
        {
          kind: "p",
          text: [
            {
              text: "APP LOGISTICS SAS podrá revelar a sus compañías vinculadas, los Datos Personales sobre los cuales realiza el Tratamiento, para su utilización y Tratamiento conforme a esta Política de Protección de Datos Personales.",
            },
          ],
        },
        {
          kind: "p",
          text: [
            {
              text: "Las transferencias internacionales de Datos Personales solo se realizarán a países que proporcionen niveles adecuados de protección conforme a los estándares fijados por la Superintendencia de Industria y Comercio, cuando se cuente con la autorización expresa e inequívoca del Titular, o cuando se configure alguna de las excepciones previstas en el artículo 26 de la Ley 1581 de 2012. Las transmisiones internacionales a Encargados se sujetarán a la suscripción del contrato de transmisión exigido por la normativa aplicable.",
            },
          ],
        },
        {
          kind: "p",
          text: [
            {
              text: "Igualmente, APP LOGISTICS SAS podrá entregar los Datos Personales a terceros no vinculados a APP LOGISTICS SAS cuando: a. Se trate de contratistas en ejecución de contratos para el desarrollo de las actividades de APP LOGISTICS SAS; b. En el marco de procesos de reorganización empresarial, fusión, escisión, cesión de activos o de una línea de negocio con la que se relacione la información, caso en el cual el receptor deberá mantener las finalidades autorizadas por el Titular y el nivel de protección previsto en esta Política.",
            },
          ],
        },
        {
          kind: "p",
          text: [
            {
              text: "En todo caso, en los contratos de transmisión de Datos Personales, que se suscriban entre APP LOGISTICS SAS y los Encargados para el Tratamiento de Datos Personales, se exigirá que la información sea tratada conforme a esta Política de Protección de Datos Personales y se incluirán las siguientes obligaciones en cabeza del respectivo Encargado:",
            },
          ],
        },
        {
          kind: "list",
          items: [
            [
              {
                text: "Dar Tratamiento, a nombre de APP LOGISTICS SAS a los Datos Personales conforme los principios que los tutelan.",
              },
            ],
            [
              {
                text: "Salvaguardar la seguridad de las bases de datos en los que se contengan Datos Personales.",
              },
            ],
            [
              {
                text: "Guardar confidencialidad respecto del Tratamiento de los Datos Personales.",
              },
            ],
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 13
    {
      id: "sec-13",
      number: "13",
      title: "Legislación aplicable",
      blocks: [
        {
          kind: "p",
          text: [
            {
              text: "Esta Política de Protección de Datos Personales, se rige por lo dispuesto en la legislación vigente sobre protección de los Datos Personales a los que se refieren el Artículo 15 de la Constitución Política de Colombia, la Ley 1581 de 2012, el Decreto 1074 de 2015 —que compiló el Decreto 1377 de 2013—, la Ley 2300 de 2023 y demás normas que las modifiquen, deroguen o sustituyan.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 14
    {
      id: "sec-14",
      number: "14",
      title: "Principios aplicables al tratamiento de datos personales",
      blocks: [
        {
          kind: "p",
          text: [
            {
              text: "El Tratamiento de Datos Personales por parte de APP LOGISTICS SAS se rige por los siguientes principios:",
            },
          ],
        },
        {
          kind: "defs",
          items: [
            {
              term: "Legalidad",
              text: [
                {
                  text: "El Tratamiento es una actividad reglada que se sujeta a la ley y a sus normas reglamentarias.",
                },
              ],
            },
            {
              term: "Finalidad",
              text: [
                {
                  text: "El Tratamiento obedece a una finalidad legítima, la cual se informa al Titular.",
                },
              ],
            },
            {
              term: "Libertad",
              text: [
                {
                  text: "El Tratamiento solo se ejerce con el consentimiento previo, expreso e informado del Titular, salvo mandato legal o judicial que releve el consentimiento.",
                },
              ],
            },
            {
              term: "Veracidad o calidad",
              text: [
                {
                  text: "La información sujeta a Tratamiento debe ser veraz, completa, exacta, actualizada, comprobable y comprensible.",
                },
              ],
            },
            {
              term: "Transparencia",
              text: [
                {
                  text: "Se garantiza al Titular el derecho a obtener información sobre la existencia de datos que le conciernan.",
                },
              ],
            },
            {
              term: "Acceso y circulación restringida",
              text: [
                {
                  text: "Los Datos Personales solo podrán ser tratados por las personas autorizadas por el Titular o por la ley.",
                },
              ],
            },
            {
              term: "Seguridad",
              text: [
                {
                  text: "Se adoptan las medidas técnicas, humanas y administrativas necesarias para evitar la adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento.",
                },
              ],
            },
            {
              term: "Confidencialidad",
              text: [
                {
                  text: "Todas las personas que intervienen en el Tratamiento están obligadas a garantizar la reserva de la información, incluso después de terminada su relación con APP LOGISTICS SAS.",
                },
              ],
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 15
    {
      id: "sec-15",
      number: "15",
      title: "Deberes de APP LOGISTICS SAS y de los encargados",
      blocks: [
        {
          kind: "p",
          text: [
            {
              text: "En su calidad de Responsable del Tratamiento, APP LOGISTICS SAS se obliga, entre otros deberes, a:",
            },
          ],
        },
        {
          kind: "list",
          items: [
            [
              {
                text: "Garantizar al Titular el pleno y efectivo ejercicio del derecho de hábeas data.",
              },
            ],
            [
              {
                text: "Solicitar y conservar copia de la respectiva autorización otorgada por el Titular.",
              },
            ],
            [
              {
                text: "Informar debidamente al Titular sobre la finalidad de la recolección y los derechos que le asisten.",
              },
            ],
            [
              {
                text: "Conservar la información bajo las condiciones de seguridad necesarias para impedir su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento.",
              },
            ],
            [
              {
                text: "Actualizar, rectificar o suprimir la información cuando corresponda y tramitar las consultas y reclamos en los términos previstos en el numeral 10 de esta Política.",
              },
            ],
            [
              {
                text: "Informar, a solicitud del Titular, sobre el uso dado a sus datos.",
              },
            ],
            [
              {
                text: "Informar a la Superintendencia de Industria y Comercio cuando se presenten violaciones a los códigos de seguridad y existan riesgos en la administración de la información de los Titulares.",
              },
            ],
            [
              {
                text: "Los Encargados que traten Datos Personales por cuenta de APP LOGISTICS SAS quedarán sujetos a los deberes previstos en el artículo 18 de la Ley 1581 de 2012 y a las obligaciones contractuales señaladas en el numeral 12 de esta Política.",
              },
            ],
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 16
    {
      id: "sec-16",
      number: "16",
      title: "Tratamiento de datos personales de niños, niñas y adolescentes",
      blocks: [
        {
          kind: "p",
          text: [
            {
              text: "APP LOGISTICS SAS no recolecta de manera habitual Datos Personales de niños, niñas y adolescentes. Cuando ello resulte necesario —por ejemplo, para la afiliación de beneficiarios al sistema de seguridad social o para la entrega de auxilios y beneficios derivados de la relación laboral—, el Tratamiento se limitará a los datos estrictamente requeridos, responderá al interés superior del menor, respetará sus derechos fundamentales y contará con la autorización previa del representante legal, previo ejercicio del derecho del menor a ser escuchado.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 17
    {
      id: "sec-17",
      number: "17",
      title: "Aviso de privacidad y Registro Nacional de Bases de Datos",
      blocks: [
        {
          kind: "p",
          text: [
            {
              text: "Cuando no sea posible poner esta Política a disposición del Titular al momento de la recolección, APP LOGISTICS SAS utilizará un Aviso de Privacidad en los términos definidos en el numeral 3, en el que informará la identidad y los datos de contacto del Responsable, las finalidades del Tratamiento, los derechos del Titular y los mecanismos para conocer esta Política.",
            },
          ],
        },
        {
          kind: "p",
          text: [
            {
              text: "APP LOGISTICS SAS verificará si se encuentra obligada a inscribir sus Bases de Datos en el Registro Nacional de Bases de Datos (RNBD) administrado por la Superintendencia de Industria y Comercio y, en caso afirmativo, adelantará y actualizará dicho registro en los términos y plazos aplicables.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 18
    {
      id: "sec-18",
      number: "18",
      title: "Vigencia de la política y período de vigencia de las bases de datos",
      blocks: [
        {
          kind: "p",
          text: [
            { text: "Esta Política rige a partir del " },
            { text: "1 de abril de 2026", bold: true },
            {
              text: " y permanecerá vigente hasta que sea modificada o sustituida. Cualquier modificación sustancial será informada a los Titulares a través de los canales dispuestos por APP LOGISTICS SAS.",
            },
          ],
        },
        {
          kind: "p",
          text: [
            {
              text: "Las Bases de Datos permanecerán vigentes durante el tiempo necesario para cumplir las finalidades informadas y, en todo caso, durante los términos de conservación exigidos por las normas contables, tributarias, laborales, comerciales y de seguridad y salud en el trabajo aplicables. Cumplido dicho término, los Datos Personales serán suprimidos o anonimizados de forma segura.",
            },
          ],
        },
      ],
    },
  ],
};

export default politicaDatosCo;

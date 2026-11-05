// ═══ MUNDO — continentes, países y edificios (StudyQuest) ═══
// Edificios: cost = precio del nivel 1; nivel 2 = ×1.5, nivel 3 = ×2.
const CONTINENTS = [
  { id:'europe',  name:'Europa',        emoji:'🏰', unlock:null },
  { id:'america', name:'América',       emoji:'🌎', unlock:{ from:'europe',  conquests:4 } },
  { id:'mideast', name:'Medio Oriente', emoji:'🕌', unlock:{ from:'america', conquests:2 } },
  { id:'asia',    name:'Asia',          emoji:'⛩️', unlock:{ from:'mideast', conquests:2 } },
];

const WORLD_COUNTRIES = [
  // Europa (originales)
  { id:'spain', continent:'europe', name:'España', flag:'🇪🇸', color:'#dc2626', buildings:['castle','flamenco','bull','cathedral','plaza'], description:'La Península Ibérica' },
  { id:'france', continent:'europe', name:'Francia', flag:'🇫🇷', color:'#3b82f6', buildings:['eiffel','louvre','bakery','vineyard','palace'], description:'La República Francesa' },
  { id:'italy', continent:'europe', name:'Italia', flag:'🇮🇹', color:'#16a34a', buildings:['colosseum','tower','gondola','pizzeria','forum'], description:'La Bota Mediterránea' },
  { id:'germany', continent:'europe', name:'Alemania', flag:'🇩🇪', color:'#ca8a04', buildings:['castle2','brewery','cathedral2','market','factory'], description:'El Corazón de Europa' },
  { id:'uk', continent:'europe', name:'Reino Unido', flag:'🇬🇧', color:'#7c3aed', buildings:['bigben','palace2','pub','university','tower2'], description:'Las Islas Británicas' },
  { id:'greece', continent:'europe', name:'Grecia', flag:'🇬🇷', color:'#0284c7', buildings:['parthenon','temple','agora','port','statue'], description:'La Cuna de la Civilización' },
  { id:'portugal', continent:'europe', name:'Portugal', flag:'🇵🇹', color:'#15803d', buildings:['tower3','monastery','azulejo','fado','ship'], description:'El Fin del Mundo' },
  { id:'netherlands', continent:'europe', name:'Países Bajos', flag:'🇳🇱', color:'#ea580c', buildings:['windmill','tulips','canal','museum','bike'], description:'La Tierra Baja' },
  // Europa (nuevos)
  { id:'switzerland', continent:'europe', name:'Suiza', flag:'🇨🇭', color:'#e11d48', buildings:['ch_matterhorn','ch_chalet','ch_clock','ch_cablecar','ch_cheese'], description:'El País de los Alpes' },
  { id:'austria', continent:'europe', name:'Austria', flag:'🇦🇹', color:'#ef4444', buildings:['at_opera','at_schonbrunn','at_stephansdom','at_cafe','at_riesenrad'], description:'La Ciudad de la Música' },
  { id:'belgium', continent:'europe', name:'Bélgica', flag:'🇧🇪', color:'#eab308', buildings:['be_atomium','be_grandplace','be_belfry','be_chocolate','be_bruges'], description:'Corazón de chocolate' },
  { id:'ireland', continent:'europe', name:'Irlanda', flag:'🇮🇪', color:'#22c55e', buildings:['ie_moher','ie_castle','ie_roundtower','ie_cottage','ie_pub'], description:'La Isla Esmeralda' },
  { id:'norway', continent:'europe', name:'Noruega', flag:'🇳🇴', color:'#2563eb', buildings:['no_fjord','no_stavechurch','no_bryggen','no_viking','no_cabin'], description:'Tierra de Fiordos' },
  { id:'russia', continent:'europe', name:'Rusia', flag:'🇷🇺', color:'#b91c1c', buildings:['ru_basil','ru_kremlin','ru_winterpalace','ru_bolshoi','ru_matryoshka'], description:'El Gigante del Este' },
  // América
  { id:'colombia', continent:'america', name:'Colombia', flag:'🇨🇴', color:'#facc15', buildings:['co_cartagena','co_monserrate','co_penol','co_cafetal','co_colonial'], description:'El País de la Belleza' },
  { id:'mexico', continent:'america', name:'México', flag:'🇲🇽', color:'#16a34a', buildings:['mx_teotihuacan','mx_chichen','mx_bellasartes','mx_hacienda','mx_mariachi'], description:'Tierra Azteca y Maya' },
  { id:'peru', continent:'america', name:'Perú', flag:'🇵🇪', color:'#dc2626', buildings:['pe_machupicchu','pe_cusco','pe_terraces','pe_titicaca','pe_llamas'], description:'El Imperio Inca' },
  { id:'usa', continent:'america', name:'Estados Unidos', flag:'🇺🇸', color:'#1d4ed8', buildings:['us_liberty','us_empire','us_goldengate','us_capitol','us_diner'], description:'La Tierra de las Oportunidades' },
  // Medio Oriente
  { id:'qatar', continent:'mideast', name:'Qatar', flag:'🇶🇦', color:'#8a1538', buildings:['qa_towers','qa_mia','qa_souq','qa_dhow','qa_stadium'], description:'La Perla del Golfo' },
  { id:'uae', continent:'mideast', name:'Emiratos', flag:'🇦🇪', color:'#059669', buildings:['ae_burjkhalifa','ae_burjalarab','ae_mosque','ae_frame','ae_desert'], description:'El Oasis del Futuro' },
  { id:'egypt', continent:'mideast', name:'Egipto', flag:'🇪🇬', color:'#d97706', buildings:['eg_pyramids','eg_sphinx','eg_karnak','eg_felucca','eg_bazaar'], description:'El Regalo del Nilo' },
  // Asia
  { id:'japan', continent:'asia', name:'Japón', flag:'🇯🇵', color:'#e11d48', buildings:['jp_fuji','jp_himeji','jp_pagoda','jp_torii','jp_sakura'], description:'El País del Sol Naciente' },
  { id:'china', continent:'asia', name:'China', flag:'🇨🇳', color:'#dc2626', buildings:['cn_greatwall','cn_forbidden','cn_heaven','cn_lanterns','cn_bamboo'], description:'El Imperio del Centro' },
];

const WORLD_BUILDINGS = {
  // Europa original
  castle:{label:'Castillo',cost:50}, flamenco:{label:'Teatro',cost:40}, bull:{label:'Arena',cost:40}, cathedral:{label:'Sagrada Família',cost:60}, plaza:{label:'Plaza Mayor',cost:30},
  eiffel:{label:'Torre Eiffel',cost:80}, louvre:{label:'Louvre',cost:50}, bakery:{label:'Boulangerie',cost:30}, vineyard:{label:'Viñedo',cost:40}, palace:{label:'Versalles',cost:70},
  colosseum:{label:'Coliseo',cost:80}, tower:{label:'Torre de Pisa',cost:60}, gondola:{label:'Góndola',cost:40}, pizzeria:{label:'Pizzería',cost:30}, forum:{label:'Foro Romano',cost:50},
  castle2:{label:'Neuschwanstein',cost:60}, brewery:{label:'Cervecería',cost:40}, cathedral2:{label:'Catedral de Colonia',cost:70}, market:{label:'Mercado',cost:30}, factory:{label:'Fábrica',cost:40},
  bigben:{label:'Big Ben',cost:80}, palace2:{label:'Buckingham',cost:70}, pub:{label:'Pub',cost:30}, university:{label:'Oxford',cost:60}, tower2:{label:'Torre de Londres',cost:50},
  parthenon:{label:'Partenón',cost:100}, temple:{label:'Templo de Poseidón',cost:60}, agora:{label:'Ágora',cost:50}, port:{label:'Puerto',cost:40}, statue:{label:'Estatua',cost:60},
  tower3:{label:'Torre de Belém',cost:70}, monastery:{label:'Jerónimos',cost:50}, azulejo:{label:'Casa de azulejos',cost:30}, fado:{label:'Casa de Fado',cost:40}, ship:{label:'Carabela',cost:50},
  windmill:{label:'Molino',cost:50}, tulips:{label:'Tulipanes',cost:30}, canal:{label:'Canal',cost:40}, museum:{label:'Rijksmuseum',cost:70}, bike:{label:'Ciclovía',cost:20},
  // Suiza
  ch_matterhorn:{label:'Matterhorn',cost:90}, ch_chalet:{label:'Chalet alpino',cost:40}, ch_clock:{label:'Torre del Reloj',cost:60}, ch_cablecar:{label:'Teleférico',cost:50}, ch_cheese:{label:'Quesería',cost:30},
  // Austria
  at_opera:{label:'Ópera de Viena',cost:80}, at_schonbrunn:{label:'Schönbrunn',cost:70}, at_stephansdom:{label:'San Esteban',cost:70}, at_cafe:{label:'Café vienés',cost:30}, at_riesenrad:{label:'Noria del Prater',cost:50},
  // Bélgica
  be_atomium:{label:'Atomium',cost:80}, be_grandplace:{label:'Grand-Place',cost:70}, be_belfry:{label:'Campanario de Brujas',cost:60}, be_chocolate:{label:'Chocolatería',cost:30}, be_bruges:{label:'Canal de Brujas',cost:40},
  // Irlanda
  ie_moher:{label:'Acantilados de Moher',cost:80}, ie_castle:{label:'Castillo de Blarney',cost:60}, ie_roundtower:{label:'Torre redonda',cost:50}, ie_cottage:{label:'Cabaña de piedra',cost:30}, ie_pub:{label:'Pub irlandés',cost:30},
  // Noruega
  no_fjord:{label:'Fiordo',cost:90}, no_stavechurch:{label:'Iglesia de madera',cost:60}, no_bryggen:{label:'Bryggen',cost:50}, no_viking:{label:'Barco vikingo',cost:50}, no_cabin:{label:'Cabaña y aurora',cost:40},
  // Rusia
  ru_basil:{label:'San Basilio',cost:100}, ru_kremlin:{label:'Kremlin',cost:80}, ru_winterpalace:{label:'Palacio de Invierno',cost:70}, ru_bolshoi:{label:'Teatro Bolshói',cost:60}, ru_matryoshka:{label:'Tienda de matrioskas',cost:30},
  // Colombia
  co_cartagena:{label:'Murallas de Cartagena',cost:70}, co_monserrate:{label:'Monserrate',cost:80}, co_penol:{label:'Piedra del Peñol',cost:60}, co_cafetal:{label:'Cafetal',cost:40}, co_colonial:{label:'Casa colonial',cost:30},
  // México
  mx_teotihuacan:{label:'Pirámide del Sol',cost:90}, mx_chichen:{label:'Chichén Itzá',cost:80}, mx_bellasartes:{label:'Bellas Artes',cost:70}, mx_hacienda:{label:'Hacienda',cost:40}, mx_mariachi:{label:'Plaza Garibaldi',cost:30},
  // Perú
  pe_machupicchu:{label:'Machu Picchu',cost:100}, pe_cusco:{label:'Catedral del Cusco',cost:70}, pe_terraces:{label:'Terrazas andinas',cost:50}, pe_titicaca:{label:'Lago Titicaca',cost:40}, pe_llamas:{label:'Granja de llamas',cost:30},
  // EE. UU.
  us_liberty:{label:'Estatua de la Libertad',cost:90}, us_empire:{label:'Empire State',cost:80}, us_goldengate:{label:'Golden Gate',cost:80}, us_capitol:{label:'Capitolio',cost:70}, us_diner:{label:'Diner',cost:30},
  // Qatar
  qa_towers:{label:'Torres de Doha',cost:90}, qa_mia:{label:'Museo de Arte Islámico',cost:80}, qa_souq:{label:'Souq Waqif',cost:40}, qa_dhow:{label:'Dhow',cost:40}, qa_stadium:{label:'Estadio Lusail',cost:70},
  // Emiratos
  ae_burjkhalifa:{label:'Burj Khalifa',cost:100}, ae_burjalarab:{label:'Burj Al Arab',cost:90}, ae_mosque:{label:'Mezquita Sheikh Zayed',cost:80}, ae_frame:{label:'Dubai Frame',cost:60}, ae_desert:{label:'Campamento del desierto',cost:30},
  // Egipto
  eg_pyramids:{label:'Pirámides de Giza',cost:100}, eg_sphinx:{label:'Esfinge',cost:80}, eg_karnak:{label:'Templo de Karnak',cost:70}, eg_felucca:{label:'Faluca del Nilo',cost:40}, eg_bazaar:{label:'Bazar Khan el-Khalili',cost:30},
  // Japón
  jp_fuji:{label:'Monte Fuji',cost:90}, jp_himeji:{label:'Castillo de Himeji',cost:80}, jp_pagoda:{label:'Pagoda',cost:60}, jp_torii:{label:'Torii',cost:40}, jp_sakura:{label:'Jardín de cerezos',cost:30},
  // China
  cn_greatwall:{label:'Gran Muralla',cost:100}, cn_forbidden:{label:'Ciudad Prohibida',cost:80}, cn_heaven:{label:'Templo del Cielo',cost:70}, cn_lanterns:{label:'Calle de faroles',cost:40}, cn_bamboo:{label:'Bosque de bambú',cost:30},
};

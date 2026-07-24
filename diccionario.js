//Diccionario organizado por categorias
//cada caregoria tiene una lista de palabras válidas en minusculas

const diccionario = {
    'Animales' : ["abeja", "abejaruco", "abejorro", "águila", "alacrán",
  "albatros", "alce",  "almeja", "alondra", "alpaca", "altramuz", "amoeba",
   "anaconda", "anchoa",  "ánade", "anguila", "antílope", "araña", "ardilla", 
   "arenque", "armadillo", "armiño", "arpía", "asno", "atún", "avefría", "avestruz",
    "avetoro", "avispa", "avoceta", 
  "babosa", "bacalao", "badajo", "baquiro", "ballena", "barracuda", 
  "barbo", "basilisco", "beluga", "berberecho", "berrendo", "besugo", "bisonte", 
  "blesbok", "boa", "bobo", "bongo", "bonobo", "boquerón", "boto", "boyero", 
  "brama", "búfalo", "búho", "buitre", "burro",
   "caballero", "caballito de mar", 
  "caballo", "cachalote", "cachama", "cacatúa", "caimán", "calamar", "calandria", 
  "camaleón", "camello", "camachuelo", "camarón", "cangrejo", "canguro", "capiatí", 
  "capibara", "caracal", "caracol", "carancho", "carpa", "casuario", "castor", 
  "cebra", "cebú", "cefalópodo", "centollo", "cenzontle", "cerdo", "cervatillo", 
  "ciervo", "cigarra", "cigüeña", "cisne", "civeta", "claca", "coatí", "cobaya", 
  "cobra", "cocherito", "cochino", "cocodrilo", "codorniz", "coipo", "colibrí", 
  "colmillejo", "comadreja", "cóndor", "conejo", "coral", "correcaminos", "corzo", 
  "cotorra", "coyote", "crispín", "cuco", "cuervo", "culebra", "curruca", "daguilla", 
  "dama", "danta", "degu", "delfín", "demonio de tasmania", "dentón", "desmán", 
  "dingo", "dinosaurio", "diablillo de polvo", "dik-dik", "dólar de mar", "doncella", 
  "dorado", "dromedario", "dril", "duclón", "dugongo", "efelante", "efémera", 
  "egagrópila", "eider", "elán", "elefante", "élene", "emú", "endrino", "enjambre", 
  "entelete", "epistilo", "erizo", "escarabajo", "escorpión", "escuerzo", "eslizón", 
  "esparavel", "espátula", "esponja de mar", "estornino", "estrecha", "esturión", 
  "faisán", "falangista", "fandango", "faneca", "fandango", "faraón", "farra", 
  "flamenco", "foca", "fone", "fragata", "frailecillo", "francolín", "friganea", 
  "fulmar", "furón", "gabán", "gacela", "galápago", "galbula", "galeón", "galgo", 
  "gallina", "gallipato", "gallo", "ganso", "garceta", "garza", "gato", "gavial", 
  "gavia", "gavilán", "gaviota", "geco", "gempilo", "geneta", "gerbo", "gibón", 
  "jirafa", "glotón", "gofio", "golondrina", "gorrión", "gorila", "grillo", "grulla", 
  "guanaco", "guacamayo", "guácharo", "guajolote", "gura", "gurami", "halcón", 
  "hamster", "harón", "helecho", "heloderma", "hemicordado", "hiena", "hipocampo", 
  "hipopótamo", "hoatzín", "holoturia", "hormiga", "huemul", "hurón", "íbice", 
  "ibis", "iguana", "impala", "indri", "inseparable", "insecto palo", "isópodo", 
  "jabali", "jabirú", "jacana", "jacamar", "jaguar", "jaguarundi", "jajá", "jaluco", 
  "jandaia", "jaras", "jargón", "jaspón", "jayan", "jeco", "jeringa de mar", 
  "jicotea", "jilguero", "jineta", "jirafa", "jote", "juanelo", "julia", "jurel", 
  "kakapo", "kea", "kagu", "kestrel", "kingió", "kinkajú", "kiwi", "koala", "kobo", 
  "kookaburra", "krait", "krill", "kudu", "labro", "lagartija", "lagarto", "lagópodo", 
  "langosta", "langostín", "larva", "lechuza", "leguado", "lémur", "lenguado", 
  "león", "leopardo", "lepisma", "lirón", "llama", "llanera", "lobo", "lobito de río", 
  "loco", "lirón", "loro", "lucerna", "lucifugo", "lucio", "lución", "luciérnaga", 
  "lura", "macaco", "macagua", "machuelo", "macarela", "madrepérola", "madrilla", 
  "maganto", "maimón", "majaz", "malasartes", "mallard", "mamba", "mofeta", 
  "mandril", "manatí", "mandril", "mangosta", "manta raya", "mantis", "mapache", 
  "marabú", "mariposa", "marabunta", "mariquita", "marrajo", "marta", "martinete", 
  "martín pescador", "marlo", "mascarello", "mastodonte", "mauremis", "mayate", 
  "medusa", "megalodón", "mejillón", "meloncillo", "mergánsar", "merluza", "mero", 
  "milano", "mirlo", "mirlo acuático", "mixino", "mofeta", "mojarra", "molo", "mono", 
  "monstruo de gila", "morsa", "mosca", "mosquito", "mucura", "mula", "murciélago", 
  "musaraña", "mutila", "naia", "nanacate", "nandú", "narval", "navaja", "nautilus", 
  "necora", "nécora", "necturo", "negrón", "nematodo", "nene", "neón", "nictibio", 
  "ninficus", "nocuela", "nóctulo", "nutria", "oca", "ocelote", "octópodo", "ofiura", 
  "ogcocefalo", "okapi", "olivo", "onza", "opilión", "orca", "oreja de mar", 
  "organillo", "oribi", "ornitorrinco", "oroval", "oropéndola", "ortoptero", 
  "oruga", "orice", "oso", "ostión", "ostrera", "otaria", "otocion", "oveja", "paca", 
  "pájaro carpintero", "palometa", "palomilla", "paloma", "pampa", "panda", 
  "pantera", "papagayo", "pápalo", "pardela", "parca", "pargo", "paspallo", "pato", 
  "pava", "pavón", "pavo real", "pelícano", "peluca", "pez espada", "pez globo", 
  "pez luna", "pingüino", "pinzón", "piojo", "piquero", "piraña", "pirolo", "pitón", 
  "pizote", "platija", "polilla", "pólipo", "puercoespín", "pulga", "pulpo", "puma", 
  "quebrantahuesos", "quelea", "quetzal", "quimera", "quiquiriquí", "quisquilla", 
  "quital", "rabilargo", "rabijunco", "rana", "rápano", "rascón", "rata", "ratón", 
  "raya", "rebeco", "rémora", "reno", "reyezuelo", "rinocerontes", "rorcual", 
  "ruiseñor", "sábalo", "sacre", "sagitario", "sahuaro", "saimirí", "salamandra", 
  "salmón", "saltamontes", "sanguijuela", "sapo", "sépia", "serreta", "serval", 
  "sifaka", "siluro", "sitatunga", "solenodonte", "somormujo", "sula", "suricata", 
  "tábano", "taimen", "tairá", "talapoin", "tántalo", "tapir", "tarántula", "tarro", 
  "tarsio", "tejón", "tenrec", "termita", "tiburón", "tigre", "tijereta", "tenca", 
  "tirano", "tití", "toro", "tórtola", "tortuga", "tricoplax", "tridacna", "tritón", 
  "trucha", "ualabi", "uapití", "urubú", "urogallo", "urraca", "vaca", "varamas", 
  "varano", "vencejo", "venado", "verdón", "viborera", "víbora", "vicuña", "vieira", 
  "visón", "viuda negra", "volatón", "walaró", "wombat", "xifóforo", "xoloitzcuintle", 
  "yacaré", "yaguarete", "yak", "yeco", "yegua", "zafiro", "zaglozo", "zampullín", 
  "zarapito", "zarigüeya", "zarapito", "zarcillero", "zorro", "zorzal", "zumaya"
],
'Paises': 
[
  "afganistán",
  "albania",
  "alemania",
  "andorra",
  "angola",
  "antigua y barbuda",
  "arabia saudita",
  "argelia",
  "argentina",
  "armenia",
  "australia",
  "austria",
  "azerbaiyán",
  "bahamas",
  "bangladés",
  "barbados",
  "baréin",
  "bélgica",
  "belice",
  "benín",
  "bielorrusia",
  "birmania",
  "bolivia",
  "bosnia y herzegovina",
  "botsuana",
  "brasil",
  "brunéi",
  "bulgaria",
  "burkina faso",
  "burundi",
  "bután",
  "cabo verde",
  "camboya",
  "camerún",
  "canadá",
  "catar",
  "chad",
  "chile",
  "china",
  "chipre",
  "ciudad del vaticano",
  "colombia",
  "comoras",
  "corea del norte",
  "corea del sur",
  "costa de marfil",
  "costa rica",
  "croacia",
  "cuba",
  "dinamarca",
  "dominica",
  "ecuador",
  "egipto",
  "el salvador",
  "emiratos árabes unidos",
  "eritrea",
  "eslovaquia",
  "eslovenia",
  "españa",
  "estados unidos",
  "estonia",
  "esuatini",
  "etiopía",
  "filipinas",
  "finlandia",
  "fiyi",
  "francia",
  "gabón",
  "gambia",
  "georgia",
  "ghana",
  "granada",
  "grecia",
  "guatemala",
  "guinea",
  "guinea ecuatorial",
  "guinea-bisáu",
  "guyana",
  "haití",
  "honduras",
  "hungría",
  "india",
  "indonesia",
  "irak",
  "irán",
  "irlanda",
  "islandia",
  "islas marshall",
  "islas salomón",
  "israel",
  "italia",
  "jamaica",
  "japón",
  "jordania",
  "kazajistán",
  "kenia",
  "kirguistán",
  "kiribati",
  "kuwait",
  "laos",
  "lesoto",
  "letonia",
  "líbano",
  "liberia",
  "libia",
  "liechtenstein",
  "lituania",
  "luxemburgo",
  "madagascar",
  "malasia",
  "malaui",
  "maldivas",
  "malí",
  "malta",
  "marruecos",
  "mauricio",
  "mauritania",
  "méxico",
  "micronesia",
  "moldavia",
  "mónaco",
  "mongolia",
  "montenegro",
  "mozambique",
  "namibia",
  "nauru",
  "nepal",
  "nicaragua",
  "níger",
  "nigeria",
  "noruega",
  "nueva zelanda",
  "omán",
  "países bajos",
  "pakistán",
  "palaos",
  "panamá",
  "papúa nueva guinea",
  "paraguay",
  "perú",
  "polonia",
  "portugal",
  "reino unido",
  "república centroafricana",
  "república checa",
  "república del congo",
  "república democrática del congo",
  "república dominicana",
  "ruanda",
  "rumania",
  "rusia",
  "samoa",
  "san cristóbal y nieves",
  "san marino",
  "san vicente y las granadinas",
  "santa lucía",
  "santo tomé y príncipe",
  "senegal",
  "serbia",
  "seychelles",
  "sierra leona",
  "singapur",
  "siria",
  "somalia",
  "sri lanka",
  "sudáfrica",
  "sudán",
  "sudán del sur",
  "suecia",
  "suiza",
  "surinam",
  "tailandia",
  "tanzania",
  "tayikistán",
  "timor oriental",
  "togo",
  "tonga",
  "trinidad y tobago",
  "túnez",
  "turkmenistán",
  "turquía",
  "tuvalu",
  "ucrania",
  "uganda",
  "uruguay",
  "uzbekistán",
  "vanuatu",
  "venezuela",
  "vietnam",
  "yemen",
  "yibuti",
  "zambia",
  "zimbabue"
],
 

  'Comidas': 
  [
  "Aceitunas", "Acelgas", "Achicoria", "Adobo", "Agua de horchata", "Aguacate", "Ajo", "Ajoarriero", "Ajoblanco", "Albañiles",
  "Albóndigas", "Alcachofas", "Alcaparras", "Alubias", "Almejas", "Almendras", "Alpajores", "Alpiste", "Amaretti", "Anchoas",
  "Anguilas", "Anís", "Antipasto", "Apio", "Arepas", "Arándanos", "Arroz", "Arroz con leche", "Arroz con pollo", "Arroz con gandules",
  "Arroz chaufa", "Arroz frito", "Arroz negro", "Asado", "Asado de tira", "Asadura", "Ate", "Atol", "Atole", "Atún",
  "Avellanas", "Avena", "Azafrán", "Azúcar", "Bacalao", "Bacon", "Bagel", "Baguette", "Baja tacos", "Baklava",
  "Balushahi", "Bami goreng", "Banana bread", "Banoffee pie", "Baos", "Barbacoa", "Barra de granolas", "Batar", "Batata", "Batido",
  "Bavette", "Bechamel", "Beef stroganoff", "Beignet", "Berenejena", "Berlinesas", "Berros", "Besugo", "Betabel", "Bife de chorizo",
  "Biscotti", "Bisquet", "Bitoque", "Bizcocho", "Bizcochuelo", "Blini", "Bloody mary", "Bocadillo", "Bochini", "Bofia",
  "Bola de arroz", "Boles de picolat", "Boliche", "Bolillo", "Boloñesa", "Bolsa de pastor", "Bombones", "Bondiola", "Boniato", "Borsch",
  "Botillo", "Bouillabaisse", "Bramboráky", "Brandy", "Bratwurst", "Brazo de gitano", "Breca", "Brecol", "Brezel", "Brioche",
  "Brócoli", "Brocheta", "Brownie", "Bruschetta", "Bubango", "Buche", "Budín", "Buñuelos", "Burrata", "Burrito",
  "Butifarra", "Caballa", "Cabeza de gato", "Cabrito", "Cacahuetes", "Cacao", "Cachopo", "Cachorretas", "Cachapa", "Café",
  "Cagarrache", "Calabacín", "Calabaza", "Calamares", "Calamares a la romana", "Calamares en su tinta", "Caldereta", "Caldo", "Caldo gallego", "Caldo tlalpeño",
  "Caldo xóchitl", "Caldo de bola", "Caldo de manguera", "Caldo de patas", "Caldo de piedra", "Calzone", "Callos", "Camarones", "Camote", "Canapés",
  "Canela", "Canelones", "Cangrejo", "Canónigos", "Capón", "Caprese", "Capuchino", "Caracoles", "Carambola", "Caramelo",
  "Carbonara", "Carbonada", "Cardo", "Carimañola", "Caritas", "Carmañola", "Carne al pastor", "Carne asada", "Carne de Ávila", "Carne de res",
  "Carne en su jugo", "Carne mechada", "Carne picada", "Carpaccio", "Carpa", "Carrillada", "Casabe", "Casado", "Castañas", "Caviar",
  "Cazuela", "Cazuela de mariscos", "Cebolla", "Cebollas cambray", "Cebollino", "Ceviche", "Chalupa", "Champiñones", "Chana masala", "Chapatis",
  "Chaporreado", "Charamusca", "Charqui", "Chasni", "Chateaubriand", "Chayote", "Cheesecake", "Chicharrón", "Chilaquiles", "Chiles en nogada",
  "Chiles rellenos", "Chili con carne", "Chimichanga", "Chimichurri", "Chintextle", "Chipa", "Chipirones", "Chirimoya", "Chistorra", "Chivito",
  "Chilaquiles", "Choco", "Chocolate", "Chongos zamoranos", "Choripán", "Chorizo", "Chorizo con papas", "Chorrillana", "Chotis", "Choucroute",
  "Choux", "Chow mein", "Churrasco", "Churros", "Chutney", "Ciervo", "Cigala", "Ciruelas", "Clafoutis", "Clavo de olor",
  "Cochinita pibil", "Cochinillo", "Cocido", "Cocido madrileño", "Cocido montañés", "Coco", "Cocoflán", "Codillo", "Codorniz", "Col",
  "Col de Bruselas", "Coliflor", "Compota", "Conejo", "Confit", "Conchas", "Congrí", "Consomé", "Coqueta", "Cordero",
  "Cordon bleu", "Corvina", "Couscous", "Crema", "Crema catalana", "Crema de calabaza", "Crema de elote", "Crepas", "Crêpe", "Croissant",
  "Croquetas", "Crutones", "Cuajada", "Ceviche", "Chicha", "Cuscús", "Dahl", "Dashi", "Datiles", "Dedos de queso",
  "Dim sum", "Donas", "Dorada", "Dorayaki", "Dumplings", "Durazno", "Eclair", "Edamame", "Ejotes", "Elote",
  "Emorroidas", "Empanada", "Empanada gallega", "Empanadas salteñas", "Empanadillas", "Enchiladas", "Enchiladas verdes", "Enchiladas rojas", "Enchiladas potosinas", "Endivias",
  "Ensalada", "Ensalada César", "Ensalada Waldorf", "Ensalada de pasta", "Ensalada rusa", "Ensaladilla", "Entrecot", "Entomatadas", "Enfrijoladas", "Espinacas",
  "Espárragos", "Espetos", "Espaguetis", "Espaguetis a la boloñesa", "Espaguetis a la carbonara", "Estofado", "Fabada", "Fajitas", "Falafel", "Fariña",
  "Farfalle", "Farinato", "Feijoada", "Fettuccine", "Fideuá", "Filete", "Filete mignon", "Flan", "Flautas", "Focaccia",
  "Fondue", "Frappé", "Fresas", "Fresas con crema", "Fricasé", "Frijoles", "Frijoles charros", "Frijoles refritos", "Frittata", "Frituras",
  "Frutos secos", "Fufu", "Fuet", "Funche", "Gachas", "Gado-gado", "Galantino", "Galletas", "Gallo pinto", "Gamba",
  "Gambas al ajillo", "Gansito", "Garbanzos", "Garapiñados", "Gashas", "Gaspacho", "Gazpacho", "Gelatina", "Ghee", "Gnocchi",
  "Gofre", "Gorditas", "Goulash", "Gram masala", "Granada", "Granola", "Gratinado", "Gringas", "Grisines", "Guacamole",
  "Guajolota", "Guanábana", "Guarapo", "Guatita", "Guayaba", "Guisantes", "Guiso", "Gulash", "Gyoza", "Haggis",
  "Hallaca", "Hamburguesa", "Hummus", "Harina", "Hash browns", "Helado", "Hígado", "Hinojo", "Hojaldre", "Hojaldras",
  "Hongos", "Horchata", "Hot dogs", "Hot cakes", "Huarache", "Huevas", "Huevos", "Huevos a la flamenca", "Huevos benedictinos", "Huevos divorciados",
  "Huevos rancheros", "Huevos rotos", "Humita", "Hummus", "Ijada", "Injera", "Jabalí", "Jamón", "Jamón ibérico", "Jamón serrano",
  "Jaiba", "Jalapeños", "Jalea", "Jambalaya", "Jamonada", "Jarrete", "Jengibre", "Jícama", "Jitomate", "Jocoque",
  "Jordán", "Jugos", "Kebab", "Kéfir", "Kimchi", "Kipes", "Kiwis", "Knödel", "Kofte", "Korma",
  "Kosheri", "Kuchen", "Kulfi", "Lacon", "Lacón con grelos", "Lasaña", "Langosta", "Langostinos", "Lasaña de carne", "Lasaña de verduras",
  "Leche", "Leche frita", "Lechuga", "Lechón", "Lentejas", "Liebre", "Lima", "Limón", "Linaza", "Lomo",
  "Lomo embuchado", "Lomo saltado", "Longaniza", "Lubina", "Lucuma", "Maca", "Macarrones", "Macarons", "Macha", "Machaca",
  "Maduritos", "Magdalenas", "Magret", "Maíz", "Majado", "Malanga", "Malvaviscos", "Mandarina", "Mandoca", "Mango",
  "Manitas de cerdo", "Mantecadas", "Mantecados", "Mantequilla", "Manzana", "Maracuyá", "Mariscada", "Mariscos", "Marlín", "Marmitako",
  "Marrón glacé", "Masala", "Matambre", "Mazamorra", "Mazapán", "Mejillones", "Melón", "Melocotón", "Memela", "Menestrón", "Menudo",
  "Merengue", "Merluza", "Mermelada", "Mero", "Mezcal", "Mica", "Migas", "Milanesa", "Milanesa a la napolitana", "Miso",
  "Mixiote", "Mochi", "Mofongo", "Moje", "Mojo picón", "Mole", "Mole poblano", "Mole verde", "Molletes", "Mondongo",
  "Montadito", "Morchilla", "Morcilla", "Moros y cristianos", "Morteruelo", "Moussaka", "Mousse", "Muesli", "Muffins", "Muelles",
  "Muñeta", "Nabo", "Nachos", "Naan", "Naranjas", "Nata", "Natillas", "Nectarina", "Nenúfar", "Níscalo",
  "Nori", "Noodles", "Nuez", "Nuez moscada", "Nuggets", "Oatmeal", "Olla podrida", "Okra", "Omelette", "Onigiri",
  "Oreja de cerdo", "Orégano", "Osobuco", "Ostras", "Ostiones", "Paella", "Paella valenciana", "Panceta", "Pan",
  "Pan de muerto", "Pan de ajo", "Pan dulce", "Panettone", "Panini", "Papas", "Papas a la francesa", "Papas arrugás", "Papitas", "Papaya",
  "Papadum", "Papadzules", "Pargo", "Parmesano", "Parillada", "Pasta", "Pastel", "Pastel de carne", "Pastel de chocolate", "Pastel de elote",
  "Pastel de tres leches", "Pastelito", "Pastes", "Pastrami", "Patatas", "Patatas bravas", "Pato", "Pato a la naranja", "Pato pekinés", "Pebre",
  "Pecanas", "Pechuga de pollo", "Pedos de monja", "Peladillas", "Pelmeni", "Pené", "Pepino", "Pepitorias", "Peras", "Percebes",
  "Peras al vino", "Pernil", "Perro caliente", "Pescadito", "Pescado", "Pescado frito", "Pesto", "Petisús", "Pibil", "Picaña",
  "Picadillo", "Picarones", "Pico de gallo", "Pisto", "Pisto manchego", "Pizca andina", "Pizza", "Plátano", "Plátano macho", "Polenta",
  "Pollo", "Pollo al curry", "Pollo frito", "Pollo rostizado", "Polvorones", "Pomelo", "Popcorn", "Popusa", "Porotos", "Porridge",
  "Porrusalda", "Postre", "Pozole", "Pozole rojo", "Pozole verde", "Pretzel", "Profiteroles", "Prosciutto", "Pudín", "Puchero",
  "Puente", "Puerco", "Puerro", "Pulpo", "Pulpo a la gallega", "Puré", "Puré de papas", "Quesadilla", "Quesadillas de flor de calabaza", "Queso",
  "Queso de bola", "Queso fresco", "Queso fundido", "Queso oaxaca", "Quiche", "Quiche lorraine", "Quinoa", "Quisquillas", "Rábano", "Rabo de toro",
  "Ramen", "Rape", "Rapini", "Ras el hanout", "Ratatouille", "Raviolis", "Rebojo", "Rebozado", "Redondo", "Regaliz",
  "Remolacha", "Repollo", "Requesón", "Ribeye", "Rigatoni", "Risotto", "Riñones", "Rociada", "Rollito de primavera", "Rollos de canela",
  "Romeritos", "Rompope", "Rondanillas", "Roscón de Reyes", "Rosquillas", "Roti", "Roulade", "Rúcula", "Ruibarbo", "Sabori",
  "Sabayón", "Sajta", "Salami", "Salchicha", "Salchichón", "Salmón", "Salmón ahumado", "Salmorejo", "Salpicón", "Salsa",
  "Salsa macha", "Salsa verde", "Salsa roja", "Salsifí", "Saltimbocca", "Samosa", "San Jacobo", "Sandía", "Sándwich", "Sancocho",
  "Sardinas", "Sarmale", "Sashimi", "Satay", "Saus", "Seco de pollo", "Seco de carne", "Seis", "Señorita", "Seitan",
  "Sepia", "Seta", "Seco", "Shabu-shabu", "Sashimi", "Shakshuka", "Siropes", "Soba", "Sobrasada", "Sopa",
  "Sopa azteca", "Sopa de ajo", "Sopa de cebolla", "Sopa de fideos", "Sopa de mariscos", "Sopa miso", "Sope", "Sorbete", "Soufflé", "Souvlaki",
  "Soyas", "Spaghetti", "Strudel", "Strudel de manzana", "Suadero", "Sushi", "Sukiyaki", "Sultanas", "Suprema", "Tabulé",
  "Taco", "Tacos al pastor", "Tacos de canasta", "Tacos de cochinita", "Tacos dorados", "Tagliatelle", "Tahini", "Tamal", "Tamales de elote", "Tandoori",
  "Tapioca", "Tapenade", "Taquitos", "Tarta", "Tarta de manzana", "Tarta de queso", "Tarta de santiago", "Tartaleta", "Tartar", "Tartar de atún",
  "Tatsutaage", "Tiramisú", "Tizana", "Tlacoyo", "Tlayuda", "Toffee", "Tofú", "Tomate", "Tomatillo", "Tonkatsu",
  "Torrejas", "Torrijas", "Tortas", "Tortas ahogadas", "Tortellini", "Tortilla", "Tortilla española", "Tortilla de patatas", "Tortilla de maíz", "Tostadas",
  "Tostadas de tinga", "Tostones", "Tournedos", "Trifle", "Trigo", "Trufa", "Trucha", "Turrón", "Tzatziki", "Udon",
  "Uvas", "Vaca", "Vainilla", "Vainitas", "Vaporcitos", "Vareniki", "Velouté", "Venado", "Ventresca", "Verdel",
  "Verduras", "Vichyssoise", "Vieiras", "Vinagre", "Vinagreta", "Volován", "Waffles", "Wonton", "Yakitori", "Yakisoba",
  "Yautía", "Yema", "Yis", "Yogur", "Yogur griego", "Yuca", "Zacahuil", "Zanahoria", "Zarajo", "Zarzamora"
],

  'Nombres': [
  "Aarón", "Abel", "Abigail", "Abril", "Adán", "Adela", "Adelaida", "Adolfo", "Adrián", "Adriana",
  "Agata", "Agustín", "Ainhoa", "Aitana", "Alan", "Alba", "Albert", "Alberto", "Aldo", "Alejandra",
  "Alejandro", "Alejo", "Alex", "Alexander", "Alexandra", "Alexis", "Alfonso", "Alfredo", "Alicia", "Alma",
  "Almudena", "Alonso", "Alba", "Amalia","alvaro", "Amanda", "Amadeo", "Amaro", "Amaya", "Amelia", "Amparo",
  "Ana", "Anabel", "Anaís", "Anastasia", "Ander", "Andra", "Andrés", "Andrea", "Andrés", "Ángel",
  "Ángela", "Ángeles", "Angélica", "Aníbal", "Ania", "Anita", "Anna", "Antelmo", "Antía", "Antonella",
  "Antoni", "Antonio", "Antonia", "Anuar", "Anya", "Apolinar", "Ariadna", "Ariadne", "Ariel", "Aristeo",
  "Arantxa", "Ares", "Arnaldo", "Arnol", "Arturo", "Asier", "Asunción", "Avelino", "Axel", "Azahara",
  "Azucena", "Baldomero", "Baltasar", "Bárbara", "Bartolomé", "Basilio", "Bautista", "Beatriz", "Begoña", "Belén",
  "Beltrán", "Benicio", "Benito", "Benjamín", "Berlinesas", "Bernabé", "Bernardo", "Berta", "Berto", "Blanca",
  "Blas", "Blasa", "Borja", "Brais", "Brenda", "Brian", "Brígida", "Bruna", "Bruno", "Bryan",
  "Buenaventura", "Caelo", "Caetana", "Caitlin", "Calixto", "Camilo", "Camila", "Candelaria", "Cándido", "Carina",
  "Carla", "Carlo", "Carlos", "Carlota", "Carmelo", "Carmen", "Carmina", "Carol", "Carolina", "Casandra",
  "Casimiro", "Catalina", "Cayetano", "Cayetana", "Cecilia", "Cecilio", "Celestino", "Celia", "Celina", "Celso",
  "César", "Chantal", "Charo", "Chema", "Christian", "Christine", "Christopher", "Cinthia", "Cipriano", "Ciriaco",
  "Cirilo", "Ciro", "Clara", "Clare", "Clarissa", "Claudia", "Claudio", "Clemente", "Cleopatra", "Clotilde",
  "Concepción", "Conchita", "Conrado", "Constanza", "Constantino", "Consuelo", "Coral", "Cordelia", "Cori", "Corina",
  "Cornelio", "Cosme", "Cristian", "Cristina", "Cristóbal", "Cruz", "Custodio", "Dafne", "Dagoberto", "Dalia",
  "Dalila", "Damián", "Dámaris", "Dan", "Dana", "Danae", "Daniel", "Daniela", "Danilo", "Dante",
  "Dardo", "Darío", "Daria", "David", "Davinia", "Débora", "Delia", "Delfín", "Delfina", "Demis",
  "Demian", "Demetrio", "Denis", "Denisse", "Denzel", "Desirée", "Diana", "Diego", "Dina", "Dionisio",
  "Dior", "Dolores", "Domingo", "Domitila", "Donato", "Dora", "Dorian", "Dorotea", "Doroteo", "Dulce",
  "Dylan", "Eberardo", "Édgar", "Edgardo", "Edith", "Edgardo", "Edmundo", "Eduardo", "Eduarda", "Eduvigis",
  "Efraín", "Efrén", "Elena", "Eleazar", "Eleonor", "Elías", "Eliana", "Elio", "Elisa", "Elisabet",
  "Elizabet", "Eloísa", "Eloy", "Elsa", "Elvira", "Ema", "Emanuel", "Emilia", "Emiliano", "Emilio",
  "Emma", "Emmanuel", "Encarnación", "Eneko", "Enrique", "Enriqueta", "Enzo", "Epifanio", "Eric", "Erick",
  "Erika", "Ermelinda", "Ernesto", "Esmeralda", "Esperanza", "Esteban", "Estefanía", "Estela", "Ester", "Esther",
  "Estrella", "Etan", "Eufemia", "Eugenio", "Eugenia", "Eulalia", "Eusebio", "Eustaquio", "Eva", "Evangelina",
  "Evelyn", "Evaristo", "Ezequiel", "Ezio", "Fabian", "Fabiana", "Fabio", "Fabiola", "Facundo", "Fátima",
  "Faustino", "Fausto", "Federico", "Federica", "Feliciano", "Felipe", "Felipa", "Félix", "Fermín", "Fernando",
  "Fernanda", "Fidel", "Filiberto", "Filomena", "Fiona", "Flavia", "Flavio", "Flora", "Florencia", "Florencio",
  "Florentino", "Florián", "Fortunato", "Francesc", "Francisca", "Francisco", "Franco", "Frida", "Fulgencio", "Gabriel",
  "Gabriela", "Gael", "Gaetana", "Gala", "Galileo", "Galdino", "Gaspar", "Gastón", "Gema", "Genaro",
  "Genoveva", "Gerardo", "Germán", "Gertrudis", "Gervasio", "Giacomo", "Gianluca", "Gianna", "Gibrán", "Gilberto",
  "Gilda", "Gina", "Gisela", "Gisselle", "Gladys", "Gloria", "Godofredo", "Gonzalo", "Gracia", "Graciela",
  "Gregorio", "Griselda", "Guadalupe", "Gualberto", "Guido", "Guillermo", "Guillermina", "Gustavo", "Guzmán", "Hada",
  "Hassan", "Héctor", "Hedwiges", "Heidi", "Helena", "Heliodoro", "Helga", "Henar", "Hendrick", "Henri",
  "Heriberto", "Hermenegildo", "Herminia", "Hernán", "Hernando", "Hilario", "Hilda", "Hipólito", "Homero", "Honorato",
  "Horacio", "Hortensia", "Huberto", "Hugo", "Humberto", "Ian", "Iago", "Ibrahim", "Iker", "Ildefonso",
  "Iliana", "Ilse", "Imanol", "Inés", "Inma", "Inmaculada", "Iñaki", "Iñigo", "Iolanda", "Irene",
  "Ireneo", "Iris", "Irma", "Irving", "Isaías", "Isaac", "Isabel", "Isabela", "Isadora", "Isidro",
  "Isidoro", "Ismael", "Israel", "Itzan", "Itziar", "Iván", "Ivana", "Ivet", "Ivón", "Jacinto",
  "Jacobo", "Jacqueline", "Jade", "Jaime", "Jairo", "Jamil", "Jan", "Jana", "Janeth", "Jared",
  "Jasón", "Javier", "Javiera", "Jayden", "Jean", "Jefferson", "Jennifer", "Jeremías", "Jerónimo", "Jesús",
  "Jesusa", "Jhony", "Joan", "Joana", "Joaquín", "Joaquina", "Joel", "Johan", "Johanna", "John",
  "Jon", "Jonás", "Jonathan", "Jordi", "Jorge", "Jorgelina", "José", "Josefa", "Josefina", "Josué",
  "Jovita", "Juan", "Juana", "Juanita", "Judith", "Julia", "Julián", "Juliana", "Julio", "Julio César",
  "Justino", "Justo", "Juvenal", "Kaleb", "Karen", "Karim", "Karina", "Karla", "Katia", "Kevin",
  "Kiko", "Kilian", "Kimberly", "Kurt", "Ladislau", "Laila", "Lamberto", "Lara", "Larissa", "Laura",
  "Laureano", "Lautaro", "Lázaro", "Leandro", "Leandro", "Leda", "Leila", "Leo", "Leocadio", "Leoldo",
  "León", "Leonardo", "Leonor", "Leonora", "Leopoldo", "Leticia", "Leyre", "Lía", "Liam", "Diana",
  "Liberato", "Libertad", "Lidia", "Ligia", "Lilia", "Liliana", "Lina", "Linda", "Linus", "Lionel",
  "Lisa", "Lisandro", "Livio", "Lola", "Lorena", "Lorenzo", "Loreto", "Lourdes", "Lucas", "Lucía",
  "Luciana", "Luciano", "Lucio", "Lucrecia", "Luis", "Luisa", "Luján", "Luz", "Macarena", "Macario",
  "Maddox", "Madeline", "Mafalda", "Magdalena", "Magnolia", "Mahoma", "Maia", "Maitane", "Malena", "Malik",
  "Malva", "Manel", "Manuel", "Manuela", "Manuelita", "Marc", "Marcelo", "Marcela", "Marcelino", "Marcial",
  "Marco", "Marcos", "Margarita", "María", "Mariam", "Mariano", "Maribel", "Marina", "Marino", "Mario",
  "Marisa", "Marisol", "Marlene", "Marta", "Martín", "Martina", "Martiño", "Mateo", "Matías", "Matilde",
  "Maura", "Mauricio", "Mauro", "Max", "Maximilian", "Maximiliano", "Máximo", "Maya", "Mayra", "Melania",
  "Melisa", "Melchor", "Mercedes", "Mía", "Micaela", "Michel", "Miguel", "Miguela", "Miguel Ángel", "Milagros",
  "Milán", "Milena", "Milo", "Milton", "Minerva", "Miranda", "Mireia", "Miriam", "Mirko", "Misael",
  "Moira", "Moisés", "Mónica", "Montserrat", "Moisés", "Nadia", "Nadin", "Nahuel", "Naiara", "Nala",
  "Nancy", "Naomi", "Narciso", "Natalia", "Natalio", "Natanael", "Natividad", "Nayla", "Nazaret", "Nerea",
  "Nery", "Néstor", "Nicanor", "Nicasio", "Nicolás", "Nicolasa", "Nicole", "Nidia", "Nieves", "Nilo",
  "Nina", "Ninfa", "Noah", "Noé", "Noel", "Noelia", "Noemí", "Nora", "Norberto", "Nuria",
  "Octavio", "Octavia", "Odalys", "Odemaris", "Odorico", "Ofelia", "Ogden", "Olaf", "Olga", "Olimpia",
  "Oliver", "Olivia", "Omar", "Onofre", "Orestes", "Oriol", "Orlando", "Oscar", "Oswaldo", "Otilio",
  "Otilia", "Otto", "Oviedo", "Pablo", "Pachita", "Pacífico", "Paco", "Paloma", "Pánfilo", "Paola",
  "Paolo", "Pascual", "Patricia", "Patricio", "Paula", "Paulina", "Paulino", "Pedro", "Peggy", "Pelayo",
  "Penélope", "Pepe", "Perla", "Petronila", "Pía", "Piedad", "Pier", "Pierre", "Pilar", "Pío",
  "Plácido", "Platón", "Policarpo", "Polina", "Pompeyo", "Porfirio", "Primitivo", "Priscila", "Prudencio", "Pura",
  "Rafael", "Rafaela", "Raimundo", "Ramiro", "Ramón", "Ramona", "Raquel", "Raúl", "Raymundo", "Rebecca",
  "Regina", "Reginaldo", "Reinaldo", "Remedios", "Remigio", "Renato", "René", "Renée", "Reynaldo", "Ricardo",
  "Ricarda", "Richard", "Rigoberto", "Rinaldo", "Rita", "Roberto", "Roberta", "Rocío", "Rodolfo", "Rodrigo",
  "Rogelio", "Roger", "Rolando", "Román", "Romana", "Romualdo", "Rómulo", "Roque", "Rosa", "Rosalía",
  "Rosalinda", "Rosario", "Rosaura", "Rosendo", "Rosina", "Roxana", "Rubén", "Rufino", "Ruperto", "Ruth",
  "Sabina", "Sabino", "Sabrina", "Sacha", "Sadoc", "Salas", "Salomón", "Salomé", "Salvador", "Salustio",
  "Samanta", "Samantha", "Samuel", "Sancho", "Sandra", "Sandro", "Santiago", "Santino", "Santos", "Sara",
  "Saray", "Saturnino", "Saúl", "Saverio", "Sebastián", "Secundino", "Serafín", "Serafina", "Serena", "Sergio",
  "Servando", "Severino", "Severo", "Shaila", "Sheila", "Shirley", "Sibila", "Sidney", "Sienna", "Sigfrido",
  "Silvana", "Silvano", "Silverio", "Silvestre", "Silvia", "Silvio", "Simón", "Simona", "Sira", "Siro",
  "Sixto", "Socorro", "Sofía", "Sol", "Soledad", "Sonia", "Soraya", "Stefano", "Stella", "Suany",
  "Susana", "Svetlana", "Tabita", "Tadeo", "Talia", "Tamara", "Tania", "Tarcisio", "Tarsila", "Tatiana",
  "Telmo", "Teo", "Teobaldo", "Teodoro", "Teodora", "Teodosio", "Teófilo", "Teresa", "Teresita", "Thais",
  "Thiago", "Thomas", "Tiago", "Tiberio", "Tiburcio", "Timoteo", "Tirso", "Tito", "Tobías", "Tomás",
  "Tomasa", "Toribio", "Trinidad", "Tristán", "Ubaldo", "Ulpiano", "Ulises", "Ulpia", "Uma", "Urbano",
  "Urko", "Uriel", "Úrsula", "Uxia", "Valentin", "Valentina", "Valeria", "Valerio", "Valero", "Vanesa",
  "Vania", "Vasco", "Vega", "Venancio", "Ventura", "Vera", "Veronila", "Verónica", "Vicente", "Vicenta",
  "Víctor", "Victoria", "Victoriano", "Victorino", "Vidal", "Viggo", "Vilma", "Vinicio", "Violeta", "Virgilio",
  "Virginia", "Viriato", "Vito", "Vitoria", "Viviana", "Viviano", "Vladimiro", "Wenceslao", "Wilfredo", "William",
  "Wilson", "Xabier", "Xavi", "Xavier", "Xenia", "Ximena", "Xiomara", "Yadira", "Yael", "Yago",
  "Yahir", "Yamil", "Yamila", "Yisela", "Yolanda", "Yonatan", "Yuri", "Yusef", "Zacarías", "Zafiro",
  "Zahira", "Zaira", "Zaratustra", "Zayn", "Zelma", "Zenaida", "Zenón", "Zoe", "Zoilo", "Zulema"
],

  'Ciudades': [
  // A
  "A Coruña", "Aachen", "Aalborg", "Aarhus", "Abidján", "Abilene", "Abu Dabi", "Abuya", "Acapulco", "Accra", "Adana", "Adelaida", "Adén", "Adís Abeba", "Agadir", "Agra", "Aguascalientes", "Ahmedabad", "Aix-en-Provence", "Ajaccio",
  // B
  "Badajoz", "Badalona", "Bagdad", "Bahía Blanca", "Bahréin", "Bakú", "Baltimore", "Bamako", "Bandung", "Bangalore", "Bangkok", "Bangui", "Banjul", "Barquisimeto", "Barcelona", "Bari", "Bariloche", "Barranquilla", "Basilea", "Berna",
  // C
  "Cáceres", "Cádiz", "Caen", "Cagliari", "Cairns", "El Cairo", "Cajamarca", "Calcuta", "Calgary", "Cali", "Callao", "Camagüey", "Cambridge", "Campeche", "Campinas", "Canberra", "Cancún", "Cannes", "Cantón", "Caracas",
  // D
  "Dakar", "Dalian", "Dallas", "Damasco", "Dammam", "Danzig", "Dar es Salaam", "Darwin", "Davao", "Davenport", "Dayton", "Debrecen", "Delft", "Delhi", "Denpasar", "Denver", "Derby", "Derry", "Des Moines", "Detroit",
  // E
  "Eilat", "Eindhoven", "El Paso", "Elche", "Eldoret", "Elbląg", "Elgin", "Elizabeth", "Elizabethtown", "Elko", "Elmira", "Elmhurst", "Elsinore", "Ely", "Emden", "Enschede", "Entebbe", "Ensenada", "Erbil", "Erfurt",
  // F
  "Faisalabad", "Fargo", "Faro", "Faridabad", "Fasano", "Fatick", "Fátima", "Fayetteville", "Feira de Santana", "Fez", "Flagstaff", "Flensburgo", "Flint", "Florencia", "Florianópolis", "Fontainebleau", "Formosa", "Fortaleza", "Freetown", "Friburgo",
  // G
  "Gaborone", "Gabés", "Gaeta", "Gafsa", "Gainesville", "Galapagos", "Galway", "Gdańsk", "Gdynia", "Geelong", "Gelsenkirchen", "Ginebra", "Génova", "Georgetown", "Gerona", "Getafe", "Gaza", "Gaziantep", "Gante", "Gijón",
  // H
  "Haarlem", "Hachinohe", "Hackensack", "Hadera", "Hafnarfjörður", "Hagen", "Hagerstown", "Haifa", "Haikou", "Hail", "Haiphong", "Hakodate", "Halden", "Halifax", "Halle", "Halmstad", "Hama", "Hamadan", "Hamamatsu", "Hamburgo",
  // I
  "Ibadán", "Ibagué", "Ibarra", "Ica", "Idaho Falls", "Ife", "Iguazú", "Ijebu Ode", "Ilesa", "Ilhéus", "Ilió", "Ilorin", "Imola", "Imperia", "Imphal", "Incheon", "Indiana", "Indianápolis", "Indore", "Ingolstadt",
  // J
  "Jabalpur", "Jackson", "Jacksonville", "Jaén", "Jaffa", "Jaipur", "Jajpur", "Jakarta", "Jalapa", "Jalandhar", "Jalgaon", "Jammu", "Jamnagar", "Jamshedpur", "Jandiala", "Janín", "Janzour", "Jarkov", "Jatibonico", "Jeddah",
  // K
  "Kabul", "Kaduna", "Kagoshima", "Kahramanmaraş", "Kaifeng", "Kailua", "Kairouan", "Kayseri", "Kakinada", "Kalamata", "Kalamazoo", "Kaliningrado", "Kalmar", "Kampala", "Kanazawa", "Kandahar", "Kano", "Kansas City", "Kaohsiung", "Karachi",
  // L
  "La Habana", "La Paz", "La Plata", "La Serena", "Lagos", "Lahore", "Lancaster", "Lanzhou", "Laredo", "Larissa", "Las Cruces", "Las Palmas", "Las Vegas", "Latakia", "Lausana", "Laval", "Leeds", "Leganés", "Leipzig", "León",
  // M
  "Macao", "Maceió", "Machala", "Macon", "Macuto", "Madang", "Medellín", "Madurai", "Madre de Dios", "Madrid", "Madruga", "Maebashi", "Mafra", "Magangué", "Magdeburgo", "Magnitogorsk", "Mago", "Mahad", "Mahajanga", "Mahuva",
  // N
  "Nablus", "Nadi", "Nador", "Naga", "Nagano", "Nagaoka", "Nagasaki", "Nagoya", "Nagpur", "Naha", "Nairobi", "Najaf", "Nakhon", "Nalchik", "Namur", "Nancy", "Nanchang", "Nanchong", "Nankín", "Nanning",
  // Ñ
  "Ñacunday", "Ñaguarazú", "Ñandejára", "Ñandutí", "Ñatiú", "Ñemby", "Ñuñoa", "Ñu Porá", "Ñumí", "Ñu Guazú",
  // O
  "Oaxaca", "Obihiro", "Obando", "Obregón", "Ocaña", "Oceanside", "Odense", "Odesa", "Offenbach", "Ogden", "Oita", "Okayama", "Okazaki", "Oklahoma City", "Olavarría", "Oldemburgo", "Olmütz", "Olten", "Olympia", "Omaha",
  // P
  "Pachuca", "Padang", "Padua", "Paducah", "Pago Pago", "Paita", "Pakse", "Palamos", "Palanka", "Palembang", "Palencia", "Palermo", "Palm Bay", "Palm Beach", "Palm Springs", "Palma de Mallorca", "Palmar", "Palmira", "Palo Alto", "Pamplona",
  // Q
  "Qianjiang", "Qidong", "Qingdao", "Qingyuan", "Qinhuangdao", "Qinzhou", "Qiqihar", "Qom", "Quanzhou", "Quebec", "Queenstown", "Quelimane", "Quemado", "Queniquea", "Querceta", "Querétaro", "Quetta", "Quevedo", "Quibdó", "Quilmes", "Quimper", "Quincy", "Quintana Roo", "Quisqueya", "Quito", "Qum",
  // R
  "Rabat", "Rabaul", "Racine", "Radom", "Raha", "Rahway", "Rai Bareli", "Raipur", "Rajahmundry", "Rajkot", "Raleigh", "Ramadi", "Ramallah", "Rávena", "Reading", "Recife", "Reggio Calabria", "Regina", "Reims", "Reno","Roma",
  // S
  "Sabadell", "Sacramento", "Safi", "Saginaw", "Sagunto", "Sahagún", "Saida", "Saigón", "Saint-Denis", "Saint-Étienne", "Saint-Louis", "Saitama", "Sakai", "Salala", "Salamanca", "Salé", "Salem", "Salerno", "Salina", "Salinas",
  // T
  "Tabasco", "Tabira", "Tabiz", "Tablada", "Tábor", "Tabuk", "Tacna", "Tacoma", "Tacuarembó", "Tadami", "Tadepalligudem", "Taegu", "Taejon", "Taen", "Tafí Viejo", "Taganrog", "Tagbilaran", "Taguig", "Tahlequah", "Tahoka",
  // U
  "Ubatuba", "Ubé", "Ubeda", "Uberaba", "Uberlândia", "Uca", "Ucayali", "Udaipur", "Udine", "Uelzen", "Ufa", "Ugljan", "Uharte", "Uijeongbu", "Uisin", "Uitenhage", "Uithoorn", "Ujiji", "Ujjain", "Ujo", "Ukiah", "Ula", "Ulan Bator", "Ulan-Ude", "Uleila", "Ullapool", "Ullum", "Ulm", "Ulricehamn", "Ulsa", "Ulsan", "Ulverston", "Ulysses", "Uman", "Umán", "Umana", "Umarga", "Umaria", "Umbergaon", "Umeå", "Umm Al Quwain", "Umm Said", "Umred", "Una", "Unaí", "Unanderra", "Uncía", "Undurraga", "Unión", "Unley", "Unterhaching", "Unyamwezi", "Upadhyay", "Upanema", "Upata", "Upice", "Upland", "Uporovo", "Epsala", "Uppsala", "Ura", "Urach", "Uracoa", "Uruaçu", "Uruapan", "Urubamba", "Uruguaiana", "Urumqi", "Urus-Martan", "Ushuaia", "Uskudar", "Utah", "Utica", "Utopía", "Utrecht", "Utrera", "Utsunomiya", "Uvalde", "Uxbridge", "Uyo", "Uzbekistán", "Uzhhorod", "Uzhu",
  // V
  "Vadodara", "Valdivia", "Valencia", "Valladolid", "Valparaíso", "Vancouver", "Varanasi", "Varna", "Vaticano", "Venezia", "Venecia", "Veracruz", "Verona", "Versalles", "Vicosa", "Victoria", "Viedma", "Viena", "Vientiane", "Vigo",
  // W
  "Waco", "Wagga Wagga", "Waikiki", "Wajir", "Wakayama", "Wakefield", "Wallasey", "Walla Walla", "Walsall", "Waltham", "Walvis Bay", "Wanxian", "Warangal", "Warnambool", "Warrington", "Varsovia", "Warwick", "Washington", "Waterbury", "Waterford", "Waterloo", "Watsonville", "Watsa", "Waukegan", "Waukesha", "Wausau", "Wauwatosa", "Waveland", "Waverley", "Weert", "Weifang", "Weimar", "Weinheim", "Weiteveen", "Welkom", "Wellington", "Wels", "Wenatchee", "Wenzhou", "Werl", "Wermelskirchen", "Wernigerode", "Wertheim", "Wesel", "West Allis", "West Bromwich", "West Covina", "West Haven", "West Jordan", "West Palm Beach",
  // X
  "Xalapa", "Xam Nua", "Xiamen", "Xi'an", "Xiangtan", "Xiangyang", "Xianyang", "Xiaogan", "Xichang", "Xilin Hot", "Xiloxoxtla", "Xining", "Xinxiang", "Xinyang", "Xinyu", "Xique-Xique", "Xirivella", "Xonacatlán", "Xures", "Xuzhou",
  // Y
  "Yablunlo", "Yabucoa", "Yacuiba", "Yading", "Yadgir", "Yaiza", "Yakima", "Yakutsk", "Yala", "Yalova", "Yalta", "Yamagata", "Yamaguchi", "Yamoussoukro", "Yampier", "Yanam", "Yanbu", "Yancheng", "Yangon", "Yangzhou", "Yantai", "Yanzhou", "Yaoundé", "Yapacaní", "Yaritagua", "Yarmouth", "Yaroslavl", "Yarumal", "Yasuj", "Yatytay", "Yauco", "Yaundé", "Yavari", "Yavatmal", "Yavir", "Yavoriv", "Ybycuí", "Ybyrarobaná", "Yebach", "Yeda", "Yeding", "Yekaterimburgo", "Yellandu", "Yellowknife", "Yemen", "Yenagoa", "Yendi", "Yeniseysk", "Yeola", "Yeongcheon", "Yeongju", "Yeosu", "Yepes", "Yerevan", "Yerington", "Yeruham", "Yeste", "Yeu", "Yevpatoria", "Yeyla", "Yezd", "Yichang", "Yinchuan", "Yining", "Yiwu", "Yizheng", "Yoakum", "Yobe", "Yokkaichi", "Yokohama", "Yokosuka", "Yonago", "Yongin", "Yonkers", "Yopal", "Yorba Linda", "York", "Yorktown", "Yoro", "Yorubaland", "Yoshkar-Ola", "Yosano", "Yotoco", "Youdi", "Youngstown", "Ypacaraí", "Ypané", "Ypsilanti", "Yreka", "Yshir", "Ystad", "Yuba", "Yuba City", "Yucal", "Yucatán", "Yucumo", "Yueyang", "Yugra", "Yujiang", "Yulin", "Yuma", "Yumbe", "Yumbo", "Yuncler", "Yungay", "Yunguyo", "Yunnan", "Yupi", "Yurimaguas", "Yuriria", "Yurt", "Yuscarán", "Yushu", "Yusif", "Yusuf", "Yuty", "Yuzhou", "Yuzhno-Sakhalinsk",
  // Z
  "Zaandam", "Zabrze", "Zacatecas", "Zacapa", "Zadar", "Zafra", "Zagazig", "Zagreb", "Zahle", "Zainsk", "Zajecar", "Zákynthos", "Zalamea", "Zalau", "Zambanga", "Zamora", "Zanesville", "Zanzíbar", "Zaozhuang", "Zapopan", "Zaporiyia", "Zapotiltic", "Zapotlanejo", "Zaragoza", "Zárate", "Zaria", "Zaruma", "Zary", "Zaslavl", "Zavalla", "Zaventem", "Zavidovici", "Zawiercie", "Zeebrugge", "Zeist", "Zele", "Zelaya", "Zelenograd", "Zelle", "Zelzate", "Zempoala", "Zenica", "Zentsuji", "Zeralda", "Zermatt", "Zevenaar", "Zgierz", "Zgora", "Zhalantun", "Zhanjiang", "Zhaoqing", "Zhaotong", "Zhengzhou", "Zhenjiang", "Zhifang", "Zhitomir", "Zhlobin", "Zhmerynka", "Zhoushan", "Zhuhai", "Zhumadian", "Zhuzhou", "Zidani", "Ziegelbrücke", "Zielona Góra", "Zierikzee", "Ziguinchor", "Zilina", "Zimapan", "Zinder", "Zingonia", "Ziniare", "Zion", "Zionsville", "Zipaquirá", "Zitácuaro", "Zittau", "Zizur", "Zlatibor", "Zlín", "Zloczow", "Zomba", "Zombor", "Zonguldak", "Zonhoven", "Zons", "Zoetermeer", "Zorritos", "Zorita", "Zossen", "Zouerate", "Zoutleeuw", "Zrenjanin", "Zubia", "Zuetina", "Zug", "Zuiderzee", "Zuidhorn", "Zuila", "Zulia", "Zullwil", "Zulte", "Zumbahua", "Zumpango", "Zunil", "Zunyi", "Zúrich", "Zutphen", "Zvenigorod", "Zverevo", "Zwickau", "Zwijndrecht", "Zwolle", "Zyrianovsk", "Żyrardów", "Żywiec",
  // Ciudades españolas que faltan
"Alicante",
"Albacete",
"Alcobendas",
"Alcorcón",
"Algeciras",
"Almería",
"Andújar",
"Antequera",
"Aranjuez",
"Arrecife",
"Ávila",
"Avilés",
"Barakaldo",
"Benalmádena",
"Benidorm",
"Bilbao",
"Burgos",
"Cartagena",
"Castellón de la Plana",
"Ceuta",
"Ciudad Real",
"Córdoba",
"Cuenca",
"Donostia",
"Dos Hermanas",
"Eibar",
"Ferrol",
"Fuengirola",
"Gandía",
"Gijón",
"Girona",
"Granada",
"Granollers",
"Guadalajara",
"Hospitalet de Llobregat",
"Huelva",
"Huesca",
"Ibiza",
"Irun",
"Jerez de la Frontera",
"La Línea de la Concepción",
"Las Palmas de Gran Canaria",
"León",
"Linares",
"Lleida",
"Logroño",
"Lorca",
"Lugo",
"Majadahonda",
"Marbella",
"Mataró",
"Mérida",
"Móstoles",
"Murcia",
"Orense",
"Ourense",
"Orihuela",
"Palencia",
"Palma",
"Palma de Mallorca",
"Ponferrada",
"Pontevedra",
"Puerto de la Cruz",
"Reus",
"Rivas-Vaciamadrid",
"Roquetas de Mar",
"San Cristóbal de La Laguna",
"San Fernando",
"San Sebastián",
"San Sebastián de los Reyes",
"Sanlúcar de Barrameda",
"Sant Boi de Llobregat",
"Santa Coloma de Gramenet",
"Santa Cruz de Tenerife",
"Santander",
"Santiago de Compostela",
"Segovia",
"Sitges",
"Soria",
"Talavera de la Reina",
"Tarragona",
"Telde",
"Terrassa",
"Teruel",
"Toledo",
"Torrejón de Ardoz",
"Torrelavega",
"Torremolinos",
"Tortosa",
"Utrera",
"Valdemoro",
"Vall d'Uixó",
"Vic",
"Vigo",
"Viladecans",
"Vilanova i la Geltrú",
"Vitoria",
"Vitoria-Gasteiz",
"Zamora",
"Zaragoza"
],

  'Frutas': [
  // A
  "Arándano", "Açai", "Aguacate", "Albaricoque", "Alquejenje", "Ananá", "Anón", "Acerola", "Arazá", "Almendra verde",
  // B
  "Banana", "Badea", "Breva", "Borojó", "Bilberry", "Blackberry", "Boysenberry", "Babaçú",
  // C
  "Cereza", "Ciruela", "Coco", "Chirimoya", "Clementina", "Carambola", "Cassis", "Caihua", "Capulí", "Castaña",
  // D
  "Dátil", "Durazno", "Durión", "Damasco", "Damisela",
  // E
  "Endrina", "Enebro", "Escaramujo", "Elderberry", "Etrog",
  // F
  "Fresa", "Frambuesa", "Fruta de la pasión", "Fruta del dragón", "Frambuesa negra", "Feijoa",
  // G
  "Granada", "Guanábana", "Grosella", "Grosella negra", "Grosella espinosa", "Guayaba", "Goji", "Garcinia",
  // H
  "Higo", "Higo chumbo", "Huckleberry", "Huaya", "Huanarpo",
  // I
  "Icaque", "Ilama", "Imbé", "Ingá", "Indian Prune",
  // J
  "Jaaca", "Jitomate", "Jobo", "Jujube", "Jatobá", "Jabuticaba",
  // K
  "Kiwi", "Kiwano", "Kumquat", "Kaffir Lime", "Kapoho",
  // L
  "Limón", "Lima", "Lichi", "Lúcuma", "Longan", "Lulo", "Loganberry", "Langsat",
  // M
  "Mango", "Manzana", "Mandarina", "Melón", "Melocotón", "Mora", "Mamón", "Maracuyá", "Mangostán", "Mamey",
  // N
  "Naranja", "Nectarina", "Níspero", "Noni", "Nuez de lavapiés", "Nance",
  // Ñ
  "Ñame fruto", "Ñangapirí",
  // O
  "Oliva", "Ococh", "Olluco", "Orangequat",
  // P
  "Plátano", "Piña", "Pera", "Papaya", "Pomelo", "Paraguaya", "Persimón", "Pitahaya", "Pistacho", "Pamarrosa",
  // Q
  "Quenepa", "Quince", "Quisquilla", "Quandong",
  // R
  "Rambután", "Rábano fruto", "Redcurrant", "Ribarba", "Roseapple",
  // S
  "Sandía", "Saúco", "Saramuyo", "Santiaguina", "Sapotilla", "Sarsaparilla",
  // T
  "Tamarindo", "Tomate de árbol", "Tangerina", "Toronja", "Tuna", "Tayberry", "Tupiro",
  // U
  "Uva", "Uva espina", "Uchuva", "Uvalha", "Uari",
  // V
  "Vainilla", "Victoria plum", "Velvet tamarind", "Voavanga",
  // W
  "Watermelon", "Wolfberry", "White currant", "Wampee",
  // X
  "Xoconostle", "Xanthium", "Xylocarpus",
  // Y
  "Yuzu", "Yaca", "Yayito", "Yamamomo", "Yambolana",
  // Z
  "Zarzamora", "Zapote", "Zamboa", "Zucchini", "Ziziphus"
 ],

  'Deportes': [
  // A
  "Ajedrez", "Atletismo", "Automovilismo", "Arquería", "Aeromodelismo", "Aikido", "Apnea", "Aguas abiertas",
  // B
  "Baloncesto", "Balonmano", "Béisbol", "Billar", "Boxeo", "Badminton", "Bmx", "Bolos", "Biatlón",
  // C
  "Ciclismo", "Críquet", "Curling", "Canotaje", "Caza deportiva", "Crossfit", "Culturismo", "Capoeira",
  // D
  "Dardos", "Decatlón", "Doma clásica", "Downhill", "Dominó", "Dodgeball",
  // E
  "Esgrima", "Esquí", "Escalada", "Equitación", "Esgrima histórica", "Esquí acuático", "Enduro",
  // F
  "Fútbol", "Fútbol sala", "Fútbol americano", "Fisicoculturismo", "Floorball", "Frisbee", "Fútbol playa",
  // G
  "Gimnasia artística", "Gimnasia rítmica", "Golf", "Goalball", "Grappling",
  // H
  "Halterofilia", "Hockey sobre césped", "Hockey sobre hielo", "Hípica", "Handball", "Hapkido",
  // I
  "Indoor soccer", "Iaidó", "In-line hockey",
  // J
  "Judo", "Jiu-jitsu", "Jabalina", "Judo paralímpico",
  // K
  "Kárate", "Kickboxing", "Karting", "Kitesurf", "Kendo", "Kettlebell", "Korfbal",
  // L
  "Lucha libre", "Lucha grecorromana", "Levantamiento de potencia", "Lacrosse",
  // M
  "Motociclismo", "Maratón", "Montañismo", "MMA", "Muay Thai", "Mountain bike", "Mini golf",
  // N
  "Natación", "Natación sincronizada", "Navegación", "Netball",
  // O
  "Orientación", "Olimpiadas de ajedrez",
  // P
  "Pádel", "Pelota vasca", "Pentatlón", "Paracaidismo", "Patinaje artístico", "Patinaje de velocidad", "Pesca deportiva", "Polo", "Parkour",
  // Q
  "Quidditch", "Quadcross",
  // R
  "Rugby", "Remo", "Rally", "Raquetbol", "Rodeo", "Roller derby", "Rugby playa",
  // S
  "Surf", "Softball", "Saltos de esquí", "Saltos ornamentales", "Senderismo", "Squash", "Skateboarding", "Sumo", "Snooker",
  // T
  "Tenis", "Tenis de mesa", "Triatlón", "Taekwondo", "Tiro con arco", "Tiro deportivo", "Trampolín", "Trail running",
  // U
  "Ultimate frisbee", "Ultramaratón", "Unihockey",
  // V
  "Voleibol", "Voleibol playa", "Vela", "Vuelo a vela", "Vuelo libre",
  // W
  "Waterpolo", "Windsurf", "Wakeboarding", "Wrestling",
  // X
  "X-Games", "X-Treme skating",
  // Y
  "Yoga", "Yudo", "Yachting",
  // Z
  "Zumba", "Zoológico (deportes ecuestres)"
  ],

  'Profesiones': [
  // A
  "Abogado", "Actor", "Administrador", "Agrónomo", "Albañil", "Antropólogo", "Anestesista", "Arqueólogo", "Arquitecto", "Astrofísico", "Auditor", "Auxiliar de vuelo", "Avicultor",
  // B
  "Bacteriólogo", "Bailarín", "Barbero", "Barman", "Bibliotecario", "Biólogo", "Bioquímico", "Bombero", "Botánico", "Broker",
  // C
  "Cajero", "Camarero", "Cocinero", "Comerciante", "Compositor", "Contador", "Científico", "Cirujano", "Criminólogo", "Cronista", "Chef", "carpintero",
  // D
  "Dentista", "Deportista", "Dermatólogo", "Diseñador gráfico", "Diseñador de modas", "Director de cine", "Diplomático", "Docente", "Dramaturgo",
  // E
  "Ecologista", "Economista", "Editor", "Electricista", "Enfermero", "Entrenador", "Escultor", "Escritor", "Esteticista", "Estadístico", "Ebanista",
  // F
  "Farmacéutico", "Filósofo", "Filólogo", "Físico", "Fisioterapeuta", "Fotógrafo", "Fontanero", "Forense", "Frutero", "Fiscal",
  // G
  "Ganadero", "Geógrafo", "Geólogo", "Gerente", "Geriatra", "Guía turístico", "Ginecólogo", "Gobernanta", "Guionista",
  // H
  "Hematólogo", "Historiador", "Homeópata", "Horticultor", "Herrero", "Hotelero", "Higienista dental",
  // I
  "Ilustrador", "Impresor", "Inmunólogo", "Ingeniero civil", "Ingeniero de software", "Ingeniero mecánico", "Inversor", "Inspector", "Investigador",
  // J
  "Jabonero", "Jardinero", "Joyero", "Juez", "Jubilado profesional", "Jefe de cocina", "Jornalero",
  // K
  "Kinesiólogo", "Karateca (instructor)", "Kárstologo", "Kafkólogo",
  // L
  "Labrador", "Lactólogo", "Laringólogo", "Lectores de edición", "Léxicógrafo", "Librero", "Licenciado", "Lingüista", "Locutor",
  // M
  "Maestro", "Mago", "Maquillador", "Marinero", "Matemático", "Mecánico", "Médico", "Meteorólogo", "Microbiólogo", "Militar", "Minero", "Modelo", "Músico",
  // N
  "Nadador profesional", "Naturópata", "Nefrólogo", "Neumólogo", "Neurocirujano", "Nutricionista", "Notario", "Novelista",
  // Ñ
  "Ñandutí (artesano)", "Ñandúes (criador)",
  // O
  "Obstetra", "Oceanógrafo", "Odontólogo", "Oficinista", "Oftalmólogo", "Oncólogo", "Operador de radio", "Optometrista", "Organista", "Orfebre", "Otorrinolaringólogo",
  // P
  "Panadero", "Paramédico", "Partero", "Pastelero", "Pediatra", "Periodista", "Pescador", "Piloto", "Pintor", "Podólogo", "Policía", "Político", "Productor", "Psicólogo", "Psiquiatra",
  // Q
  "Químico", "Quiropráctico", "Quiromante", "Quirúrgico (técnico)", "Quimilero",
  // R
  "Radiólogo", "Rector", "Redactor", "Relacionista público", "Relojero", "Reportero", "Repartidor", "Restaurador", "Reumatólogo",
  // S
  "Sacerdote", "Sastre", "Secretario", "Seguridad (guardia)", "Sexólogo", "Sociólogo", "Socorrista", "Soldador", "Sommelier",
  // T
  "Tallista", "Taxista", "Técnico", "Telefonista", "Teólogo", "Terapeuta", "Topógrafo", "Traductor", "Traumatólogo", "Tripulante",
  // U
  "Urólogo", "Urbanista", "Ujier", "Ultrasonografista", "Urgenciólogo",
  // V
  "Vacunador", "Valuador", "Vendedor", "Veterinario", "Vidriero", "Vigilante", "Violinista", "Viticultor", "Voces de doblaje",
  // W
  "Webmaster", "Web developer", "Waterpolista profesional", "Whisky blender (catador)",
  // X
  "Xilógrafo", "Xilofonista", "Xenobiólogo",
  // Y
  "Youtuber", "Yogui (instructor)", "Yesero", "Yudoca",
  // Z
  "Zapatero", "Zootecnista", "Zoólogo", "Zinguero"
  ],

  'Colores': [
  // A
  "Acua", "Acuamarina", "Agua", "Albaricoque", "Almagre", "Amaranto", "Amarillo", "Amarillo canario", "Amarillo limón", "Amarillo mostaza", "Ámbar", "Amatista", "Antracita", "Añil", "Arena", "Avellana", "Azabache", "Azahar", "Azul", "Azul acero", "Azul celeste", "Azul cobalto", "Azul marino", "Azul turquesa", "Azul ultramar", "Azur",
  // B
  "Beige", "Berenjena", "Bermejo", "Bermellón", "Blanco", "Blanco marfil", "Blanco hueso", "Blanco perla", "Burdeos",
  // C
  "Café", "Calabaza", "Camello", "Canela", "Caoba", "Carbón", "Cardenal", "Carmesí", "Carmín", "Carne", "Cartujo", "Castaño", "Ceibo", "Celeste", "Ceniza", "Cereza", "Champaña", "Cian", "Cinc", "Ciruela", "Clarete", "Cobre", "Coral", "Crema", "Cuarzo",
  // D
  "Damasco", "Dorado", "Durazno",
  // E
  "Ébano", "Esmeralda", "Escarlata", "Esquistoso",
  // F
  "Fandango", "Feldgrau", "Fiusha", "Flavo", "Frambuesa", "Fresa", "Fucsia",
  // G
  "Gualda", "Granate", "Gris", "Gris oxford", "Gris perla", "Gris topo", "Grisáceo", "Guinda",
  // H
  "Heliotropo", "Herrumbre", "Hígado", "Hueso",
  // I
  "Indaco", "Índigo", "Infrarrojo", "Isabelino",
  // J
  "Jade", "Jaspe",
  // K
  "Kaki", "Kermes",
  // L
  "Ladrillo", "Lavanda", "Lila", "Lima", "Limón", "Livor", "Luteo",
  // M
  "Madreperla", "Magenta", "Maíz", "Malva", "Mandarina", "Marrón", "Marfil", "Melocotón", "Menta", "Miel", "Militar", "Mostaza", "Murrey",
  // N
  "Nácar", "Naranja", "Negro", "Níveo",
  // O
  "Ocre", "Oliva", "Oro", "Orquídea", "Oveuno",
  // P
  "Paja", "Pardo", "Pastel", "Patito", "Pelirrojo", "Perla", "Persa", "Petróleo", "Piel", "Pimentón", "Pino", "Pistacho", "Plata", "Platino", "Plomo", "Púrpura",
  // Q
  "Quercitrón",
  // R
  "Rana", "Regaliz", "Rojizo", "Rojo", "Rojo coral", "Rojo pasión", "Rojo fuego", "Rosa", "Rosa viejo", "Rosa pastel", "Rubí", "Rufo",
  // S
  "Salmón", "Sanguíneo", "Siena", "Sepia", "Sinople", "Sol", "Sulfúreo",
  // T
  "Tabaco", "Tamarindo", "Terracota", "Trigueño", "Turquesa", "Turquí",
  // U
  "Ultramar", "Uva",
  // V
  "Vainilla", "Verde", "Verde botella", "Verde esmeralda", "Verde lima", "Verde manzana", "Verde militar", "Verde oliva", "Verde pistacho", "Verde mar", "Veronés", "Violáceo", "Violeta", "Vino", "Vivo",
  // W
  "Wenge",
  // X
  "Xanadu",
  // Y
  "Yema",
  // Z
  "Zafiro", "Zanahoria", "Zinc"
  ],

  'Peliculas': [
  // A
  "A ciegas", "A contrarreloj", "A todo gas", "Abierto hasta el amanecer", "Abuelos al poder", "Acción mutante", "Acorralado", "Al este del Edén", "Al filo del mañana", "Aladdín", "Alejandro Magno", "Alien: el octavo pasajero", "Alguien voló sobre el nido del cuco", "Alma salvaje", "Amanecer", "Amadeus", "Amélie", "Amigos intocables", "Amores perros", "Anatomía de una caída", "Animales fantásticos y dónde encontrarlos", "Ant-Man: el hombre hormiga", "Apocalypse Now", "Apolo 13", "Armageddon", "Arriety y el mundo de los diminutos", "As bestas", "Asalto al poder", "Atrapado en el tiempo", "Avatar",
  // B
  "Babel", "Bailar con lobos", "Bailarina en la oscuridad", "Bambi", "Barbie", "Barton Fink", "Batman inicia", "Beetlejuice", "Belleza americana", "Belleza inesperada", "Ben-Hur", "Bichos: una aventura en miniatura", "Birdman", "Black Panther", "Blade Runner", "Blade Runner 2049", "Blancanieves y los siete enanitos", "Bohemian Rhapsody", "Braveheart: corazón valiente", "Brokeback Mountain: en terreno vedado",
  // C
  "Cadenas rotas", "Cambio de hábito", "Camino", "Cantando bajo la lluvia", "Capitán América: Civil War", "Carandiru", "Carol", "Cars", "Casablanca", "Casino", "Casino Royale", "Celda 211", "Centauros del desierto", "Chiflado por ella", "Chinatown", "Cinderella Man", "Cinema Paradiso", "Ciudad de Dios", "Ciudadano Kane", "Clear history", "Closer: llevados por el deseo", "Coco", "Colegas en el bosque", "Con faldas y a lo loco", "Con la muerte en los talones", "Contacto", "Corazones de acero", "Crónica de un verano", "Cruella", "Cuestión de tiempo",
  // D
  "Danko: calor rojo", "De entre los muertos (Vértigo)", "Deadpool", "Deep Impact", "Delicatessen", "Dentro del laberinto", "Desperado", "Desafío total", "Despedidas", "Destino final", "Día de entrenamiento", "Días de fútbol", "Días del cielo", "Django desencadenado", "Doctor Zhivago", "Dogville", "Donnie Darko", "Drácula de Bram Stoker", "Drive", "Dumbo", "Duna", "Dunkerque",
  // E
  "E.T., el extraterrestre", "Ed Wood", "Edward Scissorhands (Eduardo Manostijeras)", "El ángel exterminador", "El árbol de la vida", "El aura", "El bar", "El bueno, el feo y el malo", "El cazador", "El club de la lucha", "El club de los poetas muertos", "El crepúsculo de los dioses", "El curioso caso de Benjamin Button", "El día de la bestia", "El día de mañana", "El efecto mariposa", "El estudiante de Praga", "El exorcista", "El golpe", "El graduado", "El gran dictador", "El gran hotel Budapest", "El gran Lebowski", "El gran truco (El prestigio)", "El hijo de la novia", "El imperio contraataca", "El irlandés", "El laberinto del fauno", "El llanero solitario", "El maquinista", "El método", "El muelle", "El oficial y el espía", "El padrino", "El padrino II", "El pianista", "El precio del poder (Scarface)", "El profesional (Léon)", "El protegido", "El resplandor", "El rey león", "El secreto de sus ojos", "El señor de los anillos: la comunidad del anillo", "El sexto sentido", "El show de Truman", "El silencio de los corderos", "El truco del manco", "El viaje de Chihiro", "En busca del arca perdida", "En el nombre del padre",
  // F
  "Fados", "Fahrenheit 451", "Fango", "Fanny y Alexander", "Fantasía", "Fargo", "Fiebre del sábado noche", "Filadelfia", "Ford v Ferrari", "Forrest Gump", "Frankenstein", "Free Guy", "Frida", "Frozen: el reino del hielo", "Full Metal Jacket (La chaqueta metálica)", "Furia de titanes", "Furtivos",
  // G
  "Gangs of New York", "Gattaca", "Ghost: más allá del amor", "Gilda", "Gladiador", "Godzilla", "Goodfellas (Buenos muchachos)", "Gran Torino", "Gravity", "Green Book", "Gremlins", "Gritos y susurros", "Guardianes de la galaxia", "Guillermo del Toro's Pinocchio",
  // H
  "Hable con ella", "Hacksaw Ridge (Hasta el último hombre)", "Halloween", "Hamilton", "Hancock", "Hannibal", "Harry Potter y la piedra filosofal", "Heat", "Hellboy", "Her", "Hércules", "High School Musical", "Hiroshima mon amour", "Hitch: especialista en seducción", "Hora punta", "Hotel Rwanda", "Hugo",
  // I
  "Iberia", "Ice Age: la edad de hielo", "Inception (Origen)", "Indiana Jones y la última cruzada", "Infiltrados", "Inmortal", "Inside Out (Del revés)", "Insomnia", "Interstellar", "Intocable", "Invasión", "Iron Man", "Irreversible", "Isla de perros", "Isla mínima", "It (Eso)",
  // J
  "Jackie Brown", "Jane Eyre", "Jason Bourne", "Jaws (Tiburón)", "Jerry Maguire", "Jesucristo Superstar", "Jinete pálido", "Jirafas", "Jojo Rabbit", "Joker", "John Wick", "Johnny Guitar", "Jóvenes ocultos", "Juana de Arco", "Jules y Jim", "Jumanji", "Juno", "Jurassic Park", "Justice League (La liga de la justicia)", "Juventud en éxtasis",
  // K
  "K-19: The Widowmaker", "Kagemusha", "Kárate Kid", "Kika", "Kiki, la aprendiz de bruja", "Kill Bill: Volumen 1", "Kill Bill: Volumen 2", "Killers of the Flower Moon (Los asesinos de la luna)", "King Kong", "Kingdom of Heaven (El reino de los cielos)", "Kinsey", "Kiss Kiss Bang Bang", "Klaus", "Knives Out (Puñales por la espalda)", "Kong: La isla calavera", "Koyaanisqatsi", "Kramer contra Kramer", "K-Pax", "Kubo y las dos cuerdas mágicas",
  // L
  "La caza", "La comunidad", "La delgada línea roja", "La delgada línea amarilla", "La dolce vita", "La estrategia del caracol", "La gran familia española", "La gran ilusión", "La herencia Valdemar", "La historia oficial", "La isla de las tormentas", "La la land: la ciudad de las estrellas", "La lengua de las mariposas", "La lista de Schindler", "La lola se va a los puertos", "La mala educación", "La naranja mecánica", "La red social", "La soga", "La vaquilla", "La vida de Brian", "La vida es bella", "La vida de los otros", "Lágrimas del sol", "Lara Croft: Tomb Raider", "Las crónicas de Narnia", "Las horas", "Lunas de hiel", "Línea mortal", "Lo que el viento se llevó",
  // M
  "M, el vampiro de Düsseldorf", "Macario", "Mad Max: furia en la carretera", "Madagascar", "Malcolm X", "Mamma Mia!", "Manchester frente al mar", "Manhattan", "Mar adentro", "Marriage Story (Historia de un matrimonio)", "Mary Poppins", "Match Point", "Matrix", "Memento", "Metrópolis", "Midnight in Paris", "Midsommar", "Milagro en la celda 7", "Minions", "Misery", "Misión imposible", "Moby Dick", "Molino rojo", "Mulan",
  // N
  "Nacido el 4 de julio", "Nadie sabe", "Napoleón", "Naufrago", "Nekromantik", "Network: un mundo implacable", "Nido de víboras", "Nightcrawler", "No habrá paz para los malvados", "No mires arriba", "No es país para viejos", "Noche en el museo", "Nocturnal Animals (Animales nocturnos)", "Nomadland", "Nosferatu", "Notting Hill", "Novecento", "Nueve reinas",
  // O
  "O Brother! (¿Dónde estás, hermano?)", "Oblivion", "Ocho apellidos vascos", "Oldboy", "Oliver", "Onward", "Oppenheimer", "Orfeo", "Orgullo y prejuicio", "Original Sin (Pecado original)", "Orphan (La huérfana)", "Oslo", "Ostia", "Otelo", "Otro día para morir", "Overlord",
  // P
  "Pacific Rim", "Paddington", "Platoon", "Parásitos", "Passengers", "Pearl Harbor", "Pequeña Miss Sunshine", "Perfect Blue", "Peter Pan", "Pinocho", "Piratas del Caribe: la maldición de la Perla Negra", "Plácido", "Poltergeist", "Psicosis", "Pulp Fiction",
  // Q
  "Quantum of Solace", "Quarantine (Cuarentena)", "Qué bello es vivir", "Qué de más", "Qué Dios nos perdone", "Queen & Slim", "Querido diario", "Quick Change", "Quiet Days in Clichy", "Quills", "Quinceañera", "Quien a hierro mata", "Quiero ser como Beckham", "Quintet", "Quisiera ser grande", "Quiz Show: el dilema", "Quo vadis, Aida?", "Quo Vadis?",
  // R
  "Raging Bull (Toro salvaje)", "Rain Man", "Ran", "Rango", "Ratatouille", "Rastro de sangre", "Raw (Crudo)", "Ray", "Rebecca", "Red", "Relatos salvajes", "Reservoir Dogs", "Resident Evil", "RoboCop", "Rocky", "Roma",
  // S
  "Sábado noche, domingo mañana", "Sabrina", "Salt", "Salvar al soldado Ryan", "Saw", "Scream", "Se7en", "Seven Samurai (Los siete samuráis)", "Shame", "Shaun of the Dead (Zombies Party)", "Shrek", "Shutter Island", "Sicario", "Señales", "Sin City: ciudad del pecado", "Skyfall", "Snatch: cerdos y diamantes", "Snowpiercer (Rompenieves)", "Solo en casa", "Spiderman",
  // T
  "Tae Guk Gi", "Tangled (Enredados)", "Tarzán", "Taxi Driver", "Ted", "Terminator", "The Avengers (Los vengadores)", "The Batman", "The Big Short (La gran apuesta)", "The Dark Knight (El caballero oscuro)", "The Departed (Infiltrados)", "The Shawshank Redemption (Cadena perpetua)", "Titanic", "Todo sobre mi madre", "Top Gun", "Toy Story", "Trainspotting", "Transformers", "Tron", "Troya",
  // U
  "U-571", "Un asunto de familia", "Un ciudadano ejemplar", "Un condenado a muerte se ha escapado", "Un cuento chino", "Un día de furia", "Un domingo cualquiera", "Un lugar tranquilo", "Un lugar tranquilo Parte II", "Un lugar en el mundo", "Un mundo perfecto", "Un par de seductores", "Un perro andaluz", "Un profeta", "Un toque de violencia", "Un viaje de diez metros", "Unforgiven (Sin perdón)", "Unhinged (Salvaje)", "Unbreakable (El protegido)", "Underworld", "Up: una aventura de altura", "Us (Nosotros)",
  // V
  "V de Vendetta", "Valquiria", "Vampiros de John Carpenter", "Van Helsing", "Vanilla Sky", "Vantage Point (En el punto de mira)", "Vecinos invasores", "Velvet Buzzsaw", "Viaje al centro de la Tierra", "Viaje a la Luna", "Vicky Cristina Barcelona", "Victoria", "Vidocq", "Vieja trova santiaguera", "Viernes 13", "Viridiana", "Vis a vis", "Vivancos 3", "Volver", "Volver al futuro",
  // W
  "W.E.", "WALL-E", "Warcraft: el origen", "War Horse (Caballo de batalla)", "Watchmen", "Waterworld", "Waves (Las olas)", "We Need to Talk About Kevin", "West Side Story (Amor sin barreras)", "Whiplash: música y obsesión", "White Chicks (Dos rubias de pelo en pecho)", "White House Down (Asalto a la Casa Blanca)", "Wild (Alma salvaje)", "William Shakespeare's Romeo + Juliet", "Willow", "Willy Wonka y la fábrica de chocolate", "Winchester", "Wind River", "Wolf Children", "Wonder Woman",
  // X
  "X", "Xanadú", "Xavi", "Xichlo", "Xiao Wu", "Xica da Silva", "Xicu", "Xing", "Xis", "Xma", "X-Men", "X-Men 2", "X-Men: Apocalipsis", "X-Men: días del futuro pasado", "X-Men: primera generación", "X-Men: la decisión final", "X-Men orígenes: Lobezno", "Xora", "Xtremo",
  // Y
  "Y tu mamá también", "Yankee Doodle Dandy", "Yards", "Yari", "Yentl", "Yes Man (Di que sí)", "Yesterday", "Yiyi", "Yo, Claudio", "Yo, Daniel Blake", "Yo, robot", "Yo soy la Juani", "Yojimbo", "Yol", "Yossi & Jagger", "Young Frankenstein (El jovencito Frankenstein)", "Young Guns (Arma joven)", "Youth (La juventud)", "You've Got Mail (Tienes un e-mail)", "Yuki & Nina",
  // Z
  "Z", "Zabriskie Point", "Zack y Miri hacen una porno", "Zama", "Zandalee", "Zanjeer", "Zardoz", "Zathura: una aventura espacial", "Zazie en el metro", "Zatôichi", "Zebraman", "Zelig", "Zero Dark Thirty (La noche más oscura)", "Zodiac", "Zombieland", "Zoolander", "Zootopia", "Zorba el griego", "Zorro", "Zulu"
 ],

  'Objetos de casa': [
  // A
  "Abridor", "Abrigo", "Aceitera", "Acondicionador", "Adorno", "Agenda", "Aguja", "Albornoz", "Álbum de fotos", "Alcancía", "Alcuza", "Alfombra", "Alfiler", "Almohada", "Alfiletero", "Alicates", "Alisador de pelo", "Alacena", "Altavoz", "Alfiler de gancho",
  // B
  "Báscula", "Balde", "Banco", "Bandeja", "Banqueta", "Bañera", "Barra de cortina", "Barreño", "Batidora", "Batería de cocina", "Bote", "Botella", "Botiquín", "Boquilla", "Bombilla", "Bolígrafo", "Bol", "Bolsa de basura", "Bolsa de agua caliente", "Brocha",
  // C
  "Caballete", "Cable", "Cacerola", "Cadena", "Caja", "Cajón", "Calentador", "Calculadora", "Cama", "Cámara", "Camisón", "Campana extractora", "Candado", "Candelabro", "Canica", "Canasta", "Capa", "Carpeta", "Carretel", "Cartón",
  // D
  "Dados", "Dedal", "Delantal", "Dentífrico", "Depiladora", "Desatascador", "Despertador", "Desodorante", "Destornillador", "Detergente", "Diario", "Diccionario", "Disco duro", "Disquete", "Diván", "Dominó", "Dosificador", "Duplicado de llaves", "Duvet", "Ducha",
  // E
  "Embudo", "Enchufe", "Encendedor", "Encimera", "Ensaladera", "Enjuague bucal", "Enfriador de vino", "Engrapadora", "Enrejado", "Escalera", "Escoba", "Escobilla del baño", "Escritorio", "Escurridor", "Esponja", "Espátula", "Espejo", "Estantería", "Estropajo", "Estuche",
  // F
  "Falda", "Farol", "Fiambrera", "Fieltro", "Fila", "Filtro", "Florero", "Flauta", "Flecha", "Flotador", "Foco", "Folio", "Funda de almohada", "Funda de sofá", "Fusible", "Frasco", "Fregona", "Fregadero", "Frigorífico", "Frutero",
  // G
  "Gafas", "Galería", "Galón", "Gancho", "Garrafa", "Gato hidráulico", "Grapa", "Goma de borrar", "Goma del pelo", "Gorra", "Grifo", "Guante", "Guía telefónica", "Guitarra", "Gis", "Gabán", "Gabinete", "Galletero", "Gasas", "Gel de ducha",
  // H
  "Hacha", "Harnero", "Hevilla", "Heladera", "Herramienta", "Hervidor", "Hilo", "Hilo dental", "Hoguera", "Hoja de papel", "Hornillo", "Horno", "Horno microondas", "Horquilla", "Hielera", "Hucha", "Humedecedor", "Hule", "Huevo de costura", "Hamaca",
  // I
  "Imán", "Impermeable", "Imperdible", "Impresora", "Incienso", "Indicador", "Inodoro", "Invernadero", "Infusor de té", "Insecticida", "Interruptor", "Instrumento", "Iluminación", "Individual de mesa", "Imán de nevera", "Inhalador", "Identificador de llaves", "Intercomunicador", "Inyector", "Isla de cocina",
  // J
  "Jabón", "Jabonera", "Jacuzzi", "Jarra", "Jardín de interior", "Jardinera", "Jeringa", "Joyero", "Juego de mesa", "Juego de llaves", "Juguete", "Jugo de sábanas", "Junta de goma", "Jarrón", "Jaula", "Jersei", "Jeringuilla", "Juguetero", "Joyas", "Jícara",
  // K
  "Kilo", "Kilo de pesas", "Kiosco de jardín", "Katiuska (bota)", "Kimono", "Kit de costura", "Kit de herramientas", "Kit de limpieza", "Keffiyeh", "Kettle (tetera eléctrica)", "Kilt", "Kayak (inflable)", "Kirsch", "Kerosene", "Kéfir (recipiente)", "Kebab de juguete", "Kora (instrumento)", "Knocker (aldaba)", "Kuchen (molde)", "Krampones",
  // L
  "Lámpara", "Lana", "Lápiz", "Lápiz de labios", "Lata", "Latiguillo", "Lavadora", "Lavavajillas", "Lazo", "Lechera", "Lejía", "Lente", "Lentejuelas", "Llavero", "Llave", "Llave inglesa", "Libreta", "Libro", "Lima", "Linterna",
  // M
  "Maceta", "Machete", "Maleta", "Malla", "Manguera", "Manta", "Mantel", "Mantequillera", "Manzana de juguete", "Mapa", "Maqueta", "Máquina de coser", "Máquina de afeitar", "Marco de fotos", "Martillo", "Mascarilla", "Mazo", "Mecha", "Mesa", "Mesa de noche",
  // N
  "Navaja", "Navegador", "Nebulizador", "Neceser", "Negativo de foto", "Neumático", "Nevera", "Nido de mimbre", "Nivel de burbuja", "Nódulo de cable", "Nota adhesiva", "Notebook", "Nutria de peluche", "Narguile", "Nailon (hilo)", "Nogal (mueble)", "Naipes", "Nido de contención", "Niquelado", "Noria de juguete",
  // O
  "Objeto decorativo", "Olla", "Olla a presión", "Ollita", "Ordenador", "Organizador", "Orinal", "Oro de adorno", "Oso de peluche", "Oveja de peluche", "Ojo de buey (luz)", "Ojal (herramienta)", "Ocarina", "Orejeras", "Olla de barro", "Otoman", "Obleera", "Oxímetro", "Ozonizador", "Oculistas (tabla)",
  // P
  "Pala", "Palanca", "Palillo", "Paleta", "Pañal", "Pantuflas", "Pañuelo", "Papel", "Papel higiénico", "Papelera", "Paquete", "Paraguas", "Pared de adorno", "Parrilla", "Pasador", "Pasta de dientes", "Pastilla de jabón", "Patín", "Pato de goma", "Peine",
  // Q
  "Quitaesmalte", "Quitagrasas", "Quitapelusas", "Quitamanchas", "Quitasol", "Quinqué", "Química (juego)", "Quadro (cuadro)", "Queroseno", "Quena", "Quijote (figura)", "Quesera", "Quisquillero", "Quita moscas", "Quitasueños", "Quebrantanueces", "Quimono", "Quitamiedos (luz)", "Quilate (balanza)", "Quinta de juguete",
  // R
  "Radiador", "Radio", "Rallador", "Rastrillo", "Ratón de ordenador", "Recipiente", "Recortadora", "Red", "Refresco", "Regadera", "Regla", "Regulador", "Reloj", "Reloj de arena", "Revista", "Revistero", "Riel", "Rodillo", "Ropa", "Ropero",
  // S
  "Sábana", "Saco", "Sacacorchos", "Sacapuntas", "Salero", "Salsera", "Sandalia", "Sartén", "Secador de pelo", "Secadora", "Sello", "Semillero", "Señalizador", "Secador de platos", "Serrín", "Servilleta", "Servilletero", "Silla", "Sillón", "Sofá",
  // T
  "Taburete", "Taza", "Tazón", "Tabla de cortar", "Tabla de planchar", "Tacón", "Taladro", "Talco", "Tambor", "Tamiz", "Tapón", "Tapa", "Tapete", "Tarro", "Tarjeta", "Taza de té", "Teclado", "Televisor", "Teléfono", "Tenazas",
  // U
  "Ukelele", "Urna de cristal", "Unicornio de peluche", "Ungüento", "Utensilio", "Uña de gato (planta)", "Uniforme", "Unidad USB", "Urdidor", "Uña (alicates de manicura)", "Unión de tuberías", "Uretano (barniz)", "Uva de juguete", "Umbral de puerta", "Usura (balanza)", "Utillaje", "Urna decorativa", "Uva de plástico", "Uña postiza", "Universal (mando)",
  // V
  "Vaso", "Vajilla", "Valvula", "Vaporizador", "Varilla", "Vela", "Velón", "Ventilador", "Vestido", "Vídeo", "Videoconsola", "Vidrio", "Vinagrera", "Vinilo", "Visillo", "Vitrina", "Volante", "Valla", "Vacuna (jeringa)", "Vaporera",
  // W
  "Water (inodoro)", "Walkie-talkie", "Wok", "Whisky (botella)", "Waffleera", "Webcam", "Waterpolo (balón)", "Wood (madera de adorno)", "Washi tape", "Windchime (campana de viento)", "Wig (peluca)", "Wiper (limpiacristales)", "Wool (lana)", "Wafer (molde)", "Wrench (llave inglesa)", "Wallet (cartera)", "Warm up (esterilla)", "Washboard (tabla de lavar)", "Water cooler", "Wax (cera)",
  // X
  "Xilófono", "Xilografía", "Xerografía (copia)", "Xilórgano", "Xiloprotector", "Xerófitas (maceta)", "Xifo de juguete", "Xerox (papel)", "Xilita (azucarero)", "Xenón (lámpara)", "Xilomancia (cartas)", "Xilopal (piedra decorativa)", "Xiloteca (caja)", "Xenomorfo (figura)", "Xenón (foco)", "Xerox (máquina)", "Xilografía (cuadro)", "Xilófono infantil", "Xilol (frasco)", "Xilofonista de juguete",
  // Y
  "Yogurtera", "Yeso", "Yoyo", "Yunque de joyería", "Yute (alfombra)", "Yute (saco)", "Yelmo decorativo", "Yacimiento (fósil decorativo)", "Yate de juguete", "Yema (separador)", "Yacuzzi", "Yerbatero", "Yuca de plástico", "Yunta de adorno", "Yodo (frasco)", "Yogur (recipiente)", "Yerbabuena (maceta)", "Yacija", "Yunta (juguete)", "Yen (moneda de colección)",
  // Z
  "Zuecos", "Zapato", "Zapatilla", "Zócalo", "Zafas (gafas)", "Zafra", "Zambomba", "Zanco", "Zaranda", "Zarcillo", "Zueco de madera", "Zapatillero", "Zafiro (joya)", "Zanahoria de juguete", "Zumo (jarra)", "Zumbador", "Zócalo radiante", "Zeta de juguete", "Zoológico de juguete", "Zafiro decorativo"
]
}

// Exportamos el diccionario para usarlo en server.js
module.exports = diccionario

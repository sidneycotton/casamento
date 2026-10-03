/* =========================================================
   Tudo o que for personalizável fica aqui.
   Troque os valores marcados com TODO pelos dados reais.
   ========================================================= */
window.CONFIG = {
  name1: "Vitor",
  name2: "Julia",
  dateISO: "2027-06-26T19:00:00-03:00", // TODO: confirmar horário
  church: "Primeira Igreja Presbiteriana de Guarapari",
  address: "Centro, Guarapari - ES",

  // WhatsApp que recebe confirmações e comprovantes (só números, com DDI 55 + DDD)
  whatsapp: "5527999999999",  // TODO

  // Dados do PIX (o QR code é gerado com o valor exato do carrinho)
  pix: {
    key: "sua-chave@exemplo.com", // TODO: CPF, e-mail, telefone (+55...) ou chave aleatória
    name: "NOME DO RECEBEDOR",    // TODO: até 25 caracteres, sem acento
    city: "GUARAPARI"             // até 15 caracteres, sem acento
  },

  // Fotos do carrossel: coloque os arquivos em img/fotos/ e liste aqui.
  // Enquanto a lista estiver vazia, aparecem molduras de exemplo.
  photos: [
    // { src: "img/fotos/01.jpg", caption: "O dia em que nos conhecemos" },
  ],
  placeholderCaptions: [
    "O primeiro encontro",
    "Nossa primeira viagem",
    "O pedido",
    "Um domingo qualquer",
    "Família",
    "Rumo ao altar"
  ]
};

/* Lista de presentes. cat: "lua" | "casa" | "carinho". icon: id de um ícone do index.html */
window.GIFTS = [
  { id: "passagem",  cat: "lua",     icon: "plane",  name: "Cota das passagens da lua de mel", desc: "Uma parte do voo rumo ao nosso primeiro destino juntos.", price: 450 },
  { id: "hotel",     cat: "lua",     icon: "bed",    name: "Uma diária com vista para o mar", desc: "Para acordar ouvindo as ondas.", price: 520 },
  { id: "jantar",    cat: "lua",     icon: "dinner", name: "Jantar romântico na lua de mel", desc: "Mesa para dois, à luz de velas.", price: 320 },
  { id: "barco",     cat: "lua",     icon: "boat",   name: "Passeio de barco", desc: "Uma tarde inteira navegando sem pressa.", price: 260 },
  { id: "cafe-cama", cat: "lua",     icon: "cup",    name: "Café da manhã na cama", desc: "Pão quentinho, frutas e preguiça.", price: 120 },
  { id: "upgrade",   cat: "lua",     icon: "sun",    name: "Upgrade de quarto", desc: "Porque lua de mel merece varanda.", price: 680 },

  { id: "panelas",   cat: "casa",    icon: "pan",    name: "Jogo de panelas", desc: "Para os almoços de domingo com a família.", price: 540 },
  { id: "cafeteira", cat: "casa",    icon: "cup",    name: "Cafeteira", desc: "O café de todo dia, agora a dois.", price: 390 },
  { id: "cama",      cat: "casa",    icon: "bed",    name: "Jogo de cama 400 fios", desc: "Noites bem dormidas na casa nova.", price: 350 },
  { id: "tacas",     cat: "casa",    icon: "glass",  name: "Jogo de taças", desc: "Para brindar cada conquista.", price: 180 },
  { id: "robo",      cat: "casa",    icon: "robot",  name: "Aspirador robô", desc: "Menos tempo limpando, mais tempo juntos.", price: 1200 },
  { id: "sofa",      cat: "casa",    icon: "home",   name: "Cota do sofá", desc: "Onde vão acontecer as maratonas de série.", price: 300 },

  { id: "oliveira",  cat: "carinho", icon: "leaf",   name: "Uma oliveira para a varanda", desc: "Para crescer junto com o nosso lar.", price: 160 },
  { id: "pizza",     cat: "carinho", icon: "pizza",  name: "Pizza da primeira noite na casa nova", desc: "Entre caixas de mudança, claro.", price: 90 },
  { id: "streaming", cat: "carinho", icon: "play",   name: "Um ano de streaming", desc: "Para as noites de filme no sofá.", price: 240 },
  { id: "aula",      cat: "carinho", icon: "dinner", name: "Aulas de culinária para o casal", desc: "Para o miojo deixar de ser prato principal.", price: 280 },
  { id: "flores",    cat: "carinho", icon: "heart",  name: "Flores para pedir desculpas", desc: "Um fundo de reserva para a primeira discussão.", price: 110 },
  { id: "buque",     cat: "carinho", icon: "gift",   name: "Garantir que o buquê caia em você", desc: "Não garantimos nada, mas agradecemos.", price: 75 }
];

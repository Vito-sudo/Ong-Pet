const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const toast = document.getElementById("toast");

const ONG_WHATSAPP = "5511999999999";


const HANDOFF_ENDPOINT = "/api/triagem/handoff";
const FALLBACK_SPECIALIST_WHATSAPP = "5511999999999";

let selectedAmount = 50;
let selectedFrequency = "única";
let selectedPaymentMethod = "card";
let selectedCardType = "credito";

/* =========================================================
   BASE
   ========================================================= */

document.getElementById("year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.querySelector("span").textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.querySelector("span").textContent = "☰";
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document
  .querySelectorAll(".reveal:not(.visible)")
  .forEach(el => revealObserver.observe(el));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = Number(el.dataset.counter);
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      el.textContent = Math.round(target * eased) + suffix;

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.65 });

document
  .querySelectorAll("[data-counter]")
  .forEach(el => counterObserver.observe(el));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timer);

  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}


const pets = [
  {
    id: 1,
    name: "Nina",
    species: "cao",
    speciesLabel: "Cachorra",
    age: "2 anos",
    sex: "Fêmea",
    size: "Porte médio",
    vaccinated: "Vacinas em dia",
    neutered: "Castrada",
    temperament: ["Carinhosa", "Brincalhona", "Sociável"],
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=88",
    story: "Nina é curiosa, muito ligada às pessoas e adora passeios. Foi acolhida após um resgate e já está pronta para conhecer uma família com tempo para brincar e oferecer companhia."
  },
  {
    id: 2,
    name: "Chico",
    species: "gato",
    speciesLabel: "Gato",
    age: "1 ano e 6 meses",
    sex: "Macho",
    size: "Porte pequeno",
    vaccinated: "Vacinas em dia",
    neutered: "Castrado",
    temperament: ["Tranquilo", "Curioso", "Independente"],
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1000&q=88",
    story: "Chico gosta de observar tudo antes de se aproximar. Depois que ganha confiança, procura carinho e companhia. Combina com uma casa tranquila e pessoas pacientes."
  },
  {
    id: 3,
    name: "Amora",
    species: "cao",
    speciesLabel: "Cachorra",
    age: "4 anos",
    sex: "Fêmea",
    size: "Porte pequeno",
    vaccinated: "Vacinas em dia",
    neutered: "Castrada",
    temperament: ["Doce", "Companheira", "Calma"],
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1000&q=88",
    story: "Amora é daquelas que prefere ficar por perto. Gosta de carinho, rotina e ambientes acolhedores. Está saudável e pronta para uma adoção responsável."
  },
  {
    id: 4,
    name: "Theo",
    species: "gato",
    speciesLabel: "Gato",
    age: "3 anos",
    sex: "Macho",
    size: "Porte pequeno",
    vaccinated: "Vacinas em dia",
    neutered: "Castrado",
    temperament: ["Afetuoso", "Observador", "Gentil"],
    image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1000&q=88",
    story: "Theo é um gato gentil, que gosta de janelas, lugares altos e cochilos longos. Com pessoas conhecidas, se transforma em um verdadeiro parceiro de sofá."
  },
  {
    id: 5,
    name: "Bento",
    species: "cao",
    speciesLabel: "Cachorro",
    age: "8 meses",
    sex: "Macho",
    size: "Porte médio",
    vaccinated: "Protocolo completo",
    neutered: "Castrado",
    temperament: ["Energético", "Divertido", "Amigável"],
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1000&q=88",
    story: "Bento ainda é filhote e tem energia de sobra. Precisa de uma família disposta a ensinar, passear e brincar bastante. Em troca, oferece alegria em tempo integral."
  },
  {
    id: 6,
    name: "Luna",
    species: "gato",
    speciesLabel: "Gata",
    age: "2 anos",
    sex: "Fêmea",
    size: "Porte pequeno",
    vaccinated: "Vacinas em dia",
    neutered: "Castrada",
    temperament: ["Delicada", "Carinhosa", "Sossegada"],
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1000&q=88",
    story: "Luna é delicada e gosta de chegar no próprio tempo. Depois de se sentir segura, procura colo e carinho. Vai muito bem em ambientes internos e tranquilos."
  },
  {
    id: 7,
    name: "Zeca",
    species: "cao",
    speciesLabel: "Cachorro",
    age: "5 anos",
    sex: "Macho",
    size: "Porte grande",
    vaccinated: "Vacinas em dia",
    neutered: "Castrado",
    temperament: ["Leal", "Calmo", "Protetor"],
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=88",
    story: "Zeca é grande no tamanho e no coração. É equilibrado, gosta de companhia e passeios moderados. Procura uma família que tenha espaço e goste de cães companheiros."
  },
  {
    id: 8,
    name: "Mia",
    species: "gato",
    speciesLabel: "Gata",
    age: "10 meses",
    sex: "Fêmea",
    size: "Porte pequeno",
    vaccinated: "Protocolo completo",
    neutered: "Castrada",
    temperament: ["Brincalhona", "Curiosa", "Sociável"],
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=88",
    story: "Mia é jovem, esperta e transforma qualquer objeto em brinquedo. Se adapta rápido e gosta de interação. Uma boa escolha para famílias que querem um pet ativo."
  }
];

const petDeck = document.getElementById("petDeck");
const favoriteCount = document.getElementById("favoriteCount");
const favoritesGrid = document.getElementById("favoritesGrid");
const favoritesEmpty = document.getElementById("favoritesEmpty");
const passPetButton = document.getElementById("passPet");
const likePetButton = document.getElementById("likePet");
const openPetDetailsButton = document.getElementById("openPetDetails");
const clearFavoritesButton = document.getElementById("clearFavorites");
const petModal = document.getElementById("petModal");
const petModalContent = document.getElementById("petModalContent");

let petFilter = "todos";
let visiblePets = [...pets];
let petIndex = 0;
const favoritePetIds = new Set();

function currentPet() {
  return visiblePets[petIndex] || null;
}

function whatsappPetUrl(pet) {
  const text = `Olá! Vi o perfil de ${pet.name} no site da Aqui e Agora Pet e gostaria de conversar com a equipe sobre o processo de adoção.`;
  return `https://wa.me/${ONG_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

function renderPetDeck() {
  if (!petDeck) return;

  const pet = currentPet();

  if (!pet) {
    petDeck.innerHTML = `
      <div class="pet-deck-empty">
        <div>
          <span>🐾</span>
          <h3>Você conheceu todos os pets deste filtro.</h3>
          <p>Troque o filtro ou recomece a rodada para rever os perfis.</p>
          <button class="btn btn-primary" type="button" id="restartPetDeck" style="margin-top:18px">
            Rever perfis
          </button>
        </div>
      </div>
    `;

    document.getElementById("restartPetDeck")?.addEventListener("click", () => {
      petIndex = 0;
      renderPetDeck();
    });

    return;
  }

  petDeck.innerHTML = `
    <article class="pet-profile-card" data-pet-card>
      <img class="pet-profile-image" src="${pet.image}" alt="${pet.name}, ${pet.speciesLabel.toLowerCase()} disponível para adoção">

      <div class="pet-profile-overlay">
        <div class="pet-profile-top">
          <div>
            <h3 class="pet-profile-name">${pet.name}</h3>
            <span class="pet-profile-age">${pet.age} • ${pet.sex} • ${pet.size}</span>
          </div>

          <span class="pet-profile-species">${pet.species === "cao" ? "🐶" : "🐱"} ${pet.speciesLabel}</span>
        </div>

        <div class="pet-health-line">
          <span>💉 ${pet.vaccinated}</span>
          <span>✓ ${pet.neutered}</span>
        </div>

        <p class="pet-temperament-preview">
          ${pet.temperament.join(" • ")}
        </p>
      </div>
    </article>
  `;

  const currentCard = petDeck.querySelector("[data-pet-card]");

  currentCard?.addEventListener("click", (event) => {
    if (currentCard.dataset.wasDragged === "true") {
      currentCard.dataset.wasDragged = "false";
      return;
    }

    openCurrentPetModal();
  });

  enableCardSwipe(currentCard);
}

function enableCardSwipe(card) {
  if (!card) return;

  let startX = 0;
  let currentX = 0;
  let dragging = false;

  card.addEventListener("pointerdown", (event) => {
    dragging = true;
    startX = event.clientX;
    currentX = 0;
    card.dataset.wasDragged = "false";
    card.setPointerCapture?.(event.pointerId);
    card.classList.add("is-dragging");
  });

  card.addEventListener("pointermove", (event) => {
    if (!dragging) return;

    currentX = event.clientX - startX;

    if (Math.abs(currentX) > 5) {
      card.dataset.wasDragged = "true";
    }

    const rotation = currentX / 22;
    card.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;

    if (currentX > 55) {
      card.classList.add("swipe-like-preview");
      card.classList.remove("swipe-pass-preview");
    } else if (currentX < -55) {
      card.classList.add("swipe-pass-preview");
      card.classList.remove("swipe-like-preview");
    } else {
      card.classList.remove("swipe-like-preview", "swipe-pass-preview");
    }
  });

  const finishSwipe = () => {
    if (!dragging) return;
    dragging = false;

    card.classList.remove("is-dragging", "swipe-like-preview", "swipe-pass-preview");

    if (currentX > 105) {
      card.style.transform = "";
      likeCurrentPet();
      return;
    }

    if (currentX < -105) {
      card.style.transform = "";
      advancePet("left");
      return;
    }

    card.style.transform = "";
  };

  card.addEventListener("pointerup", finishSwipe);
  card.addEventListener("pointercancel", finishSwipe);
}

function advancePet(direction = "left") {
  const card = petDeck?.querySelector("[data-pet-card]");

  if (!currentPet()) return;

  if (card) {
    card.classList.add(direction === "right" ? "is-leaving-right" : "is-leaving-left");
  }

  window.setTimeout(() => {
    petIndex += 1;
    renderPetDeck();
  }, 280);
}

function likeCurrentPet() {
  const pet = currentPet();
  if (!pet) return;

  favoritePetIds.add(pet.id);
  renderFavorites();
  showToast(`${pet.name} foi adicionado aos seus favoritos 💚`);
  advancePet("right");
}

function removeFavorite(id) {
  favoritePetIds.delete(id);
  renderFavorites();
}

function renderFavorites() {
  const selectedPets = pets.filter(pet => favoritePetIds.has(pet.id));

  favoriteCount.textContent = String(selectedPets.length);
  favoritesEmpty.style.display = selectedPets.length ? "none" : "flex";

  favoritesGrid.innerHTML = selectedPets.map(pet => `
    <article class="favorite-pet-card">
      <img src="${pet.image}" alt="${pet.name}">

      <div class="favorite-pet-body">
        <h4>${pet.name}</h4>
        <p>${pet.age} • ${pet.sex} • ${pet.size}</p>

        <div class="favorite-pet-actions">
          <button
            class="triage-launch"
            type="button"
            data-start-triage="${pet.id}"
            aria-label="Iniciar triagem para adotar ${pet.name}">
            Fazer triagem
          </button>

          <button
            type="button"
            data-remove-favorite="${pet.id}"
            aria-label="Remover ${pet.name} dos favoritos">
            ✕
          </button>
        </div>
      </div>
    </article>
  `).join("");

  favoritesGrid.querySelectorAll("[data-remove-favorite]").forEach(button => {
    button.addEventListener("click", () => {
      removeFavorite(Number(button.dataset.removeFavorite));
    });
  });

  favoritesGrid.querySelectorAll("[data-start-triage]").forEach(button => {
    button.addEventListener("click", () => {
      const pet = pets.find(item => item.id === Number(button.dataset.startTriage));
      startAdoptionTriage(pet);
    });
  });
}

function openPetModal(pet) {
  if (!pet || !petModal || !petModalContent) return;

  const alreadyFavorite = favoritePetIds.has(pet.id);

  petModalContent.innerHTML = `
    <div class="pet-modal-layout">
      <img class="pet-modal-photo" src="${pet.image}" alt="${pet.name}">

      <div class="pet-modal-info">
        <span class="eyebrow">${pet.species === "cao" ? "🐶 Cachorro" : "🐱 Gato"} para adoção</span>
        <h2 id="petModalTitle">${pet.name}</h2>
        <p class="pet-modal-subtitle">${pet.age} • ${pet.sex} • ${pet.size}</p>

        <div class="pet-facts">
          <div class="pet-fact">
            <small>Vacinação</small>
            <strong>${pet.vaccinated}</strong>
          </div>

          <div class="pet-fact">
            <small>Castração</small>
            <strong>${pet.neutered}</strong>
          </div>

          <div class="pet-fact">
            <small>Sexo</small>
            <strong>${pet.sex}</strong>
          </div>

          <div class="pet-fact">
            <small>Porte</small>
            <strong>${pet.size}</strong>
          </div>
        </div>

        <div class="pet-story">
          <h3>Sobre ${pet.name}</h3>
          <p>${pet.story}</p>
        </div>

        <div class="pet-temperament">
          <h3>Temperamento</h3>
          <div class="pet-tags">
            ${pet.temperament.map(tag => `<span class="pet-tag">${tag}</span>`).join("")}
          </div>
        </div>

        <div class="pet-modal-actions">
          <button
            class="btn btn-primary"
            type="button"
            id="startTriageFromPet">
            Fazer triagem para adotar ${pet.name} 🐾
          </button>

          <button class="btn btn-secondary" type="button" id="favoriteFromModal">
            ${alreadyFavorite ? "♥ Já está nos favoritos" : "♡ Adicionar aos favoritos"}
          </button>
        </div>
      </div>
    </div>
  `;

  petModal.classList.add("open");
  petModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  document.getElementById("favoriteFromModal")?.addEventListener("click", (event) => {
    favoritePetIds.add(pet.id);
    renderFavorites();
    event.currentTarget.textContent = "♥ Já está nos favoritos";
    showToast(`${pet.name} foi salvo nos seus favoritos 💚`);
  });

  document.getElementById("startTriageFromPet")?.addEventListener("click", () => {
    closePetModal();
    startAdoptionTriage(pet);
  });
}

function openCurrentPetModal() {
  openPetModal(currentPet());
}

function closePetModal() {
  petModal?.classList.remove("open");
  petModal?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

passPetButton?.addEventListener("click", () => advancePet("left"));
likePetButton?.addEventListener("click", likeCurrentPet);
openPetDetailsButton?.addEventListener("click", openCurrentPetModal);

document.querySelectorAll("[data-pet-filter]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-pet-filter]").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    petFilter = button.dataset.petFilter;
    visiblePets = petFilter === "todos"
      ? [...pets]
      : pets.filter(pet => pet.species === petFilter);

    petIndex = 0;
    renderPetDeck();
  });
});

clearFavoritesButton?.addEventListener("click", () => {
  favoritePetIds.clear();
  renderFavorites();
  showToast("Sua lista de favoritos foi limpa.");
});

document.querySelectorAll("[data-close-pet-modal]").forEach(element => {
  element.addEventListener("click", closePetModal);
});

document.addEventListener("keydown", (event) => {
  if (triageModal?.classList.contains("open")) {
    return;
  }

  if (petModal?.classList.contains("open")) {
    if (event.key === "Escape") closePetModal();
    return;
  }

  const adoptionSection = document.getElementById("adocao");
  if (!adoptionSection) return;

  const rect = adoptionSection.getBoundingClientRect();
  const adoptionVisible = rect.top < window.innerHeight * .65 && rect.bottom > window.innerHeight * .25;

  if (!adoptionVisible) return;

  if (event.key === "ArrowLeft") advancePet("left");
  if (event.key === "ArrowRight") likeCurrentPet();
});

renderPetDeck();
renderFavorites();


/* =========================================================
   AGENTE VIRTUAL DE TRIAGEM DE ADOÇÃO
   A triagem é orientativa. A decisão final sempre é humana.
   ========================================================= */

const triageModal = document.getElementById("triageModal");
const triagePetMini = document.getElementById("triagePetMini");
const triageChat = document.getElementById("triageChat");
const triageAnswerArea = document.getElementById("triageAnswerArea");
const triageStepLabel = document.getElementById("triageStepLabel");
const triageProgressPercent = document.getElementById("triageProgressPercent");
const triageProgressFill = document.getElementById("triageProgressFill");

let triagePet = null;
let triageStep = 0;
let triageAnswers = {};
let triageQuestions = [];
let triageResult = null;

function buildTriageQuestions(pet) {
  const speciesSafetyQuestion = pet?.species === "gato"
    ? {
        key: "safety",
        text: "Pensando na segurança do ambiente: janelas, sacadas e outros pontos de risco possuem telas ou você se compromete a instalar antes da adoção?",
        type: "options",
        options: [
          { label: "Sim, já é seguro", value: "secure", score: 15 },
          { label: "Ainda não, mas vou adequar antes", value: "will_secure", score: 8 },
          { label: "Não pretendo instalar proteção", value: "unsafe", score: -35, critical: true }
        ]
      }
    : pet?.species === "cao"
    ? {
        key: "safety",
        text: "O local onde o pet ficará é seguro, com portões/telas adequados e sem acesso livre à rua?",
        type: "options",
        options: [
          { label: "Sim, é seguro", value: "secure", score: 15 },
          { label: "Preciso fazer alguns ajustes antes", value: "will_secure", score: 7 },
          { label: "Ele teria acesso livre à rua", value: "unsafe", score: -35, critical: true }
        ]
      }
    : {
        key: "safety",
        text: "De forma geral, sua casa está preparada para manter um cão ou gato em segurança, sem acesso livre à rua e com possibilidade de instalar telas/portões quando necessário?",
        type: "options",
        options: [
          { label: "Sim, já está preparada", value: "secure", score: 15 },
          { label: "Posso fazer as adaptações necessárias", value: "will_secure", score: 8 },
          { label: "Não pretendo fazer adaptações", value: "unsafe", score: -35, critical: true }
        ]
      };

  const routineQuestion = pet?.species === "cao"
    ? {
        key: "routine",
        text: "Quanto tempo, em média, você consegue dedicar por dia a passeios, brincadeiras e interação com o pet?",
        type: "options",
        options: [
          { label: "Mais de 1 hora por dia", value: "high", score: 15 },
          { label: "Entre 30 e 60 minutos", value: "medium", score: 10 },
          { label: "Menos de 30 minutos", value: "low", score: -5 }
        ]
      }
    : {
        key: "routine",
        text: "Você consegue reservar tempo diariamente para interação, enriquecimento ambiental e cuidados com o pet?",
        type: "options",
        options: [
          { label: "Sim, todos os dias", value: "high", score: 15 },
          { label: "Na maior parte dos dias", value: "medium", score: 8 },
          { label: "Minha rotina é bem limitada", value: "low", score: -5 }
        ]
      };

  return [
    {
      key: "name",
      text: `Antes de começarmos: como posso chamar você durante a triagem para adoção de ${pet?.name || "este pet"}?`,
      type: "text",
      placeholder: "Digite seu primeiro nome",
      minLength: 2
    },
    {
      key: "age",
      text: "Qual é a sua faixa etária?",
      type: "options",
      options: [
        { label: "18 a 24 anos", value: "18_24", score: 5 },
        { label: "25 a 39 anos", value: "25_39", score: 7 },
        { label: "40 anos ou mais", value: "40_plus", score: 7 },
        { label: "Menor de 18 anos", value: "minor", score: -40, critical: true }
      ]
    },
    {
      key: "housing",
      text: "Como é a sua moradia e a permissão para ter animais?",
      type: "options",
      options: [
        { label: "Própria e permite pets", value: "owned_allowed", score: 12 },
        { label: "Alugada/condomínio e pets são permitidos", value: "rented_allowed", score: 12 },
        { label: "Ainda preciso confirmar a permissão", value: "unknown", score: -4 },
        { label: "O imóvel não permite pets", value: "not_allowed", score: -35, critical: true }
      ]
    },
    {
      key: "household",
      text: "Todas as pessoas que moram com você estão de acordo com a adoção?",
      type: "options",
      options: [
        { label: "Sim, todos estão de acordo", value: "all_agree", score: 15 },
        { label: "Moro sozinho(a)", value: "alone", score: 15 },
        { label: "Ainda não conversei com todos", value: "not_discussed", score: -8 },
        { label: "Há alguém que não concorda", value: "disagree", score: -30, critical: true }
      ]
    },
    speciesSafetyQuestion,
    {
      key: "aloneTime",
      text: "Em um dia comum, por quanto tempo o pet ficaria sozinho?",
      type: "options",
      options: [
        { label: "Até 4 horas", value: "0_4", score: 12 },
        { label: "De 5 a 7 horas", value: "5_7", score: 7 },
        { label: "De 8 a 10 horas", value: "8_10", score: 0 },
        { label: "Mais de 10 horas", value: "10_plus", score: -10 }
      ]
    },
    routineQuestion,
    {
      key: "financial",
      text: "Você consegue assumir alimentação, prevenção, consultas veterinárias e eventuais imprevistos de saúde?",
      type: "options",
      options: [
        { label: "Sim, consigo me planejar para isso", value: "yes", score: 15 },
        { label: "Consigo, mas precisarei organizar o orçamento", value: "planning", score: 7 },
        { label: "Hoje não consigo assumir esses custos", value: "no", score: -30, critical: true }
      ]
    },
    {
      key: "otherPets",
      text: "Existem outros animais na casa?",
      type: "options",
      options: [
        { label: "Não tenho outros pets", value: "none", score: 5 },
        { label: "Sim, vacinados/castrados e acompanhados", value: "responsible", score: 10 },
        { label: "Sim, mas ainda preciso regularizar alguns cuidados", value: "needs_care", score: -2 }
      ]
    },
    {
      key: "commitment",
      text: "Se houver mudança de casa, viagem longa, chegada de filhos ou alteração na rotina, qual é o seu plano em relação ao pet?",
      type: "options",
      options: [
        { label: "O pet seguirá comigo e vou adaptar a rotina", value: "lifetime", score: 18 },
        { label: "Eu tentaria reorganizar antes de decidir", value: "try", score: 5 },
        { label: "Talvez eu precisasse devolver/doar o animal", value: "uncertain", score: -25, critical: true }
      ]
    },
    {
      key: "motivation",
      text: pet
        ? `Para fechar: por que você gostaria de adotar ${pet.name}?`
        : "Para fechar: o que está motivando você a adotar um pet neste momento?",
      type: "textarea",
      placeholder: "Conte brevemente o que fez você se conectar com este pet...",
      minLength: 12
    }
  ];
}

function startAdoptionTriage(pet = null) {
  if (!triageModal) return;

  triagePet = pet;
  triageStep = 0;
  triageAnswers = {};
  triageResult = null;
  triageQuestions = buildTriageQuestions(pet);

  triagePetMini.innerHTML = pet
    ? `
      <article class="triage-pet-card">
        <img src="${pet.image}" alt="${pet.name}">
        <div>
          <small>Triagem para</small>
          <strong>${pet.name}</strong>
          <p>${pet.age} • ${pet.sex} • ${pet.size}</p>
        </div>
      </article>
    `
    : `
      <article class="triage-pet-card">
        <img
          src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=86"
          alt="Golden Retriever, mascote da secretária virtual Nala">
        <div>
          <small>Triagem geral</small>
          <strong>Perfil do adotante</strong>
          <p>Depois da triagem, um especialista poderá orientar sobre os pets compatíveis.</p>
        </div>
      </article>
    `;

  triageChat.innerHTML = "";
  triageAnswerArea.innerHTML = "";

  triageModal.classList.add("open");
  triageModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  addTriageMessage(
    "agent",
    pet
      ? `Que bom que você se interessou por ${pet.name}! 💚 Vou fazer algumas perguntas rápidas para entender se a rotina e o ambiente parecem compatíveis. Depois eu encaminho o resumo para um especialista da ONG.`
      : "Oi! 💚 Eu sou a Nala, secretária virtual de triagem. Antes de encaminhar você para um especialista, vou entender seu perfil, sua rotina e o ambiente onde um pet viveria."
  );

  window.setTimeout(() => renderTriageQuestion(), 250);
}

function closeTriage() {
  triageModal?.classList.remove("open");
  triageModal?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function addTriageMessage(role, text) {
  if (!triageChat) return;

  const message = document.createElement("div");
  message.className = `triage-message ${role}`;

  message.innerHTML = `
    <span class="triage-message-label">${role === "agent" ? "Nala • agente virtual" : "Você"}</span>
    <div class="triage-message-bubble"></div>
  `;

  message.querySelector(".triage-message-bubble").textContent = text;
  triageChat.appendChild(message);

  triageChat.scrollTop = triageChat.scrollHeight;
}

function updateTriageProgress() {
  const total = triageQuestions.length;
  const completed = Math.min(triageStep, total);
  const percent = total ? Math.round((completed / total) * 100) : 0;

  triageStepLabel.textContent = triageStep >= total
    ? "Triagem concluída"
    : `Pergunta ${Math.min(triageStep + 1, total)} de ${total}`;

  triageProgressPercent.textContent = `${percent}%`;
  triageProgressFill.style.width = `${percent}%`;
}

function renderTriageQuestion() {
  updateTriageProgress();

  if (triageStep >= triageQuestions.length) {
    finishTriage();
    return;
  }

  const question = triageQuestions[triageStep];

  addTriageMessage("agent", question.text);

  const isTextarea = question.type === "textarea";
  const hasOptions = question.type === "options";

  triageAnswerArea.innerHTML = `
    ${hasOptions ? `
      <div class="triage-quick-replies" aria-label="Sugestões de resposta">
        ${question.options.map((option, index) => `
          <button
            class="triage-option"
            type="button"
            data-triage-option="${index}">
            ${option.label}
          </button>
        `).join("")}
      </div>
    ` : ""}

    <div class="triage-composer">
      <div class="triage-composer-field">
        ${isTextarea
          ? `<textarea id="triageTextAnswer" rows="1" placeholder="${question.placeholder || "Digite sua resposta..."}"></textarea>`
          : `<input id="triageTextAnswer" type="text" autocomplete="off" placeholder="${hasOptions ? "Digite sua resposta ou escolha uma opção acima..." : (question.placeholder || "Digite sua resposta...")}">`
        }
      </div>

      <button class="triage-send" id="triageSendAnswer" type="button" aria-label="Enviar resposta">➤</button>
    </div>

    <p class="triage-helper">
      ${hasOptions
        ? "Você pode tocar em uma opção ou escrever sua resposta. Respostas livres serão revisadas pelo especialista humano."
        : "Pressione Enter para enviar. Suas respostas serão usadas somente para organizar este atendimento."
      }
    </p>
  `;

  const field = document.getElementById("triageTextAnswer");
  const sendButton = document.getElementById("triageSendAnswer");

  const moveToNextQuestion = () => {
    triageStep += 1;
    triageAnswerArea.innerHTML = "";
    window.setTimeout(renderTriageQuestion, 180);
  };

  if (hasOptions) {
    triageAnswerArea.querySelectorAll("[data-triage-option]").forEach(button => {
      button.addEventListener("click", () => {
        const option = question.options[Number(button.dataset.triageOption)];

        triageAnswers[question.key] = {
          value: option.value,
          label: option.label,
          score: option.score || 0,
          critical: Boolean(option.critical),
          manualReview: false
        };

        addTriageMessage("user", option.label);
        moveToNextQuestion();
      });
    });
  }

  const sendTypedAnswer = () => {
    const value = field.value.trim();

    if (value.length < (question.minLength || 1)) {
      field.focus();
      showToast("Escreva uma resposta para eu continuar a triagem.");
      return;
    }

    triageAnswers[question.key] = {
      value: hasOptions ? "free_text" : value,
      label: value,
      score: 0,
      critical: false,
      manualReview: hasOptions
    };

    addTriageMessage("user", value);
    moveToNextQuestion();
  };

  sendButton.addEventListener("click", sendTypedAnswer);

  field.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendTypedAnswer();
    }
  });

  if (isTextarea) {
    field.addEventListener("input", () => {
      field.style.height = "auto";
      field.style.height = `${Math.min(field.scrollHeight, 118)}px`;
    });
  }

  field.focus({ preventScroll: true });
}

function evaluateTriage() {
  const scoredAnswers = Object.values(triageAnswers).filter(answer =>
    answer && typeof answer.score === "number"
  );

  const rawScore = scoredAnswers.reduce((sum, answer) => sum + answer.score, 0);
  const maxPositive = 119;
  const normalizedScore = Math.max(0, Math.min(100, Math.round((rawScore / maxPositive) * 100)));

  const criticalKeys = Object.entries(triageAnswers)
    .filter(([, answer]) => answer?.critical)
    .map(([key]) => key);

  const strengths = [];
  const alerts = [];

  const manualReviewAnswers = Object.entries(triageAnswers)
    .filter(([, answer]) => answer?.manualReview)
    .map(([key]) => key);

  if (manualReviewAnswers.length) {
    alerts.push("Há respostas livres que precisam ser interpretadas pelo especialista humano.");
  }

  const valueOf = key => triageAnswers[key]?.value;

  if (["owned_allowed", "rented_allowed"].includes(valueOf("housing"))) {
    strengths.push("Moradia com permissão para pets.");
  } else if (valueOf("housing") === "unknown") {
    alerts.push("Confirmar autorização do imóvel/condomínio antes da adoção.");
  } else if (valueOf("housing") === "not_allowed") {
    alerts.push("A moradia informada não permite pets no momento.");
  }

  if (["all_agree", "alone"].includes(valueOf("household"))) {
    strengths.push("Ambiente familiar favorável à adoção.");
  } else if (valueOf("household") === "not_discussed") {
    alerts.push("Ainda é necessário alinhar a adoção com todos os moradores.");
  } else if (valueOf("household") === "disagree") {
    alerts.push("Há divergência entre os moradores sobre a adoção.");
  }

  if (valueOf("safety") === "secure") {
    strengths.push("Ambiente relatado como seguro para o pet.");
  } else if (valueOf("safety") === "will_secure") {
    alerts.push("O ambiente precisa ser adequado antes da adoção.");
  } else if (valueOf("safety") === "unsafe") {
    alerts.push("Foi relatado risco de acesso à rua ou falta de proteção adequada.");
  }

  if (valueOf("financial") === "yes") {
    strengths.push("Há planejamento para os custos regulares e veterinários.");
  } else if (valueOf("financial") === "planning") {
    alerts.push("Vale detalhar o planejamento financeiro para os cuidados do pet.");
  } else if (valueOf("financial") === "no") {
    alerts.push("Hoje os custos essenciais do pet não parecem sustentáveis.");
  }

  if (valueOf("commitment") === "lifetime") {
    strengths.push("Demonstra compromisso de longo prazo com o animal.");
  } else if (valueOf("commitment") === "try") {
    alerts.push("A equipe deve aprofundar o plano para futuras mudanças de rotina.");
  } else if (valueOf("commitment") === "uncertain") {
    alerts.push("Há risco de devolução em mudanças futuras de vida ou rotina.");
  }

  if (["0_4", "5_7"].includes(valueOf("aloneTime"))) {
    strengths.push("Tempo sozinho relatado dentro de uma rotina mais favorável.");
  } else if (valueOf("aloneTime") === "10_plus") {
    alerts.push("O pet ficaria sozinho por um período prolongado diariamente.");
  }

  if (valueOf("routine") === "high") {
    strengths.push("Boa disponibilidade para interação e rotina diária.");
  } else if (valueOf("routine") === "low") {
    alerts.push("Disponibilidade diária de interação pode ser limitada para este pet.");
  }

  if (valueOf("age") === "minor") {
    alerts.push("O processo precisa ser conduzido por um responsável maior de 18 anos.");
  }

  if (valueOf("otherPets") === "responsible") {
    strengths.push("Outros animais da casa recebem cuidados preventivos relatados.");
  } else if (valueOf("otherPets") === "needs_care") {
    alerts.push("Há cuidados pendentes com outros animais da residência.");
  }

  let status = "review";
  let title = "Compatibilidade a confirmar";
  let description = "Seu perfil tem pontos positivos, mas a equipe precisa conversar sobre alguns detalhes antes de avançar.";
  let resultClass = "review";

  if (criticalKeys.length === 0 && normalizedScore >= 72) {
    status = "compatible";
    title = "Perfil compatível para avançar";
    description = triagePet
      ? `Pelas respostas fornecidas, há bons sinais de compatibilidade para conversar com a equipe sobre ${triagePet.name}.`
      : "Pelas respostas fornecidas, há bons sinais para avançar e conversar com um especialista sobre os pets mais compatíveis com seu perfil.";
    resultClass = "compatible";
  } else if (criticalKeys.length >= 2 || normalizedScore < 38) {
    status = "guidance";
    title = "Alguns pontos precisam ser ajustados";
    description = "A triagem encontrou fatores importantes que merecem orientação da equipe antes de seguir com uma possível adoção.";
    resultClass = "guidance";
  }

  return {
    score: normalizedScore,
    status,
    title,
    description,
    resultClass,
    strengths: strengths.length ? strengths : ["Interesse em conhecer melhor o processo de adoção."],
    alerts: alerts.length ? alerts : ["Nenhum alerta relevante identificado nesta triagem inicial."]
  };
}

function buildTriageHandoffText() {
  const answer = key => triageAnswers[key]?.label || "Não informado";

  const strengths = triageResult.strengths.map(item => `• ${item}`).join("\n");
  const alerts = triageResult.alerts.map(item => `• ${item}`).join("\n");

  return [
    "🐾 *TRIAGEM DE ADOÇÃO — AQUI E AGORA PET*",
    "",
    `*Pet de interesse:* ${triagePet ? triagePet.name : "Ainda não selecionado"}`,
    `*Candidato(a):* ${answer("name")}`,
    `*Resultado orientativo:* ${triageResult.title}`,
    `*Índice interno de compatibilidade:* ${triageResult.score}/100`,
    "",
    "*Perfil informado*",
    `• Faixa etária: ${answer("age")}`,
    `• Moradia: ${answer("housing")}`,
    `• Concordância da casa: ${answer("household")}`,
    `• Segurança do ambiente: ${answer("safety")}`,
    `• Tempo sozinho: ${answer("aloneTime")}`,
    `• Rotina/interação: ${answer("routine")}`,
    `• Capacidade de custos: ${answer("financial")}`,
    `• Outros pets: ${answer("otherPets")}`,
    `• Compromisso futuro: ${answer("commitment")}`,
    "",
    "*Motivação*",
    answer("motivation"),
    "",
    "*Pontos positivos identificados*",
    strengths,
    "",
    "*Pontos para validar com o atendente*",
    alerts,
    "",
    "_Triagem automática inicial. A aprovação da adoção depende da avaliação humana da ONG._"
  ].join("\n");
}

function buildTriageHandoffPayload() {
  return {
    createdAt: new Date().toISOString(),
    channel: "site",
    type: "adoption_triage",
    pet: triagePet
      ? {
          id: triagePet.id,
          name: triagePet.name,
          species: triagePet.species,
          age: triagePet.age,
          sex: triagePet.sex,
          size: triagePet.size
        }
      : null,
    adopter: {
      name: triageAnswers.name?.label || "",
      motivation: triageAnswers.motivation?.label || ""
    },
    answers: triageAnswers,
    result: triageResult,
    formattedSummary: buildTriageHandoffText()
  };
}

async function sendTriageToSpecialist(payload) {
  /*
    FLUXO DE PRODUÇÃO
    -----------------
    1. O front envia a triagem ao backend.
    2. O backend escolhe o especialista disponível.
    3. O backend salva a triagem no CRM/base da ONG.
    4. O backend notifica o especialista via integração oficial
       (ex.: WhatsApp Business Platform / CRM / fila omnichannel).
    5. O backend devolve ao site o especialista designado.

    Sem backend/API conectados, um site HTML estático não consegue
    enviar silenciosamente uma mensagem para o WhatsApp do especialista.
  */

  try {
    const response = await fetch(HANDOFF_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Falha no handoff: ${response.status}`);
    }

    const data = await response.json();

    if (!data.specialistWhatsapp) {
      throw new Error("Backend não retornou o WhatsApp do especialista.");
    }

    return {
      specialistName: data.specialistName || "especialista da ONG",
      specialistWhatsapp: data.specialistWhatsapp
    };

  } catch (error) {
    /*
      Em desenvolvimento local, registramos a triagem para facilitar testes.
      Isso NÃO substitui o backend de produção.
    */
    localStorage.setItem(
      "aquiAgoraPet:lastTriageHandoff",
      JSON.stringify(payload)
    );

    throw error;
  }
}

function finishTriage() {
  triageResult = evaluateTriage();
  updateTriageProgress();

  addTriageMessage(
    "agent",
    `Obrigada, ${triageAnswers.name?.label || "por responder"}! Organizei suas respostas. Agora vou mostrar um resumo para você revisar antes de enviar à equipe.`
  );

  const strengthsHtml = triageResult.strengths
    .map(item => `<li>${escapeHtml(item)}</li>`)
    .join("");

  const alertsHtml = triageResult.alerts
    .map(item => `<li>${escapeHtml(item)}</li>`)
    .join("");

  triageAnswerArea.innerHTML = `
    <div class="triage-result">
      <article class="triage-result-card ${triageResult.resultClass}">
        <span class="triage-result-status">
          ${triageResult.status === "compatible" ? "💚" : triageResult.status === "review" ? "💛" : "🧡"}
          ${triageResult.title}
        </span>

        <h3>${triagePet ? `${triagePet.name} + ` : ""}${escapeHtml(triageAnswers.name?.label || "você")}</h3>
        <p>${triageResult.description}</p>

        <div class="triage-result-columns">
          <div class="triage-summary-box">
            <strong>Pontos positivos</strong>
            <ul>${strengthsHtml}</ul>
          </div>

          <div class="triage-summary-box">
            <strong>Para conversar com a ONG</strong>
            <ul>${alertsHtml}</ul>
          </div>
        </div>

        <label class="triage-consent">
          <input type="checkbox" id="triageConsent">
          <span>
            Autorizo o encaminhamento deste resumo de triagem para o especialista da ONG
            que dará continuidade ao atendimento${triagePet ? ` sobre ${triagePet.name}` : ""}.
          </span>
        </label>

        <div class="triage-handoff-actions">
          <button
            class="specialist-whatsapp-button"
            id="triageWhatsApp"
            type="button">
            Autorize o envio para continuar
          </button>

          <button
            class="triage-copy-summary"
            id="copyTriageSummary"
            type="button"
            aria-label="Copiar resumo da triagem"
            title="Copiar resumo">
            ⧉
          </button>
        </div>

        <div class="specialist-handoff-status" id="specialistHandoffStatus">
          A triagem ainda não foi encaminhada para nenhum especialista.
        </div>

        <button class="triage-restart" id="restartTriage" type="button">
          Refazer triagem
        </button>
      </article>

      <p class="triage-note">
        A triagem é um apoio para o atendimento e não substitui entrevista, visita,
        documentação ou outros critérios definidos pela ONG.
      </p>
    </div>
  `;

  const consent = document.getElementById("triageConsent");
  const whatsappButton = document.getElementById("triageWhatsApp");
  const copySummaryButton = document.getElementById("copyTriageSummary");
  const restartButton = document.getElementById("restartTriage");

  const handoffStatus = document.getElementById("specialistHandoffStatus");

  consent?.addEventListener("change", () => {
    if (!consent.checked) {
      whatsappButton.classList.remove("enabled");
      whatsappButton.textContent = "Autorize o envio para continuar";
      handoffStatus.className = "specialist-handoff-status";
      handoffStatus.textContent = "A triagem ainda não foi encaminhada para nenhum especialista.";
      return;
    }

    whatsappButton.classList.add("enabled");
    whatsappButton.textContent = "Encaminhar triagem e falar com especialista →";
    handoffStatus.className = "specialist-handoff-status";
    handoffStatus.textContent = "Pronto para encaminhar sua triagem ao especialista disponível.";
  });

  whatsappButton?.addEventListener("click", async () => {
    if (!consent?.checked) return;

    whatsappButton.classList.add("loading");
    whatsappButton.textContent = "Encaminhando triagem...";
    handoffStatus.className = "specialist-handoff-status sending";
    handoffStatus.textContent = "Localizando um especialista disponível e enviando o resumo da triagem.";

    const payload = buildTriageHandoffPayload();

    try {
      const handoff = await sendTriageToSpecialist(payload);

      handoffStatus.className = "specialist-handoff-status sent";
      handoffStatus.textContent = `Triagem encaminhada para ${handoff.specialistName}. Abrindo o WhatsApp para você continuar o atendimento.`;

      whatsappButton.textContent = `Falar com ${handoff.specialistName} no WhatsApp →`;

      const userMessage = triagePet
        ? `Olá, ${handoff.specialistName}! Acabei de concluir minha triagem no site para adoção de ${triagePet.name}.`
        : `Olá, ${handoff.specialistName}! Acabei de concluir minha triagem de adoção no site.`;

      window.setTimeout(() => {
        const url = `https://wa.me/${handoff.specialistWhatsapp}?text=${encodeURIComponent(userMessage)}`;
        window.open(url, "_blank", "noopener,noreferrer");
        whatsappButton.classList.remove("loading");
        whatsappButton.classList.add("enabled");
      }, 650);

    } catch (error) {
      console.error(error);

      handoffStatus.className = "specialist-handoff-status error";
      handoffStatus.textContent = "Não foi possível encaminhar automaticamente agora. O atendimento poderá continuar pelo canal de contingência.";

      whatsappButton.textContent = "Abrir especialista de contingência →";
      whatsappButton.classList.remove("loading");
      whatsappButton.classList.add("enabled");

      window.setTimeout(() => {
        const message = buildTriageHandoffText();
        const url = `https://wa.me/${FALLBACK_SPECIALIST_WHATSAPP}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      }, 650);
    }
  });

  copySummaryButton?.addEventListener("click", async () => {
    const summary = buildTriageHandoffText();

    try {
      await navigator.clipboard.writeText(summary);
      showToast("Resumo da triagem copiado.");
    } catch {
      const temp = document.createElement("textarea");
      temp.value = summary;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      temp.remove();
      showToast("Resumo da triagem copiado.");
    }
  });

  restartButton?.addEventListener("click", () => {
    startAdoptionTriage(triagePet);
  });
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.querySelectorAll("[data-close-triage]").forEach(element => {
  element.addEventListener("click", closeTriage);
});

document.getElementById("openTriageSecretary")?.addEventListener("click", () => {
  startAdoptionTriage(null);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && triageModal?.classList.contains("open")) {
    closeTriage();
  }
});


/* =========================================================
   DOAÇÃO
   ========================================================= */

const pixKeyElement = document.getElementById("pixKey");
const copyPix = document.getElementById("copyPix");
const donateButton = document.getElementById("donateButton");
const donationValue = document.getElementById("donationValue");
const customAmount = document.getElementById("customAmount");
const frequencyLabel = document.getElementById("frequencyLabel");
const paymentSummary = document.getElementById("paymentSummary");
const cardPaymentPanel = document.getElementById("cardPaymentPanel");
const pixPaymentPanel = document.getElementById("pixPaymentPanel");
const cardDonationForm = document.getElementById("cardDonationForm");
const recurringNote = document.getElementById("recurringNote");

const pixKey = pixKeyElement?.textContent.trim() || "";

document.querySelectorAll(".amount-btn").forEach(button => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".amount-btn")
      .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
    customAmount.value = "";
    selectedAmount = Number(button.dataset.value);

    updateDonationSummary();
  });
});

customAmount?.addEventListener("input", () => {
  const value = Number(customAmount.value);

  if (value > 0) {
    document
      .querySelectorAll(".amount-btn")
      .forEach(btn => btn.classList.remove("active"));

    selectedAmount = value;
    updateDonationSummary();
  }
});

document.querySelectorAll("[data-frequency]").forEach(button => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll("[data-frequency]")
      .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    selectedFrequency = button.dataset.frequency;
    frequencyLabel.textContent = selectedFrequency;

    updateRecurringNote();
  });
});

document.querySelectorAll("[data-payment-method]").forEach(button => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll("[data-payment-method]")
      .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
    selectedPaymentMethod = button.dataset.paymentMethod;

    cardPaymentPanel.classList.toggle("active", selectedPaymentMethod === "card");
    pixPaymentPanel.classList.toggle("active", selectedPaymentMethod === "pix");

    updateDonationSummary();
  });
});

document.querySelectorAll("[data-card-type]").forEach(button => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll("[data-card-type]")
      .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
    selectedCardType = button.dataset.cardType;

    updateDonationSummary();
    updateRecurringNote();
  });
});

function updateRecurringNote() {
  if (!recurringNote) return;

  if (selectedFrequency === "mensal" && selectedCardType === "debito") {
    recurringNote.textContent =
      "Atenção: débito recorrente não é oferecido por todos os gateways. Na versão real, essa opção deverá aparecer somente se o provedor contratado suportar cobrança recorrente no débito.";
  } else if (selectedFrequency === "mensal") {
    recurringNote.textContent =
      "Na versão real, o cartão será tokenizado pelo gateway para permitir a cobrança mensal sem armazenar os dados sensíveis no site da ONG.";
  } else {
    recurringNote.textContent =
      "Na versão publicada, os dados do cartão devem ser enviados diretamente para o gateway de pagamento e convertidos em um token seguro.";
  }
}

function updateDonationSummary() {
  donationValue.textContent = selectedAmount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  });

  if (selectedPaymentMethod === "pix") {
    paymentSummary.textContent = "PIX";
    donateButton.textContent = `Copiar PIX para doar ${formatCurrency(selectedAmount)} 🐾`;
  } else {
    paymentSummary.textContent = `cartão de ${selectedCardType === "credito" ? "crédito" : "débito"}`;
    donateButton.textContent = `Contribuir com ${formatCurrency(selectedAmount)} 💚`;
  }
}

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  });
}

const cardNumberInput = document.getElementById("cardNumber");
const cardExpiryInput = document.getElementById("cardExpiry");
const cardCvvInput = document.getElementById("cardCvv");

cardNumberInput?.addEventListener("input", (event) => {
  const digits = event.target.value.replace(/\D/g, "").slice(0, 16);
  event.target.value = digits.replace(/(.{4})/g, "$1 ").trim();
});

cardExpiryInput?.addEventListener("input", (event) => {
  const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
  event.target.value = digits.length > 2
    ? `${digits.slice(0, 2)}/${digits.slice(2)}`
    : digits;
});

cardCvvInput?.addEventListener("input", (event) => {
  event.target.value = event.target.value.replace(/\D/g, "").slice(0, 4);
});

async function copyPixKey() {
  try {
    await navigator.clipboard.writeText(pixKey);
    showToast("Chave PIX copiada 🐾");
  } catch {
    const temp = document.createElement("textarea");
    temp.value = pixKey;

    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();

    showToast("Chave PIX copiada 🐾");
  }
}

copyPix?.addEventListener("click", copyPixKey);

function validateCardForm() {
  if (!cardDonationForm) return false;

  const requiredFields = [...cardDonationForm.querySelectorAll("[required]")];
  let valid = true;

  requiredFields.forEach(field => {
    const empty = !field.value.trim();
    field.classList.toggle("invalid", empty);
    if (empty) valid = false;
  });

  const cardDigits = cardNumberInput?.value.replace(/\D/g, "") || "";
  if (cardDigits.length < 13) {
    cardNumberInput?.classList.add("invalid");
    valid = false;
  }

  const expiryValid = /^\d{2}\/\d{2}$/.test(cardExpiryInput?.value || "");
  if (!expiryValid) {
    cardExpiryInput?.classList.add("invalid");
    valid = false;
  }

  const cvvValid = /^\d{3,4}$/.test(cardCvvInput?.value || "");
  if (!cvvValid) {
    cardCvvInput?.classList.add("invalid");
    valid = false;
  }

  return valid;
}

cardDonationForm?.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", () => input.classList.remove("invalid"));
});

donateButton?.addEventListener("click", async () => {
  if (selectedPaymentMethod === "pix") {
    await copyPixKey();

    donateButton.textContent = "PIX copiado! Obrigado 💚";

    window.setTimeout(() => updateDonationSummary(), 2400);
    return;
  }

  if (!validateCardForm()) {
    showToast("Confira os dados do cartão antes de continuar.");
    return;
  }

  /*
    IMPORTANTE PARA PRODUÇÃO:
    - NÃO enviar dados brutos do cartão para um backend próprio.
    - NÃO salvar número completo do cartão nem CVV.
    - Usar o SDK/tokenização do gateway de pagamento contratado.
    - O token retornado pelo gateway é que deve ser associado à doação.
  */

  showToast(
    selectedFrequency === "mensal"
      ? "Protótipo pronto: em produção, o gateway criará a contribuição mensal."
      : "Protótipo pronto: em produção, o gateway processará esta contribuição."
  );

  donateButton.textContent = "Dados validados ✓";

  window.setTimeout(() => updateDonationSummary(), 2600);
});

updateDonationSummary();
updateRecurringNote();

/* =========================================================
   NAVEGAÇÃO ATIVA
   ========================================================= */

const sections = [...document.querySelectorAll("main section[id]")];
const navAnchors = [...document.querySelectorAll(".nav-links a")];

const activeObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  navAnchors.forEach(anchor => {
    anchor.classList.toggle(
      "active",
      anchor.getAttribute("href") === "#" + visible.target.id
    );
  });
}, {
  rootMargin: "-30% 0px -60% 0px",
  threshold: [0, .1, .4, .7]
});

sections.forEach(section => activeObserver.observe(section));


// Header scroll effect and logo contrast detection
window.addEventListener("scroll", () => {
  const header = document.getElementById("header")
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
  
  // Update logo color based on background contrast
  updateLogoContrast()
})

// Function to detect background contrast and update logo color
function updateLogoContrast() {
  const logo = document.querySelector('.logo')
  if (!logo) return
  
  const headerRect = document.getElementById('header').getBoundingClientRect()
  const centerY = headerRect.top + headerRect.height / 2
  
  // Get the element behind the header at the center point
  const elementBehind = document.elementFromPoint(window.innerWidth / 2, centerY + headerRect.height)
  
  if (!elementBehind) return
  
  // Check if we're over a dark section
  const isDarkSection = elementBehind.closest('.hero, .requirements, .trust-indicators, .footer') !== null
  
  if (isDarkSection) {
    logo.classList.remove('dark-logo')
    logo.classList.add('light-logo')
  } else {
    logo.classList.remove('light-logo')
    logo.classList.add('dark-logo')
  }
}



document.getElementById("currentYear").textContent = new Date().getFullYear()

// Testimonial slider functionality
let currentSlide = 0
const testimonialSlider = document.getElementById("testimonialSlider")
const testimonialSlides = document.querySelectorAll(".testimonial-slide")
const dotsContainer = document.getElementById("testimonialDots")
const prevButton = document.getElementById("prevTestimonial")
const nextButton = document.getElementById("nextTestimonial")

// Create dots
if (testimonialSlides.length > 0 && dotsContainer) {
  testimonialSlides.forEach((_, index) => {
    const dot = document.createElement("div")
    dot.classList.add("testimonial-dot")
    if (index === 0) dot.classList.add("active")
    dot.addEventListener("click", () => goToSlide(index))
    dotsContainer.appendChild(dot)
  })
}

function updateSlider() {
  if (!testimonialSlider) return
  testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`

  // Update dots
  document.querySelectorAll(".testimonial-dot").forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add("active")
    } else {
      dot.classList.remove("active")
    }
  })
}

function goToSlide(index) {
  if (!testimonialSlider) return
  currentSlide = index
  updateSlider()
}

function nextSlide() {
  if (!testimonialSlider || !testimonialSlides.length) return
  currentSlide = (currentSlide + 1) % testimonialSlides.length
  updateSlider()
}

function prevSlide() {
  if (!testimonialSlider || !testimonialSlides.length) return
  currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length
  updateSlider()
}

// Add event listeners for testimonial controls
if (prevButton) {
  prevButton.addEventListener("click", (e) => {
    e.preventDefault()
    prevSlide()
  })
}

if (nextButton) {
  nextButton.addEventListener("click", (e) => {
    e.preventDefault()
    nextSlide()
  })
}

// Initialize slider on page load
document.addEventListener("DOMContentLoaded", () => {
  updateSlider()

  // Auto-advance testimonials
  setInterval(nextSlide, 5000)
})

// Accordion functionality
document.querySelectorAll(".accordion-button").forEach((button) => {
  button.addEventListener("click", () => {
    // Toggle active class on the clicked button
    button.classList.toggle("active")

    // Close all other accordion items
    document.querySelectorAll(".accordion-button").forEach((otherButton) => {
      if (otherButton !== button) {
        otherButton.classList.remove("active")
      }
    })
  })
})

// Requirements Tabs functionality
function initRequirementsTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabButtons.length === 0) return;
  
  // Set first tab as active by default
  tabButtons[0].classList.add('active');
  tabContents[0].classList.add('active');
  
  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Remove active class from all tabs and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      button.classList.add('active');
      tabContents[index].classList.add('active');
    });
  });
}

// Initialize requirements tabs when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initRequirementsTabs();
  updateLogoContrast(); // Initialize logo contrast detection
});

// Chatbot functionality
let step = 1
const userData = {
  nombre: "",
  email: "",
  sector: "",
  celular: "",
  razonPrestamo: "",
  referido: "",
  salario: "",
  referencias: "",
  embargos: "",
  qualified: false,
  rejectionReason: "",
}

const WEBHOOK_URL = "https://hook.us2.make.com/o63acpuru7c2j3vn4x4xljnlmhy23fqx"
const chatbotMessages = document.getElementById("chatbotMessages")
const userInput = document.getElementById("userInput")
const sendButton = document.getElementById("sendButton")
const botProfilePic = "https://cdn.lulopanama.com/lulo-logo-frontal.png"
const userProfilePic =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23808080'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"

// Function to get referral data from URL parameter ?r=name9434
function getReferralData() {
  const urlParams = new URLSearchParams(window.location.search);
  const referralCode = urlParams.get("r");
  if (referralCode) {
    const nameMatch = referralCode.match(/^([a-zA-Z]+)/);
    const referrerName = nameMatch ? nameMatch[0] : null;
    return {
      code: referralCode,
      username: nameMatch ? nameMatch[0] : referralCode,
      name: referrerName ? referrerName.charAt(0).toUpperCase() + referrerName.slice(1).toLowerCase() : null,
    };
  }
  
  return null;
}

const referralData = getReferralData()

setTimeout(() => {
  if (referralData && referralData.name) {
    addBotMessage(`¡Hola! Gracias a la recomendación de ${referralData.name}, tienes prioridad en nuestro proceso de pre-calificación.`)
  } else {
    addBotMessage("¡Hola! ¿Necesitas un préstamo?")
  }
  setTimeout(() => {
    addBotMessage("¿Cuál es tu nombre?")
    // Show suggestion pills only at the beginning
    showSuggestionPills()
  }, 1000)
}, 500)

function showSuggestionPills() {
  const suggestionPills = document.querySelector('.input-suggestions')
  if (suggestionPills && step === 1) {
    suggestionPills.style.display = 'flex'
    
    // Add click handlers for suggestion pills
    document.querySelectorAll('.suggestion-pill').forEach(pill => {
      pill.addEventListener('click', function() {
        const text = this.textContent.trim()
        if (text === '💰 Necesito un préstamo') {
          addUserMessage('Necesito un préstamo')
          hideSuggestionPills()
          setTimeout(() => {
            addBotMessage("¡Perfecto! Te ayudo con eso. ¿Cuál es tu nombre?")
          }, 500)
        } else if (text === '❓ ¿Cómo funciona?') {
          addUserMessage('¿Cómo funciona?')
          hideSuggestionPills()
          setTimeout(() => {
            addBotMessage("Te explico rápidamente: te ayudamos a pre-calificarte para préstamos con nuestros socios bancarios. Primero necesito algunos datos. ¿Cuál es tu nombre?")
          }, 500)
        }
      })
    })
  }
}

function hideSuggestionPills() {
  const suggestionPills = document.querySelector('.input-suggestions')
  if (suggestionPills) {
    suggestionPills.style.display = 'none'
  }
}

function addBotMessage(message, options = null, includeReferralInfo = false) {
  const containerDiv = document.createElement("div")
  containerDiv.className = "message-container bot-container"
  const avatarImg = document.createElement("img")
  avatarImg.src = botProfilePic
  avatarImg.alt = "Lulo"
  avatarImg.className = "message-avatar"
  containerDiv.appendChild(avatarImg)
  const messageDiv = document.createElement("div")
  messageDiv.className = "message bot-message"

  const textNode = document.createTextNode(message + (options || includeReferralInfo ? " " : ""))
  messageDiv.appendChild(textNode)

  if (includeReferralInfo) {
    const referralDiv = document.createElement("div")
    referralDiv.className = "referral-highlight"
    referralDiv.innerHTML =
      "💰 <strong>¡Gana dinero!</strong> Únete a nuestro programa de referidos y gana el 1% del monto de cada préstamo que refieras. ¡Imagina recibir $250 por referir un préstamo de $25,000!"
    const referralButtonDiv = document.createElement("div")
    referralButtonDiv.className = "sector-options"
    const referralButton = document.createElement("div")
    referralButton.className = "sector-option"
    referralButton.textContent = "Quiero unirme al programa de referidos"
    referralButton.onclick = redirectToReferralProgram
    referralButtonDiv.appendChild(referralButton)
    referralDiv.appendChild(referralButtonDiv)
    messageDiv.appendChild(referralDiv)
  }

  if (options) {
    const optionsDiv = document.createElement("div")
    optionsDiv.className = "sector-options"
    options.forEach((optionText) => {
      const optionDiv = document.createElement("div")
      optionDiv.className = "sector-option"
      optionDiv.textContent = optionText
      optionDiv.onclick = () => handleOption(optionText)
      optionsDiv.appendChild(optionDiv)
    })
    messageDiv.appendChild(optionsDiv)
    userInput.disabled = true
    sendButton.disabled = true
  }

  containerDiv.appendChild(messageDiv)
  chatbotMessages.appendChild(containerDiv)
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight
}

function addUserMessage(message) {
  const containerDiv = document.createElement("div")
  containerDiv.className = "message-container user-container"
  const avatarImg = document.createElement("img")
  avatarImg.src = userProfilePic
  avatarImg.alt = "User"
  avatarImg.className = "message-avatar"
  containerDiv.appendChild(avatarImg)
  const messageDiv = document.createElement("div")
  messageDiv.className = "message user-message"
  messageDiv.textContent = message
  containerDiv.appendChild(messageDiv)
  chatbotMessages.appendChild(containerDiv)
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight
}

function disableChat() {
  userInput.disabled = true
  sendButton.disabled = true
  const reloadDiv = document.createElement("div")
  reloadDiv.className = "reload-suggestion"
  reloadDiv.textContent = "Recarga la página para comenzar de nuevo"
  chatbotMessages.appendChild(reloadDiv)
  sendDataToWebhook()
}

function showRejectionMessage() {
  let reason = ""
  if (userData.sector === "Empresa Privada" && userData.salario < 1200) {
    reason = "tu salario es menor a $1,200 y trabajas en empresa privada."
    userData.rejectionReason = "salario_bajo_empresa_privada"
  } else if (
    (userData.sector === "Especialista del Gobierno" || userData.sector === "Administrativo del Gobierno") &&
    userData.salario < 800
  ) {
    reason = "tu salario es menor a $800 y trabajas en el gobierno."
    userData.rejectionReason = "salario_bajo_gobierno"
  } else if (userData.sector === "Jubilado" && userData.salario < 300) {
    reason = "tu ingreso de jubilación es menor a $300."
    userData.rejectionReason = "ingreso_bajo_jubilado"
  } else if (userData.embargos === "Sí") {
    reason = "actualmente tienes embargos activos."
    userData.rejectionReason = "embargos_activos"
  }
  userData.qualified = false
  addBotMessage(`Lo siento, en este momento no aplicas para un préstamo personal con nuestros socios porque ${reason}`)
  
  setTimeout(() => {
    // Inyectar HTML para la tarjeta moderna de referidos
    const upsellHTML = `
        <div class="referral-upsell-card">
            <div class="upsell-icon"><i class="fas fa-gift"></i></div>
            <h4>¡Aún puedes ganar dinero!</h4>
            <p>Aunque no califiques para un préstamo ahora, puedes unirte a nuestro programa de referidos.</p>
            <p>Gana el <strong>1%</strong> de cada préstamo aprobado que refieras.</p>
            <button onclick="redirectToReferralProgram()" class="upsell-btn">Unirme al programa</button>
        </div>
    `;
    
    const containerDiv = document.createElement("div")
    containerDiv.className = "message-container bot-container"
    const avatarImg = document.createElement("img")
    avatarImg.src = botProfilePic
    avatarImg.alt = "Lulo"
    avatarImg.className = "message-avatar"
    containerDiv.appendChild(avatarImg)
    
    const messageDiv = document.createElement("div")
    messageDiv.className = "message bot-message"
    messageDiv.style.background = "transparent";
    messageDiv.style.border = "none";
    messageDiv.style.padding = "0";
    messageDiv.innerHTML = upsellHTML;
    
    containerDiv.appendChild(messageDiv)
    chatbotMessages.appendChild(containerDiv)
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
    
    disableChat()
  }, 1500)
}

function redirectToReferralProgram() {
  sendDataToWebhook()
  window.location.href = "/referidos"
}

function handleOption(option) {
  addUserMessage(option)
  userInput.disabled = false
  sendButton.disabled = false

  if (step === 2) {
    // Sector selection
    userData.sector = option
    step++
    setTimeout(() => {
      const incomeLabel = userData.sector === "Jubilado" ? "ingreso" : "salario"
      addBotMessage(`¿De cuánto es tu ${incomeLabel}? (En USD)`)
      userInput.type = "number"
      userInput.placeholder = "Ingresa el monto en USD"
      userInput.focus()
    }, 500)
  } else if (step === 4) {
    // Reason for loan
    userData.razonPrestamo = option
    step++
    setTimeout(() => {
      addBotMessage("¿Tienes buenas referencias?", ["Sí", "No"])
    }, 500)
  } else if (step === 5) {
    // References
    userData.referencias = option
    if (userData.sector === "Especialista del Gobierno" || userData.sector === "Administrativo del Gobierno") {
      step++
      setTimeout(() => {
        addBotMessage("¿Tienes embargos?", ["Sí", "No"])
      }, 500)
    } else {
      askForEmail()
    }
  } else if (
    step === 6 &&
    (userData.sector === "Especialista del Gobierno" || userData.sector === "Administrativo del Gobierno")
  ) {
    // Embargos for Gov
    userData.embargos = option
    if (option === "Sí") {
      showRejectionMessage()
      return
    }
    askForEmail()
  } else if (step === 9 && !referralData) {
    // Referred? (only if not from link)
    if (option === "Sí") {
      step++
      setTimeout(() => {
        addBotMessage("Por favor, ingresa tu código de referido")
        userInput.type = "text"
        userInput.removeAttribute("inputmode")
        userInput.placeholder = "Código de referido"
        userInput.focus()
      }, 500)
    } else {
      userData.qualified = true
      showSuccessMessage()
    }
  }
}

function askForEmail() {
  step = 7
  userInput.disabled = false
  sendButton.disabled = false
  setTimeout(() => {
    addBotMessage("¿Cuál es tu correo electrónico?")
    userInput.type = "email"
    userInput.placeholder = "ejemplo@correo.com"
    userInput.focus()
  }, 500)
}

function askForPhone() {
  step = 8
  userInput.disabled = false
  sendButton.disabled = false
  setTimeout(() => {
    addBotMessage("¿Cuál es tu número de celular?")
    userInput.type = "tel"
    userInput.setAttribute("inputmode", "numeric")
    userInput.value = "+507 6"
    userInput.placeholder = "+507 6XXX-XXXX"
    userInput.focus()
  }, 500)
}

function askReferidoQuestion() {
  step = 9
  if (referralData) {
    userData.referido = referralData.code
    userData.qualified = true
    showSuccessMessage()
  } else {
    userInput.disabled = true
    sendButton.disabled = true
    setTimeout(() => {
      addBotMessage("¿Fuiste referido?", ["Sí", "No"])
    }, 500)
  }
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

userInput.addEventListener("input", function (e) {
  if (step === 8) {
    // Phone number step
    let currentValue = this.value

    // Ensure the prefix +507 6 is always there
    if (!currentValue.startsWith("+507 6")) {
      if (
        currentValue.startsWith("+507 ") &&
        currentValue.length >= 6 &&
        currentValue.charAt(6) !== "6" &&
        !isNaN(currentValue.charAt(6))
      ) {
        currentValue = "+507 6" + currentValue.substring(6)
      } else {
        this.value = "+507 6"
        currentValue = this.value
      }
    }

    const numbersOnly = currentValue.substring(6).replace(/[^\d]/g, "")

    let formatted = "+507 6"
    if (numbersOnly.length > 0) {
      formatted += numbersOnly.substring(0, 3)
      if (numbersOnly.length > 3) {
        formatted += "-" + numbersOnly.substring(3, 7)
      }
    }

    if (this.value !== formatted) {
      let cursorPos = this.selectionStart
      if (
        formatted.length > this.value.length &&
        formatted.charAt(cursorPos - 1) === "-" &&
        this.value.charAt(cursorPos - 1) !== "-"
      ) {
        cursorPos++
      } else if (
        formatted.length < this.value.length &&
        this.value.charAt(cursorPos) === "-" &&
        formatted.charAt(cursorPos) !== "-"
      ) {
        cursorPos--
      }
      this.value = formatted
      this.setSelectionRange(cursorPos, cursorPos)
    }

    if (this.selectionStart < 7) {
      this.setSelectionRange(7, 7)
    }
  }
})

function showSuccessMessage() {
  userData.qualified = true
  addBotMessage("¡Gracias por completar el formulario! Nos pondremos en contacto contigo pronto.")
  
  setTimeout(() => {
    addBotMessage("📧 Por favor revisa tu correo electrónico inmediatamente (busca también en spam), te hemos enviado los pasos finales para tu desembolso.")
    disableChat()
  }, 1500)
}

function sendMessage() {
  const message = userInput.value.trim()

  if (step === 8) {
    // Phone input
    const phoneRegex = /^\+507 6\d{3}-\d{4}$/
    if (!phoneRegex.test(message)) {
      addBotMessage("Por favor, ingresa un número válido de Panamá (ej: +507 6123-4567).")
      userInput.value = "+507 6"
      userInput.focus()
      return
    }
  } else {
    if (!message) return
  }

  addUserMessage(message)

  if (step !== 8) {
    userInput.value = ""
  }
  userInput.placeholder = "Escribe aquí..."

  if (step === 1) {
    // Name
    userData.nombre = message
    hideSuggestionPills() // Hide suggestion pills after name input
    step = 2
    setTimeout(() => {
      addBotMessage("Elige el sector al que perteneces.", [
        "Especialista del Gobierno",
        "Administrativo del Gobierno",
        "Empresa Privada",
        "Jubilado",
      ])
    }, 500)
  } else if (step === 2) {
    // This step is now handled by handleOption for sector selection
    return
  } else if (step === 3) {
    // Salary
    const salary = Number.parseFloat(message)
    if (isNaN(salary) || salary <= 0) {
      addBotMessage("Por favor, ingresa un monto de salario válido.")
      userInput.focus()
      return
    }
    userData.salario = salary
    if (
      (userData.sector === "Empresa Privada" && salary < 1200) ||
      ((userData.sector === "Especialista del Gobierno" || userData.sector === "Administrativo del Gobierno") &&
        salary < 800) ||
      (userData.sector === "Jubilado" && salary < 300)
    ) {
      showRejectionMessage()
      return
    }
    step = 4
    userInput.type = "text"
    userInput.removeAttribute("inputmode")
    setTimeout(() => {
      addBotMessage("¿Cuál es la razón de tu préstamo personal?", [
        "Consolidación de deudas",
        "Remodelación de vivienda",
        "Compra de vehículo",
        "Otros gastos",
      ])
    }, 500)
  } else if (step === 7) {
    // Email
    if (!validateEmail(message)) {
      addBotMessage("Por favor, ingresa un correo electrónico válido.")
      userInput.focus()
      return
    }
    userData.email = message
    askForPhone()
  } else if (step === 8) {
    // Phone (already validated)
    userData.celular = message
    userInput.value = ""
    userInput.type = "text"
    userInput.removeAttribute("inputmode")
    askReferidoQuestion()
  } else if (step === 10) {
    // Referral code
    userData.referido = message
    showSuccessMessage()
  }
}

function sendDataToWebhook() {
  userData.timestamp = new Date().toISOString()
  if (referralData && !userData.referido) {
    userData.referido = referralData.code
  }

  const webhookData = { 
    ...userData, 
    completedFlow: true, 
    source: window.location.href, 
    userAgent: navigator.userAgent,
    referralSource: referralData ? {
      code: referralData.code,
      username: referralData.username,
      name: referralData.name
    } : null
  }
  
  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(webhookData),
  })
    .then((response) => {
      if (!response.ok) console.error("Error sending data to webhook:", response.statusText)
      return response.json()
    })
    .then((data) => console.log("Webhook response:", data))
    .catch((error) => console.error("Error sending data to webhook:", error))
}

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !sendButton.disabled) {
    sendMessage()
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      })
    }
  })
})

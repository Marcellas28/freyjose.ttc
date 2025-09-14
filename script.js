// Course data
const courses = [
  
]

// Mobile menu functionality
function toggleMobileMenu() {
  const nav = document.querySelector(".nav")
  const menuBtn = document.querySelector(".mobile-menu-btn")
  const icon = menuBtn.querySelector("i")

  if (nav.style.display === "flex") {
    nav.style.display = "none"
    icon.className = "fas fa-bars"
  } else {
    nav.style.display = "flex"
    icon.className = "fas fa-times"
  }
}

// Populate courses
function populateCourses(container = ".courses-grid", coursesToShow = courses) {
  const coursesGrid = document.querySelector(container)
  if (!coursesGrid) return

  coursesGrid.innerHTML = coursesToShow
    .map(
      (course) => `
        <div class="course-card" data-category="${course.category}">
            <div class="course-header">
                <div class="course-icon ${course.iconClass}">
                    <i class="${course.icon}"></i>
                </div>
                ${course.featured ? '<div class="course-badge">Featured</div>' : ""}
            </div>
            <h4>${course.title}</h4>
            <p class="course-description">${course.description}</p>
            <div class="course-tags">
                ${course.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <div class="course-details">
                <div class="course-meta">
                    <div><i class="fas fa-clock"></i> ${course.duration}</div>
                    <div><i class="fas fa-calendar"></i> ${course.mode}</div>
                </div>
                <div class="course-stats">
                    <div class="course-price">${course.price}</div>
                    <div class="course-students">${course.students}</div>
                </div>
            </div>
            <button class="btn btn-primary btn-full">
                <i class="fas fa-arrow-right"></i>
                Learn More
            </button>
        </div>
    `,
    )
    .join("")
}

function populateFeaturedCourses() {
  const featuredCourses = courses.filter((course) => course.featured)
  populateCourses("#featuredCourses", featuredCourses)
}

function initCourseFiltering() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const courseCards = document.querySelectorAll(".course-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      const filter = button.getAttribute("data-filter")

      // Filter courses
      if (filter === "all") {
        populateCourses("#allCourses", courses)
      } else {
        const filteredCourses = courses.filter((course) => course.category === filter)
        populateCourses("#allCourses", filteredCourses)
      }

      // Add animation to new cards
      setTimeout(() => {
        document.querySelectorAll(".course-card").forEach((card, index) => {
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"
          setTimeout(() => {
            card.style.transition = "all 0.3s ease"
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, index * 100)
        })
      }, 50)
    })
  })
}

function animateCounters() {
  const counters = document.querySelectorAll("[data-count]")

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const target = Number.parseInt(counter.getAttribute("data-count"))
        const duration = 2000
        const step = target / (duration / 16)
        let current = 0

        const updateCounter = () => {
          current += step
          if (current < target) {
            counter.textContent = Math.floor(current)
            requestAnimationFrame(updateCounter)
          } else {
            counter.textContent = target
          }
        }

        updateCounter()
        observer.unobserve(counter)
      }
    })
  }, observerOptions)

  counters.forEach((counter) => observer.observe(counter))
}

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll("[data-aos]")

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target
        const delay = element.getAttribute("data-aos-delay") || 0

        setTimeout(() => {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }, delay)

        observer.unobserve(element)
      }
    })
  }, observerOptions)

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
    observer.observe(element)
  })
}

function handleContactForm() {
  const contactForm = document.getElementById("contactForm")
  if (!contactForm) return

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    // Basic validation
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      showNotification("Please fill in all required fields.", "error")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      showNotification("Please enter a valid email address.", "error")
      return
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
    submitBtn.disabled = true

    // Simulate form submission
    setTimeout(() => {
      showNotification("Thank you for your message! We will get back to you within 24 hours.", "success")
      contactForm.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

function initParallaxEffect() {
  const heroSections = document.querySelectorAll(".hero, .courses-hero")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset

    heroSections.forEach((hero) => {
      const shapes = hero.querySelectorAll(".shape")
      shapes.forEach((shape, index) => {
        const speed = 0.5 + index * 0.2
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
      })
    })
  })
}

function initCourseCardAnimations() {
  const courseCards = document.querySelectorAll(".course-card")

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  courseCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
    observer.observe(card)
  })
}

function initSmoothScrolling() {
  // Placeholder for smooth scrolling initialization
  // This function should be defined elsewhere or imported
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Populate courses based on page
  if (document.querySelector("#featuredCourses")) {
    populateFeaturedCourses()
  }

  if (document.querySelector("#allCourses")) {
    populateCourses("#allCourses", courses)
    initCourseFiltering()
  } else {
    populateCourses()
  }

  // Initialize all features
  handleContactForm()
  initSmoothScrolling()
  animateCounters()
  initScrollAnimations()
  initParallaxEffect()
  initCourseCardAnimations()

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const nav = document.querySelector(".nav")
    const menuBtn = document.querySelector(".mobile-menu-btn")

    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
      nav.style.display = "none"
      const icon = menuBtn.querySelector("i")
      icon.className = "fas fa-bars"
    }
  })
})

// Responsive navigation
window.addEventListener("resize", () => {
  const nav = document.querySelector(".nav")
  if (window.innerWidth > 768) {
    nav.style.display = "flex"
  } else {
    nav.style.display = "none"
  }
})

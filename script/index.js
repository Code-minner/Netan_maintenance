function createIntenseFlickerEffect() {
    const text = document.getElementById('flickerText');
    const originalText = text.textContent;
    
    // Clear existing content
    text.innerHTML = '';
    
    // Create spans for each letter
    const letters = originalText.split('').map(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('letter');
        text.appendChild(span);
        return span;
    });

    function getRandomOpacity() {
        // More extreme opacity changes, including potential complete disappearance
        const rand = Math.random();
        if (rand < 0.3) return 0;      // 30% chance of complete disappearance
        if (rand < 0.6) return 0.1;    // 30% chance of near-invisible
        return 1;                      // 40% chance of full visibility
    }

    function flicker() {
        letters.forEach(letter => {
            // Skip flickering for spaces
            if (letter.textContent.trim() === '') return;

            // More aggressive flickering
            letter.style.opacity = getRandomOpacity();
        });
    }

    // Flicker more frequently
    const flickerInterval = setInterval(flicker, 50);

    // Stop flickering after 10 seconds
    setTimeout(() => {
        clearInterval(flickerInterval);
        // Restore full visibility
        letters.forEach(letter => {
            letter.style.opacity = '1';
        });
    }, 3000);
}

// Initialize the effect when the page loads
createIntenseFlickerEffect();




const shapeContainer = document.querySelector('.shape-container');

function createLine() {
  const line = document.createElement('div');
  line.classList.add('line');

  // Random position
  line.style.left = `${Math.random() * 100}vw`;
  line.style.top = `${Math.random() * 100}vh`;
  line.style.animationDelay = `${Math.random() * 3}s`;

  shapeContainer.appendChild(line);

  // Remove line after 6 seconds
  setTimeout(() => {
    line.remove();
  }, 4000);
}

// Generate lines every 400ms






class SideTextAnimator {
    constructor() {
        this.leftPositions = [];
        this.rightPositions = [];
        this.currentTextIndex = 0;
    }

    createPositionGrid() {
        const verticalSpacing = window.innerHeight / (texts.length + 1);
        
        // Create evenly spaced positions for both sides
        for (let i = 1; i <= texts.length; i++) {
            this.leftPositions.push(verticalSpacing * i);
            this.rightPositions.push(verticalSpacing * i);
        }
    }

    createRandomText() {
        // If positions haven't been calculated, do so
        if (this.leftPositions.length === 0) {
            this.createPositionGrid();
        }

        // Alternate between left and right sides
        const isLeftSide = this.currentTextIndex % 2 === 0;
        
        // Create text element
        const textElement = document.createElement('div');
        textElement.classList.add('text-container');
        
        // Select text
        textElement.textContent = texts[this.currentTextIndex % texts.length];
        
        // Position logic
        if (isLeftSide) {
            textElement.style.left = '20px';
            textElement.style.top = `${this.leftPositions[0]}px`;
            this.leftPositions.shift();
        } else {
            textElement.style.right = '20px';
            textElement.style.top = `${this.rightPositions[0]}px`;
            this.rightPositions.shift();
        }
        
        // Random color
        textElement.style.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        
        // Add to body
        document.body.appendChild(textElement);
        
        // Trigger reflow to enable transition
        textElement.offsetWidth;
        
        // Animate opacity and scale
        textElement.style.opacity = '1';
        textElement.style.transform = 'scale(1)';
        
        // Remove after animation
        setTimeout(() => {
            textElement.style.opacity = '0';
            textElement.style.transform = 'scale(0)';
            
            // Remove from DOM after fade out
            setTimeout(() => {
                document.body.removeChild(textElement);
            }, 1000);
        }, 2000);

        // Increment text index
        this.currentTextIndex++;
    }

    startAnimation() {
        // Create a new text every 1.5 seconds
        this.animationInterval = setInterval(() => {
            // Stop if we've gone through all texts multiple times
            if (this.currentTextIndex >= texts.length * 3) {
                clearInterval(this.animationInterval);
                return;
            }
            this.createRandomText();
        }, 1500);
    }
}

// Initialize and start animation when page loads
window.onload = () => {
    const animator = new SideTextAnimator();
    animator.startAnimation();
};




function startPersistentTimer() {
    const ONE_DAY_IN_SECONDS = 24 * 60 * 60;
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if the end time is already stored in localStorage
    let endTime = localStorage.getItem('timerEndTime');

    if (!endTime) {
      // If no end time exists, set it to 24 hours from now
      endTime = currentTime + ONE_DAY_IN_SECONDS;
      localStorage.setItem('timerEndTime', endTime);
    }

    function updateTimer() {
      const now = Math.floor(Date.now() / 1000);
      let remainingTime = endTime - now;

      if (remainingTime <= 0) {
        // Reset the timer when it reaches 0
        endTime = now + ONE_DAY_IN_SECONDS;
        localStorage.setItem('timerEndTime', endTime);
        remainingTime = ONE_DAY_IN_SECONDS;
      }

      // Calculate hours, minutes, and seconds
      const hours = Math.floor(remainingTime / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);
      const seconds = remainingTime % 60;

      // Update the DOM
      document.getElementById('hours').innerHTML = `${String(hours).padStart(2, '0')} <span>Hours</span>`;
      document.getElementById('minutes').innerHTML = `${String(minutes).padStart(2, '0')} <span>Minutes</span>`;
      document.getElementById('seconds').innerHTML = `${String(seconds).padStart(2, '0')} <span>Seconds</span>`;
    }

    // Update the timer every second
    setInterval(updateTimer, 1000);
    updateTimer(); // Call immediately to avoid delay
  }

  // Initialize the persistent timer
  startPersistentTimer();



  ScrollReveal().reveal('.bottom', { delay: 0, origin: 'bottom', interval: 300, distance: '300px', duration: 2000, reset: false });
  ScrollReveal().reveal('.left', { delay: 0, origin: 'left', interval: 300, distance: '50px', duration: 2000, reset: false });
  ScrollReveal().reveal('.right', { delay: 0, origin: 'right', interval: 300, distance: '50px', duration: 2000, reset: false });

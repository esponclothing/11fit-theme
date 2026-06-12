const fs = require('fs');
const file_path = 'c:/Users/HP/Desktop/11fit theme/sections/11fit-3d-deal.liquid';
let content = fs.readFileSync(file_path, 'utf-8');

const new_script = `<script>
(function() {
  function initLuxeDeal(wrapper) {
    if (wrapper.dataset.initialized === 'true') return;
    wrapper.dataset.initialized = 'true';

    const sectionId = wrapper.id.replace('luxe-wrapper-', '');
    
    // --- 1. ELEGANT COUNTDOWN TIMER ---
    const timerHours = parseInt(wrapper.getAttribute('data-timer')) || 12;
    const hrEl = document.getElementById('luxeHr-' + sectionId);
    const minEl = document.getElementById('luxeMin-' + sectionId);
    const secEl = document.getElementById('luxeSec-' + sectionId);
    
    let endTime = localStorage.getItem('luxe_timer_' + sectionId);
    if (!endTime || new Date().getTime() > endTime) {
      endTime = new Date().getTime() + (timerHours * 60 * 60 * 1000);
      localStorage.setItem('luxe_timer_' + sectionId, endTime);
    }

    function updateTimer() {
      let now = new Date().getTime();
      let distance = endTime - now;
      if (distance < 0) {
        endTime = new Date().getTime() + (timerHours * 60 * 60 * 1000);
        localStorage.setItem('luxe_timer_' + sectionId, endTime);
        distance = endTime - now;
      }
      let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let s = Math.floor((distance % (1000 * 60)) / 1000);
      
      if(hrEl) hrEl.innerText = (h < 10 ? '0' : '') + h;
      if(minEl) minEl.innerText = (m < 10 ? '0' : '') + m;
      if(secEl) secEl.innerText = (s < 10 ? '0' : '') + s;
    }
    updateTimer(); 
    const timerInterval = setInterval(updateTimer, 1000);

    // --- 2. ROBUST SLIDER LOGIC ---
    const track = document.getElementById('luxeTrack-' + sectionId);
    if (!track) return;
    
    const slides = Array.from(track.querySelectorAll('.luxe-slide'));
    const dots = document.querySelectorAll('#luxeDots-' + sectionId + ' .luxe-dot');
    
    const textArea = document.getElementById('luxeTextArea-' + sectionId);
    const titleEl = document.getElementById('luxeTitle-' + sectionId);
    const priceEl = document.getElementById('luxePrice-' + sectionId);
    const compareEl = document.getElementById('luxeCompare-' + sectionId);
    const btnEl = document.getElementById('luxeBtn-' + sectionId);
    
    const speed = parseInt(wrapper.getAttribute('data-speed')) || 4000;
    let currentIndex = 0;
    let autoPlayInterval = null;
    let swipeDirection = 1;
    let isPriceUnlocked = false; 

    if (slides.length < 1) return;

    // UNLOCK BUTTON LOGIC - PRESS AND HOLD TO UNLOCK
    let holdTimeout = null;
    let holdInterval = null;
    let holdPercent = 0;
    let isHolding = false;

    const btnProgress = btnEl.querySelector('.luxe-btn-progress');
    const btnText = btnEl.querySelector('.luxe-btn-text');

    function startHold(e) {
      if (isPriceUnlocked || isHolding) return;
      isHolding = true;
      holdPercent = 0;
      btnEl.classList.add('is-holding');

      holdInterval = setInterval(() => {
        if (holdPercent < 100) {
          holdPercent += 5;
          if (btnProgress) btnProgress.style.width = holdPercent + '%';
        } else {
          clearInterval(holdInterval);
        }
      }, 50);

      holdTimeout = setTimeout(() => {
        triggerUnlock();
      }, 1000);
    }

    function cancelHold() {
      if (isPriceUnlocked || !isHolding) return;
      isHolding = false;
      btnEl.classList.remove('is-holding');
      clearTimeout(holdTimeout);
      clearInterval(holdInterval);

      if (btnProgress) {
        btnProgress.style.transition = 'width 0.3s ease-out';
        btnProgress.style.width = '0%';
        setTimeout(() => {
          btnProgress.style.transition = 'none';
        }, 300);
      }
    }

    function triggerUnlock() {
      isHolding = false;
      clearTimeout(holdTimeout);
      clearInterval(holdInterval);
      isPriceUnlocked = true;
      stopAutoPlay();

      if (btnProgress) btnProgress.style.width = '100%';

      const activeSlide = slides[currentIndex];
      if (!activeSlide) return;
      priceEl.innerHTML = '<span class="luxe-unlocked-text">' + activeSlide.getAttribute('data-price') + '</span>';
      
      if (activeSlide.getAttribute('data-compare')) {
        compareEl.innerText = activeSlide.getAttribute('data-compare');
        compareEl.classList.add('is-visible');
      }

      btnEl.classList.add('unlocked-shake');
      
      setTimeout(() => {
        btnEl.classList.remove('is-locked');
        btnEl.classList.add('is-unlocked');
        if (btnText) btnText.innerText = 'Add To Bag';
        btnEl.href = activeSlide.getAttribute('data-url');
        if (btnProgress) btnProgress.style.display = 'none';
        btnEl.classList.remove('unlocked-shake');
      }, 400);

      createGoldParticles(btnEl);
    }

    function createGoldParticles(parent) {
      const rect = parent.getBoundingClientRect();
      const count = 30;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.style.position = 'fixed';
        p.style.width = Math.random() * 6 + 4 + 'px';
        p.style.height = p.style.width;
        p.style.background = 'radial-gradient(circle, #fff, #c5a059)';
        p.style.borderRadius = '50%';
        p.style.pointerEvents = 'none';
        p.style.zIndex = '99999';
        
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        p.style.left = startX + 'px';
        p.style.top = startY + 'px';
        
        document.body.appendChild(p);

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 4;
        let vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed - 2;
        let opacity = 1;
        let scale = 1;
        let currentX = startX;
        let currentY = startY;

        const anim = setInterval(() => {
          currentX += vx;
          currentY += vy;
          vy += 0.35;
          vx *= 0.96;
          opacity -= 0.03;
          scale -= 0.02;
          
          p.style.left = currentX + 'px';
          p.style.top = currentY + 'px';
          p.style.opacity = opacity;
          p.style.transform = \`scale(\${scale})\`;

          if (opacity <= 0 || scale <= 0) {
            clearInterval(anim);
            p.remove();
          }
        }, 16);
      }
    }

    btnEl.addEventListener('mousedown', startHold);
    btnEl.addEventListener('touchstart', startHold, {passive: true});

    window.addEventListener('mouseup', cancelHold);
    window.addEventListener('touchend', cancelHold);
    btnEl.addEventListener('mouseleave', cancelHold);

    btnEl.addEventListener('click', function(e) {
      if (!isPriceUnlocked) {
        e.preventDefault();
      }
    });

    function updateTextForSlide(index) {
      if (!slides[index]) return;
      textArea.classList.add('is-fading');
      
      setTimeout(() => {
        const activeSlide = slides[index];
        titleEl.innerText = activeSlide.getAttribute('data-title') || '';
        
        isPriceUnlocked = false;
        priceEl.innerHTML = '<span class="luxe-locked-text">••••••</span>';
        compareEl.innerText = '';
        compareEl.classList.remove('is-visible');
        
        btnEl.classList.add('is-locked');
        btnEl.classList.remove('is-unlocked');
        const slideBtnText = btnEl.querySelector('.luxe-btn-text');
        const slideBtnProgress = btnEl.querySelector('.luxe-btn-progress');
        if (slideBtnText) slideBtnText.innerText = 'Hold to Unlock';
        if (slideBtnProgress) {
          slideBtnProgress.style.display = 'block';
          slideBtnProgress.style.width = '0%';
        }
        btnEl.href = '#'; 
        
        textArea.classList.remove('is-fading');
      }, 400);
    }

    function updateActiveDot(index) {
      dots.forEach(d => d.classList.remove('is-active'));
      if(dots[index]) dots[index].classList.add('is-active');
    }

    let scrollTimeout;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const slideWidth = track.clientWidth;
        if (slideWidth === 0) return;
        const newIndex = Math.round(track.scrollLeft / slideWidth);
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < slides.length) {
          currentIndex = newIndex;
          updateActiveDot(currentIndex);
          updateTextForSlide(currentIndex);
        }
      }, 50);
    }, {passive: true});

    updateTextForSlide(0);
    updateActiveDot(0);

    function scrollToSlide(index) {
      if (slides[index]) {
        try {
            track.scrollLeft = index * track.clientWidth;
        } catch (e) {
            console.error('Scroll error', e);
        }
      }
    }

    function autoScroll() {
      if (slides.length <= 1) return;
      if (currentIndex >= slides.length - 1 && swipeDirection === 1) {
        swipeDirection = -1;
      } else if (currentIndex <= 0 && swipeDirection === -1) {
        swipeDirection = 1;
      }
      const nextIndex = currentIndex + swipeDirection;
      scrollToSlide(nextIndex);
    }

    function startAutoPlay() { 
      if (slides.length <= 1) return;
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(autoScroll, speed); 
    }
    
    function stopAutoPlay() { 
      if (autoPlayInterval) clearInterval(autoPlayInterval);
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        stopAutoPlay();
        const clickedIndex = parseInt(e.currentTarget.getAttribute('data-index'));
        scrollToSlide(clickedIndex);
        if(!isPriceUnlocked) startAutoPlay();
      });
    });

    const prevBtn = document.getElementById('luxePrev-' + sectionId);
    const nextBtn = document.getElementById('luxeNext-' + sectionId);

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        let nextIdx = currentIndex - 1;
        if (nextIdx < 0) nextIdx = slides.length - 1;
        scrollToSlide(nextIdx);
        if(!isPriceUnlocked) startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        let nextIdx = currentIndex + 1;
        if (nextIdx >= slides.length) nextIdx = 0;
        scrollToSlide(nextIdx);
        if(!isPriceUnlocked) startAutoPlay();
      });
    }

    track.addEventListener('touchstart', stopAutoPlay, {passive: true});
    track.addEventListener('touchend', () => { if(!isPriceUnlocked) startAutoPlay(); }, {passive: true});
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', () => { if(!isPriceUnlocked) startAutoPlay(); });

    let isDown = false;
    let startX;
    let scrollLeft;

    // VERY IMPORTANT FIX: Only use drag logic on non-touch pointer events!
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      isDown = true;
      track.classList.add('dragging');
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.style.scrollSnapType = 'none';
      stopAutoPlay();
    });
    
    track.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'mouse' || !isDown) return;
      isDown = false;
      track.classList.remove('dragging');
      snapToClosest();
    });
    
    track.addEventListener('pointerup', (e) => {
      if (e.pointerType !== 'mouse' || !isDown) return;
      isDown = false;
      track.classList.remove('dragging');
      snapToClosest();
    });
    
    track.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse' || !isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5; 
      track.scrollLeft = scrollLeft - walk;
    });

    function snapToClosest() {
      track.style.scrollSnapType = 'x mandatory';
      const index = Math.round(track.scrollLeft / track.clientWidth);
      scrollToSlide(Math.max(0, Math.min(index, slides.length - 1)));
      if(!isPriceUnlocked) startAutoPlay();
    }

    startAutoPlay();
  }

  function initAll() {
    document.querySelectorAll('.luxe-wrapper').forEach(initLuxeDeal);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function(event) {
      if (event.target.classList && event.target.classList.contains('shopify-section')) {
        const wrapper = event.target.querySelector('.luxe-wrapper');
        if (wrapper) initLuxeDeal(wrapper);
      } else if (event.target.querySelector) {
        const wrapper = event.target.querySelector('.luxe-wrapper');
        if (wrapper) initLuxeDeal(wrapper);
      }
    });
  }
})();
</script>`;

content = content.replace(/<script>[\s\S]*?<\/script>/i, new_script);
fs.writeFileSync(file_path, content, 'utf-8');
console.log('Successfully updated the file!');

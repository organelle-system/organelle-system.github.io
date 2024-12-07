document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image lightbox');
    document.body.appendChild(lightbox);
  
    const images = document.querySelectorAll('.gallery-item img');
    images.forEach(image => {
      image.addEventListener('click', e => {
        openLightbox(image.src, image.alt);
      });
      image.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          openLightbox(image.src, image.alt);
        }
      });
      image.setAttribute('tabindex', '0');
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `View larger image: ${image.alt}`);
    });
  
    lightbox.addEventListener('click', e => {
      if (e.target !== e.currentTarget) return;
      closeLightbox();
    });
  
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  
    function openLightbox(src, alt) {
      lightbox.classList.add('active');
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;
      
      const closeButton = document.createElement('button');
      closeButton.innerHTML = '&times;';
      closeButton.className = 'lightbox-close';
      closeButton.setAttribute('aria-label', 'Close lightbox');
      closeButton.addEventListener('click', closeLightbox);
  
      const container = document.createElement('div');
      container.className = 'lightbox-container';
      container.appendChild(img);
      container.appendChild(closeButton);
  
      while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild);
      }
      lightbox.appendChild(container);
      closeButton.focus();
  
      // Center the image after it's loaded
      img.onload = function() {
        container.style.width = img.width > window.innerWidth * 0.9 ? '90%' : 'auto';
        container.style.height = img.height > window.innerHeight * 0.9 ? '90%' : 'auto';
      };
    }
  
    function closeLightbox() {
      lightbox.classList.remove('active');
      const focusedImage = document.querySelector('.gallery-item img:focus');
      if (focusedImage) {
        focusedImage.focus();
      }
    }
  });
  
  
document.querySelectorAll('.project-image').forEach(container => {
    const images = container.querySelectorAll('img');
    if (images.length <= 1) return;

    let x = 0;
    let interval = null;

    container.addEventListener('mouseenter', () => {
        interval = setInterval(() => {
            images[x].style.display = 'none';
            x = (x + 1) % images.length;
            images[x].style.display = 'block';
        }, 800);
    });

    container.addEventListener('mouseleave', () => {
        clearInterval(interval);
        images.forEach((img, i) => img.style.display = i === 0 ? 'block' : 'none');
        x = 0;
    });
});
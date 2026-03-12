const container = document.getElementById('postersContainer');
const posters = document.querySelectorAll('.poster-item');

let currentIndex = 0;

function selectPoster(index) {
    posters.forEach(p => p.classList.remove('selected'));
    posters[index].classList.add('selected');
    currentIndex = index;
}

selectPoster(0);
document.querySelectorAll('.frame-arrow').forEach(arrow => {
    arrow.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const posterItem = arrow.closest('.poster-item');
        const currentIdx = parseInt(posterItem.dataset.index);
        const direction = arrow.dataset.direction;
        
        let nextIdx;
        if (direction === 'prev') {
            nextIdx = (currentIdx - 1 + posters.length) % posters.length;
        } else {
            nextIdx = (currentIdx + 1) % posters.length;
        }

        selectPoster(nextIdx);

        const posterWidth = posters[0].offsetWidth;
        container.scrollTo({
            left: nextIdx * posterWidth,
            behavior: 'smooth'
        });
    });
});


window.addEventListener('load', () => {
    const posterWidth = posters[0].offsetWidth;
    const containerWidth = container.offsetWidth;
    container.scrollLeft = 0 - (containerWidth / 2) + (posterWidth / 2);
});

container.addEventListener('wheel', (e) => {
    e.preventDefault();
    container.scrollLeft += e.deltaY;
}, { passive: false });

let isDragging = false;
let startX;
let scrollLeft;
let dragThreshold = 5; 
let dragDistance = 0;

container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.style.cursor = 'grabbing';
    dragDistance = 0;
});

container.addEventListener('mouseleave', () => {
    isDragging = false;
    container.style.cursor = 'grab';
});

container.addEventListener('mouseup', (e) => {
    isDragging = false;
    container.style.cursor = 'grab';
    
    if (dragDistance < dragThreshold) {
        const containerCenter = container.scrollLeft + container.offsetWidth / 2;
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        posters.forEach((poster, index) => {
            const posterCenter = poster.offsetLeft + poster.offsetWidth / 2;
            const distance = Math.abs(posterCenter - containerCenter);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });
        
        selectPoster(closestIndex);
    }
});

container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
    
    dragDistance += Math.abs(walk);
});

container.addEventListener('scroll', () => {
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    posters.forEach((poster, index) => {
        const posterLeft = poster.offsetLeft;
        const posterRight = posterLeft + poster.offsetWidth;
        const posterCenter = posterLeft + poster.offsetWidth / 2;
        
        const isVisible = (posterLeft < container.scrollLeft + container.offsetWidth) && 
                         (posterRight > container.scrollLeft);
        
        if (isVisible) {
            const distance = Math.abs(posterCenter - containerCenter);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        }
    });

    if (closestIndex !== currentIndex) {
        selectPoster(closestIndex);
    }
});

function selectPoster(index) {
    posters.forEach(p => p.classList.remove('selected'));
    posters[index].classList.add('selected');
    currentIndex = index;
}

document.querySelectorAll('.frame-arrow').forEach(arrow => {
    arrow.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        const posterItem = arrow.closest('.poster-item');
        const currentIdx = parseInt(posterItem.dataset.index);
        const direction = arrow.dataset.direction;
        
        let nextIdx;
        if (direction === 'prev') {
            nextIdx = (currentIdx - 1 + posters.length) % posters.length;
        } else {
            nextIdx = (currentIdx + 1) % posters.length;
        }
        
        selectPoster(nextIdx);

        const posterWidth = posters[0].offsetWidth;
        const containerWidth = container.offsetWidth;
        let scrollPosition;
        
        if (nextIdx === 0) {
            scrollPosition = 0;
        } else if (nextIdx === posters.length - 1) {
            scrollPosition = container.scrollWidth - containerWidth;
        } else {
            scrollPosition = nextIdx * posterWidth - (containerWidth / 2) + (posterWidth / 2);
        }
        
        container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });
});

selectPoster(0);
container.style.cursor = 'grab';

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIdx = (currentIndex - 1 + posters.length) % posters.length;
        selectPoster(prevIdx);
        const posterWidth = posters[0].offsetWidth;
        container.scrollTo({
            left: prevIdx * posterWidth,
            behavior: 'smooth'
        });
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIdx = (currentIndex + 1) % posters.length;
        selectPoster(nextIdx);
        const posterWidth = posters[0].offsetWidth;
        container.scrollTo({
            left: nextIdx * posterWidth,
            behavior: 'smooth'
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const yearNumbers = document.querySelectorAll('.stats-numbers span');
    const posterImage = document.querySelector('.poster-image');
    const collectionNumber = document.querySelector('.collection-number');
    
    const postersData = {
        82: {
            image: "url('822.png')",
            year: "1982"
        },
        86: {
            image: "url('86.png')",
            year: "1986"
        },
        87: {
            image: "url('87.png')",
            year: "1987"
        },
        88: {
            image: "url('88.png')",
            year: "1988"
        },
        89: {
            image: "url('89.png')",
            year: "1989"
        }
    };

    function setActiveYear(year) {
        yearNumbers.forEach(n => n.classList.remove('highlight'));
        
        yearNumbers.forEach(n => {
            if (n.textContent.trim() === year) {
                n.classList.add('highlight');
            }
        });
        
        if (postersData[year] && posterImage) {
            posterImage.style.backgroundImage = postersData[year].image;
            console.log(`Меняем на ${year} год: ${postersData[year].image}`);
        }
        
        if (collectionNumber && postersData[year]) {
            collectionNumber.textContent = postersData[year].year;
        }
    }
    
    setActiveYear('87');

    yearNumbers.forEach(num => {
        num.addEventListener('click', function() {
            const year = this.textContent.trim();
            if (posterImage) {
                posterImage.style.opacity = '0';
                setTimeout(() => {
                    setActiveYear(year);
                    posterImage.style.opacity = '1';
                }, 300);
            } else {
                setActiveYear(year);
            }
        });
    });
});
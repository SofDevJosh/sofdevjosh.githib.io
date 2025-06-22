document.addEventListener("DOMContentLoaded", function () {
    const starsContainer = document.querySelector('.stars');
    const solarSystemsContainer = document.querySelector('.solar-systems');
    const planetDetail = document.querySelector('.planet-detail');
    const backButton = document.querySelector('.back-button');
    const planetSurface = document.querySelector('.planet-surface');
    
    // Create stars
    function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.animationDuration = `${Math.random() * 5 + 2}s`;
    
    starsContainer.appendChild(star);
    
    if (Math.random() < 0.005) {
    star.style.animation = 'supernova 1s forwards';
    star.addEventListener('animationend', () => {
    star.remove();
    });
    }
    
    setTimeout(() => {
    star.remove();
    }, 10000);
    }
    function getPosition(element) {
        const {top, left, width, height} = element.getBoundingClientRect();
        return {
            x: left + width / 2,
            y: top + height / 2
        };
    }
    //sun red 193, 38, 0
    //sun blue 135, 206, 250
    // Create solar systems
    let planets = [];
    let suns = [];


    function createSolarSystem() {
    let sun = document.createElement('div');
    sun.classList.add('sun');
    suns.push(sun);

    const sunSize = Math.random() * 30 + 20;
   
    if(sunSize > 40)
    {
        sun.style.backgroundColor = `rgb(135, 206, 250)`;
    } else if(sunSize < 40 && sunSize > 30){
        sun.style.backgroundColor = "rgb(255, 255, 0)";
    } else if(sunSize < 30){
        sun.style.backgroundColor = "rgb(193, 38, 0)";
    }
    let sunMass = sunSize * 20;
    
    sun.style.width = `${sunSize}px`;
    sun.style.height = `${sunSize}px`;
    sun.style.left = `${Math.random() * 90 + 5}vw`;
    sun.style.top = `${Math.random() * 90 + 5}vh`;
    
    solarSystemsContainer.appendChild(sun);
    
    const numPlanets = Math.floor(Math.random() * 5) + 1;
    
    for (let i = 0; i < numPlanets; i++) {
    const planet = document.createElement('div');
    planet.classList.add('planet');
    planets.push(planet)
    




    const planetSize = Math.random() * 10 + 5;
    const planetMass = planetSize * 2;
    
    planet.style.width = `${planetSize}px`;
    planet.style.height = `${planetSize}px`;
    planet.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
    
    const orbitRadius = (i + 1) * 50;
    const orbitSpeed = Math.random() * 20 + 10;
    let angle = 0;
    
    //we are taking this function and self calling at the end to let it continue running
    //it creates a orbital path based on 
    
    //every thibng needs gravity and mass 
    //functions for getting distance between objects
    
    
    function getDistance(a,b){
        const PositionOne = getPosition(a);
        const PositionTwo = getPosition(b);

        return Math.hypot(PositionOne.x - PositionTwo.x, PositionOne.y - PositionTwo.y);
    }

    


    function orbit() {
    //gravitational const(massone * masstwo / distance between them squared)

    //in parsecs gravitational const
    //works with default
    const G = 4.3009e-3
    //works with circular orbit
    //const G = 6.67430e-11;

    //distanc between centers
    let closestSun = sun;
    let closestDistance = getDistance(planet, sun);

    for (let i = 0; i < suns.length; i++) {
        let distanceToSun = getDistance(planet, suns[i]);
        if (distanceToSun < closestDistance) {
            closestSun = suns[i];
            closestDistance = distanceToSun;
        }
    } 

    let r = closestDistance;
    
    // planet size * 2
    //sun size * 10
    

    let Force = G * (((parseFloat(sun.style.width) * 30) * planetMass) / r ** 2);

    

   //default
    let acceleration = Force / planetMass;
    //let velocity = acceleration * 0.1;
    //circular orbit
    let velocity = Math.sqrt((G * ((parseFloat(sun.style.width) * 30) * planetMass)) / r);

    angle += 0.01 * velocity;
    planet.style.left = `${sun.offsetLeft + orbitRadius * (Math.cos(angle)) - planetSize / 2}px`;
    planet.style.top = `${sun.offsetTop + orbitRadius * (Math.sin(angle)) - planetSize / 2}px`;
   


    //collision
    function collision(obj)
    {
        obj.style.animation = "supernova 1s forwards";
        obj.addEventListener('animationend', () => {
            obj.remove(); 
        });
    }
   
   
   for( let i = 0; i < suns.length; i++)
   {
    const distanceToSun = getDistance(planet, suns[i]);
    const collisionThreshold = (planetSize / 2) + (parseFloat(suns[i].style.width) / 2); // Adjust threshold based on sizes
    if (distanceToSun < collisionThreshold) {
        collision(planet); 
        break; 
    }
   }


    requestAnimationFrame(orbit);

    

  
    }
    
    orbit();
    
    planet.addEventListener('click', () => {
    travelToPlanet(planet);
    });

    

    //get the distance between  planet and sun 
    function getSolarDistance(rect1, rect2) {
        const x1 = rect1.left + rect1.width / 2;
        const y1 = rect1.top + rect1.height / 2;
        const x2 = rect2.left + rect2.width / 2;
        const y2 = rect2.top + rect2.height / 2;
        return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
      }


    
    
    solarSystemsContainer.appendChild(planet);
    }
   
    
  

    }
    
    // Travel to planet
    function travelToPlanet(planet) {

    const rect = planet.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const planetCenterX = rect.left + rect.width / 2;
    const planetCenterY = rect.top + rect.height / 2;
    const translateX = centerX - planetCenterX;
    const translateY = centerY - planetCenterY;
    const scale = 8;


    planet.classList.add('planet-zoom');
    planet.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    starsContainer.style.animation = 'fly-through 2s forwards';
    setTimeout(() => {
        planetDetail.style.display = 'flex';
        planetSurface.style.backgroundColor = planet.style.backgroundColor;
    }, 2000);
    }
    
    // Back to space
    backButton.addEventListener('click', () => {
    planetDetail.style.display = 'none';
    starsContainer.style.animation = '';
    document.querySelectorAll('.planet-zoom').forEach(p => {
        p.classList.remove('planet-zoom');
        p.style.transform = '';
    });
    });

    function triggerSupernova(sun) {
        sun.style.animation = "supernova 1s forwards";
        sun.addEventListener("animationend", () => {
            sun.remove();
            const index = suns.indexOf(sun);
            if (index > -1) {
                suns.splice(index, 1);
            }
        });

        const blackHole = document.createElement('div');
        blackHole.classList.add('black-hole');
        blackHole.style.width = "20px"; 
        blackHole.style.height = "20px";
        blackHole.style.border = "1px solid white";
        blackHole.style.borderRadius = "50%";
        blackHole.style.backgroundColor = "black";
        blackHole.style.position = "absolute";
        blackHole.style.left = sun.style.left;
        blackHole.style.top = sun.style.top;
        solarSystemsContainer.appendChild(blackHole);
        suns.push(blackHole);
    
        applyBlackHoleGravity(blackHole);


        // Remove planets
        planets = planets.filter((planet) => {
            const distanceToSun = getDistance(planet, sun);
            const collisionThreshold = (parseFloat(sun.style.width) / 2) + (parseFloat(planet.style.width) / 2);
            if (distanceToSun < collisionThreshold) {
                planet.remove();
                return false; 
            }
            return true; 
        });
    }
    //random supernova
    function startRandomSupernova() {
        setInterval(() => {
            if (suns.length > 0) {
                const randomIndex = Math.floor(Math.random() * suns.length);
                const randomSun = suns[randomIndex];
                triggerSupernova(randomSun);
            }
        }, 20000); // time of supernovas
    }


    function applyBlackHoleGravity(blackHole) {
        function pullObjects() {
            planets.forEach((planet) => {
                const distanceToBlackHole = getDistance(planet, blackHole);
                //gravity times 1 trillion
                const aTrillion = 1e12;
                const G = 4.3009e-3 * aTrillion; 
    
                // gravitational force
                const blackHoleMass = 1000; 
                const planetMass = parseFloat(planet.style.width) * 2; 
                const force = G * (blackHoleMass * planetMass) / Math.pow(distanceToBlackHole, 2);
    
                
                const acceleration = force / planetMass;
                const blackHolePosition = getPosition(blackHole);
                const planetPosition = getPosition(planet);
                const directionX = blackHolePosition.x - planetPosition.x;
                const directionY = blackHolePosition.y - planetPosition.y;
                const magnitude = Math.sqrt(directionX ** 2 + directionY ** 2);
                const velocityX = (directionX / magnitude) * acceleration;
                const velocityY = (directionY / magnitude) * acceleration;
                const currentLeft = parseFloat(planet.style.left);
                const currentTop = parseFloat(planet.style.top);


                planet.style.left = `${currentLeft + velocityX}px`;
                planet.style.top = `${currentTop + velocityY}px`;

                
                const collisionThreshold = (parseFloat(blackHole.style.width) / 2) + (parseFloat(planet.style.width) / 2);
                if (distanceToBlackHole < collisionThreshold) {
                    planet.remove(); 
                    planets = planets.filter((p) => p !== planet); 
                }
            });
    
           
            requestAnimationFrame(pullObjects);
        }
    
        pullObjects();
    }




    startRandomSupernova();




    
    // Generate stars and solar systems
    function generateStars() {
    setInterval(createStar, 45);
    }
    
    function generateSolarSystems() {
    for (let i = 0; i < 4; i++) {
    createSolarSystem();
    }
    }
    
    generateStars();
    generateSolarSystems();
    });
    

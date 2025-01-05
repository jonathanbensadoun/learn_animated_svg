window.addEventListener("load", () => {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Set canvas size to window size
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Star properties
  const stars = [];
  const numStars = 200;
  const speedMultiplier = 20; // Adjust this value to change the speed of the stars

  // Initialize stars
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1, // Minimum size of 1
      speed: Math.random() * speedMultiplier + 0.2, // Speed between 0.2 and 0.7
      alpha: Math.random() * 0.5 + 0.3, // Random opacity
    });
  }

  // Animation function
  function animate() {
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
      // Update star position (moving downwards)
      star.y += star.speed; // Change from 'star.y -= star.speed' to 'star.y += star.speed'

      // Reset star position when it goes off screen (if it moves out of the bottom)
      if (star.y > canvas.height) {
        star.y = 0; // Reset position to the top
        star.x = Math.random() * canvas.width; // Randomize the x position when resetting
      }

      // Draw star with a fading effect (motion blur)
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`; // Set opacity
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      // Add more motion blur by increasing the alpha as stars move
      star.alpha = Math.min(1, star.alpha + 0.01); // Gradually increase opacity for motion effect
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Cleanup event listener on unmount (for best practices)
  window.addEventListener("beforeunload", () => {
    window.removeEventListener("resize", resizeCanvas);
  });
});

// Wait for the window to load
window.addEventListener("load", () => {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  /**
   * Resize canvas to match the window size.
   */
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  /**
   * Star properties
   */
  const stars = [];
  const numStars = 200;
  const speedMultiplier = 20; // Adjust to change star speed

  /**
   * Initialize the starfield with randomized star properties.
   */
  const initializeStars = () => {
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1, // Minimum size of 1
        speed: Math.random() * speedMultiplier + 0.2, // Speed range: 0.2 - 20.2
        alpha: Math.random() * 0.5 + 0.3, // Opacity range: 0.3 - 0.8
      });
    }
  };

  initializeStars();

  /**
   * Animate and render the starfield.
   */
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    stars.forEach((star) => {
      // Update star position
      star.y += star.speed;

      // Reset star to the top if it moves off the screen
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }

      // Draw the star
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      // Gradually increase opacity for a motion effect
      star.alpha = Math.min(1, star.alpha + 0.01);
    });

    requestAnimationFrame(animate); // Loop the animation
  };

  animate();

  /**
   * Cleanup event listeners on page unload.
   */
  window.addEventListener("beforeunload", () => {
    window.removeEventListener("resize", resizeCanvas);
  });
});

<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const steps = [
    { id: 1, title: 'Introduction', content: 'Welcome to the climate scrollytelling demo.' },
    { id: 2, title: 'CO₂ Rise', content: 'Atmospheric CO₂ levels have been rising since 1958.' },
    { id: 3, title: 'Impacts', content: 'Higher CO₂ leads to global warming and climate impacts.' },
    { id: 4, title: 'Call to Action', content: 'Reducing emissions is crucial to slow climate change.' }
  ];

  let activeStep = writable(steps[0].id);

  function handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeStep.set(+entry.target.dataset.id);
      }
    });
  }

  let observer;

  onMount(() => {
    observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.6
    });

    const elements = document.querySelectorAll('.step');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  });
</script>

<style global>
  body {
    font-family: system-ui, sans-serif;
    margin: 0;
  }
  .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }
  .steps {
    flex: 1;
    overflow-y: scroll;
    padding: 2rem;
    border-right: 1px solid #ccc;
  }
  .step {
    margin-bottom: 4rem;
    padding: 1rem;
    border-left: 5px solid transparent;
    transition: border-color 0.3s;
  }
  .step.active {
    border-color: #007acc;
    background-color: #f0f8ff;
  }
  .graphic {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  .graphic-content {
    width: 80%;
    height: 300px;
    background-color: #e0f7fa;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: #007acc;
    text-align: center;
  }
</style>

<div class="container">
  <div class="steps">
    {#each steps as step}
      <div class="step" class:active={$activeStep === step.id} data-id={step.id}>
        <h2>{step.title}</h2>
        <p>{step.content}</p>
      </div>
    {/each}
  </div>

  <div class="graphic">
    {#if $activeStep === 1}
      <div class="graphic-content">🌍 Intro Image or Animation</div>
    {:else if $activeStep === 2}
      <div class="graphic-content">📈 CO₂ Level Chart Placeholder</div>
    {:else if $activeStep === 3}
      <div class="graphic-content">🔥 Climate Impact Visualization</div>
    {:else if $activeStep === 4}
      <div class="graphic-content">🤝 Call to Action Panel</div>
    {/if}
  </div>
</div>
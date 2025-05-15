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

  // Track if tableau script has been loaded so we don't load multiple times
  let tableauScriptLoaded = false;

  onMount(() => {
    observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.6
    });

    const elements = document.querySelectorAll('.step');
    elements.forEach(el => observer.observe(el));

    // Subscribe to activeStep changes to load Tableau script only for step 2
    const unsubscribe = activeStep.subscribe(value => {
      if (value === 2 && !tableauScriptLoaded) {
        loadTableauScript();
        tableauScriptLoaded = true;
      }
    });

    return () => {
      observer.disconnect();
      unsubscribe();
    };
  });

  function loadTableauScript() {
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    document.body.appendChild(scriptElement);
  }
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
  .tableauPlaceholder {
    position: relative;
    width: 1016px;
    height: 991px;
    background: white;
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
      <div class="graphic-content">
        <div
          class="tableauPlaceholder"
          id="viz1747330239230"
          style="position: relative; width: 1016px; height: 991px;"
        >
          <noscript>
            <a href="#">
              <img
                alt="Global Surface Temperature Anomaly & Trend Analysis"
                src="https://public.tableau.com/static/images/Gl/GlobalSurfaceTemperatures/GlobalSurfaceTemperatureAnomalyTrendAnalysis/1_rss.png"
                style="border: none"
              />
            </a>
          </noscript>
          <object class="tableauViz" style="display:none;">
            <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
            <param name="embed_code_version" value="3" />
            <param name="site_root" value="" />
            <param name="name" value="GlobalSurfaceTemperatures/GlobalSurfaceTemperatureAnomalyTrendAnalysis" />
            <param name="tabs" value="no" />
            <param name="toolbar" value="yes" />
            <param name="static_image" value="https://public.tableau.com/static/images/Gl/GlobalSurfaceTemperatures/GlobalSurfaceTemperatureAnomalyTrendAnalysis/1.png" />
            <param name="animate_transition" value="yes" />
            <param name="display_static_image" value="yes" />
            <param name="display_spinner" value="yes" />
            <param name="display_overlay" value="yes" />
            <param name="display_count" value="yes" />
            <param name="language" value="en-US" />
          </object>
        </div>
      </div>
    {:else if $activeStep === 3}
      <div class="graphic-content">🔥 Climate Impact Visualization</div>
    {:else if $activeStep === 4}
      <div class="graphic-content">🤝 Call to Action Panel</div>
    {/if}
  </div>
</div>

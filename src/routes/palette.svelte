<script>
  // No JavaScript needed for this static design
</script>

<svelte:head>
  <title>Seekly Color Palette</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</svelte:head>

<div class="container">
  <div class="header">
    <div class="logo">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#B3B8FF"/>
        <path d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z" fill="#D7C4F3"/>
      </svg>
    </div>
    <h1 class="app-name">Seekly</h1>
  </div>

  <div class="palette-grid">
    <div class="color-card primary">
      <div class="color-box" style="background-color: #B3B8FF;"></div>
      <div class="color-info">
        <h3>Primary</h3>
        <p>#B3B8FF</p>
        <p class="description">Soft pastel blue</p>
      </div>
    </div>

    <div class="color-card secondary">
      <div class="color-box" style="background-color: #D7C4F3;"></div>
      <div class="color-info">
        <h3>Secondary</h3>
        <p>#D7C4F3</p>
        <p class="description">Calm light purple</p>
      </div>
    </div>

    <div class="color-card accent">
      <div class="color-box" style="background-color: #F4A7B9;"></div>
      <div class="color-info">
        <h3>Accent</h3>
        <p>#F4A7B9</p>
        <p class="description">Soft pink for accents</p>
      </div>
    </div>

    <div class="color-card background">
      <div class="color-box" style="background-color: #F9F9FB;"></div>
      <div class="color-info">
        <h3>Background</h3>
        <p>#F9F9FB</p>
        <p class="description">Warm off-white</p>
      </div>
    </div>
  </div>

  <div class="design-notes">
    <h2>Design System</h2>
    <ul>
      <li>Modern minimalist aesthetic with calm tech vibe</li>
      <li>Clean layout with ample spacing</li>
      <li>Soft pastel color palette for a friendly user experience</li>
      <li>Modern sans-serif typography (Inter font family)</li>
    </ul>
  </div>
</div>

<style>
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #F9F9FB;
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem;
  }

  .logo {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
  }

  .app-name {
    color: #D7C4F3;
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: -0.5px;
    margin: 0;
  }

  .palette-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .color-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .color-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }

  .color-box {
    height: 120px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 1rem;
  }

  .color-info {
    padding: 1.5rem;
  }

  .color-info h3 {
    margin: 0 0 0.5rem 0;
    font-weight: 600;
    color: #333;
    font-size: 1.2rem;
  }

  .color-info p {
    margin: 0.25rem 0;
    color: #666;
    font-size: 0.9rem;
  }

  .description {
    font-style: italic;
    color: #888 !important;
  }

  .design-notes {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  }

  .design-notes h2 {
    margin-top: 0;
    color: #333;
    font-weight: 600;
  }

  .design-notes ul {
    padding-left: 1.5rem;
  }

  .design-notes li {
    margin-bottom: 0.75rem;
    color: #666;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }
    
    .palette-grid {
      grid-template-columns: 1fr;
    }
    
    .app-name {
      font-size: 2rem;
    }
  }
</style>
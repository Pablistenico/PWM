const puppeteer = require('puppeteer');

/**
 * Test to verify the main page loads correctly
 * Checks for essential elements and verifies basic functionality
 */
async function testMainPageLoad() {
  // Launch a headless browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  try {
    console.log('Testing main page load...');
    
    // Navigate to the main page
    await page.goto('http://localhost:8080', {
      waitUntil: 'networkidle0',
      timeout: 15000
    });
    
    // Verify page title contains expected text
    const title = await page.title();
    console.log(`Page title: "${title}"`);
    
    if (!title.includes('MealMates')) {
      throw new Error(`Page title doesn't contain 'MealMates': ${title}`);
    }
    
    // Check if main heading exists
    const headingText = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? h1.innerText : null;
    });
    
    console.log(`Main heading: "${headingText}"`);
    
    if (!headingText || !headingText.includes('Meal Mates')) {
      throw new Error(`Main heading not found or incorrect: ${headingText}`);
    }
    
    // Check if featured recipes section exists
    const featuredRecipesExists = await page.evaluate(() => {
      return !!document.querySelector('.featured-recipes');
    });
    
    if (!featuredRecipesExists) {
      throw new Error('Featured recipes section not found');
    }
    
    // Check if recipe cards are loaded
    const recipeCards = await page.evaluate(() => {
      return document.querySelectorAll('.recipe-card').length;
    });
    
    console.log(`Found ${recipeCards} recipe cards`);
    
    if (recipeCards < 1) {
      throw new Error('No recipe cards found on the page');
    }
    
    console.log('✅ Main page loaded successfully with all required elements');
    await browser.close();
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    await browser.close();
    throw error;
  }
}

// Run the test and handle process exit
(async () => {
  try {
    await testMainPageLoad();
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
})(); 

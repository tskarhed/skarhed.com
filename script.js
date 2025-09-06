// Array of different fonts for the main title
const fonts = [
    'Arial Rounded MT Bold',
    'Comic Sans MS',
    'Marker Felt',
    'Bradley Hand',
    'Chalkboard SE',
    'Futura',
    'Helvetica Rounded',
    'Impact',
    'Lucida Grande',
    'Optima',
    'Palatino',
    'Trebuchet MS',
    'Verdana',
    'Georgia',
    'Times New Roman'
];

// Array of different gradient backgrounds - more pronounced and colorful
const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(45deg, #85ffbd 0%, #fffb7d 100%)',
    'linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 100%)',
    'linear-gradient(180deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(180deg, #ffecd2 0%, #fcb69f 100%)',
    'radial-gradient(circle, #ff9a9e 0%, #fecfef 100%)',
    'radial-gradient(circle, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
    'linear-gradient(135deg, #85ffbd 0%, #fffb7d 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    'linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 100%)',
    'linear-gradient(45deg, #85ffbd 0%, #fffb7d 100%)',
    'linear-gradient(180deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(180deg, #ffecd2 0%, #fcb69f 100%)',
    'radial-gradient(circle, #ff9a9e 0%, #fecfef 100%)',
    'radial-gradient(circle, #a8edea 0%, #fed6e3 100%)'
];

// Function to get a random font from the array
function getRandomFont() {
    const randomIndex = Math.floor(Math.random() * fonts.length);
    return randomIndex;
}

// Function to get a random gradient from the array
function getRandomGradient() {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    return randomIndex;
}

// Function to calculate brightness of a color
function getColorBrightness(hexColor) {
    // Remove # if present
    hexColor = hexColor.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    
    // Calculate brightness using standard formula
    return (r * 299 + g * 587 + b * 114) / 1000;
}

// Function to extract colors from gradient and determine overall brightness
function getGradientBrightness(gradient) {
    // Extract hex colors from gradient string
    const hexColors = gradient.match(/#[0-9a-fA-F]{6}/g);
    
    if (!hexColors || hexColors.length === 0) {
        return 128; // Default to medium brightness
    }
    
    // Calculate average brightness of all colors in gradient
    let totalBrightness = 0;
    hexColors.forEach(color => {
        totalBrightness += getColorBrightness(color);
    });
    
    return totalBrightness / hexColors.length;
}

// Function to adjust text colors based on background brightness
function adjustTextColors(brightness) {
    const mainTitle = document.getElementById('mainTitle');
    const pronunciation = document.querySelector('.pronunciation');
    
    if (brightness > 150) {
        // Light background - use dark text
        mainTitle.style.color = '#000000';
        pronunciation.style.color = '#333333';
    } else {
        // Dark background - use light text
        mainTitle.style.color = '#ffffff';
        pronunciation.style.color = '#ffffff';
    }
}

// Function to change the font and background of the page
function changePageStyle() {
    const mainTitle = document.getElementById('mainTitle');
    const body = document.body;
    
    const randomFontIndex = getRandomFont();
    const randomGradientIndex = getRandomGradient();
    
    const randomFont = fonts[randomFontIndex];
    const randomGradient = gradients[randomGradientIndex];
    
    mainTitle.style.fontFamily = randomFont;
    body.style.background = randomGradient;
    body.style.backgroundAttachment = 'fixed';
    
    // Calculate background brightness and adjust text colors accordingly
    const brightness = getGradientBrightness(randomGradient);
    adjustTextColors(brightness);
    
    // Store the current font and gradient in sessionStorage to maintain consistency during the session
    sessionStorage.setItem('currentFont', randomFont);
    sessionStorage.setItem('currentGradient', randomGradient);
    sessionStorage.setItem('currentBrightness', brightness);
}

// Function to initialize the page
function initPage() {
    // Check if we have stored styles for this session
    const storedFont = sessionStorage.getItem('currentFont');
    const storedGradient = sessionStorage.getItem('currentGradient');
    const storedBrightness = sessionStorage.getItem('currentBrightness');
    
    if (storedFont && storedGradient && storedBrightness) {
        // Use the stored styles if we're in the same session
        document.getElementById('mainTitle').style.fontFamily = storedFont;
        document.body.style.background = storedGradient;
        document.body.style.backgroundAttachment = 'fixed';
        adjustTextColors(parseFloat(storedBrightness));
    } else {
        // Change to random styles if it's a new session
        changePageStyle();
    }
}

// Initialize the page when it loads
document.addEventListener('DOMContentLoaded', initPage);

// Also change styles when the page is refreshed
window.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('currentFont');
    sessionStorage.removeItem('currentGradient');
    sessionStorage.removeItem('currentBrightness');
}); 
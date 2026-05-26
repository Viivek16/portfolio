const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('url');

const urls = [
  { name: 'yellow-capital', url: 'https://www.yellowcapital.com' },
  { name: 'newtribe-capital', url: 'https://www.newtribe.capital' },
  { name: 'digital-consensus-fund', url: 'https://digitalconsensus.fund/' },
  { name: 'asva-capital', url: 'https://www.asva.capital/' },
  { name: 'digitata-capital', url: 'https://www.digitata.online/' }
];

const outDir = path.join(__dirname, 'public', 'firm-logos');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchHTML(new URL(res.headers.location, url).href).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ html: data, finalUrl: url }));
    }).on('error', reject);
  });
}

async function run() {
  for (const item of urls) {
    try {
      console.log(`Fetching ${item.url}...`);
      const { html, finalUrl } = await fetchHTML(item.url);
      
      // Look for logo in img src or svg
      const logoMatch = html.match(/<img[^>]+src=["']([^"']*(?:logo)[^"']*\.(?:svg|png))["']/i) 
                     || html.match(/<img[^>]+src=["']([^"']*\.(?:svg))["']/i)
                     || html.match(/<link[^>]+rel=["'](?:shortcut )?icon["'][^>]+href=["']([^"']*\.(?:svg|png))["']/i);
      
      if (logoMatch) {
        let logoUrl = logoMatch[1];
        if (logoUrl.startsWith('//')) logoUrl = 'https:' + logoUrl;
        else if (logoUrl.startsWith('/')) logoUrl = new URL(logoUrl, finalUrl).href;
        else if (!logoUrl.startsWith('http')) logoUrl = new URL(logoUrl, finalUrl).href;
        
        console.log(`Found logo for ${item.name}: ${logoUrl}`);
        
        const ext = path.extname(new URL(logoUrl).pathname) || '.png';
        const dest = path.join(outDir, `${item.name}${ext}`);
        
        await new Promise((resolve, reject) => {
          const client = logoUrl.startsWith('https') ? https : http;
          client.get(logoUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
               // naive redirect handle for logo
               client.get(new URL(res.headers.location, logoUrl).href, (res2) => {
                   const file = fs.createWriteStream(dest);
                   res2.pipe(file);
                   file.on('finish', () => { file.close(); resolve(); });
               });
            } else {
               const file = fs.createWriteStream(dest);
               res.pipe(file);
               file.on('finish', () => { file.close(); resolve(); });
            }
          }).on('error', reject);
        });
        console.log(`Saved ${item.name}${ext}`);
      } else {
        console.log(`No logo found for ${item.name}`);
      }
    } catch (e) {
      console.error(`Failed ${item.name}: ${e.message}`);
    }
  }
}

run();

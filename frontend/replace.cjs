const fs = require('fs');
const path = require('path');
const srcDir = 'c:\\\\Users\\\\admin\\\\OneDrive\\\\Documents\\\\GitHub\\\\ecom\\\\frontend\\\\src';

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walkDir(srcDir);
files.forEach(file => {
    if (file.includes('config\\\\api.ts')) return;
    
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('http://localhost:5000')) {
        // Calculate relative path
        const fileDir = path.dirname(file);
        const configPath = path.join(srcDir, 'config', 'api');
        let relativePath = path.relative(fileDir, configPath).replace(/\\\\/g, '/');
        if (!relativePath.startsWith('.')) relativePath = './' + relativePath;
        
        // Add import
        if (!content.includes('import { API_URL }')) {
            const lines = content.split('\n');
            let lastImportIdx = -1;
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].startsWith('import ')) lastImportIdx = i;
            }
            if (lastImportIdx !== -1) {
                lines.splice(lastImportIdx + 1, 0, `import { API_URL } from "${relativePath}";`);
                content = lines.join('\n');
            } else {
                content = `import { API_URL } from "${relativePath}";\n` + content;
            }
        }
        
        // Replace regex for standard strings
        content = content.replace(/["']http:\/\/localhost:5000(.*?)["']/g, '`${API_URL}$1`');
        // Replace regex for template literals that don't have variables
        content = content.replace(/`http:\/\/localhost:5000(.*?)`/g, '`${API_URL}$1`');
        // If there's an existing template literal like `http://localhost:5000/api/offers/${id}`
        // it gets caught by the second regex and becomes `${API_URL}/api/offers/${id}`
        
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated', file);
    }
});

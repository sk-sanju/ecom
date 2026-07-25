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
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('config\\api')) {
        content = content.replace(/\\/g, '/');
        // Oh wait, replace(/\\/g, '/') replaces EVERYTHING in the file, we only want imports.
        // Actually, we shouldn't do that globally. Let's re-read the file.
        content = fs.readFileSync(file, 'utf8');
        
        let newContent = content.replace(/import { API_URL } from "(.*?)";/g, (match, p1) => {
            return 'import { API_URL } from "' + p1.replace(/\\/g, '/') + '";';
        });
        
        if (newContent !== content) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log('Fixed', file);
        }
    }
});

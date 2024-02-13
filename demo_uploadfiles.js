const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const uploadDirectory = path.join(__dirname, 'users'); // Adjust 'users' directory path as needed

// Ensure the upload directory exists
fs.mkdirSync(uploadDirectory, { recursive: true });

const server = http.createServer((req, res) => {
    if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
        // Parse the uploaded file
        const form = new formidable.IncomingForm();
        form.uploadDir = uploadDirectory;
        form.keepExtensions = true;
        form.k
        
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('An error occurred');
                return;
            }
            // Redirect or inform the user of a successful upload
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('File uploaded successfully.');
            res.end();
        });
    } else if (req.url === '/') {
        // Serve the upload form
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="upload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="fileToUpload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
});

const port = 8080;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
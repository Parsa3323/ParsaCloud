// script.js
let uploadedFiles = [];

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const linkContainer = document.getElementById('linkContainer');
            const link = document.createElement('a');
            link.href = e.target.result;
            link.download = file.name;
            link.textContent = 'Download ' + file.name;
            linkContainer.innerHTML = '';
            linkContainer.appendChild(link);

            // Save the file info for the download page
            uploadedFiles.push({ name: file.name, url: e.target.result });
            localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a file to upload.');
    }
}

function loadDownloadLinks() {
    const downloadLinks = document.getElementById('downloadLinks');
    const files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    files.forEach(file => {
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.name;
        link.textContent = 'Download ' + file.name;
        downloadLinks.appendChild(link);
        downloadLinks.appendChild(document.createElement('br'));
    });
}

// Load download links when the download page is loaded
if (document.getElementById('downloadLinks')) {
    loadDownloadLinks();
}

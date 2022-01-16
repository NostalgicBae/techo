const uploadForm = document.getElementById('upload-form');
const file = document.getElementById('upload-file');

const uploadFile = (file) => {

    // add file to FormData object
    const fd = new FormData();
    fd.append('excel', file);

    // send `POST` request
    fetch('/upload', {
        method: 'POST',
        body: fd
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
};

// call `uploadFile` function on form submit
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    uploadFile(file.files[0]);
    alert('Store added!');
});
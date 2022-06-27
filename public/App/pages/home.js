const snackbar = document.getElementById('snackbar');
snackbar.classList.add('show');
setTimeout(() => {
	snackbar.classList.remove('show');
}, 5000);

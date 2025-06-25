 document.addEventListener('DOMContentLoaded', () => {
        // GSAP animations
        gsap.from(".container", {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: "back.out(1.7)"
        });

        // Elements
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const selectButton = document.getElementById('selectButton');
        const uploadButton = document.getElementById('uploadButton');
        const progressContainer = document.getElementById('progressContainer');
        const uploadProgress = document.getElementById('uploadProgress');
        const progressText = document.getElementById('progressText');
        const result = document.getElementById('result');
        const fileLink = document.getElementById('fileLink');
        const copyButton = document.getElementById('copyButton');
        const newUploadButton = document.getElementById('newUploadButton');
        const fileInfo = document.getElementById('fileInfo');
        const fileName = document.getElementById('fileName');
        const fileSize = document.getElementById('fileSize');
        const toast = document.getElementById('toast');

        // Drag and drop functionality
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, unhighlight, false);
        });

        function highlight() {
            uploadArea.classList.add('active');
            uploadArea.querySelector('i').style.color = '#4361ee';
        }

        function unhighlight() {
            uploadArea.classList.remove('active');
            uploadArea.querySelector('i').style.color = '';
        }

        uploadArea.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length) {
                fileInput.files = files;
                handleFiles(files);
            }
        }

        // File selection
        selectButton.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                handleFiles(fileInput.files);
            }
        });

        function handleFiles(files) {
            const file = files[0];

            // Show file info
            fileName.textContent = file.name;
            fileSize.textContent = formatFileSize(file.size);
            fileInfo.classList.remove('hidden');

            // Show upload button
            uploadButton.style.display = 'inline-flex';

            // Animate file info
            gsap.from(fileInfo, {
                duration: 0.5,
                y: 20,
                opacity: 0,
                ease: "power2.out"
            });

            // Pulse upload button
            uploadButton.classList.add('pulse');
        }

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        // Upload functionality
        uploadButton.addEventListener('click', () => {
            uploadButton.classList.remove('pulse');
            uploadButton.disabled = true;
            uploadButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';

            // Show progress container
            progressContainer.classList.add('show');

            // Simulate upload progress (in a real app, replace with actual upload code)
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress > 100) progress = 100;

                uploadProgress.value = progress;
                progressText.textContent = `${Math.round(progress)}% uploaded`;

                if (progress === 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        uploadComplete();
                    }, 500);
                }
            }, 300);
        });

        function uploadComplete() {
            // Hide upload button and progress
            uploadButton.style.display = 'none';

            // Show result
            result.classList.add('show');
            fileLink.value = 'https://swiftshare.com/files/' + generateRandomId();

            // Animate result
            gsap.from(result, {
                duration: 0.8,
                y: 20,
                opacity: 0,
                ease: "elastic.out(1, 0.5)"
            });
        }

        function generateRandomId() {
            return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
        }

        // Copy link functionality
        copyButton.addEventListener('click', () => {
            fileLink.select();
            document.execCommand('copy');

            showToast('Link copied to clipboard!');
        });

        // New upload
        newUploadButton.addEventListener('click', () => {
            // Reset form
            fileInput.value = '';
            uploadProgress.value = 0;
            progressText.textContent = '0% uploaded';
            fileInfo.classList.add('hidden');
            uploadButton.style.display = 'none';
            uploadButton.disabled = false;
            uploadButton.innerHTML = '<i class="fas fa-upload"></i> Upload File';
            result.classList.remove('show');
            progressContainer.classList.remove('show');

            // Animate reset
            gsap.to([result, progressContainer], {
                duration: 0.3,
                opacity: 0,
                y: 20,
                onComplete: () => {
                    gsap.set([result, progressContainer], { clearProps: "all" });
                }
            });
        });

        // Toast notification
        function showToast(message) {
            toast.textContent = message;
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Add some decorative animations
        const cloudIcon = uploadArea.querySelector('i');
        setInterval(() => {
            gsap.to(cloudIcon, {
                duration: 2,
                y: -5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, 0);
    });
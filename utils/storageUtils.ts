import { API_BASE_URL } from '@/utils/config';

/**
 * Compresses an image file using Canvas.
 * Max width: 1920px, Quality: 0.8 (JPEG)
 */
const compressImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error("Canvas context not available"));
                return;
            }

            // Calculate new dimensions (Max width 1920px)
            const MAX_WIDTH = 1920;
            let width = img.width;
            let height = img.height;

            if (width > MAX_WIDTH) {
                height = (height * MAX_WIDTH) / width;
                width = MAX_WIDTH;
            }

            canvas.width = width;
            canvas.height = height;

            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error("Compression failed"));
                }
            }, 'image/jpeg', 0.8); // 80% quality JPEG
        };
        img.onerror = (err) => reject(err);
    });
};

/**
 * Uploads an image file to Custom API.
 * @param file The file object to upload.
 * @param path Ignored in simple PHP version (handled by backend naming).
 * @returns Promise resolving to the public download URL.
 */
export const uploadImage = async (file: File, path: string): Promise<string> => {
    if (!file) throw new Error("No file provided");

    // Compress image before upload
    let fileToUpload: Blob | File = file;
    // Only compress if it's an image
    if (file.type.startsWith('image/')) {
        try {
            fileToUpload = await compressImage(file);
            console.log(`Compressed image: ${(file.size / 1024 / 1024).toFixed(2)}MB -> ${(fileToUpload.size / 1024 / 1024).toFixed(2)}MB`);
        } catch (err) {
            console.warn("Image compression failed, uploading original:", err);
        }
    }

    const formData = new FormData();
    // Rename to .jpg if compressed
    const filename = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const finalFilename = file.type.startsWith('image/') ? `${filename.split('.')[0]}.jpg` : filename;

    formData.append('file', fileToUpload, finalFilename);

    try {
        const response = await fetch(`${API_BASE_URL}/upload.php`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Upload failed');

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        // If returned URL is relative, prepend domain in production or handle appropriately
        // Assuming upload.php returns absolute relative from root e.g., /uploads/file.jpg
        return data.url;
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
};

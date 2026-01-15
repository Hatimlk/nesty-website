import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
 * Uploads an image file to Firebase Storage.
 * @param file The file object to upload.
 * @param path The path in storage (e.g., 'properties/123').
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

    // Create a unique filename
    // Sanitize filename to avoid specific character issues
    const filename = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    // Save as .jpg if compressed, otherwise original ext
    const finalFilename = file.type.startsWith('image/') ? `${filename.split('.')[0]}.jpg` : filename;

    const storageRef = ref(storage, `${path}/${Date.now()}_${finalFilename}`);

    const snapshot = await uploadBytes(storageRef, fileToUpload);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
};

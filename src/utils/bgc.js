export function generateGradientFromImage(imageUrl, callback) {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageUrl;
    image.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const colors = [];

        for (let i = 0; i < imageData.data.length; i += 4) {
            const red = imageData.data[i];
            const green = imageData.data[i + 1];
            const blue = imageData.data[i + 2];
            const alpha = imageData.data[i + 3];

            // 跳过透明像素
            if (alpha === 0) {
                continue;
            }
            const color = `rgba(${red},${green},${blue},${alpha})`;
            colors.push(color);
        }

        const numColors = colors.length;
        const gradient = `linear-gradient(to bottom, ${colors[0]}, ${colors[numColors - 1]})`;

        if (callback) {
            callback(gradient);
        }
    };
}
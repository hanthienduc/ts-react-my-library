
export function getCoverImagePath(data: []) {
    const base64String = btoa(String.fromCharCode(...new Uint8Array(data)));
    const coverImagePath = `data:image/png;base64,${base64String}`
    return coverImagePath
}
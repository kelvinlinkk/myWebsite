async function loadSource(img, aud) {
    try {
        const response = await fetch('resources/image.json'); // Endpoint to list resources
        const resources = await response.json();

        resources.forEach(resource => {
            img.addImg(resource.name, resource.src);
        });
    } catch (error) {
        console.error('Error fetching resources:', error);
    }
    try {
        const response = await fetch('resources/audio.json'); // Endpoint to list resources
        const resources = await response.json();

        resources.forEach(resource => {
            aud.addAudio(resource.name, resource.src);
        });
    } catch (error) {
        console.error('Error fetching resources:', error);
    }
}
async function ReadStory(dialog, src) {
    try{
        const response = await fetch(src); 
        const resources = await response.text();
        const texts = resources.split('\r\n\n/')
    }catch(error){
        console.error('Error fetching resources:', error);
    }
    
}
export { loadSource, ReadStory };
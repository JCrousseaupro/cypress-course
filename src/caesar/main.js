const alphabet = 'abcdefghijklmnopqrstuvwxyz';

document.getElementById('cypher-button').addEventListener('click', (e) => {
    const key = parseInt(document.getElementById('cypher-key').value);
    const text = document.getElementById('text-to-cypher').value;

    const result = cypher(text, key);
    document.getElementById('cypher-result').textContent = result;
});

document.getElementById('text-to-cypher').addEventListener('input', (e) => {
    const text = e.target.value;
    if (/^\d+$/.test(text)) {
        document.getElementById('cypher-result').innerHTML = '<p style="color: red;">Please enter valid text, not numbers</p>';
    } else {
        document.getElementById('cypher-result').innerHTML = ''; // Efface l'erreur
    }
});
function cypher(text, key) {
    return text.split('').map(char => {
        const lowerChar = char.toLowerCase();
        const index = alphabet.indexOf(lowerChar);
        
        if (index !== -1) {
            const newIndex = (index + key) % 26;
            const newChar = alphabet[newIndex];
            return char === char.toUpperCase() ? newChar.toUpperCase() : newChar;
        }

        return char;
    }).join('');
}

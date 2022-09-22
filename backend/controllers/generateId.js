function generateId(type) {
    const key = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ];

    const newId = [];

    for (let i = 0; i < 9; i++) {
        const randomIdx = Math.floor(Math.random() * key.length);
        const character = key[randomIdx];
        newId.push(character);
    }

    if (type === "post") {
        return "p" + newId.join("");
    } else if (type === "comment") {
        return "c" + newId.join("");
    } else if (type === "organization") {
        return "o" + newId.join("");
    }
}

export default generateId;
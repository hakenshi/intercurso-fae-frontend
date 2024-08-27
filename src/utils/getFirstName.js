export function getFirstName (name){
    const match = name.match(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)?/);
    return match ? match[0] : name
}

console.log(getFirstName("Felipe Kafka Dias"))
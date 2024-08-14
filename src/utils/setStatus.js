export function setStatus(num) {
    const statusMap = {
        '0': "Pendente",
        '1': "Ativo",
        '2': "Rejeitado"
    }
    return statusMap[num.toString()] || "Status inválido"
}


export default function defineStatus(num) {
    const statusMap = {
        '0': 'Finalizado',
        '1': 'Ativo',
    }

    return statusMap[num.toString()] || "Status Inválido"
}
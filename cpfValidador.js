// CPFs de exemplos:
// 272.401.080-90
// 540.773.330-75
const mostrar = console.log;

function ValidaCPF(cpfEnviado) {
    Object.defineProperty(this, `cpfLimpo`, {
        get: function () {
            return cpfEnviado.replace(/\D+/g,''); // esse regex remove todos os pontos que nao sejam string
        }
    });
}

ValidaCPF.prototype.valida = function () {
    if (typeof this.cpfLimpo === 'undefined') return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequencia() === true) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criarDigito(cpfParcial);
    const digito2 = this.criarDigito(cpfParcial + digito1)

    const novoCpf = `${cpfParcial}${digito1}${digito2}`;
    mostrar(novoCpf);
    return novoCpf === this.cpfLimpo;
};

ValidaCPF.prototype.criarDigito = function (cpfParcial) {
    const cpfArray = Array.from(cpfParcial);

    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((ac, val) => {
        // mostrar(regressivo, val, regressivo * val);
        ac += (regressivo * Number(val));
        regressivo--;
        return ac;
    }, 0);
    const digito = 11 - (total % 11);
    return digito > 9 ? `0` : String(digito);
};

ValidaCPF.prototype.isSequencia = function () {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length)
    return sequencia === this.cpfLimpo;
};
const cpf = new ValidaCPF(`540.773.330-75`);
mostrar(cpf);
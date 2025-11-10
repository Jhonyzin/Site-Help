// Utilitários de validação e formatação

export function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ''); // remove pontos e traços

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let primeiroDigito = 11 - (soma % 11);
  if (primeiroDigito >= 10) primeiroDigito = 0;
  if (primeiroDigito !== parseInt(cpf.charAt(9))) {
    return false;
  }

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }

  let segundoDigito = 11 - (soma % 11);
  if (segundoDigito >= 10) segundoDigito = 0;
  if (segundoDigito !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}

export function formatarCPF(texto) {
  const numeros = texto.replace(/\D/g, '');

  if (numeros.length <= 3) return numeros;
  if (numeros.length <= 6) return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
  if (numeros.length <= 9) return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
  return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9, 11)}`;
}

export function formatarTelefone(texto) {
  const numeros = texto.replace(/\D/g, '');

  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
}

export function formatarData(texto) {
  const numeros = texto.replace(/\D/g, '');

  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 4) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
  return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)}`;
}

export function formatarDataHora(texto) {
  const numeros = texto.replace(/\D/g, '');
  
  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 4) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
  if (numeros.length <= 8) return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
  if (numeros.length <= 10) return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)} ${numeros.slice(8)}`;
  if (numeros.length <= 12) return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)} ${numeros.slice(8, 10)}:${numeros.slice(10)}`;
  return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)} ${numeros.slice(8, 10)}:${numeros.slice(10, 12)}`;
}

export function formatarCep(texto) {
  const numeros = texto.replace(/\D/g, '').slice(0, 8);
  if (numeros.length <= 5) return numeros;
  return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
}

export function dataValida(dataStr) {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dataStr.match(regex);

  if (!match) return false;

  const dia = parseInt(match[1], 10);
  const mes = parseInt(match[2], 10) - 1; 
  const ano = parseInt(match[3], 10);

  const data = new Date(ano, mes, dia);

  return (
    data.getFullYear() === ano &&
    data.getMonth() === mes &&
    data.getDate() === dia
  );
}

export function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}


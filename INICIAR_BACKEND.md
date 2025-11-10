# Backend do Render

## Configuração

O site está configurado para usar o backend hospedado no Render:
- **URL**: `https://backend-811v.onrender.com`
- **Mesmo backend usado pelo app**: `helpmais_paciente`

## Não é Necessário Iniciar o Backend Localmente

O backend já está rodando no Render, então você não precisa iniciar o backend localmente para usar o site.

## Código do Backend

O código do backend está na pasta `backend/` e é o mesmo código que está hospedado no Render.

## Verificar se o Backend Está Acessível

1. Abra o navegador e acesse: `https://backend-811v.onrender.com`
2. Você deve ver a mensagem: **"API funcionando!"**

## Nota sobre o Render

O Render pode colocar o serviço em "sleep" após um período de inatividade. Se isso acontecer:
- A primeira requisição pode demorar alguns segundos para "acordar" o serviço
- Aguarde alguns segundos e tente novamente
- O serviço voltará a funcionar normalmente após o primeiro acesso

## Usar Backend Local (Opcional)

Se você quiser usar o backend local para desenvolvimento:

1. Crie um arquivo `.env` na pasta `Site-Help`
2. Adicione:
```
VITE_API_URL=http://localhost:3000
```

3. Inicie o backend local:
```bash
cd backend
npm start
```

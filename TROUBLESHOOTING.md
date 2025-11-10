# Troubleshooting - Problemas de Conexão com o Backend

## Verificações Básicas

### 1. Verificar se o backend está rodando

Certifique-se de que o backend está rodando na porta 3000:

```bash
cd backend
npm start
```

Você deve ver a mensagem: `Servidor rodando na porta 3000`

### 2. Verificar a URL da API

O front-end está configurado para usar `http://localhost:3000` por padrão.

Se o backend estiver em outra porta ou URL, crie um arquivo `.env` na pasta `Site-Help`:

```env
VITE_API_URL=http://localhost:3000
```

### 3. Verificar CORS

O backend já está configurado com CORS habilitado. Se ainda houver problemas de CORS, verifique o arquivo `backend/src/server.js`:

```javascript
app.use(cors());
```

### 4. Verificar o Console do Navegador

Abra o console do navegador (F12) e verifique:

1. **URL da API configurada**: Deve aparecer `API URL configurada: http://localhost:3000`
2. **Requisições**: Todas as requisições são logadas no console
3. **Erros**: Qualquer erro será exibido com detalhes

### 5. Erros Comuns

#### Erro: "Network Error" ou "ERR_CONNECTION_REFUSED"
- **Causa**: Backend não está rodando ou URL incorreta
- **Solução**: Verifique se o backend está rodando na porta 3000

#### Erro: "CORS policy"
- **Causa**: Problema de CORS no backend
- **Solução**: Verifique se `app.use(cors())` está no `server.js`

#### Erro: "Campos obrigatórios faltando"
- **Causa**: Algum campo obrigatório não foi preenchido
- **Solução**: Verifique se todos os campos obrigatórios estão preenchidos:
  - Nome
  - CPF
  - Senha
  - Email
  - Telefone
  - Data de Nascimento
  - CEP
  - Estado
  - Cidade
  - Bairro
  - Logradouro
  - Número

#### Erro: "CPF já cadastrado"
- **Causa**: O CPF já existe no banco de dados
- **Solução**: Use outro CPF ou remova o registro existente

### 6. Testar a Conexão Manualmente

Você pode testar a conexão diretamente no navegador:

1. Abra o console do navegador (F12)
2. Execute:

```javascript
fetch('http://localhost:3000/')
  .then(res => res.text())
  .then(data => console.log('Backend respondeu:', data))
  .catch(err => console.error('Erro:', err));
```

Se aparecer "API funcionando!", o backend está acessível.

### 7. Verificar os Logs do Backend

No terminal onde o backend está rodando, você deve ver as requisições sendo logadas. Se não aparecer nada, a requisição não está chegando ao backend.

### 8. Verificar o Banco de Dados

Certifique-se de que o banco de dados está configurado corretamente no arquivo `backend/config.js` ou nas variáveis de ambiente.

## Debug Avançado

### Habilitar Logs Detalhados

Os logs já estão habilitados no código. Verifique o console do navegador para ver:

- URL da API configurada
- Todas as requisições (método, URL, dados)
- Todas as respostas (status, dados)
- Todos os erros (status, mensagem, dados)

### Verificar o Payload Enviado

No console do navegador, você verá o payload sendo enviado em cada requisição. Verifique se os dados estão corretos.

## Contato

Se o problema persistir, verifique:

1. Se o backend está rodando
2. Se a porta está correta (3000)
3. Se há algum firewall bloqueando
4. Se o banco de dados está acessível
5. Os logs do console do navegador
6. Os logs do backend


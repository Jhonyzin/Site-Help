# Help Mais - Site Web

Site web do sistema Help Mais, desenvolvido com React e Vite, utilizando o backend hospedado no Render (https://backend-811v.onrender.com).

## Funcionalidades

### Para Pacientes:
- Login e Cadastro
- Histórico de Consultas
- Visualização de Hospitais Próximos
- Gerenciamento de Medicamentos
- Dados Pessoais
- Configurações (Segurança e Acessibilidade)
- Pulseira NFC (em desenvolvimento)

### Para Médicos:
- Login e Cadastro
- Visualização de Consultas
- Criar Nova Consulta
- Histórico de Pacientes
- Dados Pessoais
- Inserir Resultado de Consulta

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. A URL da API está configurada para usar o backend do Render:
   - URL padrão: `https://backend-811v.onrender.com`
   - Se precisar usar outra URL, crie um arquivo `.env`:
   ```
   VITE_API_URL=https://backend-811v.onrender.com
   ```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse o site em `http://localhost:5173`

## Estrutura do Projeto

```
Site-Help/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   └── ProtectedRoute.jsx
│   ├── context/             # Contextos React
│   │   └── AuthContext.jsx
│   ├── pages/               # Páginas do site
│   │   ├── paciente/        # Páginas do paciente
│   │   ├── medico/          # Páginas do médico
│   │   ├── Login.jsx
│   │   ├── Cadastro.jsx
│   │   └── CadastroMedico.jsx
│   ├── styles/              # Estilos globais
│   ├── utils/               # Utilitários
│   │   ├── api.js           # Configuração da API
│   │   └── validacao.js     # Funções de validação
│   ├── App.jsx              # Componente principal com rotas
│   └── main.jsx             # Ponto de entrada
├── package.json
└── vite.config.js
```

## Tecnologias Utilizadas

- React 18
- React Router DOM 6
- Axios
- Vite 5

## Backend

Este site utiliza o backend hospedado no Render:
- URL: `https://backend-811v.onrender.com`
- O mesmo backend usado pelo app `helpmais_paciente`
- O backend já está configurado com CORS para aceitar requisições do front-end
- Não é necessário iniciar o backend localmente - ele já está rodando no Render

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter

## Notas

- O site utiliza localStorage para armazenar o token de autenticação
- As rotas são protegidas e redirecionam para login se o usuário não estiver autenticado
- O tipo de usuário (paciente/médico) é verificado para acesso às rotas específicas
- A URL da API pode ser configurada através da variável de ambiente `VITE_API_URL`

## Troubleshooting

### Erro: "Network Error" ou "Não foi possível conectar ao servidor"
- **Causa**: Problema de conexão com a internet ou o backend do Render está temporariamente indisponível
- **Solução**: 
  1. Verifique sua conexão com a internet
  2. Verifique se o backend está acessível em `https://backend-811v.onrender.com`
  3. O backend do Render pode estar "dormindo" - aguarde alguns segundos e tente novamente
- Abra o console do navegador (F12) para ver os logs detalhados

### Erro: "CORS policy"
- O backend já está configurado com CORS
- Se ainda houver problemas, verifique se `app.use(cors())` está no `backend/src/server.js`

### Erro: "Token inválido"
- Faça logout e login novamente
- Verifique se o token está sendo salvo corretamente no localStorage
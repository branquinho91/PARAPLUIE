# PARAPLUIE Farmácias

> O projeto **"PARAPLUIE Farmácias"** é uma aplicação mobile desenvolvida em **React Native** e **Expo** como trabalho de conclusão do Módulo 1 do programa de **Desenvolvedor FullStack Mobile** do curso **DEVinHouse SENAI Clamed V3**.

> Este aplicativo tem como objetivo gerenciar movimentações de produtos entre origens e destinos específicos, facilitando o acompanhamento e controle em tempo real.

> Vídeo explicativo do projeto: [PARAPLUIE Farmácias](https://www.youtube.com/watch?v=fGP2ygQ9rPo)

---

## Funcionalidades

- Gerir o cadastro de novas filiais e motoristas cooperados.
- Listar usuários cadastrados.
- Listar produtos em estoque.
- Adicionar e listar novas solicitações de movimentação de estoque.
- Acompanhar o processo de coleta e entrega dos produtos.

---

## Pré-requisitos e Configuração

### Pré-requisitos

- **Node.js**: Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
- **Expo CLI**: Caso esteja usando o Expo, instale com:
  ```bash
  npm install -g expo-cli
  ```

### Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/branquinho91/PARAPLUIE.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd PARAPLUIE
   ```

3. Instale os pacotes necessários:

   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:

   - Atualize a variável `EXPO_PUBLIC_API_URL` no arquivo `.env` na raiz do projeto, por exemplo:
     ```bash
     EXPO_PUBLIC_API_URL='http://seuIPv4:3000'
     ```

5. Execute o comando para iniciar a aplicação no seu dispositivo mobile ou emulador:
   ```bash
   npm run start
   ```

**Obs:** É necessário ter o Backend separado do projeto para rodar a aplicação, que pode ser baixado através do seguinte repositório: [Backend Template](https://github.com/DEVinHouse-Clamed-V3/template_m1.git).

---

## Tecnologias Utilizadas

- **React Native** com **TypeScript**
- **Expo**
- **AsyncStorage** para persistência de dados
- **Axios** para requisições HTTP
- **React Navigation** para navegação entre telas

---

## Estrutura do Projeto

Exemplo de uma estrutura básica de pastas:

```
├── .expo
├── src
│   ├── components
│   │   └── UserHeader.tsx
│   ├── pages
│   │   ├── Login.tsx
│   │   ├── Home.tsx
│   │   ├── ListUsers.tsx
│   │   ├── RegisterUser.tsx
│   │   ├── ListProducts.tsx
│   │   ├── ListMovements.tsx
│   │   ├── RegisterMovements.tsx
│   │   ├── DriverListMovements.tsx
│   │   └── DriverMap.tsx
│   ├── assets
│   │   └── images
│   └── ...
├── .env
├── package-lock.json
├── package.json
├── app.json
├── App.tsx
├── readme.markdown
├── tsconfig.json
└── README.md
```

---

## Contato

- **Nome:** Gustavo Branquinho
- **Email pessoal:** [gustavobranquinho2@gmail.com](mailto:gustavobranquinho2@gmail.com)
- **Email acadêmico:** [gustavo_branquinho@estudante.sesisenai.org.br](mailto:gustavo_branquinho@estudante.sesisenai.org.br)
- **LinkedIn:** [Gustavo Branquinho](https://www.linkedin.com/in/gustavobranquinho2)

# cfsm-cadastro-clientes-mobile

## Descrição

O `cfsm-cadastro-clientes-mobile` é um aplicativo mobile desenvolvido para facilitar o gerenciamento do cadastro de clientes de forma ágil e intuitiva. Este aplicativo permite criar, editar, consultar e excluir registros de clientes, integrando-se a um backend via API REST para garantir dados sempre sincronizados e atualizados.

## Tecnologias Utilizadas

- **Framework:** React Native (ou Expo, personalize conforme necessário)
- **Linguagem:** JavaScript/TypeScript
- **Gerenciamento de Estado:** (Ex: Redux, Context API, Zustand – personalize conforme seu projeto)
- **Navegação:** React Navigation
- **Comunicação com API:** Axios ou Fetch API
- **Componentização:** (Ex: NativeBase, React Native Paper, Styled Components – personalize conforme seu projeto)
- **Testes:** Jest, Testing Library (conforme seu setup)
- **Build & Distribuição:** Expo ou React Native CLI, Fastlane, EAS Build, etc.

## Estrutura de Pastas Sugerida

```
src/
├── api/            # Serviços de integração com o backend
├── components/     # Componentes reutilizáveis de UI
├── screens/        # Telas da aplicação
├── navigation/     # Configuração de rotas
├── contexts/       # Contextos globais (ex: autenticação)
├── hooks/          # Custom hooks
├── utils/          # Funções utilitárias
├── assets/         # Imagens e ícones
└── App.js
```

## Como rodar localmente

1. **Pré-requisitos**
   - Node.js v18+ instalado
   - npm ou yarn
   - Expo CLI (se estiver usando Expo): 
     ```bash
     npm install -g expo-cli
     ```
   - Android Studio/Xcode para emulador ou dispositivo físico com modo desenvolvedor ativado

2. **Instalação**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configuração**
   - Crie um arquivo `.env` na raiz do projeto:
     ```
     API_URL=https://sua.url.de.api
     ```
   - Ajuste conforme URL do backend e outras variáveis de ambiente necessárias.

4. **Execução**
   - Se estiver usando Expo:
     ```bash
     expo start
     ```
   - Se estiver usando React Native CLI:
     ```bash
     npx react-native run-android
     # ou
     npx react-native run-ios
     ```
   - Escaneie o QR Code com o aplicativo Expo Go (Android/iOS) ou rode no emulador.

5. **Testes**
   ```bash
   npm test
   # ou
   yarn test
   ```

## Publicação

- Para gerar builds para distribuição, utilize:
  - Expo: `expo build` ou `eas build`
  - React Native CLI: `cd android && ./gradlew assembleRelease` ou via Xcode para iOS
- Consulte a documentação da ferramenta escolhida para detalhes específicos de publicação em lojas (Google Play, App Store).

## Observações

- Certifique-se de que o backend está ativo e acessível a partir do dispositivo/emulador.
- Para personalização de tema, internacionalização ou permissões, consulte a documentação das bibliotecas utilizadas.
- Dúvidas ou sugestões? Contribua via Pull Requests ou Issues.

---

> **Nota:** Este app segue boas práticas de desenvolvimento mobile. Para contribuições, consulte o guia de contribuição (CONTRIBUTING.md) se disponível.

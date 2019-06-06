---
id: styling
title: Styling
sidebar_label: Styling
---

O `Form` te dá acesso a duas props: `style` e `className`. Você pode utilizar qualquer biblioteca `CSS-in-JS` para estilizar o seu form ou para passar o nome da classe, ou até mesmo o objecto `style` diretamente! Por exemplo:

```js
import styled from "styled-components"; // ou Emotion, por exemplo

// cor estranha pra um fundo, não?
export default styled(MyForm)`
  background: red;
`;
```

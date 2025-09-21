# Appunti di cucina

## Il progetto

Questo progetto è stato sviluppato per l'esame finale del corso "Progettazione e sviluppo di applicazioni web per dispostivi mobili".
L'idea è di un piccolo sito che ospita ricette condivise tra gli utenti. 
Gli utenti registrati possono inserire nuove ricette e commentare quelle presenti, oltre a salvare una selezione di ricette preferite.

Il progetto è stato sviluppato tramite il framework Vue.js
La parte di backend è simulata tramite [JSON Server](https://www.npmjs.com/package/json-server/v/0.17.4)

## Download, installazione e compilazione

### Requisiti

Richiede [Git](https://git-scm.com/) e [Node.js](https://nodejs.org/en)

### Download e installazione

Per clonare il repository, da console:
```
git clone https://github.com/Pi3rres/progettoVue.git
```

Successivamente installare le dipendenze:
```
npm install
```

### Ambiente di test

Per testare il progetto occorre far partire sia il backend simulato:
```
npm run back
```
sia l'applicazione in frontend:
```
npm run serve
```

In alternativa è possibile lanciare entrambi gli elementi da un unico terminale con un singolo script:
```
npm run test
```



### Compilare per produzione
Per generare i file per il progetto in produzione:
```
npm run build
```
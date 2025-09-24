# :man_cook: Appunti di cucina :woman_cook:

## :cake: Il progetto

Questo progetto è stato sviluppato per l'esame finale del corso "Progettazione e sviluppo di applicazioni web per dispostivi mobili".
L'idea è di un piccolo sito che ospita ricette condivise tra gli utenti. 
Gli utenti registrati possono inserire nuove ricette e commentare quelle presenti, oltre a salvare una selezione di ricette preferite.

Il progetto è stato sviluppato tramite il framework Vue.js
La parte di backend è simulata tramite [JSON Server](https://www.npmjs.com/package/json-server/v/0.17.4)

Per la descrizione più dettagliata del progetto fare riferimento alla [Relazione relativa al progetto](ProgettoEsame.Dalbard.pdf)

## 	:spaghetti: Download, installazione e compilazione

### :jar: Requisiti

Richiede [Git](https://git-scm.com/) e [Node.js](https://nodejs.org/en)

### :hamburger: Download e installazione

Per clonare il repository, da console:
```
git clone https://github.com/Pi3rres/progettoVue.git
```

Successivamente nella cartella "progettoVue" installare le dipendenze:
```
npm install
```
> [!WARNING]
> Ci possono essere problemi tra le differenti versioni windows o unix/macOs relativi ai fine linea LF e CR.

Dopo l'intallazione, per risolvere problemi di formattazione, eseguire:
```
npm run lint -- --fix
```

### :popcorn: Ambiente di test

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

### :hot_pepper: Backend per upload immagini

Per permettere all'editor di caricare immagini è stato realizzato un piccolo componente backend.
Si può scaricare dal [Repository GitHub dedicato](https://github.com/Pi3rres/progettoBack)

Sia questo progetto che il progetto backend si devono trovare nella stessa cartella. Il backend convive con il backend simulato json-server, si occupa esclusivamente dell'upload delle immagini utilizzando una porta diversa (3001).
> [!NOTE]
> Il presente progetto è stato realizzato in modo da funzionare anche senza il suddetto backend, in tal caso semplicemente la funzione di upload file non sarà disponibile e verrà caricato esclusivamente il nome del file.

### :canned_food: Compilare per produzione
Per generare i file per il progetto in produzione:
```
npm run build
```
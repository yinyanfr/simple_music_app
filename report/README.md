# Compte Rendu

- YIN Yan

**Type de cette app: PWA**

<div><img src="http://music.yinyan.fr/sma.jpg" /></div>

### 0. Online Version

http://music.yinyan.fr/

### 1. Get Started

**NodeJS v8+ & MongoDB 3.6+**

```bash
$ service mongod start
$ cd api
$ npm i
```

**Test**

```bash
$ npm test
```

**Run**

```bash
$ npm start
```

visitez http://localhost:30706

### 2. Liste de Technologies

- Serveur
  - NodeJS
  - MongoDB
- Web
  - React
- Style
  - Bulma

### 3. Liste de functionalites

| Nom                                | Server | UI   |
| ---------------------------------- | ------ | ---- |
| User Register Login/out            | ok     | ok   |
| Playlist +/-                       | ok     | ok   |
| i18n                               | /      | x    |
| Youtube Search/Play                | ok     | ok   |
| Add music to playlist              | ok     | ok   |
| Private playlist                   | ok     | ok   |
| Status of user/playlist            | ok     | ok   |
| Authentification                   | ok     | ok   |
| Modification of user               | ok     | ok   |
| Share playlist by link             | ok     | ok   |
| Share playlist via app             | x      | x    |
| Instant notification via socket.io | x      | x    |
| Style                              | /      | ok   |
| Unit test                          | ok     | x    |
| Native app                         | /      | x    |

#### 4. Capture d'ecran

Voyez dans la repertoire img/

#### 5. Highlights

Celles sont les choses que je suis fier:

**Authentification vraie**

Cette app utilise bcrypt pour crypter les mots de passe, utlise token pour authentifier l'identite de user, et les token sont crypter en SHA256 et salte.

Par cela on a eviter de rejoindre les info de user dans les commmunications avec le serveur, les authentifications sont fait par token stocke dans le header de http request, specialement les api:

- GET /me : obtenir **mon** information
- GET /mylist : obtenir **mon** playlists
- POST /forkpl : ajouter un playlist dans **mon** collection
- DELETE /deletepl: supprimer un playlist de **moi**

Bref, meme si les hackers crackent le front-end, ils ne peuvent pas manipuler les donnees d'un autre user.

**Playlist prive**

Cette app a realise une fonctionalite exclusive: les playlists prive 

Utilisateurs peuvent creer des playlists prives, les playlists privees sont marke par une serrure, les autres users ne peut pas le voir meme avoir le id de playlist, ils ne peuvent pas etre trouves dans le search ou collecte par les autres users

**Playlist search et collections**

Les playlists crees par users peut etre cherches,

quand un utlisateur visite un playlist cree par un autre user, il peut le collecter, les playlists collecte sont comme "fork" en github, une fois un playlist est collecte, le compteur de "shared" va +1, et une copie de ce playlist va paraitre dans la collection de user qui le collecte

#### 6. Problemes et Evaluation

**Tout nouveau technologie React**

J'utilise toujour JavaScript specialement avec jQuery, mais React est completement different.

Cela a cause des problemes:

- Difficulte avec le test unitaire: React 16 ont change des choses donc les facons du tester que je peux trouver sur internet souvent ne marche pas, et les nouveaux documents et exemples n'est pas arrive assez vite, et je dois renoncer d'ecrire les tests unitaires pour web cette fois
- i18n: L'integration du i18n etait tres simple, mais avez React il faut vraiment re-ecrire trops des choses, et quand c'est la fin du project quand j'ai essaye d'ajouter une solution i18n, c'etait trops des choses a modifier
- Animation: Animation en React n'est pas facile comme jQuery

**API Policy de YouTube**

Depuis le API Policy de YouTube, ce n'est pas propre de cacher la partie video de son iframe player, meme je le cache eventuellement mais la probleme c'est que il peut lecturer normalement sur pc, mais il ne marche pas dans un navagateur mobile.

Depuis les explication sur Stack Overflow, c'est le restriction de YouTube, quand c'est dans un navigateur mobile, il detecte un vrai interaction de user sur l'interface de son iframe player, **c'est le raison que cette app ne sonne pas dans un navigateur mobile **

**React Native**

Quand je commence par React, j'ai pense que cela soit facile de faire une implimentation en React Native, mais React Native n'est pas la meme chose que React, il faut vraiment re-ecrire les choses.

La prochaine fois je vais commencer directement par React Native, parce-que React-Native provide les facons de deteter les touche en ecran tactile, et les bouton native dans un smartphone, quand c'est ultra difficile a realiser avec React

#### 7. Mon avis

Grace a ce cours, je prends une challenge, de facon que je souhaite.

Cela prend du temps

<div><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.</div>

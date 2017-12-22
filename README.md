# Simple Music App

- YIN Yan

<div><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.</div>

This document is also available in Chinese and French, see doc/

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

then http://localhost:30706

### 2. Liste de Technologies

- Serveur
  - NodeJS
  - MongoDB
- Web
  - React

### 3. List of functionalities

| Nom                                | Server | UI   |
| ---------------------------------- | ------ | ---- |
| User Register Login/out            | ok     | ok   |
| Playlist +/-                       | ok     | ok   |
| i18n                               | /      | x    |
| Youtube Search/Play                | ok     | ok   |
| Add music to playlist              | ok     | ok   |
| Status of user/playlist            | ok     | ok   |
| Authentification                   | ok     | ok   |
| Modification of user               | ok     | ok   |
| Share playlist by link             | ok     | ok   |
| Share playlist via app             | x      | x    |
| Instant notification via socket.io | x      | x    |
| Style                              | /      | ok   |
| Native app                         | /      | x    |





# 📚 BookHub – Gestion de Bibliothèque

**BookHub** est une application web de gestion de bibliothèque destinée aux étudiants et aux bibliothécaires.

Les étudiants peuvent consulter le catalogue, réserver des ouvrages et suivre leurs emprunts, tandis que les bibliothécaires disposent d'un ensemble d'outils pour administrer les livres, les prêts et les utilisateurs.

---

# 🚀 Fonctionnalités

## 👤 Pour les utilisateurs

- 📖 Consulter le catalogue de livres
- 🔍 Rechercher des ouvrages par différents critères
- 📅 Réserver des livres disponibles
- 📚 Consulter les emprunts en cours
- 🕒 Accéder à l'historique des emprunts

## 📚 Pour les bibliothécaires

- ➕ Ajouter de nouveaux ouvrages
- ✏️ Modifier les informations des livres
- ❌ Supprimer des ouvrages
- 📦 Gérer les prêts et les retours
- 🔔 Effectuer les relances des emprunts en retard
- 👥 Administrer les comptes utilisateurs

---

# 🛠️ Stack technique

| Composant | Version | Rôle |
|-----------|----------|------|
| Frontend | Angular CLI **22.0.7** | Interface utilisateur moderne et responsive |
| Backend | Spring Boot **4.1.0** | API REST et logique métier |
| Runtime | Node.js **24.15.0 (LTS)** | Environnement d'exécution JavaScript |
| Gestionnaire de paquets | npm **11.12.1** | Gestion des dépendances frontend |
| Base de données | SQL Server **2019+** | Stockage des données |

---

# 📋 Prérequis

Avant de lancer le projet, installez les outils suivants :

- Node.js **24.15.0** ou supérieur
- npm **11.12.1** ou supérieur
- Angular CLI **22.0.7**
- Java JDK **17** ou supérieur
- SQL Server **2019** ou supérieur
- Maven (ou utiliser le wrapper `mvnw` fourni)

---

# 🚀 Installation

## 1. Cloner le dépôt

```bash
git clone https://github.com/votre-utilisateur/bookhub.git
cd bookhub
```

---

## 2. Configurer le backend

Accédez au dossier du backend :

```bash
cd backend
```

Configurez votre base de données dans :

```
src/main/resources/application.properties
```

Puis lancez le serveur :

```bash
./mvnw spring-boot:run
```

---

## 3. Configurer le frontend

Dans un nouveau terminal :

```bash
cd frontend

npm install

ng serve
```

L'application sera disponible à l'adresse :

```
http://localhost:4200
```

---

# 📁 Structure du projet

```text
bookhub/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   └── environments/
│   └── angular.json
│
└── README.md
```

---

# ⚙️ Configuration

## Backend

Configurer le fichier :

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=bookhub
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Frontend

Les différents environnements Angular sont disponibles dans :

```
src/environments/
```

---

# 🧪 Tests

## Backend

```bash
cd backend
./mvnw test
```

## Frontend

```bash
cd frontend
ng test
```

---

# 🤝 Contribution

Les contributions sont les bienvenues !

1. Forker le dépôt
2. Créer une branche

```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
```

3. Commiter les modifications

```bash
git commit -m "Ajout d'une nouvelle fonctionnalité"
```

4. Pousser la branche

```bash
git push origin feature/ma-nouvelle-fonctionnalite
```

5. Ouvrir une Pull Request

---

# 📄 Licence

Ce projet est distribué sous licence **MIT**.

---

# 🚧 État du projet

> **Ce projet est actuellement en développement actif.**
>
> Certaines fonctionnalités peuvent être incomplètes ou évoluer au fil du développement.

---

# 💬 Support

Pour toute question, suggestion ou signalement de bug, n'hésitez pas à ouvrir une **Issue** sur GitHub.

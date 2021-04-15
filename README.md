# ElfakihKarim_6_27012021
So Pekocko

######################################################################### 
INSTALLATION

Repo à cloner => https://github.com/karimOC/ElfakihKarim_6_27012021.git

- Invite de cmd ou terminal => 
Dans le dossier backend entrez "npm install" ensuite "node server", 
Dans le dossier frontend entrez "ng serve" 
- Message que vous devriez appercevoir : 
Listening on port 3000
Connexion à MongoDB réussie !

- Url du site => http://localhost:4200/

#########################################################################

PROJET 6 => Construisez une API sécurisée pour une application d'avis gastronomiques :

- Réaliser le backend du site So Pekocko.
- Technologies à utiliser
● framework : Express ;
● serveur : NodeJS ;
● base de données : MongoDB ;
- Exigences concernant la sécurité :
● l’API doit respecter le RGPD et les standards OWASP ;
● le mot de passe des utilisateurs doit être chiffré ;
● 2 types de droits administrateur à la base de données doivent être définis : un accès
pour supprimer ou modifier des tables, et un accès pour éditer le contenu de la base
de données ;
● la sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB
Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis
sa machine ;
● l’authentification est renforcée sur les routes requises ;
● les mots de passe sont stockés de manière sécurisée ;
● les adresses mails de la base de données sont uniques et un plugin Mongoose
approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.
- Toutes les routes relatives à la sauce doivent exiger une demande authentifiée (contenant un
jeton valide dans son en-tête d'autorisation : "Bearer <token>").

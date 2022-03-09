# OC_P5_Kanap : Construisez un site e-commerce en Javascript

[![HitCount](https://hits.dwyl.com/mhihmi/HilmiMehdi_5_30112021.svg?style=flat&show=unique)](# "Unique view count")
[![HitCount](https://hits.dwyl.com/mhihmi/HilmiMehdi_5_30112021.svg?style=flat)](# "All view count")

This is the front end and back end server for Project 5 of the Web Developer path.

### Back end Prerequisites

You will need to have Node and `npm` installed locally on your machine.

### Back end Installation

**Backend is already hosted on Vercel, but if you prefer to use it locally, follow those steps :**

- Clone this repo. From the "back" folder of the project, run `npm install`. 
- You can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the server runs on another port for any reason, this is printed to the console when the server starts, e.g. `Listening on port 3001`.
- Change the host url in the config.json file to `http://localhost:3000` or whatever port your server is running on.

### Front end Javascript Documentation with JsDoc

- You can take a look at Js Documentation opening `index.html` in the `front/docs` folder with Live Server.

-------
# Présentation du Projet

> Dynamiser un site web avec Javascript Vanilla, utiliser le LocalStorage et une API - Parcours Openclassrooms Développeur Web

<p align="center">
  <img src="https://github.com/mhihmi/HilmiMehdi_5_30112021/blob/main/front/images/logo.png" width="50%"/>
</p>

## Scénario :

Vous êtes en poste dans une agence de développement web depuis quelques semaines maintenant. Après avoir réalisé avec succès l’intégration de quelques sites web (HTML/CSS), on vous confie une nouvelle mission.

Votre client est Kanap, une marque de canapés qui vend ses produits depuis sa boutique exclusivement. Aujourd’hui, celle-ci souhaiterait avoir une plateforme de e-commerce en plus de sa boutique physique pour vendre ses produits sur Internet.

Dans le cadre de cette mission, vous travaillez avec une équipe constituée de :

- Corinne, le CTO de l’agence ;
- Frank, le développeur front-end qui s’est chargé d’intégrer la maquette statique du site ;
- Bilal, le développeur back-end qui implémente l’API à laquelle est connecté le front-end.

## Missions :

- Unifier les travaux déjà réalisés par l’équipe en intégrant dynamiquement les éléments de l’API dans les différentes pages web avec JavaScript. Le code du front-end et de l’API est disponible sur ce <a href="https://github.com/OpenClassrooms-Student-Center/P5-Dev-Web-Kanap">repo</a>.
- Mettre en place un plan de test d’acceptation à partir de ce <a href="https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P5/DW+P5+-+Modele+plan+tests+acceptation.xlsx">template</a> que nous avons pour habitude d’utiliser.
Pour plus de précisions, voici les <a href="https://course.oc-static.com/projects/DWJ_FR_P5/DW+P5+-+Specifications+fonctionnelles.pdf">spécifications techniques et fonctionnelles</a> du projet. Tu pourras y trouver tous les détails de celui-ci, les attentes pour chaque page du site web et les détails de l’API. 
- 4 pages ont été mises en place : page d’accueil, page Produit, page Panier et la page Confirmation. Sur l’ensemble des pages, toutes les parties statiques sont en place, elles sont donc prêtes à recevoir le contenu dynamique. Sur chaque page, un exemple de la partie dynamique est systématiquement donné ; de cette façon, tu n’as pas à t’occuper de la mise en place de la structure HTML ni du style CSS, tout est déjà fait. Tu n’as plus qu’à t’occuper d’intégrer ces éléments dynamiquement grâce à JS et l’API.

## Livrables attendus :

- Un fichier ZIP contenant le code fonctionnel du site web, nommé P5_nom_code.zip (en remplaçant “nom” par votre nom).
- Le plan de test au format PDF, nommé P5_nom_plan_test.pdf.

## Compétences évaluées

- Interagir avec un web service avec JavaScript
- Gérer des événements JavaScript
- Valider des données issues de sources externes
- Créer un plan de test pour une application
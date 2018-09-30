**** 

# Plugin Puissance 4

Le célèbre Jeu du puissance 4 Réalisé avec PhaserJS

## Description Sujet 

Votre projet devra se présenter obligatoirement sous la forme d’un plugin jQuery. Il sera alors modulable et donc
possible de lui passer au minimum les options suivantes:

* Le nombre de cases que comportera votre grille (en x et en y)

* Les couleurs des joueurs (bien sûr, il ne doit pas être possible que les deux joueurs aient la même couleur !)

Vous êtes libre de passer davantage d’options à votre plugin pour choisir d’activer ou non les fonctionnalités que vous
implémenterez.
Votre jeu devra comporter un minimum d’animations. À l’instar du jeu original, les pièces doivent **tomber** du haut
avant d’être posées.
Votre jeu doit indiquer précisément à quel joueur c’est au tour de jouer. Vous devrez afficher le score des parties
précédentes.
Il devra être possible d’annuler le dernier coup joué

## Première étape

Pour commencer veuillez installer phaser JS sur le serveur

### Prérequis

* Lancez Sur le **serveur** en **local**

  * Pour MacOS installez [MAMP](https://documentation.mamp.info/en/MAMP-Mac/Installation/)
  * Lancez Ces commandes dans un terminal quand vous etes dans le parent du dossier Puissance 4 
  *  ```
     // Run in Terminal
     cd PATH/INTO/Puissance4 parent
     cp -r ./JavaScript_Puissance4 /Applications/MAMP/htdocs/You're_Project
      
     ```
  * Pour Ubuntu installez Apache2
  * ```
    // Run in Terminal
    sudo apt-get update
    sudo apt-get install apache2
    cd PATH/INTO/Puissance4 parent
    cp -r ./JavaScript_Puissance4 /var/www/html/You're_Project
    ```
    
* Installez [Phaser 2](https://phaser.io/download) SVP
```
npm install Phaser

```

### Installing

Disponible sous la forme d'un plugin. 
Parameters : numberColumn, numberLine
2 Solutions : 

* Link le script dans l'html :
    *  ```
       <script type="text/javascript" src="JavaScript_Puissance4/connect4.js"></script>
       ```
    * Exemple :
        ```
        // for launch in the body
        $('body').connect4({numberColumn: 7, numberLine: 6});
        ```

* lancez un navigateur sous :

    * MacOS :
        * http://localhost:8888/JavaScript_Puissance4/
    * Ubuntu :
        * http://localhost/JavaScript_Puissance4/


## Built With

* [Phaser 2](https://phaser.io/download) - The web JS framework used
* [JQuery](https://blog.jquery.com/2016/09/22/jquery-3-1-1-released/) - Dependency Management



## Authors

* **Antoine Guerra** - *Projet Pour EPITECH* - [EPITECH](http://www.epitech.eu/)


## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc


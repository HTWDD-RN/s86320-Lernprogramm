# HTW Lernprogramm

![](https://img.shields.io/badge/HTML-5-red?style=for-the-badge&logo=html5)
![](https://img.shields.io/badge/CSS-3-blue?style=for-the-badge&logo=css3)
![](https://img.shields.io/badge/Javascript-ES2024-yellow?style=for-the-badge&logo=javascript)

Ein webbasiertes Lern- und Quizsystem zur Unterstützung beim Üben von Mathematik, Musiknoten und weiteren Aufgaben – mit Unterstützung für KaTeX, VexFlow und extern eingebundene Datenquellen.

![Quiz Tool Banner](android-chrome-192x192.png) <!-- Optional: Bild oder Logo -->

## Features  
- Dynamische Aufgaben mit Live-Auswertung  
- Mathematische Formeln (KaTeX)  
- Musiknoten und Klaviereingabe (VexFlow, QwertyHancock)  
- Unterstützung für externe Quizserver  
- Offlinefähig durch PWA-Unterstützung  

## Technologien  
HTML · CSS · JavaScript · PWA · Web Audio API · KaTeX · VexFlow · QwertyHancock

**Status**: _In Entwicklung_  

## Belegübersicht

### Erfüllte Aufgaben

- [x] Nutzung von HTTP/HTTPS
- [x] Einsatz von HTML zur Strukturierung
- [x] Einsatz von CSS zur Formatierung
- [x] Webprogrammierung mittels Javascript (ECMAScript)
- [x] Nutzung des DOMs (Document Object Model)
- [x] Wahl einer geeigneten Softwarearchitektur
- [x] Nutzung einer JS-Bibliothek zur Darstellung von speziellen Inhalten
- [x] Entwurf und Implementierung eines sinnvollen Nutzerinterfaces
- [x] Implementierung eines responsive Designs für unterschiedliche Geräte/Bildschirmgrößen
- [x] Nutzung der Technik einer PWA
- [x] Offline-Nutzung einer Webapp
- [x] dynamisches Nachladen von Inhalten mittels Ajax-Technik
- [x] Datenübertragung mittels JSON-Format
- [x] Nutzung einer REST-Schnittstelle mit vorgegebener API

- [x] Wahl zwischen verschiedenen lokal gespeicherten Aufgabenkategorien
- [x] eine Aufgabenkategorie, bei welcher die einzelnen Aufgaben von einem bereitgestellten externen Server mittels Ajax und REST-API geholt werden
- [x] zufällige Auswahl und Darstellung einer Aufgabe mit 4 Auswahlmöglichkeiten (zufällig zusammengestellt)
- [x] Anzeige des Lernfortschritts nach jeder Aufgabe mittels Progressbar
- [x] Anzeige einer Statistik am Ende eines Durchlaufs
- [x] die Anzeige sollte sich an verschiedene Anzeigegeräte (PC-Browser, Tablet, Smartphone) sinnvoll anpassen (responsive Design)
- [x] der Beleg soll auf dem Webserver der HTW-Dresden bzw. der Fakultät Informatik abrufbar sein, Pfad: /~sxxxxx/Lernprogramm
- [x] Die Abgabe des Beleges erfolgt entsprechend Abgabeformat
Hier ist eine überarbeitete und klarer formulierte Version deines Textes:

### Umgesetzte Aufgabenkategorien

* Internet- und Webtechnologien
* Mathematikaufgaben (darstellt mit KaTeX)
* Musiknoten lernen (darstellt mit VexFlow, QwertyHancock sowie Audioausgabe über die `webkitAudioContext` API)
* Aufgaben von einem externen Server abrufen und Lösungen verifizieren

### Verwendete Browser

* **Google Chrome** (Version 137.0.7151.56)
* **Mozilla Firefox** (Version 139.0.1)

  * Login-Felder Eingabe nur mit HTTPS möglich
  * Primärschriftart für KaTeX wird nicht geladen, Fallback-Font wird verwendet
  * Keine Unterstützung für Desktop-PWA
* **Safari**

### Aufgetretene Probleme

* **API-Dokumentation:**
  Die Dokumentation des Quiz-Servers scheint unvollständig. Beispielsweise wurde nicht klar erklärt, dass es mehrere richtige Antwortmöglichkeiten geben kann und dass eine falsche oder fehlende Antwork das gesamte Quiz als falsch bewertet. Zudem würde ein dedizierter API-Endpunkt fehlen, um die korrekte Lösung eines Quizzes abzufragen.

* **Tastatureingaben:**
  Beim Rendern des Keyboards wurden für jede Taste Tastenkombinationen (Keybinds) aktiviert. Da es keine einfache Möglichkeit gibt, diese zu deaktivieren, mussten alle Tastaturevents auf der Webseite blockiert werden, um ungewollte Notenausgaben in anderen Oktaven zu verhindern.

### Vorschläge zur Erweiterung und Verbesserung

* Mehrsprachige Benutzeroberfläche
* Integration automatisierter Tests
* Verbesserte Barrierefreiheit
* Export, Import oder Benutzerverwaltung
* Überarbeitung und Optimierung der Benutzeroberfläche
* Auswahlmöglichkeit für Quizzes vom externen Server
* Detailliertere Statistiken
# Poker-Spiel

# Beschreibung des Poker-Spiels

Dieses Projekt ist eine einfache Web-Anwendung, die ein Poker-Spiel simuliert. Die Benutzeroberfläche ist in mehrere Seiten unterteilt: eine Begrüßungsseite, eine Seite mit den Pokerregeln, eine Seite mit den Pokerhand-Rankings und eine Spielseite.

## Aufbau der Anwendung

### HTML-Struktur
- **Begrüßungsseite** (`#greeting-page`): Zeigt den Titel, Buttons für Regeln, Pokerhände und den Spielstart.
- **Regelseite** (`#rules-page`): Erklärt die grundlegenden Pokerregeln.
- **Pokerhand-Ranking-Seite** (`#combinations-page`): Zeigt die verschiedenen Pokerhände mit Beispielkarten in zwei Spalten.
- **Spielseite** (`#game-page`): Zeigt die Hände des Spielers und der KI, die Gemeinschaftskarten, Handbewertungen und Spielbuttons (Karten ausgeben, Fold, Zurück zur Startseite).

### CSS Styling
- Dunkles Hintergrunddesign mit weißen und roten Kartenfarben.
- Karten werden als rechteckige Elemente mit Symbolen für Farben (♠ ♣ schwarz, ♥ ♦ rot) dargestellt.
- Responsive Layout für die Anzeige der Pokerhände in zwei Spalten.

### JavaScript Funktionalität

#### Navigation
- `showPage(pageId)`: Wechselt zwischen den Seiten durch Umschalten der CSS-Klasse `active`.

#### Kartendeck und Spielmechanik
- Ein Deck wird aus 52 Karten (4 Farben × 13 Werte) erzeugt und zufällig gemischt.
- Das Spiel beginnt mit `startGame()`, das Karten an Spieler und KI verteilt.
- Gemeinschaftskarten werden in drei Phasen ausgegeben: Flop (3 Karten), Turn (1 Karte), River (1 Karte).
- `updateDisplay()` zeigt die aktuellen Karten der Spieler und die Gemeinschaftskarten an.

#### Handbewertung und Gewinnerermittlung
- `getBestHand(cards)`: Bewertet die beste Pokerhand aus einer Kombination von 7 Karten (2 Handkarten + 5 Gemeinschaftskarten).
- Die Pokerhände sind nach Rangfolge im Objekt `handRankings` definiert.
- `checkWinner()` vergleicht die besten Hände von Spieler und KI und zeigt das Ergebnis an.

## Fazit
Der Code implementiert ein einfaches Poker-Spiel mit grundlegender Spielmechanik, visueller Darstellung der Karten und Bewertung der Pokerhände. Es ist eine gute Basis, um das Spiel weiter auszubauen, z.B. mit besserer KI, Einsatzmechanik oder Multiplayer-Funktionalität.

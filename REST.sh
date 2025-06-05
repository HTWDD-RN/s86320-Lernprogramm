#!/bin/bash

URL="https://idefix.informatik.htw-dresden.de:8888/api"
USER="s86320@htw-dresden.de:s86320"

# Create new User
curl -X POST -H "Content-Type: application/json" $URL/register --data '{"email":"s86320@htw-dresden.de", "password": "s86320"}'

# Add Quizzes
curl --user $USER -X POST -H "Content-Type: application/json" -d \
'{"title":"videospiele", "text":"Welcher Endgegner taucht nicht in der Dark Souls-Reihe auf?", "options": ["Artorias", "Gehrman", "Gwyn", "Aldia"], "answer": [1]}' \
$URL/quizzes
# 2038

curl --user $USER -X POST -H "Content-Type: application/json" -d \
'{"title":"videospiele", "text":"In welchem Jahr wurde das erste Spiel mit dem Namen The Legend of Zelda veröffentlicht?", "options": ["1985", "1986", "1987", "1988"], "answer": [1]}' \
$URL/quizzes
# 2039

curl --user $USER -X POST -H "Content-Type: application/json" -d \
'{"title":"videospiele", "text":"Welche Spielfigur wurde ursprünglich als Kontrahent zu Mario erschaffen?", "options": ["Sonic", "Crash Bandicoot", "Donkey Kong", "Wario"], "answer": [0]}' \
$URL/quizzes
# 2040

curl --user $USER -X POST -H "Content-Type: application/json" -d \
'{"title":"videospiele", "text":"Wie heißt die dystopische Unterwasserstadt in BioShock?", "options": ["Eden", "Rapture", "Submerge", "Atlantis"], "answer": [1]}' \
$URL/quizzes
# 2041

curl --user $USER -X POST -H "Content-Type: application/json" -d \
'{"title":"videospiele", "text":"Welches dieser Spiele wurde nicht von Hideo Kojima entwickelt?", "options": ["Death Stranding", "Snatcher", "Metal Gear Solid", "Resident Evil 4"], "answer": [3]}' \
$URL/quizzes
# 2042

curl --user $USER -X POST -H "Content-Type: application/json" -d \
'{"title":"videospiele", "text":"Was ist der Name der Firma, welche die Stadt Night City in Cyberpunk 2077 beherrscht?", "options": ["Arasaka", "Militech", "Biotechnica", "Kang Tao"], "answer": [0]}' \
$URL/quizzes
# 2043

curl --user $USER -X POST -H "Content-Type: application/json" -d \
'{"title":"videospiele", "text":"Welcher dieser Charaktere ist kein Hexer in The Witcher 3?", "options": ["Vesemir", "Lambert", "Dijkstra", "Eskel"], "answer": [2]}' \
$URL/quizzes
# 2044

curl --user $USER -X POST -H "Content-Type: application/json" -d \
'{"title":"videospiele", "text":"Was war das erste Spiel, welches vollständig in Unity entwickelt wurde und internationalen Erfolg hatte?", "options": ["Hollow Knight", "Escape from Tarkov", "Rust", "Temple Run"], "answer": [3]}' \
$URL/quizzes
# 2045

curl --user $USER -X POST -H "Content-Type: application/json" -d \
'{"title":"videospiele", "text":"Wie lautet der bürgerliche Name von Solid Snake in Metal Gear?", "options": ["Jack", "David", "John", "Eli"], "answer": [1]}' \
$URL/quizzes
# 2046

curl --user $USER -X POST -H "Content-Type: application/json" -d \
'{"title":"videospiele", "text":"Welches dieser Spiele wurde nicht mit der Unreal Engine entwickelt?", "options": ["Fortnite", "Bioshock Infinite", "Control", "Gears 5"], "answer": [2]}' \
$URL/quizzes
# 2047
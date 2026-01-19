# CheesedOff
Projekt zrealizowany jako aplikacja typu SPA (Single Page Application) z wykorzystaniem 
biblioteki React oraz języka TypeScript. Część serwerowa wykonana 
w technologii Django z użyciem Django REST Framework i komunikuje 
się z relacyjną bazą danych PostgreSQL. Uwierzytelnienie użytkowników 
zrealizowane z użyciem tokenów JWT zapisywanych lokalnie w localStorage oraz przesyłanych w nagłówku przy komunikacji ze strzeżonymi endpointami. Aplikacja obsługuje trzy role użytkowników. Komunikacja pomiędzy frontendem a 
backendem odbywać się będzie w stylu REST. Frontend zrealizowany z użyciem componentów [material UI](https://mui.com/material-ui/). 
Interfejs użytkownika zgodny ze standardem HTML5 i poprawnie walidowany przez W3C.

Temat: Dzielenie się pomysłami i przepisami na posiłek

Nazwa: CheesedOff

Wyjaśnienie:
cheesed off [UK informal] - annoyed and disappointed with something or someone

Założenia funkcjonalne:
Możliwość dodawania przepisów na posiłek w formacie markdown. Podpiecia 
przepisu pod nazwe dania.Możliwość dołączenia zdjęć. Modyfikowanie przepisu 
przez twórce. Przeglądanie przepisów. Dodawanie łapek w góre lub w dół. 

Role użytkowników:
1. Użytkownik niezalogowany
2. Twórca przepisu
3. Zwykły użytkownik myślący: "Co by tutaj dzisiaj ugotować?"

Encje bazy danych:


Efekt cieknącego sera został w pełni zaczerpnięty z [tej strony](https://codes4education.com/pure-css-dripping-liquid-effect-animated-background/)

Jak rozbudować? (pomysły):
Kategoryzowanie przepisu w skali zdrowości. Pobieranie listy zakupów. Dodawanie
do przepisu filmiku z wykonaniem. Autor przepisu może zmienić kolory podstrony
z jego przepisem. Sortowanie, modyfikowanie widoku w 
zależności od wybranej kategori np: nazwa dania, popularność, zdrowość, rodzaj
diety itd.

Przydatne strony:  
https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/radial-gradient
https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-image
https://www.w3schools.com/css/css3_gradients_radial.asp#:~:text=A%20radial%20gradient%20defines%20a,to%20render%20smooth%20transitions%20among.


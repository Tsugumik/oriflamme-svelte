<section class="info">
    <div class="logo">
        <h2 class="logotext">Oriflamme-Svelte</h2>
        <img src="/icons/svelte.svg" alt="Svelte logo">
    </div>
    <p class="version">0.1 Developer Unstable</p>
</section>
<section class="copywrights">
    <h2>Thanks to:</h2>
    <ul>
        <li>
            <a href="https://icons8.com/">Icons by Icons8</a>
        </li>
        <li>
            <a href="https://pixabay.com/pl/music/">Music by Pixabay</a>
        </li>
        <li>
            <a href="https://www.pexels.com/">Graphics by Pexels</a>
        </li>
    </ul>
</section>
<section class="authors">
    <h2>Authors</h2>
    <p>Made with <span class="heart">&hearts;</span> by <span class="fname">Błazej</span> <span class="lname">Drozd</span></p>
</section>
<style lang="scss">
    

    .info {
        .logo {
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-bottom: 2px solid black;
            padding: 1rem;
        }
        h2.logotext {
            font-size: 3rem;
            font-family: 'Merriweather', serif;
        }
        img {
            width: 50px;
        }
        .version {
            padding: 1rem;
        }
    }

    h2 {
        font-size: 2.5rem;
    }

    p {
        font-size: 2rem;
    }

    .copywrights ul {
        list-style: none;
        a {
            color: rgb(25, 25, 61);
            text-decoration: none;
            font-size: 2rem;
        }
    }

    section {
        padding: 1rem;
        text-align: center;
    }

    .heart {
        color: red;
    }

    .fname {
        color: red;
    }
    
    .lname {
        color: blue;
    }

    .fname, .lname {
        font-weight: bold;
    }
</style>
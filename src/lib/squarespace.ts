import fs from 'fs'

export const generateSquareSpaceScript = () => {
    const jsSource = fs.readFileSync('public/main.js', 'utf8')

    const result = `<!-- The JQuery Script: Don't remove  -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!-- Archivo Black font -->
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="https://use.typekit.net/pdj0dfw.css">
<link rel="stylesheet" href="https://laudebugs.github.io/cifc/style.css" />
<script data-cfasync="false" data-tockify-script="embed" src="https://public.tockify.com/browser/embed.js"></script>

<!--
The script below is what get's you the club elements. 
So double check before editing or removing it
-->
<script>
    window.Squarespace.onInitialize(Y, function () {
        ${jsSource}
    })
</script>`

    fs.writeFileSync('out/squarespace.html', result)
}

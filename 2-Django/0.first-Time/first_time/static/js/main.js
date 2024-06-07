const asciiArt = `

██╗  ██╗███████╗██████╗ ███╗   ██╗███████╗██╗     
██║ ██╔╝██╔════╝██╔══██╗████╗  ██║██╔════╝██║     
█████╔╝ █████╗  ██████╔╝██╔██╗ ██║█████╗  ██║     
██╔═██╗ ██╔══╝  ██╔══██╗██║╚██╗██║██╔══╝  ██║     
██║  ██╗███████╗██║  ██║██║ ╚████║███████╗███████╗
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝
                                                  
`;

console.log(asciiArt);


// to change the color of the text on the page
document.addEventListener('DOMContentLoaded', function() {
    const changeColorBtn = document.createElement('button');
    changeColorBtn.style.position = 'fixed';
    changeColorBtn.style.bottom = '20px';
    changeColorBtn.style.right = '20px';
    changeColorBtn.style.borderRadius = '50%';
    changeColorBtn.style.width = '50px';
    changeColorBtn.style.height = '50px';
    changeColorBtn.style.backgroundColor = '#fff'; 
    changeColorBtn.style.color = '#333'; 
    changeColorBtn.style.border = 'none';
    changeColorBtn.style.cursor = 'pointer';
    changeColorBtn.style.outline = 'none';

    changeColorBtn.addEventListener('click', function() {
        const textColor = getRandomColor();
        document.querySelectorAll(' p ,ul, li').forEach(function(element) {
            element.style.color = textColor;
        });
    });

    document.body.appendChild(changeColorBtn);

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
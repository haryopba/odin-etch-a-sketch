document.addEventListener('DOMContentLoaded', (e) => {
    const gridContainer = document.querySelector('#grid-container');
    const grid = createGridElement();

    gridContainer.appendChild(grid);
    
    const head = document.querySelector('head');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'style.css';
    head.appendChild(link);

    const resizeBtn = document.querySelector('#resize-btn');
    resizeBtn.addEventListener('click', (e) => {
        const size = prompt('Grid size (max 100)');
        
        if(size <= 100 && size >= 0){
            const gridContainer = document.querySelector('#grid-container');
            const prevGrid = gridContainer.childNodes[0]
            const grid = createGridElement(size);
            
            gridContainer.replaceChild(grid, prevGrid);
        }
    })
})



function createGridElement(size = 16) {
    const container = document.createElement('div');
    container.classList.add('grid');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.width = 'inherit';
    container.style.height = 'inherit';

    let gridSize = size;
    
    for(let i = 0; i < gridSize; i++){
        let row = document.createElement('div');
        row.id = `row-${i}`;
        row.classList.add('row');
        for(let j = 0; j < gridSize; j++){
            let cell = document.createElement('div');
            cell.id = `cell-${i * gridSize + j}`;
            cell.classList.add('cell');
            cell.classList.add('op-0');
            cell.addEventListener('mouseover', (e) => {
                let target = e.target;
                const targetClasses = target.classList.value.split(' ');
                const opClass = targetClasses.filter(c => c.includes('op-'))[0];
                let opNum = new Number(opClass.slice(opClass.indexOf('-') + 1));
                opNum += opNum < 10 ? 1 : 0;
                target.classList.replace(opClass, `op-${opNum}`)
                let r = Math.floor(Math.random() * 255);
                let g = Math.floor(Math.random() * 255);
                let b = Math.floor(Math.random() * 255);
                target.style.backgroundColor = `rgb(${r}, ${g}, ${b}, ${opNum / 10})`;
            })
            row.appendChild(cell);
        }
        container.appendChild(row);
    }

    return container
}
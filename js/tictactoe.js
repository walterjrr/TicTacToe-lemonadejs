const Tictactoe = () => {
    let canPlay = false, game = [], board
    const texts = [
        "aperte o play para jogar",
        "joga!",
        "venceu o jogo",
    ]
    const self = {
        bot: true,
        turn: "",
        text: texts[0],
        buttonLabel: "jogar"
    };

    const checkMatching = (val1, val2, val3) => {
        if(game[val1] === game[val2] && game[val2] === game[val3]) {
            return game[val1]
        }

    }

    const clickedBox = (elem) => {
        const id = elem.getAttribute("data-id")
        if(!canPlay || game[id])
            return

        elem.innerText = self.turn
        game[id] = self.turn

        if(self.turn === "x"){
            self.turn = "o"
        }
        else{
            self.turn = "x"
        }

        const winner = checkMatching(1,2,3) ||
                       checkMatching(4,5,6) ||
                       checkMatching(7,8,9) || 
                       checkMatching(1,4,7) || 
                       checkMatching(2,5,8) || 
                       checkMatching(3,6,9) || 
                       checkMatching(1,5,9) || 
                       checkMatching(3,5,7)
        if(winner){
            self.turn = winner
            self.text = texts[2]
            canPlay = false
            
        }  
    }

    self.init = (elem) => {
        board = elem
        elem.addEventListener("click", (e) => {
            switch(e.target.tagName){
                case "SPAN":
                    clickedBox(e.target)
                    break;
                case "BUTTON":
                    play()
                break;
            }
        })
    }

    const play = () => {
        canPlay = true;
        self.turn = "x"
        self.text = texts[1]

        game = []

            const cells = board.querySelectorAll("span")
            for(let i=0; i<cells.length; i++){
                cells[i].innerText = ""
            }
            self.buttonLabel = "restart"
    }

    const template = `
        <div>
            <h1>JOGO DA VELHA</h1>
            <p>
                jogar conta o computador <input type = "checkbox" checked @bind="self.bot">
            </p>
            <div>
            <div>
                <div class="gui">
                    <span class="gui_turn">{{self.turn}}</span>
                    <span>{{self.text}}</span>
                </div>
                <div class="board" @ready="self.init(this)">
                    <section class="board_column">
                        <span class="board_cell" data-id="1"></span>
                        <span class="board_cell" data-id="2"></span>
                        <span class="board_cell" data-id="3"></span>
                    </section>
                    <section class="board_column">
                        <span class="board_cell" data-id="4"></span>
                        <span class="board_cell" data-id="5"></span>
                        <span class="board_cell" data-id="6"></span>
                    </section>
                    <section class="board_column">
                        <span class="board_cell" data-id="7"></span>
                        <span class="board_cell" data-id="8"></span>
                        <span class="board_cell" data-id="9"></span>
                    </section>
                    <button class="btn">{{self.buttonLabel}}</button>
                </div>
            </div>
        </div>
    `;
    
    return lemonade.element(template, self);
}

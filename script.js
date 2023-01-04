class TicTacToeGame{
	constructor(){
		this.state = 'playing';
		this.turn = 'X';

		let elements = document.getElementsByClassName('position');
		for(let i = 0;i < elements.length;i++){
			elements[i].addEventListener('click', (event) => this.positionClick(event));
		}
		
		document.getElementById('menu').addEventListener('click', (event) => this.restart());
	}
	positionClick(event){
		if(this.state !== 'playing') return;
		let span = (event.target.tagName == 'DIV')?event.target.firstChild:event.target;
		if(span.innerText == ''){
			span.innerText = this.turn;
			this.turn = (this.turn == 'X')?'O':"X";
			this.verifyEndGame();
		}
	}
	verifyEndGame(){
		let winerLine = [];
		let elements = document.getElementsByClassName('position');
		let v = [];
		for(let i = 0;i < elements.length;i++){
			v[i] = elements[i].firstChild.innerText;
		}

		for(let i = 0;i < 3;i++){
			let linha = (v[(i*3)+0] === v[(i*3)+1]) && (v[(i*3)+1] === v[(i*3)+2]) && (v[(i*3)+1] !== '');
			let coluna = (v[i] === v[i+3]) && (v[i+3] === v[i+6]) && (v[i+3] !== '');

			if(linha){
				winerLine = [(i*3)+0, (i*3)+1, (i*3)+2];
			}
			if(coluna){
				winerLine = [i, i+3, i+6];
			}
		}

		winerLine = (v[0] === v[4]) && (v[4] === v[8]) && (v[4] !== '')?[0,4,8]:winerLine;	//diagonal1
		winerLine = (v[6] === v[4]) && (v[4] === v[2]) && (v[4] !== '')?[6,4,2]:winerLine;	//diagonal1
		if(winerLine.length !== 0) this.endGame(winerLine);
		if(v.every((position) => {return position != ''}) && winerLine.length === 0) this.endGame();
	}
	endGame(winerLine = []){
		this.state = 'finished';
		let elements = document.getElementsByClassName('position');
		for(let i in winerLine){
			elements[winerLine[i]].classList.add('winerPosition');
		}

		if(winerLine.length !== 0){
			let letter = elements[winerLine[0]].firstChild.innerText.toLowerCase();
			console.log(letter);
			let winnerScore = document.getElementById(`score-${letter}`);
			winnerScore.innerText = parseInt(winnerScore.innerText) + 1;
		}


		this.restart();
	}
	restart(){
		let elements = document.getElementsByClassName('position');
		for(let i = 0;i < elements.length;i++){
			let t = i*100 + 1000;
			setTimeout(() => {elements[i].classList.add('clearPosition');}, t);
			setTimeout(() => {
				elements[i].firstChild.innerText = '';
				elements[i].classList.remove('winerPosition');
			}, t + 760);
			setTimeout(() => {elements[i].classList.remove('clearPosition');}, t + 1500);
		}
		this.state = 'playing';
		this.turn = "X";
	}
}

const game = new TicTacToeGame();
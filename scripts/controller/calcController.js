class CalcController{
    constructor(){
        this.displayCalc = document.querySelector('#display');
        this.Display;
        this.Operation=[];
        this.lastNumber;
        this.lastOperator;
        this.init();
    }

    init(){
        this.lastNumber = " ";
        this.InitButtons();
        this.setDisplay("");
    }

    InitButtons(){ //função para adicionar evento aos buttons
        let buttons = document.querySelectorAll('.btn');
        buttons.forEach((btn)=>{
            btn.addEventListener('click', ()=>{
                this.ExecButtons(btn.textContent);
            })   
        });
    }

    ExecButtons(button){
        switch(button){
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.AddOperation(button);
            break;
            case 'Del':
                this.DeletLastDig();
            break;
            case 'C':
                this.DeletAll();
            break;
            case 'CE':
                this.DeletLastOperation();
            break;
            case '+':
            case '-':
                this.AddOperation(button);
                break;
            case 'x':
                this.AddOperation('*');
                break
            case '÷':
                this.AddOperation('/');
                break;
            case '%':
                this.CalcPorcentagem();
                break;
            case 'x²':
                this.lastNumber = this.lastNumber * this.lastNumber;
                this.setLastNumber();   
                break;
            case '√x':
                this.lastNumber = Math.sqrt(this.lastNumber);
                this.setLastNumber();       
                break;
            case '1/x':
                this.lastNumber = 1/this.lastNumber;
                this.setLastNumber();
                break;
            case '+/-':
                this.lastNumber = -1*this.lastNumber;
                this.setLastNumber();
                break;
            case '=':
                if(isNaN(this.Operation[this.Operation.length -1])) this.Operation.push(this.lastNumber);
                this.Calc();
            break;
            case '.':
                this.addDot();
            break;
        }
    }

    addDot(){
        if(!this.isOperator(this.Operation[this.Operation.length])){ //ponto após operador é inválido
            this.lastNumber += ".";
            this.setDisplay(this.getDisplay() + ".");
        }
    }

    setLastNumber(){
        if(!this.isOperator(this.Operation[this.Operation.length - 1])) this.Operation.pop();
        this.Operation.push(this.lastNumber);
        this.setDisplay(this.lastNumber);
    }

    CalcPorcentagem(){
        this.lastNumber = this.lastNumber/100;
        let value = this.Operation[this.Operation.length - 2];
        this.lastNumber = this.lastNumber * value;
        this.Operation.push(this.lastNumber);
        this.setLastNumber();
    }

    DeletLastOperation(){

    }

    DeletLastDig(){
        
    }

    DeletAll(){
        this.Operation = [];
        this.lastNumber = " ";
        this.setDisplay(this.Operation);
    }
    
    isOperator(value){
        switch(value){
            case '+':
            case '-':
            case 'x':
            case '÷':
            case '%':
            case 'x²':
            case '√x':
            case '1/x':
            case '+/-':
                return true;
        }
        return false;
    }

    AddOperation(value){
        if(isNaN(value)){ //se value não for um número
            if(this.lastNumber != " " && isNaN(this.Operation[this.Operation.length -1])) this.Operation.push(this.lastNumber); 
            //se houver algum digito em lastNumber e se o último elemento do array não for um número, lastNumber é adicionado ao array 
            if(this.Operation.length == 0) return; //o primeiro digito não pode ser um operador 
            //caso o usuário queira um número negativo como primeiro digito precisa usar o botão "+/-"
            if(this.isOperator(this.Operation[this.Operation.length -1])) return; //expressões com dois operadores consecutivos são inválidas
            this.Operation.push(value);
            this.lastNumber = "";
        }
        else { //value é um número
            if(this.Operation.length == 1) { //apos uma operação o array possui um único elemento: o resultado
                //caso o usuário entre com outro número o resultado anterior exibido na tela deve sumir
                this.Operation = [];
                this.lastNumber = " ";
                this.setDisplay(this.lastNumber);
            }//if
            this.lastNumber += value;
        }//else
        if(this.Operation.length >3) { //se o array possui três elementos a operação é realiazada automaticamente
            this.Operation.pop(); 
            this.Calc();
            return;
        }//if
        this.setDisplay(this.getDisplay() + value);
    }

    Calc(){
        let operacao = this.Operation.join(' '); //transformando o array em uma operação js
        this.lastNumber = eval(operacao); //validando a operação
        this.setDisplay(this.lastNumber);//exibindo resultado
        this.Operation = []; //zerando array de operações
        this.Operation.push(this.lastNumber); 
    }

    setDisplay(value){
        this.displayCalc.innerHTML = value;
    }

    getDisplay(){
        return (this.displayCalc.value);
    }
}
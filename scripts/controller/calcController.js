class CalcController {
    constructor() {
        this.displayCalc = document.querySelector('#display');
        this.Display;
        this.Operation = [];
        this.lastNumber;
        this.lastOperator;
        this.init();
    }

    init() {
        this.lastNumber = "";
        this.InitButtons();
        this.setDisplay("");
    }

    InitButtons() { //função para adicionar evento aos buttons
        let buttons = document.querySelectorAll('.btn');
        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                this.ExecButtons(btn.textContent);
            })
        });
    }

    ExecButtons(button) {
        switch (button) {
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
                this.lastNumber = 1 / this.lastNumber;
                this.setLastNumber();
                break;
            case '+/-':
                this.lastNumber = -1 * this.lastNumber;
                this.setLastNumber();
                break;
            case '=':
                if (isNaN(this.Operation[this.Operation.length - 1])) this.Operation.push(this.lastNumber);
                this.Calc();
                break;
            case '.':
                this.addDot();
                break;
        }
    }

    addDot() {
        //ponto após operador e número com mais de um ponto são inválidos
        if (!this.isOperator(this.Operation[this.Operation.length]) && this.lastNumber.indexOf(".") == -1) {
            if (!this.lastNumber) this.setDisplay('0.');
            else this.setDisplay(this.getDisplay() + ".");
            this.lastNumber += ".";
        }
    }

    setLastNumber() {
        if (!this.isOperator(this.Operation[this.Operation.length - 1])) this.Operation.pop();
        this.Operation.push(this.lastNumber);
        this.setDisplay(this.lastNumber);
    }

    CalcPorcentagem() {
        this.lastNumber = this.lastNumber / 100;
        let value = this.Operation[this.Operation.length - 2];
        this.lastNumber = this.lastNumber * value;
        this.Operation.push(this.lastNumber);
        this.setLastNumber();
    }

    DeletLastOperation() {
        if (this.lastNumber) {
            this.lastNumber = "";
            this.setDisplay("");
        }
        else this.Operation.pop();
    }

    DeletLastDig() {
        if (this.lastNumber) {
            this.lastNumber = this.lastNumber.substr(0, (this.lastNumber.length - 1))
            this.setDisplay('');
            this.setDisplay(this.lastNumber);
        }
    }

    DeletAll() {
        this.Operation = [];
        this.lastNumber = " ";
        this.setDisplay(this.Operation);
    }

    isOperator(value) {
        switch (value) {
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

    AddOperation(value) {
        if (isNaN(value)) { //se value não for um número
            if (this.lastNumber) this.Operation.push(this.lastNumber);
            if (this.Operation.length != 0) { //o primeiro digito não pode ser um operador
                if (this.isOperator(this.Operation[this.Operation.length - 1])) { //se forem digiados dois operadores
                    this.Operation.pop(); //troca de operadores
                }
                this.Operation.push(value);
                this.lastNumber = "";
            }
        } //
        else { //value é um número
            if (this.Operation.length != 0) {
                if (this.isOperator(this.Operation[this.Operation.length - 1]) && !this.lastNumber) {
                    this.setDisplay("");
                }//if
            }
            this.lastNumber += value;
            this.setDisplay(this.getDisplay() + value);
        }//else
        if (this.Operation.length > 3) { //se o array possui três elementos a operação é realiazada automaticamente
            this.lastOperator = this.Operation.pop();
            this.Calc();
        }//if
    }

    Calc() {
        let operacao = this.Operation.join(' '); //transformando o array em uma operação js
        let result = eval(operacao); //validando a operação
        this.setDisplay(result);//exibindo resultado
        this.Operation = []; //zerando array de operações
        this.Operation.push(result); //adicionando resultado 
        this.Operation.push(this.lastOperator); //adicionando o ultimo operador que foi removido 
    }

    setDisplay(value) {
        this.displayCalc.innerHTML = value;
    }

    getDisplay() {
        return (this.displayCalc.value);
    }
}
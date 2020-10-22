class Calculator {
  constructor(previousOparandText, currentOparandText){
    this.previousOparandText = previousOparandText
    this.currentOparandText = currentOparandText
    this.clear()
  }

  clear(){
    this.currentOparand = ''
    this.previousOparand = ''
    this.operation = undefined
  }

  delete(){
    this.currentOparand = this.currentOparand.toString().slice(0,-1)
  }

  appandNum(number){
    if(number == '.' && this.currentOparand.includes('.')) return 
      this.currentOparand = this.currentOparand.toString() + number.toString()
  }

  chooseOperand(operation){
    if(this.currentOparand === '') return
      if(this.previousOparand  !== ''){
        this.compute()
      } 
      this.operation = operation
      this.previousOparand = this.currentOparand
      this.currentOparand = ''
  }

  compute(){
    let computation
    const prev = parseFloat(this.previousOparand)
    const current = parseFloat(this.currentOparand)
    if(isNaN(prev) || isNaN(current)) return 
      switch(this.operation){
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return;
      }
      this.currentOparand = computation
      this.operation  = undefined
      this.previousOparand = ''
  }

  updateDisplay(){
    this.currentOparandText.innerText = this.currentOparand
    this.previousOparandText.innerText = this.previousOparand
    // this.computation = this.equalButton
  }

}

const numButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOparandText = document.querySelector('[data-previous-operand]')
const currentOparandText = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOparandText, currentOparandText)

numButton.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appandNum(button.innerText)
      calculator.updateDisplay()
    })
})  

operationButton.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperand(button.innerText)
    calculator.updateDisplay()
  })
})

equalButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
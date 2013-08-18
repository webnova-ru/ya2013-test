/*
 Любое нужное нам число должно удовлетворять условию:
 10ˆ(n-1) < n-значное число < n*9!
 Если n = 8, то данное условие не выполнится,
 следовательно, нам нужны (7-и и меньше)-значные числа.
 Причём эти числа должны быть меньше чем 7*9!

 Кроме того будем учитывать такие ситуации:
 Возьмем к примеру число 90, его сумма факториалов равна 9!+0! = 362881,
 что больше самого числа. Из этого следует, что числовой диапозон 91—99
 можно не рассматривать, так как их суммы факториалов будут расти быстрее самих чисел.
 */
(function(){
    'use strict';
    function getFactorial(n) {
        return n ? n * getFactorial(n - 1) : 1;
    }
    var num = {
        currNum: 0,
        maxNumber: 7 * getFactorial(9),
        resArrNumbers: [],
        factorialCache: {},
        getSumFactorial: function() {
            var digits = this.currNum.toString();
            var sum = 0;
            for(var i = 0, len = digits.length; i < len; i++)
            {
                sum += this.factorialCache[digits[i]];
                if(sum > this.currNum)
                {
                    var numCurrOrder = Math.pow(10, len - 1 - i );
                    if(sum > this.currNum + numCurrOrder)
                    {
                        this.currNum = (this.currNum + numCurrOrder) - this.currNum % numCurrOrder - 1;
                        break;
                    }
                }
            }
            return sum;
        },
        getResult: function() {
            for (var i = 0; i <= 9; i++)
                this.factorialCache[i] = getFactorial(i);

            for(; this.currNum <= this.maxNumber; this.currNum++)
                this.currNum == this.getSumFactorial() && this.resArrNumbers.push(this.currNum);

            return this.resArrNumbers;
        }
    };

    var start = new Date();
    var res = num.getResult();
    document.write('time: ' + (new Date() - start) + 'ms' + '<br/>' + res.join(', '));
    console.log(res);
}());



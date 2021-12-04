//
// THE LAST ANSWER SOLVED BY THE CALCU
//
var Ans = 0;

// Memory Registers
var X = 0;
var Y = 0;
var A = 0;
var B = 0;

var shift = false;
var alpha = false;

const PI = 3.1415192654;

//
// SOLVE THE EQUATION
//
function Solve()
{
    try
    {
        // evaluate the equation
        var equation = $(".equation-lcd").val();
        var test = eval(equation);

        // Store only valid results
        if (Number.isFinite(test))
        {
            Ans = test;

            // Show the result
            $(".result-lcd").val(test);
        }
        else
        {
            // Show the result
            $(".result-lcd").val("Math Error");
        }
    }
    catch(ex) // Thanks for the 'instanceof' error catch -> https://stackoverflow.com/a/26347058
    {
        // Show syntax error
        if (ex instanceof SyntaxError) {
            $(".result-lcd").val("Syntax Error");
        }
        else
        {
            // For any kind of error, show INVALID
            $(".result-lcd").val("Invalid");
        }
    }
}

//
// TOGGLE SHIFT
//
function Shift()
{
    shift = !shift;

    $(".shift-indicator").val(shift ? "Shift" : "");
} 
//
// UNTOGGLE SHIFT
//
function UnShift()
{
    shift = false;

    $(".shift-indicator").val("");
} 
//
// WRITE TEXT TO EXPRESSION SCREEN
//
function WriteExp(exp)
{
    if ($("#result-lcd").val() != "")
        ClearResult();

    var equation = $(".expression-lcd").val() + exp;

    $(".expression-lcd").val(equation);

     
    // Replace the SIN, COS, TAN etc FUNCTIONS
    var replaced = equation.replace(/\u00d7/g, "*")
                           .replace(/\u00f7/g, "/")
                           .replace(/Sin\(/g, "Math.sin\(")
                            .replace(/Cos\(/g, "Math.cos\(")
                            .replace(/Abs\(/g, "Math.abs\(")
                            .replace(/Log\(/g, "Math.log\(")
                            .replace(/Tan\(/g, "Math.tan\(")
                            .replace(/Min\(/g, "Math.min\(")
                            .replace(/Max\(/g, "Math.max\(")
                            //.replace(/Pow\(/g, "Math.pow\(")
                            .replace(/(\d+)\u00B2/g, (m, n) => Pow(+n))
                            .replace(/(\d+)!/g, (m, n) => Factorial(+n))
                            .replace(/\u221A\u0028/g, "Math.sqrt\(") 
                            .replace(/\u03C0/g, "PI");

    $(".equation-lcd").val(replaced);
}
//
// Create Factorial
//
function Factorial(factorial)
{ 
    var out = 1; 
 
    for (var i = 1; i <= factorial; i++)
        { 
    	    out *= i;
        }

    return out;
}
//
// Create Factorial
//
function Pow(exp)
{  
    var out = Math.pow(exp, 2);
    return out;
}
//
// WRITE ALPHA REGISTER TEXT TO EXPRESSION SCREEN
//
function WriteAlpha(alpha)
{
    // Clear result screen when writing new expressions
    if ($("#result-lcd").val() != "")
        ClearResult();

    var a = (shift) ? alpha + "=" : alpha;
    var equation = $(".expression-lcd").val() + a;  
    $(".equation-lcd").val(equation); 
    $(".expression-lcd").val(equation); 

    UnShift();
}

//
// CLEAR THE RESULTS LCD
//
function ClearResult()
{
    $("#result-lcd").val("");
}

//
// CLEAR THE MEMORY REGISTERS
//
function ClearMem()
{
    X = 0;
    Y = 0;
    A = 0;
    B = 0;
    Ans = 0;
}

//
// CLEAR SOLVE RESULTS
//
function ClearAll()
{
    ClearResult();
    $(".expression-lcd").val("");
}

//
// DELETE LAST CHARACTER FROM STRING
//
function Delete()
{
    // Cant delete when an answer/result is present
    var hasResult = $(".result-lcd").val() != "";

    if (!hasResult)
    {
        var original = $(".expression-lcd").val();

        var processed = original.slice(0,-1);
        $(".expression-lcd").val(processed);
    }
}
 
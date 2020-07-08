module.exports = (x, y, callback) => {
    if ( x <= 0 || y <= 0) {
        setTimeout(() => 
            callback(new Error("Rectangle dimensions should be greater than zero: x = " + x +", and y = " + y ), 
            null), 
            2000);      //can delay before the callback function is called
                    //quandor returns error on the first parameter it should return null
    }
    else {
        setTimeout(() => 
            callback( null, 
            {
                perimeter: ( ) => (2*(x+y)),
                area: ( ) => (x*y)

            }), 
            2000); 
    }
}



const customAPI = (num, cat, dif, typ) => {
    
    return new Promise((resolve, reject) => {
    // API Call gives 1-30 questions.

    // Specific Category only
    if (cat > 8 && dif === "any" && typ === "any") {
        url = `https://opentdb.com/api.php?amount=${num}&category=${cat}`
        resolve('url concatenation successful');            
    }

    // Specific Difficulty only
    else if (cat < 9 && dif !== "any" && typ === "any") {
        url = `https://opentdb.com/api.php?amount=${num}&difficulty=${dif}`
        resolve('url concatenation successful');            
    }

    // Specific Type only
    else if (cat < 9 && dif === "any" && typ !== "any") {
        url = `https://opentdb.com/api.php?amount=${num}&type=${typ}`
        resolve('url concatenation successful');
    }

    // Specific Category + Difficulty
    else if (cat > 8 && dif !== "any" && typ === "any") {
        url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${dif}`
        resolve('url concatenation successful');        
    }

    // Specific Category + Type
    else if (cat > 8 && dif === "any" && typ !== "any") {
        url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&type=${typ}`
        resolve('url concatenation successful');        
    }


    // Specific Difficulty + Type
    else if (cat < 9 && dif !== "any" && typ !== "any") {
        url = `https://opentdb.com/api.php?amount=${num}&difficulty=${dif}&type=${typ}`
        resolve('url concatenation successful');    
    }

    // Specific ALL (Category, Difficulty, Type)
    else if (cat > 8 && dif !== "any" && typ !== "any") {
        url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${dif}&type=${typ}`
        resolve('url concatenation successful');    
        
    }

    // Any Category, Difficulty, and Type.
    else if (cat < 9 && dif === "any" && typ === "any") {
        url = `https://opentdb.com/api.php?amount=${num}`
        resolve('url concatenation successful');
    }

    else {
       url = `https://opentdb.com/api.php?amount=${num}`
       reject(`Error. If statement is not working. Number of Questions = ${num}, Category=${cat}, Difficulty=${dif}, Type=${typ}`);
    }

});

}


module.exports = customAPI;

/*
API Possibilities:

1. Number of Questions is invalid.
2. Cat only
3. Dif only 
4. Typ only
5. Cat + Dif 
6. Cat + Typ
7. Dif + Typ
8. Cat + Dif + Typ
9. All ANY (only valid Num is inputted)

n, c, d, t, [c + d], [c + t], [d + t], [c + d + t], ANY

Combinatorics: 1 + 3C1 + 3C2 + 3C3 + 3C0 = 1 + 3 + 3 + 1 + 1 = 9 Possible Dynamic API URLs. 
*/
import express from 'express'

// Disclaimer: ' post ' and ' get ' are the thing when you think it from the client side not the server side For My idea but do not say it anywher bcz its the opposite 

// ❌ Wrong thinking: "I'm using app.post() to send data"
// ✅ Correct thinking: "I'm defining what happens when someone sends me a POST request"

const app = express()

const port = 5000

app.use(express.json())

let teas = []
let next_Id = 1

app.post("/teas", (req, res) => {
    /* `const {name, price} = req.body` is a destructuring assignment in JavaScript. It is extracting
    the `name` and `price` properties from the `req.body` object and assigning them to variables
    `name` and `price` respectively. This syntax allows you to easily access specific properties of
    an object and assign them to variables in a single line of code. */
    const { name, price } = req.body//Classic JavaScript Object Destructuring


    /* The code snippet `const new_tea={ id:next_Id++, name, price }` is creating a new object named
    `new_tea` in JavaScript. Here's what each part of the object creation is doing: */
    const new_tea = {
        id: next_Id++,
        name,
        price
    }

    teas.push(new_tea)
    res.send(new_tea)


    res.status(201).send(new_tea)
})


app.get("/teas", (req, res) => {
    res.status(200).send(teas)
})

app.get('/teas/:id', (req, res) => {
    //If anything comes thorough the url it will be stored in req.params
    //If anything comes thorough the query it will be stored in req.query .....

    teas.find(tea => {
        if (tea.id === parseInt(req.params.id)) {

            res.status(200).send(tea)

        } else {
            res.status(404).send("Not Found")
        }
    })

}
)

app.put('/teas/:id', (req, res) => {
    const tea_Id = parseInt(req.params.id)
    const tea = teas.find(tea => tea.id === tea_Id)

    if (tea) {
        tea.name = req.body.name
        tea.price = req.body.price
        res.status(200).send(tea)
    } else {
        res.status(404).send("Tea not found")
    }
})

//Delete Data 

app.delete('/teas/:id', (req, res) => {
    const tea_Id = parseInt(req.params.id)
    teas = teas.filter(tea => tea.id !== tea_Id)
    res.status(200).send("Deleted")
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);

})